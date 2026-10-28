# Sohila Alnahas — Portfolio

UI/UX design portfolio built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **Framer Motion**.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages are prerendered)
```

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com, click **Add New → Project** and import the repo. Vercel detects Next.js automatically, so there's nothing to configure.
3. After the first deploy, put the real URL in `site.url` in `lib/site.ts`. It's used for SEO, the sitemap and JSON-LD.

## Where things live

| File | What it does |
|---|---|
| `lib/site.ts` | Name, role, email, phone, links, resume path. **Edit personal details here.** |
| `data/projects.ts` | `Project` model and the 4 case studies, plus the "Also built" list |
| `components/Header.tsx` | Sticky blurred nav and animated mobile drawer (client) |
| `components/Hero.tsx` | Value proposition, staggered entrance and a recruiter scan strip (client) |
| `components/ProjectGrid.tsx` | Filterable grid with animated layout (client) |
| `components/ProjectCard.tsx` | Card with impact badge, role/industry chips, problem/outcome |
| `components/BeforeAfterSlider.tsx` | Drag, keyboard or button comparison slider (client) |
| `components/AboutSection.tsx` | Bio, measured results, filterable skills, education, engineering list |
| `components/Footer.tsx` | Contact: copy-email with toast, resume, LinkedIn, GitHub, Figma |
| `app/work/[id]/page.tsx` | Statically generated case-study pages |
| `app/layout.tsx` | Fonts (self-hosted), metadata, Person JSON-LD |
| `app/sitemap.ts`, `app/robots.ts` | SEO |

## Before going live — checklist

- [x] Phone numbers set in `lib/site.ts` (Qatar call number + Egyptian WhatsApp).
- [x] Resume updated with the Qatar number.
- [ ] **Images**: the files in `public/images/` are low-resolution screenshots. In Figma, export each board at 2× (JPG or WebP) and save it over the same file name.
- [ ] **Before/After slider**: add a screenshot of the original ICTHub page as `public/images/icthub-before.jpg`, then uncomment `beforeAfter` on the ICTHub project in `data/projects.ts`. A "Redesign spotlight" section appears automatically on the home page and the case-study page.
- [ ] **Problem statements**: the `problem` lines on Tidy, HomeArt and ICTHub are reasonable framings drafted from the CV. Rewrite them in your own words, with what your research actually found.
- [ ] **Metrics**: badges show real scope, not invented numbers. If you ran usability tests (task success, time on task, SUS score), put those numbers in `headlineMetric` and `impactMetrics`.
- [ ] **Prototype links**: open each one while logged out of Figma to confirm it's public and points to the right file.
- [ ] Optional: add a Figma community profile URL to `site.figma` to show a Figma link in the footer.

## Adding a case study

Add an object to `projects` in `data/projects.ts`. The card, filter counts, case-study page, sitemap and JSON-LD all update automatically.
