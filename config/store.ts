/** Production domain that Vercel sets automatically, without "https://". */
const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/**
 * Central store settings. Change these values to rebrand the site.
 *
 * whatsappNumber: international format with country code. Spaces, dashes
 * and "+" are fine, they are stripped when the WhatsApp link is built.
 * Example for Morocco: "+212 612-345678".
 *
 * siteUrl: the public address of the deployed site. It is used inside the
 * WhatsApp message so the customer shares a working product link. Order of
 * precedence: the NEXT_PUBLIC_SITE_URL environment variable, then the
 * production domain Vercel provides, then localhost.
 */
export const STORE_CONFIG = {
  storeName: "Neonvault",
  tagline: "Premium digital products, delivered over WhatsApp",
  description:
    "UI kits, templates, 3D assets, courses and e-books for designers and developers. Browse the catalogue and buy directly over WhatsApp.",
  whatsappNumber: "+212626829544",
  currency: "USD",
  locale: "en-US",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000"),
  businessHours: "Monday to Saturday, 09:00 to 21:00 (GMT+1)",
  responseTime: "Replies usually within an hour during business hours",
  deliveryMethod: "Download link sent on WhatsApp and by email",
} as const;
