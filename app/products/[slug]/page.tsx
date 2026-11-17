import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Check,
  ChevronRight,
  Clock,
  FileArchive,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { STORE_CONFIG } from "@/config/store";
import {
  getCategoryLabel,
  getProductBySlug,
  getRelatedProducts,
  PRODUCTS,
  type Product,
  type ProductFaq,
} from "@/data/products";
import { formatPrice } from "@/lib/format";
import { getProductUrl, getProductWhatsAppUrl } from "@/lib/whatsapp";
import { AvailabilityBadge } from "@/components/ui/availability-badge";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Reveal } from "@/components/ui/reveal";
import { ProductGallery } from "@/components/product/product-gallery";
import { FaqList } from "@/components/product/faq-list";
import { MobileBuyBar } from "@/components/product/mobile-buy-bar";
import { ProductCard } from "@/components/catalog/product-card";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: `/products/${product.slug}`,
    },
  };
}

function buyLabel(product: Product): string {
  if (product.availability === "sold-out") return "Ask about restock";
  if (product.availability === "pre-order") return "Pre-order via WhatsApp";
  return "Buy via WhatsApp";
}

function generalFaqs(product: Product): ProductFaq[] {
  return [
    {
      question: "How does buying over WhatsApp work?",
      answer:
        "Tap the WhatsApp button and send the prepared message. We reply in the chat, confirm the details and share the payment options. Once payment is confirmed, we send your product.",
    },
    {
      question: "When will I receive the product?",
      answer: `${product.delivery.time}. Delivery format: ${product.delivery.format.toLowerCase()}.`,
    },
    {
      question: "Can I ask questions before buying?",
      answer:
        "Yes. Message us on WhatsApp with any question about formats, compatibility or licensing and we'll answer before you decide.",
    },
  ];
}

const SCHEMA_AVAILABILITY: Record<Product["availability"], string> = {
  "in-stock": "https://schema.org/InStock",
  limited: "https://schema.org/LimitedAvailability",
  "pre-order": "https://schema.org/PreOrder",
  "sold-out": "https://schema.org/SoldOut",
};

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const whatsappUrl = getProductWhatsAppUrl(product);
  const label = buyLabel(product);
  const price = formatPrice(product.price);
  const categoryLabel = getCategoryLabel(product.category);
  const related = getRelatedProducts(product);
  const faqs = [...(product.faqs ?? []), ...generalFaqs(product)];
  const savings = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((src) => `${STORE_CONFIG.siteUrl}${src}`),
    category: categoryLabel,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: STORE_CONFIG.currency,
      availability: SCHEMA_AVAILABILITY[product.availability],
      url: getProductUrl(product),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="relative isolate pt-24 pb-8 md:pt-28">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 h-112 w-240 -translate-x-1/2 rounded-full bg-plasma/10 blur-[140px]"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/45">
              <li>
                <Link href="/" className="hover:text-neon">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight aria-hidden="true" className="size-4" />
                <Link
                  href={`/?category=${product.category}#catalog`}
                  className="hover:text-neon"
                >
                  {categoryLabel}
                </Link>
              </li>
              <li
                aria-current="page"
                className="flex items-center gap-1.5 text-white/80"
              >
                <ChevronRight aria-hidden="true" className="size-4 text-white/45" />
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ProductGallery images={product.images} name={product.name} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-plasma/40 bg-plasma/10 px-3 py-1 text-xs font-medium text-violet-200">
                  {categoryLabel}
                </span>
                <AvailabilityBadge availability={product.availability} />
              </div>

              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-white/65">
                {product.shortDescription}
              </p>

              <div className="mt-7 flex flex-wrap items-end gap-3">
                <span className="font-display text-5xl font-semibold text-white">
                  {price}
                </span>
                {product.compareAtPrice && (
                  <>
                    <span className="pb-1.5 text-lg text-white/35 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                    <span className="mb-2 rounded-full bg-neon/15 px-2.5 py-1 text-xs font-semibold text-neon">
                      Save {savings}%
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1 text-sm text-white/40">
                One-time payment · {STORE_CONFIG.currency}
              </p>

              <div className="glass mt-8 rounded-3xl p-5 sm:p-6">
                <WhatsAppButton
                  href={whatsappUrl}
                  size="lg"
                  className="w-full"
                >
                  {label}
                </WhatsAppButton>
                <p className="mt-3 text-center text-xs leading-relaxed text-white/45">
                  Opens WhatsApp with a message containing the product name,
                  price and link. Payment and delivery are arranged in the chat.
                </p>
                <ul className="mt-5 grid gap-3 border-t border-white/7 pt-5 text-sm text-white/70 sm:grid-cols-3">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="size-4 shrink-0 text-neon" />
                    Licence included
                  </li>
                  <li className="flex items-center gap-2">
                    <FileArchive className="size-4 shrink-0 text-neon" />
                    Digital delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <RefreshCw className="size-4 shrink-0 text-neon" />
                    {product.delivery.updates}
                  </li>
                </ul>
              </div>

              <div className="mt-10 space-y-4 leading-relaxed text-white/70">
                {product.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <h2 className="mt-10 font-display text-xl font-semibold text-white">
                What&apos;s included
              </h2>
              <ul className="mt-4 space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-white/75">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-neon/15">
                      <Check className="size-3.5 text-neon" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <section className="glass h-full rounded-3xl p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-white">
                  Specifications
                </h2>
                <dl className="mt-5 divide-y divide-white/7">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between gap-6 py-3.5 text-sm"
                    >
                      <dt className="text-white/50">{spec.label}</dt>
                      <dd className="text-right font-medium text-white">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </Reveal>

            <Reveal delay={0.1}>
              <section className="glass h-full rounded-3xl p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-white">
                  Delivery
                </h2>
                <ul className="mt-5 space-y-5">
                  {[
                    { icon: FileArchive, title: "Format", text: product.delivery.format },
                    { icon: Clock, title: "When", text: product.delivery.time },
                    { icon: RefreshCw, title: "Updates", text: product.delivery.updates },
                  ].map((row) => (
                    <li key={row.title} className="flex gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-neon/25 bg-neon/10 text-neon">
                        <row.icon className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm text-white/50">{row.title}</p>
                        <p className="font-medium text-white">{row.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-white/45">
                  {STORE_CONFIG.deliveryMethod}.
                </p>
              </section>
            </Reveal>
          </div>

          <section className="mt-20">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-white">
                Questions
              </h2>
              <div className="mt-6">
                <FaqList items={faqs} />
              </div>
            </Reveal>
          </section>

          {related.length > 0 && (
            <section className="mt-24">
              <Reveal>
                <div className="flex items-end justify-between gap-4">
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-white">
                    You might also like
                  </h2>
                  <Link
                    href="/#catalog"
                    className="hidden text-sm text-neon hover:underline sm:block"
                  >
                    View all products
                  </Link>
                </div>
              </Reveal>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {related.map((item, index) => (
                  <Reveal key={item.slug} as="li" delay={index * 0.08}>
                    <ProductCard product={item} />
                  </Reveal>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <MobileBuyBar
        price={price}
        name={product.name}
        href={whatsappUrl}
        label={label}
      />
    </>
  );
}
