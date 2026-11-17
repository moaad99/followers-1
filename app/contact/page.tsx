import type { Metadata } from "next";
import { Clock, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { STORE_CONFIG } from "@/config/store";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/format";
import {
  buildWhatsAppUrl,
  GENERAL_WHATSAPP_MESSAGE,
  getProductUrl,
} from "@/lib/whatsapp";
import { ContactForm } from "@/components/contact/contact-form";
import { FaqList } from "@/components/product/faq-list";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${STORE_CONFIG.storeName} on WhatsApp to buy a product or ask a question.`,
};

const FAQS = [
  {
    question: "Do I need an account to buy?",
    answer:
      "No. There are no accounts on this site. You choose a product, message us on WhatsApp, and we handle the order in the chat.",
  },
  {
    question: "How do I pay?",
    answer:
      "We share the available payment options in the WhatsApp chat before you pay, and confirm the total with you first.",
  },
  {
    question: "Do you need my password?",
    answer:
      "No. We only need your username or profile link. Never share your password with anyone, including us.",
  },
  {
    question: "Can I order an amount that isn't listed?",
    answer:
      "Ask us on WhatsApp with the platform and number of followers you want, and we'll reply with a price.",
  },
  {
    question: "Can I follow my order after paying?",
    answer:
      "Yes. Use the same WhatsApp chat to ask about progress until delivery is complete.",
  },
];

function formatPhone(digits: string): string {
  return `+${digits.replace(/\D/g, "")}`;
}

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl(GENERAL_WHATSAPP_MESSAGE);
  const productOptions = PRODUCTS.map((product) => ({
    slug: product.slug,
    name: product.name,
    price: formatPrice(product.price),
    url: getProductUrl(product),
  }));

  const details = [
    {
      icon: Phone,
      title: "WhatsApp",
      text: formatPhone(STORE_CONFIG.whatsappNumber),
    },
    { icon: Clock, title: "Opening hours", text: STORE_CONFIG.businessHours },
    { icon: MessageCircle, title: "Response time", text: STORE_CONFIG.responseTime },
    { icon: ShieldCheck, title: "Delivery", text: STORE_CONFIG.deliveryMethod },
  ];

  return (
    <div className="relative isolate pt-28 md:pt-36">
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 -z-10 size-136 rounded-full bg-neon/10 blur-[140px]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-neon uppercase">
            Contact
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Talk to a person, <span className="text-gradient">not a form.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/60">
            All orders and questions go through WhatsApp. Message us directly,
            or use the form below to prepare your message first.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="glow-border relative h-full overflow-hidden rounded-3xl bg-ink-850 p-7 sm:p-8">
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 size-64 rounded-full bg-whatsapp/20 blur-[80px]"
              />
              <h2 className="font-display text-2xl font-semibold text-white">
                Chat with us on WhatsApp
              </h2>
              <p className="mt-2 text-sm text-white/55">
                The fastest way to buy, ask about a product or get support.
              </p>
              <WhatsAppButton href={whatsappUrl} size="lg" className="mt-6 w-full">
                Open WhatsApp
              </WhatsAppButton>

              <ul className="mt-8 space-y-5">
                {details.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-neon/25 bg-neon/10 text-neon">
                      <item.icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm text-white/50">{item.title}</p>
                      <p className="font-medium break-words text-white">
                        {item.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="glass h-full rounded-3xl p-7 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-white">
                Prepare your message
              </h2>
              <p className="mt-2 mb-7 text-sm text-white/55">
                Fill this in and we&apos;ll open WhatsApp with everything
                written for you.
              </p>
              <ContactForm products={productOptions} />
            </div>
          </Reveal>
        </div>

        <section className="mt-24">
          <Reveal>
            <SectionHeading eyebrow="Good to know" title="Common questions" />
            <div className="mt-8">
              <FaqList items={FAQS} />
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
