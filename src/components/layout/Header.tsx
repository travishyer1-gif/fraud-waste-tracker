'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFilters } from '@/context/FilterContext';
import type { ViewId } from './Navigation';

const VIEW_LABELS: Record<ViewId, string> = {
  dashboard:  'Overview',
  stats:      'Stats',
  treemap:    'Treemap',
  trends:     'Trends',
  confidence: 'Confidence',
  dataflow:   'Data Flow',
  table:      'Evidence',
};

interface HeaderProps {
  /** Current active view — used to show dynamic page title on mobile. */
  activeView?: ViewId;
}

export function Header({ activeView = 'dashboard' }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);
  const { filters, setShowStateData } = useFilters();

  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  const pageTitle = VIEW_LABELS[activeView] ?? 'Overview';

  return (
    <header className="sticky top-0 z-50 glass-dark border-b border-white/10">
      {/* ── Mobile header (< md) ── */}
      <div className="md:hidden container mx-auto px-4 h-12 flex items-center justify-between">
        {/* Shield icon only */}
        <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-4 h-4 text-red-400" />
        </div>

        {/* Dynamic page title */}
        <span className="text-sm font-semibold text-foreground">{pageTitle}</span>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="w-8 h-8"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      {/* ── Desktop header (≥ md) — unchanged ── */}
      <div className="hidden md:flex container mx-auto px-4 h-14 items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-tight text-foreground">
              Federal Fraud &amp; Waste Tracker
            </h1>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Evidence-Based · Non-Partisan · 78 Data Points
            </p>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs text-muted-foreground">
            Data: FY2003–FY2025
          </span>

          {/* State Data toggle with "Coming Soon" tooltip */}
          <div className="relative group">
            <button
              onClick={() => setShowStateData(!filters.showStateData)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium border transition-colors ${
                filters.showStateData
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  : 'bg-muted/30 text-muted-foreground/50 border-border/30 cursor-not-allowed'
              }`}
              aria-label="Toggle state data overlay"
            >
              <span
                className={`w-6 h-3.5 rounded-full relative inline-block transition-colors ${
                  filters.showStateData ? 'bg-blue-500' : 'bg-muted-foreground/30'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white shadow transition-transform ${
                    filters.showStateData ? 'translate-x-3' : 'translate-x-0.5'
                  }`}
                />
              </span>
              State Data
            </button>
            {/* Coming Soon tooltip */}
            <div className="absolute right-0 top-full mt-1.5 z-50 hidden group-hover:block">
              <div className="bg-popover border border-border rounded-md px-2.5 py-1.5 text-[11px] text-muted-foreground whitespace-nowrap shadow-md">
                🚧 Coming Soon — state-level entries not yet available
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-8 h-8"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
