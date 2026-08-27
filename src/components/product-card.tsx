import Link from "next/link";
import type { Product } from "@/content/products";
import { ShotFrame, StatusLine } from "@/components/frame";

// THE SITE'S MOST IMPORTANT COMPONENT — UI_DESIGN §5.5.
//
// ***NO METRIC SLOT.*** MASTER.md §5.2, non-negotiable. This component must never
// gain a stat badge, metric bracket, KPI figure, user count, "trusted by" strip,
// logo wall, testimonial, star rating, or progress bar standing in for traction.
// Walter Labs' cards earn credibility from a bracketed metric; H72 has nothing
// true for that slot and the honesty rule forbids inventing one.
//
// If this card ever looks incomplete, THE CARD IS WRONG — not the constraint.
// Credibility comes from a real screenshot, an honest status line, and the depth
// of the detail page.

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const idx = String(index + 1).padStart(2, "0");

  // MASTER.md §5.2: index column 56px, 38px under 760px.
  // min-w-0 on every grid child — without it grid children default to
  // min-width:auto, refuse to shrink below their content, and overflow the
  // frame on narrow viewports.
  return (
    <article className="grid grid-cols-[38px_minmax(0,1fr)] border-b border-line last:border-b-0 md:grid-cols-[56px_minmax(0,1fr)]">
      <div className="border-r border-line pt-cell text-center font-mono text-[13px] font-medium tabular-nums text-accent">
        {idx}
      </div>

      <div className="grid min-w-0 gap-cell p-cell md:grid-cols-2">
        <ShotFrame />

        <div className="flex min-w-0 flex-col">
          <h3 className="text-xl font-semibold tracking-[-0.01em]">
            <Link href={`/portfolio/${product.slug}`} className="transition-colors hover:text-accent">
              {product.name}
            </Link>
          </h3>
          <p className="mt-3 max-w-[65ch] leading-relaxed text-dim">{product.summary}</p>
          <div className="mt-6 md:mt-auto md:pt-6">
            <StatusLine status={product.status} />
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * UI_DESIGN §5.3 — a build constraint, not a layout preference.
 * n = 1 renders one full-width row; n >= 2 stacks more rows into the same frame.
 * Nothing is re-cut and no component is swapped.
 * NEVER render a placeholder or "coming soon" row — an empty cell is the
 * clearest possible signal that the studio has nothing yet.
 */
export function ProductList({ products }: { products: Product[] }) {
  return (
    <div>
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i} />
      ))}
    </div>
  );
}
