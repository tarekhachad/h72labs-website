"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/content/products";
import { ShotFrame, StatusLine } from "@/components/frame";

/**
 * The portfolio, one product at a time. Replaced the stacked list on 2026-08-27:
 * with the frame fixed to one viewport there is no vertical scroll, so a stack
 * had nowhere to go.
 *
 * UI_DESIGN §5.3 still holds — this renders from the product list and absorbs
 * n >= 2 with no rework. Only the mechanism changed, from "rows stack" to
 * "slides advance".
 *
 * AT n = 1 THERE ARE NO ARROWS. Rendering disabled arrows would be the same sin
 * as the "coming soon" ghost cells §5.3 forbids — chrome implying content that
 * does not exist.
 */
export function ProductCarousel({ products }: { products: Product[] }) {
  const [i, setI] = useState(0);
  const n = products.length;
  const many = n > 1;

  const step = useCallback(
    (d: number) => setI((c) => (c + d + n) % n),
    [n],
  );

  // Arrow keys are bound to the window rather than scoped to a focused widget.
  // Deliberate: the portfolio page IS the carousel — it has no other arrow-key
  // consumer, and requiring focus first would make the shortcut undiscoverable on
  // a page whose whole content is the slide. Revisit if this page gains another
  // interactive widget.
  useEffect(() => {
    if (!many) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [many, step]);

  // Guard the empty case: products[i] would throw. `many` covers n>=2 but not n=0.
  if (n === 0) return null;

  const p = products[i];
  const pos = `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-line bg-surface px-cell">
        {/* The numeral is a position indicator here, so it encodes something true. */}
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] tabular-nums text-dim">
          Portfolio — {pos}
        </span>
        {many && (
          <div className="flex">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous product"
              aria-controls="carousel-panel"
              className="h-6.5 w-[34px] border border-line font-mono text-[13px] text-dim transition-colors hover:text-accent"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next product"
              aria-controls="carousel-panel"
              className="-ml-px h-6.5 w-[34px] border border-line font-mono text-[13px] text-dim transition-colors hover:text-accent"
            >
              →
            </button>
          </div>
        )}
      </div>

      <div
        id="carousel-panel"
        aria-live="polite"
        className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
      >
        <div className="flex min-h-0 border-b border-line p-cell xl:border-b-0 xl:border-r">
          <ShotFrame className="aspect-[16/10] w-full xl:aspect-auto xl:flex-1" />
        </div>
        <div className="flex min-h-0 flex-col p-cell">
          <h2 className="text-[clamp(1.15rem,2vw,1.6rem)] font-semibold tracking-[-0.015em]">
            {p.name}
          </h2>
          <p className="mt-3 leading-relaxed text-dim">{p.summary}</p>
          <Link
            href={`/portfolio/${p.slug}`}
            className="mt-3.5 self-start font-mono text-[11px] text-accent transition-opacity hover:opacity-80"
          >
            Read the detail →
          </Link>
          <div className="mt-6 self-start xl:mt-auto xl:pt-6">
            <StatusLine status={p.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
