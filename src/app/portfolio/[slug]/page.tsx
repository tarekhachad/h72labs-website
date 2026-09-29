import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/content/products";
import { PageShell, Frame, FrameBody, LabelStrip, Shot, ShotFrame, StatusLine } from "@/components/frame";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ProductAccess } from "@/components/product-access";
import { pageMetadata } from "@/lib/site";

// Every product is known at build time, so there is nothing to resolve on
// demand. Without this, Next leaves dynamicParams at its default `true` and an
// unlisted slug is rendered at request time — which still 404s correctly, but
// makes the README's "no server to run" claim not quite true. Now it is.
export const dynamicParams = false;

// Block 4 renders this many slots ALWAYS, filled or empty, so the row is the
// same height either way — the layout must not tell you how finished a product
// is.
//
// ⚠ THIS IS A MANUALLY-MAINTAINED INVARIANT, NOT A TYPE-ENFORCED ONE. The two
// really is written three times: here, as `md:grid-cols-2` on the row below,
// and as the arity of Product.screenshots' tuple. Nothing binds them — Tailwind
// needs a static class string, so the grid cannot be derived from this constant,
// and the tuple type does not reference it either. Widen that tuple to three
// without touching this file and `tsc` stays silent, the grid stays two columns,
// and the third capture is dropped with nothing to notice it. Change all three
// together or not at all.
const SCREENSHOT_SLOTS = 2;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    // Unreachable in output, and worth saying exactly why, because the reason
    // changed. It is NOT that notFound() below discards this — that was true
    // before `dynamicParams = false` was set above. Now an unlisted slug is
    // rejected at the routing layer, ahead of this function mattering at all,
    // and the branded 404 comes wholly from not-found.tsx.
    //
    // MEASURED, not reasoned: returning a distinctive title here and rebuilding,
    // /portfolio/typo served "Not found — H72 Labs" with zero occurrences of the
    // probe string. Kept only so the branch is type-complete. Do not elaborate
    // it — nothing written here reaches a response.
    return pageMetadata({
      title: "Not found",
      description: "That page doesn't exist.",
      path: "/404",
      noIndex: true,
    });
  }
  return pageMetadata({
    title: product.name,
    description: product.summary,
    path: `/portfolio/${product.slug}`,
  });
}

// UI_DESIGN §5.2 — the seven blocks, laid out as a three-column datasheet
// (2026-08-27). The stacked version measured 2173px against a ~790px budget;
// padding cuts could not close a 1380px gap, so the blocks moved sideways into
// the width the wider frame provides. No block was deleted — that call was made
// explicitly: blocks 5 and 6 STAY, because the problem was spacing, not
// information. Do not "fix" a future overflow here by removing a block.
//
// NO repo link in v1 (PNA's README is still boilerplate).
// NO public roadmap in v1 (a published roadmap is a promise you own).
export default async function ProductDetailPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <PageShell>
      <Frame>
        <SiteHeader />

        <FrameBody>
          {/* 1 — name + status */}
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-line px-cell py-3.5">
            <h1 className="text-balance text-[clamp(1.2rem,2.3vw,1.75rem)] font-semibold tracking-[-0.018em]">
              {product.name}
            </h1>
            {/* Beside the title, not under it: a second row here comes straight
                off the screenshot strip, which gets only what the text leaves. */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <ProductAccess product={product} className="gap-1" />
              <StatusLine status={product.status} />
            </div>
          </div>

          {/* NOT flex-1 any more (changed 2026-08-31). It used to absorb every
              spare pixel in the frame, which meant the three columns stretched
              to the full height whether their copy needed it or not — at
              1920x1080 the tallest column needed 332px and was handed 684px, so
              352px of the page was whitespace under the text while the
              screenshots below were squeezed into a 113px strip. Sizing to
              content and letting block 4 take the remainder puts that space
              where the evidence is. `min-h-0` plus the panes' own overflow-y
              keeps the tight case (1280x800) safe rather than overflowing. */}
          <div className="grid min-h-0 grid-cols-1 xl:grid-cols-3">
            {/* 2 + 3 — what it is, how it's used.
                ONE scroll container for the whole column, not one per panel. With
                flex-1 on each panel they split height 50/50 regardless of content,
                so the longer block scrolled while the shorter one sat on unused
                space. Sharing a single pool lets them size to their actual copy. */}
            <div className="flex min-h-0 flex-col overflow-y-auto border-b border-line xl:border-b-0 xl:border-r">
              <LabelStrip topRule={false} as="h2">What it is</LabelStrip>
              <div className="shrink-0 px-cell py-3.5">
                <p className="text-[0.9rem] leading-[1.5] text-dim">{product.whatItIs}</p>
              </div>
              <LabelStrip topRule as="h2">How it&apos;s used</LabelStrip>
              <div className="shrink-0 px-cell py-3.5">
                <p className="text-[0.9rem] leading-[1.5] text-dim">{product.howItsUsed}</p>
              </div>
            </div>

            {/* 5 — stack. This block is the page's proof and the reason the
                Technical register was chosen (UI_DESIGN §5.2). */}
            <div className="flex min-h-0 flex-col border-b border-line xl:border-b-0 xl:border-r">
              <LabelStrip topRule={false} as="h2">Stack &amp; architecture</LabelStrip>
              <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-cell py-3.5">
                <p className="font-mono text-[0.8rem] leading-[1.55]">{product.stack.pipeline}</p>
                {product.stack.details.map((para, i) => (
                  <p key={i} className="text-[0.9rem] leading-[1.5] text-dim">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* 6 — honest limits. The framing line is bound by the honesty rule;
                see the note on `limitsFraming` in content/products.ts. */}
            <div className="flex min-h-0 flex-col">
              <LabelStrip topRule={false} as="h2">What it doesn&apos;t do yet</LabelStrip>
              <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-cell py-3.5">
                <p className="border-l-2 border-accent pl-3 text-[0.87rem] leading-[1.5]">
                  {product.limitsFraming}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {product.limits.map((limit, i) => (
                    <li key={i} className="grid grid-cols-[1.4rem_1fr] text-[0.87rem] leading-[1.5] text-dim">
                      {/* Not numbered: an unordered set, and 01/02/03 would imply
                          a severity ranking that does not exist. */}
                      <span aria-hidden className="font-mono text-[0.8rem] text-accent">
                        &mdash;
                      </span>
                      <span>{limit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 4 — screenshots. Two slots either way: a product with real captures
              fills them, one without keeps the honest empty frames. The count is
              fixed at two so the row's height is the same in both states — the
              layout must not tell you how finished a product is.

              ⚠ NO LabelStrip HERE, AND IT IS A TRADE, NOT AN OVERSIGHT — raised
              by review 2026-08-29, still Tarek's call. Every other block on this
              page opens with one, and LabelStrip's own doc argues headings are
              how a screen-reader user navigates, which applies here too. But a
              strip measures 30px, and 30px here now comes straight off the
              image. The images do carry alt text, so the block is not unlabelled
              to assistive tech — it is unlabelled in the page OUTLINE.

              THE MIXED STATE IS REAL AND INTENTIONAL: `screenshots` may hold
              exactly one, which renders one capture beside one empty frame. That
              is the honest rendering of "this product has one screenshot so far",
              and it is the state the next product hits the moment it gets its
              first capture. Do not "fix" it by hiding the empty twin — that would
              make one screenshot and two look identical. */}
          {/* HEIGHT: this block now takes ALL the space the text above does not
              (2026-08-31). It was a fixed clamp back when the grid above was
              flex-1 and swallowed the slack; the result was a 113px strip at
              1920x1080 sitting under 352px of empty white. flex-1 here inverts
              that — text takes what it needs, the evidence takes the rest.

              CAPPED at exactly the height that shows the whole 16:10 capture, so
              it stops growing once the image is fully visible rather than
              letterboxing it on very tall screens. The cap is derived, not
              guessed: the frame is min(100vw - 2*34 page padding, 1800px), the
              row subtracts 2*24 cell padding and a 24px gap, and each of the two
              boxes takes half — so box width = (vw - 68 - 48 - 24)/2 = 0.5vw - 70, and a
              16:10 box needs exactly 0.625x that:
                0.625 * (0.5vw - 70)  =  31.25vw - 43.75
              which is 540px once the frame itself caps (vw >= 1868).
              ⚠ The 48px of cell padding is NOT in this number any more — it moved
              to the wrapper above when the cap moved to this inner grid. It was
              briefly still included (588px), which made the box 48px TALLER than
              16:10 at 2560x1440, and `cover` answers a too-tall box by cropping
              the SIDES: 8% off the left and right, cutting into the masthead. A
              cap that is too generous is not a cosmetic error here.
              The 24px gap is not MASTER.md's --gap-cell; see the note on `sizes`'s
              default in frame.tsx for why. */}
          {/* The outer element absorbs the leftover height; the inner grid carries
              the cap. Once the row hits its 540px cap the slack has to go SOMEWHERE, and
              with the cap on the outer element it pooled into a dead band above
              the footer — 286px of it at 2560x1440. Centring the capped grid
              inside a flex-1 parent splits that slack above and below instead, so
              it reads as breathing room rather than a gap in the frame. */}
          <div className="flex min-h-0 flex-1 items-center border-t border-line p-cell">
            <div className="grid w-full grid-cols-1 gap-cell md:grid-cols-2 xl:h-full xl:max-h-[min(calc(31.25vw-43.75px),540px)]">
            {Array.from({ length: SCREENSHOT_SLOTS }, (_, i) => {
              const shot = product.screenshots.at(i);
              return shot ? (
                <Shot
                  key={shot.master.src}
                  asset={shot.master}
                  alt={shot.alt}
                  // Only the first: one element is the LCP, and preloading the
                  // second would buy nothing.
                  priority={i === 0}
                  className="aspect-[16/10] xl:aspect-auto"
                />
              ) : (
                <ShotFrame key={i} label={`Screenshot ${i + 1}`} className="aspect-[16/10] xl:aspect-auto" />
              );
            })}
            </div>
          </div>

          {/* 7 — origin. Rendered only when it exists; an empty block would be the
              ghost cell §5.3 forbids, and an invented one a fabrication. */}
          {product.origin && (
            <div className="shrink-0">
              {/* topRule, not a border-t on this wrapper: block 4 above draws no
                  bottom rule, so the edge has to come from somewhere — and the
                  strip owning it is the one mechanism, per LabelStrip's contract. */}
              <LabelStrip topRule as="h2">Where the idea came from</LabelStrip>
              <div className="p-cell">
                <p className="max-w-[65ch] text-[0.9rem] leading-relaxed text-dim">{product.origin}</p>
              </div>
            </div>
          )}
        </FrameBody>

        <SiteFooter />
      </Frame>
    </PageShell>
  );
}
