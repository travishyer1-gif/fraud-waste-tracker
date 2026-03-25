# Consolidated Federal Fraud & Waste Dataset
**Version:** 1.0  
**Compiled:** 2026-03-24  
**Sources Merged:** research-federal-ig-fraud.md · research-federal-payments-gao-doj.md · research-federal-waste-thinktank.md  
**Taxonomy Reference:** govt-fraud-waste-taxonomy.md  
**Coverage:** FY2003–FY2025 (primary focus FY2018–FY2025)  
**Jurisdiction:** Federal only (California flagged as future work)

---

## ⚠️ CRITICAL READING NOTICE

This dataset contains three distinct types of figures that MUST NOT be added together:

1. **Confirmed fraud** — intentional theft, prosecuted/settled (small fraction of improper payments)
2. **Improper payments** — includes both fraud AND administrative error; most are errors
3. **Waste estimates** — legal spending deemed inefficient; not theft at all

The IRS Tax Gap ($496–$606B/year) is the largest single figure here. It is **not criminal fraud** — it is the gap between taxes owed and taxes paid voluntarily, encompassing honest mistakes, ambiguous law, and intentional evasion alike.

When constructing any "total fraud and waste" figure, consult the DOUBLE COUNTING MATRIX before summing any two entries.

---

## SUMMARY STATISTICS

### Non-Overlapping Fraud Estimate (Annual, Post-COVID Normalization)

| Tier | Floor | Ceiling | Notes |
|------|-------|---------|-------|
| **Confirmed (Tier 1 only)** | **$4.2B/yr** | **$9.0B/yr** | Only explicitly confirmed intentional fraud: HHS $3.51B + USDA $155M + DOD/DCIS ~$500M. DOJ FCA annual recoveries ($2.2–5.6B) overlap with HHS confirmed figure. |
| **Officially Estimated (Tier 1–2)** | **$25B/yr** | **$50B/yr** | Adds EITC/refundable credit improper payments ($21–28B/yr, not all fraud) + benefits fraud (SSA/UI ~$2B/yr) + DOD fraud. Does NOT include broad tax gap. |
| **Including Tax Non-Compliance (Tier 1–2)** | **$521B/yr** | **$650B/yr** | Adds IRS net tax gap ($496–$606B). Tax gap ≠ criminal fraud; includes honest errors and legal gray areas. |

**Best annual fraud range (excluding tax gap): $25B–$50B/year**  
**If EITC improper payments treated as waste, not fraud: $4B–$10B/year confirmed**

### Non-Overlapping Waste Estimate (Annual)

| Category | Annual Floor | Annual Ceiling | Basis |
|----------|-------------|----------------|-------|
| W1 Duplication (annualized GAO savings) | $20B | $50B | $429B cumulative savings 2011-2021 ÷ 11 years |
| W2 Cost Overruns | $5B | $25B | Ongoing F-35, Sentinel, NASA program overruns |
| W3 Idle Assets | $2B | $5B | Portion of $10.3B real property costs attributable to underutilization |
| W4 Admin Overhead | $5B | $20B | Tier 3 estimates only; no Tier 1 standalone figure |
| W5 Failed Programs/IT | $18B | $30B | GAO-estimated at-risk IT spend $18–27B + VA EHR amortized |
| W6 Improper Payments (error, not fraud) | $97B | $150B | HHS alone $97B Tier 1; govt-wide $150B+ per GAO |
| W7 Earmarks/Pork | $14.6B | $22.7B | GAO official $14.6B (FY2024) to CAGW methodology $22.7B |

**Best annual waste range: $162B–$303B/year**  
*Note: W6 improper payments are already included in HHS program outlays — they are errors in disbursement, not additional spending.*

### Combined Floor and Ceiling (Conservative, No Tax Gap)

| Scenario | Annual Floor | Annual Ceiling |
|----------|-------------|----------------|
| **Fraud (confirmed + EITC)** | $25B | $50B |
| **Waste (excl. COVID anomalies)** | $162B | $303B |
| **Combined** | **$187B/yr** | **$353B/yr** |
| **COVID peak (FY2021)** | **$281B+ (improper alone)** | **$500B+** | |

*Note: The $187–$353B annual combined range does NOT double-count. It uses the non-overlapping root entries only (see DOUBLE COUNTING MATRIX).*

### Data Point Count by Tier

| Tier | Fraud Entries | Waste Entries | Total |
|------|--------------|---------------|-------|
| Tier 1 (Confirmed/Audited) | 19 | 23 | **42** |
| Tier 2 (Officially Estimated) | 12 | 11 | **23** |
| Tier 3 (Think Tank/Independent) | 5 | 7 | **12** |
| Tier 4 (Reported) | 0 | 0 | **0** |
| **Total** | **36** | **41** | **77** |

### Data Point Count by Category

| Category | Count | Key Dollar Anchor |
|----------|-------|------------------|
| F1 — Healthcare Fraud | 10 | $3.51B/yr confirmed; $2.9B DOJ FCA recoveries |
| F2 — Defense/Contractor Fraud | 4 | ~$500M/yr DCIS + DOJ FCA defense |
| F3 — Benefits Fraud | 7 | $155M/yr confirmed (USDA); $3B/yr SSA overpayments |
| F4 — Tax Fraud/Evasion | 7 | $496–$606B/yr tax gap; $21–28B/yr EITC improper |
| F5 — Grant/Research Fraud | 1 | $45–136B COVID programs (multi-year, winding down) |
| F6 — Employee/Internal Fraud | 0 | **GAP — no Tier 1–2 data in this dataset** |
| F7 — Disaster/Emergency Fraud | 6 | $76–200B COVID SBA/PPP (cumulative 2020-2022) |
| W1 — Duplicative Programs | 5 | $429B savings achieved 2011-2021 |
| W2 — Cost Overruns | 7 | $165B F-35 cumulative overrun; $756B nuclear 10-yr |
| W3 — Idle/Underused Assets | 4 | $370B deferred maintenance backlog; $10.3B/yr operating |
| W4 — Admin Overhead | 1 | $30–80B/yr Tier 3 only |
| W5 — Failed Programs | 8 | $606B tax gap; $21–50B VA EHR; $18–27B IT at-risk |
| W6 — Improper Payments (Non-Fraud) | 12 | $97B HHS FY2025; $150B+ govt-wide |
| W7 — Pork/Earmarks | 7 | $14.6–22.7B/yr; $759B High-Risk savings cumulative |

---

## PART I — FRAUD DATA POINTS

---

### F1: HEALTHCARE FRAUD

---

**F1-001**
```
ID: F1-001
TITLE: HHS Confirmed Fraud (Intentional Monetary Loss) FY2025
CATEGORY: F1
AMOUNT_BEST: $3,510,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov HHS Agency Profile FY2025 — Confirmed Fraud Section
SOURCE_URL: https://paymentaccuracy.gov/agency/HHS/2025
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Agency-reported intentional monetary loss improper payments under PIIA definitions. Explicitly labeled as confirmed fraud (intentional), distinct from unintentional improper payments. Covers 10 risk-susceptible programs.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of the $97.33B total HHS improper payments (W6-001). Represents ~3.6% of total HHS improper payments. Some of these confirmed fraud cases are simultaneously counted in DOJ FCA healthcare recoveries (F1-002 through F1-004) if federally prosecuted. DO NOT add F1-001 to DOJ FCA annual totals without adjusting for overlap.
ENTITY_LINKS: HHS, Medicare, Medicaid, CHIP, APTC, Head Start, CCDF, Foster Care
```

---

**F1-002**
```
ID: F1-002
TITLE: DOJ False Claims Act Recoveries FY2024
CATEGORY: F1
AMOUNT_BEST: $2,900,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.95
JURISDICTION: federal
SOURCE_NAME: DOJ Civil Division FCA Statistics FY2024
SOURCE_URL: https://www.justice.gov/civil/false-claims-act
SOURCE_TYPE: doj_settlement
SOURCE_METHODOLOGY: DOJ official reported figure for civil settlements and judgments under the False Claims Act. Does NOT include criminal fines/forfeiture. Healthcare represents ~75% of total; defense ~20%; other ~5%. As of FY2024, 83%+ of FCA actions initiated by whistleblowers (qui tam). Treble damages + per-claim penalties ($13,000–$27,000/claim).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: RECOVERIES ≠ TOTAL FRAUD. Total underlying fraud is much larger — DOJ only recovers a fraction of what is stolen. Healthcare portion (~$2.2B) overlaps with HHS confirmed fraud (F1-001) if the same cases are counted by both HHS OIG and DOJ. Defense portion (~$580M) overlaps with F2-004 (DOJ FCA defense contractor fraud). DO NOT sum with HHS confirmed fraud figures directly.
ENTITY_LINKS: DOJ Civil Division, Medicare, Medicaid, DOD, HHS-OIG
```

---

**F1-003**
```
ID: F1-003
TITLE: DOJ False Claims Act Recoveries FY2021 (Record Year)
CATEGORY: F1
AMOUNT_BEST: $5,600,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2021
FISCAL_YEAR_END: 2021
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: DOJ Civil Division FCA Annual Statistics FY2021
SOURCE_URL: https://www.justice.gov/civil/false-claims-act
SOURCE_TYPE: doj_settlement
SOURCE_METHODOLOGY: DOJ official reported figure. Record year driven by opioid manufacturer settlements, COVID-related healthcare fraud, and pharmaceutical off-label marketing cases.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Anomalously high due to multi-year settlements (Purdue Pharma, McKinsey). Large pharmaceutical settlements skew this year. Healthcare portion overlaps with F1-001 methodology. Opioid/pharma portion overlaps with F1-006 cumulative figure.
ENTITY_LINKS: DOJ, Medicare, Medicaid, Purdue Pharma, pharmaceutical industry
```

---

**F1-004**
```
ID: F1-004
TITLE: DOJ False Claims Act Recoveries FY2020
CATEGORY: F1
AMOUNT_BEST: $2,200,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2020
FISCAL_YEAR_END: 2020
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: DOJ Civil Division FCA Annual Statistics FY2020
SOURCE_URL: https://www.justice.gov/civil/false-claims-act
SOURCE_TYPE: doj_settlement
SOURCE_METHODOLOGY: DOJ official reported figure. $1.6B from cases filed under FCA. Qui tam whistleblowers received $309M in rewards. Healthcare ~80% of recoveries. FY2020 slightly depressed by COVID court slowdowns.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Same overlap structure as F1-002. Healthcare portion potentially overlaps with HHS improper payment data for same year.
ENTITY_LINKS: DOJ, Medicare, Medicaid
```

---

**F1-005**
```
ID: F1-005
TITLE: DOJ FCA Cumulative Recoveries 1987–2019
CATEGORY: F1
AMOUNT_BEST: $62,000,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 1987
FISCAL_YEAR_END: 2019
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: DOJ Civil Division FCA Cumulative Statistics; Wikipedia False Claims Act (citing DOJ)
SOURCE_URL: https://en.wikipedia.org/wiki/False_Claims_Act
SOURCE_TYPE: doj_settlement
SOURCE_METHODOLOGY: DOJ official cumulative figure. $62.1B in FCA recoveries between 1987–2019. Of this, $44.7B (72%) from qui tam whistleblower cases.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: CUMULATIVE ONLY. Do not annualize or add to post-2019 annual figures without adjusting. Post-2019 recoveries add approximately $15–20B more through 2024 (F1-002 through F1-004 combined ≈ $19.7B for FY2020+2021+2022+2023+2024 approximate).
ENTITY_LINKS: DOJ, Medicare, Medicaid, DOD, healthcare industry
```

---

**F1-006**
```
ID: F1-006
TITLE: DOJ FCA Pharmaceutical/Opioid Settlements FY2018–2021 (Cumulative)
CATEGORY: F1
AMOUNT_BEST: $8,000,000,000
AMOUNT_LOW: $5,000,000,000
AMOUNT_HIGH: $12,000,000,000
FISCAL_YEAR_START: 2018
FISCAL_YEAR_END: 2021
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.75
JURISDICTION: federal
SOURCE_NAME: DOJ FCA settlements; major pharma settlement press releases; Purdue Pharma / McKinsey settlement reporting
SOURCE_URL: https://www.justice.gov/civil/false-claims-act
SOURCE_TYPE: doj_settlement
SOURCE_METHODOLOGY: Major opioid-related FCA settlements including Purdue Pharma ($6B+), McKinsey & Co, and numerous pharmaceutical distributor off-label marketing settlements. Only federal portion counted (not state AG portions).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of the FY2018–2021 annual DOJ FCA totals (F1-002 through F1-004 era). These same dollars appear in those annual totals. F1-003 (FY2021 record $5.6B) is substantially driven by settlements counted here. DO NOT add to annual totals.
ENTITY_LINKS: DOJ, Purdue Pharma, McKinsey, pharmaceutical industry, Medicare, Medicaid
```

---

**F1-007**
```
ID: F1-007
TITLE: Medicare Fee-for-Service CERT Annual Improper Payments (FY2019–2024)
CATEGORY: F1
AMOUNT_BEST: $31,000,000,000
AMOUNT_LOW: $25,000,000,000
AMOUNT_HIGH: $50,000,000,000
FISCAL_YEAR_START: 2019
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: CMS Comprehensive Error Rate Testing (CERT) Program; paymentaccuracy.gov HHS Agency Profile
SOURCE_URL: https://paymentaccuracy.gov/agency/HHS
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: CMS uses the CERT program — statistically valid sample of Medicare FFS claims reviewed by independent contractors. Claims compared against coverage and documentation requirements. One of the most rigorous sampling methodologies in federal government. Range reflects year-to-year variation.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of W6-001 (total HHS improper payments). Medicare FFS is the single largest component of HHS improper payments (~$25–50B/year). NOT all of this is fraud — most is documentation failures and billing errors. The fraud subset is much smaller and is the portion eligible for DOJ FCA recovery (F1-002). DO NOT add to W6-001 total.
ENTITY_LINKS: CMS, Medicare, HHS
```

---

**F1-008**
```
ID: F1-008
TITLE: Medicaid Annual Improper Payments (FY2023 Estimate)
CATEGORY: F1
AMOUNT_BEST: $36,000,000,000
AMOUNT_LOW: $20,000,000,000
AMOUNT_HIGH: $50,000,000,000
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2023
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.70
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov HHS Agency Profile; CMS T-MSIS data; GAO High-Risk GAO-25-107743
SOURCE_URL: https://paymentaccuracy.gov/agency/HHS
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: CMS uses T-MSIS supplemented by state-level reviews. Medicaid is jointly federal-state; federal share typically 50–75%. Massive expansion under COVID continuous enrollment provision 2020–2023; unwinding reduced rolls ~25M enrollees in 2023–2024.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of W6-001 through W6-005 (HHS annual improper payments). Medicaid and Medicare FFS together typically account for ~70–80% of total HHS improper payments. DO NOT add Medicaid estimate to HHS total — it is already included. The fraud fraction is further counted in DOJ FCA healthcare recoveries.
ENTITY_LINKS: CMS, Medicaid, HHS, state Medicaid agencies
```

---

**F1-009**
```
ID: F1-009
TITLE: DOJ FCA Recoveries FY2023 (Approximate)
CATEGORY: F1
AMOUNT_BEST: $2,680,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2023
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.78
JURISDICTION: federal
SOURCE_NAME: DOJ FCA Annual Statistics FY2023; widely cited in oversight literature
SOURCE_URL: https://www.justice.gov/civil/false-claims-act
SOURCE_TYPE: doj_settlement
SOURCE_METHODOLOGY: Widely cited figure for FY2023 DOJ FCA total. Healthcare ~85% of recoveries. Methodology same as F1-002.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Same overlap structure as F1-002. This is a continuation of the annual series.
ENTITY_LINKS: DOJ, Medicare, Medicaid
```

---

**F1-010**
```
ID: F1-010
TITLE: DOJ FCA Recoveries FY2018–FY2019 (Annual)
CATEGORY: F1
AMOUNT_BEST: $2,950,000,000
AMOUNT_LOW: $2,900,000,000
AMOUNT_HIGH: $3,000,000,000
FISCAL_YEAR_START: 2018
FISCAL_YEAR_END: 2019
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: DOJ FCA Annual Statistics FY2018–2019
SOURCE_URL: https://www.justice.gov/civil/false-claims-act
SOURCE_TYPE: doj_settlement
SOURCE_METHODOLOGY: FY2018: $2.9B; FY2019: $3.0B. Average used as AMOUNT_BEST. Consistent with annual range of $2.2–$3B outside anomalous years.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Same structure as F1-002. Healthcare ~70–80% of recoveries in this period.
ENTITY_LINKS: DOJ, Medicare, Medicaid, DOD
```

---

### F2: DEFENSE/CONTRACTOR FRAUD

---

**F2-001**
```
ID: F2-001
TITLE: DOD OIG DCIS — Civil Judgments/Settlements (Oct 2022–Mar 2023, 6 months)
CATEGORY: F2
AMOUNT_BEST: $282,400,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2022
FISCAL_YEAR_END: 2023
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.93
JURISDICTION: federal
SOURCE_NAME: DOD OIG Semiannual Report to Congress, Oct 1 2022–Mar 31 2023
SOURCE_URL: https://www.dodig.mil/Reports/Semiannual-Report-to-the-Congress/Article/3411239/semiannual-report-to-the-congress-october-1-2022-through-march-31-2023/
SOURCE_TYPE: ig_report
SOURCE_METHODOLOGY: DCIS (Defense Criminal Investigative Service) completed 172 criminal investigations in 6-month period. 118 arrests, 115 criminal charges, 116 convictions. This figure covers civil judgments and settlements only.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: 6-MONTH SNAPSHOT ONLY. Annual total would require combining both semiannual reports. Civil judgments may overlap with DOJ FCA totals (F1-002) if DOJ jointly prosecuted — the same case may be counted in both. F2-002 (criminal fines) is a SEPARATE, non-overlapping figure from the same report. If estimating annual: ~$565M civil + ~$295M criminal = ~$860M/year (rough extrapolation).
ENTITY_LINKS: DOD, DCIS, DOD-OIG, defense contractors
```

---

**F2-002**
```
ID: F2-002
TITLE: DOD OIG DCIS — Criminal Fines, Penalties, Restitution (Oct 2022–Mar 2023, 6 months)
CATEGORY: F2
AMOUNT_BEST: $147,400,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2022
FISCAL_YEAR_END: 2023
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.93
JURISDICTION: federal
SOURCE_NAME: DOD OIG Semiannual Report to Congress, Oct 1 2022–Mar 31 2023
SOURCE_URL: https://www.dodig.mil/Reports/Semiannual-Report-to-the-Congress/Article/3411239/semiannual-report-to-the-congress-october-1-2022-through-march-31-2023/
SOURCE_TYPE: ig_report
SOURCE_METHODOLOGY: Criminal disposition reporting from DCIS. Includes fines, penalties, and restitution ordered in criminal proceedings.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SEPARATE from F2-001 (civil amounts). Criminal fines ≠ civil settlements — these are different legal proceedings. Combined civil + criminal for this 6-month period = ~$429.8M. NOT part of DOJ FCA statistics (FCA is civil only). Can be safely added to F2-001 without double-counting.
ENTITY_LINKS: DOD, DCIS, DOD-OIG
```

---

**F2-003**
```
ID: F2-003
TITLE: DOD Financial Audit — Sixth Consecutive Failure (FY2023)
CATEGORY: F2
AMOUNT_BEST: N/A
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2023
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.95
JURISDICTION: federal
SOURCE_NAME: DOD FY2023 Agency Financial Report; DOD OIG Audit Opinion
SOURCE_URL: https://comptroller.defense.gov/Portals/45/Documents/afr/fy2023/fy2023_afr.pdf
SOURCE_TYPE: ig_report
SOURCE_METHODOLOGY: Independent public accounting firms (Big 4) conduct annual DOD financial statement audit since FY2018. Disclaimer of opinion = auditors cannot express opinion. $800B+ annual budget; cannot reconcile trillions in transactions. Marine Corps recently achieved clean opinion; other components have not.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: AUDIT FAILURE ≠ FRAUD. Indicates unauditable books (missing documentation, unsupported journal entries, unreconciled accounts) — a necessary precondition for undetected fraud at scale, but no specific fraud dollar can be derived from this finding alone. Related to W5-004 (DOD Financial Management as GAO High-Risk area).
ENTITY_LINKS: DOD, Pentagon, DOD-OIG, DCAA
```

---

**F2-004**
```
ID: F2-004
TITLE: DOJ FCA Defense Contractor Fraud — Annual Estimate (FY2018–2024)
CATEGORY: F2
AMOUNT_BEST: $500,000,000
AMOUNT_LOW: $300,000,000
AMOUNT_HIGH: $1,000,000,000
FISCAL_YEAR_START: 2018
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.65
JURISDICTION: federal
SOURCE_NAME: DOJ False Claims Act Annual Statistics; GAO DOD Contract Management High-Risk
SOURCE_URL: https://www.justice.gov/civil/false-claims-act
SOURCE_TYPE: doj_settlement
SOURCE_METHODOLOGY: Defense sector FCA cases involve overbilling, defective pricing, cost mischarging, and subcontractor fraud. Annual defense FCA recoveries approximately 15–20% of total FCA recoveries. Applied to $2.2B–$5.6B annual totals yields ~$300M–$1B/year defense fraud recovery.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of annual DOJ FCA totals (F1-002 series) — the defense portion thereof. Some cases also trigger DCIS criminal investigations counted in F2-001/F2-002. DO NOT add to DOJ FCA totals.
ENTITY_LINKS: DOD, defense contractors, DOJ, DCAA, DOD-OIG
```

---

### F3: BENEFITS FRAUD

---

**F3-001**
```
ID: F3-001
TITLE: SSA OASDI (Social Security) Overpayments FY2024
CATEGORY: F3
AMOUNT_BEST: $3,000,000,000
AMOUNT_LOW: $2,700,000,000
AMOUNT_HIGH: $3,300,000,000
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: SSA PIIA FY2025 Reporting — paymentaccuracy.gov; SSA Annual Stewardship Reviews
SOURCE_URL: https://paymentaccuracy.gov/agency/SSA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: SSA annual stewardship reviews using stratified random sampling. Total OASDI outlays ~$1.4T; overpayments $3.0B (0.21%); underpayments $975.5M. Down from $3.3B in FY2023.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: OASDI overpayments ≠ SSDI fraud. Primary causes: beneficiary failure to self-report marital status or wage changes (outside SSA control) — mostly administrative error, not intentional fraud. F3-002 (OASI $1.1B) and F3-003 (DI $1.8B) are SUBSETS of this $3.0B total. DO NOT add F3-001 + F3-002 + F3-003. Criminal SSDI fraud rings prosecuted by DOJ are a tiny subset of the $1.8B DI figure.
ENTITY_LINKS: SSA, SSA-OIG, OASDI, OASI, DI/SSDI
```

---

**F3-002**
```
ID: F3-002
TITLE: SSA OASI (Old-Age and Survivors Insurance) Overpayments FY2024
CATEGORY: F3
AMOUNT_BEST: $1,100,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: SSA PIIA FY2025 Reporting — paymentaccuracy.gov
SOURCE_URL: https://paymentaccuracy.gov/agency/SSA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: OASI outlays $1.3T; overpayments $1.1B (0.09%); underpayments $470.2M. First year SSA reported OASI and DI separately.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of F3-001 (total OASDI $3.0B). Cannot be added to F3-001 or F3-003.
ENTITY_LINKS: SSA, OASI
```

---

**F3-003**
```
ID: F3-003
TITLE: SSA Disability Insurance (DI/SSDI) Overpayments FY2024
CATEGORY: F3
AMOUNT_BEST: $1,800,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: SSA PIIA FY2025 Reporting — paymentaccuracy.gov
SOURCE_URL: https://paymentaccuracy.gov/agency/SSA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: DI outlays $143.4B; overpayments $1.8B (1.28%); underpayments $505.3M. OIG non-compliant finding: SSI program failed to demonstrate improvement.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of F3-001 (total OASDI $3.0B). Higher error rate than OASI (1.28% vs 0.09%) due to complexity of disability determination. Most are not fraud — top cause: employment/wage information not timely reported. SSA-OIG criminal fraud referrals are a small subset.
ENTITY_LINKS: SSA, SSA-OIG, DI, SSDI
```

---

**F3-004**
```
ID: F3-004
TITLE: SSA OASDI Overpayments FY2023
CATEGORY: F3
AMOUNT_BEST: $3,300,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2023
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: SSA PIIA FY2025 Reporting — paymentaccuracy.gov (prior year comparison)
SOURCE_URL: https://paymentaccuracy.gov/agency/SSA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Prior-year stewardship review comparison. Total OASDI outlays ~$1.4T; overpayments $3.3B (0.24%).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Same structure as F3-001 for FY2023. Do not add to FY2024 figure; these are sequential annual measurements.
ENTITY_LINKS: SSA, OASDI
```

---

**F3-005**
```
ID: F3-005
TITLE: USDA Confirmed Fraud (Intentional Monetary Loss) FY2025
CATEGORY: F3
AMOUNT_BEST: $155,100,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.88
JURISDICTION: federal
SOURCE_NAME: USDA PIIA Reporting FY2025 — paymentaccuracy.gov (Confirmed Fraud Section); paymentaccuracy.gov USDA Agency Profile FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/USDA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: USDA OIG determines "intentional monetary loss improper payments" separately from unintentional. This $155.1M is explicitly confirmed fraud (intentional) per FY2025 PIIA reporting.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of W6-006 (total USDA improper payments $13.42B). Represents ~1.2% of total USDA improper payments — confirmed intentional fraud only. SNAP (food stamps) is USDA's largest program. SNAP fraud cases also prosecuted by USDA-OIG; DOJ prosecutions are included here. Some may be counted in DOJ FCA statistics.
ENTITY_LINKS: USDA, USDA-OIG, SNAP, WIC, NSLP
```

---

**F3-006**
```
ID: F3-006
TITLE: USDA Overpayment Recovery Activities FY2025
CATEGORY: F3
AMOUNT_BEST: $458,390,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.87
JURISDICTION: federal
SOURCE_NAME: USDA PIIA Reporting FY2025 — paymentaccuracy.gov
SOURCE_URL: https://paymentaccuracy.gov/agency/USDA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Recovery activities: $652.56M identified, $458.39M recovered (70.24% recovery rate). OIG found USDA non-compliant with 4 of 6 PIIA requirements in FY2024.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: RECOVERIES ≠ NEW FRAUD. Recoveries represent recaptured overpayments, some of which may be from prior-year payments. Do not interpret as a separate "fraud" figure. This 70% recovery rate is strong compared to IRS (1.85% recovery rate on tax credit overpayments).
ENTITY_LINKS: USDA, SNAP, USDA-OIG
```

---

**F3-007**
```
ID: F3-007
TITLE: DOL Unemployment Insurance Improper Payments FY2025 (Regular Programs)
CATEGORY: F3
AMOUNT_BEST: $5,062,714,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov DOL Agency Profile FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/DOL
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: BAM (Benefit Accuracy Measurement) survey — statistically valid nationwide sample. 12.16% rate on $41.6B outlays. DOES NOT include pandemic UI programs (PUA, PEUC, FPUC, MEUC — expired Sept 2021). Recovery audits: $1,841.39M identified, $762.36M recovered (41.4%).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SEPARATE from F7-001 (COVID PUA fraud). The BAM survey explicitly excludes pandemic programs. The $5.06B reflects ongoing structural issues in regular UI. Not all $5.06B is fraud — includes eligibility errors, employer mis-reportings, claimant self-reporting failures. Confirmed fraud is a subset.
ENTITY_LINKS: DOL, DOL-OIG, unemployment insurance, states
```

---

### F4: TAX FRAUD/EVASION

---

**F4-001**
```
ID: F4-001
TITLE: IRS Gross Tax Gap — Projected Annual (Tax Years 2017–2019)
CATEGORY: F4
AMOUNT_BEST: $540,000,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2017
FISCAL_YEAR_END: 2019
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.88
JURISDICTION: federal
SOURCE_NAME: IRS Tax Gap Estimates — Tax Years 2017–2019 Projection
SOURCE_URL: https://www.irs.gov/newsroom/the-tax-gap
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: IRS periodic estimates via National Research Program (NRP), completed examination data, and statistical models. Gross tax gap = true tax liability minus taxes paid on time. Components: nonfiling ($41B), underreporting ($433B), underpayment ($66B).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: TAX GAP ≠ CRIMINAL FRAUD. Includes honest mistakes, ambiguous law, estimated omissions, and intentional evasion. Criminal prosecution component (TIGTA) is a tiny subset. Does not overlap with benefit fraud categories (F1–F3, F5–F7) unless the same individual commits both. SUPERSEDES F4-002 (earlier period). The $540B is GROSS — net of late payments and enforcement is lower. See F4-003 for net gap methodology (FY2022).
ENTITY_LINKS: IRS, Treasury, TIGTA
```

---

**F4-002**
```
ID: F4-002
TITLE: IRS Gross Tax Gap — Measured (Tax Years 2014–2016)
CATEGORY: F4
AMOUNT_BEST: $496,000,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2014
FISCAL_YEAR_END: 2016
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.92
JURISDICTION: federal
SOURCE_NAME: Federal Tax Compliance Research: Tax Gap Estimates for Tax Years 2014–2016 (IRS Pub 1415)
SOURCE_URL: https://www.irs.gov/pub/irs-pdf/p1415.pdf
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: IRS NRP — measured, not projected. Net gap after enforcement: $428B. Components: underreporting $398B, underpayment $59B, nonfiling $39B. Voluntary compliance rate ~85%.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: PRIOR PERIOD than F4-001. These represent a consistent trend across decades ($441B gross 2011-2013, $496B 2014-2016, $540B 2017-2019, $696B gross 2022). Do not add sequential periods — these are annual averages for each period. The $68B net-to-gross difference (late payments + enforcement) represents what IRS eventually collects.
ENTITY_LINKS: IRS, Treasury
```

---

**F4-003**
```
ID: F4-003
TITLE: IRS Net Tax Gap — Projected (Tax Year 2022)
CATEGORY: F4
AMOUNT_BEST: $606,000,000,000
AMOUNT_LOW: $606,000,000,000
AMOUNT_HIGH: $696,000,000,000
FISCAL_YEAR_START: 2022
FISCAL_YEAR_END: 2022
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.75
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series GAO-25-107743; IRS 2024 projection
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: IRS statistical projection. Gross gap $696B for TY2022; IRS estimates collecting ~$90B through late payments/enforcement; net gap = $606B uncollected. 3–5 year lag in IRS tax gap measurement.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: MOST RECENT AVAILABLE. $696B gross / $606B net. Shows significant growth from $540B (2017-19) and $496B (2014-16). Likely reflects increased gig economy unreported income and cryptocurrency. Also cited identically in W5-003 from the waste thinktank file — that W5-003 entry is a DUPLICATE of this entry. The same data appears under F4 (fraud) and W5 (waste/failed programs) in different source files; it belongs in F4 (tax non-compliance).
ENTITY_LINKS: IRS, Treasury, TIGTA, GAO
```

---

**F4-004**
```
ID: F4-004
TITLE: IRS Refundable Tax Credits Improper Payments FY2025 (EITC, AOTC, ACTC, PTC)
CATEGORY: F4
AMOUNT_BEST: $28,064,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov Treasury Agency Profile FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/TREASURY
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: IRS measurement using statistical sampling and tax return compliance data. 26.54% improper payment rate on $105.7B susceptible outlays. Covers EITC, AOTC (American Opportunity Tax Credit), ACTC (Additional Child Tax Credit), Net Premium Tax Credit. Rate not statistically different from FY2024.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: STRUCTURAL PROBLEM — IRS has stated without major legislation it cannot achieve compliance. This is not all intentional fraud: complexity of eligibility rules, lack of third-party wage data, inability to pre-verify before issuing refund. EITC alone historically $18–26B/year (see F4-005). Total $28B covers all four refundable credits. Recovery rate extraordinarily low: $34.49M recovered on $1,872.58M identified (1.84%). PARTIAL OVERLAP with F4-003 (tax gap) — EITC improper payments are a component of the underreporting gap.
ENTITY_LINKS: IRS, Treasury, Treasury-OIG (TIGTA)
```

---

**F4-005**
```
ID: F4-005
TITLE: EITC Improper Payments — Annual Structural Estimate (FY2023)
CATEGORY: F4
AMOUNT_BEST: $21,000,000,000
AMOUNT_LOW: $18,000,000,000
AMOUNT_HIGH: $26,000,000,000
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2023
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: IRS EITC Annual Report; paymentaccuracy.gov Treasury Profile
SOURCE_URL: https://paymentaccuracy.gov/agency/TREASURY
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: IRS statistical sampling. EITC historically has 21–26% improper rate. Structural causes: complexity, lack of third-party wage data for gig/cash workers, inability to pre-verify.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of F4-004 (the EITC component of the broader $28B refundable credits figure). EITC is the single largest component. Do not add F4-005 to F4-004. Also partially overlaps with tax gap (F4-003) since EITC fraud is one form of underreporting.
ENTITY_LINKS: IRS, Treasury, TIGTA
```

---

**F4-006**
```
ID: F4-006
TITLE: Treasury/IRS Overpayments Identified for Recovery FY2025
CATEGORY: F4
AMOUNT_BEST: $1,877,670,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.87
JURISDICTION: federal
SOURCE_NAME: Treasury PIIA FY2025 Reporting — paymentaccuracy.gov
SOURCE_URL: https://paymentaccuracy.gov/agency/TREASURY
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Recovery activities and audits combined. Identified $1,877.67M; recovered only $34.69M. Recovery rate: 1.85% — extraordinarily low. IRS cannot recover payments already distributed as refunds without due process; EITC claimants typically cannot repay.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of F4-004/$28B — represents what was specifically identified for recovery processes, not the full improper payment universe. The 1.85% recovery rate contrasts sharply with USDA's 70% rate, illustrating how program design affects recoverability.
ENTITY_LINKS: IRS, Treasury, TIGTA
```

---

**F4-007**
```
ID: F4-007
TITLE: IRS Gross Tax Gap — Measured (Tax Years 2011–2013)
CATEGORY: F4
AMOUNT_BEST: $441,000,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2011
FISCAL_YEAR_END: 2013
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.92
JURISDICTION: federal
SOURCE_NAME: Federal Tax Compliance Research: Tax Gap Estimates for Tax Years 2011–2013 (IRS Pub 1415, 2019)
SOURCE_URL: https://www.irs.gov/pub/irs-prior/p1415--2019.pdf
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: IRS NRP measured. Net gap after enforcement: $381B. Voluntary compliance rate 83.6%.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: EARLIEST PERIOD IN SERIES. Pre-2018 coverage. Establishes baseline showing consistent increase in tax gap over time (~$441B → $496B → $540B → $696B gross over 2011–2022). Do not sum across periods.
ENTITY_LINKS: IRS, Treasury
```

---

### F5: GRANT/RESEARCH FRAUD (COVID/Emergency Programs)

*Note: The taxonomy assigns F5 to Grant/Research Fraud. The research files contain extensive COVID emergency program fraud data. COVID emergency programs (PPP, EIDL, PUA) are categorized here under F7 per taxonomy. F5 (traditional grant/research fraud) has NO data points in this dataset — flagged as a gap.*

---

### F6: EMPLOYEE/INTERNAL FRAUD

*No data points available in the three source files. Full gap — see Gap Analysis.*

---

### F7: DISASTER/EMERGENCY FRAUD

---

**F7-001**
```
ID: F7-001
TITLE: DOL Pandemic Unemployment Assistance (PUA) — Lifetime Improper Payments
CATEGORY: F7
AMOUNT_BEST: $45,600,000,000
AMOUNT_LOW: $25,000,000,000
AMOUNT_HIGH: $80,000,000,000
FISCAL_YEAR_START: 2020
FISCAL_YEAR_END: 2021
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.60
JURISDICTION: federal
SOURCE_NAME: DOL PUA S&EMP Report FY2023; GAO High-Risk Series GAO-25-107743; PRAC COVID-19 fraud data
SOURCE_URL: https://paymentaccuracy.gov/agency/DOL
SOURCE_TYPE: ig_report
SOURCE_METHODOLOGY: DOL established PUA improper payment rate at 18.53% for the life of the program. Total PUA outlays estimated ~$246B; applying 18.53% = ~$45.6B. PRAC estimates range to $60–80B when including organized fraud rings by criminal networks. Program expired September 6, 2021; further sampling not possible.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: CRITICAL MULTI-SOURCE OVERLAP. The PUA 18.53% rate is SEPARATE from regular UI BAM survey (F3-007 covers regular UI; PUA excluded from BAM). The PRAC $60–80B range aggregates PUA + some PEUC/FPUC; DOJ COVID prosecution totals (F7-003) are a SUBSET of this. W5-005 (COVID UI GAO $60–163B range) includes this figure plus additional amounts — DO NOT double-count. The $80B high end of PRAC overlaps substantially with W5-005.
ENTITY_LINKS: DOL, DOL-OIG, PRAC, states, pandemic programs
```

---

**F7-002**
```
ID: F7-002
TITLE: SBA COVID-19 EIDL and PPP Improper/Fraudulent Loans
CATEGORY: F7
AMOUNT_BEST: $136,000,000,000
AMOUNT_LOW: $76,000,000,000
AMOUNT_HIGH: $200,000,000,000
FISCAL_YEAR_START: 2020
FISCAL_YEAR_END: 2022
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.55
JURISDICTION: federal
SOURCE_NAME: SBA OIG reports; PRAC COVID Fraud Estimates; paymentaccuracy.gov SBA profile; GAO High-Risk List
SOURCE_URL: https://paymentaccuracy.gov/agency/SBA
SOURCE_TYPE: ig_report
SOURCE_METHODOLOGY: SBA OIG estimated $206B+ in potentially fraudulent PPP/EIDL loans. SBA's current FY2025 improper rate is 12.29% on $66.2B outlays ($8.14B current). COVID programs were the dominant fraud vector. Multiple Congressional investigations and DOJ prosecutions ongoing. Wide range reflects different methodologies (approved loans to suspicious entities vs. confirmed fraud vs. prosecuted fraud).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: MAJOR MULTI-SOURCE OVERLAP. Overlaps with: (1) DOJ COVID-19 Fraud Task Force prosecutions (F7-003) — DOJ is a subset; (2) SBA current improper payments FY2025 (F7-006) — different measurement; (3) PRAC aggregate estimates. The wide $76B–$200B range reflects uncertainty. The $136B best estimate represents the midpoint of SBA-OIG methodologies. Prosecution totals in F7-003 ($1.9B) are a tiny fraction of estimated fraud — most never prosecuted.
ENTITY_LINKS: SBA, SBA-OIG, PRAC, PPP, EIDL, COVID-19 Fraud Task Force
```

---

**F7-003**
```
ID: F7-003
TITLE: DOJ COVID-19 Fraud Enforcement Task Force — Pandemic Fraud Prosecutions (Cumulative 2020–2024)
CATEGORY: F7
AMOUNT_BEST: $1,900,000,000
AMOUNT_LOW: $1,500,000,000
AMOUNT_HIGH: $3,000,000,000
FISCAL_YEAR_START: 2020
FISCAL_YEAR_END: 2024
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.70
JURISDICTION: federal
SOURCE_NAME: DOJ COVID-19 Fraud Enforcement Task Force; PRAC Annual Report
SOURCE_URL: https://www.justice.gov/civil/false-claims-act
SOURCE_TYPE: doj_settlement
SOURCE_METHODOLOGY: DOJ CFETF established 2021. Hundreds of defendants prosecuted for PPP, EIDL, UI, and healthcare COVID fraud. Combines criminal charges, civil FCA cases, and administrative enforcement. Includes seized assets and civil settlements through 2024.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of estimated total COVID fraud. F7-002 ($76–200B SBA fraud) and F7-001 ($45–80B UI fraud) dwarf this prosecution total — prosecutions represent what was detected and charged, not the full universe. Some amounts also appear in regular annual DOJ FCA totals. Do not add to the broader COVID fraud estimates.
ENTITY_LINKS: DOJ, SBA, DOL, PRAC, COVID-19 Fraud Task Force
```

---

**F7-004**
```
ID: F7-004
TITLE: FEMA COVID-19 Funeral Assistance — Duplicate Payments (as of Feb 2022)
CATEGORY: F7
AMOUNT_BEST: $4,800,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2021
FISCAL_YEAR_END: 2022
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: GAO-22-105397: COVID-19: Current and Future Federal Preparedness
SOURCE_URL: https://www.gao.gov/products/gao-22-105397
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: GAO identified 374 deceased individuals listed on more than one award-receiving application. Duplicates received ~$4.8M. Total program: $1.92B obligated to 296,000+ approved applications.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: CONFIRMED SUBSET of the $1.92B FEMA funeral assistance program (F7-005). Represents only the documented duplicate-payment fraud, not total program fraud. Total fraud is likely higher but not fully quantified as of this report. Separable from other FEMA programs and from broader COVID fraud estimates.
ENTITY_LINKS: FEMA, DHS, GAO
```

---

**F7-005**
```
ID: F7-005
TITLE: FEMA COVID-19 Funeral Assistance — Total Program Disbursed (as of Feb 2022)
CATEGORY: F7
AMOUNT_BEST: $1,920,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2021
FISCAL_YEAR_END: 2022
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.95
JURISDICTION: federal
SOURCE_NAME: GAO-22-105397
SOURCE_URL: https://www.gao.gov/products/gao-22-105397
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: FEMA administrative data. 444,000+ applications processed; 296,000 approved; $1.92B obligated.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: DENOMINATOR, not fraud amount. The $4.8M duplicates (F7-004) are a known subset. Broader fraud rate unknown. Provides base for fraud rate estimation when additional audit work is completed.
ENTITY_LINKS: FEMA, DHS
```

---

**F7-006**
```
ID: F7-006
TITLE: SBA Current Improper Payment Rate FY2025
CATEGORY: F7
AMOUNT_BEST: $8,141,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.70
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov Agency Rankings — SBA FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/SBA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: 12.29% improper rate on $66.2B susceptible outlays. SBA ranked second-lowest performing agency. SBA notes it is restructuring PIIA process with improvements anticipated by FY2027.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: FY2025 SBA improper payments likely reflect residual COVID program effects (SBA's $76–200B COVID fraud from F7-002 is still in recovery/processing cycle). This is a CURRENT annual figure, not the COVID-era total. Do not confuse with the peak COVID fraud estimate.
ENTITY_LINKS: SBA, SBA-OIG, PPP, EIDL
```

---

## PART II — WASTE DATA POINTS

---

### W1: DUPLICATIVE PROGRAMS

---

**W1-001**
```
ID: W1-001
TITLE: GAO Annual Report on Fragmentation, Overlap, and Duplication — Cumulative Financial Benefits Through 2021
CATEGORY: W1
AMOUNT_BEST: $429,000,000,000
AMOUNT_LOW: $393,000,000,000
AMOUNT_HIGH: $465,000,000,000
FISCAL_YEAR_START: 2011
FISCAL_YEAR_END: 2021
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: 2021 Annual Report: New Opportunities to Reduce Fragmentation, Overlap, and Duplication (GAO-21-455SP)
SOURCE_URL: https://www.gao.gov/products/gao-21-455sp
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: GAO tracks implementation of its annual recommendations for its duplication series. Financial benefits = actual savings/revenues identified as agencies implemented GAO-identified actions. $393B accrued through 2019; $36B projected future savings; $30B+ from HHS Medicaid waiver changes 2019.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: DO NOT ADD TO W1-002/W1-003 (GAO High-Risk savings). The $429B (duplication series 2011-2021) and the $759B (High-Risk series 1990-2025) overlap substantially — both track saved money from congressional/executive action on GAO recommendations, and many of the same actions are counted in both series. The High-Risk $759B is broader (covers more areas) but includes the duplication savings. Summing them would significantly double-count.
ENTITY_LINKS: OMB, Congress, GAO, all federal agencies
```

---

**W1-002**
```
ID: W1-002
TITLE: GAO Annual Duplication Report — New Actions FY2021 (Potential Future Savings)
CATEGORY: W1
AMOUNT_BEST: N/A
AMOUNT_LOW: $10,000,000,000
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2021
FISCAL_YEAR_END: 2021
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.80
JURISDICTION: federal
SOURCE_NAME: 2021 Annual Report: Opportunities to Reduce Fragmentation, Overlap, and Duplication (GAO-21-455SP)
SOURCE_URL: https://www.gao.gov/products/gao-21-455sp
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: 112 new actions identified for Congress and agencies. "Tens of billions of additional dollars could be saved." Examples: OMB common goods purchasing, IRS third-party reporting, NNSA cost savings.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: POTENTIAL (not yet achieved) savings as of 2021. Once implemented, these amounts would be counted in future updates to W1-001 totals. OMB procurement savings overlap with IT Dashboard waste.
ENTITY_LINKS: OMB, IRS, NNSA, Congress
```

---

**W1-003**
```
ID: W1-003
TITLE: Cato Institute — Annual Federal Waste Estimate (Downsizing Government)
CATEGORY: W1
AMOUNT_BEST: $350,000,000,000
AMOUNT_LOW: $200,000,000,000
AMOUNT_HIGH: $500,000,000,000
FISCAL_YEAR_START: 2018
FISCAL_YEAR_END: 2024
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 3
CERTAINTY_SCORE: 0.45
JURISDICTION: federal
SOURCE_NAME: Cato Institute — Downsizing the Federal Government (Chris Edwards, various years)
SOURCE_URL: https://www.downsizinggovernment.org/
SOURCE_TYPE: think_tank
SOURCE_METHODOLOGY: Reviews federal program budgets, IG reports, GAO findings, and government performance data. Identifies programs Cato argues should be eliminated or reformed. Definition of "waste" is broader than GAO's — includes programs Cato considers philosophically inappropriate.
SOURCE_ORIENTATION: libertarian
OVERLAP_NOTES: Substantial overlap with GAO duplication findings (W1-001). Cato's broader "waste" definition includes programs others view as performing their missions. The $200–500B range reflects this definitional dispute. Should NOT be added to GAO-sourced figures.
ENTITY_LINKS: Cato Institute, all federal agencies
```

---

**W1-004**
```
ID: W1-004
TITLE: Heritage Foundation — Blueprint for Balance Federal Waste Estimate
CATEGORY: W1
AMOUNT_BEST: $100,000,000,000
AMOUNT_LOW: $50,000,000,000
AMOUNT_HIGH: $200,000,000,000
FISCAL_YEAR_START: 2018
FISCAL_YEAR_END: 2025
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 3
CERTAINTY_SCORE: 0.40
JURISDICTION: federal
SOURCE_NAME: Heritage Foundation — Budget Blueprint for Balance (various editions)
SOURCE_URL: https://www.heritage.org/budget-and-spending
SOURCE_TYPE: think_tank
SOURCE_METHODOLOGY: Identifies federal programs Heritage considers wasteful, duplicative, or outside legitimate federal responsibility. Methodology based on constitutional/policy criteria — goes beyond operational efficiency.
SOURCE_ORIENTATION: right
OVERLAP_NOTES: Overlaps with GAO duplication findings but extends further to philosophically opposed programs (education subsidies, certain welfare). Not an operational audit. DO NOT add to GAO figures.
ENTITY_LINKS: Heritage Foundation, federal discretionary programs
```

---

**W1-005**
```
ID: W1-005
TITLE: Peterson Foundation / BPC — Federal Discretionary Waste Estimate
CATEGORY: W1
AMOUNT_BEST: $200,000,000,000
AMOUNT_LOW: $150,000,000,000
AMOUNT_HIGH: $300,000,000,000
FISCAL_YEAR_START: 2018
FISCAL_YEAR_END: 2023
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 3
CERTAINTY_SCORE: 0.50
JURISDICTION: federal
SOURCE_NAME: Peterson Foundation / BPC — Federal Budget Reform Analysis (various)
SOURCE_URL: https://www.pgpf.org/
SOURCE_TYPE: think_tank
SOURCE_METHODOLOGY: Compares U.S. administrative costs to OECD averages + identified program inefficiencies from IG/GAO findings. Methodology overlaps substantially with GAO data — largely a repackaging.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Much of this repackages GAO, OMB, and IG findings. Do not add to official GAO figures.
ENTITY_LINKS: Peterson Foundation, Bipartisan Policy Center
```

---

### W2: COST OVERRUNS

---

**W2-001**
```
ID: W2-001
TITLE: F-35 Joint Strike Fighter — Program Cost Growth Above Baseline (Cumulative)
CATEGORY: W2
AMOUNT_BEST: $165,000,000,000
AMOUNT_LOW: $100,000,000,000
AMOUNT_HIGH: $200,000,000,000
FISCAL_YEAR_START: 2001
FISCAL_YEAR_END: 2024
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: DOD F-35 Selected Acquisition Reports; GAO Defense Acquisition Assessments
SOURCE_URL: https://www.gao.gov/topics/defense-acquisitions
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: DOD Selected Acquisition Reports (SAR) track program cost vs. original baseline. F-35 original estimate ~$233B; has grown to ~$398B total program cost. Per-unit costs grew from ~$60M to $80–100M+. Lifetime sustainment costs exceed $1.7T (a different figure — procurement + 55 years of operations).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: The $165B is the cost GROWTH above the original baseline — the "overrun" portion. The $1.7T lifetime figure includes decades of planned sustainment and is not an overrun. Both are cited by think tanks; clarify which is being referenced. This is a SUBSET of DOD Weapon Systems Acquisition High-Risk area. Not double-counted with W2-002 through W2-005 which are different programs.
ENTITY_LINKS: DOD, Air Force, Navy, Marines, Lockheed Martin, GAO
```

---

**W2-002**
```
ID: W2-002
TITLE: Gerald R. Ford Aircraft Carrier — Cost Overrun (CVN-78)
CATEGORY: W2
AMOUNT_BEST: $2,600,000,000
AMOUNT_LOW: $2,000,000,000
AMOUNT_HIGH: $3,500,000,000
FISCAL_YEAR_START: 2007
FISCAL_YEAR_END: 2023
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.82
JURISDICTION: federal
SOURCE_NAME: GAO Defense Acquisition Program Assessments; Congressional Budget Office
SOURCE_URL: https://www.gao.gov/topics/defense-acquisitions
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: Original CVN-78 cost estimate ~$10.5B; final exceeded $13B. Delivered 3 years late. Advanced Weapons Elevators and EALS delayed for years. Overrun = growth above original baseline.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Separate program from F-35 (W2-001). Both are within DOD Weapon Systems Acquisition High-Risk area but are additive as distinct programs. Do not confuse the $2.6B overrun with the $13B total program cost.
ENTITY_LINKS: DOD, Navy, Huntington Ingalls Industries, GAO
```

---

**W2-003**
```
ID: W2-003
TITLE: Sentinel ICBM (Ground Based Strategic Deterrent) — Nunn-McCurdy Cost Breach
CATEGORY: W2
AMOUNT_BEST: N/A (restructuring in progress)
AMOUNT_LOW: $60,000,000,000
AMOUNT_HIGH: $150,000,000,000
FISCAL_YEAR_START: 2015
FISCAL_YEAR_END: 2024
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.80
JURISDICTION: federal
SOURCE_NAME: GAO-25-107743 High-Risk 2025 — DOD Weapon Systems Acquisition; DOD Selected Acquisition Reports
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: In 2023, Sentinel breached the Nunn-McCurdy threshold (cost grew >25% above baseline). Air Force estimates grew from ~$77B (2020) to $131B+ (2023). Pentagon confirmed 37% cost increase above original baseline in Nov 2023. Program restructuring ongoing.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Related to but separate from CBO nuclear modernization 10-year estimate (W2-006). The $756B CBO figure is ALL nuclear programs planned; the Sentinel overrun is one program's cost growth above its approved baseline. Partially overlaps with DOE/NNSA nuclear weapons infrastructure. Do not add to W2-006 without netting out planned costs.
ENTITY_LINKS: DOD, Air Force, Northrop Grumman, DOE/NNSA, GAO
```

---

**W2-004**
```
ID: W2-004
TITLE: FAA NextGen Air Traffic Modernization — Total Program Cost (Through FY2022)
CATEGORY: W2
AMOUNT_BEST: $14,000,000,000
AMOUNT_LOW: $14,000,000,000
AMOUNT_HIGH: $35,000,000,000
FISCAL_YEAR_START: 2007
FISCAL_YEAR_END: 2030
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.88
JURISDICTION: federal
SOURCE_NAME: Air Traffic Control Modernization: Program Management Improvements (GAO-24-105254)
SOURCE_URL: https://www.gao.gov/products/gao-24-105254
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: $14B spent through FY2022. Projected total government + industry cost through 2030 = $35B. Mixed progress: some milestones met, others missed by years. Life-cycle cost estimate not updated since 2017.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: IMPORTANT DISTINCTION: The $14B is SPENT to date; the $35B is total projected. The "overrun" is the schedule slippage and cost growth vs. original plan. W2-004 and W5-006 both reference the same FAA NextGen program — W2-004 focuses on cost; W5-006 focuses on performance failure. Same program, different analytical lens.
ENTITY_LINKS: FAA, DOT, GAO
```

---

**W2-005**
```
ID: W2-005
TITLE: NASA Major Projects Portfolio — Cumulative Cost Overruns FY2024
CATEGORY: W2
AMOUNT_BEST: $4,400,000,000
AMOUNT_LOW: $3,000,000,000
AMOUNT_HIGH: $7,600,000,000
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: NASA: Assessments of Major Projects — GAO-24-106767
SOURCE_URL: https://www.gao.gov/products/gao-24-106767
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: 16th annual GAO assessment. $82B+ portfolio of major projects. Cumulative overruns decreased from $7.6B (2023) to $4.4B (2024) — improvement as SLS/EGS exited portfolio after completion. Orion accounts for $2.9B (65%) of remaining overruns. Schedule overruns also decreased.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Improvement from FY2023 ($7.6B) to FY2024 ($4.4B) is partly because overrun-heavy projects completed (SLS/EGS), not purely performance improvement. NASA acquisition management remains on GAO High-Risk List. Separate from DOD programs above.
ENTITY_LINKS: NASA, GAO, Orion program, SLS
```

---

**W2-006**
```
ID: W2-006
TITLE: DOD Nuclear Weapons Modernization — CBO 10-Year Projected Cost (FY2024–2033)
CATEGORY: W2
AMOUNT_BEST: $756,000,000,000
AMOUNT_LOW: $700,000,000,000
AMOUNT_HIGH: $800,000,000,000
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2033
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: CBO — Projected Costs of U.S. Nuclear Forces (2024 edition)
SOURCE_URL: https://www.cbo.gov/publication/59054
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: CBO projects costs of nuclear triad modernization: ICBMs (Sentinel), submarines (Columbia class), bombers (B-21 Raider), plus DOE/NNSA weapons programs. 10-year projection = $756B. This is PLANNED COST, not an overrun.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: NOT all waste — this is planned replacement of aging Cold War systems. The waste/overrun portion is tracked separately via DOD SARs (W2-003 for Sentinel specifically). The $756B total includes W2-003 Sentinel costs but extends to all nuclear programs. Citing this figure as "waste" misrepresents it; it is better described as a cost commitment with embedded overrun risk.
ENTITY_LINKS: DOD, DOE/NNSA, CBO, Air Force, Navy
```

---

**W2-007**
```
ID: W2-007
TITLE: DOD Weapon Systems Acquisition — High-Risk Designation (Regressed 2025)
CATEGORY: W2
AMOUNT_BEST: N/A
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2003
FISCAL_YEAR_END: 2025
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.92
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series: GAO-25-107743
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: GAO biennial assessment. DOD Weapon Systems Acquisition REGRESSED in 2025. Government has >$750B procurement portfolio with "great difficulty in controlling costs." F-35, nuclear systems, space programs all cited.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: PARENT classification encompassing W2-001 through W2-005. Financial benefits achieved within this area are included in W7-006 (High-Risk cumulative savings). Individual program overruns (W2-001 through W2-005) are the quantified subsets.
ENTITY_LINKS: DOD, GAO, defense contractors
```

---

### W3: IDLE/UNDERUSED ASSETS

---

**W3-001**
```
ID: W3-001
TITLE: Federal Real Property — Annual Maintenance and Operating Costs FY2023
CATEGORY: W3
AMOUNT_BEST: $10,300,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2023
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series: GAO-25-107743
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: Federal government owns 277,000 buildings. Annual maintenance and operating costs exceeded $10.3B in FY2023. Managing Federal Real Property designated High-Risk in 2003; REGRESSED in 2025 update.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: The $10.3B is the TOTAL operating cost of ALL 277,000 buildings — not just excess/unused. The waste/excess portion is a subset — GSA estimates ~$1.7–5B in carrying costs for properties not actively serving mission (W3-003). W3-002 (deferred maintenance backlog $370B) is a SEPARATE figure — the accumulated UNFUNDED repairs, not annual operating costs. Do not add W3-001 + W3-002 as they measure different things.
ENTITY_LINKS: GSA, DOD, Federal Real Property Council, OMB
```

---

**W3-002**
```
ID: W3-002
TITLE: Federal Real Property — Deferred Maintenance Backlog (2024 Snapshot)
CATEGORY: W3
AMOUNT_BEST: $370,000,000,000
AMOUNT_LOW: $170,000,000,000
AMOUNT_HIGH: $400,000,000,000
FISCAL_YEAR_START: 2017
FISCAL_YEAR_END: 2024
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series 2025 — Managing Federal Real Property (GAO-25-107743)
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: Annual GAO tracking. Backlog rose from $170B (2017) to $370B (2024) — more than doubled in 7 years. Represents known needed maintenance agencies have not funded. Underfunded deferred maintenance compounds over time (assets degrade, requiring more expensive eventual replacement).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: BALANCE SHEET FIGURE, NOT ANNUAL SPENDING. The $370B is the cumulative unfunded maintenance backlog — not $370B wasted per year. Annual waste attributable to deferred maintenance is better estimated as the cost delta between deferred and eventual replacement ($20–50B/year if the backlog grew by ~$30B/year from 2017-2024). DOD accounts for the largest share (~$150B+ of the total).
ENTITY_LINKS: GSA, DOD, National Park Service, all federal agencies
```

---

**W3-003**
```
ID: W3-003
TITLE: GSA — Excess and Underutilized Federal Properties Annual Carrying Costs
CATEGORY: W3
AMOUNT_BEST: N/A
AMOUNT_LOW: $1,700,000,000
AMOUNT_HIGH: $5,000,000,000
FISCAL_YEAR_START: 2018
FISCAL_YEAR_END: 2023
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.70
JURISDICTION: federal
SOURCE_NAME: GSA Federal Real Property Profile (FRPP) Annual Reports; GAO Federal Real Property reports
SOURCE_URL: https://www.gsa.gov/policy-regulations/policy/real-property-policy/asset-management/federal-real-property-profile-frpp
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: GSA tracks excess, surplus, and underutilized properties in FRPP database. Post-COVID telework increased underutilized federal offices substantially. Annual carrying costs for non-mission-serving properties estimated $1.7B–$5B/year.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of W3-001 ($10.3B total operating costs). The $1.7–5B represents the portion attributable to excess/unused space only. OMB has pushed disposal programs with mixed results. Post-COVID telework has exacerbated this problem.
ENTITY_LINKS: GSA, OMB, federal real property
```

---

**W3-004**
```
ID: W3-004
TITLE: FAA Air Traffic Control — 51 Unsustainable Legacy Systems
CATEGORY: W3
AMOUNT_BEST: N/A
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2035
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.92
JURISDICTION: federal
SOURCE_NAME: Air Traffic Control: FAA Actions Are Urgently Needed (GAO-24-107001)
SOURCE_URL: https://www.gao.gov/products/gao-24-107001
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: FAA 2023 operational risk assessment found 51 of 138 systems unsustainable, 54 more potentially unsustainable. 17 critical systems won't be modernized for 6–13 years. Some 30–50 years old. 4 critical systems have NO investment plans.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Related to W2-004 (FAA NextGen cost overruns) — these legacy systems are what NextGen was supposed to replace. The risk cost (flight delays, ground stops) is separate from the replacement cost. NOTAM outage January 2023 caused nationwide ground stop, illustrating the economic exposure. Dollar value of economic disruption not quantified in this source.
ENTITY_LINKS: FAA, DOT, GAO
```

---

### W4: ADMINISTRATIVE OVERHEAD

---

**W4-001**
```
ID: W4-001
TITLE: Cato Institute — Federal Civilian Pay Premium vs. Private Sector
CATEGORY: W4
AMOUNT_BEST: $50,000,000,000
AMOUNT_LOW: $30,000,000,000
AMOUNT_HIGH: $80,000,000,000
FISCAL_YEAR_START: 2018
FISCAL_YEAR_END: 2024
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 3
CERTAINTY_SCORE: 0.40
JURISDICTION: federal
SOURCE_NAME: Cato Institute — Federal Pay and Benefits vs. Private Sector (Chris Edwards, various)
SOURCE_URL: https://www.downsizinggovernment.org/federal-pay
SOURCE_TYPE: think_tank
SOURCE_METHODOLOGY: BLS compensation data comparing federal workers to private sector by occupation. Cato finds 17–30% total compensation premium (wages + benefits). ~2.9M civilian federal employees × average premium = $30–80B/year estimated excess.
SOURCE_ORIENTATION: libertarian
OVERLAP_NOTES: CONTESTED DATA. CBO analyses find smaller premiums (~3–5% wages, larger for benefits). OPM disputes Cato's job classification methodology. Not an operational audit. Treat as Tier 3 advocacy estimate. Do not add to official figures.
ENTITY_LINKS: OPM, BLS, Cato Institute, federal workforce
```

---

### W5: FAILED PROGRAMS

---

**W5-001**
```
ID: W5-001
TITLE: VA Electronic Health Record Modernization — Program Cost Estimate
CATEGORY: W5
AMOUNT_BEST: $21,000,000,000
AMOUNT_LOW: $16,000,000,000
AMOUNT_HIGH: $49,800,000,000
FISCAL_YEAR_START: 2018
FISCAL_YEAR_END: 2041
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.82
JURISDICTION: federal
SOURCE_NAME: GAO VA IT Acquisition assessments; VA OIG reports; Institute for Defense Analysis 2022 estimate
SOURCE_URL: https://www.gao.gov/topics/veterans-health-care
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: VA contracted Oracle/Cerner in 2018 for $10B to replace legacy VistA. IDA 2022 estimate: $32.7B implementation + $17.1B sustainment = $49.8B lifecycle. Costs grew to $21B+ direct contract value. Program paused multiple times due to patient safety incidents (Spokane, Walla Walla, Columbus). As of Dec 2024, deployed at only 6 of 160+ locations.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: TWO DISTINCT ESTIMATES IN SOURCE FILES. DP23 ($49.8B) = IDA lifecycle estimate for the full 28-year program. TT-Independent-008 ($21B) = contract value + known cost growth. The $49.8B includes 15 years of sustainment costs beyond deployment — different metric. Use AMOUNT_LOW ($16–21B) for "confirmed spent/committed" and AMOUNT_HIGH ($49.8B) for "lifecycle projection." VA Acquisition Management is a separate GAO High-Risk area. DOD has parallel MHS GENESIS (same Oracle/Cerner) with similar issues.
ENTITY_LINKS: VA, Oracle/Cerner, GAO, VA-OIG, DOD (MHS GENESIS)
```

---

**W5-002**
```
ID: W5-002
TITLE: Healthcare.gov Launch Failure — Total Cost
CATEGORY: W5
AMOUNT_BEST: $2,100,000,000
AMOUNT_LOW: $1,700,000,000
AMOUNT_HIGH: $2,500,000,000
FISCAL_YEAR_START: 2010
FISCAL_YEAR_END: 2016
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.75
JURISDICTION: federal
SOURCE_NAME: HHS Inspector General reports; GAO ACA implementation reports; CRS estimates
SOURCE_URL: https://oig.hhs.gov/
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: HHS spent $628M on original Healthcare.gov development before Oct 2013 launch failure. Site crashed within 2 hours; only 6 successful Day 1 enrollments. Emergency contractor swap (CGI Federal replaced by QSSI). Subsequent rescue + ongoing costs through 2016 = ~$2.1B total.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Distinct from VA EHR (W5-001) — different agency, different program. Often grouped with IT failures under GAO High-Risk area "Improving IT Acquisitions and Management." The $2.1B is a SUBSET of total federal IT spend at-risk (W5-007). Original CGI Federal contract was $292M; full cost estimate includes emergency remediation.
ENTITY_LINKS: HHS, CMS, CGI Federal, QSSI, GAO
```

---

**W5-003**
```
ID: W5-003
TITLE: COVID-19 Unemployment Insurance Improper Payments 2020–2022 (GAO High-Risk)
CATEGORY: W5
AMOUNT_BEST: $60,000,000,000
AMOUNT_LOW: $45,000,000,000
AMOUNT_HIGH: $163,000,000,000
FISCAL_YEAR_START: 2020
FISCAL_YEAR_END: 2022
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.80
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series 2023 — Unemployment Insurance System (GAO-23-106203)
SOURCE_URL: https://www.gao.gov/products/gao-23-106203
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: UI added to High-Risk List in 2022. COVID-19 expanded UI dramatically — PUA, FPUC, PEUC. DOL estimated $60B+ in improper payments 2020–2022; GAO and DOL IG estimates range higher (up to $163B including fraud by criminal networks). System lacked identity verification and eligibility checks.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: CRITICAL OVERLAP. This $60–163B range encompasses F7-001 (DOL PUA fraud estimate $45–80B). The ranges overlap substantially. The $60B floor is DOL's own estimate; the $163B ceiling comes from methodology including organized criminal networks. DO NOT add W5-003 to F7-001 — they measure the same pool. Choose the higher-confidence W5-003 (GAO Tier 1) as the primary figure; F7-001 (DOL-OIG Tier 2) is corroborating.
ENTITY_LINKS: DOL, DOL-OIG, PRAC, states, pandemic UI programs
```

---

**W5-004**
```
ID: W5-004
TITLE: DOD Financial Management — Never Achieved Clean Audit (GAO High-Risk)
CATEGORY: W5
AMOUNT_BEST: N/A
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 1990
FISCAL_YEAR_END: 2025
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.95
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series 2025 — DOD Financial Management (GAO-25-107743)
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: DOD is the ONLY major federal agency to have NEVER achieved an unmodified "clean" audit opinion. $3.8 trillion in assets. Without clean audit, material errors and waste are undetectable at scale. Marine Corps recently received clean opinion; Army, Navy, Air Force have not.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: ACCOUNTABILITY FINDING, NOT A DOLLAR AMOUNT. This finding enables waste at undetermined scale within DOD's $800B+/year budget. Linked to F2-003 (DOD audit failure as fraud precondition) and W2-007 (DOD weapon systems high-risk). The remediation costs of achieving a clean audit (ongoing audit fees, financial system upgrades) are included in DOD annual IT spend.
ENTITY_LINKS: DOD, Pentagon, Army, Navy, Air Force, DOD-OIG, GAO
```

---

**W5-005**
```
ID: W5-005
TITLE: Government-Wide Improper Payments — Reported Annually Since 2003 (Cumulative)
CATEGORY: W5
AMOUNT_BEST: $2,800,000,000,000
AMOUNT_LOW: $2,500,000,000,000
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2003
FISCAL_YEAR_END: 2024
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.88
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series: GAO-25-107743 (Feb 2025)
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: Federal agencies have reported ~$2.8 trillion in estimated improper payments since 2003 under IPIA/PIIA frameworks. Over $150B reported government-wide in EACH of the last 7 years (FY2018–2024). High-Risk List programs account for ~80% of the total. Acknowledged undercount: agencies failed to report FY2023 estimates for at least 9 risk-susceptible programs.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: CUMULATIVE TOTAL OF W6 ANNUAL ENTRIES. This $2.8T = sum of the annual W6 figures over 22 years. Do not add to annual W6 entries — it will quadruple the count. The $2.8T includes both fraud and administrative error. Understates true total due to unreported programs. The $150B/year annual figure is the W6 series root entry.
ENTITY_LINKS: OMB, all federal agencies, paymentaccuracy.gov, GAO
```

---

**W5-006**
```
ID: W5-006
TITLE: FAA NextGen — Failed to Meet Key Milestones Since 2018
CATEGORY: W5
AMOUNT_BEST: N/A
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2018
FISCAL_YEAR_END: 2023
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.88
JURISDICTION: federal
SOURCE_NAME: Air Traffic Control Modernization: Program Management Improvements (GAO-24-105254)
SOURCE_URL: https://www.gao.gov/products/gao-24-105254
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: Since 2018 FAA had mixed success meeting NextGen milestones. Has NOT updated life-cycle cost estimate since 2017. Missing milestones extended some systems 5+ years beyond original dates. Program management deficiencies documented.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SAME PROGRAM as W2-004 (cost overrun angle) and W3-004 (legacy systems angle). This entry focuses on the PERFORMANCE FAILURE dimension. All three entries reference the same FAA NextGen / ATC modernization program; they are different lenses on the same problem, not separate programs to be summed.
ENTITY_LINKS: FAA, DOT, GAO
```

---

**W5-007**
```
ID: W5-007
TITLE: Federal IT Acquisitions — Annual Federal IT Spend (At-Risk Portion)
CATEGORY: W5
AMOUNT_BEST: $100,000,000,000
AMOUNT_LOW: $90,000,000,000
AMOUNT_HIGH: $100,000,000,000
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.70
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series GAO-25-107743; OMB IT Dashboard (itdashboard.gov)
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: Federal agencies self-report IT spending via OMB IT Dashboard. Total ~$100B/year. Majority goes to O&M of legacy systems. 1,881 GAO recommendations made since 2010; 463 remain open as of Jan 2025. Status REGRESSED in 2025 High-Risk update. GAO estimates 20–30% at-risk based on persistent findings ($18–27B/year at risk).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: The $100B is TOTAL IT spend — not all waste. Estimated $18–27B/year truly at-risk for waste per GAO patterns. W5-001 (VA EHR $21B) and W5-002 (Healthcare.gov $2.1B) are specific failure examples within this pool. Do not add them to the $100B — they are already counted within it.
ENTITY_LINKS: OMB, CIO Council, GAO, all federal agencies, VA, DOD, HHS, Education
```

---

**W5-008**
```
ID: W5-008
TITLE: GAO High-Risk List — 38 Areas of Serious Vulnerability (2025)
CATEGORY: W5
AMOUNT_BEST: N/A
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.95
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series: GAO-25-107743 (Feb 25, 2025)
SOURCE_URL: https://www.gao.gov/high-risk-list
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: 38 high-risk areas as of Feb 2025. Three areas regressed: DOD Weapon Systems Acquisition, Improving IT Acquisitions and Management, Managing Federal Real Property. One new area added: Federal Disaster Assistance. Five criteria for removal: Leadership Commitment, Capacity, Action Plan, Monitoring, Demonstrated Progress.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: PARENT CLASSIFICATION. Individual high-risk areas are quantified in other entries throughout this dataset (W2-007, W3-001, W3-002, W5-004, W5-007, W7-006, and others). The financial benefits achieved ($759B cumulative, W7-006) come from actions on these 38 areas.
ENTITY_LINKS: GAO, Congress, OMB, DOD, HHS, VA, DOL, IRS, SBA, FAA
```

---

### W6: IMPROPER PAYMENTS (NON-FRAUD)

---

**W6-001**
```
ID: W6-001
TITLE: HHS Total Improper Payments FY2025
CATEGORY: W6
AMOUNT_BEST: $97,325,540,000
AMOUNT_LOW: $90,631,030,000
AMOUNT_HIGH: $97,325,540,000
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov HHS Agency Profile FY2025; HHS PIIA Compliance Audit
SOURCE_URL: https://paymentaccuracy.gov/agency/HHS/2025
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: PIIA-mandated statistical sampling across 10 risk-susceptible programs (Medicare, Medicaid, CHIP, APTC, Foster Care, CCDF, Head Start). Overpayments $90.63B, underpayments $4.06B, technically improper $2.63B, unknown $1.01B. 5.83% rate on $1.67T susceptible outlays.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: ROOT ENTRY for HHS improper payments (FY2025). Contains: F1-007 (Medicare FFS ~$25-50B), F1-008 (Medicaid ~$36B), and other program components. F1-001 (HHS confirmed fraud $3.51B) is a SUBSET. DO NOT add to subsidiary HHS program entries. Not all improper payments are fraud — ~3.6% confirmed intentional. OIG found HHS non-compliant for programs with >10% improper rates. Represents highest-ever (FY2021: $153.9B) to current decline; FY2023 was $104.2B, FY2024 $88.5B.
ENTITY_LINKS: HHS, CMS, Medicare, Medicaid, CHIP, APTC, Head Start, CCDF, Foster Care
```

---

**W6-002**
```
ID: W6-002
TITLE: HHS Total Improper Payments FY2024
CATEGORY: W6
AMOUNT_BEST: $88,549,710,000
AMOUNT_LOW: $82,747,140,000
AMOUNT_HIGH: $88,549,710,000
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov HHS Agency Profile FY2024
SOURCE_URL: https://paymentaccuracy.gov/agency/HHS/2025
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Statistical sampling, PIIA-compliant. Overpayments $82.75B, underpayments $3.37B, technically improper $2.43B, unknown $939.31M. COVID-19 PHE unwinding affected eligibility redeterminations.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Same structure as W6-001 for FY2024. Do not add to W6-001 — sequential years.
ENTITY_LINKS: HHS, CMS, Medicare, Medicaid, CHIP
```

---

**W6-003**
```
ID: W6-003
TITLE: HHS Total Improper Payments FY2023
CATEGORY: W6
AMOUNT_BEST: $104,232,660,000
AMOUNT_LOW: $98,700,030,000
AMOUNT_HIGH: $104,232,660,000
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2023
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov HHS Agency Profile (historical)
SOURCE_URL: https://paymentaccuracy.gov/agency/HHS/2025
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Overpayments $98.70B, underpayments $4.33B, technically improper $1.20B, unknown $564.98M. Elevated due to COVID-era eligibility carryovers; Medicaid continuous enrollment unwinding began.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Sequential year — do not add to adjacent years. COVID-era inflated Medicaid figures start declining as continuous enrollment ended.
ENTITY_LINKS: HHS, CMS, Medicare, Medicaid
```

---

**W6-004**
```
ID: W6-004
TITLE: HHS Total Improper Payments FY2022
CATEGORY: W6
AMOUNT_BEST: $132,415,770,000
AMOUNT_LOW: $129,930,740,000
AMOUNT_HIGH: $132,415,770,000
FISCAL_YEAR_START: 2022
FISCAL_YEAR_END: 2022
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov HHS Agency Profile (historical)
SOURCE_URL: https://paymentaccuracy.gov/agency/HHS/2025
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Overpayments $129.93B, underpayments $2.49B, technically improper $0, unknown $230.53M. COVID continuous enrollment drove elevated Medicaid numbers.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Sequential year — do not add to adjacent years. Near-peak COVID year for HHS improper payments.
ENTITY_LINKS: HHS, CMS, Medicare, Medicaid
```

---

**W6-005**
```
ID: W6-005
TITLE: HHS Total Improper Payments FY2021 (COVID Peak)
CATEGORY: W6
AMOUNT_BEST: $153,869,620,000
AMOUNT_LOW: $144,325,340,000
AMOUNT_HIGH: $153,869,620,000
FISCAL_YEAR_START: 2021
FISCAL_YEAR_END: 2021
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov HHS Agency Profile (historical)
SOURCE_URL: https://paymentaccuracy.gov/agency/HHS/2025
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Highest in series. Overpayments $144.33B, underpayments $9.54B, unknown $408.94M. Driven by COVID PHE suspensions of eligibility requirements.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: PEAK YEAR — substantially elevated by COVID waivers. Sequential year — do not add. Pandemic-era programs (DOL, USDA) reported separately.
ENTITY_LINKS: HHS, CMS, Medicare, Medicaid, CHIP
```

---

**W6-006**
```
ID: W6-006
TITLE: USDA Total Improper Payments FY2025
CATEGORY: W6
AMOUNT_BEST: $13,421,693,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov USDA Agency Profile FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/USDA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: 9.05% rate on $148.3B susceptible outlays. 10 Phase 2 programs including SNAP, NSLP, WIC, commodity programs, crop insurance. Recovery identified $652.56M, recovered $458.39M (70.24%).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: F3-005 (USDA confirmed fraud $155.1M) is a SUBSET of this total. SNAP is the largest component. Some SNAP fraud overlaps with state-level investigations and DOJ prosecutions. OIG found USDA non-compliant with 4 of 6 PIIA requirements.
ENTITY_LINKS: USDA, USDA-OIG, SNAP, WIC, NSLP, crop insurance
```

---

**W6-007**
```
ID: W6-007
TITLE: SSA OASDI Overpayments FY2024 (as Improper Payment)
CATEGORY: W6
AMOUNT_BEST: $3,000,000,000
AMOUNT_LOW: $2,700,000,000
AMOUNT_HIGH: $3,300,000,000
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov SSA Agency Profile FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/SSA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: SSA annual stewardship reviews. $1.4T total OASDI paid; $3.0B overpayments (0.21%); $975.5M underpayments.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: CROSS-LISTED with F3-001 (same figure, different category lens). F3-001 records this as benefits fraud; W6-007 records it as improper payment (non-fraud). The $3.0B is the SAME money. For fraud totals use F3-001; for improper payment totals use W6-007. Do not double-count across both categories in any aggregate.
ENTITY_LINKS: SSA, OASDI
```

---

**W6-008**
```
ID: W6-008
TITLE: VA Improper and Unknown Payments FY2025
CATEGORY: W6
AMOUNT_BEST: $3,920,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov VA Agency Profile FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/VA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: 1.09% rate on $201.1B susceptible outlays. Added Compensation program ($160.6B) to reporting for first time since FY2020. Actual monetary loss $1.49B; non-monetary $691M; unknown $1.74B. First year below 10% error rate since FY2014.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: VA EHR modernization ($21B+ W5-001) is a SEPARATE issue — IT program cost, not improper payments. VA improper payments are benefits/healthcare payment errors. The $3.92B is the current annual improper payment total; it does not overlap with the IT program cost.
ENTITY_LINKS: VA, VA-OIG, veterans' benefits, VA healthcare
```

---

**W6-009**
```
ID: W6-009
TITLE: DOL Regular UI Improper Payments FY2025
CATEGORY: W6
AMOUNT_BEST: $5,062,714,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov DOL Agency Profile FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/DOL
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: BAM survey. 12.16% rate on $41.6B. Excludes pandemic programs.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: CROSS-LISTED with F3-007 (same figure). W6-009 views this as improper payment (waste category); F3-007 views it as benefits fraud. Same $5.06B. Do not sum both. Exclude pandemic UI (F7-001/W5-003) which is separately tracked.
ENTITY_LINKS: DOL, DOL-OIG, UI, states
```

---

**W6-010**
```
ID: W6-010
TITLE: SBA Improper Payments FY2025 (Current Programs)
CATEGORY: W6
AMOUNT_BEST: $8,141,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.70
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov Agency Rankings — SBA FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/SBA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: 12.29% rate on $66.2B susceptible outlays. Second-lowest performing agency.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: CROSS-LISTED with F7-006 (same figure). Current SBA improper payments reflect residual COVID program effects. Do not add to F7-002 (COVID SBA fraud estimate $76–200B) — different measurement periods and methodologies.
ENTITY_LINKS: SBA, SBA-OIG, PPP, EIDL
```

---

**W6-011**
```
ID: W6-011
TITLE: Government-Wide Improper Payments — Annual Floor (FY2018–2024)
CATEGORY: W6
AMOUNT_BEST: $150,000,000,000
AMOUNT_LOW: $150,000,000,000
AMOUNT_HIGH: $281,000,000,000
FISCAL_YEAR_START: 2018
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.80
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series GAO-25-107743; OMB Annual Improper Payments Report
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: $150B+ government-wide in EACH of the last 7 years (FY2018–2024). High-Risk programs account for ~80% of total. Known undercount: 9 risk-susceptible programs failed to report FY2023 estimates.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: AGGREGATE FIGURE encompassing W6-001 through W6-010 plus other agencies not separately listed here. The $150B is the floor (reported); actual is higher. FY2021 peak was ~$281B. DO NOT add this to the individual agency figures — it IS those figures aggregated. For totaling: use this as the government-wide root and individual agency entries as drill-down.
ENTITY_LINKS: OMB, all federal agencies, paymentaccuracy.gov, GAO
```

---

**W6-012**
```
ID: W6-012
TITLE: Government-Wide Improper Payments FY2021 COVID Peak
CATEGORY: W6
AMOUNT_BEST: $281,000,000,000
AMOUNT_LOW: $240,000,000,000
AMOUNT_HIGH: $300,000,000,000
FISCAL_YEAR_START: 2021
FISCAL_YEAR_END: 2021
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.70
JURISDICTION: federal
SOURCE_NAME: OMB/paymentaccuracy.gov historical reporting; GAO testimony
SOURCE_URL: https://paymentaccuracy.gov/resources
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Aggregate of all agency-reported PIIA estimates for FY2021. Spike driven by COVID-19 programs: expanded UI, Medicaid continuous enrollment, SNAP expansion, EIDL, PPP. Relaxed eligibility verification requirements.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Sequential year — do not add to W6-011 or other annual figures. The $281B is the FY2021 total; W6-011 ($150B floor) represents non-COVID-peak years. Significantly understates actual COVID fraud since many programs like PUA excluded from BAM sampling.
ENTITY_LINKS: OMB, HHS, DOL, USDA, SBA, all federal agencies
```

---

### W7: PORK/EARMARKS/CUMULATIVE SAVINGS

---

**W7-001**
```
ID: W7-001
TITLE: CAGW Congressional Pig Book FY2024 — Total Earmarks
CATEGORY: W7
AMOUNT_BEST: $22,700,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.75
JURISDICTION: federal
SOURCE_NAME: 2024 Congressional Pig Book — Citizens Against Government Waste
SOURCE_URL: https://www.cagw.org/2024-congressional-pig-book/
SOURCE_TYPE: think_tank
SOURCE_METHODOLOGY: Reviews all 12 appropriations bills annually. Counts items meeting one or more of 7 criteria (not competitively awarded, requested by only one chamber, not specifically authorized, etc.). FY2024: 8,222 earmarks costing $22.7B. 11.2% more earmarks than FY2023 but 13% less in dollar value.
SOURCE_ORIENTATION: right
OVERLAP_NOTES: CAGW counts more than GAO's formal CPF/CDS. GAO FY2024 (W7-003) shows $14.6B for same year — gap of ~$8B reflects CAGW's broader criteria. Both are valid but measure different things. Some items CAGW counts are legitimate directed spending. For conservative estimates use W7-003 (GAO); for maximal estimate use W7-001 (CAGW).
ENTITY_LINKS: CAGW, Congress, Appropriations Committees
```

---

**W7-002**
```
ID: W7-002
TITLE: CAGW Congressional Pig Book FY2023 — Total Earmarks
CATEGORY: W7
AMOUNT_BEST: $26,100,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2023
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.75
JURISDICTION: federal
SOURCE_NAME: 2023 Congressional Pig Book — Citizens Against Government Waste
SOURCE_URL: https://www.cagw.org/reporting/pig-book
SOURCE_TYPE: think_tank
SOURCE_METHODOLOGY: Same methodology as W7-001 applied to FY2023 appropriations. 7,396 earmarks costing $26.1B. Record high (at the time) since earmarks re-authorized in 2021.
SOURCE_ORIENTATION: right
OVERLAP_NOTES: Sequential year — do not add to W7-001. GAO FY2023 (W7-004) shows $15.3B for same year.
ENTITY_LINKS: CAGW, Congress, Appropriations Committees
```

---

**W7-003**
```
ID: W7-003
TITLE: GAO FY2024 CPF/CDS Tracking — Official Earmark Total
CATEGORY: W7
AMOUNT_BEST: $14,600,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.95
JURISDICTION: federal
SOURCE_NAME: GAO: Tracking the Funds — Specific FY2024 Provisions (GAO-25-107549)
SOURCE_URL: https://www.gao.gov/products/gao-25-107549
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: Analyzed all FY2024 appropriations legislation and joint explanatory statements. 8,098 CPF/CDS provisions across 19 federal agencies. Down from $15.3B (7,233 provisions) in FY2023. Formal designations only.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: OFFICIAL LOWER BOUND for FY2024 earmarks. W7-001 (CAGW $22.7B) is a broader count of the same year. These are not double-counting the same money — they are different methodological counts of the same appropriations. For a single FY2024 earmark figure use W7-003 (Tier 1) or note the CAGW range.
ENTITY_LINKS: GAO, Congress, all appropriations committee members
```

---

**W7-004**
```
ID: W7-004
TITLE: GAO FY2023 CPF/CDS Tracking — Official Earmark Total
CATEGORY: W7
AMOUNT_BEST: $15,300,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2023
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.95
JURISDICTION: federal
SOURCE_NAME: GAO Tracking the Funds: Specific FY2023 Provisions
SOURCE_URL: https://www.gao.gov/tracking-funds
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: 7,233 CPF/CDS provisions, $15.3B total. Same 19 agencies. Official appropriations acts and joint explanatory statements.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Sequential year to W7-003. Same methodology applied to FY2023.
ENTITY_LINKS: GAO, Congress
```

---

**W7-005**
```
ID: W7-005
TITLE: CAGW Cumulative Earmarks Since 1991
CATEGORY: W7
AMOUNT_BEST: $460,300,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 1991
FISCAL_YEAR_END: 2024
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.70
JURISDICTION: federal
SOURCE_NAME: 2024 Congressional Pig Book — CAGW
SOURCE_URL: https://www.cagw.org/2024-congressional-pig-book/
SOURCE_TYPE: think_tank
SOURCE_METHODOLOGY: Since FY1991, CAGW identified 132,434 earmarks costing $460.3B. Includes 11-year moratorium (FY2011–2021) where earmarks averaged $9.4B/year.
SOURCE_ORIENTATION: right
OVERLAP_NOTES: CUMULATIVE TOTAL of W7-001/W7-002 annual series plus prior years. Do not add to annual entries. CAGW methodology applies throughout; same definitional caveats as W7-001.
ENTITY_LINKS: CAGW, Congress
```

---

**W7-006**
```
ID: W7-006
TITLE: GAO High-Risk Program — Cumulative Financial Benefits 1990–2025
CATEGORY: W7
AMOUNT_BEST: $759,000,000,000
AMOUNT_LOW: $675,000,000,000
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 1990
FISCAL_YEAR_END: 2025
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series: GAO-25-107743 (Feb 25, 2025)
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: GAO tracks financial benefits (cost avoidances, savings, revenue increases) from congressional and executive actions taken in response to High-Risk designations. Since 2023 update: ~$84B in additional benefits. Average ~$40B/year. Three areas regressed in 2025.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: CRITICAL DISTINCTION. These are SAVINGS ACHIEVED — the amount the government avoided spending due to GAO High-Risk designations driving reform. This is NOT the remaining waste or fraud estimate. It is also NOT additive with W1-001 (GAO Duplication $429B savings) because both track congressional/executive actions on GAO recommendations — many of the same actions are counted in both series. The $759B High-Risk total is the broader figure that subsumes much of the $429B duplication savings.
ENTITY_LINKS: GAO, Congress, OMB, all federal agencies
```

---

**W7-007**
```
ID: W7-007
TITLE: National Flood Insurance Program — Annual Fiscal Exposure
CATEGORY: W7
AMOUNT_BEST: $20,500,000,000
AMOUNT_LOW: $15,000,000,000
AMOUNT_HIGH: $30,000,000,000
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 3
CERTAINTY_SCORE: 0.55
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series GAO-25-107743
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: NFIP is structurally underpriced — premiums set below actuarially sound levels for political reasons. Annual fiscal exposure estimated from historical debt accumulation and premium gap analysis. Related to new FY2025 High-Risk area on Federal Disaster Assistance (27 billion-dollar disasters in 2024).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: The new FY2025 GAO High-Risk area on Federal Disaster Assistance (FEMA) is related. The $50B disaster assistance waste estimate (from the payments/GAO file) partially overlaps this NFIP figure. NFIP fiscal exposure is the actuarial shortfall — not the same as improper payments or fraud.
ENTITY_LINKS: FEMA, NFIP, DHS, Congress
```

---

---

## PART III — DOUBLE COUNTING MATRIX

This matrix maps ALL significant overlaps. "❌ Do not sum" = summing these entries would double-count the same money. "✅ Safe to sum" = these entries measure genuinely different money.

---

### Overlap Group A: HHS Healthcare Improper Payments

| Entry A | Entry B | Relationship | Rule |
|---------|---------|--------------|------|
| W6-001 (HHS total IP $97.3B FY2025) | F1-001 (HHS confirmed fraud $3.51B) | B is SUBSET of A | ❌ Do not sum |
| W6-001 (HHS total IP $97.3B) | F1-007 (Medicare FFS $25-50B) | B is SUBSET of A | ❌ Do not sum |
| W6-001 (HHS total IP $97.3B) | F1-008 (Medicaid $36B) | B is SUBSET of A | ❌ Do not sum |
| F1-001 (HHS confirmed fraud $3.51B) | F1-002 (DOJ FCA FY2024 $2.9B) | Partial overlap — some DOJ cases are within HHS fraud count | ❌ Do not sum directly; adjust for overlap (~$2B) |
| W6-001 through W6-005 (HHS annual) | W6-011 (govt-wide $150B+) | Annual agency figures AGGREGATE to govt-wide | ❌ Do not sum; W6-011 IS the sum |
| W6-005 (HHS FY2021 $153.9B) | W6-012 (govt-wide FY2021 $281B) | HHS is SUBSET of govt-wide | ❌ Do not sum |

---

### Overlap Group B: DOJ False Claims Act

| Entry A | Entry B | Relationship | Rule |
|---------|---------|--------------|------|
| F1-002 (DOJ FCA FY2024 $2.9B) | F1-005 (DOJ FCA cumulative 1987-2019 $62B) | Annual is SUBSET of cumulative (different years) | ❌ Do not add FY2024 to pre-2019 cumulative |
| F1-002 (DOJ FCA FY2024) | F1-003 (DOJ FCA FY2021) | Different fiscal years | ✅ Safe to sum if building multi-year total |
| F1-003 (FY2021 $5.6B) | F1-006 (pharma settlements $8B cumulative FY2018-2021) | F1-006 amounts ARE WITHIN F1-003 and prior year totals | ❌ Do not add |
| F2-004 (DOD FCA ~$500M annual) | F1-002 (total FCA $2.9B) | F2-004 is SUBSET of F1-002 (defense portion of FCA total) | ❌ Do not sum |
| F1-002 (DOJ FCA) | F2-001 (DOD DCIS civil judgments $282M) | Partial overlap — some DCIS cases are jointly prosecuted via FCA | ❌ Potential overlap; cannot safely sum without case-level reconciliation |
| F2-001 (DCIS civil $282M) | F2-002 (DCIS criminal $147M) | Civil vs. criminal — different proceedings, same cases | ✅ Safe to sum (civil + criminal for same period) |

---

### Overlap Group C: COVID Emergency Fraud

| Entry A | Entry B | Relationship | Rule |
|---------|---------|--------------|------|
| F7-001 (PUA fraud $45.6B) | W5-003 (COVID UI GAO $60–163B) | W5-003 ENCOMPASSES F7-001 and more | ❌ Do not sum; use W5-003 as primary |
| F7-002 (SBA EIDL/PPP $76–200B) | F7-003 (DOJ COVID prosecutions $1.9B) | F7-003 is TINY SUBSET of F7-002 (prosecuted ≠ total fraud) | ❌ Do not sum |
| F7-001 (PUA $45.6B) | F3-007 (regular UI $5.06B) | SEPARATE programs — BAM excludes pandemic UI | ✅ Safe to sum (different programs) |
| F7-002 (SBA $76–200B) | W6-010 (SBA FY2025 $8.1B) | W6-010 = current residual; F7-002 = peak COVID estimate | ❌ Different time periods but same underlying programs; do not add |
| F7-004 (FEMA funeral $4.8M duplicates) | F7-005 (FEMA total $1.92B) | F7-004 is SUBSET of F7-005 denominator | ❌ Do not sum |

---

### Overlap Group D: Tax Gap and EITC

| Entry A | Entry B | Relationship | Rule |
|---------|---------|--------------|------|
| F4-001 ($540B gross TY2017-19) | F4-002 ($496B gross TY2014-16) | DIFFERENT time periods — sequential measurements | ❌ Do not add; these represent annual averages for different 3-year windows |
| F4-001 ($540B) | F4-003 ($606B net TY2022) | DIFFERENT periods — later/higher estimate | ❌ Do not add; use most recent (F4-003) for current estimates |
| F4-003 ($606B net TY2022) | W5-003 (IRS tax gap in waste file) | IDENTICAL figure — same data appearing in two source files | ❌ DUPLICATE; use F4-003 only |
| F4-004 (EITC/refundable credits $28B) | F4-005 (EITC alone $21B) | F4-005 is SUBSET of F4-004 (EITC is the largest component) | ❌ Do not sum |
| F4-003 (tax gap $606B) | F4-004 (EITC improper $28B) | F4-004 is a component of the underreporting gap in F4-003 | ❌ Do not sum (EITC improper is within the tax gap) |
| F4-006 (IRS recovery $1.88B identified) | F4-004 ($28B improper) | F4-006 is RECOVERY ATTEMPT on a portion of F4-004 | ❌ Do not sum |

---

### Overlap Group E: Federal Real Property

| Entry A | Entry B | Relationship | Rule |
|---------|---------|--------------|------|
| W3-001 ($10.3B annual operating cost) | W3-002 ($370B deferred maintenance backlog) | DIFFERENT metrics: annual spend vs. unfunded backlog | ✅ Not the same money, but represents different views of same problem |
| W3-001 ($10.3B total operating) | W3-003 ($1.7–5B excess property carrying costs) | W3-003 is SUBSET of W3-001 (portion attributable to excess space) | ❌ Do not sum |
| W3-002 ($370B deferred maintenance) | W2-007 (DOD acquisition high-risk) | DOD accounts for ~$150B+ of W3-002 | ❌ Partial overlap — DOD maintenance backlog is within W3-002 |

---

### Overlap Group F: GAO Cumulative Savings (CRITICAL)

| Entry A | Entry B | Relationship | Rule |
|---------|---------|--------------|------|
| W7-006 (GAO High-Risk savings $759B 1990–2025) | W1-001 (GAO Duplication savings $429B 2011–2021) | MAJOR OVERLAP — same congressional actions counted in both series | ❌ NEVER add these together |
| W7-006 ($759B High-Risk) | W1-002 (future savings potential $10B+) | W7-006 is ACHIEVED savings; W1-002 is POTENTIAL future savings | ✅ Not the same money (past vs. future), but be clear about distinction |

---

### Overlap Group G: GAO Annual vs. Agency Improper Payments

| Entry A | Entry B | Relationship | Rule |
|---------|---------|--------------|------|
| W6-011 (govt-wide $150B+ annual) | W6-001 (HHS $97.3B) | W6-011 IS the sum of all agencies including W6-001 | ❌ Do not add |
| W6-011 (govt-wide $150B+) | W6-006 (USDA $13.4B) | Same relationship | ❌ Do not add |
| W6-011 (govt-wide $150B+) | W6-007 (SSA $3.0B) | Same relationship | ❌ Do not add |
| W6-011 (govt-wide $150B+) | W5-005 (cumulative $2.8T) | W5-005 = 22 years of W6-011 summed | ❌ Do not add annual + cumulative |
| F3-001 (SSA overpayments as fraud) | W6-007 (SSA overpayments as waste) | SAME MONEY — two category classifications | ❌ Choose one for any aggregate; same $3.0B |
| F3-007 (DOL UI as fraud) | W6-009 (DOL UI as waste) | SAME MONEY | ❌ Choose one for any aggregate |
| F7-006 (SBA as fraud) | W6-010 (SBA as waste) | SAME MONEY | ❌ Choose one for any aggregate |

---

---

## PART IV — ENTITY INDEX

Each major entity listed with all associated data point IDs. Use this to find all dataset entries related to a given agency, program, or actor.

---

### CENTERS FOR MEDICARE & MEDICAID SERVICES (CMS) / HHS
*Appears across healthcare fraud, improper payments, and high-risk categories*

| Data Point ID | Role |
|---------------|------|
| F1-001 | HHS confirmed fraud (Medicare, Medicaid, CHIP subset) |
| F1-002, F1-003, F1-004, F1-009, F1-010 | DOJ FCA recoveries (majority healthcare/CMS fraud) |
| F1-005, F1-006 | DOJ FCA cumulative and pharma settlements |
| F1-007 | Medicare FFS CERT improper payments ($25–50B/yr) |
| F1-008 | Medicaid improper payments ($36B FY2023) |
| W6-001 through W6-005 | HHS total annual improper payments (FY2021–2025) |
| W6-011, W6-012 | Government-wide improper payment totals (HHS largest component) |
| W5-002 | Healthcare.gov launch failure |
| W5-005 | Cumulative improper payments $2.8T (HHS dominant share) |

**Key entity note:** CMS/HHS is the single largest source of improper payments in the federal government, accounting for ~65% of the annual government-wide total. The $97.3B (FY2025) is not a ceiling — FY2021 was $153.9B during COVID.

---

### DEPARTMENT OF DEFENSE (DOD)
*Appears across defense fraud, procurement overruns, audit failures, and improper payments*

| Data Point ID | Role |
|---------------|------|
| F2-001 | DCIS civil judgments/settlements 6-mo FY2023 |
| F2-002 | DCIS criminal fines/restitution 6-mo FY2023 |
| F2-003 | DOD audit failure FY2023 (sixth consecutive) |
| F2-004 | DOJ FCA defense contractor fraud annual estimate |
| W2-001 | F-35 cost overrun $165B |
| W2-002 | Gerald Ford carrier overrun $2.6B |
| W2-003 | Sentinel ICBM Nunn-McCurdy breach |
| W2-006 | Nuclear modernization 10-year CBO $756B |
| W2-007 | DOD Weapon Systems Acquisition High-Risk designation |
| W3-002 | Federal real property deferred maintenance (DOD = largest share ~$150B+) |
| W5-004 | DOD Financial Management — never achieved clean audit |
| W5-001 (partial) | VA/DOD parallel MHS GENESIS program |

**Key entity note:** DOD is unique in being both (a) the only major federal agency to never pass a financial audit, and (b) the operator of the world's largest procurement portfolio ($750B+) with GAO-documented difficulty controlling costs. Audit failure means the full extent of DOD waste/fraud is unknown.

---

### SMALL BUSINESS ADMINISTRATION (SBA)
*COVID fraud epicenter — PPP and EIDL loans*

| Data Point ID | Role |
|---------------|------|
| F7-002 | SBA COVID-19 EIDL/PPP fraud $76–200B (cumulative) |
| F7-003 | DOJ COVID prosecutions (SBA fraud subset) |
| F7-006 | SBA current improper payments FY2025 $8.1B |
| W6-010 | SBA improper payments FY2025 (cross-listed with F7-006) |

**Key entity note:** SBA is the second-lowest performing agency on paymentaccuracy.gov (FY2025). The COVID fraud exposure ($76–200B) dwarfs SBA's current annual outlays ($66.2B), reflecting the extraordinary scale of pandemic program fraud.

---

### DEPARTMENT OF LABOR (DOL) / UNEMPLOYMENT INSURANCE
*Regular UI structural issues + COVID pandemic fraud*

| Data Point ID | Role |
|---------------|------|
| F3-007 | Regular UI improper payments FY2025 $5.06B |
| F7-001 | PUA pandemic fraud $45.6B (Tier 2) |
| W5-003 | COVID UI GAO high-risk $60–163B (supersedes F7-001) |
| W6-009 | DOL UI improper payments FY2025 (cross-listed with F3-007) |

**Key entity note:** DOL has two distinct fraud/waste problems: (1) structural ~12% improper payment rate in regular UI (ongoing), and (2) the COVID pandemic program fraud (PUA/PEUC/FPUC) estimated at $60–163B — a one-time surge now in recovery phase.

---

### INTERNAL REVENUE SERVICE (IRS) / TREASURY
*Tax gap and EITC structural improper payments*

| Data Point ID | Role |
|---------------|------|
| F4-001 | IRS gross tax gap TY2017–2019 $540B |
| F4-002 | IRS gross tax gap TY2014–2016 $496B |
| F4-003 | IRS net tax gap TY2022 $606B (most recent) |
| F4-004 | Refundable tax credits improper payments FY2025 $28B |
| F4-005 | EITC improper payments FY2023 $21B |
| F4-006 | IRS overpayment recovery FY2025 $1.88B |
| F4-007 | IRS gross tax gap TY2011–2013 $441B |

**Key entity note:** IRS and Treasury represent the highest dollar-value figures in this dataset. The $606B annual net tax gap dwarfs all other entries. However, the tax gap is NOT criminal fraud — it encompasses everything from honest mistakes to intentional evasion. IRS has explicitly stated that achieving EITC compliance requires major legislation, as current structural limitations prevent meeting the <10% improper rate threshold.

---

### SOCIAL SECURITY ADMINISTRATION (SSA)
*Overpayments across OASDI programs*

| Data Point ID | Role |
|---------------|------|
| F3-001 | OASDI total overpayments FY2024 $3.0B |
| F3-002 | OASI overpayments FY2024 $1.1B (subset of F3-001) |
| F3-003 | DI/SSDI overpayments FY2024 $1.8B (subset of F3-001) |
| F3-004 | OASDI overpayments FY2023 $3.3B |
| W6-007 | SSA OASDI as improper payment (cross-listed with F3-001) |

**Key entity note:** SSA's 0.21% OASDI error rate is one of the lowest in the federal government. Most overpayments are administrative (beneficiary failure to self-report) rather than intentional fraud. However, on $1.4T in total outlays, even a tiny percentage generates billions.

---

### DEPARTMENT OF AGRICULTURE (USDA) / SNAP
*Food assistance confirmed fraud and broader improper payments*

| Data Point ID | Role |
|---------------|------|
| F3-005 | USDA confirmed fraud FY2025 $155.1M |
| F3-006 | USDA overpayment recovery FY2025 $458.4M |
| W6-006 | USDA total improper payments FY2025 $13.4B |

**Key entity note:** USDA stands out for its strong 70% recovery rate on identified overpayments, despite OIG finding it non-compliant with 4 of 6 PIIA requirements. SNAP is the primary program driving both improper payments and confirmed fraud.

---

### VETERANS AFFAIRS (VA)
*Improper payments and EHR modernization failure*

| Data Point ID | Role |
|---------------|------|
| W5-001 | VA EHR modernization (Oracle/Cerner) $21B+ cost |
| W6-008 | VA improper payments FY2025 $3.92B |

**Key entity note:** VA has two distinct issues: (1) ongoing improper payments in healthcare/benefits ($3.92B/yr, first year below 10% error rate since FY2014), and (2) the catastrophically troubled EHR modernization program ($21B+ spent, deployed at only 6 of 160+ locations as of Dec 2024, with patient safety incidents causing multiple pauses).

---

### FEDERAL AVIATION ADMINISTRATION (FAA)
*NextGen modernization cost overruns and legacy system risk*

| Data Point ID | Role |
|---------------|------|
| W2-004 | NextGen total program cost ($14B spent through FY2022; $35B projected) |
| W3-004 | 51 unsustainable legacy ATC systems |
| W5-006 | NextGen performance failure (missed milestones) |

**Key entity note:** FAA's problems represent both a sunk cost (W2-004) and an active risk (W3-004). The 51 unsustainable ATC systems — some 30–50 years old — represent a systemic safety and operational risk with no funding plans for 4 critical systems. FAA and DOT appear across three separate data points representing cost, risk, and performance failure dimensions of the same program.

---

### PANDEMIC RESPONSE ACCOUNTABILITY COMMITTEE (PRAC)
*Multi-program COVID fraud aggregation*

| Data Point ID | Role |
|---------------|------|
| F7-001 | PUA fraud estimate (PRAC methodology cited) |
| F7-002 | SBA EIDL/PPP (PRAC estimates cited) |
| F7-003 | DOJ COVID Task Force (PRAC oversight) |

**Key entity note:** PRAC is the interagency body established to oversee COVID spending. Its estimates aggregate multiple IG methodologies and produce the most comprehensive (but also most uncertain) COVID fraud estimates. PRAC is a Tier 2 source — credible, but using varied methodologies across programs.

---

### GOVERNMENT ACCOUNTABILITY OFFICE (GAO)
*Appears throughout as primary audit authority*

| Data Point ID | Role |
|---------------|------|
| F7-004, F7-005 | FEMA COVID funeral assistance audit |
| W1-001, W1-002 | Duplication/fragmentation savings |
| W2-001 through W2-007 | Defense acquisition oversight |
| W3-001 through W3-004 | Federal real property management |
| W5-001, W5-003 through W5-008 | Failed programs and high-risk |
| W6-011, W6-012 | Government-wide improper payment reporting |
| W7-003, W7-004, W7-006 | Earmark tracking and High-Risk savings |

**Key entity note:** GAO is the most-cited source in this dataset and the highest-reliability source across categories. The biennial High-Risk List and annual Fragmentation/Duplication reports are the definitive accountability frameworks. GAO does not quantify total waste — it documents specific findings and tracks whether agencies address them.

---

---

## PART V — GAP ANALYSIS

### 1. Categories with No Data (Complete Gaps)

**F5 — Grant/Research Fraud (NSF, NIH, ED):**
- Zero data points in source files
- Known issue: NSF-OIG and ED-OIG publish semiannual reports with grant fraud findings
- Estimated annual NSF-OIG fraud findings: ~$50–100M/year (rough extrapolation)
- NIH has $40B+ annual research budget; IG-estimated fraud historically ~0.5–1% = $200–400M/year
- **Action needed:** NSF-OIG SAR, ED-OIG SAR, NIH-OIG SAR

**F6 — Employee/Internal Fraud (Ghost employees, embezzlement):**
- Zero data points in source files
- FBI Public Corruption Unit handles some of this; no aggregate federal figure available
- OPM Inspector General tracks some federal employee fraud
- **Action needed:** OPM-OIG reports, FBI Public Corruption Unit statistics, individual agency IG reports

---

### 2. Categories with Thin Data (1–3 Entries, Major Gaps)

**W4 — Administrative Overhead:**
- Only one entry (W4-001, Tier 3/contested Cato estimate)
- No Tier 1 or Tier 2 data on federal administrative overhead
- CBO has done analyses; OPM has workforce data
- **Action needed:** CBO federal compensation analysis, OPM workforce cost data, GAO reports on management overhead

**F2 — Defense/Contractor Fraud:**
- Only 4 entries; DCIS data is 6-month only
- DCAA (Defense Contract Audit Agency) annual questioned costs not retrieved
- DCAA typically finds $6–10B in questioned costs annually — none of this appears in dataset
- **Action needed:** DCAA Annual Report (dcaa.mil), full-year DCIS statistics from both semiannual reports

---

### 3. Time Period Gaps

| Category | Gap Period | Notes |
|----------|-----------|-------|
| F1 (Healthcare Fraud) | FY2022 DOJ FCA total not directly verified | FY2022 estimated at ~$2.2B per pattern; needs direct source |
| F2 (DOD Fraud) | FY2024 full-year DCIS data | Only have 6-month Oct2022–Mar2023 |
| W2 (Cost Overruns) | DOD acquisition data FY2018–2022 systematic summary | Have specific programs; no annual portfolio-wide baseline for those years |
| W6 (Improper Payments) | HHS FY2018–FY2020 annual figures | Series in dataset starts FY2021 |
| F3 (Benefits Fraud) | SSA FY2018–2022 systematic | Have FY2023 + FY2024 only |

---

### 4. Programs Not Yet Covered

| Program/Agency | Category | Estimated Scale | Source to Retrieve |
|----------------|----------|----------------|-------------------|
| HCFAC Annual Report (DOJ+HHS joint healthcare fraud) | F1 | ~$2–5B/yr recoveries | oig.hhs.gov/reports/hcfac/ |
| DCAA Questioned Costs (defense contracts) | F2 | $6–10B/yr | dcaa.mil/Reports |
| NSF-OIG Semiannual Report | F5 | ~$50–100M/yr | oig.nsf.gov |
| NIH-OIG Semiannual Report | F5 | ~$200–400M/yr | oig.hhs.gov |
| ED-OIG Semiannual Report | F5 | ~$50–200M/yr | ed.gov/oig |
| OPM-OIG Annual Report | F6 | Unknown | opm.gov/oig |
| HUD Improper Payments (FY2025: $0 reported) | W6 | Flagged as unusual — verify | paymentaccuracy.gov/agency/HUD |
| FCC/FTC fraud programs | F7 | Small | fcc.gov, ftc.gov |
| DOT improper payments ($2.4B FY2025) | W6 | $2.4B/yr | paymentaccuracy.gov/agency/DOT |
| Tribal program fraud (BIA, IHS) | F3/F7 | Unknown | GAO/IG reports on Indian Affairs |
| SNAP trafficking (retailer-level) | F3 | ~$1B+/yr | USDA-FNS SNAP Integrity reports |
| Identity theft refund fraud (IRS) | F4 | ~$3–6B/yr | TIGTA Annual Report |

---

### 5. State-Level Data (Future Work — NOT in this Dataset)

This dataset is federal only. State-level fraud and waste data is a significant future research area:

| State Program | Category | Known Scale | Primary Source |
|---------------|----------|-------------|----------------|
| California EDD COVID fraud | F7/State | $20B+ (widely cited) | CA EDD; CA State Auditor |
| California Medi-Cal fraud | F1/State | ~$3–5B/yr | CA DHCS OIG |
| California SNAP/CalFresh fraud | F3/State | ~$500M–1B/yr | CDSS |
| California High-Speed Rail overruns | W2/State | $100B+ total project | CA High-Speed Rail Authority |
| State Medicaid fraud (50 states) | F1/State | $15–30B/yr combined | CMS T-MSIS; individual state AGs |
| State UI fraud (non-COVID) | F3/State | $3–5B/yr | DOL BAM state data |

**Research note:** California alone represents a significant state-level dataset given the $20B+ CA EDD COVID fraud, ongoing Medi-Cal issues, and the CAHSR project. California data should be added in a separate collection pass using CA State Auditor, LAO, and DHCS sources.

---

### 6. Methodological Gaps

- **No Tier 1 data exists for F6 (employee fraud)** — this is a structural gap; the FBI does not publish aggregate federal employee fraud statistics
- **DCAA data access blocked** — the DCAA Annual Report would add significant Tier 1 data to F2 (defense fraud) by documenting $6–10B/year in questioned contract costs
- **HCFAC reports inaccessible** — the joint DOJ/HHS healthcare fraud control report would upgrade several entries from Tier 2 to Tier 1
- **Think tank estimates (W1-003, W1-004, W4-001) cannot be validated** — by design, these are Tier 3 and should be treated as directional only
- **COVID fraud estimates remain wide-range** — the $76–200B SBA range reflects genuine uncertainty, not research failure; final numbers will depend on completed audit cycles (projected FY2026–2028)

---

---

## PART VI — NOTES ON DATA QUALITY AND USE

### Golden Rules for This Dataset

1. **Never add overlapping entries to produce a "total fraud" headline.** The only safe way to calculate a total is to (a) use the government-wide W6-011 as the improper payments floor, (b) add confirmed fraud entries that are NOT already in W6-011, and (c) add the tax gap separately with a clear disclaimer that it is not criminal fraud.

2. **The tax gap ($496–$606B/yr) dominates all other entries by an order of magnitude.** Any "total fraud and waste" headline that includes the tax gap will be ~80% tax gap. Always present this separately.

3. **COVID-era data (FY2020–2022) is anomalously high and declining.** Use FY2023–2025 data for "current state" analyses. COVID figures are useful for historical maximum but mislead on current conditions.

4. **Confirmed fraud is a small fraction of improper payments.** HHS example: $3.51B confirmed fraud vs. $97.3B total improper payments (3.6%). This ratio is typical across agencies. Most government "mistakes" are mistakes, not theft.

5. **GAO savings ($759B cumulative) is NOT evidence of remaining waste.** It is evidence that reform works. It does NOT mean $759B in waste is still occurring — it means $759B in waste was identified and addressed since 1990.

6. **Think tank estimates (Tier 3) require orientation disclosure** — Cato (libertarian), Heritage (right), CAGW (right), Brookings (center-left), Peterson/BPC (nonpartisan). These estimates are useful for context but should not anchor quantitative claims.

---

### Source Reliability Hierarchy

| Tier | Score Range | Source Type | Examples |
|------|------------|-------------|---------|
| 1 | 0.85–0.95 | Audited/Adjudicated | GAO audits, DOJ settlements, paymentaccuracy.gov PIIA data, IRS NRP |
| 2 | 0.65–0.84 | Official Estimates | CBO projections, IG estimates, agency statistical sampling, PRAC |
| 3 | 0.40–0.64 | Independent Research | CAGW Pig Book, Cato, Heritage, Simpson-Bowles Commission |
| 4 | 0.30–0.44 | Credibly Reported | Not represented in this dataset |

---

*Consolidated dataset compiled 2026-03-24. Sources: paymentaccuracy.gov (direct access Mar 24 2026), GAO-25-107743 (Feb 2025), GAO-23-106203 (2023), GAO-21-455SP (2021), GAO-24-106767, GAO-24-105254, GAO-24-107001, GAO-22-105397, IRS Publication 1415, DOJ Civil Division FCA Statistics, DOD OIG Semiannual Reports, CBO Nuclear Forces 2024, CAGW 2024 Pig Book.*

*Total data points: 77 (42 Tier 1 · 23 Tier 2 · 12 Tier 3 · 0 Tier 4)*

-002
TITLE: Healthcare.gov Original Launch Failure — Failed Federal IT Project
CATEGORY: W5
AMOUNT_BEST: $2,100,000,000
AMOUNT_LOW: $628,000,000
AMOUNT_HIGH: $2,500,000,000
FISCAL_YEAR_START: 2010
FISCAL_YEAR_END: 2016
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.75
JURISDICTION: federal
SOURCE_NAME: HHS Inspector General reports; GAO reports on ACA implementation; CRS analysis
SOURCE_URL: https://oig.hhs.gov/
SOURCE_TYPE: ig_report
SOURCE_METHODOLOGY: HHS spent $628M on original Healthcare.gov development (primarily CGI Federal contract $292M + others) before the October 2013 launch failure. Site crashed within 2 hours of launch; only 6 successful enrollments on Day 1. Emergency contractor swap (QSSI replacing CGI Federal) and ongoing fixes brought total to ~$2.1B through 2016 per GAO and CRS estimates. AMOUNT_LOW = original CGI Federal + related contracts before crash. AMOUNT_BEST = total GAO/CRS estimate through full recovery period.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: Often cited by critics of government IT procurement. Original CGI Federal contract: $292M. Emergency CMS rescue operation added hundreds of millions. Total estimate varies by what's included (ongoing CMS operations vs. launch failure only). Separate from VA EHR modernization. Both fall under GAO High-Risk IT Acquisitions area. Total federal IT at-risk spending $18–27B/year of which these are specific instances.
ENTITY_LINKS: HHS, CMS, CGI Federal, QSSI, GAO, CRS
```

---

**W5-003**
```
ID: W5-003
TITLE: FAA NextGen Air Traffic Modernization — Program Cost Overruns and Milestone Failures
CATEGORY: W5
AMOUNT_BEST: $14,000,000,000
AMOUNT_LOW: $14,000,000,000
AMOUNT_HIGH: $35,000,000,000
FISCAL_YEAR_START: 2007
FISCAL_YEAR_END: 2030
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.88
JURISDICTION: federal
SOURCE_NAME: GAO — Air Traffic Control Modernization: Program Management Improvements Could Help FAA Address NextGen Delays (GAO-24-105254); GAO — Air Traffic Control: FAA Actions Are Urgently Needed to Modernize Aging Systems (GAO-24-107001)
SOURCE_URL: https://www.gao.gov/products/gao-24-105254
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: FAA reported spending $14B on NextGen through FY2022. Projected total government + industry cost through 2030 is $35B (AMOUNT_HIGH). Since 2018, FAA had mixed success meeting NextGen milestones across 4 critical program areas. Life-cycle cost estimate NOT updated since 2017. Missing milestones extended some systems 5+ years beyond original dates. Separately, FAA 2023 operational risk assessment found 51 of 138 ATC systems unsustainable, 54 more potentially unsustainable. 17 especially critical systems won't be modernized for 6–13 years. 4 critical systems have NO investment plans. NOTAM outage January 2023 caused nationwide ground stop.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: DUAL CATEGORIZATION. NextGen is also in W2 (cost overruns) as a separate data point. This W5 entry focuses on PERFORMANCE FAILURE aspect — program management deficiencies, unmet milestones, and the 51 legacy systems risk. The $14B (spent through FY2022) is NOT all waste — it is total program spend with waste being the schedule/cost overrun portion. Do not add AMOUNT_HIGH ($35B projected) to AMOUNT_BEST ($14B spent) — these are sequential, not separate.
ENTITY_LINKS: FAA, DOT, GAO, Congress
```

---

**W5-004**
```
ID: W5-004
TITLE: Federal IT Acquisitions and Management — Annual At-Risk IT Spend (GAO High-Risk)
CATEGORY: W5
AMOUNT_BEST: $18,000,000,000
AMOUNT_LOW: $18,000,000,000
AMOUNT_HIGH: $27,000,000,000
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.70
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series 2025 (GAO-25-107743) — Improving IT Acquisitions and Management
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: Total federal IT investment ~$90–100B/year (OMB IT Dashboard, FY2023–2024). GAO has documented persistent patterns of over-budget, behind-schedule IT projects. Status REGRESSED in 2025 High-Risk update. 1,881 GAO IT recommendations since 2010; 463 remain open as of January 2025. GAO estimates 20–30% of annual IT spend is at significant risk of failure or underperformance = $18–27B/year. Majority of federal IT spend (~75%) goes to operations and maintenance of legacy systems, not modernization.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: VA EHR ($21–49.8B) and Healthcare.gov ($2.1B) are specific failures within this pool — do not add them to this figure. AMOUNT_BEST ($18B) is the floor of the at-risk estimate, not confirmed waste. High-Risk designation since 2015 with regressed status in 2025.
ENTITY_LINKS: OMB, GAO, VA, DOD, HHS, FAA, IRS, GSA
```

---

**W5-005**
```
ID: W5-005
TITLE: DOD Financial Management — Never Achieved Clean Audit (Accountability Failure)
CATEGORY: W5
AMOUNT_BEST: N/A
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 1990
FISCAL_YEAR_END: 2025
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.95
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series 2025 (GAO-25-107743) — DOD Financial Management
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: DOD is the ONLY major federal agency to have NEVER achieved an unmodified "clean" audit opinion on its financial statements. Billions in transaction-level errors, improper obligation entries, and unreconciled transactions. DOD has $3.8 trillion in assets — without clean audit, material errors and waste are undetectable at scale. Marine Corps recently received a clean opinion; other services have not. On High-Risk List since 1995.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: This is an ACCOUNTABILITY FAILURE, not a specific dollar amount. It enables waste at undetermined scale across all DOD categories. Overlaps with W2 (defense cost overruns), F2 (defense fraud). The $895B DOD discretionary budget is at risk without audit controls. This entry purposely has no dollar estimate — the absence of clean financials means the true waste is unknown.
ENTITY_LINKS: DOD, Army, Navy, Air Force, Marines, DFAS, GAO, Congress
```

---

### W6: IMPROPER PAYMENTS (NON-FRAUD, ADMINISTRATIVE ERROR)

---

**W6-001**
```
ID: W6-001
TITLE: Government-Wide Improper Payments — Annual (FY2018–FY2024 Average)
CATEGORY: W6
AMOUNT_BEST: $150,000,000,000
AMOUNT_LOW: $97,000,000,000
AMOUNT_HIGH: $281,000,000,000
FISCAL_YEAR_START: 2018
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.88
JURISDICTION: federal
SOURCE_NAME: OMB Annual Improper Payments Report (via GAO High-Risk Series GAO-25-107743); paymentaccuracy.gov
SOURCE_URL: https://www.whitehouse.gov/omb/management/payment-integrity/
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Federal agencies self-report improper payment estimates under the Improper Payments Information Act (IPIA) and the Payment Integrity Information Act (PIIA) of 2019. OMB compiles government-wide total. $150B+ in EACH of the last 7 years (FY2018–FY2024). AMOUNT_LOW = FY2025 HHS alone. AMOUNT_HIGH = FY2021 COVID peak. AMOUNT_BEST = sustained annual floor per GAO. Acknowledged undercount: 9 risk-susceptible programs failed to report FY2023 estimates. Medicare, Medicaid, EITC, UI are largest components (~80% of total).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: CRITICAL OVERLAP NOTE. This is the PARENT entry for W6. All W6-002 through W6-010 are subsets of this figure. Do NOT add W6 sub-entries to W6-001. The $150B/yr figure already contains the fraud component (~$3.5–10B/yr confirmed) — do NOT add F1 fraud entries to this figure either. The $2.8T cumulative (2003–2024) is referenced in W6-002. The annual $150B is a floor — agencies underreport and 9+ programs did not file FY2023 estimates.
ENTITY_LINKS: OMB, Medicare, Medicaid, EITC, UI, SSA, USDA, VA, HHS, Treasury, DOL
```

---

**W6-002**
```
ID: W6-002
TITLE: Cumulative Federal Improper Payments Since 2003 (GAO High-Risk)
CATEGORY: W6
AMOUNT_BEST: $2,800,000,000,000
AMOUNT_LOW: $2,500,000,000,000
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2003
FISCAL_YEAR_END: 2024
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.88
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series 2025 (GAO-25-107743)
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: GAO compilation of agency-reported improper payment estimates under IPIA/PIIA frameworks since mandatory reporting began in FY2003. Agencies consistently failed to report some risk-susceptible programs each year. $2.8T is therefore a floor. Medicare and Medicaid alone account for the majority of the total. Cumulative figure cited directly in GAO-25-107743.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: This is the CUMULATIVE total of W6-001 annual figures plus earlier years. Do NOT add to W6-001. Understates actual improper payments due to unreported programs. Fraud subset of this (intentional) is far smaller — HHS confirmed fraud is ~3.6% of HHS improper payments (FY2025: $3.51B/$97.3B).
ENTITY_LINKS: OMB, GAO, Medicare, Medicaid, EITC, UI, all federal agencies
```

---

**W6-003**
```
ID: W6-003
TITLE: HHS Improper Payments FY2025 — Medicare, Medicaid, CHIP, APTC, Other
CATEGORY: W6
AMOUNT_BEST: $97,325,540,000
AMOUNT_LOW: $90,631,030,000
AMOUNT_HIGH: $97,325,540,000
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov HHS Agency Profile FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/HHS/2025
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Statistical sampling via PIIA requirements; annual risk assessments for 97 programs; estimates published for 10 susceptible programs (Medicare FFS, Medicare Part C, Medicare Part D, Medicaid, CHIP, APTC, Foster Care, CCDF, Head Start, Nutrition Assistance). Breakdown: Overpayments $90.63B, underpayments $4.06B, technically improper $2.63B, unknown $1.01B. Medicare FFS: ~$25–50B of total (CMS CERT methodology). Medicaid: $30–45B. EITC subcomponent tracked under Treasury.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of W6-001. Contains F1-001 fraud subset ($3.51B confirmed fraud within HHS). Medicare FFS is separately tracked by CMS via CERT program. Do NOT add to W6-001 (already included). FY2022 peak was $132B (COVID continuous enrollment). FY2021 was $154B. FY2025 improvement reflects Medicaid unwinding (25M+ enrollees removed 2023–2024).
ENTITY_LINKS: HHS, CMS, Medicare, Medicaid, CHIP, IRS (APTC), HHS-OIG
```

---

**W6-004**
```
ID: W6-004
TITLE: Treasury/IRS Refundable Tax Credit Improper Payments FY2025 (EITC, AOTC, ACTC, PTC)
CATEGORY: W6
AMOUNT_BEST: $28,064,000,000
AMOUNT_LOW: $21,000,000,000
AMOUNT_HIGH: $32,000,000,000
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov Treasury Agency Profile FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/TREASURY
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: IRS statistical sampling of tax return compliance data. 26.54% improper payment rate on $105.7B in susceptible outlays. Programs: EITC (Earned Income Tax Credit, historical ~21–26% improper rate), AOTC (American Opportunity Tax Credit), ACTC (Additional Child Tax Credit), Net Premium Tax Credit. Rate not statistically different from FY2024. Root cause: complexity of eligibility rules, lack of third-party wage data for certain workers, inability to pre-verify eligibility before issuing refund. IRS has deployed due diligence requirements and compliance filters with limited effect.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of W6-001 and is ALSO counted within F4 fraud entries. The line between "improper payment error" and "fraud" is structurally blurred for refundable credits. IRS itself states without major legislative action, achieving <10% error rate is "a significant challenge." Much is misreported self-employment income, not criminal fraud. EITC structural reform proposals (pre-certification, real-time wage data) repeatedly proposed but not enacted.
ENTITY_LINKS: IRS, Treasury, Congress, low-income workers, small businesses
```

---

**W6-005**
```
ID: W6-005
TITLE: USDA Improper Payments FY2025 — SNAP, NSLP, WIC, Crop Insurance
CATEGORY: W6
AMOUNT_BEST: $13,421,693,000
AMOUNT_LOW: $12,000,000,000
AMOUNT_HIGH: $15,000,000,000
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov USDA Agency Profile FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/USDA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Statistical sampling per PIIA. 9.05% improper rate on $148.3B susceptible outlays. 10 programs (down from 12 in FY2024): SNAP (food stamps, largest component), National School Lunch Program, WIC, commodity programs, crop insurance. OIG found noncompliance for 4 of 6 PIIA requirements in FY2024. Recovery: identified $652.56M, recovered $458.39M (70.24% rate).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of W6-001. SNAP is the largest component; some overlap with state-level fraud reporting (states administer SNAP; errors can be federal or state-caused). USDA confirmed fraud (F3 category) is $155.1M — a small fraction of total USDA improper payments. Crop insurance improper payments include both overpayments and underpayments.
ENTITY_LINKS: USDA, FNS, SNAP, WIC, states/territories, USDA-OIG
```

---

**W6-006**
```
ID: W6-006
TITLE: DOL Unemployment Insurance Improper Payments FY2025 (Regular UI, Excluding COVID Programs)
CATEGORY: W6
AMOUNT_BEST: $5,062,714,000
AMOUNT_LOW: $4,500,000,000
AMOUNT_HIGH: $6,000,000,000
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov DOL Agency Profile FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/DOL
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Benefit Accuracy Measurement (BAM) survey — statistically valid nationwide sample of UI payments. 12.16% improper rate on $41.6B outlays ($37.4B regular UI + $285.5M UCFE/UCX). Does NOT include pandemic programs (PUA, PEUC, FPUC, MEUC — all expired September 2021). Recovery audits identified $1,841.39M, recovered $762.36M (41.4% rate). BAM sampling methodology cannot retroactively measure expired programs.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of W6-001 (regular UI only). COVID UI improper payments are tracked separately in W6-007 and overlap with F5 fraud entries. State-administered program — errors can be state or federal origin. Some pandemic fraud beneficiaries still being prosecuted; those recoveries go to DOJ FCA stats (F7 category).
ENTITY_LINKS: DOL, ETA, states/territories, DOL-OIG, GAO
```

---

**W6-007**
```
ID: W6-007
TITLE: COVID Pandemic UI Programs — Cumulative Improper Payments 2020–2022 (PUA, PEUC, FPUC)
CATEGORY: W6
AMOUNT_BEST: $60,000,000,000
AMOUNT_LOW: $45,600,000,000
AMOUNT_HIGH: $163,000,000,000
FISCAL_YEAR_START: 2020
FISCAL_YEAR_END: 2022
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.75
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series 2023 (GAO-23-106203) — Unemployment Insurance; DOL PUA S&EMP report; PRAC COVID Fraud Estimates
SOURCE_URL: https://www.gao.gov/products/gao-23-106203
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: DOL estimated $60B+ in improper payments across pandemic UI programs 2020–2022. PUA program alone: DOL estimated 18.53% improper rate on ~$246B total outlays = $45.6B (AMOUNT_LOW). GAO and DOL OIG estimates run higher — up to $163B including fraud committed by organized criminal networks. System lacked identity verification, states overwhelmed, eligibility checks waived in CARES Act. Programs are expired and cannot be further measured via BAM sampling.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: MASSIVE OVERLAP WITH FRAUD ENTRIES. DOL OIG estimated ~$76B in COVID UI fraud alone (F7 category). The $45.6–163B range straddles W6 (error) and F7 (fraud). PRAC estimated combined COVID fraud exposure across ALL programs at $191B–$400B. Do NOT add this to W6-006 (regular UI) or to F7-002 (DOL UI fraud). This is a SEPARATE cumulative multi-year figure for expired pandemic programs only.
ENTITY_LINKS: DOL, ETA, states/territories, DOL-OIG, GAO, PRAC, Congress, DOJ
```

---

**W6-008**
```
ID: W6-008
TITLE: SSA OASDI Overpayments FY2024 — Social Security Error Payments
CATEGORY: W6
AMOUNT_BEST: $3,000,000,000
AMOUNT_LOW: $2,700,000,000
AMOUNT_HIGH: $3,300,000,000
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.90
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov SSA Agency Profile FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/SSA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: SSA annual stewardship reviews (statistical sampling). Total OASDI outlays ~$1.4 trillion; overpayments $3.0B (0.21% error rate), underpayments $975.5M (0.07%). Down from $3.3B overpayments in FY2023. OASI: $1.1B overpayments (0.09% rate); DI: $1.8B overpayments (1.28% rate). Root causes: beneficiary failure to self-report marital status changes (OASI), wage and employment changes (DI). SSA recovering previously identified overpayments — controversial 2024 clawback policy caused political backlash.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of W6-001. Separate from SSI program (Supplemental Security Income), which has higher error rates. SSA overpayment recovery policy was significantly criticized in 2024 for creating hardship for low-income beneficiaries; Congress intervened to limit recovery rates. The 0.21% error rate on OASDI is among the LOWEST of any major federal program.
ENTITY_LINKS: SSA, Congress, Social Security Administration IG, GAO
```

---

**W6-009**
```
ID: W6-009
TITLE: VA Improper Payments FY2025 — Compensation, Pension, Education Benefits
CATEGORY: W6
AMOUNT_BEST: $3,920,000,000
AMOUNT_LOW: $3,500,000,000
AMOUNT_HIGH: $4,500,000,000
FISCAL_YEAR_START: 2025
FISCAL_YEAR_END: 2025
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: paymentaccuracy.gov VA Agency Profile FY2025
SOURCE_URL: https://paymentaccuracy.gov/agency/VA
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Statistical sampling per PIIA. 1.09% improper rate on $201.1B susceptible outlays. Added Compensation program ($160.6B additional outlays) to reporting in FY2025 for first time since FY2020 — significant scope expansion. Breakdown: actual monetary loss $1.49B; non-monetary loss $691M (underpayments $442M, technically improper $249M); unknown $1.74B. First year reporting under 10% error rate since FY2014 — significant improvement. Coverage: disability compensation, pension, education (GI Bill), home loans, vocational rehabilitation.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: SUBSET of W6-001. VA EHR modernization costs ($21B+) tracked separately in W5-001. VA acquisition management is separate GAO High-Risk area. The 1.09% rate represents major improvement from historical double-digit error rates. Unknown payments ($1.74B) may be reclassified in future reporting.
ENTITY_LINKS: VA, VBA, Veterans Benefits Administration, GAO, VA-OIG
```

---

**W6-010**
```
ID: W6-010
TITLE: Government-Wide Improper Payments FY2021 — COVID Peak Year
CATEGORY: W6
AMOUNT_BEST: $281,000,000,000
AMOUNT_LOW: $240,000,000,000
AMOUNT_HIGH: $300,000,000,000
FISCAL_YEAR_START: 2021
FISCAL_YEAR_END: 2021
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.70
JURISDICTION: federal
SOURCE_NAME: OMB/paymentaccuracy.gov historical reporting; GAO testimony
SOURCE_URL: https://paymentaccuracy.gov/resources
SOURCE_TYPE: agency_data
SOURCE_METHODOLOGY: Aggregate of all agency-reported PIIA estimates for FY2021. Spike driven by COVID-19 programs: expanded UI (PUA/PEUC), Medicaid continuous enrollment (eligibility verification suspended), SNAP expansion, EIDL, PPP. These programs had relaxed eligibility verification requirements enacted under CARES Act and ARP. HHS alone reported $153.9B; DOL pandemic UI added tens of billions more (not fully captured in PIIA figures).
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: This is the PEAK YEAR figure for W6-001 context. Do NOT add to W6-001 annual average. Significantly understates actual COVID fraud/error because many pandemic programs (PUA, EIDL, PPP) excluded from BAM sampling or reported separately. The $300B+ ceiling represents PRAC's higher COVID program estimates that year.
ENTITY_LINKS: OMB, HHS, CMS, Medicare, Medicaid, DOL, USDA, SBA, Treasury, Congress
```

---

### W7: EARMARKS AND PORK BARREL SPENDING

---

**W7-001**
```
ID: W7-001
TITLE: CAGW Congressional Pig Book FY2024 — Total Earmarks
CATEGORY: W7
AMOUNT_BEST: $22,700,000,000
AMOUNT_LOW: $14,600,000,000
AMOUNT_HIGH: $22,700,000,000
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.75
JURISDICTION: federal
SOURCE_NAME: 2024 Congressional Pig Book — Citizens Against Government Waste
SOURCE_URL: https://www.cagw.org/2024-congressional-pig-book/
SOURCE_TYPE: think_tank
SOURCE_METHODOLOGY: CAGW reviews all 12 annual appropriations bills. Counts items meeting one or more of CAGW's 7 criteria: (1) requested by only one chamber, (2) not specifically authorized, (3) not competitively awarded, (4) not requested by executive branch, (5) greatly exceeds president's budget request, (6) not subject to hearings, (7) serves only local or special interests. FY2024: 8,222 earmarks totaling $22.7B across all 12 appropriations bills. 11.2% more earmarks than FY2023 but 13% less in dollar value. AMOUNT_LOW = GAO official CPF/CDS count.
SOURCE_ORIENTATION: right
OVERLAP_NOTES: CAGW methodology counts more than formally designated earmarks — includes directed spending that may fund legitimate projects. GAO FY2024 tracking shows only $14.6B in formally designated Community Project Funding (CPF) and Congressionally Directed Spending (CDS) — the ~$8B discrepancy is CAGW including items not formally labeled earmarks. CAGW has documented political/ideological lean toward earmark elimination. Not all earmarks are waste — some fund legitimate local infrastructure. The AMOUNT_LOW ($14.6B, GAO official) to AMOUNT_BEST ($22.7B, CAGW) range represents the methodological range.
ENTITY_LINKS: Congress, House Appropriations, Senate Appropriations, CAGW, GAO, OMB
```

---

**W7-002**
```
ID: W7-002
TITLE: CAGW Congressional Pig Book FY2023 — Total Earmarks (Record High Since Reinstatement)
CATEGORY: W7
AMOUNT_BEST: $26,100,000,000
AMOUNT_LOW: $15,300,000,000
AMOUNT_HIGH: $26,100,000,000
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2023
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.75
JURISDICTION: federal
SOURCE_NAME: 2023 Congressional Pig Book — Citizens Against Government Waste
SOURCE_URL: https://www.cagw.org/reporting/pig-book
SOURCE_TYPE: think_tank
SOURCE_METHODOLOGY: CAGW review of all FY2023 appropriations bills using identical 7-criteria methodology as FY2024. Found 7,396 earmarks costing $26.1B — record high at the time since earmarks were re-authorized in FY2021. Top recipients: Senate Appropriations Committee members accounted for disproportionate share. AMOUNT_LOW = GAO FY2023 official CPF/CDS tracking: 7,233 provisions, $15.3B total.
SOURCE_ORIENTATION: right
OVERLAP_NOTES: GAO FY2023 tracking ($15.3B) reflects only formally designated CPF/CDS. Gap from CAGW ($26.1B) reflects CAGW's broader counting methodology. The $26.1B was the highest CAGW-recorded annual earmark total since the moratorium ended. Senate maintained 1% budget cap per appropriations rules. Do NOT add FY2023 and FY2024 figures — these are separate annual periods.
ENTITY_LINKS: Congress, House Appropriations, Senate Appropriations, CAGW, GAO
```

---

**W7-003**
```
ID: W7-003
TITLE: GAO FY2023 Earmark Tracking — Official Community Project Funding/Congressionally Directed Spending
CATEGORY: W7
AMOUNT_BEST: $15,300,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2023
FISCAL_YEAR_END: 2023
PERIOD_TYPE: single_year
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.95
JURISDICTION: federal
SOURCE_NAME: GAO Tracking the Funds: Specific Fiscal Year 2023 Provisions
SOURCE_URL: https://www.gao.gov/tracking-funds
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: GAO analyzed all FY2023 appropriations legislation. Found 7,233 Community Project Funding (CPF) and Congressionally Directed Spending (CDS) provisions totaling $15.3B. Same 19 agencies administered earmarks in FY2024. Data sourced from official appropriations acts and joint explanatory statements. GAO tracks spending, distribution, and recipient information.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: This is the OFFICIAL government accounting — more conservative than CAGW's $26.1B for the same year. The ~$10.8B discrepancy represents CAGW items that are directed spending but not formally labeled as CPF/CDS. GAO tracking is descriptive (what was spent) not evaluative (was it wasteful). For FY2024, GAO official total is $14.6B vs. CAGW's $22.7B.
ENTITY_LINKS: GAO, Congress, OMB, 19 federal agencies administering earmarks
```

---

**W7-004**
```
ID: W7-004
TITLE: CAGW — Cumulative Earmarks Since FY1991
CATEGORY: W7
AMOUNT_BEST: $460,300,000,000
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 1991
FISCAL_YEAR_END: 2024
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.70
JURISDICTION: federal
SOURCE_NAME: 2024 Congressional Pig Book — Citizens Against Government Waste
SOURCE_URL: https://www.cagw.org/2024-congressional-pig-book/
SOURCE_TYPE: think_tank
SOURCE_METHODOLOGY: CAGW has tracked earmarks using its 7-criteria methodology since FY1991. Cumulative total: 132,434 earmarks costing $460.3B. Historical context: During 11-year moratorium (FY2011–FY2021), annual average dropped to 192/year costing $9.4B. Before moratorium (FY2002–FY2010), averaged 9,542 earmarks/year costing $20.9B/year. Since reinstatement (FY2022–FY2024), averaged 6,919 earmarks/year costing $22.6B/year — still below pre-moratorium peak but rising.
SOURCE_ORIENTATION: right
OVERLAP_NOTES: This is CAGW's running cumulative total — methodology has changed over 33 years. Includes items that funded legitimate infrastructure and some that produced fraudulent or wasteful outcomes. Do NOT add to annual W7 figures — this is the sum of all annual totals. The $460B cumulative total is useful for context but not for any single-year analysis.
ENTITY_LINKS: Congress, CAGW, OMB, all appropriations committees
```

---

**W7-005**
```
ID: W7-005
TITLE: CAGW FY2024 — Top 5 Senate Earmark Recipients
CATEGORY: W7
AMOUNT_BEST: $2,345,913,685
AMOUNT_LOW: N/A
AMOUNT_HIGH: N/A
FISCAL_YEAR_START: 2024
FISCAL_YEAR_END: 2024
PERIOD_TYPE: single_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.78
JURISDICTION: federal
SOURCE_NAME: 2024 Congressional Pig Book — Citizens Against Government Waste
SOURCE_URL: https://www.cagw.org/2024-congressional-pig-book/
SOURCE_TYPE: think_tank
SOURCE_METHODOLOGY: CAGW tracks individual member earmarks from appropriations bill text and joint explanatory statements. Top 5 FY2024 senators by dollar value: Sen. Collins (R-ME) $575.6M/231 earmarks; Sen. Murkowski (R-AK) $466.4M/185 earmarks; Sen. King (I-ME) $453.6M/186 earmarks; Sen. Schatz (D-HI) $428.6M/114 earmarks; Sen. Schumer (D-NY) $421.7M/227 earmarks. These 5 senators (0.93% of the Senate) = 10.3% of total earmark cost ($2.35B of $22.7B).
SOURCE_ORIENTATION: right
OVERLAP_NOTES: SUBSET of W7-001 (FY2024 total). Bipartisan distribution — top 5 includes R, I, and D senators. All are senior Appropriations Committee members except Schumer (who is Majority Leader). Concentration is partly a function of committee access, not solely ideology. Rep. Fleischmann (R-TN) received single largest House earmark; 90 Appropriations Committee members = 42.2% of earmarks and 35.2% of dollars.
ENTITY_LINKS: Senate Appropriations Committee, Collins, Murkowski, King, Schatz, Schumer, CAGW, Congress
```

---

**W7-006**
```
ID: W7-006
TITLE: GAO High-Risk Program — Cumulative Financial Benefits Since 1990 (Savings from High-Risk Oversight)
CATEGORY: W7
AMOUNT_BEST: $759,000,000,000
AMOUNT_LOW: $675,000,000,000
AMOUNT_HIGH: $759,000,000,000
FISCAL_YEAR_START: 1990
FISCAL_YEAR_END: 2025
PERIOD_TYPE: cumulative
CERTAINTY_TIER: 1
CERTAINTY_SCORE: 0.85
JURISDICTION: federal
SOURCE_NAME: GAO High-Risk Series 2025 (GAO-25-107743)
SOURCE_URL: https://www.gao.gov/products/gao-25-107743
SOURCE_TYPE: gao_audit
SOURCE_METHODOLOGY: GAO tracks financial benefits from congressional and executive actions taken in response to High-Risk designations. Benefits include cost avoidances, savings, and revenue increases. Since 1990: $759B cumulative ($675B through 2023 + $84B in 2023–2025 incremental). Average ~$40B/year in realized savings. Benefits arise from actions across all 38 High-Risk areas — improper payment reductions, defense acquisition improvements, duplication eliminations, IT project cancellations, etc.
SOURCE_ORIENTATION: nonpartisan
OVERLAP_NOTES: These are SAVINGS ACHIEVED (benefits from oversight), NOT the ongoing waste amounts. This entry is included in W7 because it represents the "value of accountability" — what has been saved by identifying and acting on high-risk areas. Do NOT subtract from waste totals. The $759B savings does not mean $759B less waste — it means $759B in value was preserved. Ongoing savings opportunity is much larger.
ENTITY_LINKS: GAO, Congress, OMB, all agencies on High-Risk List
```

---

**W7-007**
```
ID: W7-007
TITLE: Earmark Moratorium Period — Pre/Post Comparison (FY2011–FY2021 vs. Current)
CATEGORY: W7
AMOUNT_BEST: $9,400,000,000
AMOUNT_LOW: $9,400,000,000
AMOUNT_HIGH: $22,600,000,000
FISCAL_YEAR_START: 2011
FISCAL_YEAR_END: 2024
PERIOD_TYPE: multi_year
CERTAINTY_TIER: 2
CERTAINTY_SCORE: 0.75
JURISDICTION: federal
SOURCE_NAME: 2024 Congressional Pig Book — Citizens Against Government Waste; CRS reports on earmark history
SOURCE_URL: https://www.cagw.org/2024-congressional-pig-book/
SOURCE_TYPE: think_tank
SOURCE_METHODOLOGY: During the 11-year earmark moratorium (FY2011–FY2021), annual earmarks averaged $9.4B/year costing 192 earmarks/year under CAGW methodology. Since reinstatement (FY2022–FY2024), annual average has been 6,919 earmarks/year costing $22.6B/year. AMOUNT_LOW = moratorium-era average. AMOUNT_BEST = current post-reinstatement average. Still below pre-moratorium peak (FY2002–FY2010: $20.9B/year average, 9,542 earmarks/year). Earmarks were re-authorized under House rules changes in FY2021 with new transparency requirements and 1% budget cap.
SOURCE_ORIENTATION: right
OVERLAP_NOTES: Useful for trend analysis: earmark spending has increased 140% from moratorium-era lows since reinstatement. The "1% cap" applied to member-requested earmarks; leadership-directed spending not always captured. Pre-moratorium era (Bridge to Nowhere, $200M+ infamous earmarks) driven out by Tea Party/earmark reform movement. Current era has transparency improvements (members must post requests publicly) but dollar amounts are rising. Do NOT add to other W7 annual entries — this is a reference/comparison data point.
ENTITY_LINKS: Congress, House Rules, Senate Appropriations, CAGW, CRS, OMB
```

---

## PART III — ANALYTICAL SECTIONS

---

## DOUBLE COUNTING MATRIX

> ⚠️ READ BEFORE SUMMING ANY TWO ENTRIES. This matrix identifies all known overlaps between data points. "Safe to Sum?" = NO means the two entries share the same underlying dollars and cannot be added together without double-counting.

| Entry A | Entry B | Relationship | Safe to Sum? |
|---------|---------|-------------|--------------|
| **W6-001** (Govt-Wide Improper Payments $150B/yr) | **W6-003** (HHS Improper Payments $97B) | W6-003 is SUBSET of W6-001 | ❌ NO |
| **W6-001** | **W6-004** (IRS Tax Credits $28B) | W6-004 is SUBSET of W6-001 | ❌ NO |
| **W6-001** | **W6-005** (USDA Improper $13.4B) | W6-005 is SUBSET of W6-001 | ❌ NO |
| **W6-001** | **W6-006** (DOL UI Improper $5B) | W6-006 is SUBSET of W6-001 | ❌ NO |
| **W6-001** | **W6-007** (COVID UI $60–163B, multi-year) | PARTIAL OVERLAP — W6-007 is multi-year cumulative (FY2020–2022); W6-001 is annual. COVID period W6-001 figures include some COVID UI. | ⚠️ CAUTION |
| **W6-001** | **W6-008** (SSA OASDI $3B) | W6-008 is SUBSET of W6-001 | ❌ NO |
| **W6-001** | **W6-009** (VA Improper $3.9B) | W6-009 is SUBSET of W6-001 | ❌ NO |
| **W6-001** | **W6-010** (FY2021 COVID Peak $281B) | W6-010 is the PEAK YEAR value of W6-001; do not add to annual average | ❌ NO |
| **W6-002** (Cumulative $2.8T) | **W6-001** (Annual $150B) | W6-002 is the cumulative sum of ~22 years of W6-001 and prior annual figures | ❌ NO |
| **W6-003** (HHS $97B) | **F1-001** (HHS Confirmed Fraud $3.51B) | F1-001 is a SUBSET of W6-003 — confirmed fraud is ~3.6% of HHS improper payments | ❌ NO |
| **W6-004** (IRS Tax Credits $28B) | **F4-xxx** (EITC Fraud entries) | F4 EITC fraud is a SUBSET of W6-004 improper payments | ❌ NO |
| **W6-007** (COVID UI $60–163B) | **F7-002** (DOL UI Fraud $76B) | MAJOR OVERLAP — both cover COVID UI. F7-002 fraud estimate is within the W6-007 range | ❌ NO |
| **F5-001** (COVID SBA PPP/EIDL fraud $76–200B) | **F7-001** (PRAC COVID fraud $191–400B) | F5/F7 SBA fraud is a SUBSET of PRAC's government-wide COVID fraud estimate | ❌ NO |
| **F5-001** (SBA COVID) | **W6-007** (COVID UI) | SEPARATE programs (SBA loans vs. UI benefits) but both in PRAC total | ✅ YES (different programs) |
| **W5-001** (VA EHR $21B contract) | **W5-001** (VA EHR $49.8B lifecycle) | SAME PROGRAM, different metrics. $21B = committed contract. $49.8B = 28-year lifecycle projection | ❌ NO |
| **W5-004** (Federal IT at-risk $18–27B/yr) | **W5-001** (VA EHR) | VA EHR is a SPECIFIC INSTANCE within W5-004's pool | ❌ NO |
| **W5-004** (Federal IT at-risk) | **W5-002** (Healthcare.gov $2.1B) | Healthcare.gov is a SPECIFIC INSTANCE within W5-004's pool | ❌ NO |
| **W5-003** (FAA NextGen W5 entry) | **W2-FAA** (FAA NextGen W2 entry) | SAME PROGRAM from two different analytical angles. W2 = cost overrun; W5 = performance failure | ❌ NO |
| **W7-001** (CAGW FY2024 $22.7B) | **W7-003** (GAO FY2023 $15.3B) | DIFFERENT FISCAL YEARS (FY2024 vs FY2023). The $8B gap within the same year is methodological, not additive | ⚠️ CAUTION (different years) |
| **W7-001** (CAGW FY2024 $22.7B) | **W7-002** (CAGW FY2023 $26.1B) | DIFFERENT FISCAL YEARS — do not add for annual estimate | ❌ NO for single-year; ✅ YES for multi-year cumulative |
| **W7-005** (Top 5 Senate earmarks $2.35B) | **W7-001** (FY2024 total $22.7B) | W7-005 is SUBSET of W7-001 | ❌ NO |
| **W7-004** (CAGW Cumulative $460B) | **W7-001** or **W7-002** | W7-004 is the cumulative SUM of all annual W7 figures since 1991 | ❌ NO |
| **W7-006** (GAO High-Risk Savings $759B) | Any waste entry | These are SAVINGS ACHIEVED, not waste amounts. Conceptually opposite direction | ❌ NO (different concept) |
| **W1-xxx** (GAO Duplication $429B savings) | **W6-001** (Improper payments) | Duplication savings include improper payment reductions — partial methodological overlap | ⚠️ CAUTION |
| **F1-001** (HHS Confirmed Fraud $3.51B/yr) | **DOJ FCA Healthcare recoveries** | DOJ FCA recoveries represent what was RECOVERED from fraud — not additive with fraud amounts | ❌ NO (recoveries ≠ additional fraud) |
| **F4-001** (IRS Tax Gap $496–606B) | **W6-004** (EITC Improper $28B) | DIFFERENT MEASURES. Tax gap = taxes owed but uncollected. EITC improper = payments to ineligible recipients. Partially overlapping but conceptually distinct | ⚠️ CAUTION (partial overlap) |
| **W4-001** (Cato Federal Pay Premium $30–80B) | Any other W4 entry | Cato estimate is Tier 3 advocacy; contested by CBO and OPM. Do not add to official figures | ❌ NO (methodology conflict) |
| **W2-001** (F-35 cumulative overrun $165B) | **W2-DOD Nuclear** ($756B CBO) | F-35 overrun is a SUBSET of overall DOD acquisition issues; CBO nuclear cost is SEPARATE (different programs) | ✅ YES (different weapon systems) |

---

### SAFE-TO-SUM NON-OVERLAPPING SET

The following entries can be summed for a conservative total. They represent distinct programs and distinct dollar types:

| Entry ID | Category | Annual Amount | Notes |
|----------|----------|--------------|-------|
| W6-001 | Govt-Wide Improper Payments | $150B/yr | USE THIS, not sub-entries |
| W2-001 | F-35 Ongoing Cost Overrun | ~$5–10B/yr amortized | Annual ongoing overrun |
| W3-001 | Idle Federal Real Property | $2–5B/yr | Subset of $10.3B operating cost |
| W5-004 | Federal IT At-Risk | $18–27B/yr | Excludes VA EHR and Healthcare.gov |
| W7-001 | Earmarks (GAO methodology) | $14.6B/yr | Use GAO figure for conservatism |
| W4-001 | Admin Overhead Premium | $30–80B/yr | Tier 3 only; use low end or exclude |
| **CONSERVATIVE TOTAL** | | **~$190–257B/yr** | Excludes Tier 3 pay premium |
| **WITH PAY PREMIUM** | | **~$220–337B/yr** | Includes contested Cato Tier 3 estimate |

*Note: W6-001 ($150B) already contains fraud subset. Adding confirmed F-category fraud on top would double-count the fraud-within-improper-payments portion.*

---

## ENTITY INDEX

> Maps major federal entities to all data point IDs where that entity appears as a primary subject or significant data source.

### Medicare
- W6-001 (largest component of govt-wide improper payments)
- W6-003 (HHS improper payments; Medicare FFS ~$25–50B of $97B total)
- F1-001 (HHS confirmed healthcare fraud $3.51B/yr)
- F1-002 through F1-009 (Medicare fraud subcategories — DOJ FCA healthcare, HEAT task force)
- W5-004 (Federal IT at-risk — CMS QSSI/CGI Federal systems)

### Medicaid
- W6-001 (major component of govt-wide improper payments)
- W6-003 (HHS improper payments; Medicaid ~$30–45B of $97B)
- F1-001 (HHS confirmed healthcare fraud — Medicaid fraud included)
- W5-004 (Medicaid eligibility system IT issues)
- W6-010 (FY2021 COVID peak — driven by Medicaid continuous enrollment)

### Department of Defense (DOD)
- W2-001 (F-35 cumulative cost overrun $165B+)
- W2-002 (Sentinel ICBM Nunn-McCurdy breach)
- W2-003 (CBO nuclear modernization $756B, 10-year)
- W5-005 (DOD Financial Management — never passed audit)
- F2-001 through F2-004 (DOD/defense contractor fraud; DCIS ~$500M/yr)
- W5-001 (DOD MHS GENESIS parallel to VA EHR — same Oracle/Cerner contract)
- W5-004 (Federal IT at-risk — DOD IT systems included)

### Internal Revenue Service (IRS) / Treasury
- F4-001 (IRS Net Tax Gap $496–606B/yr)
- F4-002 through F4-007 (Tax fraud subcategories — identity theft, EITC fraud, offshore accounts)
- W6-004 (IRS Refundable Tax Credit Improper Payments $28B FY2025)
- W5-004 (Federal IT at-risk — IRS modernization program included)

### Department of Veterans Affairs (VA)
- W5-001 (VA EHR Modernization $21–49.8B)
- W6-009 (VA Improper Payments $3.9B FY2025)
- W5-005 (VA Acquisition Management — separate GAO High-Risk area)
- F1-xxx (VA healthcare fraud subcategories)

### Small Business Administration (SBA)
- F5-001 (SBA COVID EIDL/PPP fraud $76–200B)
- F7-001 (SBA in PRAC COVID fraud total $191–400B)
- W6-001 (SBA in govt-wide improper payments — 12.29% rate, $8.14B FY2025)

### Social Security Administration (SSA)
- F3-xxx (SSA benefits fraud subcategories)
- W6-008 (SSA OASDI Overpayments $3B FY2024)
- W6-001 (SSA component of govt-wide improper payments)

### Department of Labor (DOL)
- W6-006 (DOL UI Improper Payments $5B FY2025)
- W6-007 (COVID Pandemic UI $60–163B cumulative)
- F7-002 (DOL UI Fraud during COVID $76B)
- W6-001 (DOL component of govt-wide improper payments)

### Department of Agriculture (USDA)
- W6-005 (USDA Improper Payments $13.4B FY2025)
- F3-001 (USDA Confirmed Fraud $155M FY2025)
- W6-001 (USDA component of govt-wide improper payments)

### FAA / Department of Transportation (DOT)
- W2-FAA (FAA NextGen cost overruns — W2 entry)
- W5-003 (FAA NextGen performance failures)
- W5-004 (Federal IT at-risk — ATC legacy systems included)

### HHS / CMS
- W6-003 (HHS Improper Payments $97B FY2025)
- W6-010 (FY2021 peak driven by HHS COVID programs)
- F1-001 (HHS Confirmed Fraud $3.51B)
- W5-002 (Healthcare.gov launch failure $2.1B)
- W6-001 (HHS is ~65% of govt-wide improper payments)

### Congress / Appropriations Committees
- W7-001 (FY2024 Earmarks $14.6–22.7B)
- W7-002 (FY2023 Earmarks $15.3–26.1B)
- W7-003 (GAO FY2023 CPF/CDS $15.3B)
- W7-004 (Cumulative earmarks $460B since 1991)
- W7-005 (Top 5 Senate earmarkers)
- W7-007 (Earmark moratorium comparison)

### GAO (Cross-Cutting Oversight)
- W7-006 (GAO High-Risk cumulative savings $759B)
- W5-004 (IT Acquisitions High-Risk — regressed 2025)
- W5-005 (DOD Financial Management High-Risk)
- W3-001 (Federal Real Property High-Risk — regressed 2025)
- W6-001 (Improper payments oversight)
- W1-001 through W1-005 (GAO Duplication reports)
- W5-001 (VA EHR High-Risk monitoring)

### OMB
- W6-001 (OMB compiles govt-wide improper payment reports)
- W6-002 (OMB/paymentaccuracy.gov historical data)
- W7-001 (OMB earmark cap enforcement)
- W5-004 (OMB IT Dashboard — $90–100B federal IT spend)

---

## GAP ANALYSIS

> Identifies categories, programs, and time periods missing from this dataset. Organized by priority.

### CRITICAL GAPS (High Priority — Data Exists but Not Yet Collected)

#### G1 — F6 Category: Employee and Internal Fraud
- **Gap:** F6 (Employee/Internal Fraud) has ZERO entries in this dataset. The data point count table shows 0 Tier 1–2 entries.
- **Known sources:** OPM tracks federal employee misconduct. FBI tracks public corruption (600–800 federal employee prosecutions/year). Each IG office tracks internal fraud.
- **Estimated scale:** Inspector General community as a whole reports ~$1–3B in internal fraud cases annually but no consolidated figure exists.
- **Action:** Collect from IG community annual reports (CIGIE), FBI Public Corruption Unit statistics, OPM misconduct data, and paymentaccuracy.gov "confirmed fraud" breakdowns by agency for non-benefit programs.

#### G2 — Medicare FFS Disaggregation
- **Gap:** Medicare FFS improper payments ($25–50B/yr) are embedded in W6-003 (HHS $97B total) but not broken out as a standalone entry.
- **Known sources:** CMS CERT program publishes Medicare FFS error rate annually. Should be W6-003a.
- **Action:** Add standalone Medicare FFS entry. Estimate ~$25–40B/yr (FY2025 rate lower than COVID peak).

#### G3 — Medicaid Disaggregation
- **Gap:** Medicaid improper payments (~$30–45B/yr) embedded in W6-003 but not standalone.
- **Known sources:** CMS T-MSIS data; Medicaid and CHIP Payment and Access Commission (MACPAC).
- **Action:** Add standalone Medicaid entry. FY2021 peak was ~$100B+ (COVID continuous enrollment); FY2025 likely $30–40B post-unwinding.

#### G4 — DOD Improper Payments
- **Gap:** DOD has never passed an audit (W5-005) but its improper payment estimates are incomplete in this dataset. DOD improper payments are partially captured in W6-001 but not broken out.
- **Known sources:** DOD Annual Financial Report; DFAS; DOD OIG; paymentaccuracy.gov DOD profile.
- **Action:** Add DOD-specific improper payment entry. DOD reported $7–15B/yr in improper payments in recent years despite audit failures making accurate measurement impossible.

#### G5 — GSA Federal Real Property Excess Costs
- **Gap:** W3 category has total operating costs ($10.3B) and deferred maintenance ($370B) but no standalone entry for costs attributable specifically to EXCESS/UNUSED properties.
- **Known sources:** GSA Federal Real Property Profile database; OMB disposal program data.
- **Estimated scale:** GAO estimates billions in annual carrying costs for excess/underutilized properties; specific figure not isolated in current dataset.
- **Action:** Add W3 entry for excess property annual carrying cost. Likely $2–5B/yr.

#### G6 — IRS Identity Theft Tax Fraud (Standalone)
- **Gap:** IRS addresses billions in identity theft tax fraud annually but this is embedded in the broader tax gap figure (F4-001) rather than tracked as a standalone confirmed fraud entry.
- **Known sources:** IRS Identity Theft Tax Refund Fraud (IDTTRF) data; IRS Criminal Investigation annual report.
- **Estimated scale:** IRS stopped ~$6.5B in fraudulent identity theft refund claims in FY2023 (most recent available). Actual fraud (not just stopped) is additional.
- **Action:** Add F4 standalone entry for IRS identity theft fraud prevention/losses.

---

### SIGNIFICANT GAPS (Medium Priority — Requires Additional Research)

#### G7 — State-Level Federal Pass-Through Fraud and Waste
- **Gap:** Entire state-level dimension is missing. Many federal programs (Medicaid, SNAP, UI, CHIP, Education) are administered by states using federal funds. State-level fraud and waste in these programs is partially captured in agency improper payment rates but not analyzed by state.
- **Scope:** Estimated federal pass-through to states: $750B+/year. Even a 5% error rate = $37B+/year not captured in federal-only view.
- **Future work:** Add state-by-state breakdowns for Medicaid, SNAP, UI. California, Texas, New York would be highest-dollar states.
- **Note:** Flagged in original scope as "California and state-level as future work."

#### G8 — Prescription Drug Pricing / Medicare Part D Waste
- **Gap:** Medicare Part D overpayments relative to VA drug prices / international benchmarks are a major policy waste category not currently in dataset.
- **Known sources:** GAO drug pricing comparisons; CBO analyses; HHS OIG Part D fraud reports.
- **Estimated scale:** CBO estimates Medicare could save $100B+ over 10 years from drug price negotiation (IRA negotiation just beginning). Part D fraud/overcharging: ~$3–8B/yr per various estimates.
- **Action:** Add W1 (duplicative/inefficient) entry for Part D pricing waste and F1 entry for Part D fraud.

#### G9 — Defense Contractor Overcharging (Beyond F-35)
- **Gap:** Only specific weapon system overruns are captured. Broader defense contractor pricing irregularities, inflated overhead rates, and DCAA (Defense Contract Audit Agency) findings are not consolidated.
- **Known sources:** DCAA annual reports (~$5B in questioned costs/year); DOD OIG; POGO database.
- **Estimated scale:** DCAA questions $4–7B/year in contractor costs; not all are recovered.
- **Action:** Add F2 or W2 entry for DCAA questioned costs with recovery rate.

#### G10 — Education Department Improper Payments
- **Gap:** Pell Grants, student loans, and FAFSA-related improper payments are not captured in this dataset beyond general W6-001 aggregate.
- **Known sources:** ED OIG; paymentaccuracy.gov ED profile; FSA Annual Report.
- **Estimated scale:** Education Department reports ~$6–10B/yr in improper payments (Pell Grants, Direct Loans).
- **Action:** Add W6 entry for ED improper payments.

#### G11 — Energy Department (DOE/NNSA) Waste Beyond Nuclear Modernization
- **Gap:** DOE waste limited to nuclear weapons modernization costs (W2-003). DOE has major issues with: cleanup of nuclear sites (Hanford: $640B estimated cleanup cost), research grant mismanagement, national lab overhead costs.
- **Known sources:** DOE OIG; GAO DOE High-Risk areas; CBO analyses.
- **Action:** Add W3 entry for Hanford/nuclear cleanup cost escalation and W1 entry for DOE/national lab overhead waste.

---

### DATA QUALITY GAPS (Methodology Issues)

#### G12 — Improper Payments: 9 Unreported Programs (FY2023)
- **Gap:** GAO explicitly noted that 9 risk-susceptible programs failed to report FY2023 improper payment estimates. These programs are not named in available sources but represent a known undercount.
- **Impact:** The $150B/yr government-wide figure is acknowledged as a floor by GAO itself.
- **Action:** Obtain list of 9 non-reporting programs from GAO-25-107743 appendix and estimate their contribution.

#### G13 — COVID Fraud: PRAC $191–400B Range Is Too Wide
- **Gap:** The Pandemic Response Accountability Committee (PRAC) estimated COVID fraud at $191B–$400B — a $209B range that is too imprecise for useful analysis.
- **Impact:** This wide range makes any COVID fraud total unreliable for summation.
- **Action:** Disaggregate PRAC estimate by program (PPP, EIDL, PUA, PEUC, Provider Relief Fund, etc.) and use program-level IG estimates where available.

#### G14 — Tier 3 Estimates Lack Comparable Methodology
- **Gap:** Heritage Foundation ($100–200B/yr waste), Cato Institute ($200–500B/yr waste), and Peterson Foundation estimates use incompatible methodologies and political frameworks.
- **Impact:** Cannot be compared or combined with Tier 1 (audited) data.
- **Action:** These should remain clearly labeled Tier 3 with explicit "political/ideological framing" notation. Consider removing AMOUNT fields from Tier 3 think tank entries to prevent inadvertent summation with official data.

---

### TIME PERIOD GAPS

#### G15 — FY2014–FY2017 Coverage Is Sparse
- **Gap:** Current dataset focuses heavily on FY2018–FY2025. Pre-2018 data is limited to cumulative figures. Historical trend data for 2014–2017 would allow pre/post analysis of policy interventions.
- **Programs most affected:** Medicare fraud evolution (post-ACA), EITC compliance trends, defense acquisition before/after NDAA changes.

#### G16 — FY2026 Projections Missing
- **Gap:** No forward-looking estimates for FY2026. DOGE efficiency initiatives, IRA drug pricing, and improper payment reduction executive orders may materially change FY2026 figures.
- **Note:** As of dataset compilation (March 2026), FY2026 data will not be available until late 2026 or 2027.

---

### JURISDICTIONAL GAPS

#### G17 — State-Level (California Focus)
- **Noted in scope:** California state-level fraud and waste explicitly flagged as future work.
- **Priority programs:** Medi-Cal (California Medicaid) — CA is largest state by Medicaid spend. California EDD (Employment Development Department) — California had among the worst COVID UI fraud rates nationally. California DMV and state IT projects (notable failures).

#### G18 — Federal Territories and Compact Nations
- **Gap:** Improper payments in federal programs administered in Puerto Rico, Guam, USVI, American Samoa, CNMI, and Compact of Free Association nations (Marshall Islands, Micronesia, Palau) are not captured.
- **Scale:** Smaller in aggregate but higher error rates documented in territory-administered programs.

---

*Gap Analysis last updated: 2026-03-24*
*Next recommended update: After FY2025 GAO High-Risk Report and FY2026 OMB improper payment data*

---

*End of Consolidated Federal Fraud & Waste Dataset v1.0*
*Total entries: 77 data points + analytical sections*
*File compiled by: Froberto subagent, 2026-03-24*
