"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { buildWhatsAppUrl, GENERAL_WHATSAPP_MESSAGE } from "@/lib/whatsapp";

const whatsappUrl = buildWhatsAppUrl(GENERAL_WHATSAPP_MESSAGE);

/**
 * Persistent WhatsApp shortcut in the bottom-right corner.
 * Hidden on product pages, which have their own sticky buy bar on mobile.
 */
export function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname.startsWith("/products/")) return null;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-ink-950 shadow-[0_10px_40px_-6px_rgb(37_211_102/0.8)] sm:right-6 sm:bottom-6"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-30"
      />
      <WhatsAppIcon className="relative size-7" />
    </motion.a>
  );
}
