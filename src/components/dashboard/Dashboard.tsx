'use client';

import { useMemo, useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useEvidenceData } from '@/hooks/useEvidenceData';
import { formatCompact } from '@/lib/utils';
import { TIER_COLORS, CATEGORY_LABELS, FEDERAL_BUDGET, formatAsPercent } from '@/lib/constants';
import { GlobalControls } from '@/components/controls/GlobalControls';
import { InfoTooltip } from '@/components/ui/InfoTooltip';
import { useFilters } from '@/context/FilterContext';

// ─── Animated number counter using RAF ────────────────────────────────────────
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = to;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    let startTime: number | null = null;
    const duration = 450;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value]);

  return <>{formatCompact(display)}</>;
}

// ─── Stagger animation variants ───────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// ─── Mini donut via SVG ───────────────────────────────────────────────────────
function TierDonut({ counts }: { counts: Record<number, number> }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const r = 28;
  const cx = 36;
  const cy = 36;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  const segments = ([1, 2, 3, 4] as const).map((tier) => {
    const count = counts[tier] ?? 0;
    const pct = count / total;
    const len = pct * circumference;
    const seg = { tier, count, pct, len, offset };
    offset += len;
    return seg;
  });

  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      {segments.map(({ tier, len, offset: off }) => (
        <circle
          key={tier}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={TIER_COLORS[tier].bg}
          strokeWidth="10"
          strokeDasharray={`${len} ${circumference - len}`}
          strokeDashoffset={-off + circumference * 0.25}
          opacity={0.85}
        />
      ))}
    </svg>
  );
}

// ─── Category row ────────────────────────────────────────────────────────────
function CategoryRow({
  catKey,
  amount,
  minTier,
  maxAmount,
  showAsPercent,
  refYear,
}: {
  catKey: string;
  amount: number;
  minTier: number;
  maxAmount: number;
  showAsPercent?: boolean;
  refYear?: number;
}) {
  const label = CATEGORY_LABELS[catKey]?.label ?? catKey;
  const tierColor =
    minTier >= 1 && minTier <= 4
      ? TIER_COLORS[minTier as keyof typeof TIER_COLORS].bg
      : '#6b7280';
  const barPct = maxAmount > 0 ? (amount / maxAmount) * 100 : 0;

  const displayAmount =
    amount > 0
      ? showAsPercent
        ? formatAsPercent(amount, refYear)
        : formatCompact(amount)
      : '—';

  return (
    <div className="flex items-center gap-2 py-1.5">
      <div
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: tierColor }}
      />
      <span className="text-xs text-muted-foreground w-28 truncate">{label}</span>
      <span className="text-xs font-mono font-semibold text-foreground w-20 text-right shrink-0">
        {displayAmount}
      </span>
      <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${barPct}%`, backgroundColor: tierColor, opacity: 0.7 }}
        />
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export function Dashboard() {
  const { filteredEntries, filteredStats } = useEvidenceData();
  const { filters } = useFilters();

  // Derived from filtered entries
  const {
    filteredFloor,
    filteredCeiling,
    fraudTotal,
    wasteTotal,
    tierAmounts,
    tierCounts,
    totalTierAmount,
    fraudCategories,
    wasteCategories,
    maxFraudAmount,
    maxWasteAmount,
  } = useMemo(() => {
    let fraudTotal = 0;
    let wasteTotal = 0;
    const tierAmounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
    const tierCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
    const catData: Record<
      string,
      { amount: number; minTier: number; count: number }
    > = {};

    for (const e of filteredEntries) {
      const amt = e.amountBest ?? 0;
      if (e.type === 'fraud') fraudTotal += amt;
      if (e.type === 'waste') wasteTotal += amt;

      const tier = e.certaintyTier ?? 4;
      if (tier >= 1 && tier <= 4) {
        tierAmounts[tier] = (tierAmounts[tier] ?? 0) + amt;
        tierCounts[tier] = (tierCounts[tier] ?? 0) + 1;
      }

      if (!catData[e.category]) {
        catData[e.category] = { amount: 0, minTier: 5, count: 0 };
      }
      catData[e.category].amount += amt;
      if (e.certaintyTier !== null && e.certaintyTier < catData[e.category].minTier) {
        catData[e.category].minTier = e.certaintyTier;
      }
      catData[e.category].count++;
    }

    const filteredFloor = filteredEntries.reduce(
      (s, e) => s + (e.amountLow ?? e.amountBest ?? 0),
      0
    );
    const filteredCeiling = filteredEntries.reduce(
      (s, e) => s + (e.amountHigh ?? e.amountBest ?? 0),
      0
    );

    const totalTierAmount = Object.values(tierAmounts).reduce((a, b) => a + b, 0);

    const fraudCategories = Object.entries(catData)
      .filter(([k]) => CATEGORY_LABELS[k]?.type === 'fraud')
      .sort(([a], [b]) => a.localeCompare(b));

    const wasteCategories = Object.entries(catData)
      .filter(([k]) => CATEGORY_LABELS[k]?.type === 'waste')
      .sort(([a], [b]) => a.localeCompare(b));

    const maxFraudAmount = Math.max(
      0,
      ...fraudCategories.map(([, d]) => d.amount)
    );
    const maxWasteAmount = Math.max(
      0,
      ...wasteCategories.map(([, d]) => d.amount)
    );

    return {
      filteredFloor,
      filteredCeiling,
      fraudTotal,
      wasteTotal,
      tierAmounts,
      tierCounts,
      totalTierAmount,
      fraudCategories,
      wasteCategories,
      maxFraudAmount,
      maxWasteAmount,
    };
  }, [filteredEntries]);

  return (
    <div className="space-y-6">
      {/* Layout: sidebar + main */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5">
        {/* Sidebar */}
        <aside className="space-y-4">
          <GlobalControls />
        </aside>

        {/* Main content */}
        <div className="space-y-6">
          {/* ── Hero Section ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-card p-6 space-y-4"
          >
            {(() => {
              const yearCount = filters.yearEnd - filters.yearStart + 1;
              const refYear = filters.yearEnd;
              const refBudget = FEDERAL_BUDGET[refYear] ?? Object.values(FEDERAL_BUDGET).reduce((a, b) => a + b, 0) / Object.values(FEDERAL_BUDGET).length;
              const floorPct = ((filteredFloor / refBudget) * 100).toFixed(1);
              const ceilingPct = ((filteredCeiling / refBudget) * 100).toFixed(1);
              const avgFloor = filteredFloor / yearCount;
              const avgCeiling = filteredCeiling / yearCount;
              return (
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Federal Fraud &amp; Waste — Total Estimated ({filters.yearStart}–{filters.yearEnd})
                  </p>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    {filters.showAsPercent ? (
                      <>
                        <span className="text-5xl font-mono font-extrabold leading-none" style={{ color: '#ef4444' }}>
                          {floorPct}%
                        </span>
                        <span className="text-2xl text-muted-foreground font-mono">—</span>
                        <span className="text-5xl font-mono font-extrabold leading-none" style={{ color: '#f97316' }}>
                          {ceilingPct}%
                        </span>
                        <span className="text-sm text-muted-foreground self-end pb-1">
                          of fed. budget ({refYear})
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-5xl font-mono font-extrabold leading-none" style={{ color: '#ef4444' }}>
                          <AnimatedNumber value={filteredFloor} />
                        </span>
                        <span className="text-2xl text-muted-foreground font-mono">—</span>
                        <span className="text-5xl font-mono font-extrabold leading-none" style={{ color: '#f97316' }}>
                          <AnimatedNumber value={filteredCeiling} />
                        </span>
                        <span className="text-sm text-muted-foreground self-end pb-1">
                          total estimated
                        </span>
                      </>
                    )}
                    <span className="self-end pb-1.5">
                      <InfoTooltip
                        tier={2}
                        content="This range spans all filtered entries using their low/high bounds. We sum only root-level findings — entries tagged as subsets of a larger finding are excluded from the headline to avoid double-counting. Hover individual tier badges below for confidence definitions."
                      />
                    </span>
                  </div>
                  {!filters.showAsPercent && yearCount > 1 && (
                    <p className="text-sm text-muted-foreground font-mono">
                      ~<AnimatedNumber value={avgFloor} /> — <AnimatedNumber value={avgCeiling} /> / year average
                    </p>
                  )}
                </div>
              );
            })()}

            {/* Tier breakdown bar */}
            {totalTierAmount > 0 && (
              <div className="space-y-2">
                <div className="flex h-3 rounded-full overflow-hidden gap-px">
                  {([1, 2, 3, 4] as const).map((tier) => {
                    const pct =
                      totalTierAmount > 0
                        ? ((tierAmounts[tier] ?? 0) / totalTierAmount) * 100
                        : 0;
                    if (pct < 0.5) return null;
                    return (
                      <div
                        key={tier}
                        title={`Tier ${tier}: ${TIER_COLORS[tier].label} — ${formatCompact(tierAmounts[tier] ?? 0)}`}
                        className="transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: TIER_COLORS[tier].bg,
                          opacity: 0.85,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Tier labels */}
                <div className="flex flex-wrap gap-3 text-[11px]">
                  {([1, 2, 3, 4] as const).map((tier) => {
                    const amt = tierAmounts[tier] ?? 0;
                    if (amt === 0) return null;
                    return (
                      <span key={tier} className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: TIER_COLORS[tier].bg }}
                        />
                        <span className="text-muted-foreground">
                          {TIER_COLORS[tier].label}:
                        </span>
                        <span className="font-mono font-semibold text-foreground">
                          {formatCompact(amt)}
                        </span>
                        <InfoTooltip
                          tier={tier}
                          content={`${formatCompact(amt)} across ${tierCounts[tier] ?? 0} ${TIER_COLORS[tier].label.toLowerCase()} entries (Tier ${tier}).`}
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {filteredEntries.length === 0 && (
              <p className="text-sm text-muted-foreground italic">
                No entries match current filters.
              </p>
            )}
          </motion.div>

          {/* ── Category Breakdown ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* FRAUD column */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <h3 className="text-xs font-semibold uppercase tracking-widest text-red-400">
                  Fraud
                </h3>
              </div>
              <div className="space-y-0.5">
                {(['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7'] as const).map((cat) => {
                  const d = fraudCategories.find(([k]) => k === cat);
                  return (
                    <CategoryRow
                      key={cat}
                      catKey={cat}
                      amount={d ? d[1].amount : 0}
                      minTier={d ? d[1].minTier : 5}
                      maxAmount={maxFraudAmount}
                      showAsPercent={filters.showAsPercent}
                      refYear={filters.yearEnd}
                    />
                  );
                })}
              </div>
            </motion.div>

            {/* WASTE column */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  Waste
                </h3>
              </div>
              <div className="space-y-0.5">
                {(['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'] as const).map((cat) => {
                  const d = wasteCategories.find(([k]) => k === cat);
                  return (
                    <CategoryRow
                      key={cat}
                      catKey={cat}
                      amount={d ? d[1].amount : 0}
                      minTier={d ? d[1].minTier : 5}
                      maxAmount={maxWasteAmount}
                      showAsPercent={filters.showAsPercent}
                      refYear={filters.yearEnd}
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ── Summary Cards ──────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {/* Entries card */}
            <motion.div variants={itemVariants} className="glass-card p-4 space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Entries
              </p>
              <p className="text-2xl font-mono font-bold text-foreground">
                {filteredStats.totalFiltered}
              </p>
              <p className="text-[10px] text-muted-foreground">
                of 78 total
              </p>
            </motion.div>

            {/* Fraud total card */}
            <motion.div variants={itemVariants} className="glass-card p-4 space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Fraud Total
              </p>
              <p
                className="text-2xl font-mono font-bold"
                style={{ color: '#ef4444' }}
              >
                <AnimatedNumber value={fraudTotal} />
              </p>
              <p className="text-[10px] text-muted-foreground">
                {filteredStats.fraudCount} entries
              </p>
            </motion.div>

            {/* Waste total card */}
            <motion.div variants={itemVariants} className="glass-card p-4 space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Waste Total
              </p>
              <p
                className="text-2xl font-mono font-bold"
                style={{ color: '#f59e0b' }}
              >
                <AnimatedNumber value={wasteTotal} />
              </p>
              <p className="text-[10px] text-muted-foreground">
                {filteredStats.wasteCount} entries
              </p>
            </motion.div>

            {/* Tier distribution card */}
            <motion.div variants={itemVariants} className="glass-card p-4 space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Tier Mix
              </p>
              <div className="flex items-center gap-3">
                <TierDonut counts={tierCounts} />
                <div className="space-y-0.5 text-[10px]">
                  {([1, 2, 3, 4] as const).map((t) => (
                    <div key={t} className="flex items-center gap-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: TIER_COLORS[t].bg }}
                      />
                      <span className="text-muted-foreground font-mono">
                        T{t}: {tierCounts[t] ?? 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Disclaimer */}
          <p className="text-[10px] text-muted-foreground/50 text-center leading-relaxed max-w-xl mx-auto">
            ⚠️ Figures must not be added without consulting the Double Count Matrix.
            Many entries overlap. Sources: GAO, HHS OIG, DOJ, CBO, PRAC, paymentaccuracy.gov.
          </p>
        </div>
      </div>
    </div>
  );
}
