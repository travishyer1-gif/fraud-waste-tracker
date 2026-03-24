"use client";

import { useEvidenceData } from '@/hooks/useEvidenceData';
import BubbleChart from '@/components/charts/BubbleChart';

export default function BubbleView() {
  const { filteredEntries } = useEvidenceData();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold text-white">Scale Perspective</h2>
        <p className="text-gray-400 mt-1">
          Each bubble represents a single fraud or waste entry, sized by estimated dollar amount.
          Bubbles cluster by category. Click any bubble to see full details below the chart.
        </p>
      </div>
      <div className="min-h-[500px] w-full bg-white/5 border border-white/10 rounded-xl p-4">
        <BubbleChart entries={filteredEntries} />
      </div>
    </div>
  );
}
