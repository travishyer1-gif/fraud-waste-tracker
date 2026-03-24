'use client';

import React from 'react';
import { useEvidenceData } from '@/hooks/useEvidenceData';
import { SankeyDiagram } from '../charts/SankeyDiagram';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class SankeyErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[SankeyDiagram] Render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] rounded-xl border border-white/10 bg-white/[0.02] gap-4 p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl">
            ⚠️
          </div>
          <div>
            <p className="text-white/70 font-medium text-sm">Source flow chart failed to render</p>
            <p className="text-white/35 text-xs mt-1 max-w-md">
              The D3 Sankey diagram encountered an error. This may be a browser compatibility issue
              or a data transformation problem.
            </p>
          </div>
          {this.state.error && (
            <pre className="text-[10px] text-red-400/60 bg-red-500/5 border border-red-500/10 rounded-lg p-3 max-w-full overflow-auto text-left">
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-3 py-1.5 text-xs rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function SankeyView() {
  const { filteredEntries } = useEvidenceData();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Evidence Source Flow</h2>
      <p className="text-gray-400">
        Where our evidence comes from, what it covers, and how confident each stream is.
      </p>
      <div className="min-h-[500px]">
        <SankeyErrorBoundary>
          <SankeyDiagram entries={filteredEntries} />
        </SankeyErrorBoundary>
      </div>
    </div>
  );
}
