import { STORE_CONFIG } from "@/config/store";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

/** Builds a https://wa.me link, optionally with a prefilled message. */
export function buildWhatsAppUrl(message?: string): string {
  const phone = STORE_CONFIG.whatsappNumber.replace(/\D/g, "");
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function getProductUrl(product: Product): string {
  return `${STORE_CONFIG.siteUrl.replace(/\/$/, "")}/products/${product.slug}`;
}

export function getProductWhatsAppMessage(product: Product): string {
  const price = formatPrice(product.price);
  const url = getProductUrl(product);

  // The customer fills in their username before sending.
  const footer = `\n\nProduct link: ${url}\nMy username: `;

  if (product.availability === "sold-out") {
    return `Hello! I'm interested in ${product.name} (${price}), which is currently unavailable. Could you let me know when it will be available again?${footer}`;
  }

  if (product.availability === "pre-order") {
    return `Hello! I'd like to pre-order ${product.name} for ${price}. Could you please provide more details about the purchase?${footer}`;
  }

  return `Hello! I'm interested in purchasing ${product.name} for ${price}. Could you please provide more details about the purchase?${footer}`;
}

export function getProductWhatsAppUrl(product: Product): string {
  return buildWhatsAppUrl(getProductWhatsAppMessage(product));
}

export const GENERAL_WHATSAPP_MESSAGE = `Hello! I have a question about the products on ${STORE_CONFIG.storeName}.`;
