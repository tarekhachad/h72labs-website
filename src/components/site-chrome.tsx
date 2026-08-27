import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

// UI_DESIGN §5.1.1: wordmark left, nav right. Two items, never more.
export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-cell py-4">
      <Link
        href="/"
        className="font-mono text-[13px] font-medium tracking-[0.2em] transition-colors hover:text-accent"
      >
        H72_LABS
      </Link>
      <nav className="flex shrink-0 font-mono text-xs">
        <Link href="/portfolio" className="border border-line px-3 py-1 transition-colors hover:text-accent">
          Portfolio
        </Link>
        <Link href="/contact" className="-ml-px border border-line px-3 py-1 transition-colors hover:text-accent">
          Contact
        </Link>
      </nav>
    </header>
  );
}

// UI_DESIGN §5.1.6: legal attribution and the theme toggle. Nothing else.
export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 px-cell py-3 font-mono text-[11px] tracking-[0.06em] text-dim">
      <span>Hachad Solutions LLC</span>
      <ThemeToggle />
    </footer>
  );
}

export const CONTACT_EMAIL = "contact@h72labs.com";

/** UI_DESIGN §5.4: the address as text, mono, selectable, mailto attached. No form. */
export function ContactAddress() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="break-all font-mono text-[clamp(1rem,2.3vw,1.5rem)] text-accent transition-opacity hover:opacity-80"
    >
      {CONTACT_EMAIL}
    </a>
  );
}
