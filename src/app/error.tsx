"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PageShell, Frame, FrameBody, LabelStrip } from "@/components/frame";
import { SiteHeader, SiteFooter, CONTACT_EMAIL } from "@/components/site-chrome";

/**
 * The error boundary. Without this file Next renders its own unstyled fallback —
 * "Application error: a client-side exception has occurred", black on white, no
 * header, no theme, no way back but the browser's back button. The ship bar says
 * no dead links; landing on framework chrome is the same failure, and `not-found`
 * already exists for exactly that reason.
 *
 * It must be a Client Component: `reset` is a function passed across the boundary,
 * and an error boundary can only be a class/client component in React. It also
 * renders its own PageShell/Frame/header, because it replaces the *page*, not the
 * root layout, so nothing else on screen supplies them.
 *
 * Realistically this is close to unreachable — the site is static and the only
 * client code is the theme toggle and the carousel. It is cheap insurance, not a
 * response to a known failure.
 *
 * DELIBERATELY NOT SHOWN: `error.message`. On a public page that can leak internals
 * and means nothing to a visitor. `error.digest` is Next's own opaque hash of the
 * real error — safe to display, and the only thing that makes a bug report useful,
 * which is why it sits next to the address rather than in a console nobody opens.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // No analytics service on this site, so the console is the whole report.
    // If one is ever added, this is the single place that changes.
    console.error(error);
  }, [error]);

  return (
    <PageShell>
      <Frame>
        <SiteHeader />
        <FrameBody>
          <LabelStrip topRule={false}>Error</LabelStrip>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 p-cell text-center">
            <h1 className="text-[clamp(1.4rem,3vw,2.2rem)] font-semibold tracking-[-0.02em]">
              Something went wrong.
            </h1>
            <p className="max-w-[46ch] leading-relaxed text-dim">
              This page failed to render. It is not something you did, and nothing you
              entered was lost — there is nothing on this site to lose.
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-center font-mono text-xs">
              {/* `reset` re-renders the boundary's subtree rather than reloading, so
                  a transient failure recovers without the visitor losing the page. */}
              <button
                type="button"
                onClick={reset}
                className="border border-line px-3 py-1.5 transition-colors hover:text-accent"
              >
                Try again
              </button>
              <Link
                href="/"
                className="-ml-px border border-line px-3 py-1.5 transition-colors hover:text-accent"
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                className="-ml-px border border-line px-3 py-1.5 transition-colors hover:text-accent"
              >
                Portfolio
              </Link>
            </div>
          </div>

          {/* The readout strip. Renders only when there is a digest to quote —
              an empty REF label would be the ghost cell UI_DESIGN §5.3 forbids. */}
          {error.digest && (
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-line bg-surface px-cell py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
              <span>
                Ref <span className="normal-case tracking-normal">{error.digest}</span>
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Site%20error%20${encodeURIComponent(error.digest)}`}
                className="normal-case tracking-normal text-accent transition-opacity hover:opacity-80"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          )}
        </FrameBody>
        <SiteFooter />
      </Frame>
    </PageShell>
  );
}
