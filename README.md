# Federal Fraud & Waste Tracker

An interactive, evidence-based visualization of US federal government fraud and waste data. Every data point is independently verifiable and sourced from official government records.

**Live:** [fraud-waste-tracker.vercel.app](https://fraud-waste-tracker.vercel.app)

## What This Is

Government spending data is public but scattered across hundreds of websites, PDFs, and reports. This tool consolidates it into one searchable, visual database so anyone can follow the money.

- **80 data points** spanning FY2003-FY2025
- **4-tier confidence system** — every figure rated from "Confirmed" (GAO audit, DOJ settlement) to "Credibly Reported" (investigative journalism)
- **Double-counting prevention** — overlapping sources are mapped and deduplicated
- **Non-partisan** — sources include GAO, DOJ, OIG reports, CBO, and think tanks from across the political spectrum (orientation disclosed)

## Key Numbers

| Metric | Annual Range |
|--------|-------------|
| Confirmed Fraud (Tier 1) | $4.2B - $9.0B |
| Estimated Fraud (Tier 1-2) | $25B - $50B |
| Waste | $162B - $303B |
| **Combined** | **$187B - $353B** |

*Ranges are conservative, non-overlapping estimates. See methodology for details.*

## Views

- **Explore** — Force-directed bubble chart. Size = dollar amount, color = confidence tier. Pinch-to-zoom on mobile.
- **Stats** — Executive dashboard with category breakdowns, tier distribution, and % of federal budget toggle.
- **Treemap** — Hierarchical drill-down: Fraud/Waste → categories → individual entries.
- **Historical** — Time series with toggleable spending events (CARES Act, ARRA, etc.) and counterfactual analysis.
- **Methodology** — Confidence explorer with detailed tier criteria and evidence standards.
- **Data Flow** — Sankey diagram showing source institutions → categories → confidence tiers.
- **Evidence** — Full sortable/filterable audit table with expandable details and CSV export.

## Data Sources

- [Government Accountability Office (GAO)](https://www.gao.gov) — High-Risk List, Duplication Reports
- [Department of Justice (DOJ)](https://www.justice.gov) — False Claims Act statistics
- [paymentaccuracy.gov](https://www.paymentaccuracy.gov) — Improper payment data
- [USAspending.gov](https://www.usaspending.gov) — Federal contract and grant data
- Inspector General reports (HHS-OIG, DOD-OIG, SSA-OIG, etc.)
- CBO cost estimates
- Think tanks: Cato, Heritage, Brookings, Peterson/BPC (orientation disclosed)

## Confidence Tiers

| Tier | Certainty | Evidence Standard |
|------|-----------|-------------------|
| ✅ Tier 1 | 90-100% | GAO audit, IG report, DOJ settlement, court judgment |
| 🔵 Tier 2 | 70-89% | CBO estimate, agency-reported rate, government-commissioned study |
| 🔶 Tier 3 | 50-69% | Peer-reviewed study, think tank report with methodology |
| 🔸 Tier 4 | 30-49% | Investigative journalism with FOIA docs, whistleblower testimony |

Below 30% certainty = not in the database.

## Tech Stack

- **Framework:** Next.js 16 (App Router, static generation)
- **Styling:** Tailwind CSS + shadcn/ui
- **Visualizations:** D3.js (treemap, bubble chart, sankey) + Recharts (time series, confidence explorer)
- **Animation:** Framer Motion
- **Hosting:** Vercel (static, no backend, no API, no attack surface)
- **Testing:** Vitest + React Testing Library (96 tests)

## Development

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Tests
npm test

# Regenerate evidence.json from source data
python3 scripts/convert-data.py
```

## Data Pipeline

1. Research data collected from primary sources → `data/consolidated-federal-fraud-waste.md`
2. Python script parses, normalizes, and deduplicates → `src/data/evidence.json`
3. Next.js reads JSON at build time → static site
4. Push to main → Vercel auto-deploys

## Contributing

Found a data error? Have a higher-confidence source for an existing entry? Open an issue with:
- The entry ID (e.g., F1-001)
- The correct figure
- The source (with direct URL)
- Why your source is more authoritative

## License

MIT License. See [LICENSE](LICENSE).

## Disclaimer

Data sourced from public records and may contain errors or omissions. This site does not accuse any individual or entity of wrongdoing. Information is provided for research and educational purposes only and should be independently verified before taking any action. Not affiliated with any government agency.
