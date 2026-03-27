# Spec: Wire "% of Budget" Toggle into BubbleChart

**Status:** Ready for implementation  
**File:** `src/components/charts/BubbleChart.tsx`  
**Priority:** Bug fix — UI toggle exists but has no effect  

---

## Problem

The "Display Amounts" toggle in `GlobalControls` exposes three modes:
- `dollars` — show raw dollar amounts (default, works)
- `entry_year` — show as % of federal budget for that entry's fiscal year (broken)
- `reference_year` — show as % of budget for a user-selected reference year (broken)

`FilterContext` correctly tracks `percentMode` and `referenceYear`. However, `BubbleChart.tsx` **never reads from FilterContext** — it always renders dollar amounts regardless of the selected mode.

---

## Root Cause

`BubbleChart` does not import or call `useFilters()`. Every reference to amount display is hardcoded:

```tsx
// Line 88 — detail panel best estimate label
{formatCompact(entry.amountBest)}

// Line 287 — bubble inline label
.text(d => formatCompact(d.entry.amountBest))

// Line 469 — tooltip amount
<p className="font-mono text-emerald-400">{formatCompact(tooltip.entry.amountBest)}</p>
```

Bubble *sizing* also always uses raw `amountBest` via `radiusForAmount()` — it does not adjust for percent mode.

---

## Required Changes — `BubbleChart.tsx` only

### 1. Import FilterContext

```tsx
import { useFilters } from '@/context/FilterContext';
import { formatAsPercent, FEDERAL_BUDGET } from '@/lib/constants';
```

### 2. Read filters at top of component

```tsx
export function BubbleChart({ entries }: { entries: EvidenceEntry[] }) {
  const { filters } = useFilters();
  // ... existing hooks
```

### 3. Create a display formatter helper (inside component or as module-level fn)

```tsx
function formatDisplayAmount(
  entry: EvidenceEntry,
  percentMode: string,
  referenceYear: number
): string {
  if (entry.amountBest == null) return '—';
  if (percentMode === 'dollars') return formatCompact(entry.amountBest);
  const year = percentMode === 'reference_year' ? referenceYear : (entry.fiscalYearEnd ?? entry.fiscalYearStart ?? undefined);
  return formatAsPercent(entry.amountBest, year, percentMode === 'reference_year' ? referenceYear : undefined);
}
```

### 4. Pass percentMode + referenceYear into the useEffect dependency array

The D3 simulation `useEffect` currently depends on `[entries, dimensions, isMobile]`. Add `filters.percentMode` and `filters.referenceYear`:

```tsx
}, [entries, dimensions, isMobile, filters.percentMode, filters.referenceYear]);
```

This ensures bubbles re-render when the toggle changes.

### 5. Update bubble inline label (line ~287)

```tsx
// Before:
.text(d => formatCompact(d.entry.amountBest))

// After:
.text(d => formatDisplayAmount(d.entry, filters.percentMode, filters.referenceYear))
```

### 6. Update tooltip amount (line ~469)

```tsx
// Before:
<p className="font-mono text-emerald-400">{formatCompact(tooltip.entry.amountBest)}</p>

// After:
<p className="font-mono text-emerald-400">
  {formatDisplayAmount(tooltip.entry, filters.percentMode, filters.referenceYear)}
</p>
```

### 7. Update detail panel best estimate label (line ~88)

```tsx
// Before:
{formatCompact(entry.amountBest)}

// After:
{formatDisplayAmount(entry, filters.percentMode, filters.referenceYear)}
```

### 8. Update size legend label (optional but clean)

When in percent mode, the size legend currently says "Size = Amount" with `$100M / $1B / $100B` markers — those become misleading. Update legend text:

```tsx
// Legend title:
<p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1.5">
  {filters.percentMode === 'dollars' ? 'Size = Amount' : 'Size = % of Budget'}
</p>

// Legend labels — only show dollar labels in dollar mode; in percent mode, show approx %:
// Simplest approach: hide the size legend entirely in percent mode
{!isMobile && filters.percentMode === 'dollars' && (
  <div ...>
    // existing size legend
  </div>
)}
```

---

## Bubble Sizing in Percent Mode

**Do NOT change bubble sizing.** The physical radius is driven by `amountBest` via a log scale — this is correct behavior even in percent mode because the relative sizes of bubbles should remain consistent (a bigger fraud is still a bigger bubble). Changing the radius scale to percent would just be the same visual with different math.

Only the **label text** and **tooltip text** need to change.

---

## `formatAsPercent` signature (already exists in `src/lib/constants.ts`)

```ts
export function formatAsPercent(amount: number, year?: number, referenceYear?: number): string
// Returns: "0.042% of fed. budget"
```

For `entry_year` mode: pass `entry.fiscalYearEnd ?? entry.fiscalYearStart ?? undefined` as `year`, no `referenceYear`.  
For `reference_year` mode: pass `referenceYear` as both `year` and `referenceYear` args (the function uses referenceYear as the denominator override).

---

## Files to Touch

| File | Change |
|------|--------|
| `src/components/charts/BubbleChart.tsx` | All changes — ~15 lines touched |
| Nothing else | FilterContext, GlobalControls, formatAsPercent already work correctly |

---

## Acceptance Criteria

1. Toggle to "% of Entry Year" → bubble inline labels show `0.XX% of fed. budget`, tooltip shows same, detail panel shows same
2. Toggle to "Reference Year (2025)" → same but denominator is always FY2025 budget regardless of entry year
3. Toggle back to "$" → reverts to `$XXB` display
4. Bubble sizes do NOT change when toggling modes (only labels change)
5. Size legend hidden or updated when in percent mode
6. No TypeScript errors, existing tests pass

---

## Out of Scope

- Changing bubble radius scale to percent
- Modifying other chart views (TimeSeries, Treemap, etc.)
- Any changes to FilterContext or GlobalControls
