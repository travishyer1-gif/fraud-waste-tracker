'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GlobalControlsPanel } from './GlobalControls';
import { useFilters } from '@/context/FilterContext';
import { Button } from '@/components/ui/button';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSheet({ isOpen, onClose }: FilterSheetProps) {
  const { filters, setShowStateData } = useFilters();

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="filter-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            key="filter-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 rounded-t-2xl overflow-hidden"
            style={{ maxHeight: '80vh' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
              <span className="text-sm font-semibold text-foreground">Filters</span>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto px-4 py-3 space-y-4" style={{ maxHeight: 'calc(80vh - 120px)' }}>
              {/* State Data toggle (moved from header on mobile) */}
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-muted-foreground">State Data:</span>
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
                </div>
              </div>

              {/* All the regular GlobalControls */}
              <GlobalControlsPanel />
            </div>

            {/* Apply & Close */}
            <div className="px-4 py-3 border-t border-white/10" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}>
              <Button
                onClick={onClose}
                className="w-full"
                variant="default"
              >
                Apply &amp; Close
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
