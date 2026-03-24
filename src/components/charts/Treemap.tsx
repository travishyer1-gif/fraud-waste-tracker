'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import type { EvidenceEntry } from '@/lib/types';
import { CATEGORY_LABELS, TIER_COLORS } from '@/lib/constants';
import { formatCompact, getTierInfo } from '@/lib/utils';

// ─── constants ────────────────────────────────────────────────────────────────
const MIN_AMOUNT = 5_000_000;
const FRAUD_CAT_COLORS = [
  '#818cf8', '#a78bfa', '#c084fc', '#e879f9',
  '#f472b6', '#fb7185', '#f87171',
];
const WASTE_CAT_COLORS = [
  '#fbbf24', '#fcd34d', '#a3e635', '#d97706',
  '#b45309', '#f59e0b', '#fed7aa',
];

// ─── types ────────────────────────────────────────────────────────────────────
interface BreadcrumbItem {
  label: string;
  level: 0 | 1 | 2;
  typeFilter?: 'fraud' | 'waste';
  categoryFilter?: string;
}

interface TmNode {
  id: string;
  label: string;
  sublabel?: string;
  amount: number | null;
  tier?: number | null;
  sourceName?: string;
  color: string;
  x0: number; y0: number;
  x1: number; y1: number;
  clickable: boolean;
}

interface TooltipState {
  x: number; y: number;
  title: string;
  amount: number | null;
  tier?: number | null;
  sourceName?: string;
}

interface TreeHDatum {
  id: string;
  name: string;
  value?: number;
  children?: TreeHDatum[];
  rawAmount?: number | null;
  color?: string;
  entry?: EvidenceEntry;
}

// ─── layout helpers ───────────────────────────────────────────────────────────
function getScaledValue(amount: number | null, logScale: boolean): number {
  const raw = amount ?? MIN_AMOUNT;
  return logScale ? Math.log10(Math.max(raw, 1)) + 1 : raw;
}

function buildNodes(
  entries: EvidenceEntry[],
  crumb: BreadcrumbItem[],
  width: number,
  height: number,
  logScale: boolean,
): TmNode[] {
  if (width < 10 || height < 10) return [];

  const current = crumb[crumb.length - 1];

  // Level 0: Fraud vs Waste split
  if (current.level === 0) {
    const fraudAmt = entries.filter(e => e.type === 'fraud').reduce((s, e) => s + (e.amountBest ?? MIN_AMOUNT), 0);
    const wasteAmt = entries.filter(e => e.type === 'waste').reduce((s, e) => s + (e.amountBest ?? MIN_AMOUNT), 0);
    const fv = getScaledValue(fraudAmt, logScale);
    const wv = getScaledValue(wasteAmt, logScale);
    const total = fv + wv || 1;
    const split = (fv / total) * width;
    const PAD = 2;
    return [
      { id: 'fraud', label: 'Fraud', sublabel: formatCompact(fraudAmt), amount: fraudAmt, color: '#ef444432', x0: PAD, y0: PAD, x1: split - PAD, y1: height - PAD, clickable: true },
      { id: 'waste', label: 'Waste', sublabel: formatCompact(wasteAmt), amount: wasteAmt, color: '#f59e0b32', x0: split + PAD, y0: PAD, x1: width - PAD, y1: height - PAD, clickable: true },
    ];
  }

  // Level 1: subcategories
  if (current.level === 1) {
    const type = current.typeFilter!;
    const typeEntries = entries.filter(e => e.type === type);
    const catMap: Record<string, number> = {};
    for (const e of typeEntries) {
      catMap[e.category] = (catMap[e.category] ?? 0) + (e.amountBest ?? MIN_AMOUNT);
    }
    const cats = Object.keys(catMap).sort();
    const palette = type === 'fraud' ? FRAUD_CAT_COLORS : WASTE_CAT_COLORS;

    const root = d3.hierarchy<TreeHDatum>({
      id: 'root', name: 'root',
      children: cats.map(c => ({
        id: c, name: c,
        value: getScaledValue(catMap[c], logScale),
        rawAmount: catMap[c],
      })),
    }).sum(d => d.value ?? 0);

    d3.treemap<TreeHDatum>().size([width, height]).paddingInner(2).paddingOuter(4).round(true)(root);

    return root.leaves().map((leaf, i) => ({
      id: leaf.data.id,
      label: CATEGORY_LABELS[leaf.data.id]?.label ?? leaf.data.id,
      sublabel: formatCompact(leaf.data.rawAmount ?? null),
      amount: leaf.data.rawAmount ?? null,
      color: palette[i % palette.length] + '55',
      x0: (leaf as d3.HierarchyRectangularNode<TreeHDatum>).x0,
      y0: (leaf as d3.HierarchyRectangularNode<TreeHDatum>).y0,
      x1: (leaf as d3.HierarchyRectangularNode<TreeHDatum>).x1,
      y1: (leaf as d3.HierarchyRectangularNode<TreeHDatum>).y1,
      clickable: true,
    }));
  }

  // Level 2: individual entries
  if (current.level === 2) {
    const cat = current.categoryFilter!;
    const catEntries = entries.filter(e => e.category === cat);

    const root = d3.hierarchy<TreeHDatum>({
      id: 'root', name: 'root',
      children: catEntries.map(e => ({
        id: e.id,
        name: e.title,
        entry: e,
        value: getScaledValue(e.amountBest, logScale),
        rawAmount: e.amountBest,
        color: (TIER_COLORS[e.certaintyTier as keyof typeof TIER_COLORS]?.bg ?? '#6b7280') + '50',
      })),
    }).sum(d => d.value ?? 0);

    d3.treemap<TreeHDatum>().size([width, height]).paddingInner(2).paddingOuter(4).round(true)(root);

    return root.leaves().map(leaf => {
      const e = leaf.data.entry!;
      const rn = leaf as d3.HierarchyRectangularNode<TreeHDatum>;
      return {
        id: e.id, label: e.title,
        sublabel: formatCompact(leaf.data.rawAmount ?? null),
        amount: leaf.data.rawAmount ?? null,
        tier: e.certaintyTier,
        sourceName: e.sourceName,
        color: leaf.data.color!,
        x0: rn.x0, y0: rn.y0, x1: rn.x1, y1: rn.y1,
        clickable: false,
      };
    });
  }

  return [];
}

// ─── component ────────────────────────────────────────────────────────────────
export function Treemap({ entries }: { entries: EvidenceEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const [logScale, setLogScale] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([{ label: 'All', level: 0 }]);
  const [nodes, setNodes] = useState<TmNode[]>([]);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDimensions({ width: Math.max(width, 200), height: Math.max(height, 200) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Recompute layout
  useEffect(() => {
    setNodes(buildNodes(entries, breadcrumb, dimensions.width, dimensions.height, logScale));
  }, [entries, breadcrumb, dimensions, logScale]);

  const handleNodeClick = useCallback((node: TmNode) => {
    if (!node.clickable) return;
    const current = breadcrumb[breadcrumb.length - 1];
    if (current.level === 0) {
      setBreadcrumb([
        { label: 'All', level: 0 },
        { label: node.id === 'fraud' ? 'Fraud' : 'Waste', level: 1, typeFilter: node.id as 'fraud' | 'waste' },
      ]);
    } else if (current.level === 1) {
      const catLabel = CATEGORY_LABELS[node.id]?.label ?? node.id;
      setBreadcrumb(prev => [
        ...prev,
        { label: `${node.id}: ${catLabel}`, level: 2, categoryFilter: node.id },
      ]);
    }
  }, [breadcrumb]);

  const jumpTo = useCallback((idx: number) => {
    setBreadcrumb(prev => prev.slice(0, idx + 1));
  }, []);

  return (
    <div className="flex flex-col h-full gap-2 min-h-0">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4 flex-shrink-0 flex-wrap">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-0.5 flex-wrap">
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-0.5">
              {i > 0 && <span className="text-muted-foreground/40 px-0.5 text-xs">›</span>}
              <button
                onClick={() => jumpTo(i)}
                className={`px-2 py-0.5 rounded text-xs transition-colors ${
                  i === breadcrumb.length - 1
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            </span>
          ))}
        </nav>

        {/* Log-scale toggle */}
        <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
          <span>Log scale</span>
          <button
            role="switch"
            aria-checked={logScale}
            onClick={() => setLogScale(s => !s)}
            className={`relative w-8 h-4 rounded-full transition-colors ${logScale ? 'bg-blue-500' : 'bg-white/20'}`}
          >
            <span
              className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all duration-200 ${logScale ? 'left-[18px]' : 'left-0.5'}`}
            />
          </button>
        </label>
      </div>

      {/* Hint */}
      {breadcrumb.length < 3 && (
        <p className="text-[10px] text-muted-foreground/50 flex-shrink-0">
          {breadcrumb.length === 1
            ? 'Click Fraud or Waste to drill into subcategories'
            : 'Click a category to explore individual entries · use breadcrumb to navigate back'}
        </p>
      )}

      {/* Treemap canvas */}
      <div ref={containerRef} className="flex-1 relative rounded-lg overflow-hidden min-h-[200px]">
        {nodes.map(node => {
          const w = Math.max(node.x1 - node.x0, 0);
          const h = Math.max(node.y1 - node.y0, 0);
          if (w < 2 || h < 2) return null;

          const showLabel = w > 50 && h > 26;
          const showSub   = w > 70 && h > 46;
          const showTier  = w > 70 && h > 60;
          const tierInfo  = node.tier != null ? getTierInfo(node.tier) : null;

          return (
            <div
              key={node.id}
              className={`absolute overflow-hidden border border-white/[0.06] transition-[filter] duration-150 ${
                node.clickable ? 'cursor-pointer hover:brightness-125' : 'cursor-default'
              }`}
              style={{ left: node.x0, top: node.y0, width: w, height: h, backgroundColor: node.color, borderRadius: 4 }}
              onClick={() => handleNodeClick(node)}
              onMouseMove={e => {
                const rect = containerRef.current!.getBoundingClientRect();
                setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, title: node.label, amount: node.amount, tier: node.tier, sourceName: node.sourceName });
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              {showLabel && (
                <div className="p-1.5 h-full flex flex-col justify-between pointer-events-none select-none">
                  <div>
                    <p className="text-[11px] font-semibold text-white leading-tight line-clamp-2">{node.label}</p>
                    {showSub && (
                      <p className="text-[10px] text-white/55 mt-0.5 font-mono">{node.sublabel}</p>
                    )}
                  </div>
                  {tierInfo && showTier && (
                    <span
                      className="self-start text-[9px] px-1 py-0.5 rounded font-medium"
                      style={{ backgroundColor: tierInfo.bg + '30', color: tierInfo.bg }}
                    >
                      {tierInfo.icon} T{node.tier}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-50 backdrop-blur-xl bg-black/80 border border-white/10 rounded-lg p-3 text-xs max-w-[220px] shadow-xl"
            style={{ left: Math.min(tooltip.x + 12, dimensions.width - 240), top: Math.max(tooltip.y - 10, 4) }}
          >
            <p className="font-semibold text-white leading-snug mb-1">{tooltip.title}</p>
            {tooltip.amount != null && (
              <p className="font-mono text-emerald-400">{formatCompact(tooltip.amount)}</p>
            )}
            {tooltip.tier != null && (() => {
              const ti = getTierInfo(tooltip.tier);
              return (
                <p className="mt-1" style={{ color: ti.bg }}>
                  {ti.icon} Tier {tooltip.tier} — {ti.label}
                </p>
              );
            })()}
            {tooltip.sourceName && (
              <p className="text-muted-foreground mt-0.5 line-clamp-1">{tooltip.sourceName}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
