'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BarChart3, TrendingUp, Table2, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MoreDrawer } from './MoreDrawer';
import type { ViewId } from './Navigation';

/** The 5 primary tabs visible in the bottom bar. */
const PRIMARY_TABS: { id: ViewId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard',  label: 'Overview', icon: LayoutDashboard },
  { id: 'stats',      label: 'Stats',    icon: BarChart3       },
  { id: 'trends',     label: 'Trends',   icon: TrendingUp      },
  { id: 'table',      label: 'Evidence', icon: Table2          },
];

/** IDs that live inside the More drawer */
const MORE_VIEW_IDS: ViewId[] = ['treemap', 'confidence', 'dataflow'];

interface BottomTabBarProps {
  activeView: ViewId;
  onViewChange: (view: ViewId) => void;
}

export function BottomTabBar({ activeView, onViewChange }: BottomTabBarProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Scroll direction detector: hide on scroll-down, show on scroll-up
  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > lastScrollY.current + 8) {
            setVisible(false);
          } else if (currentY < lastScrollY.current - 8) {
            setVisible(true);
          }
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isMoreActive = MORE_VIEW_IDS.includes(activeView);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            key="bottom-tab-bar"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/10 md:hidden"
            style={{
              paddingBottom: 'env(safe-area-inset-bottom)',
              height: 'calc(56px + env(safe-area-inset-bottom))',
            }}
          >
            <div className="flex h-14 items-stretch">
              {PRIMARY_TABS.map(tab => {
                const Icon = tab.icon;
                const isActive = activeView === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onViewChange(tab.id)}
                    className={cn(
                      'flex flex-col items-center justify-center gap-1 flex-1 transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-[10px] font-medium leading-none">{tab.label}</span>
                  </button>
                );
              })}

              {/* More tab */}
              <button
                onClick={() => setMoreOpen(prev => !prev)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 flex-1 transition-colors',
                  isMoreActive || moreOpen ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <MoreHorizontal className="w-6 h-6" />
                <span className="text-[10px] font-medium leading-none">More</span>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <MoreDrawer
        isOpen={moreOpen}
        onClose={() => setMoreOpen(false)}
        activeView={activeView}
        onViewChange={onViewChange}
      />
    </>
  );
}
