'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Shield, CheckCircle, BarChart2, Search, Newspaper } from 'lucide-react';
import { ConfidenceExplorer } from '@/components/charts/ConfidenceExplorer';

const TIER_DATA = [
  {
    tier: 1,
    label: 'Confirmed / Audited',
    range: '90–100%',
    color: '#22c55e',
    icon: CheckCircle,
    summary: 'This happened. Money was lost, stolen, or wasted. The amount is documented in an official proceeding, audit, or legal outcome.',
    details: [
      'Final GAO audit finding with specific dollar amount',
      'Inspector General report with confirmed quantified findings',
      'DOJ criminal conviction or civil settlement with case number',
      'Court judgment or plea agreement in public record',
      'Agency self-correction with published recovery amount',
    ],
    detailsTitle: 'Evidence standard — requires at least one of:',
    warning: 'Disputing this requires disputing the US government\'s own records.',
    warningType: 'strong' as const,
  },
  {
    tier: 2,
    label: 'Officially Estimated',
    range: '70–89%',
    color: '#3b82f6',
    icon: BarChart2,
    summary: 'A credible government body or nonpartisan analytical office has measured or estimated this figure using documented, repeatable methodology. The exact dollar amount may have a range, but the problem\'s existence and approximate scale are established.',
    details: [
      'CBO cost estimate',
      'Agency-reported improper payment rate',
      'USAspending.gov data with documented misalignment',
      'Government-commissioned study (RAND, CRS)',
      'FRED economic data',
      'paymentaccuracy.gov published rates',
    ],
    detailsTitle: 'Evidence requires:',
    warning: 'Cannot call it "fraud" unless the source explicitly does.',
    warningType: 'caution' as const,
  },
  {
    tier: 3,
    label: 'Independently Researched',
    range: '50–69%',
    color: '#f59e0b',
    icon: Search,
    summary: 'The problem exists and has been quantified by credible researchers using transparent, replicable methods. The government hasn\'t officially confirmed the figure.',
    details: [
      'Peer-reviewed academic study',
      'Major think tank report WITH methodology disclosure (Cato, Heritage, Brookings, AEI, Urban Institute)',
      'Bipartisan commission findings',
      'Cross-referenced investigative series backed by FOIA documents',
    ],
    detailsTitle: 'Evidence requires:',
    warning: 'Must include source orientation (left/right/nonpartisan) and the word "estimate."',
    warningType: 'caution' as const,
  },
  {
    tier: 4,
    label: 'Credibly Reported',
    range: '30–49%',
    color: '#f97316',
    icon: Newspaper,
    summary: 'A credible journalistic or oversight source has identified this issue with documentary evidence. The full picture is incomplete.',
    details: [
      'Investigative journalism from top-tier outlets with FOIA docs or named sources',
      'Whistleblower testimony',
      'FOIA-obtained documents',
      'State auditor preliminary findings',
    ],
    detailsTitle: 'Evidence requires:',
    warning: 'Must use "approximately," "may," or "reported."',
    warningType: 'info' as const,
  },
];

function TierSection({ tierData }: { tierData: typeof TIER_DATA[0] }) {
  const [open, setOpen] = useState(false);
  const Icon = tierData.icon;

  const warningBg = {
    strong: 'bg-green-500/10 border-green-500/20 text-green-300',
    caution: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
  }[tierData.warningType];

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: `3px solid ${tierData.color}`,
      }}
    >
      {/* Header bar */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.03] transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0"
            style={{ background: `${tierData.color}20`, border: `1px solid ${tierData.color}40` }}
          >
            <Icon className="w-3.5 h-3.5" style={{ color: tierData.color }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold" style={{ color: tierData.color }}>
                Tier {tierData.tier}
              </span>
              <span className="text-xs text-white/40">—</span>
              <span className="text-sm font-medium text-white/80">{tierData.label}</span>
            </div>
            <div className="text-xs text-white/35 mt-0.5">Confidence {tierData.range}</div>
          </div>
        </div>
        <div className="flex-shrink-0 ml-3">
          {open ? (
            <ChevronDown className="w-4 h-4 text-white/40" />
          ) : (
            <ChevronRight className="w-4 h-4 text-white/40" />
          )}
        </div>
      </button>

      {/* Collapsible body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pb-4 pt-1 space-y-3">
              {/* Summary */}
              <p className="text-sm text-white/65 leading-relaxed">{tierData.summary}</p>

              {/* Evidence list */}
              <div>
                <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-2">
                  {tierData.detailsTitle}
                </p>
                <ul className="space-y-1.5">
                  {tierData.details.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                      <div
                        className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: tierData.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warning/note */}
              <div className={`rounded-lg border px-3 py-2 text-xs ${warningBg}`}>
                <Shield className="inline w-3 h-3 mr-1.5 opacity-80" />
                {tierData.warning}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ConfidenceView() {
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

      {/* Tier Description Sections */}
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-white/80">Evidence Standards by Tier</h3>
          <p className="text-xs text-white/35 mt-0.5">
            Click a tier to expand its criteria and evidence requirements.
          </p>
        </div>
        {TIER_DATA.map((t) => (
          <TierSection key={t.tier} tierData={t} />
        ))}
      </div>
    </div>
  );
}
