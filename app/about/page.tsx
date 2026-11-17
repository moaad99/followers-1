import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartHandshake, KeyRound, Tags } from "lucide-react";
import { STORE_CONFIG } from "@/config/store";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppUrl, GENERAL_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { CtaBand } from "@/components/home/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "About",
  description: `How ${STORE_CONFIG.storeName} handles Instagram and TikTok follower orders over WhatsApp.`,
};

const VALUES = [
  {
    icon: KeyRound,
    title: "Your account stays yours",
    text: "We only ever ask for your username or profile link. We never ask for your password, and you should never give it to anyone.",
  },
  {
    icon: HeartHandshake,
    title: "A real person on the other side",
    text: "When you message us, you talk to someone who handles your order from payment to delivery and answers your questions along the way.",
  },
  {
    icon: Tags,
    title: "Clear packages and prices",
    text: "Every package shows its price, the number of followers and the expected delivery time before you message us.",
  },
];

export default function AboutPage() {
  const whatsappUrl = buildWhatsAppUrl(GENERAL_WHATSAPP_MESSAGE);
  const lowestPrice = Math.min(...PRODUCTS.map((p) => p.price));

  const facts = [
    { value: String(PRODUCTS.length), label: "Packages to choose from" },
    { value: String(CATEGORIES.length), label: "Platforms" },
    { value: formatPrice(lowestPrice), label: "Starting price" },
    { value: "1", label: "Chat to place an order" },
  ];

  return (
    <div className="relative isolate pt-28 md:pt-36">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 -z-10 size-136 rounded-full bg-plasma/15 blur-[140px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-neon uppercase">
            About {STORE_CONFIG.storeName}
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            A small store for creators who{" "}
            <span className="text-gradient">want to be seen.</span>
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.1}>
            <div className="space-y-5 text-lg leading-relaxed text-white/65">
              <p>
                {STORE_CONFIG.storeName} sells Instagram and TikTok follower
                packages, from 100 to 10,000 followers. You pick a size, we
                add the followers to your public profile, and you never have
                to share your password.
              </p>
              <p>
                We take orders on WhatsApp instead of a checkout page on
                purpose. Most people have a question before they buy: how long
                will it take, does my account need to be public, can I get a
                different amount? A short conversation answers those faster
                than a form.
              </p>
              <p>
                It also keeps things simple for you. There&apos;s no account to
                create, and the same chat is where you follow your order until
                it&apos;s done.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="grid grid-cols-2 gap-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="glass flex flex-col-reverse gap-2 rounded-3xl p-6"
                >
                  <dt className="text-sm text-white/50">{fact.label}</dt>
                  <dd className="font-display text-4xl font-semibold text-white">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href="/#catalog"
              className="group mt-6 inline-flex items-center gap-2 font-medium text-neon"
            >
              See the packages
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <section className="py-24">
          <Reveal>
            <SectionHeading eyebrow="What we stand for" title="Three promises" />
          </Reveal>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((value, index) => (
              <Reveal
                key={value.title}
                as="li"
                delay={index * 0.1}
                className="glass rounded-3xl p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl border border-plasma/30 bg-plasma/10 text-violet-300">
                  <value.icon className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {value.text}
                </p>
              </Reveal>
            ))}
          </ul>
        </section>
      </div>

      <CtaBand
        whatsappUrl={whatsappUrl}
        title="Have a question before you buy?"
        text="Ask us about delivery times, account requirements or a custom amount. We reply personally."
      />
    </div>
  );
}
