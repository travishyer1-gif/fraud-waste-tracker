'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check current class
    const html = document.documentElement;
    setIsDark(html.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-dark border-b border-white/10">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-tight text-foreground">
              Federal Fraud &amp; Waste Tracker
            </h1>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Evidence-Based · Non-Partisan · 78 Data Points
            </p>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:block text-xs text-muted-foreground">
            Data: FY2003–FY2025
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-8 h-8"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
