'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronRight,
  Download,
  ExternalLink,
} from 'lucide-react';
import { useEvidenceData } from '@/hooks/useEvidenceData';
import { formatCompact, formatFiscalYear, getTierInfo } from '@/lib/utils';
import { CATEGORY_LABELS, TIER_COLORS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { EvidenceEntry } from '@/lib/types';

const PAGE_SIZE = 20;

// ─── Sort config ──────────────────────────────────────────────────────────────
type SortKey =
  | 'certaintyTier'
  | 'id'
  | 'title'
  | 'category'
  | 'amountBest'
  | 'fiscalYearStart'
  | 'sourceName';

type SortDir = 'asc' | 'desc';

function compareEntries(
  a: EvidenceEntry,
  b: EvidenceEntry,
  key: SortKey,
  dir: SortDir
): number {
  let av: string | number | null = a[key] as string | number | null;
  let bv: string | number | null = b[key] as string | number | null;

  if (av == null && bv == null) return 0;
  if (av == null) return dir === 'asc' ? 1 : -1;
  if (bv == null) return dir === 'asc' ? -1 : 1;

  if (typeof av === 'string' && typeof bv === 'string') {
    av = av.toLowerCase();
    bv = bv.toLowerCase();
  }

  if (av < bv) return dir === 'asc' ? -1 : 1;
  if (av > bv) return dir === 'asc' ? 1 : -1;
  return 0;
}

// ─── CSV export ───────────────────────────────────────────────────────────────
function exportCSV(entries: EvidenceEntry[]) {
  const headers = [
    'ID',
    'Title',
    'Type',
    'Category',
    'Category Label',
    'Tier',
    'Amount Best',
    'Amount Low',
    'Amount High',
    'FY Start',
    'FY End',
    'Period Type',
    'Source Name',
    'Source URL',
    'Source Type',
    'Jurisdiction',
    'Safe To Sum',
    'Overlap Notes',
    'Entity Links',
  ];

  const escapeCell = (v: string | number | boolean | null | undefined): string => {
    if (v == null) return '';
    const s = String(v);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const rows = entries.map((e) =>
    [
      e.id,
      e.title,
      e.type,
      e.category,
      e.categoryLabel,
      e.certaintyTier,
      e.amountBest,
      e.amountLow,
      e.amountHigh,
      e.fiscalYearStart,
      e.fiscalYearEnd,
      e.periodType,
      e.sourceName,
      e.sourceUrl,
      e.sourceType,
      e.jurisdiction,
      e.safeToSum,
      e.overlapNotes,
      e.entityLinks.join('; '),
    ]
      .map(escapeCell)
      .join(',')
  );

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `fraud-waste-evidence-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

// ─── Sort header cell ─────────────────────────────────────────────────────────
function SortHead({
  label,
  colKey,
  sortKey,
  sortDir,
  onSort,
  className,
}: {
  label: string;
  colKey: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (k: SortKey) => void;
  className?: string;
}) {
  const isActive = colKey === sortKey;
  return (
    <TableHead
      className={`cursor-pointer select-none whitespace-nowrap hover:text-foreground transition-colors ${className ?? ''}`}
      onClick={() => onSort(colKey)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {isActive ? (
          sortDir === 'asc' ? (
            <ChevronUp className="w-3 h-3 text-primary" />
          ) : (
            <ChevronDown className="w-3 h-3 text-primary" />
          )
        ) : (
          <ChevronsUpDown className="w-3 h-3 opacity-30" />
        )}
      </span>
    </TableHead>
  );
}

// ─── Expanded row detail ──────────────────────────────────────────────────────
function ExpandedDetail({ entry }: { entry: EvidenceEntry }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="overflow-hidden"
    >
      <div className="px-4 py-4 space-y-3 bg-white/[0.02] border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Methodology */}
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
              Methodology
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {entry.sourceMethodology || '—'}
            </p>
          </div>

          {/* Overlap notes */}
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
              Overlap Notes
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {entry.overlapNotes || 'None noted.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-start text-xs">
          {/* Source URL */}
          {entry.sourceUrl && (
            <a
              href={entry.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              {entry.sourceName}
            </a>
          )}

          {/* Source type + orientation */}
          <span className="text-muted-foreground">
            {entry.sourceType} · {entry.sourceOrientation}
          </span>

          {/* Jurisdiction */}
          <span className="text-muted-foreground capitalize">
            {entry.jurisdiction}
          </span>

          {/* Safe to sum */}
          <span
            className={`font-medium ${entry.safeToSum ? 'text-green-400' : 'text-red-400'}`}
          >
            {entry.safeToSum ? '✓ Safe to sum' : '✗ Do not sum alone'}
          </span>
        </div>

        {/* Entity links */}
        {entry.entityLinks.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {entry.entityLinks.map((entity) => (
              <span
                key={entity}
                className="px-2 py-0.5 text-[10px] rounded-md font-medium"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {entity}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function EvidenceTable() {
  const { filteredEntries } = useEvidenceData();
  const [sortKey, setSortKey] = useState<SortKey>('certaintyTier');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const handleSort = useCallback(
    (key: SortKey) => {
      if (key === sortKey) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(key);
        setSortDir('asc');
      }
      setPage(1);
    },
    [sortKey]
  );

  const sorted = useMemo(
    () => [...filteredEntries].sort((a, b) => compareEntries(a, b, sortKey, sortDir)),
    [filteredEntries, sortKey, sortDir]
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageEntries = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const toggleRow = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const tierSortProps = { sortKey, sortDir, onSort: handleSort };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Evidence Table</span>
          <Badge variant="secondary" className="text-xs font-mono">
            {filteredEntries.length} entries
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs border-white/10 hover:bg-white/5"
          onClick={() => exportCSV(sorted)}
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="w-8" /> {/* expand toggle */}
                <SortHead
                  label="Tier"
                  colKey="certaintyTier"
                  {...tierSortProps}
                  className="w-16"
                />
                <SortHead
                  label="ID"
                  colKey="id"
                  {...tierSortProps}
                  className="w-20"
                />
                <SortHead
                  label="Title"
                  colKey="title"
                  {...tierSortProps}
                  className="min-w-[220px]"
                />
                <SortHead
                  label="Category"
                  colKey="category"
                  {...tierSortProps}
                  className="w-28"
                />
                <SortHead
                  label="Amount"
                  colKey="amountBest"
                  {...tierSortProps}
                  className="w-24 text-right"
                />
                <SortHead
                  label="Fiscal Year"
                  colKey="fiscalYearStart"
                  {...tierSortProps}
                  className="w-28"
                />
                <SortHead
                  label="Source"
                  colKey="sourceName"
                  {...tierSortProps}
                  className="w-36"
                />
                <TableHead className="min-w-[120px]">Entities</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageEntries.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center text-sm text-muted-foreground py-10"
                  >
                    No entries match current filters.
                  </TableCell>
                </TableRow>
              )}
              {pageEntries.map((entry) => {
                const tierInfo = getTierInfo(entry.certaintyTier);
                const isExpanded = expandedId === entry.id;
                const catInfo = CATEGORY_LABELS[entry.category];

                return (
                  <>
                    <TableRow
                      key={entry.id}
                      className="border-white/5 cursor-pointer transition-colors hover:bg-white/[0.03]"
                      onClick={() => toggleRow(entry.id)}
                    >
                      {/* Expand toggle */}
                      <TableCell className="w-8 py-2">
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                        </motion.div>
                      </TableCell>

                      {/* Tier */}
                      <TableCell className="py-2">
                        <span
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold"
                          style={{
                            backgroundColor: `${tierInfo.bg}20`,
                            color: tierInfo.bg,
                            border: `1px solid ${tierInfo.bg}40`,
                          }}
                        >
                          T{entry.certaintyTier ?? '?'}
                        </span>
                      </TableCell>

                      {/* ID */}
                      <TableCell className="py-2">
                        <span
                          className="text-xs font-mono font-semibold"
                          style={{
                            color:
                              entry.type === 'fraud' ? '#ef4444' : '#f59e0b',
                          }}
                        >
                          {entry.id}
                        </span>
                      </TableCell>

                      {/* Title */}
                      <TableCell className="py-2 max-w-xs">
                        <span className="text-xs text-foreground line-clamp-2 leading-snug">
                          {entry.title}
                        </span>
                      </TableCell>

                      {/* Category */}
                      <TableCell className="py-2">
                        <span className="text-xs font-mono text-muted-foreground">
                          {entry.category}
                        </span>
                        {catInfo && (
                          <p className="text-[9px] text-muted-foreground/60 leading-tight mt-0.5 hidden sm:block">
                            {catInfo.label}
                          </p>
                        )}
                      </TableCell>

                      {/* Amount */}
                      <TableCell className="py-2 text-right">
                        <span
                          className="text-xs font-mono font-semibold"
                          style={{
                            color:
                              entry.type === 'fraud' ? '#ef4444' : '#f59e0b',
                          }}
                        >
                          {entry.amountBest != null
                            ? formatCompact(entry.amountBest)
                            : '—'}
                        </span>
                        {(entry.amountLow != null || entry.amountHigh != null) && (
                          <p className="text-[9px] text-muted-foreground/50 leading-tight mt-0.5">
                            {entry.amountLow != null
                              ? formatCompact(entry.amountLow)
                              : '?'}
                            –
                            {entry.amountHigh != null
                              ? formatCompact(entry.amountHigh)
                              : '?'}
                          </p>
                        )}
                      </TableCell>

                      {/* Fiscal Year */}
                      <TableCell className="py-2">
                        <span className="text-xs font-mono text-muted-foreground">
                          {formatFiscalYear(
                            entry.fiscalYearStart,
                            entry.fiscalYearEnd,
                            entry.periodType
                          )}
                        </span>
                      </TableCell>

                      {/* Source */}
                      <TableCell className="py-2 max-w-[140px]">
                        <span className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">
                          {entry.sourceName}
                        </span>
                      </TableCell>

                      {/* Entities */}
                      <TableCell className="py-2">
                        <div className="flex flex-wrap gap-1">
                          {entry.entityLinks.slice(0, 3).map((e) => (
                            <span
                              key={e}
                              className="px-1.5 py-0.5 text-[9px] rounded font-medium"
                              style={{
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                color: 'rgba(255,255,255,0.5)',
                                border: '1px solid rgba(255,255,255,0.06)',
                              }}
                            >
                              {e}
                            </span>
                          ))}
                          {entry.entityLinks.length > 3 && (
                            <span className="text-[9px] text-muted-foreground/50">
                              +{entry.entityLinks.length - 3}
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Expanded detail row */}
                    <AnimatePresence>
                      {isExpanded && (
                        <tr key={`${entry.id}-detail`}>
                          <td colSpan={9} className="p-0 border-b border-white/5">
                            <ExpandedDetail entry={entry} />
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing {(safePage - 1) * PAGE_SIZE + 1}–
            {Math.min(safePage * PAGE_SIZE, sorted.length)} of {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              disabled={safePage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </Button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              // Show pages around current
              const midPoint = Math.min(
                Math.max(safePage, 4),
                totalPages - 3
              );
              const pageNum =
                totalPages <= 7
                  ? i + 1
                  : i === 0
                  ? 1
                  : i === 6
                  ? totalPages
                  : midPoint - 2 + i;
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === safePage ? 'secondary' : 'ghost'}
                  size="sm"
                  className="h-7 w-7 p-0 text-xs font-mono"
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              disabled={safePage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
