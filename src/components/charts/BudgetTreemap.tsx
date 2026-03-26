'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveTreeMap } from '@nivo/treemap';
import {
  BUDGET_BY_FUNCTION,
  BUDGET_FUNCTION_COLORS,
  BUDGET_FUNCTIONS,
  formatBudgetAmount,
  type BudgetFunction,
} from '@/data/budget-by-function';
import { Slider } from '@/components/ui/slider';
import { YEAR_RANGE } from '@/lib/constants';

interface TreemapNode {
  name: string;
  value: number;
  color: string;
}

interface TreemapData {
  name: string;
  children: TreemapNode[];
}

interface BudgetTreemapProps {
  initialYear?: number;
}

export function BudgetTreemap({ initialYear = 2025 }: BudgetTreemapProps) {
  const [year, setYear] = useState(initialYear);

  const treemapData: TreemapData = {
    name: 'Budget',
    children: BUDGET_FUNCTIONS.map((fn: BudgetFunction) => ({
      name: fn,
      value: BUDGET_BY_FUNCTION[year]?.[fn] ?? 0,
      color: BUDGET_FUNCTION_COLORS[fn],
    })),
  };

  return (
    <div className="space-y-4">
      {/* Year selector */}
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground shrink-0">Year:</span>
        <Slider
          min={YEAR_RANGE.min}
          max={YEAR_RANGE.max}
          step={1}
          value={[year]}
          onValueChange={([v]) => setYear(v)}
          className="flex-1"
        />
        <span className="text-xs font-mono font-semibold text-primary w-12 text-right shrink-0">
          FY{year}
        </span>
      </div>

      {/* Treemap */}
      <AnimatePresence mode="wait">
        <motion.div
          key={year}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          style={{ height: 320 }}
        >
          <ResponsiveTreeMap
            data={treemapData}
            identity="name"
            value="value"
            valueFormat={v => formatBudgetAmount(v)}
            innerPadding={3}
            outerPadding={3}
            tile="squarify"
            label={node => `${node.id}\n${formatBudgetAmount(node.value)}`}
            labelSkipSize={60}
            colors={node => {
              const fn = node.id as BudgetFunction;
              return BUDGET_FUNCTION_COLORS[fn] ?? '#6b7280';
            }}
            borderWidth={1}
            borderColor="rgba(0,0,0,0.4)"
            theme={{
              labels: {
                text: {
                  fontSize: 11,
                  fontWeight: 600,
                  fill: 'rgba(255,255,255,0.9)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                },
              },
              tooltip: {
                container: {
                  background: 'rgba(10,10,10,0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  padding: '10px 14px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                },
              },
            }}
            tooltip={({ node }) => (
              <div style={{ padding: '8px 12px', fontSize: 12 }}>
                <strong>{node.id}</strong>
                <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                  {formatBudgetAmount(node.value)}
                  {' '}
                  ({((node.value / treemapData.children.reduce((s, c) => s + c.value, 0)) * 100).toFixed(1)}%)
                </div>
              </div>
            )}
            animate={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {BUDGET_FUNCTIONS.map(fn => (
          <div key={fn} className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: BUDGET_FUNCTION_COLORS[fn] }} />
            <span className="text-[10px] text-muted-foreground">{fn}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
