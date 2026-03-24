/**
 * time-series-utils.test.ts
 * Tests for src/lib/timeSeriesUtils.ts
 *
 * Covers:
 * - Single year entries assigned correctly to their year
 * - Multi-year entries distributed (weighted) across chart years
 * - Cumulative entries excluded from annual sums
 * - Null amount entries excluded
 * - Tier breakdown sums match total for each year
 */

import { describe, it, expect } from 'vitest';
import {
  buildTierTimeSeriesData,
  buildTypeTimeSeriesData,
  CHART_YEARS,
} from '@/lib/timeSeriesUtils';
import type { EvidenceEntry } from '@/lib/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeEntry(overrides: Partial<EvidenceEntry>): EvidenceEntry {
  return {
    id: 'TEST-001',
    title: 'Test Entry',
    category: 'F1',
    categoryLabel: 'Healthcare Fraud',
    type: 'fraud',
    amountBest: 1_000_000_000, // $1B
    amountLow: null,
    amountHigh: null,
    fiscalYearStart: 2022,
    fiscalYearEnd: 2022,
    periodType: 'single_year',
    certaintyTier: 1,
    certaintyScore: 0.9,
    jurisdiction: 'federal',
    sourceName: 'Test Source',
    sourceUrl: 'https://example.com',
    sourceType: 'agency_data',
    sourceMethodology: 'test',
    sourceOrientation: 'nonpartisan',
    overlapNotes: '',
    entityLinks: ['Test Agency'],
    safeToSum: true,
    ...overrides,
  };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('buildTierTimeSeriesData', () => {
  it('assigns single-year entry to correct year only', () => {
    const entry = makeEntry({ fiscalYearStart: 2022, fiscalYearEnd: 2022, certaintyTier: 1, amountBest: 1e9 });
    const result = buildTierTimeSeriesData([entry]);

    const row2022 = result.find(r => r.year === 2022);
    expect(row2022).toBeTruthy();
    expect(row2022!.tier1).toBeCloseTo(1e9, 0);

    // Other years should have 0 for this tier
    result
      .filter(r => r.year !== 2022)
      .forEach(r => expect(r.tier1).toBe(0));
  });

  it('distributes multi-year entry evenly across chart years', () => {
    // Entry spans 2020-2022 (3 chart years) with $3B → each year gets $1B
    const entry = makeEntry({
      fiscalYearStart: 2020,
      fiscalYearEnd: 2022,
      periodType: 'multi_year',
      certaintyTier: 2,
      amountBest: 3e9,
    });
    const result = buildTierTimeSeriesData([entry]);

    const row2020 = result.find(r => r.year === 2020);
    const row2021 = result.find(r => r.year === 2021);
    const row2022 = result.find(r => r.year === 2022);

    expect(row2020!.tier2).toBeCloseTo(1e9, 0);
    expect(row2021!.tier2).toBeCloseTo(1e9, 0);
    expect(row2022!.tier2).toBeCloseTo(1e9, 0);
  });

  it('excludes cumulative entries', () => {
    const cumEntry = makeEntry({
      fiscalYearStart: 2020,
      fiscalYearEnd: 2024,
      periodType: 'cumulative',
      amountBest: 100e9,
    });
    const result = buildTierTimeSeriesData([cumEntry]);
    // All years should be 0
    result.forEach(r => {
      expect(r.total).toBe(0);
    });
  });

  it('excludes null amount entries', () => {
    const nullEntry = makeEntry({ amountBest: null, fiscalYearStart: 2023, fiscalYearEnd: 2023 });
    const result = buildTierTimeSeriesData([nullEntry]);
    result.forEach(r => {
      expect(r.total).toBe(0);
    });
  });

  it('tier breakdown sums match total for each year', () => {
    const entries = [
      makeEntry({ id: 'T1', certaintyTier: 1, amountBest: 1e9, fiscalYearStart: 2023, fiscalYearEnd: 2023 }),
      makeEntry({ id: 'T2', certaintyTier: 2, amountBest: 2e9, fiscalYearStart: 2023, fiscalYearEnd: 2023, type: 'waste', category: 'W1' }),
      makeEntry({ id: 'T3', certaintyTier: 3, amountBest: 3e9, fiscalYearStart: 2023, fiscalYearEnd: 2023 }),
      makeEntry({ id: 'T4', certaintyTier: 4, amountBest: 4e9, fiscalYearStart: 2024, fiscalYearEnd: 2024 }),
    ];
    const result = buildTierTimeSeriesData(entries);
    result.forEach(r => {
      const sumOfTiers = r.tier1 + r.tier2 + r.tier3 + r.tier4;
      expect(sumOfTiers).toBeCloseTo(r.total, 1);
    });
  });

  it('excludes entries outside CHART_YEARS range', () => {
    const oldEntry = makeEntry({ fiscalYearStart: 1990, fiscalYearEnd: 1990, amountBest: 999e9 });
    const result = buildTierTimeSeriesData([oldEntry]);
    result.forEach(r => {
      expect(r.total).toBe(0);
    });
  });

  it('returns data for all CHART_YEARS', () => {
    const result = buildTierTimeSeriesData([]);
    expect(result).toHaveLength(CHART_YEARS.length);
    result.forEach((r, i) => {
      expect(r.year).toBe(CHART_YEARS[i]);
    });
  });

  it('filters by typeFilter=fraud', () => {
    const fraudEntry = makeEntry({ id: 'F1', type: 'fraud', amountBest: 5e9, certaintyTier: 1, fiscalYearStart: 2022, fiscalYearEnd: 2022 });
    const wasteEntry = makeEntry({ id: 'W1', type: 'waste', amountBest: 3e9, certaintyTier: 1, fiscalYearStart: 2022, fiscalYearEnd: 2022, category: 'W1' });
    const result = buildTierTimeSeriesData([fraudEntry, wasteEntry], 'fraud');
    const row2022 = result.find(r => r.year === 2022)!;
    expect(row2022.tier1).toBeCloseTo(5e9, 0);
  });

  it('filters by typeFilter=waste', () => {
    const fraudEntry = makeEntry({ id: 'F1', type: 'fraud', amountBest: 5e9, certaintyTier: 1, fiscalYearStart: 2022, fiscalYearEnd: 2022 });
    const wasteEntry = makeEntry({ id: 'W1', type: 'waste', amountBest: 3e9, certaintyTier: 1, fiscalYearStart: 2022, fiscalYearEnd: 2022, category: 'W1' });
    const result = buildTierTimeSeriesData([fraudEntry, wasteEntry], 'waste');
    const row2022 = result.find(r => r.year === 2022)!;
    expect(row2022.tier1).toBeCloseTo(3e9, 0);
  });
});

describe('buildTypeTimeSeriesData', () => {
  it('separates fraud and waste correctly', () => {
    const fraudEntry = makeEntry({ id: 'F1', type: 'fraud', amountBest: 10e9, fiscalYearStart: 2021, fiscalYearEnd: 2021 });
    const wasteEntry = makeEntry({ id: 'W1', type: 'waste', amountBest: 20e9, fiscalYearStart: 2021, fiscalYearEnd: 2021, category: 'W1' });
    const result = buildTypeTimeSeriesData([fraudEntry, wasteEntry]);

    const row2021 = result.find(r => r.year === 2021)!;
    expect(row2021.fraud).toBeCloseTo(10e9, 0);
    expect(row2021.waste).toBeCloseTo(20e9, 0);
    expect(row2021.combined).toBeCloseTo(30e9, 0);
  });

  it('combined = fraud + waste for each year', () => {
    const entries = [
      makeEntry({ id: 'F1', type: 'fraud', amountBest: 5e9, fiscalYearStart: 2020, fiscalYearEnd: 2020 }),
      makeEntry({ id: 'W1', type: 'waste', amountBest: 8e9, fiscalYearStart: 2020, fiscalYearEnd: 2020, category: 'W1' }),
    ];
    const result = buildTypeTimeSeriesData(entries);
    result.forEach(r => {
      expect(r.combined).toBeCloseTo(r.fraud + r.waste, 1);
    });
  });

  it('excludes cumulative entries', () => {
    const cumEntry = makeEntry({
      type: 'fraud',
      periodType: 'cumulative',
      amountBest: 500e9,
      fiscalYearStart: 2010,
      fiscalYearEnd: 2024,
    });
    const result = buildTypeTimeSeriesData([cumEntry]);
    result.forEach(r => {
      expect(r.fraud).toBe(0);
    });
  });

  it('returns data for all CHART_YEARS', () => {
    const result = buildTypeTimeSeriesData([]);
    expect(result).toHaveLength(CHART_YEARS.length);
  });
});

describe('CHART_YEARS', () => {
  it('contains expected years from 2018 to 2025', () => {
    expect(CHART_YEARS).toContain(2018);
    expect(CHART_YEARS).toContain(2025);
    expect(CHART_YEARS.length).toBe(8);
  });
});
