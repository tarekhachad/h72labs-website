import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProduct } from "@/content/products";
import { Frame, LabelStrip, Section, ShotFrame, StatusLine } from "@/components/frame";
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

// UI_DESIGN §5.2 — the seven blocks, in order.
// NO repo link in v1 (PNA's README is still boilerplate; a link there undercuts
// the page). NO public roadmap in v1 (a published roadmap is a promise you own).
export default async function ProductDetailPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <main className="p-page">
      <Frame>
        <SiteHeader />

        {/* 1 — name + status */}
        <Section rhythm="document">
          <h1 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-semibold tracking-[-0.02em] text-balance">
            {product.name}
          </h1>
          <div className="mt-5">
            <StatusLine status={product.status} />
          </div>
        </Section>

        {/* 2 — what it is */}
        <LabelStrip>What it is</LabelStrip>
        <Section rhythm="document">
          <p className="max-w-[65ch] text-[1.0625rem] leading-relaxed">{product.whatItIs}</p>
        </Section>

        {/* 3 — how it's used */}
        <LabelStrip>How it&apos;s used</LabelStrip>
        <Section rhythm="document">
          <p className="max-w-[65ch] leading-relaxed text-dim">{product.howItsUsed}</p>
        </Section>

        {/* 4 — screenshots */}
        <LabelStrip>Screens</LabelStrip>
        <Section rhythm="document">
          <div className="grid gap-cell md:grid-cols-2">
            <ShotFrame label="Screenshot 1" />
            <ShotFrame label="Screenshot 2" />
          </div>
        </Section>

        {/* 5 — stack / architecture. This block is the page's proof and the
            reason the Technical register was chosen (UI_DESIGN §5.2). */}
        <LabelStrip>Stack &amp; architecture</LabelStrip>
        <Section rhythm="document">
          <div className="max-w-[65ch] space-y-4">
            <p className="font-mono text-sm leading-relaxed">{product.stack.pipeline}</p>
            {product.stack.details.map((para, i) => (
              <p key={i} className="leading-relaxed text-dim">
                {para}
              </p>
            ))}
          </div>
        </Section>

        {/* 6 — honest limits, stated flatly. No softening, no "coming soon". */}
        <LabelStrip>What it doesn&apos;t do yet</LabelStrip>
        <Section rhythm="document">
          <ul className="max-w-[65ch] space-y-3">
            {product.limits.map((limit, i) => (
              <li key={i} className="grid grid-cols-[2rem_1fr] leading-relaxed text-dim">
                {/* Not numbered: these are an unordered set, and 01/02/03 would
                    imply a severity ranking that does not exist. */}
                <span aria-hidden className="font-mono text-xs text-accent">
                  &mdash;
                </span>
                <span>{limit}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 7 — origin. Rendered only when it exists; an empty block would be the
            ghost cell §5.3 forbids, and an invented one a fabrication. */}
        {product.origin && (
          <>
            <LabelStrip>Where the idea came from</LabelStrip>
            <Section rhythm="document">
              <p className="max-w-[65ch] leading-relaxed text-dim">{product.origin}</p>
            </Section>
          </>
        )}

        <Section rhythm="document">
          <Link href="/portfolio" className="font-mono text-xs text-accent transition-opacity hover:opacity-80">
            ← Portfolio
          </Link>
        </Section>

        <SiteFooter />
      </Frame>
    </main>
  );
}
