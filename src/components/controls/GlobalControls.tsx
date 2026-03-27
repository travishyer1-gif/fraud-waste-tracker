'use client';

import { useState, useEffect } from 'react';
import { Search, X, RotateCcw, DollarSign, Percent, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFilters, type DataType, type PercentMode } from '@/context/FilterContext';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TIER_COLORS, YEAR_RANGE, FEDERAL_BUDGET } from '@/lib/constants';

const REFERENCE_YEAR_OPTIONS = Object.keys(FEDERAL_BUDGET)
  .map(Number)
  .sort((a, b) => b - a); // most recent first

function formatBudgetLabel(year: number): string {
  const budget = FEDERAL_BUDGET[year];
  if (!budget) return `FY${year}`;
  const trillions = budget / 1_000_000_000_000;
  return `FY${year} ($${trillions.toFixed(1)}T)`;
}

/** The actual filter controls panel — shared by both desktop collapsible and mobile FilterSheet */
export function GlobalControlsPanel() {
  const {
    filters,
    setTierRange,
    setYearRange,
    setDataType,
    setSearchQuery,
    setPercentMode,
    setReferenceYear,
    resetFilters,
  } = useFilters();

  const [localSearch, setLocalSearch] = useState(filters.searchQuery);

  useEffect(() => {
    setLocalSearch(filters.searchQuery);
  }, [filters.searchQuery]);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    setSearchQuery(value);
  };

  const handleSearchClear = () => {
    setLocalSearch('');
    setSearchQuery('');
  };

  const tierLabel =
    filters.minTier === filters.maxTier
      ? `Tier ${filters.minTier} Only`
      : filters.minTier === 1 && filters.maxTier === 4
        ? 'All Tiers (1–4)'
        : `Tiers ${filters.minTier}–${filters.maxTier}`;

  const percentModes: { value: PercentMode; label: string; icon?: React.ReactNode }[] = [
    { value: 'dollars', label: '$ Amount', icon: <DollarSign className="w-3 h-3" /> },
    { value: 'entry_year', label: '% Entry Year', icon: <Percent className="w-3 h-3" /> },
    { value: 'reference_year', label: '% Ref Year', icon: <Percent className="w-3 h-3" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Row 1: Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={localSearch}
          onChange={e => handleSearchChange(e.target.value)}
          placeholder="Search entries, entities, sources…"
          className="w-full pl-9 pr-8 py-2 text-sm bg-background/60 border border-border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {localSearch && (
          <button
            onClick={handleSearchClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <Separator className="opacity-20" />

      {/* Row 2: Data type toggle */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-16 shrink-0">Show:</span>
        <div className="flex gap-1">
          {(['both', 'fraud', 'waste'] as DataType[]).map(type => (
            <button
              key={type}
              onClick={() => setDataType(type)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                filters.dataType === type
                  ? type === 'fraud'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : type === 'waste'
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-muted/50 text-muted-foreground border border-transparent hover:border-border'
              }`}
            >
              {type === 'both' ? 'Fraud + Waste' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Row 3: Confidence tier dual-range slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Confidence:</span>
          <Badge variant="outline" className="text-xs h-5 px-2">
            {tierLabel}
          </Badge>
        </div>
        <Slider
          min={1}
          max={4}
          step={1}
          value={[filters.minTier, filters.maxTier]}
          onValueChange={([min, max]) => setTierRange(min, max)}
          className="flex-1"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{TIER_COLORS[1].icon} Confirmed</span>
          <span>All Tiers {TIER_COLORS[4].icon}</span>
        </div>
        <div className="flex gap-1 mt-1">
          {([1, 2, 3, 4] as const).map(t => (
            <div
              key={t}
              className={`flex-1 h-1 rounded-full transition-opacity ${
                t >= filters.minTier && t <= filters.maxTier ? 'opacity-100' : 'opacity-20'
              }`}
              style={{ backgroundColor: TIER_COLORS[t].bg }}
            />
          ))}
        </div>
      </div>

      {/* Row 4: Year range */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Year Range:</span>
          <Badge variant="outline" className="text-xs h-5 px-2">
            FY{filters.yearStart}–FY{filters.yearEnd}
          </Badge>
        </div>
        <Slider
          min={YEAR_RANGE.min}
          max={YEAR_RANGE.max}
          step={1}
          value={[filters.yearStart, filters.yearEnd]}
          onValueChange={([start, end]) => setYearRange(start, end)}
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>FY{YEAR_RANGE.min}</span>
          <span>FY{YEAR_RANGE.max}</span>
        </div>
      </div>

      {/* Row 5: Display Amounts — three-state toggle */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Display Amounts:</span>
        </div>
        <div className="flex gap-1 flex-wrap">
          {percentModes.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => setPercentMode(value)}
              className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                filters.percentMode === value
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-muted/50 text-muted-foreground border border-transparent hover:border-border'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Reference year dropdown — shown only when reference_year mode is active */}
        {filters.percentMode === 'reference_year' && (
          <div className="mt-2">
            <Select
              value={String(filters.referenceYear)}
              onValueChange={val => setReferenceYear(Number(val))}
            >
              <SelectTrigger className="h-8 text-xs bg-background/60 border-border">
                <SelectValue placeholder="Select reference year" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {REFERENCE_YEAR_OPTIONS.map(year => (
                  <SelectItem key={year} value={String(year)} className="text-xs">
                    {formatBudgetLabel(year)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Reset */}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}

/**
 * Desktop collapsible filter bar.
 * Collapsed: shows a compact summary strip.
 * Expanded: shows the full GlobalControlsPanel.
 */
export function GlobalControls() {
  const { filters } = useFilters();
  const [isExpanded, setIsExpanded] = useState(false);

  // Build summary text from current filters
  const dataTypeLabel =
    filters.dataType === 'both'
      ? 'Fraud + Waste'
      : filters.dataType.charAt(0).toUpperCase() + filters.dataType.slice(1);

  const tierLabel =
    filters.minTier === 1 && filters.maxTier === 4
      ? 'All Tiers'
      : `Tiers ${filters.minTier}–${filters.maxTier}`;

  const yearLabel = `FY${filters.yearStart}–${filters.yearEnd}`;

  return (
    <div className="glass-card overflow-hidden">
      {/* Collapsed summary strip / toggle header */}
      <button
        onClick={() => setIsExpanded(prev => !prev)}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors"
        aria-expanded={isExpanded}
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <span className="flex-1 text-xs text-muted-foreground">
          Showing:{' '}
          <span className="text-foreground font-medium">{dataTypeLabel}</span>
          {' | '}
          <span className="text-foreground font-medium">{tierLabel}</span>
          {' | '}
          <span className="text-foreground font-medium">{yearLabel}</span>
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
          Filters
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </span>
      </button>

      {/* Animated expand/collapse panel — content stays in DOM for accessibility */}
      <motion.div
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        initial={false}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
        aria-hidden={!isExpanded}
      >
        <div className="px-4 pb-4 pt-1 border-t border-white/10">
          <GlobalControlsPanel />
        </div>
      </motion.div>
    </div>
  );
}
