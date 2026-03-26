# Technical Plan: Budget Viz Revamp

## Tech Stack
- Next.js 16 (App Router)
- Recharts (stacked area, combo chart)
- @nivo/treemap (NEW — `npm install @nivo/treemap`)
- shadcn/ui Select (NEW — `npx shadcn-ui@latest add select`)
- Framer Motion (existing — animated transitions)
- Tailwind CSS (existing)
- TypeScript (existing)

## Data Model

### New: `src/data/budget-by-function.ts`
Static TypeScript constants derived from OMB Historical Tables 3.2.

```typescript
export const BUDGET_FUNCTIONS = [
  'Social Security', 'Medicare', 'Health', 'National Defense',
  'Net Interest', 'Income Security', 'Veterans Benefits',
  'Education/Training', 'Transportation', 'Other'
] as const;

export type BudgetFunction = typeof BUDGET_FUNCTIONS[number];

export const BUDGET_BY_FUNCTION: Record<number, Record<BudgetFunction, number>> = {
  2003: {
    'Social Security': 470_000_000_000,
    'Medicare': 249_000_000_000,
    'Health': 232_000_000_000,
    'National Defense': 404_000_000_000,
    'Net Interest': 153_000_000_000,
    'Income Security': 334_000_000_000,
    'Veterans Benefits': 57_000_000_000,
    'Education/Training': 83_000_000_000,
    'Transportation': 62_000_000_000,
    'Other': 116_000_000_000,
  },
  // ... FY2004-2025 (to be populated from OMB data)
};

// Pre-computed for chart consumption
export const BUDGET_TIMESERIES: Array<{ year: number } & Record<BudgetFunction, number>> = 
  Object.entries(BUDGET_BY_FUNCTION).map(([year, funcs]) => ({
    year: Number(year),
    ...funcs,
  }));
```

### Modified: `src/context/FilterContext.tsx`
Add new state fields:

```typescript
// New fields in FilterState:
percentMode: 'dollars' | 'entry_year' | 'reference_year';
referenceYear: number;  // FY2003-2025, default 2025

// Replace existing showAsPercent boolean
// showAsPercent: boolean  → REMOVE
// percentMode replaces it: 'dollars' = old false, 'entry_year' = old true
```

### Modified: `src/lib/constants.ts`
Update `formatAsPercent` to accept explicit reference year:

```typescript
export function formatAsPercent(amount: number, year?: number, referenceYear?: number): string {
  const budget = referenceYear !== undefined && FEDERAL_BUDGET[referenceYear] !== undefined
    ? FEDERAL_BUDGET[referenceYear]
    : year !== undefined && FEDERAL_BUDGET[year] !== undefined
      ? FEDERAL_BUDGET[year]
      : FEDERAL_BUDGET_AVERAGE;
  // ... rest unchanged
}
```

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Treemap library | @nivo/treemap | React-native API, animated transitions, no D3 boilerplate |
| Year dropdown | shadcn/ui Select | Already using shadcn/ui, fully accessible |
| Budget data | Static TS constants | Fast, offline, no API dependency |
| Chart sync | Recharts syncId | Native, zero-config tooltip sync |
| Animation | Framer crossfade + Recharts animation | Hybrid approach, clean transitions |
| Data source | OMB Historical Tables 3.2 | Gold standard, official, FY1962-2025 |
| Category count | 10 functions | Balance of detail vs visual clarity |

## Dependencies to Install
```bash
npm install @nivo/treemap @nivo/core
npx shadcn-ui@latest add select
```

## Risk Assessment
- **Low risk:** FilterContext changes (well-isolated state)
- **Low risk:** shadcn/ui Select (battle-tested component)
- **Medium risk:** Budget data accuracy (manual extraction from OMB — verify totals match existing FEDERAL_BUDGET constants)
- **Low risk:** @nivo/treemap integration (standalone component, no cross-cutting concerns)
