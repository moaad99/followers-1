import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[80svh] items-center justify-center px-4 pt-24 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]"
      />
      <div>
        <p className="text-gradient font-display text-8xl font-bold sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
          This page isn&apos;t in the vault
        </h1>
        <p className="mx-auto mt-3 max-w-md text-white/55">
          The link may be old, or the product may have been removed. Have a
          look at what&apos;s available now.
        </p>
        <Link
          href="/#catalog"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-neon px-6 font-semibold text-ink-950 transition-shadow hover:shadow-[0_10px_40px_-8px_rgb(57_255_136/0.8)]"
        >
          <ArrowLeft className="size-4" />
          Back to the packages
        </Link>
      </div>
    </div>
  );
}
