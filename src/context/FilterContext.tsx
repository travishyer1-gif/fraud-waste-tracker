'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { YEAR_RANGE } from '@/lib/constants';

export type DataType = 'fraud' | 'waste' | 'both';

export interface FilterState {
  maxTier: number;          // 1 = Tier 1 only, 4 = all tiers
  yearStart: number;
  yearEnd: number;
  dataType: DataType;
  searchQuery: string;
}

interface FilterContextValue {
  filters: FilterState;
  setMaxTier: (tier: number) => void;
  setYearRange: (start: number, end: number) => void;
  setDataType: (type: DataType) => void;
  setSearchQuery: (q: string) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  maxTier: 4,
  yearStart: YEAR_RANGE.min,
  yearEnd: YEAR_RANGE.max,
  dataType: 'both',
  searchQuery: '',
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const setMaxTier = (tier: number) =>
    setFilters(prev => ({ ...prev, maxTier: tier }));

  const setYearRange = (start: number, end: number) =>
    setFilters(prev => ({ ...prev, yearStart: start, yearEnd: end }));

  const setDataType = (type: DataType) =>
    setFilters(prev => ({ ...prev, dataType: type }));

  const setSearchQuery = (q: string) =>
    setFilters(prev => ({ ...prev, searchQuery: q }));

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <FilterContext.Provider
      value={{ filters, setMaxTier, setYearRange, setDataType, setSearchQuery, resetFilters }}
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
