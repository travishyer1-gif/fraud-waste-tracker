'use client';

import { useState } from 'react';
import { Navigation, type ViewId } from './Navigation';
import { Header } from './Header';
import { FilterProvider } from '@/context/FilterContext';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { EvidenceTable } from '@/components/table/EvidenceTable';
import TreemapView from '@/components/views/TreemapView';
import BubbleView from '@/components/views/BubbleView';
import TimeSeriesView from '@/components/views/TimeSeriesView';
import ConfidenceView from '@/components/views/ConfidenceView';
import SankeyView from '@/components/views/SankeyView';
import { TooltipProvider } from '@/components/ui/InfoTooltip';
import { MethodologyPanel } from '@/components/ui/MethodologyPanel';
import { Footer } from '@/components/layout/Footer';

function ViewContent({ view }: { view: ViewId }) {
  if (view === 'dashboard') return <Dashboard />;
  if (view === 'table') return <EvidenceTable />;
  if (view === 'treemap') return <TreemapView />;
  if (view === 'bubble') return <BubbleView />;
  if (view === 'trends') return <TimeSeriesView />;
  if (view === 'confidence') return <ConfidenceView />;
  if (view === 'sources') return <SankeyView />;
  return <Dashboard />;
}

export function AppShell() {
  const [activeView, setActiveView] = useState<ViewId>('dashboard');

  return (
    <TooltipProvider>
      <FilterProvider>
        {/* Header now lives inside FilterProvider so it can access filter context */}
        <Header />
        <Navigation activeView={activeView} onViewChange={setActiveView} />
        <main className="container mx-auto px-4 py-6 flex-1">
          <ViewContent view={activeView} />
        </main>

        {/* Methodology + Footer pinned at bottom of app */}
        <div className="container mx-auto px-4 pb-4 space-y-3">
          <MethodologyPanel />
        </div>
        <Footer onViewSourceData={() => setActiveView('table')} />
      </FilterProvider>
    </TooltipProvider>
  );
}
