import Link from "next/link";
import { Clock, MessageCircle } from "lucide-react";
import { STORE_CONFIG } from "@/config/store";
import { CATEGORIES } from "@/data/products";
import { Logo } from "@/components/layout/logo";
import { NAV_LINKS } from "@/components/layout/nav-links";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { buildWhatsAppUrl, GENERAL_WHATSAPP_MESSAGE } from "@/lib/whatsapp";

export function SiteFooter() {
  const whatsappUrl = buildWhatsAppUrl(GENERAL_WHATSAPP_MESSAGE);

  return (
    <footer className="relative mt-24 border-t border-white/6 bg-ink-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
            {STORE_CONFIG.description}
          </p>
          <WhatsAppButton href={whatsappUrl} className="mt-6">
            Message us on WhatsApp
          </WhatsAppButton>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
            Pages
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/70 transition-colors hover:text-neon"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
            Categories
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/?category=${category.id}#catalog`}
                  className="text-white/70 transition-colors hover:text-neon"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
            Support
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-neon" />
              {STORE_CONFIG.businessHours}
            </li>
            <li className="flex gap-2.5">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-neon" />
              {STORE_CONFIG.responseTime}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/6">
        {/* Extra bottom space on small screens clears the floating WhatsApp button and the product buy bar */}
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 pt-6 pb-28 text-center text-xs text-white/40 sm:flex-row sm:px-6 sm:text-left lg:px-8 lg:pb-6">
          <p>
            © {STORE_CONFIG.storeName}. All products are digital and delivered
            electronically.
          </p>
          <p>Purchases are handled personally over WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
