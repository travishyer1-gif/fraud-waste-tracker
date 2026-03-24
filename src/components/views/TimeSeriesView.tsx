import { TimeSeries } from '@/components/charts/TimeSeries';

export default function TimeSeriesView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white">Time Series Trends</h2>
        <p className="text-sm text-white/50 mt-1 max-w-2xl">
          Fraud and waste estimates across FY2018–2025. COVID-era years show a significant spike
          driven by emergency spending programs. Toggle the federal budget overlay to see these
          figures as a percentage of total government outlays.
        </p>
      </div>

      {/* Legend chips */}
      <div className="flex flex-wrap gap-2">
        {([
          { color: '#ef4444', label: 'Fraud', desc: 'Intentional misappropriation' },
          { color: '#f59e0b', label: 'Waste', desc: 'Inefficiency & improper payments' },
          { color: '#e2e8f0', label: 'Combined', desc: 'Fraud + Waste (dashed)' },
        ] as const).map(item => (
          <div
            key={item.label}
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
        <TimeSeries />
      </div>

      {/* Key events context */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs font-semibold text-white mb-1">📌 FY2020 — COVID Stimulus</p>
          <p className="text-[11px] text-white/50">
            CARES Act ($2.2T) and supplemental packages drove explosive growth in improper
            payments. PUA and PPP programs alone saw hundreds of billions in fraud exposure.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs font-semibold text-white mb-1">📌 FY2021 — Peak Pandemic Spending</p>
          <p className="text-[11px] text-white/50">
            American Rescue Plan added $1.9T. UI fraud peaked. SBA COVID EIDL/PPP fraud
            estimates exceeded $200B across 2020–2022.
          </p>
        </div>
      </div>

      {/* Methodology note */}
      <p className="text-[10px] text-white/25 leading-relaxed">
        ⚠️ Multi-year entries are distributed evenly across covered fiscal years. Cumulative
        entries are excluded. The brush selector below the chart updates the global year filter.
        Federal budget figures are approximate OMB/CBO outlays.
      </p>
    </div>
  );
}
