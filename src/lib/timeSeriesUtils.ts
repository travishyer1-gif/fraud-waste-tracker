import type { EvidenceEntry } from './types';

export const CHART_YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] as const;
export type ChartYear = (typeof CHART_YEARS)[number];

export interface YearTierData {
  year: number;
  tier1: number;
  tier2: number;
  tier3: number;
  tier4: number;
  total: number;
}

export interface YearTypeData {
  year: number;
  fraud: number;
  waste: number;
  combined: number;
}

/**
 * Returns the per-year weight for distributing a multi-year entry.
 * For a single-year entry, weight = 1.
 * For a multi-year entry spanning N chart years, each year gets 1/N.
 */
function getYearWeight(entry: EvidenceEntry, year: number): number {
  const start = entry.fiscalYearStart ?? 0;
  const end = entry.fiscalYearEnd ?? start;

  // Determine which chart years this entry covers
  const coveredYears = CHART_YEARS.filter(y => y >= start && y <= end);
  if (coveredYears.length === 0) return 0;
  if (!coveredYears.includes(year as ChartYear)) return 0;

  return 1 / coveredYears.length;
}

/**
 * Filter entries to those relevant for the time series:
 * - Must have amountBest
 * - Must have fiscalYearStart within or overlapping CHART_YEARS range
 * - Must NOT be cumulative period type
 */
function getRelevantEntries(
  entries: EvidenceEntry[],
  typeFilter: 'fraud' | 'waste' | 'combined' = 'combined'
): EvidenceEntry[] {
  return entries.filter(e => {
    if (e.amountBest === null) return false;
    if (e.periodType === 'cumulative') return false;

    const start = e.fiscalYearStart ?? 0;
    const end = e.fiscalYearEnd ?? start;

    // Must overlap with our chart year range
    if (end < CHART_YEARS[0] || start > CHART_YEARS[CHART_YEARS.length - 1]) return false;

    if (typeFilter !== 'combined' && e.type !== typeFilter) return false;

    return true;
  });
}

/**
 * Build per-year, per-tier data for the Confidence Explorer stacked area chart.
 * typeFilter: 'fraud' | 'waste' | 'combined'
 */
export function buildTierTimeSeriesData(
  entries: EvidenceEntry[],
  typeFilter: 'fraud' | 'waste' | 'combined' = 'combined'
): YearTierData[] {
  const relevant = getRelevantEntries(entries, typeFilter);

  return CHART_YEARS.map(year => {
    let tier1 = 0;
    let tier2 = 0;
    let tier3 = 0;
    let tier4 = 0;

    relevant.forEach(e => {
      const weight = getYearWeight(e, year);
      if (weight === 0) return;

      const amount = (e.amountBest ?? 0) * weight;
      const tier = e.certaintyTier ?? 4;

      if (tier === 1) tier1 += amount;
      else if (tier === 2) tier2 += amount;
      else if (tier === 3) tier3 += amount;
      else tier4 += amount;
    });

    return {
      year,
      tier1,
      tier2,
      tier3,
      tier4,
      total: tier1 + tier2 + tier3 + tier4,
    };
  });
}

/**
 * Build per-year fraud/waste/combined totals for the Time Series chart.
 */
export function buildTypeTimeSeriesData(entries: EvidenceEntry[]): YearTypeData[] {
  const fraudEntries = getRelevantEntries(entries, 'fraud');
  const wasteEntries = getRelevantEntries(entries, 'waste');

  return CHART_YEARS.map(year => {
    let fraud = 0;
    let waste = 0;

    fraudEntries.forEach(e => {
      const weight = getYearWeight(e, year);
      fraud += (e.amountBest ?? 0) * weight;
    });

    wasteEntries.forEach(e => {
      const weight = getYearWeight(e, year);
      waste += (e.amountBest ?? 0) * weight;
    });

    return {
      year,
      fraud,
      waste,
      combined: fraud + waste,
    };
  });
}

/** Federal budget by year (approximate, in dollars) */
export const FEDERAL_BUDGET: Record<number, number> = {
  2018: 4.1e12,
  2019: 4.4e12,
  2020: 6.6e12,
  2021: 6.8e12,
  2022: 6.3e12,
  2023: 6.1e12,
  2024: 6.8e12,
  2025: 7.0e12,
};
