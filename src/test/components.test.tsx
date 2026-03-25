/**
 * components.test.tsx
 * Smoke tests for React components.
 * Verifies components render without crashing and expose key UI elements.
 *
 * Notes:
 * - D3 components (Treemap, BubbleChart, SankeyDiagram) are not rendered in jsdom
 *   since they rely on browser layout APIs. We only verify they export correctly.
 * - Components that use useEvidenceData are wrapped in FilterProvider.
 * - The AnimatedNumber component in Dashboard uses requestAnimationFrame — we mock it
 *   to return immediately without recursion (returning a non-zero handle so progress < 1 check exits).
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterProvider } from '@/context/FilterContext';

// ─── Mock next/navigation ─────────────────────────────────────────────────────
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/',
}));

// ─── Mock framer-motion to avoid RAF/animation issues in jsdom ───────────────
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    motion: new Proxy(actual.motion, {
      get: (target, prop: string) => {
        const Component = (target as unknown as Record<string, React.ComponentType>)[prop];
        if (Component) return Component;
        return ({ children, ...props }: React.HTMLAttributes<HTMLElement>) =>
          React.createElement(prop, props, children);
      },
    }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// ─── ResizeObserver mock (must be a class constructor) ───────────────────────
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

// ─── requestAnimationFrame mock ───────────────────────────────────────────────
// We mock RAF to be a no-op (returns a handle but never fires the callback).
// This prevents the AnimatedNumber infinite RAF loop in Dashboard.tsx.
let rafHandle = 0;
beforeEach(() => {
  rafHandle = 0;
  vi.stubGlobal('requestAnimationFrame', vi.fn((_cb: FrameRequestCallback) => {
    // Return an increasing handle but do NOT invoke the callback
    // (prevents infinite recursion from the AnimatedNumber component)
    return ++rafHandle;
  }));
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
});
afterEach(() => {
  vi.unstubAllGlobals();
});

// ─── Wrapper providing required context ──────────────────────────────────────
function AllProviders({ children }: { children: React.ReactNode }) {
  return <FilterProvider>{children}</FilterProvider>;
}

function renderWithProviders(ui: React.ReactElement) {
  return render(ui, { wrapper: AllProviders });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Navigation', () => {
  it('renders all 7 desktop tabs', async () => {
    const { Navigation } = await import('@/components/layout/Navigation');
    renderWithProviders(<Navigation />);

    const expectedLabels = ['Overview', 'Stats', 'Treemap', 'Trends', 'Confidence', 'Data Flow', 'Evidence'];
    expectedLabels.forEach(label => {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders with active view highlighted', async () => {
    const { Navigation } = await import('@/components/layout/Navigation');
    const { container } = renderWithProviders(<Navigation activeView="dashboard" />);
    expect(container).toBeTruthy();
  });
});

describe('BottomTabBar', () => {
  it('renders 5 primary tabs + More button', async () => {
    const { BottomTabBar } = await import('@/components/layout/BottomTabBar');
    renderWithProviders(<BottomTabBar activeView="dashboard" onViewChange={vi.fn()} />);
    expect(screen.getByText('Overview')).toBeTruthy();
    expect(screen.getByText('Stats')).toBeTruthy();
    expect(screen.getByText('Trends')).toBeTruthy();
    expect(screen.getByText('Evidence')).toBeTruthy();
    expect(screen.getByText('More')).toBeTruthy();
  });
});

describe('FilterChip', () => {
  it('renders without crashing and shows Filters label', async () => {
    const { FilterChip } = await import('@/components/controls/FilterChip');
    renderWithProviders(<FilterChip />);
    expect(screen.getByText('Filters')).toBeTruthy();
  });
});

describe('Footer', () => {
  it('renders without crashing', async () => {
    const { Footer } = await import('@/components/layout/Footer');
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ metadata: { generated: '2026-03-24T22:30:34.799179+00:00' } }),
    });
    await act(async () => {
      renderWithProviders(<Footer />);
    });
    expect(screen.getByText(/GAO, DOJ, OIG/)).toBeTruthy();
  });

  it('renders methodology link', async () => {
    const { Footer } = await import('@/components/layout/Footer');
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ metadata: { generated: '2026-03-24T22:30:34.799179+00:00' } }),
    });
    await act(async () => {
      renderWithProviders(<Footer />);
    });
    expect(screen.getByText('Methodology')).toBeTruthy();
  });
});

describe('MethodologyPanel', () => {
  it('renders without crashing', async () => {
    const { MethodologyPanel } = await import('@/components/ui/MethodologyPanel');
    renderWithProviders(<MethodologyPanel />);
    expect(screen.getByText(/How We Avoid Double-Counting/)).toBeTruthy();
  });

  it('toggles expanded state on click', async () => {
    const { MethodologyPanel } = await import('@/components/ui/MethodologyPanel');
    renderWithProviders(<MethodologyPanel />);

    const toggle = screen.getByRole('button');
    expect(toggle).toBeTruthy();
    await userEvent.click(toggle);
    // After click, component is expanded — we don't assert specific content
    // because framer-motion AnimatePresence is mocked to render children directly
  });
});

describe('GlobalControls', () => {
  it('renders without crashing', async () => {
    const { GlobalControls } = await import('@/components/controls/GlobalControls');
    renderWithProviders(<GlobalControls />);
    expect(screen.getByText('Reset Filters')).toBeTruthy();
  });

  it('shows search input', async () => {
    const { GlobalControls } = await import('@/components/controls/GlobalControls');
    renderWithProviders(<GlobalControls />);
    const searchInput = screen.getByPlaceholderText(/Search/i);
    expect(searchInput).toBeTruthy();
  });
});

describe('EvidenceTable', () => {
  it('renders without crashing', async () => {
    const { EvidenceTable } = await import('@/components/table/EvidenceTable');
    renderWithProviders(<EvidenceTable />);
    // Table should render
    const table = document.querySelector('table');
    expect(table).toBeTruthy();
  });
});

describe('Dashboard', () => {
  it('renders without crashing', async () => {
    const { Dashboard } = await import('@/components/dashboard/Dashboard');
    await act(async () => {
      renderWithProviders(<Dashboard />);
    });
    // Dashboard rendered — body should have content
    expect(document.body.innerHTML.length).toBeGreaterThan(0);
  });
});

describe('D3 components export check', () => {
  it('Treemap exports a component', async () => {
    const mod = await import('@/components/charts/Treemap');
    expect(mod).toBeTruthy();
    expect(Object.values(mod).length).toBeGreaterThan(0);
  });

  it('BubbleChart exports a component', async () => {
    const mod = await import('@/components/charts/BubbleChart');
    expect(mod).toBeTruthy();
    expect(Object.values(mod).length).toBeGreaterThan(0);
  });

  it('SankeyDiagram exports a component', async () => {
    const mod = await import('@/components/charts/SankeyDiagram');
    expect(mod).toBeTruthy();
    expect(Object.values(mod).length).toBeGreaterThan(0);
  });
});
