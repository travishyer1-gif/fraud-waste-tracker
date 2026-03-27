'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  BUDGET_FUNCTIONS,
  BUDGET_TIMESERIES,
  BUDGET_TIMESERIES_NORMALIZED,
  BUDGET_FUNCTION_COLORS,
  formatBudgetAmount,
  type BudgetFunction,
} from '@/data/budget-by-function';

interface BudgetStackedAreaProps {
  viewMode: 'absolute' | 'normalized';
  animationDuration?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ dataKey?: string; value?: number; color?: string }>;
  label?: string | number;
  viewMode: 'absolute' | 'normalized';
}

function CustomTooltip({ active, payload, label, viewMode }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const total = payload.reduce((sum: number, p) => sum + (p.value ?? 0), 0);

  return (
    <div
      className="text-xs min-w-[200px]"
      style={{
        background: 'rgba(24,24,27,0.95)',
        border: '1px solid rgba(16,185,129,0.3)',
        borderRadius: 8,
        padding: '8px 12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
      }}
    >
      <p className="font-semibold text-white mb-2">FY{label}</p>
      <div className="space-y-1">
        {[...payload].reverse().map(p => {
          const value = p.value ?? 0;
          const pct = viewMode === 'absolute' && total > 0
            ? ((value / total) * 100).toFixed(1)
            : viewMode === 'normalized'
              ? (value * 100).toFixed(1)
              : null;
          return (
            <div key={p.dataKey} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: p.color }} />
                <span className="text-white/60 truncate max-w-[120px]">{p.dataKey}</span>
              </div>
              <span className="font-mono font-semibold text-emerald-400">
                {viewMode === 'absolute'
                  ? `${formatBudgetAmount(value)} (${pct}%)`
                  : `${pct}%`}
              </span>
            </div>
          );
        })}
        {viewMode === 'absolute' && (
          <div className="pt-1 mt-1 border-t border-white/10 flex justify-between">
            <span className="text-white/60 font-medium">Total</span>
            <span className="font-mono font-semibold text-emerald-400">{formatBudgetAmount(total)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function BudgetStackedArea({ viewMode, animationDuration = 600 }: BudgetStackedAreaProps) {
  const data = viewMode === 'absolute' ? BUDGET_TIMESERIES : BUDGET_TIMESERIES_NORMALIZED;

  const yAxisFormatter = (value: number) => {
    if (viewMode === 'normalized') {
      return `${(value * 100).toFixed(0)}%`;
    }
    return formatBudgetAmount(value);
  };

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        stackOffset={viewMode === 'normalized' ? 'expand' : 'none'}
      >
        <defs>
          {BUDGET_FUNCTIONS.map(fn => (
            <linearGradient key={fn} id={`grad-${fn.replace(/[^a-zA-Z]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={BUDGET_FUNCTION_COLORS[fn]} stopOpacity={0.85} />
              <stop offset="95%" stopColor={BUDGET_FUNCTION_COLORS[fn]} stopOpacity={0.4} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.5)' }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        <YAxis
          tickFormatter={yAxisFormatter}
          tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.5)' }}
          axisLine={false}
          tickLine={false}
          width={55}
          domain={viewMode === 'normalized' ? [0, 1] : ['auto', 'auto']}
        />
        <Tooltip
          content={<CustomTooltip viewMode={viewMode} />}
          cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
        />
        {BUDGET_FUNCTIONS.map((fn: BudgetFunction) => (
          <Area
            key={fn}
            type="monotone"
            dataKey={fn}
            stackId="budget"
            stroke={BUDGET_FUNCTION_COLORS[fn]}
            fill={`url(#grad-${fn.replace(/[^a-zA-Z]/g, '')})`}
            strokeWidth={1}
            animationDuration={animationDuration}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
