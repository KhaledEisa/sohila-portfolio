"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: site.resume, label: "Resume", external: true },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Border appears once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer: lock scroll, close on Escape, move focus in and back out
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  // Close the drawer if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-canvas/75 backdrop-blur-md transition-colors ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>

      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-2" aria-label={`${site.name}, home`}>
          <span className="font-display text-xl italic text-accent-ink">S.</span>
          <span className="text-sm font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {l.label}
                  {l.external && <span aria-hidden="true"> ↗</span>}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="btn-primary px-4 py-2">
                Hire me
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="relative -mr-2 grid h-11 w-11 place-items-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <motion.span
              className="absolute left-0 top-0 h-0.5 w-5 rounded bg-ink"
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
            />
            <motion.span
              className="absolute left-0 top-1.5 h-0.5 w-5 rounded bg-ink"
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: reduce ? 0 : 0.15 }}
            />
            <motion.span
              className="absolute left-0 top-3 h-0.5 w-5 rounded bg-ink"
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 top-16 z-30 bg-ink/20 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              key="drawer"
              id="mobile-menu"
              aria-label="Mobile"
              className="fixed inset-x-0 top-16 z-40 border-b border-line bg-canvas px-4 pt-4 pb-8 shadow-xl md:hidden"
              initial={reduce ? { opacity: 0 } : { y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: -12, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <ul className="flex flex-col">
                {links.map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={reduce ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.04 * i + 0.05 }}
                    className="border-b border-line"
                  >
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 font-display text-2xl"
                    >
                      {l.label}
                      <span aria-hidden="true" className="text-base text-subtle">
                        {l.external ? "↗" : "→"}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a href={`mailto:${site.email}`} className="btn-primary mt-6 w-full" onClick={() => setOpen(false)}>
                Email {site.name.split(" ")[0]}
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
