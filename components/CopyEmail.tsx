"use client";

import { useEffect, useRef, useState } from "react";

/** Copy-to-clipboard with a visible toast and a screen-reader announcement. */
export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (status === "idle") return;
    const t = setTimeout(() => setStatus("idle"), 2400);
    return () => clearTimeout(t);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      // Fallback: select the address so the user can copy it manually
      const node = textRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      setStatus("manual");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span ref={textRef} className="font-mono text-base text-canvas select-all sm:text-lg">
        {email}
      </span>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-canvas/25 px-4 py-2 text-sm font-semibold text-canvas transition-colors hover:border-canvas hover:bg-canvas hover:text-ink"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M5 15V6a2 2 0 0 1 2-2h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {status === "copied" ? "Copied" : "Copy email"}
      </button>

      <p role="status" aria-live="polite" className="sr-only">
        {status === "copied" ? "Email address copied to clipboard" : status === "manual" ? "Email selected, press Control C to copy" : ""}
      </p>

      {status !== "idle" && (
        <div
          aria-hidden="true"
          className="fixed bottom-6 left-1/2 z-50 animate-toast rounded-full bg-canvas px-5 py-3 text-sm font-semibold text-ink shadow-2xl motion-reduce:animate-none"
          style={{ transform: "translateX(-50%)" }}
        >
          {status === "copied" ? "✓ Email copied to clipboard" : "Email selected — press Ctrl+C to copy"}
        </div>
      )}
    </div>
  );
}
