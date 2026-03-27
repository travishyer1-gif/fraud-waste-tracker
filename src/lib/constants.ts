export const TIER_COLORS = {
  1: { bg: '#22c55e', label: 'Confirmed', icon: '✅' },
  2: { bg: '#3b82f6', label: 'Estimated', icon: '🔵' },
  3: { bg: '#f59e0b', label: 'Researched', icon: '🔶' },
  4: { bg: '#f97316', label: 'Reported', icon: '🔸' },
} as const;

export const CATEGORY_LABELS: Record<string, { label: string; type: 'fraud' | 'waste' }> = {
  F1: { label: 'Healthcare Fraud', type: 'fraud' },
  F2: { label: 'Defense/Contractor Fraud', type: 'fraud' },
  F3: { label: 'Benefits Fraud', type: 'fraud' },
  F4: { label: 'Tax Fraud/Evasion', type: 'fraud' },
  F5: { label: 'Grant/Research Fraud', type: 'fraud' },
  F6: { label: 'Employee/Internal Fraud', type: 'fraud' },
  F7: { label: 'Disaster/Emergency Fraud', type: 'fraud' },
  W1: { label: 'Duplicative Programs', type: 'waste' },
  W2: { label: 'Cost Overruns', type: 'waste' },
  W3: { label: 'Idle/Underused Assets', type: 'waste' },
  W4: { label: 'Administrative Overhead', type: 'waste' },
  W5: { label: 'Failed Programs/IT', type: 'waste' },
  W6: { label: 'Improper Payments', type: 'waste' },
  W7: { label: 'Earmarks/Pork', type: 'waste' },
};

export const TYPE_COLORS = {
  fraud: '#ef4444',
  waste: '#f59e0b',
} as const;

export const YEAR_RANGE = {
  min: 2003,
  max: 2025,
} as const;

/** Federal outlays by fiscal year (in dollars) */
export const FEDERAL_BUDGET: Record<number, number> = {
  2003: 2_160_000_000_000,
  2004: 2_293_000_000_000,
  2005: 2_472_000_000_000,
  2006: 2_655_000_000_000,
  2007: 2_729_000_000_000,
  2008: 2_983_000_000_000,
  2009: 3_518_000_000_000,
  2010: 3_457_000_000_000,
  2011: 3_603_000_000_000,
  2012: 3_537_000_000_000,
  2013: 3_455_000_000_000,
  2014: 3_506_000_000_000,
  2015: 3_688_000_000_000,
  2016: 3_853_000_000_000,
  2017: 3_982_000_000_000,
  2018: 4_109_000_000_000,
  2019: 4_447_000_000_000,
  2020: 6_552_000_000_000,
  2021: 6_822_000_000_000,
  2022: 6_272_000_000_000,
  2023: 6_135_000_000_000,
  2024: 6_752_000_000_000,
  2025: 7_000_000_000_000,
};

/** Average of all known FEDERAL_BUDGET values (fallback for unknown years) */
const FEDERAL_BUDGET_AVERAGE =
  Object.values(FEDERAL_BUDGET).reduce((a, b) => a + b, 0) /
  Object.values(FEDERAL_BUDGET).length;

/**
 * Format a dollar amount as a percentage of the federal budget.
 * @param amount - Dollar amount
 * @param year - Fiscal year (uses average budget if unknown/omitted)
 * @param referenceYear - Optional override: use this year's budget as denominator instead of entry year
 * @returns Formatted string like "0.042% of federal budget"
 */
export function formatAsPercent(amount: number, year?: number, referenceYear?: number): string {
  const budget =
    referenceYear !== undefined && FEDERAL_BUDGET[referenceYear] !== undefined
      ? FEDERAL_BUDGET[referenceYear]
      : year !== undefined && FEDERAL_BUDGET[year] !== undefined
        ? FEDERAL_BUDGET[year]
        : FEDERAL_BUDGET_AVERAGE;
  const pct = (amount / budget) * 100;
  // Show enough precision to be meaningful even for small numbers
  const formatted =
    pct >= 1
      ? pct.toFixed(2)
      : pct >= 0.01
        ? pct.toFixed(4)
        : pct.toFixed(6);
  return `${formatted}%`;
}
