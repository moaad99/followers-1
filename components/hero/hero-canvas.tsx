"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Three.js needs the browser (WebGL, window), so the scene is never server-rendered.
const HeroScene = dynamic(() => import("@/components/hero/hero-scene"), {
  ssr: false,
});

export function HeroCanvas({ className = "" }: { className?: string }) {
  const [ready, setReady] = useState(false);
  return (
    <div
      className={`transition-opacity duration-1400 ease-out ${
        ready ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <HeroScene onReady={() => setReady(true)} />
    </div>
  );
}
