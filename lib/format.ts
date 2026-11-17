import { STORE_CONFIG } from "@/config/store";
import type { Availability } from "@/data/products";

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(STORE_CONFIG.locale, {
    style: "currency",
    currency: STORE_CONFIG.currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const AVAILABILITY_LABELS: Record<Availability, string> = {
  "in-stock": "In stock",
  limited: "Limited",
  "pre-order": "Pre-order",
  "sold-out": "Sold out",
};
