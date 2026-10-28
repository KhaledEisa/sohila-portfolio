/**
 * Single source of truth for personal details.
 * Change a value here and it updates the header, footer, resume links and SEO data.
 */
export const site = {
  name: "Sohila Alnahas",
  role: "UI/UX Designer & Front-End Developer",
  location: "Doha, Qatar",
  email: "sohilaelnahhas@gmail.com",
  phone: "+974 7011 8718",
  phoneHref: "+97470118718",
  whatsapp: "+20 150 156 5503",
  whatsappHref: "201501565503",
  linkedin: "https://www.linkedin.com/in/sohilaelnahhas",
  github: "https://github.com/sohilaelnahhas",
  // Optional: add her Figma community profile URL to show a "Figma" link in the footer.
  figma: "",
  resume: "/Sohila-Alnahas-CV.pdf",
  // Update after the first Vercel deploy (used for canonical URLs, sitemap and JSON-LD).
  url: "https://sohila-alnahas.vercel.app",
  openTo: ["UI/UX Designer", "Product Designer", "Front-End Developer"],
} as const;
