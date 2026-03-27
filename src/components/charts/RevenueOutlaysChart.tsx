'use client';

import { useMemo, useEffect, useState } from 'react';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { useReducedMotion } from 'framer-motion';
import { useIsMobile, useIsTablet } from '@/hooks/useMediaQuery';
import { FEDERAL_BUDGET, FEDERAL_REVENUE } from '@/lib/constants';
import { formatCompact } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RevenueOutlaysDataPoint {
  year: number;
  revenue: number;
  outlays: number;
  deficit: number;
  deficitPctOutlays: number;
}

export interface RevenueOutlaysChartProps {
  /** Optional: override animation duration (ms). Default 600. */
  animationDuration?: number;
  /** Optional: sync with other budget charts. Default "budget". */
  syncId?: string;
}

// ─── Fiscal event annotations (desktop only) ─────────────────────────────────

const FISCAL_EVENTS = [
  { year: 2009, label: '2008 Crisis', dyOffset: -4 },
  { year: 2017, label: 'TCJA',        dyOffset: 14 },
  { year: 2020, label: 'COVID',       dyOffset: -4 },
  { year: 2021, label: 'ARP',         dyOffset: 14 },
] as const;

// ─── Stat callout ─────────────────────────────────────────────────────────────

function StatCallout({ year, deficitTrillions }: { year: number; deficitTrillions: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(prefersReducedMotion ? deficitTrillions : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(deficitTrillions);
      return;
    }
    const duration = 800;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(deficitTrillions * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [deficitTrillions, prefersReducedMotion]);

  const formatted = displayed >= 1
    ? `$${displayed.toFixed(1)}T`
    : `$${(displayed * 1000).toFixed(0)}B`;

  return (
    <div className="text-right shrink-0">
      <div
        className="text-2xl sm:text-3xl font-bold font-mono text-red-400 leading-none tabular-nums"
        aria-live="polite"
      >
        {formatted}
      </div>
      <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">
        Deficit in FY{year}
      </div>
    </div>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>;

interface TooltipProps {
  active?: boolean;
  payload?: ReadonlyArray<AnyRecord>;
  label?: number;
  isMobile?: boolean;
}

function RevenueTooltip({ active, payload, label, isMobile }: TooltipProps) {
  if (!active || !payload?.length) return null;

  const revenueVal = (payload.find(p => p.dataKey === 'revenue')?.value as number) ?? 0;
  const outlaysVal = (payload.find(p => p.dataKey === 'outlays')?.value as number) ?? 0;
  const deficit = revenueVal - outlaysVal;
  const isDeficit = deficit < 0;
  const deficitPct = outlaysVal > 0
    ? (Math.abs(deficit) / outlaysVal * 100).toFixed(1)
    : '0';

  const style = {
    background: 'rgba(24,24,27,0.95)',
    border: '1px solid rgba(248,113,113,0.25)',
    borderRadius: 8,
    padding: '8px 12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
  };

  if (isMobile) {
    return (
      <div style={style} className="min-w-[120px] text-xs">
        <p className="text-white/60 font-semibold mb-1">FY{label}</p>
        <p className={`font-mono font-bold ${isDeficit ? 'text-red-400' : 'text-emerald-400'}`}>
          {isDeficit
            ? `($${Math.abs(deficit).toFixed(2)}T)`
            : `+$${Math.abs(deficit).toFixed(2)}T`}
        </p>
      </div>
    );
  }

  return (
    <div style={style} className="min-w-[210px] text-xs">
      <p className="text-white/60 uppercase tracking-wider font-semibold mb-2">FY{label}</p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#38bdf8' }} />
            <span className="text-white/60">Revenue</span>
          </div>
          <span className="font-mono text-sky-400">${revenueVal.toFixed(2)}T</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f87171' }} />
            <span className="text-white/60">Outlays</span>
          </div>
          <span className="font-mono text-red-400">${outlaysVal.toFixed(2)}T</span>
        </div>
        <div className="pt-1 mt-1 border-t border-white/10 flex items-center justify-between gap-4">
          <span className={`font-medium ${isDeficit ? 'text-red-400' : 'text-emerald-400'}`}>
            {isDeficit ? 'Deficit' : 'Surplus'}
          </span>
          <div className="text-right">
            <span className={`font-mono font-bold ${isDeficit ? 'text-red-400' : 'text-emerald-400'}`}>
              {isDeficit
                ? `($${Math.abs(deficit).toFixed(2)}T)`
                : `$${Math.abs(deficit).toFixed(2)}T`}
            </span>
            <span className="text-white/40 font-mono ml-2 text-[10px]">
              {deficitPct}% of outlays
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────

function ChartLegend() {
  return (
    <div className="flex items-center gap-4 text-xs text-white/50 flex-wrap">
      <div className="flex items-center gap-1.5">
        <div className="w-8 h-0.5 rounded" style={{ backgroundColor: '#38bdf8' }} />
        <span>Revenue</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-8 h-0.5 rounded" style={{ backgroundColor: '#f87171' }} />
        <span>Outlays</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className="w-4 h-3 rounded-sm border"
          style={{
            backgroundColor: 'rgba(248,113,113,0.2)',
            borderColor: 'rgba(248,113,113,0.3)',
          }}
        />
        <span>Deficit gap</span>
      </div>
    </div>
  );
}

// ─── Narrative bridge ─────────────────────────────────────────────────────────

function NarrativeBridge({
  deficitTrillions,
  year,
}: {
  deficitTrillions: number;
  year: number;
}) {
  const formatted = deficitTrillions >= 1
    ? `$${deficitTrillions.toFixed(1)}T`
    : `$${(deficitTrillions * 1000).toFixed(0)}B`;

  return (
    <div className="flex items-start gap-3 pt-3 border-t border-white/[0.06]">
      <div
        className="w-0.5 shrink-0 mt-0.5 rounded-full"
        style={{
          minHeight: 36,
          background: 'linear-gradient(to bottom, rgba(248,113,113,0.6), transparent)',
        }}
      />
      <p className="text-xs text-white/50 leading-relaxed">
        In FY{year}, the U.S. spent{' '}
        <span className="text-red-400/80 font-medium">{formatted} more than it collected</span>.
        The charts below break down how much of that spending was lost to fraud and waste before
        reaching its intended purpose.
      </p>
    </div>
  );
}

// ─── Main chart ───────────────────────────────────────────────────────────────

export function RevenueOutlaysChart({
  animationDuration = 600,
  syncId = 'budget',
}: RevenueOutlaysChartProps) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const prefersReducedMotion = useReducedMotion();

  const chartData = useMemo<RevenueOutlaysDataPoint[]>(() => {
    return Object.keys(FEDERAL_BUDGET)
      .map(Number)
      .sort((a, b) => a - b)
      .map(year => {
        const outlaysRaw = FEDERAL_BUDGET[year] ?? 0;
        const revenueRaw = FEDERAL_REVENUE[year] ?? 0;
        const deficitRaw = revenueRaw - outlaysRaw;
        return {
          year,
          revenue: revenueRaw / 1e12,
          outlays: outlaysRaw / 1e12,
          deficit: deficitRaw / 1e12,
          deficitPctOutlays: outlaysRaw > 0 ? Math.abs(deficitRaw / outlaysRaw) * 100 : 0,
        };
      });
  }, []);

  const latestData = chartData[chartData.length - 1];
  const latestYear = latestData?.year ?? 2025;
  const latestDeficit = latestData?.deficit ?? 0; // negative trillions

  const chartHeight = isMobile ? 240 : isTablet ? 320 : 420;
  const showAnnotations = !isMobile && !isTablet;
  const xInterval = isMobile ? 5 : isTablet ? 3 : 2;
  const xTickFormatter = isMobile
    ? (v: number) => `'${String(v).slice(2)}`
    : (v: number) => `FY${v}`;
  const yTickCount = isMobile ? 4 : isTablet ? 5 : 6;
  const yWidth = isMobile ? 42 : 50;
  const animDuration = prefersReducedMotion ? 0 : animationDuration;

  // The mask fill must match the glass-card computed background.
  // glass-card = rgba(255,255,255,0.03) over hsl(240 10% 4%) ≈ #09090b
  const MASK_COLOR = '#09090b';

  return (
    <>
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-sm font-semibold text-foreground">The Fiscal Gap</h3>
          <p className="text-xs text-muted-foreground">
            Federal revenue vs. outlays — FY2003–2025
          </p>
        </div>
        <StatCallout year={latestYear} deficitTrillions={Math.abs(latestDeficit)} />
      </div>

      {/* Chart */}
      <div
        className="w-full"
        style={{ height: chartHeight, touchAction: 'pan-y' }}
        role="img"
        aria-label={`Line chart: federal revenue vs outlays FY2003–${latestYear}. FY${latestYear} deficit: ${formatCompact(Math.abs(latestDeficit * 1e12))}.`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            syncId={syncId}
            margin={{
              top: showAnnotations ? 24 : 10,
              right: 10,
              left: isMobile ? 4 : 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="deficitFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#f87171" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0.04} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />

            <XAxis
              dataKey="year"
              tick={{ fontSize: isMobile ? 10 : 11, fill: 'rgba(255,255,255,0.5)' }}
              axisLine={false}
              tickLine={false}
              interval={xInterval}
              tickFormatter={xTickFormatter}
            />

            <YAxis
              tickFormatter={(v: number) => `$${v.toFixed(1)}T`}
              tick={{ fontSize: isMobile ? 10 : 11, fill: 'rgba(255,255,255,0.5)' }}
              axisLine={false}
              tickLine={false}
              width={yWidth}
              tickCount={yTickCount}
              domain={[0, showAnnotations ? 'dataMax + 0.6' : 'dataMax + 0.3']}
            />

            <Tooltip
              content={(props: AnyRecord) => (
                <RevenueTooltip
                  active={props.active}
                  payload={props.payload}
                  label={props.label}
                  isMobile={isMobile}
                />
              )}
              cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }}
            />

            {/* Step 1: Deficit fill (red gradient from 0 to outlays) */}
            <Area
              type="monotone"
              dataKey="outlays"
              fill="url(#deficitFill)"
              fillOpacity={1}
              stroke="none"
              legendType="none"
              isAnimationActive={false}
              activeDot={false}
              dot={false}
            />

            {/* Step 2: Revenue mask — solid bg color, erases non-gap area below revenue line */}
            <Area
              type="monotone"
              dataKey="revenue"
              fill={MASK_COLOR}
              fillOpacity={1}
              stroke="none"
              legendType="none"
              isAnimationActive={false}
              activeDot={false}
              dot={false}
            />

            {/* Step 3: Crisp revenue line */}
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#38bdf8"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: '#38bdf8', stroke: MASK_COLOR, strokeWidth: 2 }}
              animationDuration={animDuration}
              animationEasing="ease-out"
            />

            {/* Step 4: Crisp outlays line */}
            <Line
              type="monotone"
              dataKey="outlays"
              name="Outlays"
              stroke="#f87171"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: '#f87171', stroke: MASK_COLOR, strokeWidth: 2 }}
              animationDuration={animDuration}
              animationEasing="ease-out"
            />

            {/* Fiscal event annotations — desktop only */}
            {showAnnotations && FISCAL_EVENTS.map(evt => (
              <ReferenceLine
                key={evt.year}
                x={evt.year}
                stroke="rgba(255,255,255,0.15)"
                strokeDasharray="4 3"
                label={{
                  value: evt.label,
                  position: 'insideTopRight',
                  fill: 'rgba(255,255,255,0.45)',
                  fontSize: 9,
                  dy: evt.dyOffset,
                }}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <ChartLegend />

      {/* Narrative bridge — connects to fraud/waste charts below */}
      {!isMobile && (
        <NarrativeBridge
          deficitTrillions={Math.abs(latestDeficit)}
          year={latestYear}
        />
      )}
    </>
  );
}
