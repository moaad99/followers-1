import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-whatsapp text-ink-950 shadow-[0_0_0_1px_rgb(37_211_102/0.4),0_10px_40px_-8px_rgb(37_211_102/0.7)] hover:bg-[#3ae07a] hover:shadow-[0_0_0_1px_rgb(37_211_102/0.6),0_14px_50px_-6px_rgb(37_211_102/0.85)]",
  outline:
    "border border-whatsapp/40 text-whatsapp hover:border-whatsapp hover:bg-whatsapp/10",
  ghost: "text-white/80 hover:text-whatsapp hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 gap-2 px-3.5 text-sm",
  md: "h-11 gap-2.5 px-5 text-sm",
  lg: "h-14 gap-3 px-7 text-base",
};

const iconOnlySizes: Record<Size, string> = {
  sm: "size-9",
  md: "size-11",
  lg: "size-14",
};

type WhatsAppButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  /** Spacing or width classes only. Don't pass display classes, wrap the button instead. */
  className?: string;
} & (
  | { iconOnly?: false; children: ReactNode; ariaLabel?: string }
  | { iconOnly: true; children?: never; ariaLabel: string }
);

/** Link that opens WhatsApp in a new tab. Renders as a plain anchor so it works without JavaScript. */
export function WhatsAppButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ariaLabel,
  iconOnly = false,
}: WhatsAppButtonProps) {
  const sizeClass = iconOnly ? iconOnlySizes[size] : sizes[size];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp active:scale-[0.98] ${variants[variant]} ${sizeClass} ${className}`}
    >
      <WhatsAppIcon className={size === "lg" ? "size-6" : "size-4.5"} />
      {children}
    </a>
  );
}
