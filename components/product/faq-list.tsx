import { Plus } from "lucide-react";
import type { ProductFaq } from "@/data/products";

/** Accessible accordion built on native <details>, so it needs no JavaScript. */
export function FaqList({ items }: { items: ProductFaq[] }) {
  return (
    <div className="divide-y divide-white/7 overflow-hidden rounded-3xl border border-white/7 bg-white/2">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-medium text-white transition-colors hover:text-neon">
            {item.question}
            <Plus className="size-5 shrink-0 text-neon transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="px-6 pb-6 text-sm leading-relaxed text-white/60">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
