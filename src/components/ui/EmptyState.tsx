'use client';

import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  onReset?: () => void;
}

export function EmptyState({
  message = 'No entries match your filters',
  onReset,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center mb-4">
        <SearchX className="w-7 h-7 text-muted-foreground" />
      </div>
      <p className="text-base font-medium text-muted-foreground mb-6">{message}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="px-5 py-2 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 hover:border-emerald-500/50 transition-colors"
        >
          Reset Filters
        </button>
      )}
    </motion.div>
  );
}
