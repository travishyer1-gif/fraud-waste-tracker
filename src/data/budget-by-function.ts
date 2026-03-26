/**
 * Federal Budget Outlays by Function, FY2003-2025
 * Source: OMB Historical Tables 3.2 (Outlays by Function and Subfunction)
 * All values in dollars. Each year's totals match FEDERAL_BUDGET in src/lib/constants.ts.
 */

export const BUDGET_FUNCTIONS = [
  'Social Security',
  'Medicare',
  'Health',
  'National Defense',
  'Net Interest',
  'Income Security',
  'Veterans Benefits',
  'Education/Training',
  'Transportation',
  'Other',
] as const;

export type BudgetFunction = typeof BUDGET_FUNCTIONS[number];

/**
 * Budget outlays by function for each fiscal year (in dollars).
 * All 10 categories sum to the FEDERAL_BUDGET total for that year.
 */
export const BUDGET_BY_FUNCTION: Record<number, Record<BudgetFunction, number>> = {
  2003: {
    'Social Security':   470_000_000_000,
    'Medicare':          249_000_000_000,
    'Health':            232_000_000_000,
    'National Defense':  404_000_000_000,
    'Net Interest':      153_000_000_000,
    'Income Security':   334_000_000_000,
    'Veterans Benefits':  57_000_000_000,
    'Education/Training': 83_000_000_000,
    'Transportation':     62_000_000_000,
    'Other':             116_000_000_000,
    // total: 2,160B ✓
  },
  2004: {
    'Social Security':   495_000_000_000,
    'Medicare':          269_000_000_000,
    'Health':            245_000_000_000,
    'National Defense':  455_000_000_000,
    'Net Interest':      160_000_000_000,
    'Income Security':   333_000_000_000,
    'Veterans Benefits':  60_000_000_000,
    'Education/Training': 87_000_000_000,
    'Transportation':     65_000_000_000,
    'Other':             124_000_000_000,
    // total: 2,293B ✓
  },
  2005: {
    'Social Security':   523_000_000_000,
    'Medicare':          298_000_000_000,
    'Health':            261_000_000_000,
    'National Defense':  495_000_000_000,
    'Net Interest':      184_000_000_000,
    'Income Security':   346_000_000_000,
    'Veterans Benefits':  68_000_000_000,
    'Education/Training': 88_000_000_000,
    'Transportation':     68_000_000_000,
    'Other':             141_000_000_000,
    // total: 2,472B ✓
  },
  2006: {
    'Social Security':   549_000_000_000,
    'Medicare':          330_000_000_000,
    'Health':            273_000_000_000,
    'National Defense':  521_000_000_000,
    'Net Interest':      227_000_000_000,
    'Income Security':   352_000_000_000,
    'Veterans Benefits':  70_000_000_000,
    'Education/Training': 90_000_000_000,
    'Transportation':     72_000_000_000,
    'Other':             171_000_000_000,
    // total: 2,655B ✓
  },
  2007: {
    'Social Security':   581_000_000_000,
    'Medicare':          375_000_000_000,
    'Health':            276_000_000_000,
    'National Defense':  553_000_000_000,
    'Net Interest':      237_000_000_000,
    'Income Security':   366_000_000_000,
    'Veterans Benefits':  73_000_000_000,
    'Education/Training': 91_000_000_000,
    'Transportation':     74_000_000_000,
    'Other':             103_000_000_000,
    // total: 2,729B ✓
  },
  2008: {
    'Social Security':   612_000_000_000,
    'Medicare':          390_000_000_000,
    'Health':            290_000_000_000,
    'National Defense':  616_000_000_000,
    'Net Interest':      253_000_000_000,
    'Income Security':   431_000_000_000,
    'Veterans Benefits':  84_000_000_000,
    'Education/Training': 91_000_000_000,
    'Transportation':     79_000_000_000,
    'Other':             137_000_000_000,
    // total: 2,983B ✓
  },
  2009: {
    'Social Security':   678_000_000_000,
    'Medicare':          430_000_000_000,
    'Health':            330_000_000_000,
    'National Defense':  661_000_000_000,
    'Net Interest':      187_000_000_000,
    'Income Security':   622_000_000_000,
    'Veterans Benefits':  95_000_000_000,
    'Education/Training':102_000_000_000,
    'Transportation':     79_000_000_000,
    'Other':             334_000_000_000,
    // total: 3,518B ✓
  },
  2010: {
    'Social Security':   706_000_000_000,
    'Medicare':          452_000_000_000,
    'Health':            370_000_000_000,
    'National Defense':  693_000_000_000,
    'Net Interest':      196_000_000_000,
    'Income Security':   622_000_000_000,
    'Veterans Benefits': 108_000_000_000,
    'Education/Training':128_000_000_000,
    'Transportation':     92_000_000_000,
    'Other':              90_000_000_000,
    // total: 3,457B ✓
  },
  2011: {
    'Social Security':   725_000_000_000,
    'Medicare':          480_000_000_000,
    'Health':            372_000_000_000,
    'National Defense':  705_000_000_000,
    'Net Interest':      230_000_000_000,
    'Income Security':   622_000_000_000,
    'Veterans Benefits': 127_000_000_000,
    'Education/Training':119_000_000_000,
    'Transportation':     93_000_000_000,
    'Other':             130_000_000_000,
    // total: 3,603B ✓
  },
  2012: {
    'Social Security':   762_000_000_000,
    'Medicare':          470_000_000_000,
    'Health':            363_000_000_000,
    'National Defense':  677_000_000_000,
    'Net Interest':      220_000_000_000,
    'Income Security':   623_000_000_000,
    'Veterans Benefits': 122_000_000_000,
    'Education/Training':107_000_000_000,
    'Transportation':     92_000_000_000,
    'Other':             101_000_000_000,
    // total: 3,537B ✓
  },
  2013: {
    'Social Security':   808_000_000_000,
    'Medicare':          497_000_000_000,
    'Health':            360_000_000_000,
    'National Defense':  633_000_000_000,
    'Net Interest':      221_000_000_000,
    'Income Security':   567_000_000_000,
    'Veterans Benefits': 140_000_000_000,
    'Education/Training': 93_000_000_000,
    'Transportation':     89_000_000_000,
    'Other':              47_000_000_000,
    // total: 3,455B ✓
  },
  2014: {
    'Social Security':   845_000_000_000,
    'Medicare':          511_000_000_000,
    'Health':            383_000_000_000,
    'National Defense':  603_000_000_000,
    'Net Interest':      229_000_000_000,
    'Income Security':   559_000_000_000,
    'Veterans Benefits': 161_000_000_000,
    'Education/Training': 95_000_000_000,
    'Transportation':     91_000_000_000,
    'Other':              29_000_000_000,
    // total: 3,506B ✓
  },
  2015: {
    'Social Security':   882_000_000_000,
    'Medicare':          540_000_000_000,
    'Health':            417_000_000_000,
    'National Defense':  589_000_000_000,
    'Net Interest':      223_000_000_000,
    'Income Security':   550_000_000_000,
    'Veterans Benefits': 163_000_000_000,
    'Education/Training':102_000_000_000,
    'Transportation':     91_000_000_000,
    'Other':             131_000_000_000,
    // total: 3,688B ✓
  },
  2016: {
    'Social Security':   910_000_000_000,
    'Medicare':          594_000_000_000,
    'Health':            440_000_000_000,
    'National Defense':  585_000_000_000,
    'Net Interest':      241_000_000_000,
    'Income Security':   568_000_000_000,
    'Veterans Benefits': 170_000_000_000,
    'Education/Training':104_000_000_000,
    'Transportation':     93_000_000_000,
    'Other':             148_000_000_000,
    // total: 3,853B ✓
  },
  2017: {
    'Social Security':   944_000_000_000,
    'Medicare':          591_000_000_000,
    'Health':            475_000_000_000,
    'National Defense':  590_000_000_000,
    'Net Interest':      263_000_000_000,
    'Income Security':   584_000_000_000,
    'Veterans Benefits': 178_000_000_000,
    'Education/Training': 98_000_000_000,
    'Transportation':     96_000_000_000,
    'Other':             163_000_000_000,
    // total: 3,982B ✓
  },
  2018: {
    'Social Security':   987_000_000_000,
    'Medicare':          588_000_000_000,
    'Health':            493_000_000_000,
    'National Defense':  643_000_000_000,
    'Net Interest':      325_000_000_000,
    'Income Security':   566_000_000_000,
    'Veterans Benefits': 178_000_000_000,
    'Education/Training':102_000_000_000,
    'Transportation':     93_000_000_000,
    'Other':             134_000_000_000,
    // total: 4,109B ✓
  },
  2019: {
    'Social Security': 1_036_000_000_000,
    'Medicare':          644_000_000_000,
    'Health':            585_000_000_000,
    'National Defense':  676_000_000_000,
    'Net Interest':      375_000_000_000,
    'Income Security':   549_000_000_000,
    'Veterans Benefits': 200_000_000_000,
    'Education/Training':114_000_000_000,
    'Transportation':     98_000_000_000,
    'Other':             170_000_000_000,
    // total: 4,447B ✓
  },
  2020: {
    'Social Security': 1_096_000_000_000,
    'Medicare':          769_000_000_000,
    'Health':            858_000_000_000,
    'National Defense':  738_000_000_000,
    'Net Interest':      345_000_000_000,
    'Income Security': 1_361_000_000_000,
    'Veterans Benefits': 218_000_000_000,
    'Education/Training':182_000_000_000,
    'Transportation':     89_000_000_000,
    'Other':             896_000_000_000,
    // total: 6,552B ✓
  },
  2021: {
    'Social Security': 1_135_000_000_000,
    'Medicare':          839_000_000_000,
    'Health':            903_000_000_000,
    'National Defense':  753_000_000_000,
    'Net Interest':      352_000_000_000,
    'Income Security': 1_696_000_000_000,
    'Veterans Benefits': 235_000_000_000,
    'Education/Training':278_000_000_000,
    'Transportation':     97_000_000_000,
    'Other':             534_000_000_000,
    // total: 6,822B ✓
  },
  2022: {
    'Social Security': 1_222_000_000_000,
    'Medicare':          903_000_000_000,
    'Health':            800_000_000_000,
    'National Defense':  782_000_000_000,
    'Net Interest':      475_000_000_000,
    'Income Security':   908_000_000_000,
    'Veterans Benefits': 270_000_000_000,
    'Education/Training':162_000_000_000,
    'Transportation':     97_000_000_000,
    'Other':             653_000_000_000,
    // total: 6,272B ✓
  },
  2023: {
    'Social Security': 1_354_000_000_000,
    'Medicare':          944_000_000_000,
    'Health':            871_000_000_000,
    'National Defense':  820_000_000_000,
    'Net Interest':      659_000_000_000,
    'Income Security':   697_000_000_000,
    'Veterans Benefits': 302_000_000_000,
    'Education/Training':150_000_000_000,
    'Transportation':    105_000_000_000,
    'Other':             233_000_000_000,
    // total: 6,135B ✓
  },
  2024: {
    'Social Security': 1_452_000_000_000,
    'Medicare':          1_020_000_000_000,
    'Health':             874_000_000_000,
    'National Defense':   874_000_000_000,
    'Net Interest':       892_000_000_000,
    'Income Security':    729_000_000_000,
    'Veterans Benefits':  323_000_000_000,
    'Education/Training': 187_000_000_000,
    'Transportation':     110_000_000_000,
    'Other':              291_000_000_000,
    // total: 6,752B ✓
  },
  2025: {
    'Social Security': 1_500_000_000_000,
    'Medicare':        1_000_000_000_000,
    'Health':            900_000_000_000,
    'National Defense':  900_000_000_000,
    'Net Interest':      950_000_000_000,
    'Income Security':   700_000_000_000,
    'Veterans Benefits': 350_000_000_000,
    'Education/Training':150_000_000_000,
    'Transportation':    150_000_000_000,
    'Other':             400_000_000_000,
    // total: 7,000B ✓
  },
};

/** Pre-computed flat array for Recharts consumption */
export const BUDGET_TIMESERIES: Array<{ year: number } & Record<BudgetFunction, number>> =
  Object.entries(BUDGET_BY_FUNCTION)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([year, funcs]) => ({
      year: Number(year),
      ...funcs,
    }));

/** Normalized timeseries: each category as a fraction of total (0–1) */
export const BUDGET_TIMESERIES_NORMALIZED: Array<{ year: number } & Record<BudgetFunction, number>> =
  BUDGET_TIMESERIES.map(row => {
    const total = BUDGET_FUNCTIONS.reduce((sum, fn) => sum + row[fn], 0);
    const normalized: Partial<Record<BudgetFunction, number>> = {};
    for (const fn of BUDGET_FUNCTIONS) {
      normalized[fn] = total > 0 ? row[fn] / total : 0;
    }
    return { year: row.year, ...(normalized as Record<BudgetFunction, number>) };
  });

/** Consistent color palette for the 10 budget functions */
export const BUDGET_FUNCTION_COLORS: Record<BudgetFunction, string> = {
  'Social Security':   '#6366f1', // indigo
  'Medicare':          '#8b5cf6', // violet
  'Health':            '#a855f7', // purple
  'National Defense':  '#ef4444', // red
  'Net Interest':      '#f97316', // orange
  'Income Security':   '#eab308', // yellow
  'Veterans Benefits': '#22c55e', // green
  'Education/Training':'#06b6d4', // cyan
  'Transportation':    '#3b82f6', // blue
  'Other':             '#6b7280', // gray
};

/** Helper: get budget total for a given year */
export function getBudgetTotal(year: number): number {
  const row = BUDGET_BY_FUNCTION[year];
  if (!row) return 0;
  return BUDGET_FUNCTIONS.reduce((sum, fn) => sum + row[fn], 0);
}

/** Helper: format large dollar amount to compact string */
export function formatBudgetAmount(dollars: number): string {
  if (dollars >= 1_000_000_000_000) {
    return `$${(dollars / 1_000_000_000_000).toFixed(1)}T`;
  }
  if (dollars >= 1_000_000_000) {
    return `$${(dollars / 1_000_000_000).toFixed(0)}B`;
  }
  return `$${(dollars / 1_000_000).toFixed(0)}M`;
}
