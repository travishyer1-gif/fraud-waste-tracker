'use client';

import { useEvidenceData } from '@/hooks/useEvidenceData';
import { formatCompact } from '@/lib/utils';
import { TIER_COLORS, TYPE_COLORS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GlobalControls } from '@/components/controls/GlobalControls';

function StatCard({
  label,
  floor,
  ceiling,
  color,
}: {
  label: string;
  floor: number;
  ceiling: number;
  color: string;
}) {
  return (
    <Card className="glass-card border-0">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">{label}</span>
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
        <div className="font-mono text-lg font-bold" style={{ color }}>
          {formatCompact(floor)}–{formatCompact(ceiling)}
        </div>
        <div className="text-[10px] text-muted-foreground mt-0.5">per year</div>
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const { filteredEntries, summaryStats, filteredStats, metadata } = useEvidenceData();

  const tierBreakdown = Object.entries(summaryStats.tierCounts).map(([tier, count]) => ({
    tier: Number(tier),
    count,
    info: TIER_COLORS[Number(tier) as keyof typeof TIER_COLORS],
  }));

  const categoryBreakdown = filteredEntries.reduce<Record<string, { count: number; type: string }>>((acc, e) => {
    if (!acc[e.category]) acc[e.category] = { count: 0, type: e.type };
    acc[e.category].count++;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Top summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <StatCard
          label="Annual Fraud Estimate"
          floor={summaryStats.fraudFloorAnnual}
          ceiling={summaryStats.fraudCeilingAnnual}
          color={TYPE_COLORS.fraud}
        />
        <StatCard
          label="Annual Waste Estimate"
          floor={summaryStats.wasteFloorAnnual}
          ceiling={summaryStats.wasteCeilingAnnual}
          color={TYPE_COLORS.waste}
        />
        <StatCard
          label="Combined Floor/Ceiling"
          floor={summaryStats.combinedFloor}
          ceiling={summaryStats.combinedCeiling}
          color="#a855f7"
        />
      </div>

      {/* Filters + data grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
        {/* Sidebar controls */}
        <div className="space-y-4">
          <GlobalControls />

          {/* Tier legend */}
          <Card className="glass-card border-0">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">
                Confidence Tiers
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4 space-y-1.5">
              {tierBreakdown.map(({ tier, count, info }) => (
                <div key={tier} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: info?.bg ?? '#6b7280' }}
                    />
                    <span className="text-muted-foreground">
                      {info?.icon} {info?.label ?? `Tier ${tier}`}
                    </span>
                  </div>
                  <span className="font-mono text-foreground">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="space-y-4">
          {/* Filter summary */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {filteredStats.totalFiltered} / {metadata.totalEntries} entries
            </Badge>
            <Badge variant="outline" className="text-xs text-red-400 border-red-500/30">
              {filteredStats.fraudCount} fraud
            </Badge>
            <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-500/30">
              {filteredStats.wasteCount} waste
            </Badge>
          </div>

          {/* Entry list preview */}
          <div className="space-y-2">
            {filteredEntries.slice(0, 20).map(entry => (
              <div
                key={entry.id}
                className="glass-card p-3 flex items-start justify-between gap-3 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className="text-[10px] h-4 px-1.5 shrink-0"
                      style={{
                        borderColor: entry.type === 'fraud' ? '#ef4444' : '#f59e0b',
                        color: entry.type === 'fraud' ? '#ef4444' : '#f59e0b',
                      }}
                    >
                      {entry.id}
                    </Badge>
                    <span
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: `${TIER_COLORS[entry.certaintyTier as keyof typeof TIER_COLORS]?.bg ?? '#6b7280'}20`,
                        color: TIER_COLORS[entry.certaintyTier as keyof typeof TIER_COLORS]?.bg ?? '#6b7280',
                      }}
                    >
                      Tier {entry.certaintyTier}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-snug line-clamp-1">
                    {entry.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {entry.sourceName}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div
                    className="text-sm font-mono font-bold"
                    style={{ color: entry.type === 'fraud' ? '#ef4444' : '#f59e0b' }}
                  >
                    {entry.amountBest ? formatCompact(entry.amountBest) : '—'}
                  </div>
                  {entry.fiscalYearStart && (
                    <div className="text-[10px] text-muted-foreground">
                      FY{entry.fiscalYearStart}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {filteredEntries.length > 20 && (
              <div className="text-center text-xs text-muted-foreground py-2">
                +{filteredEntries.length - 20} more entries — use Evidence Table for full view
              </div>
            )}
            {filteredEntries.length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-8">
                No entries match current filters.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <Card className="glass-card border-0">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">
            Category Breakdown (Filtered)
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {Object.entries(categoryBreakdown)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([cat, { count, type }]) => (
                <div
                  key={cat}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/50"
                >
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-1.5 h-4 rounded-full"
                      style={{ backgroundColor: type === 'fraud' ? '#ef4444' : '#f59e0b' }}
                    />
                    <span className="text-xs font-mono">{cat}</span>
                  </div>
                  <span className="text-xs font-bold text-foreground">{count}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Data disclaimer */}
      <div className="text-[10px] text-muted-foreground/60 text-center pb-2 leading-relaxed max-w-2xl mx-auto">
        ⚠️ Figures in this dataset must not be added together without consulting the Double Counting Matrix.
        Many entries overlap or represent subsets of other entries.
        Sources: GAO, HHS OIG, DOJ, CBO, PRAC, paymentaccuracy.gov, and independent research organizations.
      </div>
    </div>
  );
}
