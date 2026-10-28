/**
 * Portfolio data model.
 *
 * Every fact here comes from Sohila's CV or her Figma files. Impact badges show
 * real scope and outcomes rather than invented percentages: when she has measured
 * results (e.g. usability-test task success, time-on-task), replace `headlineMetric`
 * and add them to `impactMetrics`.
 */

export type Category = "mobile" | "web" | "accessibility";

export const categories: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "web", label: "Web" },
  { id: "accessibility", label: "Accessibility" },
];

export interface CaseSection {
  heading: string;
  body: string[]; // paragraphs
  bullets?: string[];
}

export interface BeforeAfter {
  before: string; // path in /public
  after: string;
  beforeLabel: string;
  afterLabel: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  industry: string;
  role: string;
  duration: string;
  team?: string;
  tools: string[];
  /** The single most scannable fact, shown as the bold badge on the card. */
  headlineMetric: string;
  impactMetrics: string[];
  thumbnail: string;
  thumbnailAlt: string;
  /** Portrait artwork (e.g. a full landing page) is anchored to the top when cropped. */
  thumbnailPosition?: "center" | "top";
  /** Brand color of the project, used on its case-study page. */
  accent: string;
  tags: string[];
  categories: Category[];
  problem: string;
  outcome: string;
  caseStudyUrl: string;
  links: { label: string; href: string }[];
  sections: CaseSection[];
  beforeAfter?: BeforeAfter;
}

export const projects: Project[] = [
  {
    id: "echosense",
    title: "EchoSense Companion",
    subtitle: "iOS & Apple Watch app for autistic users and caregivers",
    client: "EchoSense · BSc graduation project",
    industry: "Assistive Tech / Health",
    role: "UI/UX Designer",
    duration: "Sep 2025 – Jun 2026",
    team: "Team of 6",
    tools: ["Figma", "iOS", "watchOS", "Data annotation"],
    headlineMetric: "Team of 6 · iPhone + Apple Watch",
    impactMetrics: [
      "Owned the Companion app end to end: research → wireframes → hi-fi prototype",
      "Part of a privacy-first platform: all ML runs on-device",
      "Co-authored the 100-page graduation thesis",
    ],
    thumbnail: "/images/echosense.jpg",
    thumbnailAlt:
      "Seven iPhone screens from the EchoSense Companion app: sign-in, caregiver dashboard, SOS, breathing exercise and live location map",
    accent: "#2e4b45",
    tags: ["User Research", "Accessibility", "Wireframing", "Hi-fi Prototype"],
    categories: ["mobile", "accessibility"],
    problem:
      "Autistic users and their caregivers needed support tools that feel calm and predictable, without sending personal data to the cloud.",
    outcome:
      "I designed the Companion app for iPhone and Apple Watch, from user research to high-fidelity prototypes, as part of the on-device EchoSense platform.",
    caseStudyUrl: "/work/echosense",
    links: [
      { label: "View prototype", href: "https://www.figma.com/proto/oQZboKystg8tRe2nnC3o56/Designs?node-id=0-1" },
      { label: "echosense.org", href: "https://echosense.org" },
    ],
    sections: [
      {
        heading: "Overview",
        body: [
          "EchoSense is a privacy-first assistive AI platform for visually impaired and autistic users. All of its machine learning runs on the device, so personal data never leaves the user's hardware.",
          "I designed the Companion app for iPhone and Apple Watch, which serves autistic users and the caregivers who support them.",
        ],
      },
      {
        heading: "My role",
        body: [],
        bullets: [
          "Designed the Companion app's UI/UX end to end: user research, wireframes, then high-fidelity prototypes.",
          "Annotated and prepared training data for the on-device ML models that power the platform.",
          "Co-authored the 100-page graduation thesis: technical writing, results analysis and documentation.",
        ],
      },
      {
        heading: "Designing for calm",
        body: [
          "The app covers onboarding, a caregiver view, an SOS flow, a guided breathing exercise and live location sharing. A soft green palette, generous spacing and one primary action per screen keep the experience predictable and low-stress.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "The Companion app was delivered as part of the full EchoSense platform for the BSc graduation project at AASTMT (June 2026).",
        ],
      },
    ],
  },
  {
    id: "tidy",
    title: "Tidy",
    subtitle: "Task management app, from problem statement to Flutter layouts",
    client: "Academic project",
    industry: "Productivity",
    role: "UX Lead",
    duration: "Feb – Apr 2026",
    tools: ["Figma", "FigJam", "Flutter"],
    headlineMetric: "6-stage UX process, research to Flutter",
    impactMetrics: [
      "Problem statement → empathy maps → IA → user flows → impact–effort → storyboards",
      "Flutter-ready layouts for hand-off to development",
    ],
    thumbnail: "/images/tidy.jpg",
    thumbnailAlt:
      "Seven iPhone screens from the Tidy task app: task list, create task, daily dashboard, task details and calendar",
    accent: "#3c33b8",
    tags: ["Information Architecture", "User Flows", "Storyboarding", "Flutter"],
    categories: ["mobile"],
    problem:
      "Task apps often bury what matters today under long, flat lists, so users lose track of priorities and deadlines.",
    outcome:
      "I led the UX process from problem framing to Flutter-ready screens: a prioritized daily dashboard, quick task creation, and a calendar view.",
    caseStudyUrl: "/work/tidy",
    links: [
      { label: "View prototype", href: "https://www.figma.com/proto/uutINlCtDHcYPIIulbwH11/Tidy?node-id=381-1342" },
      { label: "UX research board", href: "https://www.figma.com/board/ExDL8oAsZYsD0MvCnf9IQE/Task-app?node-id=0-1" },
    ],
    sections: [
      {
        heading: "Overview",
        body: [
          "Tidy is a task management app for planning daily work: a task list, task creation with priority and assignees, a progress dashboard, task details and a calendar view.",
        ],
      },
      {
        heading: "Process",
        body: ["I led the UX deliverables and worked through a structured process before designing any screens:"],
        bullets: [
          "Problem statement: who the app is for and what gets in their way.",
          "Empathy maps: what users say, think, do and feel.",
          "Information architecture: how tasks, categories and views are organized.",
          "User flows: the core journeys, such as creating and completing a task.",
          "Impact–effort matrix: which features to build first.",
          "Storyboards: testing the flows as stories before building them.",
        ],
      },
      {
        heading: "From design to build",
        body: [
          "The interface was designed as Flutter-ready layouts, so the screens could move into development without a redesign.",
        ],
      },
    ],
  },
  {
    id: "homeart",
    title: "HomeArt",
    subtitle: "Furniture shopping app with AR room preview",
    client: "Concept project",
    industry: "E-commerce / Retail",
    role: "UI/UX Designer",
    duration: "Feb – Apr 2025",
    tools: ["Figma", "User research", "Prototyping"],
    headlineMetric: "AR preview built into the purchase flow",
    impactMetrics: [
      "Interactive prototype: browse → AR preview → cart → checkout → confirmation",
      "Wireframes and user flows informed by user research",
    ],
    thumbnail: "/images/homeart.jpg",
    thumbnailAlt:
      "Seven iPhone screens from the HomeArt app: AR room preview, product catalogue, product page, cart, checkout and order confirmation",
    accent: "#8e1f2e",
    tags: ["User Research", "Wireframing", "Prototyping", "E-commerce"],
    categories: ["mobile"],
    problem:
      "Buying furniture online is risky because shoppers can't tell whether a piece will fit or suit their room.",
    outcome:
      "I designed an interactive prototype where the AR room preview sits directly inside the shopping flow, from discovery through checkout.",
    caseStudyUrl: "/work/homeart",
    links: [
      { label: "View prototype", href: "https://www.figma.com/proto/s2EztiwSqIiuMe5VTkons1/Home-ARt?node-id=0-1" },
    ],
    sections: [
      {
        heading: "Overview",
        body: [
          "HomeArt is a furniture retail app. Its key feature is an AR preview that places furniture in the user's own room. The prototype covers browsing, the AR view, product details, cart, checkout and order confirmation.",
        ],
      },
      {
        heading: "Research to wireframes",
        body: [
          "I ran user research to guide the design decisions, then turned the findings into wireframes and user flows for the key features.",
        ],
      },
      {
        heading: "Prototype",
        body: [
          "The final interactive prototype focuses on smooth navigation from discovery to purchase. The AR preview is part of the shopping flow rather than a separate mode.",
        ],
      },
    ],
  },
  {
    id: "icthub",
    title: "ICTHub Redesign",
    subtitle: "Landing page redesign for an IT services company",
    client: "ICTHub",
    industry: "IT Services / B2B",
    role: "UI Designer",
    duration: "Jan – Feb 2026",
    tools: ["Figma", "FigJam"],
    headlineMetric: "11 offerings restructured into 2 clear groups",
    impactMetrics: [
      "6 services and 5 solutions reorganized into scannable card groups",
      "Clear journey: hero → services → solutions → proof → contact",
    ],
    thumbnail: "/images/icthub.jpg",
    thumbnailAlt:
      "Full-length ICTHub landing page redesign with a hero banner, service cards, solutions, partners, clients and testimonials",
    thumbnailPosition: "top",
    accent: "#9c4a1c",
    tags: ["Visual Hierarchy", "Information Architecture", "Web UI"],
    categories: ["web"],
    problem:
      "ICTHub offers many services and solutions, and the old landing page presented them without a clear hierarchy, so visitors struggled to find what was relevant.",
    outcome:
      "I restructured the page into clear Services and Solutions groups with scannable cards, guiding visitors from the hero to proof and contact.",
    caseStudyUrl: "/work/icthub",
    links: [
      { label: "View design", href: "https://www.figma.com/proto/cOePp9haXOmQlTUa92lxpc/web?node-id=0-1" },
      { label: "Project board", href: "https://www.figma.com/board/49J4o2b9MH99WKYpC5382c/ICTHub-final-project?node-id=0-1" },
    ],
    sections: [
      {
        heading: "Overview",
        body: [
          "ICTHub offers training, consulting, audit, web development, professional and managed services, plus solution areas such as enterprise management, governance, customer services, AI automation and IoT. The challenge was presenting all of that without overwhelming visitors.",
        ],
      },
      {
        heading: "Approach",
        body: [],
        bullets: [
          "Started with layout sketches before moving to high fidelity.",
          "Reorganized the offering into two clear groups, Services and Solutions, each shown as scannable cards.",
          "Used scale, color and spacing to lead visitors from the hero to services, solutions, proof (partners, clients, testimonials) and contact.",
        ],
      },
      {
        heading: "Result",
        body: ["A single landing page with a clearer user journey and service categorization."],
      },
    ],
    // To enable the interactive Before / After slider for this project, add a screenshot
    // of the original page at /public/images/icthub-before.jpg and uncomment:
    // beforeAfter: {
    //   before: "/images/icthub-before.jpg",
    //   after: "/images/icthub.jpg",
    //   beforeLabel: "Original",
    //   afterLabel: "Redesign",
    //   caption: "Drag to compare the original ICTHub landing page with the redesign.",
    // },
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);

/** Engineering & front-end work: shown as a compact list for recruiters scanning breadth. */
export const builds = [
  { title: "InternLink", detail: "Responsive internship website with live database CRUD", stack: "HTML · CSS · JavaScript · PHP · MySQL", year: "2024" },
  { title: "HMK Charity Website", detail: "Full-stack charity platform", stack: "HTML · CSS · JavaScript · PHP · MySQL", year: "2022–26" },
  { title: "Job Hiring App", detail: "Full-stack job board web app", stack: "PHP · MySQL · JavaScript", year: "2022–26" },
  { title: "Shoply", detail: "Shop web app with a Python server and SQLite database", stack: "Python · SQLite · HTML", year: "2026", href: "https://github.com/sohilaelnahhas/shoply-sse" },
  { title: "Selenium test suite", detail: "Automated website testing with PyTest reports", stack: "Python · Selenium · PyTest", year: "2025" },
  { title: "API security testing", detail: "SQL injection and brute-force simulations, documented mitigations", stack: "Postman · OWASP Juice Shop", year: "2026" },
  { title: "Symptomly", detail: "Android app suggesting home remedies from symptoms", stack: "Kotlin · Flutter", year: "2024" },
  { title: "Sign Language Recognition", detail: "Real-time recognition system", stack: "Python · TensorFlow · OpenCV", year: "2022–26" },
];
