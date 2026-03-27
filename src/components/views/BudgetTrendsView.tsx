'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Percent } from 'lucide-react';
import { BudgetStackedArea } from '@/components/charts/BudgetStackedArea';
import { BudgetFraudCombo } from '@/components/charts/BudgetFraudCombo';
import { BudgetTreemap } from '@/components/charts/BudgetTreemap';
import { RevenueOutlaysChart } from '@/components/charts/RevenueOutlaysChart';
import { BudgetMetrics } from '@/components/dashboard/BudgetMetrics';

type ViewMode = 'absolute' | 'normalized';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function BudgetTrendsView() {
  const [viewMode, setViewMode] = useState<ViewMode>('absolute');
  const [treemapYear] = useState(2025);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* Page header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">Federal Budget Trends</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          FY2003–2025 spending by function with fraud &amp; waste overlay
        </p>
      </div>

      {/* Revenue vs. Outlays hero chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0 }}
        className="glass-card p-4 space-y-4"
      >
        <RevenueOutlaysChart syncId="budget" />
      </motion.div>

      {/* Metrics cards */}
      <BudgetMetrics selectedYear={treemapYear} />

      {/* Stacked area chart section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="glass-card p-4 space-y-3"
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Budget by Function</h3>
            <p className="text-xs text-muted-foreground">Stacked area — FY2003–2025</p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setViewMode('absolute')}
              className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                viewMode === 'absolute'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-muted/50 text-muted-foreground border border-transparent hover:border-border'
              }`}
            >
              <DollarSign className="w-3 h-3" />
              Dollars
            </button>
            <button
              onClick={() => setViewMode('normalized')}
              className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                viewMode === 'normalized'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-muted/50 text-muted-foreground border border-transparent hover:border-border'
              }`}
            >
              <Percent className="w-3 h-3" />
              Share
            </button>
          </div>
        </div>
        <BudgetStackedArea viewMode={viewMode} />
      </motion.div>

      {/* Fraud/waste overlay chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="glass-card p-4 space-y-3"
      >
        <div>
          <h3 className="text-sm font-semibold text-foreground">Fraud &amp; Waste vs. Budget</h3>
          <p className="text-xs text-muted-foreground">
            Budget (bars, left axis) vs. estimated fraud+waste (lines, right axis)
          </p>
        </div>
        <BudgetFraudCombo />
      </motion.div>

      {/* Treemap section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="glass-card p-4 space-y-3"
      >
        <div>
          <h3 className="text-sm font-semibold text-foreground">Budget Composition</h3>
          <p className="text-xs text-muted-foreground">
            Drag the slider to explore budget composition by year
          </p>
        </div>
        <BudgetTreemap initialYear={2025} />
      </motion.div>
    </motion.div>
  );
}
