'use client';

import { LayoutDashboard, TreePine, TrendingUp, GitBranch, Table2, BarChart3, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const VIEWS = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'stats', label: 'Stats', icon: BarChart3 },
  { id: 'treemap', label: 'Treemap', icon: TreePine },
  { id: 'trends', label: 'Trends', icon: TrendingUp },
  { id: 'confidence', label: 'Confidence', icon: Layers },
  { id: 'dataflow', label: 'Data Flow', icon: GitBranch },
  { id: 'table', label: 'Evidence', icon: Table2 },
] as const;

export type ViewId = typeof VIEWS[number]['id'];

interface NavigationProps {
  activeView?: ViewId;
  onViewChange?: (view: ViewId) => void;
}

export function Navigation({ activeView = 'dashboard', onViewChange }: NavigationProps) {
  return (
    <nav className="border-b border-white/10 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {VIEWS.map(view => {
            const Icon = view.icon;
            const isActive = activeView === view.id;
            return (
              <button
                key={view.id}
                onClick={() => onViewChange?.(view.id)}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
                  isActive
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {view.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
