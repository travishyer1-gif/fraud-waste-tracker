'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, DollarSign, BarChart2, Award } from 'lucide-react';
import { useEvidenceData } from '@/hooks/useEvidenceData';
import { FEDERAL_BUDGET, CATEGORY_LABELS } from '@/lib/constants';
import { formatBudgetAmount } from '@/data/budget-by-function';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color?: string;
  index: number;
}

function MetricCard({ icon, label, value, sub, color = '#6366f1', index }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
      className="glass-card p-4 flex items-start gap-3"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}20`, color }}
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

    // Aggregate fraud + waste for selected year
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

    // Largest fraud/waste category
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
      totalFraudWaste,
      fraudWastePct,
      topCatLabel,
      topCatAmount: topCat ? topCat[1] : 0,
    };
  }, [entries, selectedYear]);

  const cards = [
    {
      icon: <DollarSign className="w-4.5 h-4.5" />,
      label: `FY${selectedYear} Total Budget`,
      value: formatBudgetAmount(metrics.budget),
      sub: 'Federal outlays',
      color: '#6366f1',
    },
    {
      icon: <TrendingUp className="w-4.5 h-4.5" />,
      label: 'YoY Budget Growth',
      value: `${metrics.yoyGrowth >= 0 ? '+' : ''}${metrics.yoyGrowth.toFixed(1)}%`,
      sub: `vs FY${selectedYear - 1}`,
      color: metrics.yoyGrowth >= 0 ? '#22c55e' : '#ef4444',
    },
    {
      icon: <AlertTriangle className="w-4.5 h-4.5" />,
      label: 'Est. Fraud + Waste',
      value: formatBudgetAmount(metrics.totalFraudWaste),
      sub: `${metrics.fraudWastePct}% of FY${selectedYear} budget`,
      color: '#ef4444',
    },
    {
      icon: <BarChart2 className="w-4.5 h-4.5" />,
      label: 'Fraud+Waste / Budget',
      value: `${metrics.fraudWastePct}%`,
      sub: 'Best-estimate entries only',
      color: '#f59e0b',
    },
    {
      icon: <Award className="w-4.5 h-4.5" />,
      label: 'Largest Category',
      value: metrics.topCatLabel,
      sub: metrics.topCatAmount > 0 ? formatBudgetAmount(metrics.topCatAmount) : 'No data',
      color: '#8b5cf6',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((card, i) => (
        <MetricCard key={card.label} {...card} index={i} />
      ))}
    </div>
  );
}
