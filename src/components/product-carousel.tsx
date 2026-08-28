"use client";

import { useCallback, useEffect, useState } from "react";
import { useAnimate, useReducedMotion } from "motion/react";
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
  // `dir` is the direction of the LAST advance, and 0 until the visitor makes
  // one. That zero is what keeps the first paint still: the brief bans entrance
  // animations, so the slide has to be a response to an action, never a greeting.
  const [{ i, dir }, setSlide] = useState({ i: 0, dir: 0 });
  const reduce = useReducedMotion();
  const n = products.length;
  const many = n > 1;

  const step = useCallback(
    (d: number) => setSlide((c) => ({ i: (c.i + d + n) % n, dir: d })),
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

  // The slide's only job is to say WHICH WAY YOU WENT — spatial consistency, not
  // spectacle. The panel displaces 16px and settles; it does not travel its own
  // width. "State changes, not performances" (MASTER.md §5.4).
  //
  // Driven imperatively against a STABLE element, and the stability is the point.
  // Keying the panel on the slug animated just as well but remounted the subtree,
  // which destroys focus: tab to "Read the detail", press ArrowRight, and the
  // focused link is torn out of the DOM — focus silently resets to <body> with no
  // ring and no way back but tabbing from the top. The arrow keys are bound to the
  // window (see above), so that path is ordinary, not exotic. No key, no remount:
  // React updates the href in place and focus survives.
  //
  // Motion rather than a `transition-*` utility, for a narrower reason than it
  // first appears. Explicit `duration-*`/`ease-*` classes DO escape the 120ms
  // linear default in globals.css — that override is not what forces JS here. The
  // real reason is that this is a from→to on an element that never unmounts, which
  // in CSS needs a double-rAF class-toggle dance to have a "from" at all. Motion
  // expresses it as two keyframes. Hover states keep their 120ms linear either way.
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    // dir === 0 is the first paint, which must be still: the brief bans entrance
    // animations, so the slide is a response to an action, never a greeting.
    if (dir === 0 || !scope.current) return;
    animate(
      scope.current,
      // Reduced motion keeps the fade and drops the travel — gentler, not zero.
      // globals.css cannot do this for us: its prefers-reduced-motion rule only
      // zeroes CSS animation/transition durations, and this is WAAPI.
      //
      // `reduce` is null only during SSR, never on the client: useReducedMotion
      // calls initPrefersReducedMotion() synchronously in its own body and reads
      // matchMedia there, so useState captures a real boolean on the very first
      // client render. Since null is falsy it would fail OPEN toward full motion,
      // but no keypress exists on the server for it to fail open on. Noted rather
      // than guarded — the hazard is theoretical, and the `dir === 0` check above
      // is not what closes it.
      reduce
        ? { opacity: [0, 1] }
        // The full transform string, not Motion's `x` shorthand. Not style: the
        // WAAPI gate in motion-dom tests the ANIMATED KEY against acceleratedValues
        // (`transform` is in it, `x` is not) before `x` is ever composed into a
        // transform, so animating `x` falls back to the main-thread frameloop while
        // this takes the native off-thread path. Verified in motion-dom@13.
        : { transform: [`translateX(${dir * 16}px)`, "translateX(0px)"], opacity: [0, 1] },
      { duration: reduce ? 0.12 : 0.2, ease: [0.23, 1, 0.32, 1] },
    );
  }, [i, dir, reduce, animate, scope]);

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

      {/* A dedicated live region, rather than aria-live on the panel itself. The
          panel announces everything it contains on every advance — the summary
          paragraph, the link text, the status pill, and ShotFrame's "Screenshot"
          placeholder, which is identical on every slide. This says the one thing
          that changed. */}
      <span aria-live="polite" className="sr-only">
        {many ? `Showing ${i + 1} of ${n}: ${p.name}` : ""}
      </span>

      <div
        ref={scope}
        id="carousel-panel"
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
