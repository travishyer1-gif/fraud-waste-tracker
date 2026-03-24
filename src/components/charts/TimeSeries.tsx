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

// ─── Spending events ──────────────────────────────────────────────────────────

export interface SpendingEvent {
  year: number;
  label: string;
  /** Authorised spend amount in dollars; 0 = policy-only event */
  amount: number;
}

export const SPENDING_EVENTS: SpendingEvent[] = [
  { year: 2008, label: 'TARP ($700B)', amount: 700e9 },
  { year: 2009, label: 'ARRA Stimulus ($831B)', amount: 831e9 },
  { year: 2010, label: 'ACA Signed', amount: 0 },
  { year: 2013, label: 'Sequestration Cuts', amount: 0 },
  { year: 2017, label: 'Tax Cuts & Jobs Act', amount: 0 },
  { year: 2018, label: 'Bipartisan Budget Act ($300B)', amount: 300e9 },
  { year: 2020, label: 'CARES Act ($2.2T)', amount: 2200e9 },
  { year: 2020, label: 'PPP/EIDL Loans', amount: 800e9 },
  { year: 2021, label: 'American Rescue Plan ($1.9T)', amount: 1900e9 },
  { year: 2021, label: 'Infrastructure Act ($1.2T)', amount: 1200e9 },
  { year: 2022, label: 'Inflation Reduction Act ($891B)', amount: 891e9 },
  { year: 2022, label: 'CHIPS Act ($280B)', amount: 280e9 },
];

// ─── Counterfactual helper ────────────────────────────────────────────────────

/**
 * Build a "what-if" version of the data by removing a set of spending events.
 * For each disabled event, we subtract a fraud/waste-fraud-rate proxy from that
 * year and all subsequent years (simulating that the spending never happened and
 * therefore the associated fraud/waste never accrued).
 *
 * We use a conservative leakage rate of 8% of authorised spend → fraud/waste.
 */
const LEAKAGE_RATE = 0.08;

function buildCounterfactualData(
  baseData: ReturnType<typeof buildTypeTimeSeriesData>,
  disabledEvents: SpendingEvent[],
): ReturnType<typeof buildTypeTimeSeriesData> {
  if (disabledEvents.length === 0) return baseData;

  return baseData.map(row => {
    let fraudAdjust = 0;
    let wasteAdjust = 0;

    disabledEvents.forEach(evt => {
      if (evt.amount === 0 || evt.year > row.year) return;
      const leakage = evt.amount * LEAKAGE_RATE;
      // Spread across event year + 2 subsequent years (3-year window)
      const windowSize = 3;
      const yearsElapsed = row.year - evt.year;
      if (yearsElapsed < windowSize) {
        const share = yearsElapsed === 0 ? 0.5 : yearsElapsed === 1 ? 0.35 : 0.15;
        fraudAdjust += leakage * share * 0.5; // half attributed to fraud
        wasteAdjust += leakage * share * 0.5; // half attributed to waste
      }
    });

    const fraud = Math.max(0, row.fraud - fraudAdjust);
    const waste = Math.max(0, row.waste - wasteAdjust);

    return {
      ...row,
      fraud,
      waste,
      combined: fraud + waste,
    };
  });
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

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
          <div
            key={`${String(p.dataKey)}-${i}`}
            className="flex items-center justify-between gap-4 text-xs"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
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

// ─── Main component ───────────────────────────────────────────────────────────

interface TimeSeriesProps {
  /** Externally-controlled list of disabled event labels (from parent) */
  disabledEventLabels?: Set<string>;
  /** Whether to show values as % of federal budget */
  showAsPct?: boolean;
}

export function TimeSeries({ disabledEventLabels, showAsPct: externalShowAsPct }: TimeSeriesProps) {
  const { entries } = useEvidenceData();
  const { setYearRange } = useFilters();

  const [showBudget, setShowBudget] = useState(false);
  const [localShowAsPct, setLocalShowAsPct] = useState(false);

  // External prop overrides local toggle if provided
  const showAsPct = externalShowAsPct ?? localShowAsPct;

  const baseData = useMemo(() => buildTypeTimeSeriesData(entries), [entries]);

  // Year range present in data
  const dataYears = useMemo(() => baseData.map(d => d.year), [baseData]);
  const minYear = dataYears[0] ?? 2018;
  const maxYear = dataYears[dataYears.length - 1] ?? 2025;

  // Disabled events list
  const disabledEvents = useMemo(() => {
    if (!disabledEventLabels || disabledEventLabels.size === 0) return [];
    return SPENDING_EVENTS.filter(e => disabledEventLabels.has(e.label));
  }, [disabledEventLabels]);

  // Counterfactual data (only computed when some events are toggled off)
  const counterfactualBase = useMemo(
    () => buildCounterfactualData(baseData, disabledEvents),
    [baseData, disabledEvents],
  );

  const hasCounterfactual = disabledEvents.some(e => e.amount > 0);

  // Merge base + counterfactual into a single chartData array
  const chartData = useMemo(() => {
    return baseData.map((d, idx) => {
      const budget = FEDERAL_BUDGET[d.year] ?? null;
      const cf = counterfactualBase[idx];
      return {
        ...d,
        budget,
        fraudPct: budget ? (d.fraud / budget) * 100 : null,
        wastePct: budget ? (d.waste / budget) * 100 : null,
        combinedPct: budget ? (d.combined / budget) * 100 : null,
        // Counterfactual keys
        cfFraud: cf.fraud,
        cfWaste: cf.waste,
        cfCombined: cf.combined,
        cfFraudPct: budget ? (cf.fraud / budget) * 100 : null,
        cfWastePct: budget ? (cf.waste / budget) * 100 : null,
        cfCombinedPct: budget ? (cf.combined / budget) * 100 : null,
      };
    });
  }, [baseData, counterfactualBase]);

  const fraudKey = showAsPct ? 'fraudPct' : 'fraud';
  const wasteKey = showAsPct ? 'wastePct' : 'waste';
  const combinedKey = showAsPct ? 'combinedPct' : 'combined';
  const cfFraudKey = showAsPct ? 'cfFraudPct' : 'cfFraud';
  const cfWasteKey = showAsPct ? 'cfWastePct' : 'cfWaste';
  const cfCombinedKey = showAsPct ? 'cfCombinedPct' : 'cfCombined';

  const yTickFormatter = showAsPct
    ? (v: number) => `${v.toFixed(1)}%`
    : (v: number) => formatCompact(v);

  // Only show reference lines for ENABLED events within data year range
  const visibleEvents = useMemo(
    () =>
      SPENDING_EVENTS.filter(
        e =>
          e.year >= minYear &&
          e.year <= maxYear &&
          !(disabledEventLabels?.has(e.label)),
      ),
    [minYear, maxYear, disabledEventLabels],
  );

  const brushStartIdx = 0;
  const brushEndIdx = chartData.length - 1;

  return (
    <div className="space-y-4">
      {/* Overlay toggles (only shown when parent didn't inject showAsPct) */}
      {externalShowAsPct === undefined && (
        <div className="flex flex-wrap gap-4 text-xs text-white/70">
          <label className="flex items-center gap-2 cursor-pointer select-none hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showBudget}
              onChange={e => {
                setShowBudget(e.target.checked);
                if (!e.target.checked) setLocalShowAsPct(false);
              }}
              className="accent-gray-400 w-3.5 h-3.5"
            />
            Federal budget context
          </label>
          <label
            className={`flex items-center gap-2 cursor-pointer select-none transition-colors ${
              showBudget ? 'hover:text-white' : 'opacity-40 cursor-not-allowed'
            }`}
          >
            <input
              type="checkbox"
              checked={localShowAsPct}
              onChange={e => setLocalShowAsPct(e.target.checked)}
              disabled={!showBudget}
              className="accent-blue-400 w-3.5 h-3.5"
            />
            As % of federal budget
          </label>
        </div>
      )}

      {/* Chart */}
      <div style={{ minHeight: 400 }}>
        <ResponsiveContainer width="100%" height={420}>
          <ComposedChart
            data={chartData}
            margin={{
              top: 10,
              right: showBudget && !showAsPct ? 70 : 20,
              left: 20,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis
              dataKey="year"
              tickFormatter={v => `FY${v}`}
              tick={{ fill: '#888', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tickFormatter={yTickFormatter}
              tick={{ fill: '#888', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={65}
            />
            {showBudget && !showAsPct && (
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={v => formatCompact(v)}
                tick={{ fill: '#555', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={65}
              />
            )}

            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: 8, fontSize: 11 }} />

            {/* Reference lines for ENABLED spending events */}
            {visibleEvents.map((evt, i) => (
              <ReferenceLine
                key={`${evt.label}-${i}`}
                yAxisId="left"
                x={evt.year}
                stroke="#ffffff20"
                strokeDasharray="4 3"
                label={{
                  value: evt.label,
                  position: 'insideTopRight',
                  fill: '#ffffff40',
                  fontSize: 8,
                  dy: i % 2 === 0 ? -4 : 12, // stagger labels in same year
                }}
              />
            ))}

            {/* Actual lines */}
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

            {/* Counterfactual lines (shown when events are toggled OFF) */}
            {hasCounterfactual && (
              <>
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey={cfFraudKey}
                  name="Fraud (counterfactual)"
                  stroke="#06b6d4"
                  strokeWidth={1.5}
                  strokeDasharray="6 3"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey={cfWasteKey}
                  name="Waste (counterfactual)"
                  stroke="#0ea5e9"
                  strokeWidth={1.5}
                  strokeDasharray="6 3"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey={cfCombinedKey}
                  name="Combined (counterfactual)"
                  stroke="#38bdf8"
                  strokeWidth={1.5}
                  strokeDasharray="8 3"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </>
            )}

            {/* Federal budget overlay */}
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

            <Brush
              dataKey="year"
              height={24}
              stroke="#333"
              fill="#0a0a0f"
              travellerWidth={8}
              startIndex={brushStartIdx}
              endIndex={brushEndIdx}
              tickFormatter={v => `FY${v}`}
              onChange={range => {
                if (range?.startIndex !== undefined && range?.endIndex !== undefined) {
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

      {/* Data density note */}
      <p className="text-[10px] text-white/30 text-center">
        Drag the brush to filter the global year range. Multi-year entries use COVID-weighted
        distribution for 2020–2022 spans; others use an even split. Counterfactual lines appear
        when spending events are toggled off above.
      </p>
    </div>
  );
}
