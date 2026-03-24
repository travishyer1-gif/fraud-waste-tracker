'use client';

import { useEvidenceData } from '@/hooks/useEvidenceData';
import { Treemap } from '@/components/charts/Treemap';
import { GlobalControls } from '@/components/controls/GlobalControls';

export default function TreemapView() {
  const { filteredEntries, filteredStats } = useEvidenceData();

  return (
    <div className="flex flex-col gap-4 h-full min-h-0">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white">
          Treemap <span className="text-muted-foreground font-normal text-sm">— hierarchical breakdown</span>
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Areas proportional to dollar magnitude. Click to drill down through fraud/waste → categories → entries.
          Showing <span className="text-white font-medium">{filteredStats.totalFiltered}</span> entries.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <GlobalControls />
        </div>

        {/* Chart */}
        <div className="flex-1 min-h-[480px] lg:min-h-0">
          {filteredEntries.length > 0 ? (
            <Treemap entries={filteredEntries} />
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
