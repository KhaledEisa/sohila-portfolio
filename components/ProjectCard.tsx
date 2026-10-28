import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

/**
 * Server-renderable card. All text is real HTML so recruiters' screen readers and
 * AI parsers can read role, industry, impact and outcome without running JavaScript.
 */
export default function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const { title, subtitle, role, industry, duration, headlineMetric, problem, outcome, thumbnail, thumbnailAlt, caseStudyUrl } =
    project;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-sunken">
        <Image
          src={thumbnail}
          alt={thumbnailAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
          className={`object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
            project.thumbnailPosition === "top" ? "object-top" : "object-center"
          }`}
        />
        {/* Impact badge: the one fact a recruiter should take away */}
        <p className="absolute bottom-3 left-3 right-3 sm:right-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink/90 px-3.5 py-2 text-[13px] font-semibold text-canvas shadow-lg backdrop-blur-sm">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span className="sr-only">Key result: </span>
            {headlineMetric}
          </span>
        </p>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <ul className="flex flex-wrap gap-2" aria-label="Project details">
          <li className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-ink">{role}</li>
          <li className="rounded-full bg-sunken px-2.5 py-1 text-xs font-medium text-muted">{industry}</li>
          <li className="rounded-full bg-sunken px-2.5 py-1 text-xs font-medium text-muted">{duration}</li>
        </ul>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-1 text-sm text-subtle">{subtitle}</p>

        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          <span className="font-medium text-ink">Problem. </span>
          {problem} <span className="font-medium text-ink">Outcome. </span>
          {outcome}
        </p>

        <div className="mt-auto pt-6">
          <Link
            href={caseStudyUrl}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink after:absolute after:inset-0 after:content-['']"
          >
            View Case Study
            <span className="sr-only">: {title}</span>
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-full border border-line transition-all duration-300 group-hover:translate-x-1 group-hover:border-accent group-hover:bg-accent group-hover:text-white motion-reduce:group-hover:translate-x-0"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
