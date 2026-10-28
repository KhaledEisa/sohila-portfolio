"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { categories, projects, type Category } from "@/data/projects";
import ProjectCard from "./ProjectCard";

type Filter = "all" | Category;

export default function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  // Hide filters that would show an empty grid
  const available = categories.filter(
    (c) => c.id === "all" || projects.some((p) => p.categories.includes(c.id as Category)),
  );

  return (
    <div>
      <div role="group" aria-label="Filter case studies" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {available.map((c) => {
          const active = filter === c.id;
          const count = c.id === "all" ? projects.length : projects.filter((p) => p.categories.includes(c.id as Category)).length;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c.id)}
              className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active ? "text-canvas" : "text-muted hover:text-ink"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 420, damping: 34, duration: reduce ? 0 : undefined }}
                />
              )}
              {!active && <span className="absolute inset-0 rounded-full border border-line bg-surface" aria-hidden="true" />}
              <span className="relative">
                {c.label} <span className={active ? "text-canvas/70" : "text-subtle"}>{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "case study" : "case studies"}
      </p>

      <LayoutGroup>
        <motion.ul layout={!reduce} className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, i) => (
              <motion.li
                key={project.id}
                layout={!reduce}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <ProjectCard project={project} priority={i < 2} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </div>
  );
}
