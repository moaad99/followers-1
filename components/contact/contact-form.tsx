"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface ProductOption {
  slug: string;
  name: string;
  price: string;
  url: string;
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 text-sm text-white placeholder:text-white/35 focus:border-neon/60 focus:ring-2 focus:ring-neon/20 focus:outline-none";

/**
 * Composes a WhatsApp message from the visitor's input and opens WhatsApp.
 * Nothing is sent to a server.
 */
export function ContactForm({ products }: { products: ProductOption[] }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) {
      setError("Please write a short message so we know how to help.");
      return;
    }
    setError("");

    const product = products.find((p) => p.slug === productSlug);
    const lines = [
      name.trim() ? `Hello! My name is ${name.trim()}.` : "Hello!",
      "",
      message.trim(),
    ];
    if (product) {
      lines.push("", `Package: ${product.name} (${product.price})`, product.url);
    }
    const handle = username.trim().replace(/^@/, "");
    if (handle) {
      lines.push("", `My username: @${handle}`);
    }

    window.open(
      buildWhatsAppUrl(lines.join("\n")),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm text-white/70">
          Your name <span className="text-white/35">(optional)</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={`${fieldClass} h-12`}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="contact-username" className="mb-2 block text-sm text-white/70">
          Instagram or TikTok username{" "}
          <span className="text-white/35">(optional)</span>
        </label>
        <input
          id="contact-username"
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className={`${fieldClass} h-12`}
          placeholder="@yourusername"
        />
        <p className="mt-1.5 text-xs text-white/40">
          Only your username. Never share your password.
        </p>
      </div>

      <div>
        <label htmlFor="contact-product" className="mb-2 block text-sm text-white/70">
          Package <span className="text-white/35">(optional)</span>
        </label>
        <select
          id="contact-product"
          value={productSlug}
          onChange={(event) => setProductSlug(event.target.value)}
          className={`${fieldClass} h-12 appearance-none`}
        >
          <option value="" className="bg-ink-900">
            General question
          </option>
          {products.map((product) => (
            <option key={product.slug} value={product.slug} className="bg-ink-900">
              {product.name} · {product.price}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm text-white/70">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "contact-error" : undefined}
          className={`${fieldClass} resize-y py-3`}
          placeholder="What would you like to know?"
        />
        {error && (
          <p id="contact-error" role="alert" className="mt-2 text-sm text-rose-300">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-ink-950 shadow-[0_10px_40px_-8px_rgb(37_211_102/0.7)] transition-all hover:bg-[#3ae07a] active:scale-[0.98]"
      >
        <Send className="size-4" />
        Continue on WhatsApp
      </button>
      <p className="text-center text-xs text-white/40">
        Opens WhatsApp with your message ready to send. Nothing is stored on
        this website.
      </p>
    </form>
  );
}
