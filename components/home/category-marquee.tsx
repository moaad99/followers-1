import { CATEGORIES } from "@/data/products";

/** Decorative scrolling band of category names. */
export function CategoryMarquee() {
  const words = [...CATEGORIES.map((c) => c.label), "Licences included"];
  const loop = [...words, ...words];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/6 bg-ink-900/60 py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="flex w-max animate-marquee gap-10">
        {loop.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="flex items-center gap-10 font-display text-2xl font-medium whitespace-nowrap text-white/25 sm:text-3xl"
          >
            {word}
            <span className="size-2 rotate-45 bg-neon/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
