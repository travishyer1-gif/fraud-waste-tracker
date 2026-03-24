'use client';

import { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useEvidenceData } from '@/hooks/useEvidenceData';
import { buildTierTimeSeriesData } from '@/lib/timeSeriesUtils';
import { formatCompact } from '@/lib/utils';
import { TIER_COLORS } from '@/lib/constants';

type TypeFilter = 'combined' | 'fraud' | 'waste';

const TYPE_BUTTONS: { id: TypeFilter; label: string }[] = [
  { id: 'combined', label: 'Combined' },
  { id: 'fraud', label: 'Fraud Only' },
  { id: 'waste', label: 'Waste Only' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const total = payload.reduce((sum: number, p: any) => sum + (typeof p.value === 'number' ? p.value : 0), 0);

  return (
    <div className="rounded-xl border border-white/10 bg-black/80 backdrop-blur-md p-3 shadow-2xl min-w-[180px]">
      <p className="text-xs text-white/60 mb-2 font-semibold uppercase tracking-wider">
        FY{label}
      </p>
      <p className="text-sm font-bold text-white mb-2">
        Total: {formatCompact(total)}
      </p>
      <div className="space-y-1">
        {[...payload].reverse().map((p) => {
          const dataKeyStr = typeof p.dataKey === 'string' ? p.dataKey : String(p.dataKey ?? '');
          const tierNum = parseInt(dataKeyStr.replace('tier', '') || '0');
          const info = TIER_COLORS[tierNum as keyof typeof TIER_COLORS];
          return (
            <div key={dataKeyStr} className="flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: info?.bg }}
                />
                <span style={{ color: info?.bg }}>
                  {info?.icon} {info?.label ?? `Tier ${tierNum}`}
                </span>
              </div>
              <span className="font-mono text-white/80">{formatCompact(typeof p.value === 'number' ? p.value : 0)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ConfidenceExplorer() {
  const { entries } = useEvidenceData();
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('combined');

  const chartData = useMemo(
    () => buildTierTimeSeriesData(entries, typeFilter),
    [entries, typeFilter]
  );

  // Dynamic insight: use the most recent year with data
  const insightYear = useMemo(() => {
    return [...chartData].reverse().find(d => d.total > 0) ?? chartData[chartData.length - 1];
  }, [chartData]);

  const tier1Pct =
    insightYear && insightYear.total > 0
      ? Math.round((insightYear.tier1 / insightYear.total) * 100)
      : 0;
  const tier3PlusPct =
    insightYear && insightYear.total > 0
      ? Math.round(((insightYear.tier3 + insightYear.tier4) / insightYear.total) * 100)
      : 0;

  const gradientDefs = [
    { id: 'tier1Grad', color: TIER_COLORS[1].bg },
    { id: 'tier2Grad', color: TIER_COLORS[2].bg },
    { id: 'tier3Grad', color: TIER_COLORS[3].bg },
    { id: 'tier4Grad', color: TIER_COLORS[4].bg },
  ];

  return (
    <div className="space-y-4">
      {/* Toggle buttons */}
      <div className="flex gap-2">
        {TYPE_BUTTONS.map(btn => (
          <button
            key={btn.id}
            onClick={() => setTypeFilter(btn.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              typeFilter === btn.id
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-transparent border-white/10 text-white/50 hover:text-white/80 hover:border-white/20'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div style={{ minHeight: 400 }}>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
          >
            <defs>
              {gradientDefs.map(({ id, color }) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis
              dataKey="year"
              tickFormatter={(v) => `FY${v}`}
              tick={{ fill: '#888', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => formatCompact(v)}
              tick={{ fill: '#888', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={65}
            />
            <Tooltip content={CustomTooltip} />
            <Legend
              formatter={(value) => {
                const tierNum = parseInt(value.replace('tier', ''));
                const info = TIER_COLORS[tierNum as keyof typeof TIER_COLORS];
                return (
                  <span style={{ color: info?.bg, fontSize: 11 }}>
                    {info?.icon} {info?.label ?? value}
                  </span>
                );
              }}
              wrapperStyle={{ paddingTop: 12 }}
            />
            {/* Tier 1 on bottom — most confirmed */}
            <Area
              type="monotone"
              dataKey="tier1"
              stackId="1"
              stroke={TIER_COLORS[1].bg}
              fill={`url(#tier1Grad)`}
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="tier2"
              stackId="1"
              stroke={TIER_COLORS[2].bg}
              fill={`url(#tier2Grad)`}
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="tier3"
              stackId="1"
              stroke={TIER_COLORS[3].bg}
              fill={`url(#tier3Grad)`}
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="tier4"
              stackId="1"
              stroke={TIER_COLORS[4].bg}
              fill={`url(#tier4Grad)`}
              strokeWidth={1.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Dynamic insight */}
      {insightYear && insightYear.total > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/70 leading-relaxed">
          <span className="text-green-400 font-semibold">{tier1Pct}%</span> of the FY
          {insightYear.year} total is{' '}
          <span className="text-white/90">confirmed (Tier 1) evidence</span>
          {tier3PlusPct > 0 && (
            <>
              {'. '}Only{' '}
              <span className="text-amber-400 font-semibold">{tier3PlusPct}%</span> relies on
              independent research (Tier 3+).
            </>
          )}
        </div>
      )}
    </div>
  );
}
