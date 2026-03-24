'use client';

import { useState } from 'react';
import { Navigation, type ViewId } from './Navigation';
import { FilterProvider } from '@/context/FilterContext';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { EvidenceTable } from '@/components/table/EvidenceTable';
import TreemapView from '@/components/views/TreemapView';
import BubbleView from '@/components/views/BubbleView';

function ViewContent({ view }: { view: ViewId }) {
  if (view === 'dashboard') return <Dashboard />;
  if (view === 'table') return <EvidenceTable />;
  if (view === 'treemap') return <TreemapView />;
  if (view === 'bubble') return <BubbleView />;

  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center space-y-2">
        <div className="text-2xl">🚧</div>
        <p className="text-sm text-muted-foreground font-medium">
          {view.charAt(0).toUpperCase() + view.slice(1)} view
        </p>
        <p className="text-xs text-muted-foreground">
          Coming in next phase
        </p>
      </div>
    </div>
  );
}

export function AppShell() {
  const [activeView, setActiveView] = useState<ViewId>('dashboard');

  return (
    <FilterProvider>
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      <main className="container mx-auto px-4 py-6 flex-1">
        <ViewContent view={activeView} />
      </main>
    </FilterProvider>
  );
}
