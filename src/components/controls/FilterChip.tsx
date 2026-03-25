'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useFilters } from '@/context/FilterContext';
import { FilterSheet } from './FilterSheet';
import { YEAR_RANGE } from '@/lib/constants';

/**
 * FilterChip — floating trigger button for the mobile filter bottom sheet.
 * Counts active (non-default) filters and shows the count in the chip label.
 */
export function FilterChip() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { filters } = useFilters();

  // Count non-default filter settings
  const activeCount = [
    filters.minTier !== 1 || filters.maxTier !== 4,
    filters.yearStart !== YEAR_RANGE.min || filters.yearEnd !== YEAR_RANGE.max,
    filters.dataType !== 'both',
    filters.searchQuery !== '',
    filters.showAsPercent,
    filters.showStateData,
  ].filter(Boolean).length;

  return (
    <>
      <button
        onClick={() => setSheetOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-foreground shadow-lg hover:bg-black/80 transition-colors"
        aria-label={`Open filters${activeCount > 0 ? `, ${activeCount} active` : ''}`}
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        {activeCount > 0 ? `Filters (${activeCount})` : 'Filters'}
      </button>

      <FilterSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  );
}
