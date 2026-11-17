"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { getCategoryLabel, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { AvailabilityBadge } from "@/components/ui/availability-badge";

interface ProductCardProps {
  product: Product;
  /** Load the image eagerly (use for cards visible on first paint). */
  eager?: boolean;
}

const spring = { stiffness: 220, damping: 22, mass: 0.6 };

export function ProductCard({ product, eager = false }: ProductCardProps) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-11, 11]), spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.14), transparent 45%)`;

  // Tilt only follows a mouse. Touch devices get the plain card.
  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const soldOut = product.availability === "sold-out";

  return (
    <motion.article
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="group relative h-full rounded-3xl transform-3d"
    >
      <Link
        href={`/products/${product.slug}`}
        className="glass glow-border relative flex h-full flex-col overflow-hidden rounded-3xl p-3 transition-shadow duration-500 group-hover:shadow-[0_30px_80px_-30px_rgb(57_255_136/0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon"
      >
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-ink-800">
          <Image
            src={product.images[0]}
            alt={`${product.name} cover`}
            fill
            loading={eager ? "eager" : "lazy"}
            sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] ${
              soldOut ? "opacity-60 grayscale-[40%]" : ""
            }`}
          />
          <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
            <span className="rounded-full border border-white/10 bg-ink-950/70 px-2.5 py-1 text-xs font-medium text-white/85 backdrop-blur">
              {getCategoryLabel(product.category)}
            </span>
            <AvailabilityBadge availability={product.availability} />
          </div>
          {product.featured && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-neon px-2.5 py-1 text-xs font-semibold text-ink-950">
              <Sparkles className="size-3.5" />
              Featured
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
          <h3 className="font-display text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-neon">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">
            {product.shortDescription}
          </p>

          <div className="mt-auto flex items-end justify-between gap-3 pt-6">
            <p className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-white">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-white/35 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all duration-300 group-hover:border-neon/50 group-hover:bg-neon group-hover:text-ink-950">
              View details
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </Link>
    </motion.article>
  );
}
