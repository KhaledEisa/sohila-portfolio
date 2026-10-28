"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type SkillGroup = "Design" | "Research" | "Front-end" | "Tools";
export interface Skill {
  name: string;
  group: SkillGroup;
}

const groups: ("All" | SkillGroup)[] = ["All", "Design", "Research", "Front-end", "Tools"];

/**
 * Filterable skill chips. Every skill is rendered as plain text in a list on the
 * server (filter starts at "All"), so ATS / AI parsers see the full set.
 */
export default function SkillFilter({ skills }: { skills: Skill[] }) {
  const [group, setGroup] = useState<"All" | SkillGroup>("All");
  const reduce = useReducedMotion();
  const shown = group === "All" ? skills : skills.filter((s) => s.group === group);

  return (
    <div>
      <div role="group" aria-label="Filter skills" className="flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            aria-pressed={group === g}
            onClick={() => setGroup(g)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              group === g ? "border-ink bg-ink text-canvas" : "border-line bg-surface text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <motion.ul layout={!reduce} className="mt-5 flex flex-wrap gap-2" aria-label={`${group} skills`}>
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((s) => (
            <motion.li
              key={s.name}
              layout={!reduce}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
              transition={{ duration: 0.2 }}
              className="rounded-full border border-line bg-surface px-3.5 py-2 text-sm text-ink"
            >
              {s.name}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
