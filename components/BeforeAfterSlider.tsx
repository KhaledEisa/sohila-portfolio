"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  /** Width / height of the artwork, used to size the frame. */
  aspect?: string;
  objectPosition?: "top" | "center";
}

/**
 * Before / After comparison.
 * - Drag the handle (mouse or touch), or
 * - focus the slider and use ←/→ (Shift for bigger steps), Home/End, or
 * - use the Before / After buttons to jump to either side.
 * A native range input drives the value, so it is keyboard and screen-reader accessible.
 */
export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  aspect = "16 / 10",
  objectPosition = "center",
}: Props) {
  const [pos, setPos] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const reduce = useReducedMotion();
  const id = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const objectClass = `object-cover ${objectPosition === "top" ? "object-top" : "object-center"}`;

  return (
    <figure className="w-full">
      <div
        ref={frameRef}
        className="relative w-full touch-none select-none overflow-hidden rounded-3xl border border-line bg-sunken"
        style={{ aspectRatio: aspect }}
        onPointerDown={(e) => {
          setDragging(true);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => dragging && setFromClientX(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        {/* After (base layer) */}
        <Image src={after} alt={afterAlt} fill sizes="(min-width: 1024px) 1100px, 100vw" className={objectClass} draggable={false} />

        {/* Before (clipped layer) */}
        <motion.div
          className="absolute inset-0"
          animate={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          transition={{ duration: dragging || reduce ? 0 : 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          aria-hidden="true"
        >
          <Image src={before} alt="" fill sizes="(min-width: 1024px) 1100px, 100vw" className={objectClass} draggable={false} />
        </motion.div>
        <span className="sr-only">{beforeAlt}</span>

        {/* Labels */}
        <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-canvas">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
          {afterLabel}
        </span>

        {/* Handle */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.15)]"
          animate={{ left: `${pos}%` }}
          transition={{ duration: dragging || reduce ? 0 : 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.div>

        {/* Accessible control covering the frame */}
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare ${beforeLabel.toLowerCase()} and ${afterLabel.toLowerCase()}`}
          aria-valuetext={`${Math.round(pos)}% ${beforeLabel}`}
          className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
        {/* Visible focus ring when the hidden range input is focused */}
        <span className="pointer-events-none absolute inset-0 rounded-3xl ring-accent-ink ring-offset-2 peer-focus-visible:ring-2" />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {caption && <figcaption className="text-sm text-muted">{caption}</figcaption>}
        <div className="flex gap-2" role="group" aria-label="Jump to version">
          <button type="button" className="btn-secondary px-4 py-2 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-canvas" onClick={() => setPos(100)} aria-pressed={pos === 100}>
            {beforeLabel}
          </button>
          <button type="button" className="btn-secondary px-4 py-2 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-canvas" onClick={() => setPos(50)} aria-pressed={pos === 50}>
            Split
          </button>
          <button type="button" className="btn-secondary px-4 py-2 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-canvas" onClick={() => setPos(0)} aria-pressed={pos === 0}>
            {afterLabel}
          </button>
        </div>
      </div>
    </figure>
  );
}
