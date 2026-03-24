'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { YEAR_RANGE } from '@/lib/constants';

export type DataType = 'fraud' | 'waste' | 'both';

export interface FilterState {
  minTier: number;          // minimum certainty tier (1–4)
  maxTier: number;          // maximum certainty tier (1–4)
  yearStart: number;
  yearEnd: number;
  dataType: DataType;
  searchQuery: string;
  showAsPercent: boolean;   // show dollar amounts as % of federal budget
  showStateData: boolean;   // include state-level entries (coming soon)
}

interface FilterContextValue {
  filters: FilterState;
  setTierRange: (min: number, max: number) => void;
  setMaxTier: (tier: number) => void;           // kept for backward compat
  setYearRange: (start: number, end: number) => void;
  setDataType: (type: DataType) => void;
  setSearchQuery: (q: string) => void;
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
  showAsPercent: false,
  showStateData: false,
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

  const setShowAsPercent = (v: boolean) =>
    setFilters(prev => ({ ...prev, showAsPercent: v }));

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
