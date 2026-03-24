'use client';

import { useState, useEffect } from 'react';
import { Search, X, RotateCcw, DollarSign, Percent } from 'lucide-react';
import { useFilters, type DataType } from '@/context/FilterContext';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TIER_COLORS, YEAR_RANGE } from '@/lib/constants';

export function GlobalControls() {
  const {
    filters,
    setTierRange,
    setYearRange,
    setDataType,
    setSearchQuery,
    setShowAsPercent,
    resetFilters,
  } = useFilters();

  const [localSearch, setLocalSearch] = useState(filters.searchQuery);

  // Fix 2: sync localSearch when filters.searchQuery changes externally (e.g. reset)
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

  // Fix 1: dual-range tier label
  const tierLabel =
    filters.minTier === filters.maxTier
      ? `Tier ${filters.minTier} Only`
      : filters.minTier === 1 && filters.maxTier === 4
        ? 'All Tiers (1–4)'
        : `Tiers ${filters.minTier}–${filters.maxTier}`;

  return (
    <div className="glass-card p-4 space-y-4">
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
        {/* Tier color bars — only highlight tiers in selected range */}
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

      {/* Row 5: % of Budget toggle (Fix 3) */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Display Amounts:</span>
        <div className="flex gap-1">
          <button
            onClick={() => setShowAsPercent(false)}
            className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md font-medium transition-colors ${
              !filters.showAsPercent
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'bg-muted/50 text-muted-foreground border border-transparent hover:border-border'
            }`}
          >
            <DollarSign className="w-3 h-3" />
            $ Amount
          </button>
          <button
            onClick={() => setShowAsPercent(true)}
            className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md font-medium transition-colors ${
              filters.showAsPercent
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'bg-muted/50 text-muted-foreground border border-transparent hover:border-border'
            }`}
          >
            <Percent className="w-3 h-3" />
            % of Budget
          </button>
        </div>
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
