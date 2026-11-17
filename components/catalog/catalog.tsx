"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, PackageSearch, Search, X } from "lucide-react";
import { CATEGORIES, type CategoryId, type Product } from "@/data/products";
import { ProductCard } from "@/components/catalog/product-card";

type CategoryFilter = CategoryId | "all";
type SortOrder = "featured" | "price-asc" | "price-desc" | "name";

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name: A to Z" },
];

function isCategory(value: string): value is CategoryId {
  return CATEGORIES.some((category) => category.id === value);
}

/** Applies ?category=... from the URL, for example when arriving from a footer link. */
function CategoryFromUrl({ onChange }: { onChange: (id: CategoryId) => void }) {
  const searchParams = useSearchParams();
  const value = searchParams.get("category");
  useEffect(() => {
    if (value && isCategory(value)) onChange(value);
  }, [value, onChange]);
  return null;
}

function writeCategoryToUrl(category: CategoryFilter) {
  const params = new URLSearchParams(window.location.search);
  if (category === "all") params.delete("category");
  else params.set("category", category);
  const query = params.toString();
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${query ? `?${query}` : ""}`,
  );
}

export function Catalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortOrder>("featured");

  const counts = useMemo(() => {
    const map = new Map<CategoryFilter, number>([["all", products.length]]);
    for (const product of products) {
      map.set(product.category, (map.get(product.category) ?? 0) + 1);
    }
    return map;
  }, [products]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (!term) return true;
      const haystack = [
        product.name,
        product.shortDescription,
        product.category,
        // Lets "1000", "1k" and "1,000" all match the 1K package
        String(product.quantity),
        product.quantity >= 1000 ? `${product.quantity / 1000}k` : "",
        ...product.features,
      ]
        .join(" ")
        .toLowerCase();
      return term.split(/\s+/).every((word) => haystack.includes(word));
    });

    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "featured")
      sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return sorted;
  }, [products, query, category, sort]);

  const selectCategory = (next: CategoryFilter) => {
    setCategory(next);
    writeCategoryToUrl(next);
  };

  const resetFilters = () => {
    setQuery("");
    selectCategory("all");
  };

  const chips: { id: CategoryFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...CATEGORIES.map((c) => ({ id: c.id as CategoryFilter, label: c.label })),
  ];

  return (
    <div>
      <Suspense fallback={null}>
        <CategoryFromUrl onChange={setCategory} />
      </Suspense>

      {/* Controls */}
      <div className="glass sticky top-[4.5rem] z-30 -mx-1 flex flex-col gap-3 rounded-2xl p-3 md:top-24 lg:flex-row lg:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/40" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search, for example 1K or TikTok…"
            className="h-11 w-full rounded-xl border border-white/10 bg-ink-950/60 pr-10 pl-11 text-sm text-white placeholder:text-white/35 focus:border-neon/60 focus:ring-2 focus:ring-neon/20 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white"
            >
              <X className="size-4" />
            </button>
          )}
        </label>

        <label className="relative lg:w-56">
          <span className="sr-only">Sort products</span>
          <ArrowUpDown className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/40" />
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOrder)}
            className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-ink-950/60 pr-4 pl-11 text-sm text-white focus:border-neon/60 focus:ring-2 focus:ring-neon/20 focus:outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-ink-900">
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        role="group"
        aria-label="Filter by platform"
        className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {chips.map((chip) => {
          const active = category === chip.id;
          const count = counts.get(chip.id) ?? 0;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => selectCategory(chip.id)}
              aria-pressed={active}
              className={`relative inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-neon/60 text-ink-950"
                  : "border-white/10 text-white/70 hover:border-white/25 hover:text-white"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full bg-neon"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{chip.label}</span>
              <span
                className={`relative rounded-full px-1.5 text-xs ${
                  active ? "bg-ink-950/15" : "bg-white/10 text-white/50"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-white/45">
        {visible.length === 1
          ? "1 package"
          : `${visible.length} packages`}
        {query.trim() && (
          <>
            {" "}
            matching <span className="text-white/80">“{query.trim()}”</span>
          </>
        )}
      </p>

      {visible.length > 0 ? (
        <motion.ul
          layout
          className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((product, index) => (
              <motion.li
                key={product.slug}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} eager={index < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="glass mt-6 flex flex-col items-center rounded-3xl px-6 py-16 text-center">
          <PackageSearch className="size-10 text-neon" />
          <h3 className="mt-4 font-display text-xl font-semibold text-white">
            No packages match your search
          </h3>
          <p className="mt-2 max-w-sm text-sm text-white/55">
            Try a different size or platform. If you need an amount that
            isn&apos;t listed, ask us on WhatsApp.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 rounded-full border border-neon/40 px-5 py-2.5 text-sm font-medium text-neon transition-colors hover:bg-neon/10"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
