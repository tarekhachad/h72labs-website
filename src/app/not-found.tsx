import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, Frame, FrameBody, LabelStrip } from "@/components/frame";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Not found — H72 Labs",
};

// Next serves its own unstyled fallback unless this file exists — plain
// black-on-white, no header, no theme, wrong <title>. The ship bar says "no dead
// links", and a link that lands on framework chrome is the same failure.
export default function NotFound() {
  return (
    <PageShell>
      <Frame>
        <SiteHeader />
        <FrameBody>
          <LabelStrip topRule={false}>404</LabelStrip>
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 p-cell text-center">
            <h1 className="text-[clamp(1.4rem,3vw,2.2rem)] font-semibold tracking-[-0.02em]">
              That page doesn&apos;t exist.
            </h1>
            <p className="max-w-[46ch] leading-relaxed text-dim">
              It may have moved, or the link may be wrong. There are only four pages here.
            </p>
            <nav className="mt-2 flex font-mono text-xs">
              <Link href="/" className="border border-line px-3 py-1.5 transition-colors hover:text-accent">
                Home
              </Link>
              <Link href="/portfolio" className="-ml-px border border-line px-3 py-1.5 transition-colors hover:text-accent">
                Portfolio
              </Link>
              <Link href="/contact" className="-ml-px border border-line px-3 py-1.5 transition-colors hover:text-accent">
                Contact
              </Link>
            </nav>
          </div>
        </FrameBody>
        <SiteFooter />
      </Frame>
    </PageShell>
  );
}
