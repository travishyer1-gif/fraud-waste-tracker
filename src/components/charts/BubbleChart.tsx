"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { EvidenceEntry } from '@/lib/types';
import { TIER_COLORS } from '@/lib/constants';
import { formatCompact, getTierInfo } from '@/lib/utils';

interface BubbleChartProps {
  entries: EvidenceEntry[];
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  entry: EvidenceEntry | null;
}

interface SimNode extends d3.SimulationNodeDatum {
  entry: EvidenceEntry;
  radius: number;
  color: string;
  targetX: number;
  targetY: number;
}

const TIER_ORDER = [1, 2, 3, 4] as const;

export default function BubbleChart({ entries }: BubbleChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<SimNode, undefined> | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 550 });
  const [selectedEntry, setSelectedEntry] = useState<EvidenceEntry | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, entry: null });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(obs => {
      const { width, height } = obs[0].contentRect;
      setDimensions({ width: Math.max(width, 300), height: Math.max(height, 400) });
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const buildNodes = useCallback((width: number, height: number): SimNode[] => {
    // Get unique categories and arrange in 4-column grid
    const allCats = Array.from(new Set(entries.map(e => e.category)));
    const COLS = 4;
    const cellW = width / COLS;
    const cellH = height / Math.ceil(allCats.length / COLS);

    const catPositions: Record<string, { x: number; y: number }> = {};
    allCats.forEach((cat, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      catPositions[cat] = {
        x: cellW * col + cellW / 2,
        y: cellH * row + cellH / 2,
      };
    });

    // Scale factor to fit bubbles
    const maxLogVal = Math.max(...entries.map(e => Math.log10(Math.max(e.amountBest ?? 1e6, 1e6))));
    const scaleFactor = Math.min(cellW, cellH) / (maxLogVal * 2.5);

    return entries.map(entry => {
      const logVal = Math.log10(Math.max(entry.amountBest ?? 1e6, 1e6));
      const radius = Math.max(logVal * scaleFactor, 6);
      const tier = entry.certaintyTier as keyof typeof TIER_COLORS;
      const color = tier && TIER_COLORS[tier] ? TIER_COLORS[tier].bg : '#6b7280';
      const pos = catPositions[entry.category] ?? { x: width / 2, y: height / 2 };
      return {
        entry,
        radius,
        color,
        targetX: pos.x,
        targetY: pos.y,
        x: pos.x + (Math.random() - 0.5) * 50,
        y: pos.y + (Math.random() - 0.5) * 50,
      };
    });
  }, [entries]);

  useEffect(() => {
    if (!svgRef.current || entries.length === 0) return;
    if (simulationRef.current) {
      simulationRef.current.stop();
      simulationRef.current = null;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const nodes = buildNodes(width, height);

    // Category labels
    const allCats = Array.from(new Set(entries.map(e => e.category)));
    const COLS = 4;
    const cellW = width / COLS;
    const cellH = height / Math.ceil(allCats.length / COLS);

    const labelG = svg.append('g').attr('class', 'category-labels');
    allCats.forEach((cat, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const cx = cellW * col + cellW / 2;
      const cy = cellH * row + 16;
      const entry = entries.find(e => e.category === cat);
      const label = entry?.categoryLabel ?? cat;
      labelG.append('text')
        .attr('x', cx)
        .attr('y', cy)
        .attr('text-anchor', 'middle')
        .attr('fill', 'rgba(255,255,255,0.4)')
        .attr('font-size', 11)
        .attr('font-weight', 600)
        .text(label.length > 18 ? label.slice(0, 16) + '…' : label);
    });

    // Circles
    const circleG = svg.append('g').attr('class', 'bubbles');
    const circles = circleG.selectAll<SVGCircleElement, SimNode>('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => d.color)
      .attr('stroke', 'rgba(255,255,255,0.2)')
      .attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .on('mousemove', (event: MouseEvent, d: SimNode) => {
        d3.select(event.currentTarget as SVGCircleElement)
          .transition().duration(150)
          .attr('r', d.radius * 1.15);
        setTooltip({ visible: true, x: event.clientX + 12, y: event.clientY - 10, entry: d.entry });
      })
      .on('mouseleave', (event: MouseEvent, d: SimNode) => {
        d3.select(event.currentTarget as SVGCircleElement)
          .transition().duration(150)
          .attr('r', d.radius);
        setTooltip(t => ({ ...t, visible: false }));
      })
      .on('click', (_event: MouseEvent, d: SimNode) => {
        setSelectedEntry(prev => prev?.id === d.entry.id ? null : d.entry);
      });

    const sim = d3.forceSimulation<SimNode>(nodes)
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.02))
      .force('charge', d3.forceManyBody<SimNode>().strength(-30))
      .force('collide', d3.forceCollide<SimNode>(d => d.radius + 2).strength(0.8))
      .force('x', d3.forceX<SimNode>(d => d.targetX).strength(0.3))
      .force('y', d3.forceY<SimNode>(d => d.targetY).strength(0.3))
      .on('tick', () => {
        circles
          .attr('cx', d => Math.max(d.radius, Math.min(width - d.radius, d.x ?? 0)))
          .attr('cy', d => Math.max(d.radius, Math.min(height - d.radius, d.y ?? 0)));
      });

    simulationRef.current = sim;

    return () => {
      sim.stop();
    };
  }, [entries, dimensions, buildNodes]);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Legends */}
      <div className="flex flex-wrap gap-6 mb-3 px-1">
        {/* Tier legend */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Certainty:</span>
          {TIER_ORDER.map(tier => {
            const info = TIER_COLORS[tier];
            return (
              <div key={tier} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ background: info.bg }} />
                <span className="text-xs text-gray-400">{info.label}</span>
              </div>
            );
          })}
        </div>
        {/* Size legend */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Size:</span>
          {[
            { label: '$1B', val: 1e9 },
            { label: '$10B', val: 1e10 },
            { label: '$100B', val: 1e11 },
          ].map(({ label, val }) => {
            const logVal = Math.log10(val);
            const sz = Math.max(logVal * 3, 4);
            return (
              <div key={label} className="flex items-center gap-1">
                <div
                  className="rounded-full border border-gray-500"
                  style={{ width: sz, height: sz, background: 'rgba(255,255,255,0.15)' }}
                />
                <span className="text-xs text-gray-400">{label}</span>
              </div>
            );
          })}
        </div>
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

      {/* Detail panel */}
      {selectedEntry && (
        <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4 text-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-base mb-1">{selectedEntry.title}</h3>
              <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-2">
                <span className="bg-white/10 rounded px-2 py-0.5">{selectedEntry.categoryLabel}</span>
                <span className="bg-white/10 rounded px-2 py-0.5 capitalize">{selectedEntry.type}</span>
                {selectedEntry.certaintyTier && (
                  <span className="rounded px-2 py-0.5 text-white font-medium"
                    style={{ background: getTierInfo(selectedEntry.certaintyTier).bg }}>
                    {getTierInfo(selectedEntry.certaintyTier).icon} {getTierInfo(selectedEntry.certaintyTier).label}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Amount (Best):</span>
                  <span className="text-green-400 font-mono ml-1">{formatCompact(selectedEntry.amountBest)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Low:</span>
                  <span className="text-gray-300 font-mono ml-1">{formatCompact(selectedEntry.amountLow)}</span>
                </div>
                <div>
                  <span className="text-gray-500">High:</span>
                  <span className="text-gray-300 font-mono ml-1">{formatCompact(selectedEntry.amountHigh)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Jurisdiction:</span>
                  <span className="text-gray-300 ml-1">{selectedEntry.jurisdiction}</span>
                </div>
                <div>
                  <span className="text-gray-500">Period:</span>
                  <span className="text-gray-300 ml-1">
                    {selectedEntry.fiscalYearStart}–{selectedEntry.fiscalYearEnd}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Safe to Sum:</span>
                  <span className={`ml-1 ${selectedEntry.safeToSum ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedEntry.safeToSum ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              {selectedEntry.overlapNotes && (
                <p className="text-gray-500 text-xs mt-2 italic">{selectedEntry.overlapNotes}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 text-xs shrink-0">
              <a
                href={selectedEntry.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline truncate max-w-[160px]"
              >
                {selectedEntry.sourceName}
              </a>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tooltip */}
      {tooltip.visible && tooltip.entry && (
        <div
          className="fixed z-50 bg-black/80 backdrop-blur border border-white/10 rounded-lg p-3 text-sm pointer-events-none max-w-xs"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-semibold text-white mb-1">{tooltip.entry.title}</div>
          <div className="text-green-400 font-mono">{formatCompact(tooltip.entry.amountBest)}</div>
          {tooltip.entry.certaintyTier && (
            <div className="text-gray-300 mt-1">
              {getTierInfo(tooltip.entry.certaintyTier).icon} {getTierInfo(tooltip.entry.certaintyTier).label}
            </div>
          )}
          <div className="text-gray-500 text-xs mt-1 truncate">{tooltip.entry.sourceName}</div>
        </div>
      )}
    </div>
  );
}
