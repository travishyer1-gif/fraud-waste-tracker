'use client';

import { useState, useMemo } from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Brush,
  ResponsiveContainer,
} from 'recharts';

import { useEvidenceData } from '@/hooks/useEvidenceData';
import { useFilters } from '@/context/FilterContext';
import { buildTypeTimeSeriesData, FEDERAL_BUDGET } from '@/lib/timeSeriesUtils';
import { formatCompact } from '@/lib/utils';

const ANNOTATIONS = [
  { year: 2020, label: 'COVID Stimulus' },
  { year: 2021, label: 'Peak Pandemic Spending' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-black/80 backdrop-blur-md p-3 shadow-2xl min-w-[200px]">
      <p className="text-xs text-white/60 mb-2 font-semibold uppercase tracking-wider">
        FY{label}
      </p>
      <div className="space-y-1.5">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {payload.map((p: any, i: number) => (
          <div key={`${String(p.dataKey)}-${i}`} className="flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              <span style={{ color: p.color }}>{p.name}</span>
            </div>
            <span className="font-mono text-white/80">
              {typeof p.value === 'number'
                ? p.dataKey?.toString().endsWith('Pct')
                  ? `${p.value.toFixed(2)}%`
                  : formatCompact(p.value)
                : '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimeSeries() {
  const { entries } = useEvidenceData();
  const { setYearRange } = useFilters();

  const [showBudget, setShowBudget] = useState(false);
  const [showAsPct, setShowAsPct] = useState(false);

  const baseData = useMemo(() => buildTypeTimeSeriesData(entries), [entries]);

  const chartData = useMemo(() => {
    return baseData.map(d => {
      const budget = FEDERAL_BUDGET[d.year] ?? null;
      return {
        ...d,
        budget,
        fraudPct: budget ? (d.fraud / budget) * 100 : null,
        wastePct: budget ? (d.waste / budget) * 100 : null,
        combinedPct: budget ? (d.combined / budget) * 100 : null,
      };
    });
  }, [baseData]);

  const fraudKey = showAsPct ? 'fraudPct' : 'fraud';
  const wasteKey = showAsPct ? 'wastePct' : 'waste';
  const combinedKey = showAsPct ? 'combinedPct' : 'combined';

  const yTickFormatter = showAsPct
    ? (v: number) => `${v.toFixed(1)}%`
    : (v: number) => formatCompact(v);

  const budgetYTickFormatter = (v: number) => formatCompact(v);

  // Brush index range
  const brushStartIdx = 0;
  const brushEndIdx = chartData.length - 1;

  return (
    <div className="space-y-4">
      {/* Overlay toggles */}
      <div className="flex flex-wrap gap-4 text-xs text-white/70">
        <label className="flex items-center gap-2 cursor-pointer select-none hover:text-white transition-colors">
          <input
            type="checkbox"
            checked={showBudget}
            onChange={e => {
              setShowBudget(e.target.checked);
              if (!e.target.checked) setShowAsPct(false);
            }}
            className="accent-gray-400 w-3.5 h-3.5"
          />
          Federal budget context
        </label>
        <label className={`flex items-center gap-2 cursor-pointer select-none transition-colors ${showBudget ? 'hover:text-white' : 'opacity-40 cursor-not-allowed'}`}>
          <input
            type="checkbox"
            checked={showAsPct}
            onChange={e => setShowAsPct(e.target.checked)}
            disabled={!showBudget}
            className="accent-blue-400 w-3.5 h-3.5"
          />
          As % of federal budget
        </label>
      </div>

      {/* Chart */}
      <div style={{ minHeight: 400 }}>
        <ResponsiveContainer width="100%" height={420}>
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: showBudget && !showAsPct ? 70 : 20, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis
              dataKey="year"
              tickFormatter={(v) => `FY${v}`}
              tick={{ fill: '#888', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            {/* Left Y axis */}
            <YAxis
              yAxisId="left"
              tickFormatter={yTickFormatter}
              tick={{ fill: '#888', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={65}
            />
            {/* Right Y axis for raw budget (when not shown as pct) */}
            {showBudget && !showAsPct && (
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={budgetYTickFormatter}
                tick={{ fill: '#555', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={65}
              />
            )}

            <Tooltip content={CustomTooltip} />
            <Legend
              wrapperStyle={{ paddingTop: 8, fontSize: 11 }}
            />

            {/* Annotations */}
            {ANNOTATIONS.map(ann => (
              <ReferenceLine
                key={ann.year}
                yAxisId="left"
                x={ann.year}
                stroke="#ffffff22"
                strokeDasharray="4 3"
                label={{
                  value: ann.label,
                  position: 'insideTopRight',
                  fill: '#ffffff44',
                  fontSize: 9,
                  dy: -4,
                }}
              />
            ))}

            {/* Fraud line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey={fraudKey}
              name="Fraud"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444', r: 3 }}
              activeDot={{ r: 5 }}
            />
            {/* Waste line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey={wasteKey}
              name="Waste"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ fill: '#f59e0b', r: 3 }}
              activeDot={{ r: 5 }}
            />
            {/* Combined line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey={combinedKey}
              name="Combined"
              stroke="#e2e8f0"
              strokeWidth={2}
              strokeDasharray="5 3"
              dot={false}
              activeDot={{ r: 4 }}
            />
            {/* Federal budget line (right axis or left if pct) */}
            {showBudget && !showAsPct && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="budget"
                name="Fed. Budget"
                stroke="#64748b"
                strokeWidth={1.5}
                strokeDasharray="3 2"
                dot={false}
              />
            )}

            {/* Brush for year range selection */}
            <Brush
              dataKey="year"
              height={24}
              stroke="#333"
              fill="#0a0a0f"
              travellerWidth={8}
              startIndex={brushStartIdx}
              endIndex={brushEndIdx}
              tickFormatter={(v) => `FY${v}`}
              onChange={(range) => {
                if (
                  range?.startIndex !== undefined &&
                  range?.endIndex !== undefined
                ) {
                  const startYear = chartData[range.startIndex]?.year;
                  const endYear = chartData[range.endIndex]?.year;
                  if (startYear && endYear) {
                    setYearRange(startYear, endYear);
                  }
                }
              }}

            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Hint text */}
      <p className="text-[10px] text-white/30 text-center">
        Drag the brush below the chart to filter the global year range. Multi-year entries are
        distributed evenly across covered years.
      </p>
    </div>
  );
}
