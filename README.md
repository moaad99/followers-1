# Neonvault

A frontend-only storefront for digital products. Customers browse the catalogue, open a product page and buy by sending you a prefilled WhatsApp message. The site has no backend, database, accounts, cart or payment integration.

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

- `whatsappNumber` is your WhatsApp Business number in international format, digits only. For a Moroccan number that looks like `212612345678`. The current value is a placeholder, so the buttons open WhatsApp but the message goes nowhere until you change it.
- `siteUrl` is the public address of the site. It goes into every WhatsApp message as the product link. You can also set it with the `NEXT_PUBLIC_SITE_URL` environment variable on your host.
- `storeName`, `tagline`, `description`, `businessHours`, `responseTime` and `deliveryMethod` appear in the header, footer, contact page and metadata. The sample hours and response time are examples, so replace them with your own.

## Managing products

All products live in `data/products.ts`.

To add a product, copy an existing object in the `PRODUCTS` array and change its fields. The `slug` must be unique because it becomes the page address (`/products/your-slug`). Product pages are generated at build time, so rebuild and redeploy after editing.

To remove a product, delete its object. To add a category, add an entry to `CATEGORIES` and use its `id` on your products. The filter chips and footer links update by themselves.

The fields you will use most:

| Field | What it does |
| --- | --- |
| `price`, `compareAtPrice` | Price in the currency set in the config. `compareAtPrice` is optional and shows as a struck-through price with a "Save x%" badge. |
| `availability` | `in-stock`, `limited`, `pre-order` or `sold-out`. It changes the badge, the button label and the WhatsApp message. |
| `featured` | Adds a "Featured" badge and sorts the product first. |
| `images` | Paths under `public/`. The first image is the card cover. |
| `features`, `specs`, `delivery`, `faqs` | Content for the product page. `faqs` is optional. |

### Images

Product images go in `public/images/products/`. The sample images are SVG files generated for this project. You can replace them with PNG, JPG or WebP files of the same name, or point `images` at new files. A 4:3 ratio (for example 1200 × 900) fits the cards and gallery without cropping.

## How the WhatsApp purchase works

`lib/whatsapp.ts` builds every link. On a product page the "Buy via WhatsApp" button opens:

```
https://wa.me/<whatsappNumber>?text=<encoded message>
```

The message includes the product name, price and product URL, encoded with `encodeURIComponent()`. For example:

```
Hello! I'm interested in purchasing Orbit Dashboard UI Kit for $49. Could you please provide more details about the purchase?

Product link: https://your-site.com/products/orbit-dashboard-ui-kit
```

Sold-out products ask about a restock and pre-order products ask to pre-order. The header, footer, floating button and contact page use a general enquiry message instead. On the contact page, visitors can write their own message and optionally attach a product before WhatsApp opens. Nothing is sent to a server.

## Project structure

```
app/
  layout.tsx                 Root layout: fonts, metadata, header, footer
  page.tsx                   Home: 3D hero, how it works, catalogue, call to action
  products/[slug]/page.tsx   Product page (prerendered for every product)
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
data/products.ts             Products, categories and lookup helpers
lib/whatsapp.ts              WhatsApp link and message builders
lib/format.ts                Price formatting and availability labels
public/images/products/      Product images
```

## Technical notes

- Pages are server components by default. Only interactive parts (the 3D scene, catalogue filters, tilt cards, gallery, mobile menu and contact form) are client components.
- The Three.js scene loads through `next/dynamic` with `ssr: false` from a client component, so it never runs on the server. It pauses rendering when the hero scrolls out of view and slows its animation down for visitors who prefer reduced motion.
- Reflections in the scene come from light shapes built in code, so the site doesn't download HDR files from a third-party CDN.
- `next.config.ts` keeps the defaults from `create-next-app` (Cache Components and Partial Prefetching) and pins `turbopack.root` to this folder.
- Category links such as `/?category=templates#catalog` open the catalogue already filtered.

## Deploying

Any host that runs Next.js works, for example Vercel, Netlify or a Node.js server running `npm run build` then `npm run start`. Set `NEXT_PUBLIC_SITE_URL` to your live address so product links in WhatsApp messages point to the right place.
