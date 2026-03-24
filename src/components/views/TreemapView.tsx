"use client";

import { useEvidenceData } from '@/hooks/useEvidenceData';
import Treemap from '@/components/charts/Treemap';

export default function TreemapView() {
  const { filteredEntries, categories } = useEvidenceData();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold text-white">Category Treemap</h2>
        <p className="text-gray-400 mt-1">
          Visualize federal fraud and waste by category and scale. Click to drill down into
          subcategories and individual entries. Toggle log scale to compare small and large amounts.
        </p>
      </div>
      <div className="min-h-[500px] w-full bg-white/5 border border-white/10 rounded-xl p-4">
        <Treemap entries={filteredEntries} categories={categories} />
      </div>
    </div>
  );
}
