'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import BudgetTrendsView from '@/components/views/BudgetTrendsView';
import { TooltipProvider } from '@/components/ui/InfoTooltip';
import { MethodologyPanel } from '@/components/ui/MethodologyPanel';
import { Footer } from '@/components/layout/Footer';

function renderView(view: ViewId) {
  if (view === 'dashboard') return <BubbleView />;
  if (view === 'table') return <EvidenceTable />;
  if (view === 'treemap') return <TreemapView />;
  if (view === 'stats') return <Dashboard />;
  if (view === 'trends') return <TimeSeriesView />;
  if (view === 'confidence') return <ConfidenceView />;
  if (view === 'dataflow') return <SankeyView />;
  if (view === 'budget') return <BudgetTrendsView />;
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

        {/* Mobile top tab bar — hidden on desktop */}
        <BottomTabBar activeView={activeView} onViewChange={setActiveView} />

        {/* Desktop: collapsible GlobalControls above main content (single instance) */}
        <div className="hidden md:block container mx-auto px-4 pt-4">
          <GlobalControls />
        </div>

        {/* Main content */}
        <main className="container mx-auto px-4 py-6 flex-1 relative">
          {/* Mobile filter chip — floats top-right of content area */}
          <div className="md:hidden flex justify-end mb-3">
            <FilterChip />
          </div>

          {/* View transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {renderView(activeView)}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Methodology + Footer */}
        <div className="container mx-auto px-4 pb-4 space-y-3">
          <MethodologyPanel />
        </div>
        <Footer onViewSourceData={() => setActiveView('table' as ViewId)} />
      </FilterProvider>
    </TooltipProvider>
  );
}
