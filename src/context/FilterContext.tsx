'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { YEAR_RANGE } from '@/lib/constants';

export type DataType = 'fraud' | 'waste' | 'both';
export type PercentMode = 'dollars' | 'entry_year' | 'reference_year';

export interface FilterState {
  minTier: number;          // minimum certainty tier (1–4)
  maxTier: number;          // maximum certainty tier (1–4)
  yearStart: number;
  yearEnd: number;
  dataType: DataType;
  searchQuery: string;
  percentMode: PercentMode;  // 'dollars' | 'entry_year' | 'reference_year'
  referenceYear: number;     // FY2003–2025, used when percentMode === 'reference_year'
  showStateData: boolean;    // include state-level entries (coming soon)
  /** @deprecated Use percentMode !== 'dollars' instead */
  showAsPercent: boolean;
}

interface FilterContextValue {
  filters: FilterState;
  setTierRange: (min: number, max: number) => void;
  setMaxTier: (tier: number) => void;           // kept for backward compat
  setYearRange: (start: number, end: number) => void;
  setDataType: (type: DataType) => void;
  setSearchQuery: (q: string) => void;
  setPercentMode: (mode: PercentMode) => void;
  setReferenceYear: (year: number) => void;
  /** @deprecated Use setPercentMode instead */
  setShowAsPercent: (v: boolean) => void;
  setShowStateData: (v: boolean) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  minTier: 1,
  maxTier: 4,
  yearStart: YEAR_RANGE.min,
  yearEnd: YEAR_RANGE.max,
  dataType: 'both',
  searchQuery: '',
  percentMode: 'dollars',
  referenceYear: 2025,
  showStateData: false,
  get showAsPercent() { return this.percentMode !== 'dollars'; },
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const setTierRange = (min: number, max: number) =>
    setFilters(prev => ({ ...prev, minTier: min, maxTier: max }));

  // Backward compat: setMaxTier keeps minTier unchanged
  const setMaxTier = (tier: number) =>
    setFilters(prev => ({ ...prev, maxTier: tier }));

  const setYearRange = (start: number, end: number) =>
    setFilters(prev => ({ ...prev, yearStart: start, yearEnd: end }));

  const setDataType = (type: DataType) =>
    setFilters(prev => ({ ...prev, dataType: type }));

  const setSearchQuery = (q: string) =>
    setFilters(prev => ({ ...prev, searchQuery: q }));

  const setPercentMode = (mode: PercentMode) =>
    setFilters(prev => ({
      ...prev,
      percentMode: mode,
      showAsPercent: mode !== 'dollars',
    }));

  const setReferenceYear = (year: number) =>
    setFilters(prev => ({ ...prev, referenceYear: year }));

  // Backward compat: map old boolean toggle to percentMode
  const setShowAsPercent = (v: boolean) =>
    setFilters(prev => ({
      ...prev,
      percentMode: v ? 'entry_year' : 'dollars',
      showAsPercent: v,
    }));

  const setShowStateData = (v: boolean) =>
    setFilters(prev => ({ ...prev, showStateData: v }));

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setTierRange,
        setMaxTier,
        setYearRange,
        setDataType,
        setSearchQuery,
        setPercentMode,
        setReferenceYear,
        setShowAsPercent,
        setShowStateData,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters(): FilterContextValue {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used within FilterProvider');
  return ctx;
}
