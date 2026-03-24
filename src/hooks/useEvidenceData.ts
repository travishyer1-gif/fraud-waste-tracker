'use client';

import { useMemo } from 'react';
import { useFilters } from '@/context/FilterContext';
import type { EvidenceEntry, EvidenceData } from '@/lib/types';
import rawData from '@/data/evidence.json';

const data = rawData as unknown as EvidenceData;

export function useEvidenceData() {
  const { filters } = useFilters();

  const filteredEntries = useMemo<EvidenceEntry[]>(() => {
    return data.entries.filter(entry => {
      // Tier filter (dual range)
      if (
        entry.certaintyTier !== null &&
        (entry.certaintyTier < filters.minTier || entry.certaintyTier > filters.maxTier)
      ) {
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
        // Include entry if it overlaps with filter range at all
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
  }, [filters]);

  return {
    // Raw data
    entries: data.entries as EvidenceEntry[],
    filteredEntries,
    summaryStats: data.summaryStats,
    entities: data.entities,
    categories: data.categories,
    metadata: data.metadata,
    doubleCountMatrix: data.doubleCountMatrix,

    // Derived stats for filtered set
    filteredStats: useMemo(() => {
      const fraudEntries = filteredEntries.filter(e => e.type === 'fraud');
      const wasteEntries = filteredEntries.filter(e => e.type === 'waste');
      const safeToSum = filteredEntries.filter(e => e.safeToSum && e.amountBest !== null);

      return {
        totalFiltered: filteredEntries.length,
        fraudCount: fraudEntries.length,
        wasteCount: wasteEntries.length,
        safeToSumCount: safeToSum.length,
        // Sum of safe-to-sum entries (for display purposes — not authoritative)
        safeToSumTotal: safeToSum.reduce((acc, e) => acc + (e.amountBest ?? 0), 0),
      };
    }, [filteredEntries]),
  };
}
