'use client';

import { useState } from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
import { useFilters, type DataType } from '@/context/FilterContext';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TIER_COLORS, YEAR_RANGE } from '@/lib/constants';

export function GlobalControls() {
  const { filters, setMaxTier, setYearRange, setDataType, setSearchQuery, resetFilters } = useFilters();
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    setSearchQuery(value);
  };

  const handleSearchClear = () => {
    setLocalSearch('');
    setSearchQuery('');
  };

  // Tier slider: 1 = Tier 1 only, 4 = all tiers
  const tierLabel = filters.maxTier === 1
    ? 'Confirmed Only (Tier 1)'
    : filters.maxTier === 4
      ? 'All Tiers (1–4)'
      : `Tiers 1–${filters.maxTier}`;

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

      {/* Row 3: Confidence tier slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Confidence:</span>
          <Badge variant="outline" className="text-xs h-5 px-2">
            {tierLabel}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
            {TIER_COLORS[1].icon} Confirmed
          </span>
          <Slider
            min={1}
            max={4}
            step={1}
            value={[filters.maxTier]}
            onValueChange={([val]) => setMaxTier(val)}
            className="flex-1"
          />
          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
            All {TIER_COLORS[4].icon}
          </span>
        </div>
        <div className="flex gap-1 mt-1">
          {([1, 2, 3, 4] as const).map(t => (
            <div
              key={t}
              className={`flex-1 h-1 rounded-full transition-opacity ${
                t <= filters.maxTier ? 'opacity-100' : 'opacity-20'
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
