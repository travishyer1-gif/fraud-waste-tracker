'use client';

import { useState, useMemo } from 'react';
import { TimeSeries, SPENDING_EVENTS, type SpendingEvent } from '@/components/charts/TimeSeries';
import { buildTypeTimeSeriesData } from '@/lib/timeSeriesUtils';
import { useEvidenceData } from '@/hooks/useEvidenceData';

// Chip colours per event year cluster
function chipColor(evt: SpendingEvent, enabled: boolean): React.CSSProperties {
  if (!enabled) return { borderColor: '#334155', backgroundColor: '#1e293b', color: '#64748b' };

  const palette: Record<number, { border: string; bg: string; text: string }> = {
    2008: { border: '#7c3aed40', bg: '#7c3aed15', text: '#a78bfa' },
    2009: { border: '#7c3aed40', bg: '#7c3aed15', text: '#a78bfa' },
    2010: { border: '#0891b240', bg: '#0891b215', text: '#22d3ee' },
    2013: { border: '#dc262640', bg: '#dc262615', text: '#f87171' },
    2017: { border: '#d9770640', bg: '#d9770615', text: '#fbbf24' },
    2018: { border: '#d9770640', bg: '#d9770615', text: '#fbbf24' },
    2020: { border: '#dc262640', bg: '#dc262615', text: '#f87171' },
    2021: { border: '#dc262640', bg: '#dc262615', text: '#f87171' },
    2022: { border: '#16a34a40', bg: '#16a34a15', text: '#4ade80' },
  };

  const c = palette[evt.year] ?? { border: '#33415540', bg: '#33415515', text: '#94a3b8' };
  return { borderColor: c.border, backgroundColor: c.bg, color: c.text };
}

export default function TimeSeriesView() {
  const { entries } = useEvidenceData();

  // Event toggle state: all enabled by default
  const [disabledLabels, setDisabledLabels] = useState<Set<string>>(new Set());

  // % of budget toggle (local, passed to chart)
  const [showAsPct, setShowAsPct] = useState(false);

  const toggleEvent = (label: string) => {
    setDisabledLabels(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const hasAnyDisabled = disabledLabels.size > 0;
  const hasCounterfactual = useMemo(
    () => SPENDING_EVENTS.some(e => e.amount > 0 && disabledLabels.has(e.label)),
    [disabledLabels],
  );

  // Get the data year range so we only show relevant event chips
  const baseData = useMemo(() => buildTypeTimeSeriesData(entries), [entries]);
  const minYear = baseData[0]?.year ?? 2018;
  const maxYear = baseData[baseData.length - 1]?.year ?? 2025;

  const relevantEvents = SPENDING_EVENTS.filter(e => e.year >= minYear && e.year <= maxYear);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Time Series Trends</h2>
          <p className="text-sm text-white/50 mt-1 max-w-2xl">
            Fraud and waste estimates across FY{minYear}–{maxYear}. Toggle spending events below to
            explore how major legislation correlates with fraud/waste trends.
          </p>
        </div>

        {/* % of budget toggle */}
        <label className="flex items-center gap-2 text-xs text-white/60 cursor-pointer select-none hover:text-white transition-colors shrink-0">
          <input
            type="checkbox"
            checked={showAsPct}
            onChange={e => setShowAsPct(e.target.checked)}
            className="accent-blue-400 w-3.5 h-3.5"
          />
          Show as % of Federal Budget
        </label>
      </div>

      {/* Spending event chips */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">
            Spending Events
          </p>
          {hasAnyDisabled && (
            <button
              onClick={() => setDisabledLabels(new Set())}
              className="text-[10px] text-white/30 hover:text-white/60 transition-colors underline underline-offset-2"
            >
              reset all
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {relevantEvents.map(evt => {
            const isEnabled = !disabledLabels.has(evt.label);
            const style = chipColor(evt, isEnabled);
            return (
              <button
                key={evt.label}
                onClick={() => toggleEvent(evt.label)}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all duration-150 hover:opacity-80 active:scale-95"
                style={style}
                title={
                  evt.amount > 0
                    ? `${evt.label} — toggle to see counterfactual (what fraud/waste would look like without this spending)`
                    : `${evt.label} — policy event (no monetary counterfactual)`
                }
              >
                <span className="mr-1 opacity-60">{isEnabled ? '●' : '○'}</span>
                FY{evt.year} {evt.label}
              </button>
            );
          })}
        </div>

        {/* Counterfactual explanation */}
        {hasAnyDisabled && (
          <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3 text-[11px] text-cyan-300/70 leading-relaxed">
            {hasCounterfactual ? (
              <>
                <span className="font-semibold text-cyan-300">Counterfactual mode active.</span>{' '}
                Dashed cyan lines show estimated fraud/waste if the disabled spending event(s) had
                never occurred. We apply an 8% leakage rate distributed over the event year + 2
                subsequent years. This is illustrative, not audited — treat it as a lower-bound
                scenario.
              </>
            ) : (
              <>
                The toggled event(s) have no monetary amount attached (policy-only), so no
                counterfactual line is generated. Their reference lines are simply hidden.
              </>
            )}
          </div>
        )}
      </div>

      {/* Data type legend */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            { color: '#ef4444', label: 'Fraud', desc: 'Intentional misappropriation' },
            { color: '#f59e0b', label: 'Waste', desc: 'Inefficiency & improper payments' },
            { color: '#e2e8f0', label: 'Combined', desc: 'Fraud + Waste (dashed)' },
          ] as const
        ).map(item => (
          <div
            key={item.label}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border"
            style={{ borderColor: `${item.color}40`, backgroundColor: `${item.color}10` }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span style={{ color: item.color }} className="font-medium">
              {item.label}
            </span>
            <span className="text-white/30">— {item.desc}</span>
          </div>
        ))}
        {hasCounterfactual && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border border-cyan-500/30 bg-cyan-500/10">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-cyan-400 font-medium">Counterfactual</span>
            <span className="text-white/30">— without toggled spending</span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <TimeSeries disabledEventLabels={disabledLabels} showAsPct={showAsPct} />
      </div>

      {/* Key events context cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs font-semibold text-white mb-1">📌 FY2020 — CARES Act + PPP</p>
          <p className="text-[11px] text-white/50">
            CARES Act ($2.2T) and PPP/EIDL programs drove explosive growth in improper payments.
            PUA and PPP fraud exposure alone exceeded hundreds of billions.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs font-semibold text-white mb-1">
            📌 FY2021 — American Rescue Plan + Infrastructure
          </p>
          <p className="text-[11px] text-white/50">
            $1.9T ARP + $1.2T Infrastructure Act. UI fraud peaked. SBA COVID EIDL/PPP fraud
            estimates exceeded $200B across 2020–2022.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs font-semibold text-white mb-1">
            📌 FY2009 — ARRA Stimulus ($831B)
          </p>
          <p className="text-[11px] text-white/50">
            Post-financial-crisis stimulus. Created broad new contracting channels that generated
            early fraud and waste patterns tracked in subsequent audits.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs font-semibold text-white mb-1">📌 FY2022 — IRA + CHIPS Act</p>
          <p className="text-[11px] text-white/50">
            Combined $1.17T in new industrial policy spending. Long-term improper payment risk
            being tracked by GAO and OMB through 2026+.
          </p>
        </div>
      </div>

      {/* Methodology note */}
      <p className="text-[10px] text-white/25 leading-relaxed">
        ⚠️ Multi-year entries spanning 2020–2022 use a COVID-weighted distribution (50%/35%/15%)
        rather than an even split. All other multi-year entries split evenly. Data density reflects
        the number of evidence entries backing each year. The brush selector below the chart updates
        the global year filter. Federal budget figures are approximate OMB/CBO outlays.
      </p>
    </div>
  );
}
