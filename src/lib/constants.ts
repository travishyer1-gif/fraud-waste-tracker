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
  2018: 4_100_000_000_000,
  2019: 4_400_000_000_000,
  2020: 6_600_000_000_000,
  2021: 6_800_000_000_000,
  2022: 6_300_000_000_000,
  2023: 6_100_000_000_000,
  2024: 6_800_000_000_000,
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
 * @returns Formatted string like "0.042% of federal budget"
 */
export function formatAsPercent(amount: number, year?: number): string {
  const budget =
    year !== undefined && FEDERAL_BUDGET[year] !== undefined
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
  return `${formatted}% of fed. budget`;
}
