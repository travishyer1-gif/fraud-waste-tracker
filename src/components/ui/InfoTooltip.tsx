'use client';

import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { TIER_COLORS } from '@/lib/constants';

// ─── Global tooltip state (only one open at a time) ───────────────────────────
interface TooltipState {
  id: string | null;
  setOpen: (id: string | null) => void;
}

const TooltipContext = createContext<TooltipState>({
  id: null,
  setOpen: () => {},
});

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <TooltipContext.Provider value={{ id: openId, setOpen: setOpenId }}>
      {children}
    </TooltipContext.Provider>
  );
}

// ─── Counter for unique IDs ───────────────────────────────────────────────────
let _idCounter = 0;
function useUniqueId() {
  const ref = useRef<string | null>(null);
  if (!ref.current) {
    ref.current = `tooltip-${++_idCounter}`;
  }
  return ref.current;
}

// ─── Tier definition labels ───────────────────────────────────────────────────
const TIER_DEFINITIONS: Record<number, string> = {
  1: 'Confirmed — Verified by official government audit, court settlement, or DOJ/OIG conviction data.',
  2: 'Estimated — Statistically modeled estimate from official methodology (e.g. GAO extrapolation, CBO scoring).',
  3: 'Researched — Academic study, investigative journalism, or think-tank analysis with documented methodology.',
  4: 'Reported — News reports, advocacy group estimates, or preliminary findings pending independent verification.',
};

// ─── InfoTooltip props ────────────────────────────────────────────────────────
interface InfoTooltipProps {
  content: React.ReactNode;
  tier?: 1 | 2 | 3 | 4;
  sourceUrl?: string;
}

export function InfoTooltip({ content, tier, sourceUrl }: InfoTooltipProps) {
  const uid = useUniqueId();
  const { id: openId, setOpen } = useContext(TooltipContext);
  const isOpen = openId === uid;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardPos, setCardPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tierColor = tier ? TIER_COLORS[tier]?.bg : '#6b7280';

  // Compute card position relative to trigger
  const computePos = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const cardWidth = 300;
    const margin = 8;

    let left = rect.left + scrollX + rect.width / 2 - cardWidth / 2;
    let top = rect.bottom + scrollY + margin;

    // clamp horizontal
    const maxLeft = window.innerWidth + scrollX - cardWidth - margin;
    left = Math.max(margin + scrollX, Math.min(left, maxLeft));

    setCardPos({ top, left });
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) {
      setOpen(null);
    } else {
      computePos();
      setOpen(uid);
    }
  }, [isOpen, setOpen, uid, computePos]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        cardRef.current && !cardRef.current.contains(target)
      ) {
        setOpen(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, setOpen]);

  // Recompute on scroll/resize
  useEffect(() => {
    if (!isOpen) return;
    const handler = () => computePos();
    window.addEventListener('scroll', handler, true);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler, true);
      window.removeEventListener('resize', handler);
    };
  }, [isOpen, computePos]);

  const card = isOpen && mounted ? (
    createPortal(
      <AnimatePresence>
        <motion.div
          ref={cardRef}
          key={uid}
          initial={{ opacity: 0, scale: 0.92, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -6 }}
          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          style={{
            position: 'absolute',
            top: cardPos.top,
            left: cardPos.left,
            width: 300,
            zIndex: 9999,
          }}
          className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg p-4 shadow-2xl"
        >
          {/* Content */}
          <div className="text-xs text-gray-200 leading-relaxed mb-3">
            {content}
          </div>

          {/* Tier definition */}
          {tier && (
            <div
              className="text-[11px] rounded p-2 mb-3"
              style={{ backgroundColor: `${tierColor}18`, borderLeft: `3px solid ${tierColor}` }}
            >
              <span className="font-semibold" style={{ color: tierColor }}>
                {TIER_COLORS[tier].icon} Tier {tier} — {TIER_COLORS[tier].label}
              </span>
              <p className="text-gray-400 mt-0.5">{TIER_DEFINITIONS[tier]}</p>
            </div>
          )}

          {/* Source link */}
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] hover:underline"
              style={{ color: '#a855f7' }}
            >
              <ExternalLink size={10} />
              View source
            </a>
          )}
        </motion.div>
      </AnimatePresence>,
      document.body
    )
  ) : null;

  return (
    <>
      <motion.button
        ref={triggerRef}
        onClick={toggle}
        animate={{
          opacity: isOpen ? 1 : [0.6, 1, 0.6],
          boxShadow: isOpen
            ? `0 0 8px 2px ${tierColor}66`
            : `0 0 4px 1px ${tierColor}33`,
        }}
        transition={
          isOpen
            ? { duration: 0 }
            : { opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }
        }
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: `1px solid ${tierColor}`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 9,
          fontWeight: 700,
          color: tierColor,
          cursor: 'pointer',
          background: 'transparent',
          flexShrink: 0,
          lineHeight: 1,
          padding: 0,
          verticalAlign: 'middle',
        }}
        aria-label="More information"
        aria-expanded={isOpen}
      >
        ?
      </motion.button>
      {card}
    </>
  );
}
