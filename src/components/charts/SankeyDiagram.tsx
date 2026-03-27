'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, SankeyNode, SankeyLink, SankeyGraph } from 'd3-sankey';

interface EvidenceEntry {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  type: 'fraud' | 'waste' | 'unknown';
  amountBest: number | null;
  certaintyTier: number | null;
  sourceName: string;
  sourceType: string;
  sourceUrl: string;
  entityLinks: string[];
  safeToSum: boolean;
}

interface Props {
  entries: EvidenceEntry[];
}

const TIER_COLORS: Record<number, { bg: string; label: string }> = {
  1: { bg: '#22c55e', label: 'Confirmed' },
  2: { bg: '#3b82f6', label: 'Estimated' },
  3: { bg: '#f59e0b', label: 'Researched' },
  4: { bg: '#f97316', label: 'Reported' },
};

type NodeDatum = SankeyNode<{ name: string; color: string; column: number; rawName?: string }, object>;
type LinkDatum = SankeyLink<{ name: string; color: string; column: number }, object>;

const KNOWN_ACRONYMS = new Set(['GAO', 'DOJ', 'OIG', 'CBO', 'IG', 'HHS', 'DOD', 'IRS', 'CMS', 'OMB']);

function formatSourceType(raw: string): string {
  return raw
    .replace(/_/g, ' ')
    .replace(/\b\w+/g, (word) => {
      const upper = word.toUpperCase();
      if (KNOWN_ACRONYMS.has(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}

function formatCompact(n: number | null): string {
  if (n === null || n === undefined) return 'Unknown';
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

export function SankeyDiagram({ entries }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({ visible: false, x: 0, y: 0, content: '' });

  const draw = useCallback(
    (width: number) => {
      if (!svgRef.current || entries.length === 0) return;

      const height = Math.max(500, Math.min(800, entries.length * 8));
      const margin = { top: 20, right: 160, bottom: 20, left: 160 };
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      // ── Build node sets ──────────────────────────────────────────────────────
      const sourceTypeSet = new Set<string>();
      // Map: raw sourceType → formatted display name
      const sourceTypeDisplayMap = new Map<string, string>();
      // Map: category code → human-readable label
      const categoryLabelMap = new Map<string, string>();
      const tierSet = new Set<number>();

      entries.forEach((e) => {
        const st = e.sourceType?.trim() || 'Unknown';
        sourceTypeSet.add(st);
        if (!sourceTypeDisplayMap.has(st)) {
          sourceTypeDisplayMap.set(st, formatSourceType(st));
        }
        // Use categoryLabel (human-readable) if available, else fall back to category code
        const label = e.categoryLabel?.trim() || e.category;
        categoryLabelMap.set(e.category, label);
        if (e.certaintyTier !== null && e.certaintyTier !== undefined) {
          tierSet.add(e.certaintyTier);
        } else {
          tierSet.add(0);
        }
      });

      const sourceNodes = Array.from(sourceTypeSet).map((raw) => ({
        name: sourceTypeDisplayMap.get(raw) ?? raw,
        rawName: raw,
        color: '#6b7280',
        column: 0,
      }));

      const categoryNodes = Array.from(categoryLabelMap.entries()).map(([cat, label]) => {
        const entry = entries.find((e) => e.category === cat);
        const isFraud = entry?.type === 'fraud';
        return {
          name: label,
          rawName: cat,
          color: isFraud ? '#ef4444' : '#f59e0b',
          column: 1,
        };
      });

      const tierNodes = Array.from(tierSet)
        .sort()
        .map((tier) => {
          const tierNum = tier as number;
          const info = TIER_COLORS[tierNum] ?? { bg: '#6b7280', label: `Tier ${tier}` };
          return {
            name: tierNum === 0 ? 'Unknown Tier' : `Tier ${tierNum} – ${info.label}`,
            color: info.bg,
            column: 2,
          };
        });

      const allNodes = [...sourceNodes, ...categoryNodes, ...tierNodes];
      const nodeIndex = new Map(allNodes.map((n, i) => [n.name, i]));

      // ── Build links ──────────────────────────────────────────────────────────
      // Aggregate: sourceType → category, category → tier
      const srcCatMap = new Map<string, number>();
      const catTierMap = new Map<string, number>();

      // Build reverse lookup: raw → display name
      const rawToDisplaySource = new Map<string, string>();
      for (const [raw, display] of sourceTypeDisplayMap) {
        rawToDisplaySource.set(raw, display);
      }

      entries.forEach((e) => {
        const rawSt = e.sourceType?.trim() || 'Unknown';
        const displaySt = rawToDisplaySource.get(rawSt) ?? rawSt;
        const catLabel = categoryLabelMap.get(e.category) ?? e.category;
        const tier = e.certaintyTier ?? 0;
        const tierName =
          tier === 0 ? 'Unknown Tier' : `Tier ${tier} – ${TIER_COLORS[tier]?.label ?? tier}`;
        const amount = e.amountBest ?? 1_000_000;

        const scKey = `${displaySt}|||${catLabel}`;
        srcCatMap.set(scKey, (srcCatMap.get(scKey) ?? 0) + amount);

        const ctKey = `${catLabel}|||${tierName}`;
        catTierMap.set(ctKey, (catTierMap.get(ctKey) ?? 0) + amount);
      });

      const links: { source: number; target: number; value: number }[] = [];

      srcCatMap.forEach((value, key) => {
        const [src, cat] = key.split('|||');
        const s = nodeIndex.get(src);
        const t = nodeIndex.get(cat);
        if (s !== undefined && t !== undefined) {
          links.push({ source: s, target: t, value });
        }
      });

      catTierMap.forEach((value, key) => {
        const [cat, tier] = key.split('|||');
        const s = nodeIndex.get(cat);
        const t = nodeIndex.get(tier);
        if (s !== undefined && t !== undefined) {
          links.push({ source: s, target: t, value });
        }
      });

      // ── D3 Sankey ────────────────────────────────────────────────────────────
      // Use numeric indices for links (d3-sankey default expects index-based refs)
      const sankeyGen = sankey<{ name: string; color: string; column: number; rawName?: string }, object>()
        .nodeWidth(16)
        .nodePadding(12)
        .extent([
          [0, 0],
          [innerW, innerH],
        ]);

      // Filter out any links with undefined source/target indices
      const validLinks = links.filter(
        (l) => l.source !== undefined && l.target !== undefined && l.source !== l.target
      );

      const graph: SankeyGraph<
        { name: string; color: string; column: number; rawName?: string },
        object
      > = sankeyGen({
        nodes: allNodes.map((d) => ({ ...d })),
        links: validLinks.map((d) => ({ ...d })),
      });

      // ── Render ───────────────────────────────────────────────────────────────
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
      svg.attr('width', width).attr('height', height);

      const defs = svg.append('defs');

      // Define gradients per link
      graph.links.forEach((link, i) => {
        const srcNode = link.source as NodeDatum;
        const tgtNode = link.target as NodeDatum;
        const gradId = `link-grad-${i}`;
        const grad = defs
          .append('linearGradient')
          .attr('id', gradId)
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', srcNode.x1 ?? 0)
          .attr('x2', tgtNode.x0 ?? 0);
        grad.append('stop').attr('offset', '0%').attr('stop-color', srcNode.color);
        grad.append('stop').attr('offset', '100%').attr('stop-color', tgtNode.color);
      });

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Links
      const linkGroup = g.append('g').attr('class', 'links');

      const linkPaths = linkGroup
        .selectAll('path')
        .data(graph.links)
        .enter()
        .append('path')
        .attr('d', sankeyLinkHorizontal())
        .attr('stroke', (_, i) => `url(#link-grad-${i})`)
        .attr('stroke-width', (d) => Math.max(1, (d as LinkDatum).width ?? 1))
        .attr('stroke-opacity', 0.3)
        .attr('fill', 'none')
        .style('cursor', 'pointer')
        .on('mouseover', function (event: MouseEvent, d: unknown) {
          const ld = d as LinkDatum;
          d3.select(this).attr('stroke-opacity', 0.7);
          const srcNode = ld.source as NodeDatum;
          const tgtNode = ld.target as NodeDatum;
          const amount = ld.value ?? 0;
          setTooltip({
            visible: true,
            x: event.offsetX,
            y: event.offsetY,
            content: `${srcNode.name} → ${tgtNode.name}\n${formatCompact(amount)}`,
          });
        })
        .on('mousemove', function (event: MouseEvent) {
          setTooltip((prev) => ({ ...prev, x: event.offsetX, y: event.offsetY }));
        })
        .on('mouseout', function () {
          d3.select(this).attr('stroke-opacity', 0.3);
          setTooltip((prev) => ({ ...prev, visible: false }));
        });

      // Nodes
      const nodeGroup = g.append('g').attr('class', 'nodes');

      const nodeGs = nodeGroup
        .selectAll('g')
        .data(graph.nodes)
        .enter()
        .append('g')
        .style('cursor', 'pointer')
        .on('mouseover', function (_event: MouseEvent, d: unknown) {
          const nd = d as NodeDatum;
          // highlight connected links
          linkPaths.attr('stroke-opacity', (ld: unknown) => {
            const l = ld as LinkDatum;
            const src = l.source as NodeDatum;
            const tgt = l.target as NodeDatum;
            return src.name === nd.name || tgt.name === nd.name ? 0.75 : 0.08;
          });
        })
        .on('mouseout', function () {
          linkPaths.attr('stroke-opacity', 0.3);
        });

      nodeGs
        .append('rect')
        .attr('x', (d) => (d as NodeDatum).x0 ?? 0)
        .attr('y', (d) => (d as NodeDatum).y0 ?? 0)
        .attr('width', (d) => ((d as NodeDatum).x1 ?? 0) - ((d as NodeDatum).x0 ?? 0))
        .attr('height', (d) => Math.max(1, ((d as NodeDatum).y1 ?? 0) - ((d as NodeDatum).y0 ?? 0)))
        .attr('fill', (d) => (d as NodeDatum).color)
        .attr('rx', 3);

      // Labels
      nodeGs
        .append('text')
        .attr('x', (d) => {
          const nd = d as NodeDatum;
          return nd.column === 0 ? (nd.x0 ?? 0) - 8 : (nd.x1 ?? 0) + 8;
        })
        .attr('y', (d) => {
          const nd = d as NodeDatum;
          return ((nd.y0 ?? 0) + (nd.y1 ?? 0)) / 2;
        })
        .attr('dy', '0.35em')
        .attr('text-anchor', (d) => ((d as NodeDatum).column === 0 ? 'end' : 'start'))
        .attr('fill', '#e5e7eb')
        .attr('font-size', '11px')
        .attr('font-family', 'system-ui, sans-serif')
        .text((d) => (d as NodeDatum).name)
        .each(function (d) {
          const nd = d as NodeDatum;
          const nodeH = (nd.y1 ?? 0) - (nd.y0 ?? 0);
          if (nodeH < 14) d3.select(this).attr('display', 'none');
        });
    },
    [entries]
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      if (w > 0) draw(w);
    });
    ro.observe(containerRef.current);
    const w = containerRef.current.getBoundingClientRect().width;
    if (w > 0) draw(w);
    return () => ro.disconnect();
  }, [draw]);

  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No entries to display
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <svg ref={svgRef} className="w-full" />
      {tooltip.visible && (
        <div
          className="pointer-events-none absolute z-50 px-3 py-2 rounded-lg text-xs text-white whitespace-pre-line"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 8,
            background: 'rgba(15,23,42,0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            maxWidth: 220,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
