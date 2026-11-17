import type { Availability } from "@/data/products";
import { AVAILABILITY_LABELS } from "@/lib/format";

const styles: Record<Availability, { dot: string; text: string }> = {
  "in-stock": { dot: "bg-neon", text: "text-neon" },
  limited: { dot: "bg-amber-400", text: "text-amber-300" },
  "pre-order": { dot: "bg-plasma", text: "text-violet-300" },
  "sold-out": { dot: "bg-rose-500", text: "text-rose-300" },
};

export function AvailabilityBadge({
  availability,
  className = "",
}: {
  availability: Availability;
  className?: string;
}) {
  const style = styles[availability];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/70 px-2.5 py-1 text-xs font-medium backdrop-blur ${style.text} ${className}`}
    >
      <span className="relative flex size-2">
        {availability !== "sold-out" && (
          <span
            className={`absolute inset-0 animate-ping rounded-full opacity-60 ${style.dot}`}
          />
        )}
        <span className={`relative size-2 rounded-full ${style.dot}`} />
      </span>
      {AVAILABILITY_LABELS[availability]}
    </span>
  );
}
