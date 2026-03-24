'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronDown } from 'lucide-react';

export function MethodologyPanel() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div id="methodology" className="border border-white/5 rounded-xl overflow-hidden bg-white/[0.02]">
      {/* Header / toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <ShieldCheck size={16} className="text-blue-400" />
          How We Avoid Double-Counting
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown size={16} className="text-muted-foreground" />
        </motion.span>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="methodology-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-5 space-y-4 text-xs text-muted-foreground leading-relaxed border-t border-white/5">
              <p className="pt-4">
                Government fraud and waste data comes from dozens of overlapping sources. A single
                dollar of Medicare fraud might appear in a GAO audit, an HHS Inspector General
                report, <em>and</em> a DOJ settlement announcement. Naive totals inflate the real
                number.
              </p>

              <div className="border-l-2 border-blue-500/40 pl-4 space-y-2">
                <p className="font-medium text-foreground/70">Containment Hierarchy</p>
                <p>
                  This tool tags every data point as either a <strong>root finding</strong> or a{' '}
                  <strong>subset of a larger finding</strong>. When we calculate totals, we only
                  sum root-level figures. Subsets are shown in category drill-downs for
                  transparency, but never added to the headline number twice.
                </p>
              </div>

              <div className="border-l-2 border-amber-500/40 pl-4 space-y-2">
                <p className="font-medium text-foreground/70">Overlapping Populations</p>
                <p>
                  Where two independent sources measure overlapping populations, we flag the
                  overlap, use the higher-confidence figure in the total, and footnote the
                  alternative. Every overlap decision is documented in the{' '}
                  <span className="text-foreground/60 font-mono">overlapNotes</span> field on
                  each entry.
                </p>
              </div>

              <p className="text-[11px] text-muted-foreground/50 italic">
                ⚠️ All figures are annual estimates unless otherwise noted. Ranges reflect
                uncertainty bounds from primary sources.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
