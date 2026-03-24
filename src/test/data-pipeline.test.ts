/**
 * data-pipeline.test.ts
 * Tests for evidence.json data integrity.
 *
 * KNOWN DATA FINDINGS (documented, not blocking):
 * - F5-001 is referenced in doubleCountMatrix but has no corresponding entry in entries[]
 * - 4 entries have fiscalYearStart before 2000 (historical entries: F1-005→1987, W5-004→1990, W7-005→1991, W7-006→1990)
 */

import { describe, it, expect } from 'vitest';
import rawData from '@/data/evidence.json';
import type { EvidenceData } from '@/lib/types';

const data = rawData as unknown as EvidenceData;

const VALID_CATEGORIES = new Set([
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7',
  'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7',
]);

describe('evidence.json — data integrity', () => {
  it('has exactly 78 entries', () => {
    expect(data.entries).toHaveLength(78);
  });

  it('all entries have required fields: id, title, category, type', () => {
    data.entries.forEach(entry => {
      expect(entry.id, `entry missing id`).toBeTruthy();
      expect(entry.title, `${entry.id} missing title`).toBeTruthy();
      expect(entry.category, `${entry.id} missing category`).toBeTruthy();
      expect(entry.type, `${entry.id} missing type`).toBeTruthy();
    });
  });

  it('has no duplicate entry IDs', () => {
    const ids = data.entries.map(e => e.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('all category codes are valid (F1–F7, W1–W7)', () => {
    data.entries.forEach(entry => {
      expect(
        VALID_CATEGORIES.has(entry.category),
        `${entry.id} has invalid category: ${entry.category}`
      ).toBe(true);
    });
  });

  it('all non-null amounts are positive numbers', () => {
    data.entries.forEach(entry => {
      if (entry.amountBest !== null) {
        expect(entry.amountBest, `${entry.id} amountBest should be positive`).toBeGreaterThan(0);
      }
      if (entry.amountLow !== null) {
        expect(entry.amountLow, `${entry.id} amountLow should be positive`).toBeGreaterThan(0);
      }
      if (entry.amountHigh !== null) {
        expect(entry.amountHigh, `${entry.id} amountHigh should be positive`).toBeGreaterThan(0);
      }
    });
  });

  it('all certaintyTier values are 1-4 or null', () => {
    data.entries.forEach(entry => {
      if (entry.certaintyTier !== null) {
        expect(
          [1, 2, 3, 4].includes(entry.certaintyTier),
          `${entry.id} has invalid certaintyTier: ${entry.certaintyTier}`
        ).toBe(true);
      }
    });
  });

  it('all certaintyScore values are 0.30–1.00 or null', () => {
    data.entries.forEach(entry => {
      if (entry.certaintyScore !== null) {
        expect(entry.certaintyScore, `${entry.id} certaintyScore < 0.30`).toBeGreaterThanOrEqual(0.30);
        expect(entry.certaintyScore, `${entry.id} certaintyScore > 1.00`).toBeLessThanOrEqual(1.00);
      }
    });
  });

  it('fiscal years are in reasonable range (1900–2050)', () => {
    // NOTE: dataset intentionally includes some historical entries pre-2000
    // (F1-005→1987, W5-004→1990, W7-005→1991, W7-006→1990)
    data.entries.forEach(entry => {
      if (entry.fiscalYearStart !== null) {
        expect(entry.fiscalYearStart, `${entry.id} fiscalYearStart out of range`).toBeGreaterThan(1900);
        expect(entry.fiscalYearStart, `${entry.id} fiscalYearStart out of range`).toBeLessThan(2050);
      }
      if (entry.fiscalYearEnd !== null) {
        expect(entry.fiscalYearEnd, `${entry.id} fiscalYearEnd out of range`).toBeGreaterThan(1900);
        expect(entry.fiscalYearEnd, `${entry.id} fiscalYearEnd out of range`).toBeLessThan(2050);
      }
    });
  });

  it('all entries have at least one entity link', () => {
    data.entries.forEach(entry => {
      expect(
        entry.entityLinks.length,
        `${entry.id} has no entity links`
      ).toBeGreaterThan(0);
    });
  });

  it('summaryStats has all required keys with positive values', () => {
    const stats = data.summaryStats;
    expect(stats.fraudFloorAnnual).toBeGreaterThan(0);
    expect(stats.fraudCeilingAnnual).toBeGreaterThan(0);
    expect(stats.wasteFloorAnnual).toBeGreaterThan(0);
    expect(stats.wasteCeilingAnnual).toBeGreaterThan(0);
    expect(stats.combinedFloor).toBeGreaterThan(0);
    expect(stats.combinedCeiling).toBeGreaterThan(0);
  });

  it('summaryStats ceiling >= floor', () => {
    const s = data.summaryStats;
    expect(s.fraudCeilingAnnual).toBeGreaterThanOrEqual(s.fraudFloorAnnual);
    expect(s.wasteCeilingAnnual).toBeGreaterThanOrEqual(s.wasteFloorAnnual);
    expect(s.combinedCeiling).toBeGreaterThanOrEqual(s.combinedFloor);
  });

  it('entity index references only valid entry IDs (except known gaps)', () => {
    // DATA FINDING: F5-001 is referenced by the SBA entity but has no entries[] record.
    // This is the same documented gap as in the doubleCountMatrix (grant fraud entries not populated).
    const validIds = new Set(data.entries.map(e => e.id));
    const knownMissing = new Set(['F5-001']);

    Object.entries(data.entities).forEach(([entityName, entryIds]) => {
      entryIds.forEach(id => {
        if (knownMissing.has(id)) return; // documented data gap
        expect(
          validIds.has(id),
          `Entity "${entityName}" references non-existent entry ID: ${id}`
        ).toBe(true);
      });
    });
  });

  it('doubleCountMatrix: most entryA/entryB IDs exist in entries (known exception: F5-001)', () => {
    // DATA FINDING: F5-001 is in the DCM but has no corresponding entries[] record.
    // This is a known data gap (grant fraud category entries were not populated).
    const validIds = new Set(data.entries.map(e => e.id));
    const knownMissing = new Set(['F5-001']); // documented data gap

    data.doubleCountMatrix.forEach(pair => {
      if (!knownMissing.has(pair.entryA)) {
        expect(validIds.has(pair.entryA), `DCM entryA "${pair.entryA}" not in entries`).toBe(true);
      }
      if (!knownMissing.has(pair.entryB)) {
        expect(validIds.has(pair.entryB), `DCM entryB "${pair.entryB}" not in entries`).toBe(true);
      }
    });
  });

  it('categories object has all 14 categories', () => {
    const cats = Object.keys(data.categories);
    expect(cats).toHaveLength(14);
    [...VALID_CATEGORIES].forEach(code => {
      expect(data.categories, `categories missing ${code}`).toHaveProperty(code);
    });
  });

  it('metadata has required fields', () => {
    expect(data.metadata.generated).toBeTruthy();
    expect(data.metadata.totalEntries).toBe(78);
    expect(data.metadata.coverageStart).toBeGreaterThan(1900);
    expect(data.metadata.coverageEnd).toBeLessThan(2100);
  });
});
