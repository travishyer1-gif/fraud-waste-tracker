'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, TreePine, Layers, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MoreDrawer } from './MoreDrawer';
import type { ViewId } from './Navigation';

/** The 4 primary tabs visible in the top bar on mobile. */
const PRIMARY_TABS: { id: ViewId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'stats',      label: 'Stats',       icon: BarChart3   },
  { id: 'trends',     label: 'Historical',  icon: TrendingUp  },
  { id: 'treemap',    label: 'Treemap',     icon: TreePine    },
  { id: 'confidence', label: 'Methodology', icon: Layers      },
];

/** IDs that live inside the More drawer */
const MORE_VIEW_IDS: ViewId[] = ['dashboard', 'table', 'dataflow'];

interface BottomTabBarProps {
  activeView: ViewId;
  onViewChange: (view: ViewId) => void;
}

export function BottomTabBar({ activeView, onViewChange }: BottomTabBarProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  const isMoreActive = MORE_VIEW_IDS.includes(activeView);

  return (
    <>
      <nav
        className="sticky top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 md:hidden"
      >
        <div className="flex h-12 items-stretch">
          {PRIMARY_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onViewChange(tab.id)}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 flex-1 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-medium leading-none">{tab.label}</span>
              </button>
            );
          })}

          {/* More tab */}
          <button
            onClick={() => setMoreOpen(prev => !prev)}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 flex-1 transition-colors',
              isMoreActive || moreOpen ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[9px] font-medium leading-none">More</span>
          </button>
        </div>
      </nav>

      <MoreDrawer
        isOpen={moreOpen}
        onClose={() => setMoreOpen(false)}
        activeView={activeView}
        onViewChange={onViewChange}
      />
    </>
  );
}
