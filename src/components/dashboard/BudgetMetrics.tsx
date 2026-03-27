'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, DollarSign, BarChart2, Award } from 'lucide-react';
import { useEvidenceData } from '@/hooks/useEvidenceData';
import { FEDERAL_BUDGET, CATEGORY_LABELS } from '@/lib/constants';
import { formatBudgetAmount } from '@/data/budget-by-function';

// ── Primary cards (Fraud Total / Waste Total) ─────────────────────────────────
interface PrimaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accentColor: string;
  borderColor: string;
  index: number;
}

function PrimaryCard({ icon, label, value, sub, accentColor, borderColor, index }: PrimaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15, delay: index * 0.06, ease: 'easeOut' }}
      className="glass-card p-5 flex items-start gap-3"
      style={{ borderLeft: `2px solid ${borderColor}` }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accentColor}25`, color: accentColor }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">{label}</p>
        <p className="text-4xl font-mono font-bold leading-tight" style={{ color: accentColor }}>
          {value}
        </p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </div>
    </motion.div>
  );
}

// ── Secondary cards (supporting metrics) ─────────────────────────────────────
interface SecondaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color?: string;
  index: number;
}

function SecondaryCard({ icon, label, value, sub, color = '#6366f1', index }: SecondaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15, delay: index * 0.06, ease: 'easeOut' }}
      className="glass-card p-4 flex items-start gap-3 opacity-85"
    >
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}18`, color }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">{label}</p>
        <p className="text-xl font-mono font-bold text-foreground leading-tight">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </motion.div>
  );
}

interface BudgetMetricsProps {
  selectedYear?: number;
}

export function BudgetMetrics({ selectedYear = 2025 }: BudgetMetricsProps) {
  const { entries } = useEvidenceData();

  const metrics = useMemo(() => {
    const budget = FEDERAL_BUDGET[selectedYear] ?? 0;
    const prevBudget = FEDERAL_BUDGET[selectedYear - 1] ?? 0;
    const yoyGrowth = prevBudget > 0 ? ((budget - prevBudget) / prevBudget) * 100 : 0;

    const yearEntries = entries.filter(e => {
      if (!e.safeToSum) return false;
      const start = e.fiscalYearStart ?? selectedYear;
      const end = e.fiscalYearEnd ?? start;
      return start <= selectedYear && end >= selectedYear;
    });

    const fraudTotal = yearEntries
      .filter(e => e.type === 'fraud')
      .reduce((sum, e) => sum + (e.amountBest ?? 0), 0);

    const wasteTotal = yearEntries
      .filter(e => e.type === 'waste')
      .reduce((sum, e) => sum + (e.amountBest ?? 0), 0);

    const totalFraudWaste = fraudTotal + wasteTotal;
    const fraudWastePct = budget > 0 ? ((totalFraudWaste / budget) * 100).toFixed(2) : '0.00';

    const catTotals: Record<string, number> = {};
    for (const e of yearEntries) {
      if (!catTotals[e.category]) catTotals[e.category] = 0;
      catTotals[e.category] += e.amountBest ?? 0;
    }
    const topCat = Object.entries(catTotals).sort(([, a], [, b]) => b - a)[0];
    const topCatLabel = topCat ? (CATEGORY_LABELS[topCat[0]]?.label ?? topCat[0]) : 'N/A';

    return {
      budget,
      yoyGrowth,
      fraudTotal,
      wasteTotal,
      totalFraudWaste,
      fraudWastePct,
      topCatLabel,
      topCatAmount: topCat ? topCat[1] : 0,
    };
  }, [entries, selectedYear]);

  return (
    <div className="space-y-3">
      {/* Primary row — Fraud & Waste totals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <PrimaryCard
          icon={<AlertTriangle className="w-5 h-5" />}
          label="Fraud Total"
          value={formatBudgetAmount(metrics.fraudTotal)}
          sub={`FY${selectedYear} best-estimate entries`}
          accentColor="#22c55e"
          borderColor="#22c55e"
          index={0}
        />
        <PrimaryCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Waste Total"
          value={formatBudgetAmount(metrics.wasteTotal)}
          sub={`FY${selectedYear} best-estimate entries`}
          accentColor="#f59e0b"
          borderColor="#f59e0b"
          index={1}
        />
      </div>

      {/* Secondary row — supporting metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <SecondaryCard
          icon={<TrendingUp className="w-4 h-4" />}
          label="YoY Budget Growth"
          value={`${metrics.yoyGrowth >= 0 ? '+' : ''}${metrics.yoyGrowth.toFixed(1)}%`}
          sub={`vs FY${selectedYear - 1}`}
          color={metrics.yoyGrowth >= 0 ? '#22c55e' : '#ef4444'}
          index={2}
        />
        <SecondaryCard
          icon={<BarChart2 className="w-4 h-4" />}
          label="Fraud+Waste / Budget"
          value={`${metrics.fraudWastePct}%`}
          sub="of federal outlays"
          color="#f59e0b"
          index={3}
        />
        <SecondaryCard
          icon={<Award className="w-4 h-4" />}
          label="Largest Category"
          value={metrics.topCatLabel}
          sub={metrics.topCatAmount > 0 ? formatBudgetAmount(metrics.topCatAmount) : 'No data'}
          color="#8b5cf6"
          index={4}
        />
      </div>
    </div>
  );
}
