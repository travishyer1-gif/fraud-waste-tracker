'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import type { EvidenceEntry } from '@/lib/types';
import { CATEGORY_LABELS, TIER_COLORS } from '@/lib/constants';
import { formatCompact, getTierInfo } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';

// ─── constants ────────────────────────────────────────────────────────────────
const MIN_RADIUS = 8;
const MAX_RADIUS = 52;
const NULL_AMOUNT = 25_000_000;

const CATEGORY_STROKE_PALETTE: Record<string, string> = {
  F1: '#818cf8', F2: '#a78bfa', F3: '#c084fc', F4: '#e879f9',
  F5: '#f472b6', F6: '#fb7185', F7: '#f87171',
  W1: '#fbbf24', W2: '#fcd34d', W3: '#a3e635', W4: '#d97706',
  W5: '#b45309', W6: '#f59e0b', W7: '#fed7aa',
};

// ─── types ────────────────────────────────────────────────────────────────────
interface SimNode extends d3.SimulationNodeDatum {
  entry: EvidenceEntry;
  r: number;
  color: string;
  stroke: string;
  targetX: number;
  targetY: number;
}

interface TooltipState {
  x: number; y: number;
  entry: EvidenceEntry;
}

// ─── helpers ──────────────────────────────────────────────────────────────────
function radiusForAmount(amount: number | null, rScale: d3.ScaleLogarithmic<number, number>): number {
  return rScale(amount ?? NULL_AMOUNT);
}

function getCategoryCenter(
  cat: string,
  cats: string[],
  cx: number,
  cy: number,
  spread: number,
): { x: number; y: number } {
  const idx = cats.indexOf(cat);
  const total = cats.length;
  const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
  return { x: cx + spread * Math.cos(angle), y: cy + spread * Math.sin(angle) };
}

// ─── detail panel ─────────────────────────────────────────────────────────────
function DetailPanel({ entry, onClose }: { entry: EvidenceEntry; onClose: () => void }) {
  const tierInfo = getTierInfo(entry.certaintyTier);
  const typeColor = entry.type === 'fraud' ? '#ef4444' : '#f59e0b';

  return (
    <div className="absolute inset-y-0 right-0 w-72 z-40 backdrop-blur-xl bg-black/90 border-l border-white/10 flex flex-col shadow-2xl">
      <div className="flex items-start justify-between p-4 border-b border-white/10">
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-mono border"
              style={{ borderColor: typeColor, color: typeColor }}
            >
              {entry.id}
            </span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-medium"
              style={{ backgroundColor: tierInfo.bg + '25', color: tierInfo.bg }}
            >
              {tierInfo.icon} T{entry.certaintyTier}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-white leading-snug">{entry.title}</h3>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors text-lg leading-none ml-1">×</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
        {entry.amountBest != null && (
          <div>
            <p className="text-muted-foreground mb-0.5">Best Estimate</p>
            <p className="font-mono text-lg font-bold" style={{ color: typeColor }}>
              {formatCompact(entry.amountBest)}
            </p>
            {(entry.amountLow != null || entry.amountHigh != null) && (
              <p className="text-muted-foreground font-mono text-[10px] mt-0.5">
                Range: {formatCompact(entry.amountLow)} – {formatCompact(entry.amountHigh)}
              </p>
            )}
          </div>
        )}

        <Row label="Category" value={`${entry.category}: ${entry.categoryLabel}`} />
        <Row label="Type" value={entry.type.charAt(0).toUpperCase() + entry.type.slice(1)} />
        <Row label="Jurisdiction" value={entry.jurisdiction} />
        {entry.fiscalYearStart && (
          <Row label="Fiscal Year" value={entry.fiscalYearEnd && entry.fiscalYearEnd !== entry.fiscalYearStart ? `FY${entry.fiscalYearStart}–${entry.fiscalYearEnd}` : `FY${entry.fiscalYearStart}`} />
        )}

        <div>
          <p className="text-muted-foreground mb-0.5">Source</p>
          <p className="text-white">{entry.sourceName}</p>
          <p className="text-muted-foreground text-[10px] mt-0.5 uppercase tracking-wide">{entry.sourceType.replace(/_/g, ' ')}</p>
        </div>

        <Row label="Methodology" value={entry.sourceMethodology} />
        {entry.overlapNotes && <Row label="Overlap Notes" value={entry.overlapNotes} />}

        {entry.entityLinks.length > 0 && (
          <div>
            <p className="text-muted-foreground mb-1">Related Entities</p>
            <div className="flex flex-wrap gap-1">
              {entry.entityLinks.map(e => (
                <span key={e} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground">{e}</span>
              ))}
            </div>
          </div>
        )}

        {entry.sourceUrl && (
          <a
            href={entry.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-1.5 px-3 rounded border border-white/10 text-muted-foreground hover:text-white hover:border-white/30 transition-colors text-[10px] mt-2"
          >
            View Source ↗
          </a>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground mb-0.5">{label}</p>
      <p className="text-white">{value || '—'}</p>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export function BubbleChart({ entries }: { entries: EvidenceEntry[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<SimNode, undefined> | null>(null);
  const isMobile = useIsMobile();

  const [dimensions, setDimensions] = useState({ width: 700, height: 500 });
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [selected, setSelected] = useState<EvidenceEntry | null>(null);

  // ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setDimensions({ width: Math.max(width, 300), height: Math.max(height, 300) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Build / rebuild simulation whenever entries or dimensions change
  useEffect(() => {
    const svg = d3.select(svgRef.current!);
    svg.selectAll('*').remove();

    if (!entries.length) return;

    const { width, height } = dimensions;
    const cx = width / 2;
    const cy = height / 2;

    // Stop old simulation
    if (simulationRef.current) {
      simulationRef.current.stop();
      simulationRef.current = null;
    }

    // ── radius scale (scaled by container width for mobile) ──────────────────
    const radiusScale = Math.min(width / 800, 1);
    const minR = Math.max(MIN_RADIUS * radiusScale, 5);
    const maxR = Math.max(MAX_RADIUS * radiusScale, 20);

    const amounts = entries.map(e => e.amountBest ?? NULL_AMOUNT);
    const [minA, maxA] = [Math.min(...amounts), Math.max(...amounts)];
    const rScale = d3.scaleLog<number, number>()
      .domain([Math.max(minA, 1), Math.max(maxA, 1)])
      .range([minR, maxR])
      .clamp(true);

    // ── category cluster centers ─────────────────────────────────────────────
    const cats = Array.from(new Set(entries.map(e => e.category))).sort();

    // On mobile, only show labels for top 5 categories by entry count
    const catEntryCounts = new Map<string, number>();
    for (const e of entries) catEntryCounts.set(e.category, (catEntryCounts.get(e.category) ?? 0) + 1);
    const top5Cats = new Set(
      [...catEntryCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([c]) => c)
    );

    const spread = Math.min(width, height) * 0.3;

    // ── build nodes ──────────────────────────────────────────────────────────
    const nodes: SimNode[] = entries.map(e => {
      const center = getCategoryCenter(e.category, cats, cx, cy, spread);
      const tier = e.certaintyTier as keyof typeof TIER_COLORS;
      return {
        entry: e,
        r: radiusForAmount(e.amountBest, rScale),
        color: (TIER_COLORS[tier]?.bg ?? '#6b7280') + 'cc',
        stroke: CATEGORY_STROKE_PALETTE[e.category] ?? '#ffffff44',
        targetX: center.x + (Math.random() - 0.5) * 40,
        targetY: center.y + (Math.random() - 0.5) * 40,
        x: center.x + (Math.random() - 0.5) * 60,
        y: center.y + (Math.random() - 0.5) * 60,
      };
    });

    // ── SVG layers ───────────────────────────────────────────────────────────
    const categoryLabelLayer = svg.append('g').attr('class', 'category-labels');
    const bubbleLayer        = svg.append('g').attr('class', 'bubbles');

    // ── category labels (mobile: only top 5) ────────────────────────────────
    const catGroups = cats
      .filter(cat => !isMobile || top5Cats.has(cat))
      .map(cat => {
        const center = getCategoryCenter(cat, cats, cx, cy, spread);
        const info = CATEGORY_LABELS[cat];
        return { cat, center, label: info ? `${cat}` : cat };
      });

    categoryLabelLayer.selectAll('text')
      .data(catGroups)
      .join('text')
      .attr('x', d => d.center.x)
      .attr('y', d => d.center.y)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', d => CATEGORY_STROKE_PALETTE[d.cat] ?? '#ffffff44')
      .attr('font-size', 11)
      .attr('font-weight', '700')
      .attr('opacity', 0.35)
      .attr('letter-spacing', 1)
      .text(d => d.label)
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    // ── bubble groups ────────────────────────────────────────────────────────
    const groups = bubbleLayer.selectAll<SVGGElement, SimNode>('g')
      .data(nodes, d => d.entry.id)
      .join('g')
      .attr('class', 'bubble-group')
      .style('cursor', 'pointer');

    groups.append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => d.color)
      .attr('stroke', d => d.stroke)
      .attr('stroke-width', 1.2)
      .attr('stroke-opacity', 0.6);

    // Tiny tier label inside large bubbles — hidden on mobile (show on tap instead)
    if (!isMobile) {
      groups.filter(d => d.r >= 24)
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('dy', '0.05em')
        .attr('font-size', d => Math.min(d.r * 0.42, 13))
        .attr('fill', '#ffffffcc')
        .attr('font-weight', '600')
        .style('pointer-events', 'none')
        .style('user-select', 'none')
        .text(d => formatCompact(d.entry.amountBest));
    }

    // ── drag behavior ────────────────────────────────────────────────────────
    const drag = d3.drag<SVGGElement, SimNode>()
      .on('start', (event, d) => {
        if (!event.active) sim.alphaTarget(0.15).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    groups.call(drag);

    // ── hover / click (touch-friendly) ───────────────────────────────────────
    groups
      .on('mouseenter', function (event: MouseEvent, d: SimNode) {
        d3.select(this).select('circle')
          .transition().duration(150)
          .attr('r', d.r * 1.12)
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 1);

        const containerRect = containerRef.current!.getBoundingClientRect();
        setTooltip({
          x: event.clientX - containerRect.left,
          y: event.clientY - containerRect.top,
          entry: d.entry,
        });
      })
      .on('mousemove', function (event: MouseEvent) {
        const containerRect = containerRef.current!.getBoundingClientRect();
        setTooltip(prev => prev
          ? { ...prev, x: event.clientX - containerRect.left, y: event.clientY - containerRect.top }
          : null
        );
      })
      .on('mouseleave', function (_event: MouseEvent, d: SimNode) {
        d3.select(this).select('circle')
          .transition().duration(150)
          .attr('r', d.r)
          .attr('stroke-width', 1.2)
          .attr('stroke-opacity', 0.6);
        setTooltip(null);
      })
      .on('click', (event: MouseEvent, d: SimNode) => {
        // On mobile, show tooltip on tap
        if (isMobile) {
          const containerRect = containerRef.current!.getBoundingClientRect();
          setTooltip({
            x: event.clientX - containerRect.left,
            y: event.clientY - containerRect.top,
            entry: d.entry,
          });
        }
        setSelected(prev => prev?.id === d.entry.id ? null : d.entry);
      });

    // ── d3-zoom for pinch-to-zoom on mobile ─────────────────────────────────
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 4])
      .on('zoom', (event) => {
        bubbleLayer.attr('transform', event.transform);
        categoryLabelLayer.attr('transform', event.transform);
      });
    svg.call(zoom as unknown as (selection: d3.Selection<SVGSVGElement, unknown, null, undefined>) => void);

    // ── simulation ───────────────────────────────────────────────────────────
    const chargeStrength = isMobile ? -6 : -12; // tighter clusters on mobile

    const sim = d3.forceSimulation<SimNode>(nodes)
      .force('center', d3.forceCenter(cx, cy).strength(0.04))
      .force('charge', d3.forceManyBody().strength(chargeStrength))
      .force('collide', d3.forceCollide<SimNode>(d => d.r + 2.5).strength(0.85))
      .force('x', d3.forceX<SimNode>(d => d.targetX).strength(0.12))
      .force('y', d3.forceY<SimNode>(d => d.targetY).strength(0.12))
      .alphaDecay(0.018)
      .on('tick', () => {
        groups.attr('transform', d => `translate(${d.x ?? 0},${d.y ?? 0})`);
        // Keep in bounds
        nodes.forEach(n => {
          n.x = Math.max(n.r, Math.min(width - n.r, n.x ?? cx));
          n.y = Math.max(n.r, Math.min(height - n.r, n.y ?? cy));
        });
      });

    simulationRef.current = sim;

    return () => {
      sim.stop();
    };
  }, [entries, dimensions, isMobile]);

  // Update SVG dimensions on resize
  useEffect(() => {
    d3.select(svgRef.current!)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`);
  }, [dimensions]);

  const tierLegend = Object.entries(TIER_COLORS).map(([tier, info]) => ({ tier: Number(tier), ...info }));
  const sizeLegend = [
    { label: '$100M', amount: 1e8 },
    { label: '$1B',   amount: 1e9 },
    { label: '$100B', amount: 1e11 },
  ];

  return (
    <div ref={containerRef} className="relative flex-1 w-full min-h-[300px]">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="block"
        style={{ touchAction: 'none' }}
      />

      {/* Legends */}
      <div className="absolute bottom-3 left-3 flex flex-col gap-2 pointer-events-none">
        {/* Tier legend */}
        <div className="backdrop-blur-xl bg-black/70 border border-white/10 rounded-lg px-2.5 py-2 space-y-1">
          <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1.5">Confidence</p>
          {tierLegend.map(({ tier, bg, label, icon }) => (
            <div key={tier} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bg }} />
              <span className="text-[10px] text-white/70">{icon} {label}</span>
            </div>
          ))}
        </div>

        {/* Size legend — hidden on mobile to save space */}
        {!isMobile && (
          <div className="backdrop-blur-xl bg-black/70 border border-white/10 rounded-lg px-2.5 py-2">
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1.5">Size = Amount</p>
            <div className="flex items-end gap-3">
              {sizeLegend.map(({ label, amount }) => {
                const pct = Math.log10(amount) / Math.log10(3e12);
                const r = Math.round(MIN_RADIUS + pct * (MAX_RADIUS - MIN_RADIUS));
                return (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <div
                      className="rounded-full bg-white/15 border border-white/20"
                      style={{ width: r * 2, height: r * 2 }}
                    />
                    <span className="text-[9px] text-white/50">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Mobile pinch hint */}
      {isMobile && (
        <div className="absolute top-2 right-2 pointer-events-none">
          <span className="text-[9px] text-white/30 bg-black/40 px-1.5 py-0.5 rounded">
            Pinch to zoom · tap bubble
          </span>
        </div>
      )}

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 backdrop-blur-xl bg-black/80 border border-white/10 rounded-lg p-3 text-xs max-w-[220px] shadow-xl"
          style={{
            left: Math.min(tooltip.x + 14, dimensions.width - 240),
            top:  Math.max(tooltip.y - 14, 4),
          }}
        >
          <p className="font-semibold text-white leading-snug mb-1">{tooltip.entry.title}</p>
          {tooltip.entry.amountBest != null && (
            <p className="font-mono text-emerald-400">{formatCompact(tooltip.entry.amountBest)}</p>
          )}
          {(() => {
            const ti = getTierInfo(tooltip.entry.certaintyTier);
            return <p className="mt-0.5" style={{ color: ti.bg }}>{ti.icon} Tier {tooltip.entry.certaintyTier} — {ti.label}</p>;
          })()}
          <p className="text-muted-foreground mt-0.5">
            {tooltip.entry.category}: {CATEGORY_LABELS[tooltip.entry.category]?.label ?? tooltip.entry.category}
          </p>
          <p className="text-muted-foreground line-clamp-1 mt-0.5">{tooltip.entry.sourceName}</p>
          <p className="text-white/30 mt-1 text-[9px]">{isMobile ? 'Tap again to inspect' : 'Click to inspect · drag to move'}</p>
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <DetailPanel entry={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
