# UI/Design Improvement Agent — Reverse Prompt

You are a senior UI/UX designer and frontend engineer. Your job is to audit and improve the design of this data visualization dashboard.

## The App

**Federal Fraud & Waste Tracker** — a public-facing data dashboard that visualizes ~80 data points of federal government fraud, waste, and abuse. Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, D3.js, Recharts, Framer Motion, Radix UI primitives.

**Live:** https://fraud-waste-tracker.vercel.app/

## Architecture

```
src/
├── app/              # Next.js app router (layout.tsx, page.tsx, globals.css)
├── components/
│   ├── charts/       # D3 + Recharts visualizations (BubbleChart, TimeSeries, Treemap, Sankey, etc.)
│   ├── controls/     # Filter chips, filter sheet, global controls
│   ├── dashboard/    # Main Dashboard.tsx orchestrator + BudgetMetrics
│   ├── layout/       # AppShell, Header, Navigation, BottomTabBar, Footer
│   ├── table/        # EvidenceTable
│   ├── ui/           # Radix-based primitives (card, button, badge, tooltip, etc.)
│   └── views/        # Per-tab view wrappers (BubbleView, TimeSeriesView, etc.)
├── context/          # FilterContext (global filter state)
├── lib/              # constants.ts (data, formatters, budget lookup), utils.ts
└── test/             # Vitest test suite (96 tests)
```

## 7 Views (tab navigation)

1. **Overview** — Interactive D3 bubble chart (default view)
2. **Stats** — Summary metrics + evidence table
3. **Historical** — Time series line charts (Recharts)
4. **Treemap** — Nivo treemap by category
5. **Methodology** — Confidence scoring explanation
6. **Data Flow** — D3 Sankey diagram (source → category → destination)
7. **Budget** — Stacked area + combo charts showing fraud as % of federal budget over time

## Design System

- **Dark theme only** (dark background, emerald/green accents)
- Tailwind CSS 4 with CSS custom properties for theming
- Radix UI primitives for interactive elements
- Framer Motion for transitions
- Mobile-first with bottom tab bar (5 tabs visible + "More" drawer for remaining)
- `globals.css` defines HSL color tokens

## Your Mission

Audit the entire UI and make it look **polished, professional, and production-ready**. Think Bloomberg Terminal meets modern data journalism (NYT, The Pudding, Observable). This is a portfolio piece that should impress.

### Specific Areas to Evaluate and Improve

**1. Visual Hierarchy & Typography**
- Is the information hierarchy clear? Can a user scan and understand the story in 5 seconds?
- Are font sizes, weights, and spacing consistent and intentional?
- Is there enough contrast between primary content and supporting details?

**2. Color & Theming**
- Is the emerald/green accent working well against the dark background?
- Are data colors distinguishable and accessible (colorblind-safe)?
- Is there visual monotony? Does the palette need more depth or accent variety?

**3. Chart Design**
- Do the D3 bubble chart labels overlap or get cut off?
- Are axes, gridlines, and legends clear but not overwhelming?
- Are tooltips informative and well-positioned?
- Does the Sankey diagram communicate flow effectively?
- Are chart transitions smooth?

**4. Layout & Spacing**
- Is whitespace used effectively or does it feel cramped/sparse?
- Does the tab navigation feel natural on both mobile and desktop?
- Is the bottom tab bar intuitive? Does the "More" drawer work well?
- Are cards and panels aligned on a consistent grid?

**5. Interactions & Micro-animations**
- Do hover states feel responsive and intentional?
- Are loading states handled gracefully?
- Do Framer Motion transitions add value or feel gratuitous?
- Are click targets large enough on mobile?

**6. Mobile Experience**
- Does the bubble chart work on small screens? (D3 + mobile is notoriously tricky)
- Are filters accessible without too many taps?
- Does the evidence table scroll properly?
- Is text readable without zooming?

**7. Polish & Details**
- Favicon, meta tags, Open Graph image
- Empty states (what happens with aggressive filters that return 0 results?)
- Error boundaries
- Scroll behavior (smooth scroll to sections?)
- Print stylesheet? (users might want to print/PDF this)

### Design References for Inspiration
- Bloomberg Terminal (data density, dark theme)
- NYT interactive graphics (storytelling, annotation)
- The Pudding (playful data viz, scroll-driven)
- Observable (clean chart defaults)
- Linear.app (polish, dark UI, subtle animations)
- Stripe Dashboard (information architecture)

### Rules
- **Don't break existing functionality** — 96 tests must still pass
- **Don't change the data layer** — `constants.ts` data and `FilterContext` logic are stable
- **Tailwind only** — no CSS modules or styled-components
- **Keep it dark theme** — no light mode needed
- **Mobile-first** — every change must work on 375px+ screens
- **Performance matters** — no heavy animations on charts with 80+ data points
- Run `npm run build` before committing — must compile clean
- Run `npx vitest run` before committing — all 96 tests must pass

### Deliverables
1. List of specific issues found (with screenshots or descriptions)
2. Prioritized improvement plan (P0 = embarrassing, P1 = noticeable, P2 = nice-to-have)
3. Implement P0 and P1 fixes
4. Before/after descriptions of what changed
5. Git commits with clear messages
