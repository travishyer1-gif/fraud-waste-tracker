# Round 2 Spec — Pending Changes

## Already In Flight (Workers Running)
- [ ] Dual-range confidence slider (min + max tier)
- [ ] Reset filters button fix
- [ ] % of budget toggle
- [ ] State data overlay toggle (nav bar, off by default, "Coming Soon")
- [ ] Trends: 12 spending events (TARP through CHIPS Act)
- [ ] Trends: Toggleable events with counterfactual lines
- [ ] Trends: % of budget view
- [ ] Trends: Enriched time series data
- [ ] Confidence: Collapsible tier description sections below chart
- [ ] Sources: Fix broken Sankey page (crashes/forces reload)
- [ ] Patronage Tax: W4-001 (Procurement-Lobbying Nexus $77B), W4-002 (Top 5 Defense Concentration $771B)

## Queued (From Travis's Latest Feedback)

### Dashboard ↔ Scale Swap
- Current Dashboard content (hero counter, category breakdown, summary cards) → move to Scale page
- Current Scale content (bubble chart) → move to Dashboard as the landing page
- Rationale: The bubble chart is more visceral as a first impression

### Patronage Tax — Additional Content to Add
**W4-003: Earmark Misallocation Examples (FY2024)**
- Earmarks bypass merit-based agency review
- Allocated by seniority, not project viability
- Examples: "Thanksgiving Parade Foundations", "Environmental Justice Centers"
- $14.6B total, but the waste is the misallocation, not the dollar amount itself
- Overlap with W7 earmark entries — different framing (W7 = total earmarks, this = quality of earmark spending)

**W4-004: SEC Pay-to-Play & Campaign Finance Nexus**
- SEC Rule 206(4)-5 prohibits investment advisers from compensation if they've made political contributions to officials of government entities
- Rule is narrow (mostly pension fund management), doesn't cover vast majority of federal procurement
- Citizens United + campaign finance looseness = corporations funnel money to "independent" expenditure groups
- Correlation between campaign contributions and contract awards = de facto "entry fee" for federal marketplace
- This is Tier 3 (academic/think tank research level)
- Amount: hard to quantify directly, but the lobbying premium from W4-001 is the monetary manifestation

### Sources vs Evidence Page
- Travis unsure how Sources (Sankey) differs from Evidence (table)
- Consider: rename "Sources" to "Flow" or "Data Flow" to clarify it's about WHERE evidence comes from, not the evidence itself
- Or: merge into Evidence page as a tab/toggle

## Not Yet Specced (Need Discussion)
- How exactly should the counterfactual lines work mathematically?
- Should state data overlay eventually include California specifically? (per original taxonomy spec)
- Mobile responsive improvements?
- Custom domain?
