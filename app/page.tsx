import { CATEGORIES, PRODUCTS } from "@/data/products";
import { buildWhatsAppUrl, GENERAL_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { Hero } from "@/components/hero/hero";
import { CategoryMarquee } from "@/components/home/category-marquee";
import { HowItWorks } from "@/components/home/how-it-works";
import { CtaBand } from "@/components/home/cta-band";
import { Catalog } from "@/components/catalog/catalog";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export default function HomePage() {
  const whatsappUrl = buildWhatsAppUrl(GENERAL_WHATSAPP_MESSAGE);

  const stats = [
    { value: String(PRODUCTS.length), label: "Packages" },
    { value: String(CATEGORIES.length), label: "Platforms" },
    { value: "0", label: "Passwords needed" },
  ];

  return (
    <>
      <Hero whatsappUrl={whatsappUrl} stats={stats} />
      <CategoryMarquee />
      <HowItWorks />

      <section
        id="catalog"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-24 sm:px-6 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Packages"
            title="Choose your package"
            description="Filter by platform or search by size, for example 1K or 10K. Open any package for delivery details and to order."
          />
        </Reveal>
        <div className="mt-10">
          <Catalog products={PRODUCTS} />
        </div>
      </section>

      <CtaBand whatsappUrl={whatsappUrl} />
    </>
  );
}
