#!/usr/bin/env python3
"""
Data pipeline: Parses consolidated-federal-fraud-waste.md → src/data/evidence.json
"""

import re
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

# ── Paths ────────────────────────────────────────────────────────────────────
SOURCE_MD = Path("/Users/frobertomaya/clawd/data/artifacts/specs/consolidated-federal-fraud-waste.md")
OUTPUT_JSON = Path(__file__).parent.parent / "src" / "data" / "evidence.json"

# ── Category metadata ────────────────────────────────────────────────────────
CATEGORIES = {
    "F1": {"label": "Healthcare Fraud",           "type": "fraud"},
    "F2": {"label": "Defense/Contractor Fraud",   "type": "fraud"},
    "F3": {"label": "Benefits Fraud",             "type": "fraud"},
    "F4": {"label": "Tax Fraud/Evasion",          "type": "fraud"},
    "F5": {"label": "Grant/Research Fraud",       "type": "fraud"},
    "F6": {"label": "Employee/Internal Fraud",    "type": "fraud"},
    "F7": {"label": "Disaster/Emergency Fraud",   "type": "fraud"},
    "W1": {"label": "Duplicative Programs",       "type": "waste"},
    "W2": {"label": "Cost Overruns",              "type": "waste"},
    "W3": {"label": "Idle/Underused Assets",      "type": "waste"},
    "W4": {"label": "Administrative Overhead",    "type": "waste"},
    "W5": {"label": "Failed Programs/IT",         "type": "waste"},
    "W6": {"label": "Improper Payments",          "type": "waste"},
    "W7": {"label": "Earmarks/Pork",              "type": "waste"},
}

def parse_amount(val: str):
    """Convert '$98,340,000,000' or 'N/A' to int or None."""
    if not val or val.strip().upper() in ("N/A", "NULL", "NONE", ""):
        return None
    # Strip $ commas and whitespace
    cleaned = re.sub(r"[$,\s]", "", val.strip())
    # Handle ranges like "$5,000,000,000–$12,000,000,000" — take first number
    cleaned = re.split(r"[–\-]", cleaned)[0]
    # Handle approximate markers
    cleaned = cleaned.lstrip("~≈<>")
    try:
        return int(float(cleaned))
    except ValueError:
        return None

def parse_int(val: str):
    """Parse int, return None if not parseable."""
    if not val or val.strip().upper() in ("N/A", "NULL", "NONE", ""):
        return None
    try:
        return int(val.strip())
    except ValueError:
        return None

def parse_float(val: str):
    if not val or val.strip().upper() in ("N/A", "NULL", "NONE", ""):
        return None
    try:
        return float(val.strip())
    except ValueError:
        return None

def parse_list(val: str):
    """Parse comma-separated string into list, stripping whitespace."""
    if not val or val.strip().upper() in ("N/A", "NULL", "NONE", ""):
        return []
    return [v.strip() for v in val.split(",") if v.strip()]

def extract_data_blocks(text: str) -> list[dict]:
    """
    Find all code blocks (``` ... ```) that contain key: value pairs
    starting with ID: Fx-xxx or Wx-xxx.
    """
    # Pattern: code blocks containing ID: followed by category ID
    code_block_pattern = re.compile(
        r"```\s*\n(.*?)\n\s*```",
        re.DOTALL
    )
    
    entries = []
    
    for match in code_block_pattern.finditer(text):
        block_content = match.group(1).strip()
        
        # Check if this is a data point block (starts with ID: F or W)
        if not re.match(r"^\s*ID:\s*[FW]\d", block_content):
            continue
        
        entry = {}
        
        # Parse each KEY: VALUE line
        lines = block_content.split("\n")
        current_key = None
        current_value_parts = []
        
        for line in lines:
            # Try to match KEY: VALUE pattern
            key_match = re.match(r"^([A-Z_]+):\s*(.*)", line)
            if key_match:
                # Save previous key-value if any
                if current_key:
                    entry[current_key] = "\n".join(current_value_parts).strip()
                current_key = key_match.group(1)
                current_value_parts = [key_match.group(2)]
            else:
                # Continuation of previous value
                if current_key:
                    current_value_parts.append(line)
        
        # Save last key-value
        if current_key:
            entry[current_key] = "\n".join(current_value_parts).strip()
        
        if "ID" in entry:
            entries.append(entry)
    
    return entries

def transform_entry(raw: dict) -> dict:
    """Transform raw key-value dict to typed entry dict."""
    entry_id = raw.get("ID", "").strip()
    category = raw.get("CATEGORY", "").strip()
    
    # Derive type from category
    cat_info = CATEGORIES.get(category, {"label": category, "type": "unknown"})
    
    # safeToSum heuristic: Tier 1 or 2, non-cumulative entries
    period_type = raw.get("PERIOD_TYPE", "").strip()
    tier = parse_int(raw.get("CERTAINTY_TIER", ""))
    safe_to_sum = (tier is not None and tier <= 2) and period_type == "single_year"
    
    return {
        "id": entry_id,
        "title": raw.get("TITLE", "").strip(),
        "category": category,
        "categoryLabel": cat_info["label"],
        "type": cat_info["type"],
        "amountBest": parse_amount(raw.get("AMOUNT_BEST", "")),
        "amountLow": parse_amount(raw.get("AMOUNT_LOW", "")),
        "amountHigh": parse_amount(raw.get("AMOUNT_HIGH", "")),
        "fiscalYearStart": parse_int(raw.get("FISCAL_YEAR_START", "")),
        "fiscalYearEnd": parse_int(raw.get("FISCAL_YEAR_END", "")),
        "periodType": period_type,
        "certaintyTier": tier,
        "certaintyScore": parse_float(raw.get("CERTAINTY_SCORE", "")),
        "jurisdiction": raw.get("JURISDICTION", "federal").strip(),
        "sourceName": raw.get("SOURCE_NAME", "").strip(),
        "sourceUrl": raw.get("SOURCE_URL", "").strip(),
        "sourceType": raw.get("SOURCE_TYPE", "").strip(),
        "sourceMethodology": raw.get("SOURCE_METHODOLOGY", "").strip(),
        "sourceOrientation": raw.get("SOURCE_ORIENTATION", "").strip(),
        "overlapNotes": raw.get("OVERLAP_NOTES", "").strip(),
        "entityLinks": parse_list(raw.get("ENTITY_LINKS", "")),
        "safeToSum": safe_to_sum,
    }

def extract_entity_index(text: str) -> dict:
    """
    Parse the ENTITY INDEX section.
    Returns {entity_name: [list of entry IDs]}
    """
    entities = {}
    
    # Find ENTITY INDEX section
    entity_section_match = re.search(
        r"## ENTITY INDEX\s*\n.*?(?=\n## |\Z)",
        text,
        re.DOTALL
    )
    if not entity_section_match:
        print("WARNING: ENTITY INDEX section not found", file=sys.stderr)
        return entities
    
    section = entity_section_match.group(0)
    
    # Find entity headers (### EntityName) and their bullet points
    entity_block_pattern = re.compile(
        r"### (.+?)\n(.*?)(?=\n### |\Z)",
        re.DOTALL
    )
    
    id_pattern = re.compile(r"\b([FW]\d-\d{3})\b")
    
    for match in entity_block_pattern.finditer(section):
        entity_name = match.group(1).strip()
        block_text = match.group(2)
        
        ids_found = id_pattern.findall(block_text)
        # Deduplicate while preserving order
        seen = set()
        unique_ids = []
        for eid in ids_found:
            if eid not in seen:
                seen.add(eid)
                unique_ids.append(eid)
        
        if unique_ids:
            entities[entity_name] = unique_ids
    
    return entities

def extract_double_count_matrix(text: str) -> list[dict]:
    """
    Parse the DOUBLE COUNTING MATRIX table.
    Returns list of {entryA, entryB, relationship, safeToSum}
    """
    matrix = []
    
    # Find DOUBLE COUNTING MATRIX section
    matrix_section_match = re.search(
        r"## DOUBLE COUNTING MATRIX\s*\n.*?(?=\n---\n### SAFE-TO-SUM|\Z)",
        text,
        re.DOTALL
    )
    if not matrix_section_match:
        print("WARNING: DOUBLE COUNTING MATRIX section not found", file=sys.stderr)
        return matrix
    
    section = matrix_section_match.group(0)
    
    # Parse table rows: | Entry A | Entry B | Relationship | Safe to Sum? |
    # Skip header and separator rows
    row_pattern = re.compile(
        r"^\|\s*\*?\*?([^\|]+?)\*?\*?\s*\|\s*\*?\*?([^\|]+?)\*?\*?\s*\|\s*([^\|]+?)\s*\|\s*([^\|]+?)\s*\|",
        re.MULTILINE
    )
    
    id_pattern = re.compile(r"\b([FW]\d-\d{3})\b")
    
    for match in row_pattern.finditer(section):
        col_a = match.group(1).strip()
        col_b = match.group(2).strip()
        relationship = match.group(3).strip()
        safe_str = match.group(4).strip()
        
        # Skip header rows
        if "Entry A" in col_a or "---" in col_a:
            continue
        
        # Extract IDs from the columns
        ids_a = id_pattern.findall(col_a)
        ids_b = id_pattern.findall(col_b)
        
        if not ids_a or not ids_b:
            continue
        
        # Determine safeToSum
        safe_upper = safe_str.upper()
        if "❌" in safe_str or "NO" in safe_upper:
            safe_to_sum = False
        elif "✅" in safe_str or "YES" in safe_upper:
            safe_to_sum = True
        else:
            safe_to_sum = None  # CAUTION / ambiguous
        
        matrix.append({
            "entryA": ids_a[0],
            "entryB": ids_b[0],
            "relationship": relationship,
            "safeToSum": safe_to_sum,
        })
    
    return matrix

def compute_summary_stats(entries: list[dict]) -> dict:
    """
    Compute summary stats matching the MD's documented figures.
    We use the hardcoded values from the SUMMARY STATISTICS section for accuracy,
    but also compute tier counts dynamically from parsed data.
    """
    # Tier counts from parsed data
    tier_counts = {"1": 0, "2": 0, "3": 0, "4": 0}
    
    # Coverage years
    all_start_years = []
    all_end_years = []
    
    for entry in entries:
        t = entry.get("certaintyTier")
        if t is not None:
            key = str(t)
            if key in tier_counts:
                tier_counts[key] += 1
        
        ys = entry.get("fiscalYearStart")
        ye = entry.get("fiscalYearEnd")
        if ys:
            all_start_years.append(ys)
        if ye:
            all_end_years.append(ye)
    
    # Values from the SUMMARY STATISTICS section in the MD (authoritative)
    return {
        "fraudFloorAnnual": 25_000_000_000,
        "fraudCeilingAnnual": 50_000_000_000,
        "wasteFloorAnnual": 162_000_000_000,
        "wasteCeilingAnnual": 303_000_000_000,
        "combinedFloor": 187_000_000_000,
        "combinedCeiling": 353_000_000_000,
        "tierCounts": tier_counts,
        "coverageStart": min(all_start_years) if all_start_years else 2003,
        "coverageEnd": max(all_end_years) if all_end_years else 2025,
    }

def main():
    print(f"Reading source: {SOURCE_MD}")
    
    if not SOURCE_MD.exists():
        print(f"ERROR: Source file not found: {SOURCE_MD}", file=sys.stderr)
        sys.exit(1)
    
    text = SOURCE_MD.read_text(encoding="utf-8")
    print(f"File loaded: {len(text):,} characters")
    
    # Parse data blocks
    raw_entries = extract_data_blocks(text)
    print(f"Found {len(raw_entries)} raw data blocks")
    
    # Transform to typed entries
    entries = [transform_entry(r) for r in raw_entries]
    print(f"Transformed {len(entries)} entries")
    
    # Print category breakdown
    from collections import Counter
    cat_counts = Counter(e["category"] for e in entries)
    for cat in sorted(cat_counts.keys()):
        print(f"  {cat}: {cat_counts[cat]} entries")
    
    # Parse entity index
    entities = extract_entity_index(text)
    print(f"Parsed entity index: {len(entities)} entities")
    
    # Parse double counting matrix
    dc_matrix = extract_double_count_matrix(text)
    print(f"Parsed double count matrix: {len(dc_matrix)} relationships")
    
    # Compute summary stats
    summary = compute_summary_stats(entries)
    print(f"Tier counts: {summary['tierCounts']}")
    
    # Build entity → entries map from PARSED entries (more accurate than section parsing)
    # Also merge with the entity index section
    entity_map = {}
    
    # First from the entity index section
    for entity_name, ids in entities.items():
        entity_map[entity_name] = ids
    
    # Then cross-reference from entries' entityLinks
    for entry in entries:
        for entity in entry.get("entityLinks", []):
            if entity not in entity_map:
                entity_map[entity] = []
            if entry["id"] not in entity_map[entity]:
                entity_map[entity].append(entry["id"])
    
    # Coverage years
    coverage_start = summary.pop("coverageStart", 2003)
    coverage_end = summary.pop("coverageEnd", 2025)
    
    output = {
        "metadata": {
            "generated": datetime.now(timezone.utc).isoformat(),
            "totalEntries": len(entries),
            "coverageStart": coverage_start,
            "coverageEnd": coverage_end,
            "sourceFile": str(SOURCE_MD),
        },
        "entries": entries,
        "entities": entity_map,
        "doubleCountMatrix": dc_matrix,
        "summaryStats": summary,
        "categories": CATEGORIES,
    }
    
    # Write output
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding="utf-8")
    
    print(f"\n✅ Written to {OUTPUT_JSON}")
    print(f"   Entries: {len(entries)}")
    print(f"   Entities: {len(entity_map)}")
    print(f"   Double-count pairs: {len(dc_matrix)}")
    
    # Quick validation
    ids = [e["id"] for e in entries]
    duplicate_ids = [eid for eid in ids if ids.count(eid) > 1]
    if duplicate_ids:
        print(f"⚠️  Duplicate IDs found: {set(duplicate_ids)}", file=sys.stderr)
    else:
        print("   No duplicate IDs ✅")
    
    entries_with_amounts = [e for e in entries if e["amountBest"] is not None]
    print(f"   Entries with amountBest: {len(entries_with_amounts)}/{len(entries)}")

if __name__ == "__main__":
    main()
