'use client';

import { useEvidenceData } from '@/hooks/useEvidenceData';
import { BubbleChart } from '@/components/charts/BubbleChart';
import { GlobalControls } from '@/components/controls/GlobalControls';

export default function BubbleView() {
  const { filteredEntries, filteredStats } = useEvidenceData();

  return (
    <div className="flex flex-col gap-4 h-full min-h-0">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white">
          Explore <span className="text-muted-foreground font-normal text-sm">— interactive evidence map</span>
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Each bubble is one evidence entry. Size = dollar amount. Color = confidence tier. Bubbles cluster by category.
          Showing <span className="text-white font-medium">{filteredStats.totalFiltered}</span> entries — drag, hover, and click to explore.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <GlobalControls />
        </div>

        {/* Chart container — needs a defined height */}
        <div className="flex-1 relative min-h-[520px] lg:min-h-0 rounded-lg overflow-hidden">
          {filteredEntries.length > 0 ? (
            <BubbleChart entries={filteredEntries} />
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
              No entries match current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
