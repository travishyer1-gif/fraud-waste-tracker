'use client';

import { useState } from 'react';
import { Navigation, type ViewId } from './Navigation';
import { Header } from './Header';
import { BottomTabBar } from './BottomTabBar';
import { FilterProvider } from '@/context/FilterContext';
import { GlobalControls } from '@/components/controls/GlobalControls';
import { FilterChip } from '@/components/controls/FilterChip';
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
  if (view === 'dashboard') return <BubbleView />;
  if (view === 'table') return <EvidenceTable />;
  if (view === 'treemap') return <TreemapView />;
  if (view === 'stats') return <Dashboard />;
  if (view === 'trends') return <TimeSeriesView />;
  if (view === 'confidence') return <ConfidenceView />;
  if (view === 'dataflow') return <SankeyView />;
  return <BubbleView />;
}

export function AppShell() {
  const [activeView, setActiveView] = useState<ViewId>('dashboard');

  return (
    <TooltipProvider>
      <FilterProvider>
        {/* Header — passes activeView for mobile page title */}
        <Header activeView={activeView} />

        {/* Desktop nav — hidden on mobile */}
        <div className="hidden md:block">
          <Navigation activeView={activeView} onViewChange={setActiveView} />
        </div>

        {/* Desktop: inline GlobalControls above main content */}
        <div className="hidden md:block container mx-auto px-4 pt-4">
          <GlobalControls />
        </div>

        {/* Main content
            - Mobile: add bottom padding (72px) so content clears the bottom tab bar
            - Mobile: add top-right FloatingFilterChip  */}
        <main className="container mx-auto px-4 py-6 flex-1 pb-[88px] md:pb-6 relative">
          {/* Mobile filter chip — floats top-right of content area */}
          <div className="md:hidden flex justify-end mb-3">
            <FilterChip />
          </div>

          <ViewContent view={activeView} />
        </main>

        {/* Methodology + Footer pinned at bottom of app */}
        <div className="container mx-auto px-4 pb-4 space-y-3 pb-[88px] md:pb-4">
          <MethodologyPanel />
        </div>
        <Footer onViewSourceData={() => setActiveView('table' as ViewId)} />

        {/* Mobile bottom tab bar — hidden on desktop */}
        <BottomTabBar activeView={activeView} onViewChange={setActiveView} />
      </FilterProvider>
    </TooltipProvider>
  );
}
