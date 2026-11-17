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
  tagline: "Instagram and TikTok followers, ordered over WhatsApp",
  description:
    "Instagram and TikTok follower packages from 100 to 10,000. Pick a package, send us your username on WhatsApp, and we handle the rest. No password needed.",
  whatsappNumber: "+212626829544",
  currency: "USD",
  locale: "en-US",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000"),
  businessHours: "Monday to Saturday, 09:00 to 21:00 (GMT+1)",
  responseTime: "Replies usually within an hour during business hours",
  deliveryMethod: "Followers are added to your public profile. We never ask for your password",
} as const;
