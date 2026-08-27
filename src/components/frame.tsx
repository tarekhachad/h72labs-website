import { cn } from "@/lib/utils";

// The Frame primitives. MASTER.md §5.1: the frame is the identity.
// Rules encoded here so no page has to remember them:
//   - 1px only. The brutalism row offers 2-4px; that is the anti-design
//     register and is rejected (MASTER.md §0.4).
//   - border-radius: 0 everywhere, no exceptions.
//   - no box-shadow. Depth is not part of this direction.
//   - adjacent borders collapse with -1px offsets; a doubled 2px seam is a bug.

export function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1120px] border border-line", className)}>
      {children}
    </div>
  );
}

/** The mono label strip that names each region. MASTER.md §3.2. */
export function LabelStrip({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-line bg-surface px-cell py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
      {children}
    </div>
  );
}

/**
 * A framed section.
 *
 * `rhythm="open"` (default) uses the fluid section scale — right for the landing
 * page, which is five sections of deliberately low information volume.
 *
 * `rhythm="document"` is tighter. The detail page stacks seven blocks; at open
 * rhythm it ran past 2400px with every paragraph floating in a mostly-empty
 * cell. That is a spacing problem, not an information problem — see the §5.2
 * call recorded in the project log. Do not fix page length by deleting blocks.
 */
export function Section({
  children,
  className,
  rhythm = "open",
}: {
  children: React.ReactNode;
  className?: string;
  rhythm?: "open" | "document";
}) {
  return (
    <div
      className={cn(
        "border-b border-line px-cell",
        rhythm === "open" ? "py-section" : "py-10",
        className,
      )}
    >
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
export function ShotFrame({ label = "Screenshot" }: { label?: string }) {
  return (
    <div className="flex aspect-[16/10] items-center justify-center border border-line">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">{label}</span>
    </div>
  );
}
