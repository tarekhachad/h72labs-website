import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/content/products";
import { PageShell, Frame, FrameBody, LabelStrip, ShotFrame, StatusLine } from "@/components/frame";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found — H72 Labs" };
  return { title: `${product.name} — H72 Labs`, description: product.summary };
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
            <StatusLine status={product.status} />
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-3">
            {/* 2 + 3 — what it is, how it's used.
                ONE scroll container for the whole column, not one per panel. With
                flex-1 on each panel they split height 50/50 regardless of content,
                so the longer block scrolled while the shorter one sat on unused
                space. Sharing a single pool lets them size to their actual copy. */}
            <div className="flex min-h-0 flex-col overflow-y-auto border-b border-line xl:border-b-0 xl:border-r">
              <LabelStrip>What it is</LabelStrip>
              <div className="shrink-0 px-cell py-3.5">
                <p className="text-[0.9rem] leading-[1.5] text-dim">{product.whatItIs}</p>
              </div>
              <LabelStrip>How it&apos;s used</LabelStrip>
              <div className="shrink-0 px-cell py-3.5">
                <p className="text-[0.9rem] leading-[1.5] text-dim">{product.howItsUsed}</p>
              </div>
            </div>

            {/* 5 — stack. This block is the page's proof and the reason the
                Technical register was chosen (UI_DESIGN §5.2). */}
            <div className="flex min-h-0 flex-col border-b border-line xl:border-b-0 xl:border-r">
              <LabelStrip>Stack &amp; architecture</LabelStrip>
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
              <LabelStrip>What it doesn&apos;t do yet</LabelStrip>
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

          {/* 4 — screenshots */}
          <div className="grid shrink-0 grid-cols-1 gap-cell border-t border-line p-cell md:grid-cols-2 xl:h-[clamp(72px,10vh,150px)]">
            <ShotFrame label="Screenshot 1" className="aspect-[16/10] xl:aspect-auto" />
            <ShotFrame label="Screenshot 2" className="aspect-[16/10] xl:aspect-auto" />
          </div>

          {/* 7 — origin. Rendered only when it exists; an empty block would be the
              ghost cell §5.3 forbids, and an invented one a fabrication. */}
          {product.origin && (
            <div className="shrink-0 border-t border-line">
              <LabelStrip>Where the idea came from</LabelStrip>
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
