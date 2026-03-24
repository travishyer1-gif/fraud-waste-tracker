export interface EvidenceEntry {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  type: 'fraud' | 'waste' | 'unknown';
  amountBest: number | null;
  amountLow: number | null;
  amountHigh: number | null;
  fiscalYearStart: number | null;
  fiscalYearEnd: number | null;
  periodType: string;
  certaintyTier: number | null;
  certaintyScore: number | null;
  jurisdiction: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: string;
  sourceMethodology: string;
  sourceOrientation: string;
  overlapNotes: string;
  entityLinks: string[];
  safeToSum: boolean;
}

export interface DoubleCountPair {
  entryA: string;
  entryB: string;
  relationship: string;
  safeToSum: boolean | null;
}

export interface CategoryInfo {
  label: string;
  type: 'fraud' | 'waste';
}

export interface SummaryStats {
  fraudFloorAnnual: number;
  fraudCeilingAnnual: number;
  wasteFloorAnnual: number;
  wasteCeilingAnnual: number;
  combinedFloor: number;
  combinedCeiling: number;
  tierCounts: Record<string, number>;
}

export interface EvidenceData {
  metadata: {
    generated: string;
    totalEntries: number;
    coverageStart: number;
    coverageEnd: number;
    sourceFile: string;
  };
  entries: EvidenceEntry[];
  entities: Record<string, string[]>;
  doubleCountMatrix: DoubleCountPair[];
  summaryStats: SummaryStats;
  categories: Record<string, CategoryInfo>;
}
