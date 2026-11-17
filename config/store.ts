/**
 * Central store settings. Change these values to rebrand the site.
 *
 * whatsappNumber: international format, digits only, no "+" or leading zeros.
 * Example for Morocco: "212612345678".
 *
 * siteUrl: the public address of the deployed site. It is used inside the
 * WhatsApp message so the customer shares a working product link. You can
 * also set it with the NEXT_PUBLIC_SITE_URL environment variable.
 */
export const STORE_CONFIG = {
  storeName: "Neonvault",
  tagline: "Premium digital products, delivered over WhatsApp",
  description:
    "UI kits, templates, 3D assets, courses and e-books for designers and developers. Browse the catalogue and buy directly over WhatsApp.",
  whatsappNumber: "212600000000",
  currency: "USD",
  locale: "en-US",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  businessHours: "Monday to Saturday, 09:00 to 21:00 (GMT+1)",
  responseTime: "Replies usually within an hour during business hours",
  deliveryMethod: "Download link sent on WhatsApp and by email",
} as const;
