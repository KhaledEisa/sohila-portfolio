import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/Header";
import { site } from "@/lib/site";
import { projects } from "@/data/projects";

// Fonts are self-hosted: no request to Google at build or run time.
const newsreader = localFont({
  variable: "--font-newsreader",
  display: "swap",
  src: [
    { path: "./fonts/newsreader-latin-wght-normal.woff2", style: "normal", weight: "200 800" },
    { path: "./fonts/newsreader-latin-wght-italic.woff2", style: "italic", weight: "200 800" },
  ],
});

const description =
  "Sohila Alnahas is a UI/UX designer and front-end developer in Doha, Qatar. Case studies in accessible mobile and web design: EchoSense, Tidy, HomeArt and the ICTHub redesign.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "UI/UX Designer",
    "Product Designer",
    "Front-End Developer",
    "Figma",
    "User Research",
    "Accessibility",
    "Doha",
    "Qatar",
    site.name,
  ],
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description,
    siteName: site.name,
    images: [{ url: "/images/echosense.jpg", alt: "EchoSense Companion app screens" }],
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.role}`, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f4f0",
  colorScheme: "light",
};

// Structured data so search engines and AI parsers can read her profile directly
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Doha", addressCountry: "QA" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Arab Academy for Science, Technology and Maritime Transport",
  },
  knowsAbout: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Figma", "Accessibility", "HTML", "CSS", "JavaScript", "Flutter"],
  knowsLanguage: ["Arabic", "English"],
  sameAs: [site.linkedin, site.github, site.figma].filter(Boolean),
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "UI/UX Camp", recognizedBy: { "@type": "Organization", name: "ICT Hub Egypt" } },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Software Development (DevOps Engineer)",
      recognizedBy: { "@type": "Organization", name: "Digital Egypt Pioneers Initiative" },
    },
  ],
  subjectOf: projects.map((p) => ({
    "@type": "CreativeWork",
    name: p.title,
    description: `${p.problem} ${p.outcome}`,
    url: `${site.url}${p.caseStudyUrl}`,
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${newsreader.variable}`}>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <Header />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
