import { site } from "@/lib/site";
import CopyEmail from "./CopyEmail";

export default function Footer() {
  const links = [
    { label: "LinkedIn", href: site.linkedin },
    { label: "GitHub", href: site.github },
    ...(site.figma ? [{ label: "Figma", href: site.figma }] : []),
  ];

  return (
    <footer id="contact" className="bg-ink text-canvas">
      <section aria-labelledby="contact-title" className="container-page py-20 sm:py-28">
        <p className="eyebrow text-canvas/60">Contact</p>
        <h2 id="contact-title" className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Hiring for UI/UX or front-end?{" "}
          <span className="font-display font-normal italic text-accent">Let&apos;s talk.</span>
        </h2>

        <div className="mt-10">
          <CopyEmail email={site.email} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${site.email}`} className="btn bg-accent text-white hover:bg-[#cf6a50]">
            Email me
          </a>
          <a
            href={site.resume}
            download
            className="btn border border-canvas/25 text-canvas hover:border-canvas hover:bg-canvas hover:text-ink"
          >
            Download resume (PDF)
          </a>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener"
              className="btn border border-canvas/25 text-canvas hover:border-canvas hover:bg-canvas hover:text-ink"
            >
              {l.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        <address className="mt-10 grid gap-2 text-sm not-italic text-canvas/70 sm:grid-cols-3 sm:gap-6">
          <span>
            Phone:{" "}
            <a href={`tel:${site.phoneHref}`} className="text-canvas underline decoration-canvas/30 underline-offset-4">
              {site.phone}
            </a>
          </span>
          <span>
            WhatsApp:{" "}
            <a
              href={`https://wa.me/${site.whatsappHref}`}
              target="_blank"
              rel="noopener"
              className="text-canvas underline decoration-canvas/30 underline-offset-4"
            >
              {site.whatsapp}
            </a>
          </span>
          <span>{site.location}</span>
        </address>
      </section>

      <div className="border-t border-canvas/10">
        <div className="container-page flex flex-wrap justify-between gap-2 py-6 text-xs text-canvas/50">
          <span>© 2026 {site.name}</span>
          <span>Built with Next.js, TypeScript, Tailwind CSS and Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
