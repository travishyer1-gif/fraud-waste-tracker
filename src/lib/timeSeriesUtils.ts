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
  /** Number of actual evidence entries contributing to this year's total */
  dataDensity: number;
}

/**
 * COVID-era weight distribution for multi-year entries spanning 2020–2022.
 * Reflects known front-loading of emergency spending in peak pandemic years.
 */
const COVID_YEAR_WEIGHTS: Partial<Record<number, number>> = {
  2020: 0.50,
  2021: 0.35,
  2022: 0.15,
};

/**
 * Returns the per-year weight for distributing a multi-year entry.
 * - Single-year entries → 1
 * - Entries spanning both 2020 and 2021 → COVID-weighted distribution
 * - All other multi-year entries → even split
 */
function getYearWeight(entry: EvidenceEntry, year: number): number {
  const start = entry.fiscalYearStart ?? 0;
  const end = entry.fiscalYearEnd ?? start;

  const coveredYears = CHART_YEARS.filter(y => y >= start && y <= end);
  if (coveredYears.length === 0) return 0;
  if (!coveredYears.includes(year as ChartYear)) return 0;
  if (coveredYears.length === 1) return 1;

  // Apply COVID-era peak weighting when entry spans 2020 + 2021
  const has2020 = coveredYears.includes(2020 as ChartYear);
  const has2021 = coveredYears.includes(2021 as ChartYear);

  if (has2020 && has2021) {
    const covidCoveredYears = coveredYears.filter(y => COVID_YEAR_WEIGHTS[y] !== undefined);
    const nonCovidCoveredYears = coveredYears.filter(y => COVID_YEAR_WEIGHTS[y] === undefined);
    const isCovidYear = COVID_YEAR_WEIGHTS[year] !== undefined;

    if (isCovidYear) {
      const totalCovidWeight = covidCoveredYears.reduce(
        (sum, y) => sum + (COVID_YEAR_WEIGHTS[y] ?? 0),
        0,
      );
      // Allocate 85% of total weight to COVID years, 15% to non-COVID years (if any)
      const covidShare = nonCovidCoveredYears.length > 0 ? 0.85 : 1.0;
      return ((COVID_YEAR_WEIGHTS[year] ?? 0) / totalCovidWeight) * covidShare;
    } else {
      if (nonCovidCoveredYears.length === 0) return 0;
      return 0.15 / nonCovidCoveredYears.length;
    }
  }

  return 1 / coveredYears.length;
}

/**
 * Filter entries to those relevant for the time series:
 * - Must have amountBest
 * - Must overlap with CHART_YEARS range
 * - Must NOT be cumulative period type
 */
function getRelevantEntries(
  entries: EvidenceEntry[],
  typeFilter: 'fraud' | 'waste' | 'combined' = 'combined',
): EvidenceEntry[] {
  return entries.filter(e => {
    if (e.amountBest === null) return false;
    if (e.periodType === 'cumulative') return false;

    const start = e.fiscalYearStart ?? 0;
    const end = e.fiscalYearEnd ?? start;

    if (end < CHART_YEARS[0] || start > CHART_YEARS[CHART_YEARS.length - 1]) return false;

    if (typeFilter !== 'combined' && e.type !== typeFilter) return false;

    return true;
  });
}

/**
 * Build per-year, per-tier data for the Confidence Explorer stacked area chart.
 */
export function buildTierTimeSeriesData(
  entries: EvidenceEntry[],
  typeFilter: 'fraud' | 'waste' | 'combined' = 'combined',
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
 * Includes a dataDensity count reflecting how many evidence entries back each year.
 */
export function buildTypeTimeSeriesData(entries: EvidenceEntry[]): YearTypeData[] {
  const fraudEntries = getRelevantEntries(entries, 'fraud');
  const wasteEntries = getRelevantEntries(entries, 'waste');

  return CHART_YEARS.map(year => {
    let fraud = 0;
    let waste = 0;
    let dataDensity = 0;

    fraudEntries.forEach(e => {
      const weight = getYearWeight(e, year);
      if (weight > 0) {
        fraud += (e.amountBest ?? 0) * weight;
        dataDensity++;
      }
    });

    wasteEntries.forEach(e => {
      const weight = getYearWeight(e, year);
      if (weight > 0) {
        waste += (e.amountBest ?? 0) * weight;
        dataDensity++;
      }
    });

    return {
      year,
      fraud,
      waste,
      combined: fraud + waste,
      dataDensity,
    };
  });
}

/**
 * Federal outlays by fiscal year (approximate, OMB/CBO).
 * Used for % of budget view and counterfactual scaling.
 */
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
