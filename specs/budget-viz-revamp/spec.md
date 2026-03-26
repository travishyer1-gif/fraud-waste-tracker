# PRD: Federal Budget Visualization Revamp

## Overview
Add a budget reference year selector to the existing % of budget toggle, and build a new Budget Trends page visualizing federal budget growth by category with fraud/waste overlay.

## User Stories

### US1: Budget Reference Year Selector [P1]
**As a** user viewing fraud/waste entries as % of budget,
**I want** to select which fiscal year's budget to use as the denominator,
**So that** I can compare fraud/waste amounts against any year's budget, not just the entry's own year.

**Acceptance Criteria:**
- [ ] Three-state display toggle: `$ Amount` | `% of Budget (entry year)` | `% of Budget (FY____)`
- [ ] When third option selected, a dropdown appears with FY2003-2025
- [ ] Default reference year is FY2025
- [ ] Dropdown label shows budget total: "FY2025 ($7.0T)"
- [ ] All percentage calculations app-wide recalculate when reference year changes
- [ ] Existing `formatAsPercent()` function updated to accept optional reference year override
- [ ] Works on all existing views: Overview, Stats, TimeSeries, Treemap, Evidence table

### US2: Budget Trends — Stacked Area Chart [P1]
**As a** user exploring federal spending,
**I want** to see how the federal budget has grown over time broken into categories,
**So that** I can understand the composition and growth of government spending.

**Acceptance Criteria:**
- [ ] Stacked area chart showing FY2003-2025 budget by ~10 functions
- [ ] Categories: Social Security, Medicare, Health, National Defense, Net Interest, Income Security, Veterans Benefits, Education/Training, Transportation, Other
- [ ] Y-axis formatted as `$X.XT`
- [ ] Toggle between absolute ($) and normalized (% of total) views
- [ ] Smooth animation on view toggle (Framer Motion crossfade + Recharts animation)
- [ ] Responsive — works on mobile
- [ ] Tooltip shows dollar amount + % of total for hovered category

### US3: Budget Trends — Fraud/Waste Overlay [P1]
**As a** user comparing fraud/waste to total budget,
**I want** to see fraud and waste amounts overlaid on the budget growth chart,
**So that** I can see how fraud/waste scales relative to total spending.

**Acceptance Criteria:**
- [ ] Synchronized ComposedChart below the stacked area (linked via `syncId`)
- [ ] Left Y-axis: budget total (trillions), Right Y-axis: fraud+waste (billions)
- [ ] Fraud shown in red, waste in yellow (matching existing color scheme)
- [ ] Hover syncs tooltips across both charts
- [ ] Aggregates evidence.json entries by fiscal year for the overlay

### US4: Budget Trends — Animated Treemap [P2]
**As a** user exploring budget composition for a specific year,
**I want** an interactive treemap with a year scrubber,
**So that** I can see how budget shares shift between categories over time.

**Acceptance Criteria:**
- [ ] @nivo/treemap (ResponsiveTreeMap) with budget function data
- [ ] Year slider (FY2003-2025) with animated transitions on change
- [ ] Cell labels show category name + dollar amount
- [ ] Color-coded by category (consistent with stacked area colors)
- [ ] Fraud/waste entries shown as colored indicators on relevant cells

### US5: Budget Trends — Key Metrics Cards [P2]
**As a** user viewing the Budget Trends page,
**I want** summary cards showing key budget statistics,
**So that** I can quickly grasp the headlines.

**Acceptance Criteria:**
- [ ] Total budget for selected/most recent year
- [ ] Total fraud + waste for selected year
- [ ] Fraud + waste as % of budget
- [ ] Year-over-year budget growth rate
- [ ] Largest fraud/waste category
- [ ] Cards animate on year change

### US6: Navigation — Budget Trends Tab [P1]
**As a** user navigating the app,
**I want** a Budget Trends tab in the bottom navigation,
**So that** I can access the new page alongside existing views.

**Acceptance Criteria:**
- [ ] New tab icon + label in BottomTabBar
- [ ] Tab appears between existing tabs (logical ordering)
- [ ] Active state styling consistent with other tabs
- [ ] Mobile-first layout

## Out of Scope
- Real-time budget data fetching (static TypeScript constants for v1)
- Budget breakdown by individual agency (function-level only)
- Sub-function granularity (use ~10 top-level functions)
- Historical data before FY2003
