"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { site } from "@/lib/site";
import { projects } from "@/data/projects";

export default function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.05 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } },
  };

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* soft terracotta glow, decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
      />
      <motion.div
        className="container-page relative pt-16 pb-14 sm:pt-24 sm:pb-20 lg:pt-28"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-medium text-ink">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Open to work
          </span>
          <span>{site.role}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span>{site.location}</span>
        </motion.p>

        <motion.h1
          id="hero-title"
          variants={item}
          className="mt-6 max-w-4xl text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-7xl"
        >
          I design <span className="font-display font-normal italic tracking-[-0.01em] text-accent-ink">calm, accessible</span>{" "}
          products, from first research to working code.
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          UI/UX designer with a software engineering degree. I take mobile and web products from user research
          and wireframes to high-fidelity Figma prototypes, and I can build them in HTML, CSS and JavaScript.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
          <a href="#work" className="btn-primary">
            Explore Case Studies <span aria-hidden="true">↓</span>
          </a>
          <a href={site.resume} target="_blank" rel="noopener" className="btn-secondary">
            Download Resume
          </a>
        </motion.div>

        {/* 5-second scan strip for recruiters */}
        <motion.dl
          variants={item}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 text-sm sm:grid-cols-4"
        >
          {[
            ["Case studies", `${projects.length} in Figma`],
            ["Focus", "Mobile & accessibility"],
            ["Builds in", "HTML · CSS · JS · Flutter"],
            ["Education", "BSc Software Eng., 2026"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-1 font-medium text-ink">{v}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
