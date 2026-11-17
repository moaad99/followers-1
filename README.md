# Neonvault

A frontend-only storefront for Instagram and TikTok follower packages (100, 1K, 5K and 10K followers). Customers pick a package, open its page and order by sending you a prefilled WhatsApp message with their username. The site has no backend, database, accounts, cart or payment integration.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, React Three Fiber, Framer Motion and Lucide icons.

## Run it locally

You need Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To check a production build:

```bash
npm run build
npm run start
```

Other useful commands:

```bash
npm run lint        # ESLint
npx tsc --noEmit    # type check (run `npx next typegen` first after adding routes)
```

## Before you go live

Open `config/store.ts` and set these values:

- `whatsappNumber` is your WhatsApp number with the country code, for example `+212 612-345678`. Spaces, dashes and `+` are fine.
- `siteUrl` is the public address of the site. It goes into every WhatsApp message as the package link. On Vercel it is picked up automatically from the production domain. Elsewhere, set the `NEXT_PUBLIC_SITE_URL` environment variable.
- `storeName`, `tagline`, `description`, `businessHours`, `responseTime` and `deliveryMethod` appear in the header, footer, contact page and metadata. The sample hours and response time are examples, so replace them with your own.

## Managing packages

All packages live in `data/products.ts`, one object per package. The prices and delivery times there are examples. Check them against your own service before going live.

To change a price, edit `price` on that package. To add a package, copy an existing object in the `PRODUCTS` array and change its fields. The `slug` must be unique because it becomes the page address (`/products/your-slug`). Pages are generated at build time, so push your change and Vercel rebuilds the site.

To remove a package, delete its object. To add a platform, add an entry to `CATEGORIES` and use its `id` as the package `category`. The filter chips and footer links update by themselves.

The fields you will use most:

| Field | What it does |
| --- | --- |
| `price` | Price in the currency set in the config. |
| `quantity` | Number of followers. Used for search and for the "per 1K" price shown under each price. |
| `compareAtPrice` | Optional. Shows a struck-through price with a "Save x%" badge. Only use it for a price you really charged before. |
| `availability` | `in-stock`, `limited`, `pre-order` or `sold-out`. It changes the badge, the button label and the WhatsApp message. |
| `featured` | Adds a "Featured" badge and sorts the package first. |
| `images` | Paths under `public/`. The first image is the card cover. |
| `features`, `specs`, `delivery`, `faqs` | Content for the package page. `faqs` is optional. |

### Images

Package images go in `public/images/products/`. Each package has a cover, a profile preview and a details image. They are SVG files generated for this project, using each platform's colours but not its logo. You can replace them with PNG, JPG or WebP files, or point `images` at new files. A 4:3 ratio (for example 1200 × 900) fits the cards and gallery without cropping.

## How the WhatsApp purchase works

`lib/whatsapp.ts` builds every link. On a product page the "Buy via WhatsApp" button opens:

```
https://wa.me/<whatsappNumber>?text=<encoded message>
```

The message includes the package name, price and page URL, encoded with `encodeURIComponent()`, and ends with a line for the customer's username. For example:

```
Hello! I'm interested in purchasing 1,000 Instagram Followers for $15. Could you please provide more details about the purchase?

Product link: https://your-site.com/products/instagram-followers-1k
My username: 
```

Sold-out packages ask when they will be available and pre-order packages ask to pre-order. The header, footer, floating button and contact page use a general enquiry message instead. On the contact page, visitors can add their username, pick a package and write their own message before WhatsApp opens. Nothing is sent to a server.

## Project structure

```
app/
  layout.tsx                 Root layout: fonts, metadata, header, footer
  page.tsx                   Home: 3D hero, how it works, packages, call to action
  products/[slug]/page.tsx   Package page (prerendered for every package)
  about/page.tsx
  contact/page.tsx
  not-found.tsx
  globals.css                Theme colours, glass and glow utilities
components/
  hero/                      Hero section and the Three.js scene (client only)
  catalog/                   Catalogue with search, filters, sort and tilt cards
  product/                   Gallery, FAQ accordion, mobile buy bar
  layout/                    Header, footer, logo, floating WhatsApp button
  contact/                   Contact form that opens WhatsApp
  home/                      Home page sections
  ui/                        Shared pieces: WhatsApp button, badges, reveal animation
config/store.ts              Store name, WhatsApp number, site URL, hours
data/products.ts             Packages, platforms and lookup helpers
lib/whatsapp.ts              WhatsApp link and message builders
lib/format.ts                Price, price per 1K and availability labels
public/images/products/      Package images
vercel.json                  Tells Vercel this is a Next.js project
```

## Technical notes

- Pages are server components by default. Only interactive parts (the 3D scene, catalogue filters, tilt cards, gallery, mobile menu and contact form) are client components.
- The Three.js scene loads through `next/dynamic` with `ssr: false` from a client component, so it never runs on the server. It pauses rendering when the hero scrolls out of view and slows its animation down for visitors who prefer reduced motion.
- Reflections in the scene come from light shapes built in code, so the site doesn't download HDR files from a third-party CDN.
- `next.config.ts` keeps the defaults from `create-next-app` (Cache Components and Partial Prefetching) and pins `turbopack.root` to this folder.
- Category links such as `/?category=templates#catalog` open the catalogue already filtered.

## Deploying

Any host that runs Next.js works, for example Vercel, Netlify or a Node.js server running `npm run build` then `npm run start`. Set `NEXT_PUBLIC_SITE_URL` to your live address so product links in WhatsApp messages point to the right place.
