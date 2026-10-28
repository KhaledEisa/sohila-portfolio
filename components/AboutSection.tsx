import SkillFilter, { type Skill } from "./SkillFilter";
import { builds } from "@/data/projects";

const skills: Skill[] = [
  { name: "UI Design", group: "Design" },
  { name: "Interaction Design", group: "Design" },
  { name: "Wireframing", group: "Design" },
  { name: "High-fidelity Prototyping", group: "Design" },
  { name: "Information Architecture", group: "Design" },
  { name: "Visual Hierarchy", group: "Design" },
  { name: "Accessibility", group: "Design" },
  { name: "User Research", group: "Research" },
  { name: "Empathy Mapping", group: "Research" },
  { name: "User Flows", group: "Research" },
  { name: "Storyboarding", group: "Research" },
  { name: "Impact–Effort Prioritization", group: "Research" },
  { name: "HTML", group: "Front-end" },
  { name: "CSS", group: "Front-end" },
  { name: "JavaScript", group: "Front-end" },
  { name: "Flutter", group: "Front-end" },
  { name: "PHP & MySQL", group: "Front-end" },
  { name: "Figma", group: "Tools" },
  { name: "FigJam", group: "Tools" },
  { name: "Git & GitHub", group: "Tools" },
  { name: "Postman", group: "Tools" },
  { name: "Selenium & PyTest", group: "Tools" },
];

const facts = [
  { value: "10+", label: "projects delivered with cross-functional teams" },
  { value: "20%", label: "shorter development cycles from workflow improvements" },
  { value: "30%", label: "fewer manual data-entry errors (QR Cart system)" },
];

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line bg-surface py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow">About</p>
            <h2 id="about-title" className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              A designer who <span className="font-display font-normal italic text-accent-ink">understands</span> how
              things get built.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m a Software Engineering graduate from AASTMT, now based in Doha. I start every project with the
                people who will use it: research, empathy maps and user flows come before any screen.
              </p>
              <p>
                My strongest work is in accessible mobile design. For my graduation project, EchoSense, I designed the
                Companion app for autistic users and their caregivers. Because I code, my designs are realistic to build
                and easy to hand off.
              </p>
            </div>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.value} className="border-t border-line pt-4">
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block font-display text-4xl text-accent-ink">{f.value}</span>
                    <span className="mt-1 block text-sm text-muted">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="eyebrow">Skills</h3>
              <div className="mt-4">
                <SkillFilter skills={skills} />
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow">Education</h3>
                <p className="mt-3 text-sm leading-relaxed">
                  <span className="font-semibold">BSc Software Engineering</span>
                  <br />
                  Arab Academy for Science, Technology &amp; Maritime Transport, Cairo
                  <br />
                  <span className="text-subtle">2022 – 2026</span>
                </p>
              </div>
              <div>
                <h3 className="eyebrow">Certifications</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                  <li>UI/UX Camp, ICT Hub Egypt</li>
                  <li>Software Development (DevOps), Digital Egypt Pioneers Initiative</li>
                </ul>
              </div>
              <div>
                <h3 className="eyebrow">Languages</h3>
                <p className="mt-3 text-sm">Arabic (native) · English (fluent)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering breadth */}
        <div className="mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-2xl font-semibold tracking-tight">Also built</h3>
            <p className="text-sm text-subtle">Front-end, full-stack and testing work</p>
          </div>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {builds.map((b) => (
              <li key={b.title} className="grid gap-1 py-4 sm:grid-cols-[1fr_1.4fr_auto] sm:items-baseline sm:gap-6">
                <span className="font-semibold">
                  {b.href ? (
                    <a href={b.href} target="_blank" rel="noopener" className="underline decoration-line underline-offset-4 hover:decoration-accent-ink">
                      {b.title} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    b.title
                  )}
                </span>
                <span className="text-sm text-muted">
                  {b.detail} · <span className="text-subtle">{b.stack}</span>
                </span>
                <span className="text-sm text-subtle tabular-nums">{b.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
