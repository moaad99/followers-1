"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { HeroCanvas } from "@/components/hero/hero-canvas";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

interface HeroProps {
  whatsappUrl: string;
  stats: { value: string; label: string }[];
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero({ whatsappUrl, stats }: HeroProps) {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={section}
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background layers */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-ink-950" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-40 -z-20 size-128 animate-pulse-slow rounded-full bg-neon/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-0 -z-20 size-144 animate-pulse-slow rounded-full bg-plasma/20 blur-[140px] [animation-delay:1.6s]"
      />

      <HeroCanvas className="absolute inset-0 -z-10" />

      {/* Keeps text readable over the 3D scene on small screens */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/80 via-ink-950/40 to-transparent lg:from-ink-950/70 lg:via-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.p
            variants={item}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-white/80 uppercase sm:text-xs"
          >
            <span className="size-1.5 rounded-full bg-neon shadow-[0_0_10px_2px_rgb(57_255_136/0.8)]" />
            Instagram · TikTok · WhatsApp checkout
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[2.6rem] leading-[1.02] font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Grow your followers,{" "}
            <span className="text-gradient">one message away.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            Instagram and TikTok packages from 100 to 10,000 followers. Pick a
            package, tap <span className="text-white">Buy via WhatsApp</span>{" "}
            and send us your username. We never ask for your password.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="#catalog"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-neon px-7 font-semibold text-ink-950 shadow-[0_10px_40px_-8px_rgb(57_255_136/0.7)] transition-all duration-300 hover:shadow-[0_14px_50px_-6px_rgb(57_255_136/0.9)] active:scale-[0.98]"
            >
              See the packages
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <WhatsAppButton href={whatsappUrl} variant="outline" size="lg">
              Ask a question
            </WhatsAppButton>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-12 grid max-w-lg grid-cols-3 gap-3"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl px-4 py-3">
                <dt className="text-[11px] text-white/50 sm:text-xs">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-lg font-semibold text-white sm:text-2xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>

      <motion.a
        href="#catalog"
        aria-label="Scroll to the packages"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition-colors hover:text-neon md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <ArrowDown className="size-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
