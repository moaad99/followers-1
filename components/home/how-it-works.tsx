import { Download, MessageCircle, MousePointerClick } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "Pick a product",
    text: "Browse the catalogue and open any product to see what's inside, the formats and the licence.",
  },
  {
    icon: MessageCircle,
    title: "Message us on WhatsApp",
    text: "Tap Buy via WhatsApp. Your message is written for you, with the product name, price and link.",
  },
  {
    icon: Download,
    title: "Get your files",
    text: "We confirm payment with you directly and send the download link or access straight to your chat.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="How buying works"
          title={
            <>
              No cart. No checkout.{" "}
              <span className="text-gradient">Just a conversation.</span>
            </>
          }
          description="Every order is handled by a real person, so you can ask questions before you pay."
        />
      </Reveal>

      <ol className="mt-14 grid gap-5 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <Reveal
            key={step.title}
            as="li"
            delay={index * 0.1}
            className="glass group relative h-full overflow-hidden rounded-3xl p-7"
          >
              <span
                aria-hidden="true"
                className="absolute -top-6 -right-2 font-display text-[7rem] leading-none font-bold text-white/4 transition-colors duration-500 group-hover:text-neon/10"
              >
                0{index + 1}
              </span>
              <span className="flex size-12 items-center justify-center rounded-2xl border border-neon/30 bg-neon/10 text-neon">
                <step.icon className="size-6" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {step.text}
              </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
