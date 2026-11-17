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
    { value: String(PRODUCTS.length), label: "Products" },
    { value: String(CATEGORIES.length), label: "Categories" },
    { value: "0", label: "Sign-ups needed" },
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
            eyebrow="The catalogue"
            title="Everything in the vault"
            description="Search by name or keyword, or filter by category. Open any product for full details and to order."
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
