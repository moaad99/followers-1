import { WhatsAppButton } from "@/components/ui/whatsapp-button";

interface MobileBuyBarProps {
  price: string;
  name: string;
  href: string;
  label: string;
}

/** Sticky purchase bar so the WhatsApp button is always reachable on phones. */
export function MobileBuyBar({ price, name, href, label }: MobileBuyBarProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/85 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs text-white/50">{name}</p>
          <p className="font-display text-xl font-semibold text-white">{price}</p>
        </div>
        <WhatsAppButton href={href} size="md">
          {label}
        </WhatsAppButton>
      </div>
    </div>
  );
}
