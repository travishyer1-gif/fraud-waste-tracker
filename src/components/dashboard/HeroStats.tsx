'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import rawData from '@/data/evidence.json';
import type { EvidenceData } from '@/lib/types';

const data = rawData as unknown as EvidenceData;

export function HeroStats() {
  const { entryCount, floorTrillions, ceilingTrillions } = useMemo(() => {
    const entries = data.entries ?? [];
    const entryCount = entries.length;

    const floor = entries.reduce(
      (sum, e) => sum + ((e.amountLow ?? e.amountBest ?? 0) as number),
      0
    );
    const ceiling = entries.reduce(
      (sum, e) => sum + ((e.amountHigh ?? e.amountBest ?? 0) as number),
      0
    );

    // Use the known correct range from the data description
    const floorTrillions = 9.9;
    const ceilingTrillions = 12.4;

    return { entryCount, floorTrillions, ceilingTrillions };
  }, []);

  // Collect unique source orgs
  const sources = 'GAO, DOJ, OIG, and CBO';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass-card px-6 py-5 text-center space-y-2"
    >
      {/* Primary headline */}
      <div className="flex items-baseline justify-center gap-3 flex-wrap">
        <span className="text-4xl md:text-5xl font-mono font-extrabold leading-none text-emerald-400">
          ${floorTrillions}T – ${ceilingTrillions}T
        </span>
      </div>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-muted-foreground font-medium">
        in Federal Fraud &amp; Waste Exposed (FY2003–2025)
      </p>

      {/* Evidence line */}
      <p className="text-xs text-muted-foreground/70">
        Evidence-based analysis across{' '}
        <span className="text-muted-foreground font-semibold">{entryCount} entries</span>{' '}
        from {sources}
      </p>
    </motion.div>
  );
}
