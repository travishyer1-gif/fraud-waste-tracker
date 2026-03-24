/**
 * filter-logic.test.ts
 * Tests the core filter logic extracted from useEvidenceData.
 *
 * The filter function is extracted here directly for unit testing
 * (avoids the React hooks / Next.js context dependency).
 */

import { describe, it, expect } from 'vitest';
import rawData from '@/data/evidence.json';
import type { EvidenceData, EvidenceEntry } from '@/lib/types';
import type { FilterState } from '@/context/FilterContext';

const data = rawData as unknown as EvidenceData;

// ─── Replicated filter logic from useEvidenceData ──────────────────────────────
function applyFilters(entries: EvidenceEntry[], filters: FilterState): EvidenceEntry[] {
  return entries.filter(entry => {
    // Tier filter
    if (entry.certaintyTier !== null && entry.certaintyTier > filters.maxTier) {
      return false;
    }

    // Type filter
    if (filters.dataType !== 'both' && entry.type !== filters.dataType) {
      return false;
    }

    // Year range filter
    const yearStart = entry.fiscalYearStart;
    const yearEnd = entry.fiscalYearEnd ?? entry.fiscalYearStart;
    if (yearStart !== null && yearEnd !== null) {
      if (yearEnd < filters.yearStart || yearStart > filters.yearEnd) {
        return false;
      }
    }

    // Search filter
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const haystack = [
        entry.title,
        entry.category,
        entry.categoryLabel,
        entry.sourceName,
        ...entry.entityLinks,
      ].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

const defaultFilters: FilterState = {
  maxTier: 4,
  yearStart: 2003,
  yearEnd: 2025,
  dataType: 'both',
  searchQuery: '',
};

describe('filter logic', () => {
  describe('tier filter', () => {
    it('maxTier=1 shows only Tier 1 entries (and null-tier entries)', () => {
      const result = applyFilters(data.entries, { ...defaultFilters, maxTier: 1 });
      result.forEach(e => {
        if (e.certaintyTier !== null) {
          expect(e.certaintyTier).toBe(1);
        }
      });
    });

    it('maxTier=1 returns only tier-1 entries (dataset has 55 tier-1 entries, none null-tier)', () => {
      const result = applyFilters(data.entries, { ...defaultFilters, maxTier: 1 });
      // All results must be tier 1 (no null-tier entries in this dataset)
      result.forEach(e => expect(e.certaintyTier).toBe(1));
      expect(result.length).toBe(55);
    });

    it('maxTier=4 shows all entries', () => {
      const result = applyFilters(data.entries, { ...defaultFilters, maxTier: 4 });
      expect(result.length).toBe(data.entries.length);
    });

    it('maxTier=2 excludes tier 3 and 4 entries', () => {
      const result = applyFilters(data.entries, { ...defaultFilters, maxTier: 2 });
      result.forEach(e => {
        if (e.certaintyTier !== null) {
          expect(e.certaintyTier).toBeLessThanOrEqual(2);
        }
      });
    });
  });

  describe('year range filter', () => {
    it('yearStart=2024, yearEnd=2025 returns only overlapping entries', () => {
      const result = applyFilters(data.entries, {
        ...defaultFilters,
        yearStart: 2024,
        yearEnd: 2025,
      });
      expect(result.length).toBe(43);
      result.forEach(e => {
        if (e.fiscalYearStart !== null) {
          const end = e.fiscalYearEnd ?? e.fiscalYearStart;
          // The entry must overlap [2024, 2025]
          expect(end).toBeGreaterThanOrEqual(2024);
          expect(e.fiscalYearStart).toBeLessThanOrEqual(2025);
        }
      });
    });

    it('yearStart=2024, yearEnd=2024 returns only entries touching 2024', () => {
      const result = applyFilters(data.entries, {
        ...defaultFilters,
        yearStart: 2024,
        yearEnd: 2024,
      });
      expect(result.length).toBe(30);
    });

    it('multi-year entries spanning a range are included when range overlaps', () => {
      // Find a multi-year entry in the dataset
      const multiYear = data.entries.find(
        e => e.fiscalYearStart !== null && e.fiscalYearEnd !== null && e.fiscalYearEnd > e.fiscalYearStart
      );
      expect(multiYear).toBeTruthy();
      if (!multiYear) return;

      const start = multiYear.fiscalYearStart!;
      const end = multiYear.fiscalYearEnd!;

      // Filter with a range that partially overlaps the start of the multi-year entry
      const resultOverlapStart = applyFilters(data.entries, {
        ...defaultFilters,
        yearStart: start,
        yearEnd: start,
      });
      expect(resultOverlapStart.some(e => e.id === multiYear.id)).toBe(true);

      // Filter with a range that partially overlaps the end
      const resultOverlapEnd = applyFilters(data.entries, {
        ...defaultFilters,
        yearStart: end,
        yearEnd: end,
      });
      expect(resultOverlapEnd.some(e => e.id === multiYear.id)).toBe(true);

      // Filter that misses entirely before start
      const resultBefore = applyFilters(data.entries, {
        ...defaultFilters,
        yearStart: start - 2,
        yearEnd: start - 1,
      });
      expect(resultBefore.some(e => e.id === multiYear.id)).toBe(false);
    });
  });

  describe('type filter', () => {
    it("type='fraud' shows only fraud entries", () => {
      const result = applyFilters(data.entries, { ...defaultFilters, dataType: 'fraud' });
      result.forEach(e => expect(e.type).toBe('fraud'));
      expect(result.length).toBe(34);
    });

    it("type='waste' shows only waste entries", () => {
      const result = applyFilters(data.entries, { ...defaultFilters, dataType: 'waste' });
      result.forEach(e => expect(e.type).toBe('waste'));
      expect(result.length).toBe(44);
    });

    it("type='both' shows all entries", () => {
      const result = applyFilters(data.entries, { ...defaultFilters, dataType: 'both' });
      expect(result.length).toBe(data.entries.length);
    });
  });

  describe('search filter', () => {
    it('searching "Medicare" returns relevant entries', () => {
      const result = applyFilters(data.entries, {
        ...defaultFilters,
        searchQuery: 'Medicare',
      });
      expect(result.length).toBeGreaterThan(0);
      // All results should contain "medicare" in their searchable fields
      result.forEach(e => {
        const haystack = [
          e.title, e.category, e.categoryLabel, e.sourceName, ...e.entityLinks,
        ].join(' ').toLowerCase();
        expect(haystack).toContain('medicare');
      });
    });

    it('searching "xyz123" returns empty results', () => {
      const result = applyFilters(data.entries, {
        ...defaultFilters,
        searchQuery: 'xyz123',
      });
      expect(result).toHaveLength(0);
    });

    it('search is case-insensitive', () => {
      const upper = applyFilters(data.entries, { ...defaultFilters, searchQuery: 'MEDICARE' });
      const lower = applyFilters(data.entries, { ...defaultFilters, searchQuery: 'medicare' });
      expect(upper.map(e => e.id)).toEqual(lower.map(e => e.id));
    });
  });

  describe('combined filters', () => {
    it('tier 1 + fraud + 2024 returns correct subset', () => {
      const result = applyFilters(data.entries, {
        maxTier: 1,
        dataType: 'fraud',
        yearStart: 2024,
        yearEnd: 2024,
        searchQuery: '',
      });
      expect(result.length).toBe(5);
      result.forEach(e => {
        expect(e.certaintyTier).toBe(1);
        expect(e.type).toBe('fraud');
        if (e.fiscalYearStart !== null) {
          const end = e.fiscalYearEnd ?? e.fiscalYearStart;
          expect(end).toBeGreaterThanOrEqual(2024);
          expect(e.fiscalYearStart).toBeLessThanOrEqual(2024);
        }
      });
    });

    it('tier 1 + waste + 2025 returns a non-empty subset', () => {
      const result = applyFilters(data.entries, {
        maxTier: 1,
        dataType: 'waste',
        yearStart: 2025,
        yearEnd: 2025,
        searchQuery: '',
      });
      expect(result.length).toBeGreaterThan(0);
      result.forEach(e => {
        expect(e.certaintyTier).toBe(1);
        expect(e.type).toBe('waste');
      });
    });
  });
});
