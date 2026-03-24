/**
 * utils.test.ts
 * Tests for utility functions in src/lib/utils.ts
 */

import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatCompact,
  getTierInfo,
  formatFiscalYear,
} from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats a large positive number', () => {
    expect(formatCurrency(98_340_000_000)).toBe('$98,340,000,000');
  });

  it('formats 1 billion', () => {
    expect(formatCurrency(1_000_000_000)).toBe('$1,000,000,000');
  });

  it('formats 0', () => {
    expect(formatCurrency(0)).toBe('$0');
  });

  it('returns N/A for null', () => {
    expect(formatCurrency(null)).toBe('N/A');
  });

  it('returns N/A for undefined', () => {
    expect(formatCurrency(undefined)).toBe('N/A');
  });

  it('formats a small amount', () => {
    expect(formatCurrency(500)).toBe('$500');
  });
});

describe('formatCompact', () => {
  it('formats 1 billion as $1.0B', () => {
    expect(formatCompact(1_000_000_000)).toBe('$1.0B');
  });

  it('formats 98.3 billion as $98.3B', () => {
    expect(formatCompact(98_300_000_000)).toBe('$98.3B');
  });

  it('formats 500 million as $500.0M', () => {
    expect(formatCompact(500_000_000)).toBe('$500.0M');
  });

  it('formats 15 thousand as $15.0K', () => {
    expect(formatCompact(15_000)).toBe('$15.0K');
  });

  it('returns N/A for null', () => {
    expect(formatCompact(null)).toBe('N/A');
  });

  it('returns N/A for undefined', () => {
    expect(formatCompact(undefined)).toBe('N/A');
  });

  it('formats 1 trillion as $1.0T', () => {
    expect(formatCompact(1_000_000_000_000)).toBe('$1.0T');
  });

  it('handles negative amounts with sign', () => {
    expect(formatCompact(-5_000_000_000)).toBe('-$5.0B');
  });

  it('formats amounts under 1K directly', () => {
    expect(formatCompact(500)).toBe('$500');
  });
});

describe('getTierInfo', () => {
  it('tier 1 returns Confirmed', () => {
    const info = getTierInfo(1);
    expect(info.label).toBe('Confirmed');
    expect(info.icon).toBe('✅');
    expect(info.bg).toBeTruthy();
  });

  it('tier 2 returns Estimated', () => {
    const info = getTierInfo(2);
    expect(info.label).toBe('Estimated');
    expect(info.icon).toBe('🔵');
  });

  it('tier 3 returns Researched', () => {
    const info = getTierInfo(3);
    expect(info.label).toBe('Researched');
    expect(info.icon).toBe('🔶');
  });

  it('tier 4 returns Reported', () => {
    const info = getTierInfo(4);
    expect(info.label).toBe('Reported');
    expect(info.icon).toBe('🔸');
  });

  it('null returns Unknown fallback', () => {
    const info = getTierInfo(null);
    expect(info.label).toBe('Unknown');
    expect(info.icon).toBe('❓');
  });

  it('undefined returns Unknown fallback', () => {
    const info = getTierInfo(undefined);
    expect(info.label).toBe('Unknown');
  });

  it('invalid tier returns fallback with ? icon', () => {
    const info = getTierInfo(99);
    expect(info.icon).toBe('❓');
  });
});

describe('formatFiscalYear', () => {
  it('single year returns FY{year}', () => {
    expect(formatFiscalYear(2024, null)).toBe('FY2024');
    expect(formatFiscalYear(2024, 2024)).toBe('FY2024');
    expect(formatFiscalYear(2024, 2024, 'single_year')).toBe('FY2024');
  });

  it('null start returns N/A', () => {
    expect(formatFiscalYear(null, 2024)).toBe('N/A');
  });

  it('multi-year periodType returns FY{start}–{end}', () => {
    expect(formatFiscalYear(2020, 2025, 'multi_year')).toBe('FY2020–2025');
  });

  it('cumulative periodType includes (cum.) suffix', () => {
    expect(formatFiscalYear(2001, 2024, 'cumulative')).toBe('FY2001–2024 (cum.)');
  });

  it('range without periodType returns FY{start}–{end}', () => {
    expect(formatFiscalYear(2020, 2024)).toBe('FY2020–2024');
  });
});
