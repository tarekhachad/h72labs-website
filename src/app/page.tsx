import Link from "next/link";
import { products } from "@/content/products";
import { PageShell, Frame, FrameBody, LabelStrip, Shot, ShotFrame, StatusLine } from "@/components/frame";
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
              <LabelStrip topRule={false} as="h2">01 — Product</LabelStrip>
              <div className="grid min-h-0 flex-1 grid-cols-[38px_minmax(0,1fr)] md:grid-cols-[52px_minmax(0,1fr)]">
                {/* Decorative: the heading beside it already says "01 — Product",
                    so without aria-hidden a screen reader announces the numeral
                    twice. Same reasoning as the carousel's position indicator. */}
                <div
                  aria-hidden="true"
                  className="flex justify-center border-r border-line pt-cell font-mono text-[13px] font-medium tabular-nums text-accent"
                >
                  01
                </div>
                <div className="grid min-h-0 gap-cell p-cell md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                  {/* The product's FIRST capture — the feed shot, which reads as
                      "this is what the thing is" at card size.

                      `square`, not `src`: this box is very close to a square
                      (measured 555x592 at 1920, 351x337 at 1280), so the 16:10
                      master would either crop its sides away under `cover` or sit
                      in a band of white under `contain`. The square recapture
                      fills it. Falling back to the master keeps `contain`, which
                      is the honest compromise when no matched variant exists. */}
                  {/* Centres the hugging shot; leftover space sits OUTSIDE its rule. */}
                  <div className="flex min-h-0 items-center justify-center">
                  {featured.screenshots[0] ? (
                    <Shot
                      asset={featured.screenshots[0].square ?? featured.screenshots[0].master}
                      alt={featured.screenshots[0].alt}
                      fit={featured.screenshots[0].square ? "hug" : "contain"}
                      /* A narrow cell inside the product column, never half the
                         viewport. Measured 555px at 1920/2560, 351px at 1280,
                         268px at 390 — so the mobile clause has to be 100vw, not
                         a fraction. The first clause caps it: the frame stops
                         growing at --frame-max once the viewport passes 1868px,
                         so the box is 555px from there on however wide the screen
                         gets, and 30vw would keep asking for more (768px at 2560,
                         over 1000px at 3440). Same cap the other two call sites
                         carry. */
                      sizes="(min-width: 1868px) 555px, (min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                      // Next's LCP detector names this image as this page's LCP element.
                      priority
                    />
                  ) : (
                    // §5.5 parity: the same rectangle the hugged image resolves to.
                    // WIDTH-driven (`w-full` + aspect), never `h-full` — with an
                    // explicit height, aspect-ratio can only adjust the auto axis,
                    // so the empty box stretched to the cell and measured 557x939
                    // against the image's 557x557 at 2560x1440. Width is the
                    // binding dimension in this slot at every size measured.
                    <ShotFrame ratio={[1, 1]} />
                  )}
                  </div>
                  <div className="flex min-h-0 flex-col">
                    <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em]">
                      <Link href={`/portfolio/${featured.slug}`} className="transition-colors hover:text-accent">
                        {featured.name}
                      </Link>
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-dim">{featured.summary}</p>
                    <div className="mt-6 md:mt-auto md:pt-6">
                      <StatusLine status={featured.status} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex min-h-0 flex-col">
              <LabelStrip topRule={false} as="h2">Founder</LabelStrip>
              {/* The only place on the site with a human voice rather than an
                  instrument's. Keep it short so the contrast stays sharp. §5.1.4 */}
              <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto p-cell">
                <p className="text-[0.92rem] leading-relaxed text-dim">
                  I&apos;m Tarek Hachad. I build these on my own — the design, the code, and the
                  unglamorous parts in between. H72 Labs is where that work lives.
                </p>
                <div className="flex min-h-0 flex-1 justify-center">
                  {/* NOT `priority` any more (2026-08-31). It was the landing
                      page's only eager image and a fair LCP guess when it was
                      also the page's largest paint. It is not: Next's LCP
                      detector names the product screenshot above, so the portrait
                      was a second preload competing with the real LCP element for
                      early bandwidth. The contact page's Portrait KEEPS priority —
                      it is the only image on that page. */}
                  <Portrait
                    className="h-full w-auto max-w-full border border-line object-contain"
                  />
                </div>
              </div>

              <LabelStrip topRule as="h2">Contact</LabelStrip>
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
