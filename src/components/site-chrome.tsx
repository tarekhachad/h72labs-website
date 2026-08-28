import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

// UI_DESIGN §5.1.1: wordmark left, nav right. Two items, never more.
// The theme toggle moved here from the footer on 2026-08-27 (Tarek) so it is
// visible on load without scrolling. MASTER.md §5.5 updated to match.
export function SiteHeader() {
  return (
    <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-line px-cell py-3.5">
      <Link
        href="/"
        className="font-mono text-[13px] font-medium tracking-[0.2em] transition-colors hover:text-accent"
      >
        H72_LABS
      </Link>
      <div className="flex shrink-0 items-center gap-3.5">
        <nav className="flex font-mono text-xs">
          <Link href="/portfolio" className="border border-line px-3 py-1 transition-colors hover:text-accent">
            Portfolio
          </Link>
          <Link href="/contact" className="-ml-px border border-line px-3 py-1 transition-colors hover:text-accent">
            Contact
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

// UI_DESIGN §5.1.6: legal attribution. The toggle used to live here.
export function SiteFooter() {
  return (
    <footer className="flex shrink-0 items-center justify-between border-t border-line px-cell py-2.5 font-mono text-[11px] tracking-[0.06em] text-dim">
      <span>Hachad Solutions LLC</span>
    </footer>
  );
}

export const CONTACT_EMAIL = "contact@h72labs.com";

/** UI_DESIGN §5.4: the address as text, mono, selectable, mailto attached. No form. */
export function ContactAddress({ className }: { className?: string }) {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className={
        className ??
        "font-mono text-[clamp(1rem,2.3vw,1.5rem)] text-accent transition-opacity hover:opacity-80"
      }
    >
      {CONTACT_EMAIL}
    </a>
  );
}

/**
 * The founder portrait. Pixel art — `image-rendering: pixelated` is mandatory,
 * because without it browsers smooth-scale and the blocks turn to mush, which is
 * the whole character of the image.
 *
 * `unoptimized` is also mandatory: Next's image optimizer would resample and
 * re-encode, softening the art for exactly the same reason. The file is 11 KB
 * with a 3-colour palette, so there is nothing to gain from optimizing it.
 *
 * Overrides UI_DESIGN §5.1.4 ("No photo for v1") — Tarek's call, 2026-08-27,
 * to give the site a human element. Spec updated to match.
 */
export function Portrait({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/founder.png"
      alt="Tarek Hachad"
      width={1630}
      height={1630}
      unoptimized
      priority={priority}
      className={className}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
