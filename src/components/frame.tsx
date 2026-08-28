import { cn } from "@/lib/utils";

// The Frame primitives. MASTER.md §5.1: the frame is the identity.
// Rules encoded here so no page has to remember them:
//   - 1px only. The brutalism row offers 2-4px; that is the anti-design
//     register and is rejected (MASTER.md §0.4).
//   - border-radius: 0 everywhere, no exceptions.
//   - no box-shadow. Depth is not part of this direction.
//   - adjacent borders collapse with -1px offsets; a doubled 2px seam is a bug.
//
// SHELL BEHAVIOUR (2026-08-27): the frame fills the padded area and is exactly
// one viewport tall at >= 1280px, so no page scrolls on desktop. Below 1280px it
// reverts to natural document height and the page scrolls normally. 1024-1279
// (tablets, small windows) is included in that: forcing one screen there gave
// narrow columns with internally-scrolling panels, which reads worse than a
// page that simply scrolls.

/** The page shell. Owns the viewport height and the gutter. */
export function PageShell({ children }: { children: React.ReactNode }) {
  // h-dvh, not h-screen: dvh accounts for mobile browser chrome, where vh
  // overshoots by exactly the toolbar height and produces a page that scrolls.
  return <main className="p-page xl:h-dvh">{children}</main>;
}

export function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-frame flex-col border border-line",
        "xl:h-full xl:overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** The region between header and footer. Absorbs the remaining height. */
export function FrameBody({ children, className }: { children: React.ReactNode; className?: string }) {
  // min-h-0 is load-bearing: flex children default to min-height:auto and refuse
  // to shrink below their content, which breaks the fixed-height shell.
  return <div className={cn("flex min-h-0 flex-1 flex-col", className)}>{children}</div>;
}

/** The mono label strip that names each region. MASTER.md §3.2. */
export function LabelStrip({ children }: { children: React.ReactNode }) {
  return (
    <div className="shrink-0 border-b border-line bg-surface px-cell py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
      {children}
    </div>
  );
}

/** The flat status line. Never a badge, never a pill with a dot. MASTER.md §5.2. */
export function StatusLine({ status }: { status: string }) {
  return (
    <span className="inline-block border border-line px-2 py-1 font-mono text-xs">
      Status: {status}
    </span>
  );
}

/**
 * The screenshot slot. Real captures land in Phase 3; until then this renders an
 * honest empty frame rather than a stock image or a fake product shot.
 * MASTER.md §5.5: the frame treatment is decided BEFORE capture, so a screenshot
 * has a defined edge on either ground.
 */
export function ShotFrame({ label = "Screenshot", className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex min-h-0 items-center justify-center border border-line", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">{label}</span>
    </div>
  );
}
