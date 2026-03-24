import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TIER_COLORS } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as full dollar string: $98,340,000,000
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number as compact dollar string: $98.3B, $3.5B, $152M
 */
export function formatCompact(amount: number | null | undefined): string {
  if (amount == null) return 'N/A';
  
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  
  if (abs >= 1e12) {
    return `${sign}$${(abs / 1e12).toFixed(1)}T`;
  } else if (abs >= 1e9) {
    return `${sign}$${(abs / 1e9).toFixed(1)}B`;
  } else if (abs >= 1e6) {
    return `${sign}$${(abs / 1e6).toFixed(1)}M`;
  } else if (abs >= 1e3) {
    return `${sign}$${(abs / 1e3).toFixed(1)}K`;
  }
  return `${sign}$${abs}`;
}

/**
 * Get tier display info
 */
export function getTierInfo(tier: number | null | undefined) {
  if (tier == null) return { bg: '#6b7280', label: 'Unknown', icon: '❓' };
  const t = tier as keyof typeof TIER_COLORS;
  return TIER_COLORS[t] ?? { bg: '#6b7280', label: `Tier ${tier}`, icon: '❓' };
}

/**
 * Get a CSS-safe color hex for a tier
 */
export function getTierColor(tier: number | null | undefined): string {
  return getTierInfo(tier).bg;
}

/**
 * Format fiscal year display
 */
export function formatFiscalYear(start: number | null, end: number | null, periodType?: string): string {
  if (!start) return 'N/A';
  if (!end || start === end) return `FY${start}`;
  if (periodType === 'multi_year') return `FY${start}–${end}`;
  if (periodType === 'cumulative') return `FY${start}–${end} (cum.)`;
  return `FY${start}–${end}`;
}

/**
 * Get source type display label
 */
export function getSourceTypeLabel(sourceType: string): string {
  const labels: Record<string, string> = {
    agency_data: 'Agency Data',
    doj_settlement: 'DOJ Settlement',
    gao_audit: 'GAO Audit',
    ig_report: 'IG Report',
    think_tank: 'Think Tank',
    cbo_report: 'CBO Report',
    legislation: 'Legislation',
  };
  return labels[sourceType] ?? sourceType;
}

/**
 * Get orientation badge variant
 */
export function getOrientationVariant(orientation: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (orientation === 'nonpartisan') return 'secondary';
  if (orientation === 'left') return 'default';
  if (orientation === 'right') return 'destructive';
  return 'outline';
}
