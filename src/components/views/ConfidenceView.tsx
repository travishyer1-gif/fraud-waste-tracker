import { ConfidenceExplorer } from '@/components/charts/ConfidenceExplorer';

export function ConfidenceView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white">Confidence Explorer</h2>
        <p className="text-sm text-white/50 mt-1 max-w-2xl">
          How certain are we? This chart stacks evidence by confidence tier across fiscal years.
          Tier 1 (green) is confirmed government data. Tier 4 (orange) is reported or think-tank
          figures. The taller the green, the harder the numbers.
        </p>
      </div>

      {/* Tier legend chips */}
      <div className="flex flex-wrap gap-2">
        {([
          { tier: 1, label: 'Confirmed', color: '#22c55e', desc: 'Official agency data' },
          { tier: 2, label: 'Estimated', color: '#3b82f6', desc: 'GAO/IG methodology' },
          { tier: 3, label: 'Researched', color: '#f59e0b', desc: 'Academic / think-tank' },
          { tier: 4, label: 'Reported', color: '#f97316', desc: 'Media / advocacy' },
        ] as const).map(item => (
          <div
            key={item.tier}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border"
            style={{ borderColor: `${item.color}40`, backgroundColor: `${item.color}10` }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span style={{ color: item.color }} className="font-medium">{item.label}</span>
            <span className="text-white/30">— {item.desc}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <ConfidenceExplorer />
      </div>

      {/* Methodology note */}
      <p className="text-[10px] text-white/25 leading-relaxed">
        ⚠️ Multi-year entries are distributed evenly across covered fiscal years. Cumulative
        entries are excluded. Amounts reflect best-estimate figures and must not be summed without
        consulting the Double Counting Matrix.
      </p>
    </div>
  );
}
