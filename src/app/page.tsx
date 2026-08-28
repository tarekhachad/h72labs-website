import Link from "next/link";
import { products } from "@/content/products";
import { PageShell, Frame, FrameBody, LabelStrip, ShotFrame, StatusLine } from "@/components/frame";
import { SiteHeader, SiteFooter, ContactAddress, Portrait } from "@/components/site-chrome";

// UI_DESIGN §5.1 — section order is CLOSED (§3.3). Two independent sources agreed
// on it. The 2026-08-27 refinement redistributes those same sections across the
// wider frame instead of stacking them vertically; nothing was added or removed.
export default function Home() {
  const featured = products[0];

  // Guard n=0, mirroring ProductCarousel. `products` is a hand-maintained array
  // and the honesty rule requires editing it whenever a status changes, so
  // emptying it is a reachable state — and every field below is dereferenced
  // unconditionally. Returning null is the honest failure: a landing page with
  // an empty product slot would be the ghost cell UI_DESIGN §5.3 forbids.
  //
  // NOT the same shape as ProductCarousel's guard, deliberately: that one blanks
  // only the carousel panel, leaving the portfolio page's header and footer in
  // place. This blanks the whole landing page, header included, because the
  // thesis block is the one thing that must never appear beside an absent
  // product. Both are unreachable while `products` stays populated.
  if (!featured) return null;

  return (
    <PageShell>
      <Frame>
        <SiteHeader />

        <FrameBody>
          {/* The thesis, verbatim and never paraphrased (UI_DESIGN §1). No
              illustration, no gradient, no background graphic behind it. */}
          <div className="shrink-0 border-b border-line px-cell py-[clamp(28px,4.5vh,56px)]">
            <h1 className="max-w-[19ch] text-balance text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.18] tracking-[-0.022em]">
              H72 Labs builds AI tools that turn noisy information into clarity.
            </h1>
          </div>

          {/* minmax(0,·) on both tracks: fr columns default to min-width:auto and
              refuse to shrink below their content, which lets an image blow the
              layout out. This has bitten this project three times. */}
          <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)]">
            <div className="flex min-h-0 flex-col border-b border-line xl:border-b-0 xl:border-r">
              <LabelStrip topRule={false}>01 — Product</LabelStrip>
              <div className="grid min-h-0 flex-1 grid-cols-[38px_minmax(0,1fr)] md:grid-cols-[52px_minmax(0,1fr)]">
                <div className="flex justify-center border-r border-line pt-cell font-mono text-[13px] font-medium tabular-nums text-accent">
                  01
                </div>
                <div className="grid min-h-0 gap-cell p-cell md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                  <ShotFrame className="aspect-[16/10] md:aspect-auto" />
                  <div className="flex min-h-0 flex-col">
                    <h2 className="text-[1.15rem] font-semibold tracking-[-0.01em]">
                      <Link href={`/portfolio/${featured.slug}`} className="transition-colors hover:text-accent">
                        {featured.name}
                      </Link>
                    </h2>
                    <p className="mt-2.5 leading-relaxed text-dim">{featured.summary}</p>
                    <div className="mt-6 md:mt-auto md:pt-6">
                      <StatusLine status={featured.status} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex min-h-0 flex-col">
              <LabelStrip topRule={false}>Founder</LabelStrip>
              {/* The only place on the site with a human voice rather than an
                  instrument's. Keep it short so the contrast stays sharp. §5.1.4 */}
              <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto p-cell">
                <p className="text-[0.92rem] leading-relaxed text-dim">
                  I&apos;m Tarek Hachad. I build these on my own — the design, the code, and the
                  unglamorous parts in between. H72 Labs is where that work lives.
                </p>
                <div className="flex min-h-0 flex-1 justify-center">
                  <Portrait
                    priority
                    className="h-full w-auto max-w-full border border-line object-contain"
                  />
                </div>
              </div>

              <LabelStrip topRule>Contact</LabelStrip>
              <div className="flex shrink-0 flex-col items-center justify-center p-cell text-center">
                <ContactAddress className="break-all font-mono text-[clamp(0.95rem,1.15vw,1.2rem)] text-accent transition-opacity hover:opacity-80" />
              </div>
            </div>
          </div>
        </FrameBody>

        <SiteFooter />
      </Frame>
    </PageShell>
  );
}
