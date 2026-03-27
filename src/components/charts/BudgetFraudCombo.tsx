'use client';

import { useMemo } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useEvidenceData } from '@/hooks/useEvidenceData';
import { FEDERAL_BUDGET, YEAR_RANGE } from '@/lib/constants';
import { TYPE_COLORS } from '@/lib/constants';
import { formatBudgetAmount } from '@/data/budget-by-function';

interface YearlyFraudWaste {
  year: number;
  budgetTrillions: number;
  fraudBillions: number;
  wasteBillions: number;
}

interface ComboTooltipProps {
  active?: boolean;
  payload?: Array<{ dataKey?: string; value?: number; color?: string; name?: string }>;
  label?: string | number;
}

function CustomTooltip({ active, payload, label }: ComboTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      className="text-xs min-w-[180px]"
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
        {payload.map(p => (
          <div key={p.dataKey} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: p.color }} />
              <span className="text-white/60">{p.name}</span>
            </div>
            <span className="font-mono font-semibold text-emerald-400">
              {p.dataKey === 'budgetTrillions'
                ? `$${((p.value ?? 0)).toFixed(2)}T`
                : `$${((p.value ?? 0)).toFixed(0)}B`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BudgetFraudCombo() {
  const { entries } = useEvidenceData();

  const data = useMemo<YearlyFraudWaste[]>(() => {
    return Object.keys(FEDERAL_BUDGET)
      .map(Number)
      .sort((a, b) => a - b)
      .map(year => {
        const yearEntries = entries.filter(e => {
          if (!e.safeToSum) return false;
          const start = e.fiscalYearStart ?? year;
          const end = e.fiscalYearEnd ?? start;
          return start <= year && end >= year;
        });

        const fraudTotal = yearEntries
          .filter(e => e.type === 'fraud')
          .reduce((sum, e) => sum + (e.amountBest ?? 0), 0);

        const wasteTotal = yearEntries
          .filter(e => e.type === 'waste')
          .reduce((sum, e) => sum + (e.amountBest ?? 0), 0);

        const budget = FEDERAL_BUDGET[year] ?? 0;
        const yearCount = yearEntries.reduce((s, e) => {
          const span = (e.fiscalYearEnd ?? (e.fiscalYearStart ?? year)) - (e.fiscalYearStart ?? year) + 1;
          return s + Math.max(1, span);
        }, 0);

        return {
          year,
          budgetTrillions: budget / 1_000_000_000_000,
          fraudBillions: fraudTotal / 1_000_000_000,
          wasteBillions: wasteTotal / 1_000_000_000,
        };
      });
  }, [entries]);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart
        data={data}
        syncId="budget"
        margin={{ top: 10, right: 55, left: 10, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.5)' }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        {/* Left Y-axis: budget in trillions */}
        <YAxis
          yAxisId="left"
          orientation="left"
          tickFormatter={v => `$${v.toFixed(1)}T`}
          tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        {/* Right Y-axis: fraud+waste in billions */}
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={v => `$${v.toFixed(0)}B`}
          tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
        <Legend
          wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
          formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.6)' }}>{value}</span>}
        />
        <Bar
          yAxisId="left"
          dataKey="budgetTrillions"
          name="Total Budget"
          fill="rgba(99,102,241,0.25)"
          stroke="rgba(99,102,241,0.5)"
          strokeWidth={1}
          radius={[2, 2, 0, 0]}
          animationDuration={600}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="fraudBillions"
          name="Fraud ($B)"
          stroke={TYPE_COLORS.fraud}
          strokeWidth={2}
          dot={{ r: 2, fill: TYPE_COLORS.fraud }}
          activeDot={{ r: 4 }}
          animationDuration={600}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="wasteBillions"
          name="Waste ($B)"
          stroke={TYPE_COLORS.waste}
          strokeWidth={2}
          dot={{ r: 2, fill: TYPE_COLORS.waste }}
          activeDot={{ r: 4 }}
          animationDuration={600}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
