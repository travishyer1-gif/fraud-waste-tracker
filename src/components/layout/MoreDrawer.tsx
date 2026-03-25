'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreePine, Layers, GitBranch, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ViewId } from './Navigation';

const MORE_ITEMS: { id: ViewId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'treemap',    label: 'Treemap',     icon: TreePine  },
  { id: 'confidence', label: 'Confidence',  icon: Layers    },
  { id: 'dataflow',   label: 'Data Flow',   icon: GitBranch },
];

interface MoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: ViewId;
  onViewChange: (view: ViewId) => void;
}

export function MoreDrawer({ isOpen, onClose, activeView, onViewChange }: MoreDrawerProps) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleSelect = (id: ViewId) => {
    onViewChange(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="more-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="more-drawer"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 rounded-t-2xl pb-[calc(56px+env(safe-area-inset-bottom))]"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header row */}
            <div className="flex items-center justify-between px-4 pb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                More Views
              </span>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex gap-4 justify-center px-6 pb-4">
              {MORE_ITEMS.map(item => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 flex-1 py-3 rounded-xl transition-colors',
                      isActive
                        ? 'bg-primary/20 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    )}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-[10px] font-medium leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
