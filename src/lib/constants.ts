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
