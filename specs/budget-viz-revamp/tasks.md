# Tasks: Budget Viz Revamp

## Phase 0: Setup [sequential]

- [T001] Install dependencies: `npm install @nivo/treemap @nivo/core` and `npx shadcn-ui@latest add select` [US6]
- [T002] Create `src/data/budget-by-function.ts` with complete FY2003-2025 budget data by function. Use OMB Historical Table 3.2 data. Include all 10 categories. Verify FY totals match existing `FEDERAL_BUDGET` constants in `src/lib/constants.ts`. Export `BUDGET_FUNCTIONS`, `BUDGET_BY_FUNCTION`, `BUDGET_TIMESERIES`, and `BUDGET_FUNCTION_COLORS` (10 distinct colors). [US2]

## Phase 1: Filter System Update [sequential, foundational]

- [T003] Modify `src/context/FilterContext.tsx`: Replace `showAsPercent: boolean` with `percentMode: 'dollars' | 'entry_year' | 'reference_year'` and add `referenceYear: number` (default 2025). Add setters `setPercentMode()` and `setReferenceYear()`. Maintain backward compat — `showAsPercent` getter that returns `percentMode !== 'dollars'`. [US1]
- [T004] Modify `src/lib/constants.ts`: Update `formatAsPercent()` to accept optional `referenceYear` parameter. When provided, use that year's budget as denominator. [US1]
- [T005] Modify `src/components/controls/GlobalControls.tsx`: Replace the binary $ / % toggle with a three-state control. When `reference_year` is selected, show a shadcn/ui Select dropdown with FY2003-2025 (most recent first). Dropdown items show format: "FY2025 ($7.0T)". [US1]
- [T006] Update all components that call `formatAsPercent()` or read `showAsPercent` to use the new `percentMode` + `referenceYear` from FilterContext. Files to check: Dashboard, BubbleChart, TimeSeries, Treemap, EvidenceTable, ConfidenceExplorer, SankeyDiagram. [US1]
- [T007] Run existing tests, fix any broken by the FilterContext changes. Add tests for three-state toggle logic. [US1]

## Phase 2: Budget Trends Page [P] parallel tasks

- [T008] [P] Create `src/components/charts/BudgetStackedArea.tsx`: Recharts AreaChart with stacked areas for 10 budget functions. Props: data (from BUDGET_TIMESERIES), viewMode ('absolute' | 'normalized'). Include responsive container, custom tooltip, formatted Y-axis. Use BUDGET_FUNCTION_COLORS. animationDuration=600. [US2]
- [T009] [P] Create `src/components/charts/BudgetFraudCombo.tsx`: Recharts ComposedChart with syncId="budget". Aggregate evidence.json entries by fiscal year. Left Y-axis (trillions) for budget bars, right Y-axis (billions) for fraud (red line) + waste (yellow line). Custom tooltip showing both scales. [US3]
- [T010] [P] Create `src/components/charts/BudgetTreemap.tsx`: @nivo/treemap (ResponsiveTreeMap) for single-year budget composition. Props: year (number). Year slider (shadcn/ui Slider, already installed). Animated transitions on year change via key-based remount + Framer AnimatePresence crossfade. Labels show category + "$XB". [US4]
- [T011] [P] Create `src/components/dashboard/BudgetMetrics.tsx`: Key metrics cards — total budget, total fraud+waste, fraud+waste as % of budget, YoY growth rate, largest fraud/waste category. Animate on data change with Framer Motion. [US5]

## Phase 3: Page Assembly + Navigation [sequential, after Phase 2]

- [T012] Create `src/components/views/BudgetTrendsView.tsx`: Assemble all 4 sections — metrics cards at top, stacked area + combo chart (synced) in middle, treemap at bottom. Include absolute/normalized toggle for stacked area. Mobile-responsive layout (stack vertically). Framer Motion page enter animation. [US2, US3, US4, US5]
- [T013] Modify `src/components/layout/BottomTabBar.tsx`: Add "Budget" tab with appropriate icon (TrendingUp from lucide-react). Place between existing tabs. Wire to BudgetTrendsView. [US6]
- [T014] Modify `src/components/layout/AppShell.tsx` and any routing: Register BudgetTrendsView as a navigable view. [US6]

## Phase 4: Polish + Testing [sequential, after Phase 3]

- [T015] Run full test suite (`npm test`). Fix any failures. Add tests for: budget data integrity (totals match FEDERAL_BUDGET), FilterContext new state, BudgetTrendsView rendering. [US1-US6]
- [T016] Verify mobile layout: all new components stack properly on small screens. Treemap readable on mobile (min cell size). Tab bar doesn't overflow. [US6]
- [T017] Verify dark theme: all new components use existing CSS variables / Tailwind dark classes. No hardcoded colors outside BUDGET_FUNCTION_COLORS. [US2-US5]
- [T018] Git commit: `git add -A && git commit -m "feat: budget viz revamp — year selector + budget trends page"` [ALL]
