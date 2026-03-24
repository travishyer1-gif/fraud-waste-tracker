"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { EvidenceEntry } from '@/lib/types';
import { TIER_COLORS } from '@/lib/constants';
import { formatCompact, getTierInfo } from '@/lib/utils';

interface TreemapProps {
  entries: EvidenceEntry[];
  categories: Record<string, { label: string; type: string }>;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  title: string;
  amount: string;
  tier: string;
  source: string;
}

type ZoomLevel = 'top' | 'category' | 'entries';

interface BreadcrumbItem {
  label: string;
  level: ZoomLevel;
  key?: string;
}

const FRAUD_COLOR = '#ef444480';
const WASTE_COLOR = '#f59e0b80';

export default function Treemap({ entries, categories }: TreemapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('top');
  const [zoomPath, setZoomPath] = useState<string[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([{ label: 'All', level: 'top' }]);
  const [logScale, setLogScale] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, title: '', amount: '', tier: '', source: '',
  });

  // Build hierarchy
  const buildHierarchy = useCallback(() => {
    const fraudCategories: Record<string, EvidenceEntry[]> = {};
    const wasteCategories: Record<string, EvidenceEntry[]> = {};

    entries.forEach(entry => {
      const cat = entry.category;
      if (entry.type === 'fraud') {
        if (!fraudCategories[cat]) fraudCategories[cat] = [];
        fraudCategories[cat].push(entry);
      } else {
        if (!wasteCategories[cat]) wasteCategories[cat] = [];
        wasteCategories[cat].push(entry);
      }
    });

    const getValue = (entry: EvidenceEntry) => {
      const base = entry.amountBest ?? 1_000_000;
      const v = Math.max(base, 1_000_000);
      return logScale ? Math.log10(v) : v;
    };

    const toChildren = (catMap: Record<string, EvidenceEntry[]>, typeLabel: string) =>
      Object.entries(catMap).map(([catKey, catEntries]) => ({
        name: catKey,
        label: categories[catKey]?.label ?? catKey,
        type: typeLabel,
        children: catEntries.map(e => ({
          name: e.id,
          entry: e,
          value: getValue(e),
        })),
      }));

    return {
      name: 'root',
      children: [
        { name: 'fraud', label: 'Fraud', type: 'fraud', children: toChildren(fraudCategories, 'fraud') },
        { name: 'waste', label: 'Waste', type: 'waste', children: toChildren(wasteCategories, 'waste') },
      ],
    };
  }, [entries, categories, logScale]);

  // Filter hierarchy based on zoom
  const getFilteredHierarchy = useCallback(() => {
    const full = buildHierarchy();
    if (zoomLevel === 'top') return full;

    const [topKey] = zoomPath;
    const topNode = full.children.find(c => c.name === topKey);
    if (!topNode) return full;

    if (zoomLevel === 'category') return { ...topNode, children: topNode.children };

    const [, catKey] = zoomPath;
    const catNode = topNode.children.find((c: { name: string }) => c.name === catKey);
    if (!catNode) return topNode;
    return catNode;
  }, [buildHierarchy, zoomLevel, zoomPath]);

  const getNodeColor = useCallback((d: d3.HierarchyRectangularNode<unknown>): string => {
    const data = d.data as { type?: string; entry?: EvidenceEntry; name?: string };
    if (zoomLevel === 'top') {
      return data.name === 'fraud' ? FRAUD_COLOR : WASTE_COLOR;
    }
    if (zoomLevel === 'category') {
      // leaf nodes are entries
      if (data.entry) {
        const tier = data.entry.certaintyTier;
        return tier && TIER_COLORS[tier as keyof typeof TIER_COLORS]
          ? TIER_COLORS[tier as keyof typeof TIER_COLORS].bg
          : '#6b7280';
      }
      // category nodes
      const topType = zoomPath[0];
      return topType === 'fraud' ? FRAUD_COLOR : WASTE_COLOR;
    }
    // entries level
    if (data.entry) {
      const tier = data.entry.certaintyTier;
      return tier && TIER_COLORS[tier as keyof typeof TIER_COLORS]
        ? TIER_COLORS[tier as keyof typeof TIER_COLORS].bg
        : '#6b7280';
    }
    return '#6b7280';
  }, [zoomLevel, zoomPath]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width: Math.max(width, 200), height: Math.max(height, 300) });
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const hierarchy = getFilteredHierarchy();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const root = d3.hierarchy(hierarchy as any)
      .sum((d: unknown) => {
        const node = d as { value?: number };
        return node.value ?? 0;
      })
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const treemap = d3.treemap<any>()
      .size([width, height])
      .paddingOuter(4)
      .paddingInner(2)
      .paddingTop(20)
      .round(true);

    treemap(root);

    const g = svg.append('g');

    const leaves = root.leaves();
    const nodes = zoomLevel === 'top' ? root.children ?? [] : leaves;
    const allNodes = zoomLevel === 'top' ? (root.children ?? []) : leaves;

    allNodes.forEach(d => {
      const data = d.data as { name?: string; label?: string; type?: string; entry?: EvidenceEntry };
      const nodeG = g.append('g')
        .attr('class', 'treemap-node')
        .style('cursor', 'pointer')
        .attr('transform', `translate(${(d as d3.HierarchyRectangularNode<unknown>).x0},${(d as d3.HierarchyRectangularNode<unknown>).y0})`);

      const rd = d as d3.HierarchyRectangularNode<unknown>;
      const w = rd.x1 - rd.x0;
      const h = rd.y1 - rd.y0;

      nodeG.append('rect')
        .attr('width', w)
        .attr('height', h)
        .attr('fill', getNodeColor(rd))
        .attr('stroke', 'rgba(255,255,255,0.15)')
        .attr('stroke-width', 1)
        .attr('rx', 3)
        .style('transition', 'opacity 400ms');

      if (w > 40 && h > 20) {
        const label = data.entry ? data.entry.title : (data.label ?? data.name ?? '');
        nodeG.append('text')
          .attr('x', 6)
          .attr('y', 14)
          .attr('fill', 'white')
          .attr('font-size', Math.min(12, w / 8))
          .attr('font-weight', data.entry ? 400 : 600)
          .text(label.length > 30 ? label.slice(0, 28) + '…' : label);

        if (data.entry && h > 35) {
          nodeG.append('text')
            .attr('x', 6)
            .attr('y', 28)
            .attr('fill', 'rgba(255,255,255,0.7)')
            .attr('font-size', 10)
            .text(formatCompact(data.entry.amountBest));
        }
      }

      nodeG.on('mousemove', (event: MouseEvent) => {
        const entry = data.entry;
        const tierInfo = entry ? getTierInfo(entry.certaintyTier) : null;
        setTooltip({
          visible: true,
          x: event.clientX + 12,
          y: event.clientY - 10,
          title: entry ? entry.title : (data.label ?? data.name ?? ''),
          amount: entry ? formatCompact(entry.amountBest) : '',
          tier: tierInfo ? `${tierInfo.icon} ${tierInfo.label}` : '',
          source: entry ? entry.sourceName : '',
        });
      });

      nodeG.on('mouseleave', () => setTooltip(t => ({ ...t, visible: false })));

      nodeG.on('click', () => {
        if (zoomLevel === 'top') {
          const key = data.name ?? '';
          setZoomPath([key]);
          setZoomLevel('category');
          setBreadcrumbs([
            { label: 'All', level: 'top' },
            { label: data.label ?? key, level: 'category', key },
          ]);
        } else if (zoomLevel === 'category' && !data.entry) {
          const catKey = data.name ?? '';
          setZoomPath(prev => [prev[0], catKey]);
          setZoomLevel('entries');
          setBreadcrumbs(prev => [
            ...prev,
            { label: data.label ?? catKey, level: 'entries', key: catKey },
          ]);
        }
      });
    });
  }, [dimensions, getFilteredHierarchy, getNodeColor, zoomLevel]);

  const navigateBreadcrumb = (item: BreadcrumbItem) => {
    if (item.level === 'top') {
      setZoomLevel('top');
      setZoomPath([]);
      setBreadcrumbs([{ label: 'All', level: 'top' }]);
    } else if (item.level === 'category') {
      setZoomLevel('category');
      setZoomPath([item.key ?? '']);
      setBreadcrumbs(prev => prev.slice(0, 2));
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between mb-2 px-1">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-400">
          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-gray-600">›</span>}
              <button
                onClick={() => navigateBreadcrumb(item)}
                className={i === breadcrumbs.length - 1
                  ? 'text-white font-medium'
                  : 'hover:text-white transition-colors'}
              >
                {item.label}
              </button>
            </span>
          ))}
        </nav>
        <button
          onClick={() => setLogScale(s => !s)}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
            logScale
              ? 'bg-blue-600 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          {logScale ? 'Log Scale' : 'Linear Scale'}
        </button>
      </div>

      {/* SVG */}
      <div ref={containerRef} className="relative flex-1 min-h-[400px]">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full"
        />
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 bg-black/80 backdrop-blur border border-white/10 rounded-lg p-3 text-sm pointer-events-none max-w-xs"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-semibold text-white mb-1">{tooltip.title}</div>
          {tooltip.amount && (
            <div className="text-green-400 font-mono">{tooltip.amount}</div>
          )}
          {tooltip.tier && (
            <div className="text-gray-300 mt-1">{tooltip.tier}</div>
          )}
          {tooltip.source && (
            <div className="text-gray-500 text-xs mt-1 truncate">{tooltip.source}</div>
          )}
        </div>
      )}
    </div>
  );
}
