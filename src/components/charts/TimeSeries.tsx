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
import { useIsMobile } from '@/hooks/useMediaQuery';
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
 * Per-event leakage rates: fraction of authorised spend that became fraud/waste.
 * COVID-era programs used higher rates (10-15%) based on known improper payment
 * investigations. Non-COVID programs use the baseline ~4% (paymentaccuracy.gov).
 * Policy-only events (no direct spending) use 0.
 */
export const EVENT_LEAKAGE_RATES: Record<string, number> = {
  'CARES Act ($2.2T)': 0.12,
  'PPP/EIDL Loans': 0.15,
  'American Rescue Plan ($1.9T)': 0.10,
  'Infrastructure Act ($1.2T)': 0.04,
  'Inflation Reduction Act ($891B)': 0.04,
  'CHIPS Act ($280B)': 0.04,
  'TARP ($700B)': 0.01, // TARP mostly recovered
  'ARRA Stimulus ($831B)': 0.025,
  'Bipartisan Budget Act ($300B)': 0.04,
  'ACA Signed': 0, // No direct spending package
  'Sequestration Cuts': 0, // Cuts, not spending
  'Tax Cuts & Jobs Act': 0, // Revenue, not spending
};

interface CounterfactualResult {
  cfRows: ReturnType<typeof buildTypeTimeSeriesData>;
  cfBudget: Record<number, number>;
}

/**
 * Build a "what-if" version of the data by removing a set of spending events.
 *
 * For each disabled event:
 *  1. Subtract the event's authorised amount from the federal budget for that year
 *     (showing what the budget would have been without this spending).
 *  2. Subtract (amount × leakage rate) from fraud/waste totals for that year,
 *     using program-specific leakage rates rather than a flat proxy.
 */
function buildCounterfactualData(
  baseData: ReturnType<typeof buildTypeTimeSeriesData>,
  disabledEvents: SpendingEvent[],
): CounterfactualResult {
  // Clone base budget so we can adjust per event
  const cfBudget: Record<number, number> = { ...FEDERAL_BUDGET };

  if (disabledEvents.length === 0) {
    return { cfRows: baseData, cfBudget };
  }

  // Subtract event amounts from the federal budget for the event year
  disabledEvents.forEach(evt => {
    if (evt.amount === 0) return;
    if (cfBudget[evt.year] !== undefined) {
      cfBudget[evt.year] = Math.max(0, cfBudget[evt.year] - evt.amount);
    }
  });

  // Build adjusted fraud/waste rows using per-event leakage rates
  const cfRows = baseData.map(row => {
    let fraudAdjust = 0;
    let wasteAdjust = 0;

    disabledEvents.forEach(evt => {
      if (evt.amount === 0 || evt.year !== row.year) return;
      const leakageRate = EVENT_LEAKAGE_RATES[evt.label] ?? 0.04;
      const leakage = evt.amount * leakageRate;
      // Split leakage equally between fraud and waste (conservative)
      fraudAdjust += leakage * 0.5;
      wasteAdjust += leakage * 0.5;
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

  return { cfRows, cfBudget };
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label, isMobile }: any) {
  if (!active || !payload || payload.length === 0) return null;

  // On mobile: simplified — just year + total combined
  if (isMobile) {
    const combinedEntry = payload.find((p: any) => String(p.dataKey).includes('combined') && !String(p.dataKey).includes('cf'));
    const total = combinedEntry?.value ?? payload.reduce((s: number, p: any) => s + (typeof p.value === 'number' ? p.value : 0), 0);
    return (
      <div className="rounded-xl border border-white/10 bg-black/80 backdrop-blur-md p-2.5 shadow-2xl min-w-[130px]">
        <p className="text-xs text-white/60 mb-1 font-semibold">FY{label}</p>
        <p className="font-mono text-white font-bold text-sm">{typeof total === 'number' ? formatCompact(total) : '—'}</p>
      </div>
    );
  }

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
  const isMobile = useIsMobile();

  const [showBudget, setShowBudget] = useState(false);
  const [localShowAsPct, setLocalShowAsPct] = useState(false);

  // External prop overrides local toggle if provided
  const showAsPct = externalShowAsPct ?? localShowAsPct;

  // Responsive chart height
  const chartHeight = isMobile ? 300 : 420;

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
  const { cfRows: counterfactualBase, cfBudget } = useMemo(
    () => buildCounterfactualData(baseData, disabledEvents),
    [baseData, disabledEvents],
  );

  const hasCounterfactual = disabledEvents.some(e => e.amount > 0);

  // Merge base + counterfactual into a single chartData array
  const chartData = useMemo(() => {
    return baseData.map((d, idx) => {
      const budget = FEDERAL_BUDGET[d.year] ?? null;
      const cfBudgetVal = cfBudget[d.year] ?? null;
      const cf = counterfactualBase[idx];
      return {
        ...d,
        budget,
        cfBudget: cfBudgetVal,
        fraudPct: budget ? (d.fraud / budget) * 100 : null,
        wastePct: budget ? (d.waste / budget) * 100 : null,
        combinedPct: budget ? (d.combined / budget) * 100 : null,
        // Counterfactual keys
        cfFraud: cf.fraud,
        cfWaste: cf.waste,
        cfCombined: cf.combined,
        cfFraudPct: cfBudgetVal ? (cf.fraud / cfBudgetVal) * 100 : null,
        cfWastePct: cfBudgetVal ? (cf.waste / cfBudgetVal) * 100 : null,
        cfCombinedPct: cfBudgetVal ? (cf.combined / cfBudgetVal) * 100 : null,
      };
    });
  }, [baseData, counterfactualBase, cfBudget]);

  const fraudKey = showAsPct ? 'fraudPct' : 'fraud';
  const wasteKey = showAsPct ? 'wastePct' : 'waste';
  const combinedKey = showAsPct ? 'combinedPct' : 'combined';
  const cfFraudKey = showAsPct ? 'cfFraudPct' : 'cfFraud';
  const cfWasteKey = showAsPct ? 'cfWastePct' : 'cfWaste';
  const cfCombinedKey = showAsPct ? 'cfCombinedPct' : 'cfCombined';
  // cfBudget key — only shown on right axis in absolute mode when showBudget is active
  const cfBudgetKey = 'cfBudget';

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

  // X-axis tick formatter: abbreviate years on mobile
  const xTickFormatter = isMobile
    ? (v: number) => `'${String(v).slice(2)}`
    : (v: number) => `FY${v}`;

  // Y-axis tick count: fewer on mobile
  const yTickCount = isMobile ? 3 : 6;

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
            {isMobile ? 'Budget' : 'Federal budget context'}
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
            As % of budget
          </label>
        </div>
      )}

      {/* Chart */}
      <div
        className="min-h-[300px] w-full"
        style={{ touchAction: 'pan-y' }}
      >
        <ResponsiveContainer width="100%" height={chartHeight}>
          <ComposedChart
            data={chartData}
            margin={{
              top: 10,
              right: showBudget && !showAsPct ? 70 : 20,
              left: isMobile ? 10 : 20,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis
              dataKey="year"
              tickFormatter={xTickFormatter}
              tick={{ fill: '#888', fontSize: isMobile ? 10 : 11 }}
              axisLine={false}
              tickLine={false}
              angle={isMobile ? -45 : 0}
              textAnchor={isMobile ? 'end' : 'middle'}
            />
            <YAxis
              yAxisId="left"
              tickFormatter={yTickFormatter}
              tickCount={yTickCount}
              tick={{ fill: '#888', fontSize: isMobile ? 10 : 11 }}
              axisLine={false}
              tickLine={false}
              width={isMobile ? 50 : 65}
            />
            {showBudget && !showAsPct && (
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={v => formatCompact(v)}
                tickCount={yTickCount}
                tick={{ fill: '#555', fontSize: isMobile ? 10 : 11 }}
                axisLine={false}
                tickLine={false}
                width={isMobile ? 45 : 65}
              />
            )}

            <Tooltip content={(props) => <CustomTooltip {...props} isMobile={isMobile} />} />
            {!isMobile && <Legend wrapperStyle={{ paddingTop: 8, fontSize: 11 }} />}

            {/* Reference lines for ENABLED spending events — hide on mobile */}
            {!isMobile && visibleEvents.map((evt, i) => (
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

            {/* Counterfactual budget line (shown when events are toggled OFF and showBudget is on) */}
            {showBudget && !showAsPct && hasCounterfactual && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey={cfBudgetKey}
                name="Fed. Budget (counterfactual)"
                stroke="#94a3b8"
                strokeWidth={1.5}
                strokeDasharray="6 3"
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

      {/* Counterfactual explainer */}
      {hasCounterfactual && (
        <p className="text-[11px] text-cyan-400/70 leading-relaxed rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-2">
          <span className="font-semibold text-cyan-300">Counterfactual estimate:</span> removes{' '}
          {disabledEvents
            .filter(e => e.amount > 0)
            .map(e => e.label)
            .join(', ')}{' '}
          spending from the federal budget and subtracts estimated fraud/waste using
          program-specific leakage rates (COVID: 10–15%, baseline: 4%). Enable{' '}
          <em>Federal budget context</em> above to see the counterfactual budget line.
        </p>
      )}

      {/* Data density note */}
      <p className="text-[10px] text-white/30 text-center">
        Drag the brush to filter the global year range. Multi-year entries use COVID-weighted
        distribution for 2020–2022 spans; others use an even split. Counterfactual lines appear
        when spending events are toggled off above.
      </p>
    </div>
  );
}
