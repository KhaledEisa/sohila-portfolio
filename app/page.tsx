import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

// The first project that has a real before/after pair gets the spotlight section.
const spotlight = projects.find((p) => p.beforeAfter);

export default function Home() {
  return (
    <>
      <Hero />

      <section id="work" aria-labelledby="work-title" className="py-16 sm:py-24">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 id="work-title" className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Case <span className="font-display font-normal italic text-accent-ink">studies</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted">
              Each card shows my role, the problem, and the outcome. Open one for the full process.
            </p>
          </div>
          <ProjectGrid />
        </div>
      </section>

      {spotlight?.beforeAfter && (
        <section aria-labelledby="redesign-title" className="pb-16 sm:pb-24">
          <div className="container-page">
            <p className="eyebrow">Redesign spotlight</p>
            <h2 id="redesign-title" className="mt-3 mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">
              {spotlight.title}: before and after
            </h2>
            <BeforeAfterSlider
              before={spotlight.beforeAfter.before}
              after={spotlight.beforeAfter.after}
              beforeAlt={`Original version of ${spotlight.title}`}
              afterAlt={spotlight.thumbnailAlt}
              beforeLabel={spotlight.beforeAfter.beforeLabel}
              afterLabel={spotlight.beforeAfter.afterLabel}
              caption={spotlight.beforeAfter.caption}
              objectPosition={spotlight.thumbnailPosition === "top" ? "top" : "center"}
            />
          </div>
        </section>
      )}

      <AboutSection />
      <Footer />
    </>
  );
}
