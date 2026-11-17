/**
 * Product catalogue.
 *
 * To add a product: copy one object in PRODUCTS, give it a unique `slug`,
 * and put its images in /public/images/products/. The first image in
 * `images` is used as the card cover.
 * To remove a product: delete its object.
 * To add a category: add an entry to CATEGORIES and use its `id`.
 */

export const CATEGORIES = [
  { id: "ui-kits", label: "UI kits" },
  { id: "templates", label: "Templates" },
  { id: "3d-assets", label: "3D assets" },
  { id: "courses", label: "Courses" },
  { id: "ebooks", label: "E-books" },
  { id: "audio", label: "Audio" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export type Availability = "in-stock" | "limited" | "pre-order" | "sold-out";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  name: string;
  /** One-line summary shown on product cards. */
  shortDescription: string;
  /** Paragraphs shown on the product page. */
  description: string[];
  price: number;
  /** Optional original price, shown struck through. */
  compareAtPrice?: number;
  category: CategoryId;
  availability: Availability;
  featured?: boolean;
  images: string[];
  features: string[];
  specs: ProductSpec[];
  delivery: {
    format: string;
    time: string;
    updates: string;
  };
  faqs?: ProductFaq[];
}

const img = (slug: string) => [
  `/images/products/${slug}-cover.svg`,
  `/images/products/${slug}-preview.svg`,
  `/images/products/${slug}-details.svg`,
];

export const PRODUCTS: Product[] = [
  {
    slug: "orbit-dashboard-ui-kit",
    name: "Orbit Dashboard UI Kit",
    shortDescription:
      "A complete Figma system for analytics, admin and SaaS dashboards.",
    description: [
      "Orbit is a dashboard design system built for product teams who ship data-heavy interfaces. Every screen is assembled from the same component library, so you can go from wireframe to polished UI without redrawing a single table.",
      "Components use auto layout and variables throughout. Switch between dark and light themes, change the accent colour once, and the whole kit updates.",
    ],
    price: 49,
    compareAtPrice: 79,
    category: "ui-kits",
    availability: "in-stock",
    featured: true,
    images: img("orbit-dashboard-ui-kit"),
    features: [
      "120+ ready-made screens for analytics, CRM, finance and settings",
      "450 components built with auto layout and variants",
      "Dark and light themes driven by Figma variables",
      "Chart library with line, bar, area, donut and heatmap styles",
      "Responsive layouts for desktop, tablet and mobile",
    ],
    specs: [
      { label: "Format", value: "Figma (.fig)" },
      { label: "Screens", value: "120+" },
      { label: "Components", value: "450" },
      { label: "Fonts", value: "Free Google Fonts" },
      { label: "Licence", value: "Personal and commercial" },
    ],
    delivery: {
      format: "Figma file link and .fig download",
      time: "Sent right after payment is confirmed",
      updates: "Free lifetime updates",
    },
    faqs: [
      {
        question: "Do I need a paid Figma plan?",
        answer:
          "No. The file opens in the free Figma plan. Variables work on every plan that supports them.",
      },
      {
        question: "Can I use it for client projects?",
        answer:
          "Yes. The licence covers unlimited personal and client projects. You can't resell the kit itself.",
      },
    ],
  },
  {
    slug: "launchpad-saas-template",
    name: "Launchpad SaaS Template",
    shortDescription:
      "A Next.js and Tailwind landing site with pricing, blog and docs pages.",
    description: [
      "Launchpad gives you a production-ready marketing site for a software product. It covers the pages most launches need: home, pricing, changelog, blog, docs and legal.",
      "The code is typed end to end, scores well on Lighthouse, and keeps content in Markdown files, so you can edit copy without touching components.",
    ],
    price: 69,
    category: "templates",
    availability: "in-stock",
    featured: true,
    images: img("launchpad-saas-template"),
    features: [
      "14 pages including pricing, blog, docs and changelog",
      "Built with Next.js App Router, TypeScript and Tailwind CSS",
      "Markdown content with syntax highlighting",
      "Animated sections that respect reduced-motion settings",
      "SEO metadata and Open Graph images for every page",
    ],
    specs: [
      { label: "Stack", value: "Next.js, React, Tailwind CSS" },
      { label: "Pages", value: "14" },
      { label: "Language", value: "TypeScript" },
      { label: "Licence", value: "Single product, commercial" },
    ],
    delivery: {
      format: "Source code (.zip) and private repository invite",
      time: "Sent right after payment is confirmed",
      updates: "12 months of updates",
    },
    faqs: [
      {
        question: "Where can I host it?",
        answer:
          "Anywhere that runs Next.js, including Vercel, Netlify and your own Node.js server.",
      },
    ],
  },
  {
    slug: "prism-3d-icon-pack",
    name: "Prism 3D Icon Pack",
    shortDescription:
      "240 glossy 3D icons in three styles, ready for web and product UI.",
    description: [
      "Prism is a set of 3D icons rendered in a consistent glass and clay style. Use the PNG renders straight away or open the GLB files to change the angle, colour and lighting.",
      "Icons cover the usual product categories: finance, communication, files, devices, security and e-commerce.",
    ],
    price: 29,
    category: "3d-assets",
    availability: "in-stock",
    images: img("prism-3d-icon-pack"),
    features: [
      "240 icons across 12 categories",
      "Three material styles: glass, clay and neon",
      "Transparent PNG renders at 2048 px",
      "GLB source files for Blender, Spline and three.js",
    ],
    specs: [
      { label: "Icons", value: "240" },
      { label: "Formats", value: "GLB, PNG" },
      { label: "Resolution", value: "2048 × 2048 px" },
      { label: "Licence", value: "Personal and commercial" },
    ],
    delivery: {
      format: "Download link (.zip, 1.8 GB)",
      time: "Sent right after payment is confirmed",
      updates: "New icons added free of charge",
    },
  },
  {
    slug: "motion-design-fundamentals",
    name: "Motion Design Fundamentals",
    shortDescription:
      "A video course on timing, easing and UI animation, with five projects.",
    description: [
      "This course teaches the principles behind interface animation: timing, easing, choreography and feedback. Each module ends with a small project you build yourself.",
      "Lessons are short and practical. You'll work in Figma and then rebuild the same animations in CSS and Framer Motion.",
    ],
    price: 89,
    compareAtPrice: 129,
    category: "courses",
    availability: "limited",
    featured: true,
    images: img("motion-design-fundamentals"),
    features: [
      "38 lessons, 6 h 20 min of video",
      "Five guided projects with source files",
      "Figma prototypes and matching code examples",
      "Private community access for questions",
      "Certificate of completion",
    ],
    specs: [
      { label: "Lessons", value: "38" },
      { label: "Runtime", value: "6 h 20 min" },
      { label: "Level", value: "Beginner to intermediate" },
      { label: "Language", value: "English, with subtitles" },
    ],
    delivery: {
      format: "Course access link",
      time: "Access granted within a few hours of payment",
      updates: "Lifetime access to the course and new lessons",
    },
    faqs: [
      {
        question: "Why is it marked as limited?",
        answer:
          "The course includes community support, so places are capped each month to keep answers quick.",
      },
    ],
  },
  {
    slug: "freelance-pricing-playbook",
    name: "Freelance Pricing Playbook",
    shortDescription:
      "An e-book with scripts and templates for pricing creative work.",
    description: [
      "A practical guide to quoting design and development work. It walks through value-based pricing, writing proposals, handling scope changes and raising your rates with existing clients.",
      "The book comes with editable proposal and invoice templates so you can apply each chapter straight away.",
    ],
    price: 19,
    category: "ebooks",
    availability: "in-stock",
    images: img("freelance-pricing-playbook"),
    features: [
      "148 pages across 10 chapters",
      "12 editable proposal, contract and invoice templates",
      "Email scripts for negotiation and rate increases",
      "Worksheets to calculate your minimum day rate",
    ],
    specs: [
      { label: "Pages", value: "148" },
      { label: "Formats", value: "PDF, EPUB" },
      { label: "Templates", value: "Google Docs and Word" },
      { label: "Language", value: "English" },
    ],
    delivery: {
      format: "PDF and EPUB download",
      time: "Sent right after payment is confirmed",
      updates: "Free updated editions",
    },
  },
  {
    slug: "lofi-focus-sound-pack",
    name: "Lo-fi Focus Sound Pack",
    shortDescription:
      "160 royalty-free lo-fi loops and one-shots for videos and streams.",
    description: [
      "A collection of warm, tape-saturated loops built for background music. Drums, keys, bass and textures are all supplied as separate stems so you can arrange your own tracks.",
      "Everything is cleared for use in videos, podcasts, games and live streams.",
    ],
    price: 24,
    category: "audio",
    availability: "in-stock",
    images: img("lofi-focus-sound-pack"),
    features: [
      "160 loops and 90 one-shots",
      "Labelled by key and tempo",
      "Stems for drums, keys, bass and textures",
      "Royalty-free for commercial content",
    ],
    specs: [
      { label: "Format", value: "WAV, 24-bit, 44.1 kHz" },
      { label: "Tempo", value: "70 to 90 BPM" },
      { label: "Size", value: "2.4 GB" },
      { label: "Licence", value: "Royalty-free" },
    ],
    delivery: {
      format: "Download link (.zip)",
      time: "Sent right after payment is confirmed",
      updates: "Free expansion packs",
    },
  },
  {
    slug: "creator-os-workspace",
    name: "Creator OS Workspace",
    shortDescription:
      "An all-in-one workspace template to plan content, clients and income.",
    description: [
      "Creator OS is a ready-made workspace for freelancers and content creators. It links your content calendar, client projects, invoices and goals so you can see everything from one dashboard.",
      "It's compatible with Notion and installs with a single duplicate link. A short video guide shows you how to adapt it.",
    ],
    price: 15,
    category: "templates",
    availability: "in-stock",
    images: img("creator-os-workspace"),
    features: [
      "18 linked databases for content, clients and finances",
      "6 dashboards for weekly planning and reviews",
      "Content calendar with status tracking",
      "Video setup guide",
    ],
    specs: [
      { label: "Platform", value: "Notion (free plan works)" },
      { label: "Databases", value: "18" },
      { label: "Dashboards", value: "6" },
      { label: "Setup", value: "Duplicate link" },
    ],
    delivery: {
      format: "Template duplicate link",
      time: "Sent right after payment is confirmed",
      updates: "Free updates",
    },
  },
  {
    slug: "cyber-texture-collection",
    name: "Cyber Texture Collection",
    shortDescription:
      "64 tileable PBR materials for sci-fi scenes, games and renders.",
    description: [
      "A library of sci-fi surfaces: brushed alloys, carbon weaves, emissive panels and worn plating. Every material is seamless and comes with a full PBR map set.",
      "Tested in Blender, Unreal Engine, Unity and three.js.",
    ],
    price: 39,
    compareAtPrice: 55,
    category: "3d-assets",
    availability: "pre-order",
    images: img("cyber-texture-collection"),
    features: [
      "64 tileable materials at 4K",
      "Base colour, normal, roughness, metallic, height and emissive maps",
      "Blender material library included",
      "Preview scene for quick testing",
    ],
    specs: [
      { label: "Materials", value: "64" },
      { label: "Resolution", value: "4096 × 4096 px" },
      { label: "Maps", value: "Full PBR set" },
      { label: "Release", value: "Pre-order, ships next month" },
    ],
    delivery: {
      format: "Download link (.zip)",
      time: "Sent on release day",
      updates: "Free updates",
    },
  },
  {
    slug: "folio-portfolio-template",
    name: "Folio Portfolio Template",
    shortDescription:
      "A motion-rich portfolio site for designers, with case study layouts.",
    description: [
      "Folio is a personal portfolio template with smooth page transitions and detailed case study layouts. Projects are written in Markdown, so adding new work takes minutes.",
      "This edition is sold out. Message us on WhatsApp to be told when the next batch of licences opens.",
    ],
    price: 45,
    category: "templates",
    availability: "sold-out",
    images: img("folio-portfolio-template"),
    features: [
      "22 sections and 4 case study layouts",
      "Page transitions with Framer Motion",
      "Markdown-based projects",
      "Contact section that links to WhatsApp and email",
    ],
    specs: [
      { label: "Stack", value: "Next.js, Tailwind CSS" },
      { label: "Sections", value: "22" },
      { label: "Content", value: "Markdown" },
      { label: "Licence", value: "Personal" },
    ],
    delivery: {
      format: "Source code (.zip)",
      time: "Sent when licences reopen",
      updates: "12 months of updates",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getCategoryLabel(id: CategoryId): string {
  return CATEGORIES.find((category) => category.id === id)?.label ?? id;
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );
  const others = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
