import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

interface CtaBandProps {
  whatsappUrl: string;
  title?: string;
  text?: string;
  buttonLabel?: string;
}

export function CtaBand({
  whatsappUrl,
  title = "Can't find what you're looking for?",
  text = "Tell us what you need. We can point you to the right product or let you know when something new is coming.",
  buttonLabel = "Message us on WhatsApp",
}: CtaBandProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="glow-border relative isolate overflow-hidden rounded-4xl bg-ink-850 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -z-10 h-64 w-144 -translate-x-1/2 rounded-full bg-neon/20 blur-[100px]"
          />
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60 sm:text-lg">
            {text}
          </p>
          <WhatsAppButton href={whatsappUrl} size="lg" className="mt-9">
            {buttonLabel}
          </WhatsAppButton>
        </div>
      </Reveal>
    </section>
  );
}
