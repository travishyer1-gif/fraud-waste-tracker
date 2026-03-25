# Mobile-First Refactor Spec

## Current State (from screenshots at 390×844 / iPhone 14 Pro)

### What's Working ✅
- Stats page actually looks decent — category breakdowns stack vertically, cards readable
- Evidence table rows are scannable (tier badge + ID + title visible)
- Pagination works
- Methodology panel and footer render fine
- Filter controls stack vertically and are usable
- Dark mode is solid

### What's Broken/Bad ❌

#### Header (all pages)
- Logo + title + "State Data" toggle + theme button crammed into one line
- Title wraps awkwardly ("Federal Fraud & Waste Tracker" is too long for mobile)
- No hamburger menu — all 7 nav tabs overflow horizontally
- "Confidence" and "Data Flow" and "Evidence" tabs are cut off / require scrolling
- Tab text is too small with icons taking precious space

#### Overview (Bubble Chart)
- SVG renders at desktop size, forced into 390px container — bubbles overflow and clip
- Labels overlap heavily, unreadable at this size
- Legend overlaps the chart data
- Touch targets too small for individual bubbles
- No pinch-to-zoom
- The controls panel + description text push the actual chart way down — user has to scroll past a wall of text and filters to see anything

#### Stats (Dashboard)
- Hero section works OK
- Category breakdown labels truncate ("Employee/Interna...", "Defense/Contract...")
- Two-column layout for Fraud/Waste should stack to single column on mobile
- Summary cards at bottom are tiny 2x2 grid — text is cramped
- Tier donut chart is minuscule

#### Treemap
- Not tested but D3 treemap will have same SVG overflow issue
- Labels will overlap at small sizes
- Touch targets for individual rectangles too small

#### Trends
- Chart renders blank (no visible chart in the dark area)
- Spending event chips wrap nicely but push chart very far down
- "Show as % of Federal Budget" checkbox hard to tap
- Context cards below chart are readable but long

#### Confidence
- Same chart rendering issue (likely blank/tiny)
- Tier description panels should work fine (text-based, collapsible)

#### Data Flow (Sankey)
- Crashes entirely (existing bug, separate from mobile)

#### Evidence Table
- Columns are cramped — Tier + ID + Title barely fit
- No horizontal scroll indicator
- Expandable rows work but expanded content is dense
- "Export CSV" button placement fine

---

## Mobile-First Refactor Plan

### Priority 1: Layout & Navigation

#### A. Responsive Header
- **Mobile (<768px):** Collapse header to single row:
  - Left: Shield icon only (no text title)
  - Center: Current page name
  - Right: Hamburger menu icon
- Hamburger opens a full-screen overlay with:
  - All 7 nav items as large tap targets (48px min height)
  - State Data toggle
  - Theme toggle
  - Close button
- **Tablet (768-1024px):** Show icon + abbreviated title ("FW Tracker"), horizontal tabs
- **Desktop (1024+):** Current layout (unchanged)

#### B. Bottom Tab Bar (Alternative — Recommended)
- More native-feeling on mobile: fixed bottom bar with 5 icons
- Overview | Stats | Trends | Evidence | More (opens drawer with Treemap, Confidence, Data Flow)
- 48px height, icon + label, active state highlight
- Hides on scroll down, shows on scroll up (like iOS Safari)

#### C. Filter Drawer
- **Mobile:** Don't show filters inline. Instead:
  - Sticky "Filters" chip/button at top of content area
  - Shows active filter count badge (e.g. "Filters (3)")
  - Tap opens a slide-up bottom sheet / drawer with all controls
  - Apply button at bottom of drawer
  - Swipe down to dismiss
- **Desktop:** Keep inline sidebar/panel (current behavior)

### Priority 2: Chart Responsiveness

#### A. Bubble Chart (Overview)
- Set SVG viewBox dynamically based on container width
- On mobile: reduce bubble sizes proportionally
- Remove text labels from bubbles below certain size threshold — show only on tap
- Add pinch-to-zoom via d3-zoom
- Tap a bubble = show tooltip card (don't require hover)
- Category cluster labels: show only the 4-5 largest categories, hide others
- Consider: replace with a simpler card list on very small screens (<375px)

#### B. Treemap
- Set minimum rectangle size for tappability (44×44px per Apple HIG)
- Below that threshold, merge small entries into an "Other" rectangle
- Breadcrumb as horizontal scroll with < back button
- Tap anywhere = zoom or open detail (no hover required)
- Detail card: full-width bottom sheet instead of centered modal on mobile

#### C. Time Series & Confidence (Recharts)
- Ensure ResponsiveContainer uses 100% width
- Reduce Y-axis tick count on mobile (3-4 ticks instead of 6)
- Rotate X-axis labels 45° or use abbreviated years ('18, '19, '20...)
- Touch: tap a data point to show tooltip (not hover)
- Spending event chips: make scrollable horizontal row instead of wrapping
- Chart minimum height: 250px on mobile (currently may be collapsing to 0)

#### D. Sankey (Data Flow)
- Fix the rendering bug first (node indices)
- On mobile: vertical layout instead of horizontal (left-to-right → top-to-bottom)
- Or: replace with a simplified flow list (Source → Category → Tier as nested cards)

### Priority 3: Component Adjustments

#### A. Evidence Table → Card View
- On mobile, replace table with card list:
  - Each card: Tier badge | Title | Amount | Category tag
  - Tap to expand full details
  - Swipeable left for quick actions (share, bookmark?)
- Keep table on desktop
- Breakpoint: 768px

#### B. Stats Dashboard
- Hero: Full width, large numbers, vertically stacked
- Category breakdown: Single column on mobile
  - Each category as a card with progress bar
  - Amount right-aligned
  - Full label (no truncation)
- Summary cards: 2×1 stack (2 per row) with larger text
- Tier donut: Render larger (200px) or switch to horizontal bar

#### C. Detail Modals / Cards
- On mobile: all detail popups should be bottom sheets (slide up from bottom)
- Full width, rounded top corners, drag handle to dismiss
- Max 70vh height, scrollable content
- Never use centered modals on mobile (waste of space)

### Priority 4: Performance & Touch

#### A. Touch Optimization
- All tap targets minimum 44×44px (Apple HIG)
- Add touch-action CSS for chart areas (prevent accidental scroll on drag)
- Debounce filter changes on mobile (reduce re-renders)

#### B. Lazy Loading
- Only render the active view's chart (don't mount all 7 D3 instances)
- Lazy import chart components with next/dynamic
- Skeleton loading states while charts initialize

#### C. Viewport & Meta
- Ensure proper viewport meta: `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">`
- Allow pinch-to-zoom on charts (remove user-scalable=no if present)
- Safe area insets for notch/dynamic island

### Priority 5: Progressive Enhancement

#### A. Offline / PWA (future)
- Service worker for offline access to cached data
- manifest.json for "Add to Home Screen"
- Not in this sprint but worth noting

#### B. Share
- Each view should have a share button that generates a URL with current filter state as query params
- On mobile, use Web Share API (native share sheet)

---

## Implementation Plan

### Phase 1: Navigation + Filters (biggest impact)
- Bottom tab bar OR hamburger menu
- Filter bottom sheet
- ~1 worker

### Phase 2: Chart Responsiveness
- Bubble chart viewport fix + touch
- Recharts responsive fix (Trends + Confidence)
- Evidence card view
- ~2 workers (D3 worker + Recharts/table worker)

### Phase 3: Component Polish
- Stats dashboard mobile layout
- Bottom sheet detail modals
- Category label truncation fix
- ~1 worker

### Phase 4: Touch & Performance
- Lazy loading
- Touch targets
- Debouncing
- ~1 worker

**Estimated total: 4-5 workers, 2-3 phases**

---

## Breakpoints

| Name | Width | Layout |
|------|-------|--------|
| Mobile S | <375px | Single column, simplified charts |
| Mobile | 375-767px | Single column, full charts with touch |
| Tablet | 768-1023px | Hybrid (some side-by-side) |
| Desktop | 1024px+ | Current layout |

## Key Decisions Needed from Travis

1. **Bottom tab bar vs hamburger menu?** Bottom tabs feel more native but limit to 5 visible items. Hamburger hides everything but is one tap away.

2. **Card view for Evidence on mobile?** Cards are more scannable but lose the "full audit table" feel that makes it credible.

3. **Simplify bubble chart on mobile?** Could replace with a ranked card list that's more scannable, or keep the D3 viz with touch improvements.

4. **PWA / "Add to Home Screen" — worth doing now or later?**
