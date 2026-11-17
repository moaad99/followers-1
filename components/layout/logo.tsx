import Link from "next/link";
import { useId } from "react";
import { STORE_CONFIG } from "@/config/store";

export function Logo({ onClick }: { onClick?: () => void }) {
  const gradientId = useId();
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon"
      aria-label={`${STORE_CONFIG.storeName} home`}
    >
      <svg
        viewBox="0 0 32 32"
        className="size-8 transition-transform duration-500 group-hover:rotate-60"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#39ff88" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <path
          d="M16 2 28.1 9v14L16 30 3.9 23V9Z"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
        />
        <path
          d="M16 9.5 22 13v6l-6 3.5-6-3.5v-6Z"
          fill={`url(#${gradientId})`}
        />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-white">
        {STORE_CONFIG.storeName}
      </span>
    </Link>
  );
}
