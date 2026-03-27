# Spec: UI/Design Overhaul — Federal Fraud & Waste Tracker

**Date:** 2026-03-27
**Status:** Ready for implementation
**Complexity:** Medium (3-4 workers, ~45 min)

---

## Audit Findings (from live site screenshots)

### P0 — Embarrassing (must fix)

1. **Duplicate filter panel** — The global controls (search, show, confidence, year range, display amounts) render TWICE on every view: once at the top AND again inside the main content area as a mobile sidebar. On desktop this looks broken — two identical filter sets visible simultaneously.

2. **Sankey diagram labels are cryptic** — "W2", "F4", "W6" mean nothing to users. Should show actual category names (e.g., "Improper Payments", "Defense Fraud"). Source labels use `snake_case` ("agency_data", "gao_audit", "think_tank") — should be human-readable.

3. **Legend/size reference overlaps bubble chart** — The confidence legend and "Size = Amount" reference bubbles float over actual data bubbles on the Explore view, blocking content.

4. **No visual storytelling hook** — The app opens to a wall of controls + bubbles. No hero number, no headline insight, no "here's why this matters" moment. First-time visitors have no idea what they're looking at for the first 10 seconds.

### P1 — Noticeable (should fix)

5. **Filter panel is too tall** — Takes up ~40% of viewport before any content appears. Controls should be collapsible or condensed on desktop (maybe a compact horizontal strip that expands on click).

6. **Stats view metric cards lack hierarchy** — The $9.9T-$12.4T hero number is good, but the 4 cards below (Entries, Fraud Total, Waste Total, Tier Mix) are all the same size/weight. Fraud vs Waste totals should be visually emphasized over "80 entries."

7. **Historical chart is sparse** — Lots of empty space in the time series. Data points are tiny dots with no connecting line weight variation. Spending event chips at the top are good but visually disconnected from the chart below.

8. **Color palette is monotone** — Almost everything is teal/emerald on dark gray. The confidence tier colors (green, blue, orange, red) are the only variety. Category colors in the bubble chart are hard to distinguish. Needs more intentional color hierarchy.

9. **Tab bar has 8 tabs** — Too many for horizontal nav. "Evidence" and "Stats" overlap conceptually. Consider consolidating or using a better navigation pattern (grouped tabs or scrollable).

10. **No subtle animations on view transitions** — Tab switches are instant cuts. Framer Motion is in the deps but not being used for page-level transitions.

### P2 — Nice to Have

11. **No OG image / social preview** — Sharing the link shows nothing
12. **Empty state handling** — Aggressive filters → 0 results → blank space
13. **Footer is minimal** — Just source attribution, could include version/last-updated
14. **No keyboard navigation** — Tab/arrow key support for chart elements

---

## Design Spec

### Phase 1: Hero & First Impression (Worker A)
**Files:** `Dashboard.tsx`, `AppShell.tsx`, `Header.tsx`, new `HeroStats.tsx`

- Add a **hero stats banner** below the header, above controls:
  - Large: "$9.9T - $12.4T in Federal Fraud & Waste (FY2003-2025)"
  - Subtitle: "Exposed across 80 evidence entries from GAO, DOJ, OIG, and CBO"
  - This replaces the current cold open into filters
- Make the filter panel **collapsible** on desktop — show a compact summary strip ("Showing: Fraud + Waste | All Tiers | FY2003-2025") with a "Filters ▼" expand button
- Fix duplicate filter panel — desktop should show ONE filter area (the top bar), mobile shows the sidebar version only
- Add subtle **Framer Motion fade/slide** on view transitions (200ms, ease-out)

### Phase 2: Chart Polish (Worker B)
**Files:** `BubbleChart.tsx`, `SankeyDiagram.tsx`, `TimeSeries.tsx`, `BudgetFraudCombo.tsx`

- **Sankey:** Replace cryptic labels ("W2", "F4") with full category names. Replace snake_case source labels with title case ("Agency Data", "GAO Audit", "Think Tank"). Add hover tooltips showing dollar amounts per flow.
- **Bubble chart:** Move legend/size reference outside the chart area (bottom-left below SVG, not overlapping). Add category labels that float near cluster centers (not on every bubble).
- **Time series:** Increase dot size, add subtle glow on hover. Make connecting lines thicker (2px). Better vertical spacing — chart should use more of available height.
- **All charts:** Consistent tooltip styling — dark card with emerald accent border, mono font for numbers.

### Phase 3: Visual Polish & Color (Worker C)
**Files:** `globals.css`, `BudgetMetrics.tsx`, stat cards, `BottomTabBar.tsx`, `Navigation.tsx`

- **Color depth:** Add a secondary accent (warm amber/gold for waste, keep emerald for fraud). Use this consistently across all views.
- **Stats cards:** Make Fraud Total and Waste Total visually dominant (larger font, colored accent). "Entries" and "Tier Mix" smaller/secondary.
- **Tab consolidation:** Merge "Stats" + "Evidence" into one "Data" tab with sub-tabs. Reduces nav from 8 to 7 items.
- **Micro-interactions:** Hover scale on cards (1.02x), subtle border glow on active tab, smooth scroll between sections.
- **OG meta image:** Generate a static OG image (1200x630) — dark background, "$9.9T+" headline, gradient accent.
- **Empty state:** When filters return 0 entries, show a centered message with a "Reset Filters" button instead of blank space.

---

## File Ownership (Worker Boundaries)

| Worker | Owns | Does NOT touch |
|--------|------|----------------|
| A (Hero/Layout) | `Dashboard.tsx`, `AppShell.tsx`, `Header.tsx`, new `HeroStats.tsx`, `GlobalControls.tsx`, `FilterSheet.tsx` | Chart components, `constants.ts`, `FilterContext.tsx` |
| B (Charts) | `BubbleChart.tsx`, `SankeyDiagram.tsx`, `TimeSeries.tsx`, `BudgetFraudCombo.tsx`, `BudgetStackedArea.tsx` | Layout components, `constants.ts`, `FilterContext.tsx` |
| C (Visual/Color) | `globals.css`, `BudgetMetrics.tsx`, `Navigation.tsx`, `BottomTabBar.tsx`, `layout.tsx`, stat-related UI, new `EmptyState.tsx` | Chart internals, `constants.ts`, `FilterContext.tsx` |

**Shared constraint:** Nobody modifies `constants.ts`, `FilterContext.tsx`, or `utils.ts`.

---

## Verification Gates

After each worker:
```bash
npm run build        # Must compile clean
npx vitest run       # All 96 tests must pass
```

After integration:
```bash
npm run dev          # Visual check on localhost
vercel --prod        # Deploy
```

## Acceptance Criteria

1. First-time visitor understands the story within 5 seconds (hero number)
2. No duplicate filter panels on desktop
3. Sankey labels are human-readable
4. Bubble chart legend doesn't overlap data
5. All 96 tests pass, build compiles clean
6. Mobile (375px+) still works properly
