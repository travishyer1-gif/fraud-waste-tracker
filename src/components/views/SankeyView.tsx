'use client';

import { useEvidenceData } from '@/hooks/useEvidenceData';
import { SankeyDiagram } from '../charts/SankeyDiagram';

export default function SankeyView() {
  const { filteredEntries } = useEvidenceData();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Evidence Source Flow</h2>
      <p className="text-gray-400">
        Where our evidence comes from, what it covers, and how confident each stream is.
      </p>
      <div className="min-h-[500px]">
        <SankeyDiagram entries={filteredEntries} />
      </div>
    </div>
  );
}
