import type { Product } from "@/content/products";
import { CONTACT_EMAIL } from "@/components/site-chrome";
import { cn } from "@/lib/utils";

/**
 * The way into a live product, and the way to ask for access when it is gated.
 * Renders nothing for a product with no live URL, so an unreleased product gets
 * no empty row (UI_DESIGN §5.3).
 *
 * The access condition sits inside the link text rather than beside it: a
 * visitor who reads only the link still learns it is invite-only before landing
 * on a login form they cannot get past.
 */
export function ProductAccess({ product, className }: { product: Product; className?: string }) {
  if (product.liveUrl === null) return null;

  const subject = encodeURIComponent(`Invite request: ${product.name}`);

  return (
    <div className={cn("flex flex-col gap-1.5 font-mono text-xs", className)}>
      <a
        href={product.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start text-accent transition-opacity hover:opacity-80"
      >
        Open the app ↗ <span className="text-dim">(invite-only)</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      {product.inviteRequest === "email" && (
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${subject}`}
          className="self-start text-accent transition-opacity hover:opacity-80"
        >
          Request an invite →
        </a>
      )}
    </div>
  );
}
