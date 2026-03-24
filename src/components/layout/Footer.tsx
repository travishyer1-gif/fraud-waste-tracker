'use client';

import { useEffect, useState } from 'react';

function useGeneratedDate(): string {
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    fetch('/evidence.json')
      .then((r) => r.json())
      .then((data) => {
        const raw: string | undefined = data?.metadata?.generated;
        if (raw) {
          const d = new Date(raw);
          setDate(
            d.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          );
        }
      })
      .catch(() => {});
  }, []);

  return date;
}

interface FooterProps {
  onViewSourceData?: () => void;
}

export function Footer({ onViewSourceData }: FooterProps) {
  const lastUpdated = useGeneratedDate();

  const scrollToMethodology = () => {
    const el = document.getElementById('methodology');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 mt-auto">
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-muted-foreground/60">
          {/* Left: attribution */}
          <div className="space-y-1">
            <p>
              Data sourced from public records: GAO, DOJ, OIG reports,
              paymentaccuracy.gov, CBO
            </p>
            {lastUpdated && <p>Last updated: {lastUpdated}</p>}
            <p className="text-muted-foreground/40">
              Not affiliated with any government agency
            </p>
          </div>

          {/* Right: links */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={scrollToMethodology}
              className="hover:text-muted-foreground transition-colors underline underline-offset-2"
            >
              Methodology
            </button>
            {onViewSourceData ? (
              <button
                onClick={onViewSourceData}
                className="hover:text-muted-foreground transition-colors underline underline-offset-2"
              >
                View Source Data
              </button>
            ) : (
              <span className="opacity-40 cursor-default">View Source Data</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
