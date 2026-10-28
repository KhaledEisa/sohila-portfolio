import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Footer from "@/components/Footer";
import { getProject, projects } from "@/data/projects";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata(props: PageProps<"/work/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const project = getProject(id);
  if (!project) return {};
  return {
    title: `${project.title} case study`,
    description: `${project.subtitle}. ${project.outcome}`,
    alternates: { canonical: project.caseStudyUrl },
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.outcome,
      images: [{ url: project.thumbnail, alt: project.thumbnailAlt }],
    },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[id]">) {
  const { id } = await props.params;
  const project = getProject(id);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.id === project.id);
  const next = projects[(index + 1) % projects.length];
  const portrait = project.thumbnailPosition === "top";

  const meta = [
    ["Role", project.role],
    ["Timeline", project.duration],
    ["Context", project.team ? `${project.client} · ${project.team}` : project.client],
    ["Tools", project.tools.join(" · ")],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.subtitle,
    description: `${project.problem} ${project.outcome}`,
    creator: { "@type": "Person", name: site.name, jobTitle: project.role },
    keywords: project.tags.join(", "),
    image: `${site.url}${project.thumbnail}`,
    url: `${site.url}${project.caseStudyUrl}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article>
        {/* Hero in the project's own brand color */}
        <header className="text-white" style={{ backgroundColor: project.accent }}>
          <div className="container-page pt-10 sm:pt-16">
            <Link href="/#work" className="text-sm text-white/75 transition-colors hover:text-white">
              <span aria-hidden="true">←</span> All case studies
            </Link>
            <p className="mt-8 text-sm font-medium tracking-[0.14em] text-white/70 uppercase">{project.industry}</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.03em] sm:text-7xl">{project.title}</h1>
            <p className="mt-4 max-w-2xl font-display text-2xl italic leading-snug text-white/90 sm:text-3xl">
              {project.subtitle}
            </p>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {project.headlineMetric}
            </p>

            <div
              className={`relative mt-10 overflow-hidden rounded-t-3xl bg-black/20 ${portrait ? "aspect-[4/5] sm:aspect-[16/11]" : "aspect-[737/267]"}`}
            >
              <Image
                src={project.thumbnail}
                alt={project.thumbnailAlt}
                fill
                priority
                sizes="(min-width: 1152px) 1104px, 100vw"
                className={`object-cover ${portrait ? "object-top" : "object-center"}`}
              />
            </div>
          </div>
        </header>

        <div className="container-page">
          <dl className="grid grid-cols-2 gap-6 border-b border-line py-8 lg:grid-cols-4">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-2 text-[15px]">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="grid gap-12 py-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20 lg:py-20">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="eyebrow">Impact &amp; scope</h2>
              <ul className="mt-4 space-y-3">
                {project.impactMetrics.map((m) => (
                  <li key={m} className="rounded-2xl border border-line bg-surface p-4 text-sm leading-relaxed">
                    {m}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2">
                {project.links.map((l, i) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener"
                    className={i === 0 ? "btn-primary" : "btn-secondary"}
                  >
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </aside>

            <div className="max-w-2xl">
              <section aria-labelledby="problem-title" className="rounded-3xl bg-accent-soft/60 p-6 sm:p-8">
                <h2 id="problem-title" className="eyebrow text-accent-ink">The problem</h2>
                <p className="mt-3 font-display text-2xl leading-snug">{project.problem}</p>
                <h2 className="eyebrow mt-6 text-accent-ink">The outcome</h2>
                <p className="mt-3 text-lg leading-relaxed">{project.outcome}</p>
              </section>

              {project.sections.map((s, i) => (
                <section key={s.heading} className="mt-14">
                  <h2 className="flex items-baseline gap-3 text-3xl font-semibold tracking-tight">
                    <span className="font-display text-2xl font-normal italic text-accent-ink" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.heading}
                  </h2>
                  {s.body.map((para) => (
                    <p key={para} className="mt-4 text-lg leading-relaxed text-muted">
                      {para}
                    </p>
                  ))}
                  {s.bullets && (
                    <ul className="mt-4 space-y-2 text-lg leading-relaxed text-muted">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {project.beforeAfter && (
                <section className="mt-14" aria-labelledby="compare-title">
                  <h2 id="compare-title" className="mb-6 text-3xl font-semibold tracking-tight">
                    Before &amp; after
                  </h2>
                  <BeforeAfterSlider
                    before={project.beforeAfter.before}
                    after={project.beforeAfter.after}
                    beforeAlt={`Original version of ${project.title}`}
                    afterAlt={project.thumbnailAlt}
                    beforeLabel={project.beforeAfter.beforeLabel}
                    afterLabel={project.beforeAfter.afterLabel}
                    caption={project.beforeAfter.caption}
                    objectPosition={portrait ? "top" : "center"}
                  />
                </section>
              )}

              <ul className="mt-14 flex flex-wrap gap-2" aria-label="Skills used">
                {project.tags.map((t) => (
                  <li key={t} className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <nav aria-label="Next case study" className="border-t border-line py-12">
            <Link href={next.caseStudyUrl} className="group flex flex-wrap items-baseline justify-between gap-4">
              <span className="text-sm text-subtle">Next case study</span>
              <span className="text-4xl font-semibold tracking-tight transition-colors group-hover:text-accent-ink sm:text-5xl">
                {next.title} <span aria-hidden="true">→</span>
              </span>
            </Link>
          </nav>
        </div>
      </article>

      <Footer />
    </>
  );
}
