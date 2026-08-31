import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ScreenshotAsset } from "@/content/products";

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

/**
 * The mono label strip that names each region. MASTER.md §3.2.
 *
 * Draws its own BOTTOM rule only. The top edge normally belongs to whatever sits
 * above: a strip that opens a column inherits the rule from the row above it, and
 * drawing a second one there is the doubled 2px seam this file calls a bug.
 *
 * A strip that follows a CONTENT block has no rule above it and must ask for one
 * with `topRule`. The condition is a fact about the sibling above, so it cannot be
 * decided inside this component — but it is named here rather than left to a bare
 * className at the render site, so the frame's rules stay in the frame.
 *
 * `topRule` is REQUIRED, deliberately. It has no default because both defaults are
 * wrong: defaulting false lets a new strip silently ship with no rule (the original
 * bug), and defaulting true ships a doubled 2px seam. CSS cannot derive it either —
 * `:not(:first-child)` gets the nine in-column strips right and block 7 of the
 * product detail page wrong, since that one is the first child of its own wrapper.
 * So the author must look at what sits above and say which it is, and `tsc` makes
 * them. A type, not a comment.
 */
export function LabelStrip({
  children,
  topRule,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** True when the element above draws no bottom rule. See the note above. */
  topRule: boolean;
  /**
   * The element to render. Defaults to `div` — a strip is only a heading when it
   * actually names a section of the document, and saying so falsely is worse than
   * staying silent.
   *
   * Why this exists: a screen-reader user navigates by jumping between headings,
   * the way a sighted reader skims by scanning them. Every strip rendered as a
   * `div` is invisible to that, so the page reads as one undifferentiated block.
   * Pass the level that is true for the page — never one that merely looks right,
   * and never skip a level, because the outline is the navigation.
   */
  as?: "div" | "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "shrink-0 border-b border-line bg-surface px-cell py-1.5 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-dim",
        topRule && "border-t",
      )}
    >
      {children}
    </Tag>
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
 * MASTER.md §5.5: every screenshot sits inside a 1px `--line` box, so it has a
 * defined edge on either ground. The filled and empty states MUST NOT differ in
 * anything but their contents, so the treatment is written once here and shared —
 * §1.3's rule about a value living in one place, applied to a class string.
 */
const SHOT_BOX = "min-h-0 border border-line";

/**
 * The EMPTY screenshot slot — a product with no captures yet. Renders an honest
 * empty frame rather than a stock image or a fake product shot. See `Shot` below
 * for the filled state.
 *
 * Still reachable, and must stay so: the PNA captures landed 2026-08-29, but
 * `screenshots` is a per-product list and the next product will start empty.
 */
export function ShotFrame({
  label = "Screenshot",
  className,
  ratio,
}: {
  label?: string;
  className?: string;
  /**
   * `[w, h]` of the shape this slot's capture will have. Pass it in the slots
   * that use `Shot`'s `hug` mode; omit it where the box is sized by its cell.
   *
   * WHY THIS IS NOT JUST AN `aspect-*` CLASS. §5.5 requires the filled and empty
   * states to draw the SAME rectangle, and the filled one is an <img> — a
   * REPLACED element, which fits itself inside the cell on BOTH axes at once.
   * CSS cannot reproduce that on a plain <div>: `w-full` + aspect-ratio matches
   * only while the cell's WIDTH is the binding constraint, `h-full` + aspect only
   * while its HEIGHT is, and a cell that stretches with the viewport switches
   * between the two. Measured: `w-full` gave a 351x351 empty box against a
   * 337x337 image at 1280x800, and `h-full` gave 557x939 against 557x557 at
   * 2560x1440.
   *
   * So the empty state uses a replaced element too — a transparent SVG carrying
   * the intrinsic dimensions — and inherits the identical sizing algorithm rather
   * than approximating it.
   *
   * MEASURED RESULT, stated carefully because the obvious phrasing overclaims.
   * At >= 1280px every cell has a definite height (the frame is one viewport
   * tall), and there the empty box matches the filled one to the pixel at every
   * width and DPR checked.
   *
   * BELOW 1280px the comparison is not well posed. The page is auto-height there,
   * so the cell's height is driven by its own contents — remove the image and the
   * cell itself changes size, which means "the empty box" and "the filled box"
   * are not being measured in the same layout. Rendering the real empty state at
   * 1279x900 gives 1161x1010 against the filled 1001x871; injecting the empty
   * markup ALONGSIDE the real image, so both share one layout, gives sub-pixel
   * parity. Both numbers are right, and they answer different questions. The
   * SHAPE is identical either way, which is what §5.5 is protecting, and no
   * shipped product reaches the empty state today.
   */
  ratio?: readonly [number, number];
}) {
  if (ratio) {
    // Scaled up to a real capture's order of magnitude before being emitted.
    // `max-h-full`/`max-w-full` only ever scale an image DOWN, so a spacer with a
    // literal 23x20 intrinsic size just renders 23x20 — it has to be bigger than
    // any slot it will sit in for the caps to bind and the fit to happen.
    const k = 3000 / Math.max(ratio[0], ratio[1]);
    const [w, h] = [Math.round(ratio[0] * k), Math.round(ratio[1] * k)];
    const spacer = `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"/>`,
    )}`;
    return (
      <div className={cn("relative flex h-full w-full items-center justify-center", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- a data-URI spacer
            with no pixels to optimise; next/image would add a request and a
            wrapper without changing what is drawn. */}
        <img src={spacer} alt="" aria-hidden className={cn(SHOT_BOX, "h-auto w-auto max-h-full max-w-full")} />
        <span className="pointer-events-none absolute font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
          {label}
        </span>
      </div>
    );
  }
  return (
    <div className={cn(SHOT_BOX, "flex items-center justify-center", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">{label}</span>
    </div>
  );
}

/**
 * A real capture, in the shared SHOT_BOX above.
 *
 * Wrapped in a link to the full-size file on purpose. The frame is exactly one
 * viewport tall at >= 1280px (§5.1), so however the space is divided there is a
 * ceiling on how big a capture can be — and on a short screen that ceiling still
 * bites. Opening the raw file is the escape hatch, and it costs nothing on the
 * screens where the inline image is already legible. (Format is deliberately not
 * named here — this component links whatever `src` it is given, and the assets
 * have already changed format once.)
 *
 * `object-top` under `cover`, not `object-center`: when the box is shorter than
 * 16:10 the bottom is what gets cut, and the top band is the right thing to keep
 * in both captures — the feed shot opens on the masthead and its first story
 * card, the report shot on the headline and the start of its summary. Neither
 * leads with anything that reads as chrome.
 *
 * Hover is a BORDER-COLOUR change, not opacity: §5.4 scopes hover/focus to
 * "120ms linear on colour only". Dimming the image would also be the wrong
 * signal — it makes the evidence harder to see at the moment you reach for it.
 */
export function Shot({
  asset,
  alt,
  className,
  fit = "cover",
  // Default is the DETAIL PAGE's two-up row: the frame caps at --frame-max
  // (1800px) once the viewport reaches 1800 + 2*34 page padding = 1868px, and
  // each of the two boxes is then (1800 - 48 cell padding - 24 gap) / 2 = 864px.
  //
  // ⚠ THE GAP IS 24px, NOT MASTER.md's --gap-cell (clamp(32px,3.4vw,40px)).
  // That variable is declared at :root in globals.css but never registered in
  // its `@theme inline` block, so the `gap-cell` utility resolves through
  // --spacing-cell (= --pad-cell = 24px) instead. Measured, not assumed:
  // computed columnGap on that row is 24px. Do not "correct" this arithmetic
  // back to 40px without checking a computed value first.
  sizes = "(min-width: 1868px) 864px, (min-width: 768px) 50vw, 100vw",
  priority = false,
}: {
  /**
   * The capture AND its real pixel dimensions, passed together on purpose: they
   * were briefly separate and the dimensions were hardcoded to the 16:10 master,
   * so the square and 23:20 variants reserved the wrong aspect and shifted on
   * load. One object means they cannot drift.
   */
  asset: ScreenshotAsset;
  alt: string;
  className?: string;
  /**
   * How the capture sits in its box, and the two callers want opposite things.
   *
   * `cover` (default) — the detail page's block 4, which is a WIDE, SHORT strip.
   * Cropping the bottom off is the intent there: the top band still reads, and
   * the full image is one click away.
   *
   * `contain` — fits the whole capture inside a fixed box, accepting a band of
   * empty space on the axis that does not match. Kept as the honest fallback for
   * a product that has no aspect-matched variant.
   *
   * `hug` — THE BORDER SHRINK-WRAPS THE IMAGE. The card slots use this, and the
   * reason is that their boxes are not a fixed shape: the landing slot measures
   * 555x592 at 1920 but 555x937 at 2560, and the carousel 948x823 at 1920 but
   * 948x1183 at 2560, because both stretch with the frame's height. Against a
   * moving target, `cover` crops the sides off (the carousel sliced a headline
   * mid-word: "...ood Death Toll Nears 3,000 Missing") and `contain` leaves a
   * white band inside the rule. `hug` sidesteps the choice — the image is drawn
   * at its natural aspect, scaled to fit, and the 1px rule is placed around
   * whatever that turns out to be. Any leftover space ends up OUTSIDE the border,
   * where it reads as layout rather than as a gap in the frame.
   */
  fit?: "cover" | "contain" | "hug";
  /**
   * REQUIRED FROM THE CALL SITE, because `sizes` describes the LAYOUT, not the
   * image, and the three call sites have three different layouts. The default
   * below is the detail page's two-column row; it was briefly shared with the
   * portfolio carousel, which is a SINGLE column until 1280px — so at 768px wide
   * the browser was told 50vw (384px) for a box that is really 670px and fetched
   * an 828px file for a 1340px job. Visibly soft at 2x.
   *
   * Rule when writing one: overestimating costs one size bucket, underestimating
   * costs sharpness. Round up.
   */
  sizes?: string;
  /**
   * Set on the first capture of each page, and the honest version of why is that
   * `priority` cannot express what we actually mean.
   *
   * It began false everywhere, on the reasoning that the h1 and body copy paint
   * first and are larger. Next's LCP detector disagreed — it named these images as
   * the LCP element on all three pages at 1440x900. The reasoning had compared
   * against the TEXT, and a 555px-square screenshot is a far bigger paint area
   * than a three-line heading. Measured beat reasoned.
   *
   * BUT IT IS ONLY THE LCP ON DESKTOP. Measured below 1280px, the LCP is the
   * "What it is" paragraph on the detail page and, at 768x1024 specifically, the
   * founder portrait on the landing page — the captures sit hundreds of pixels
   * down a scrolling document there and are not needed until well after first
   * paint. `priority` is a static boolean with no responsive form, so it cannot
   * be true at >= 1280px and false below it.
   *
   * The trade taken: TRUE, optimising for >= 1280px, where the frame is exactly
   * one viewport tall (§5.1), nothing is below the fold, the image really is the
   * LCP, and the priority reader — a recruiter on a laptop — actually is. The cost
   * is one eager fetch on mobile for an image that is below the fold. Stated
   * rather than hidden, because the next person to measure this at 390px will
   * find it and should know it was a choice.
   *
   * Only the FIRST capture on each page: one element is the LCP, and preloading
   * the detail page's second shot would cost a request to win nothing.
   */
  priority?: boolean;
}) {
  return (
    <a
      href={asset.src}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        // In `hug` the RULE IS ON THE IMAGE, not here, so this element is only a
        // full-size centring box — see the note on `fit`. Everywhere else the
        // rule is on this box and the image fills it.
        fit === "hug"
          // outline-none here is NOT dropping the focus ring — it moves it. The
          // <a> has to stay h-full/w-full so the image's percentage maxes resolve,
          // but that box is the whole cell: at 2560px the landing cell is 555x937
          // around a 555x555 image, so the default ring drew around ~382px of
          // empty space below the picture. The ring is re-drawn on the image via
          // group-focus-visible just below, so it hugs exactly like the border.
          ? "group flex h-full w-full items-center justify-center focus-visible:outline-none"
          : cn(SHOT_BOX, "block overflow-hidden transition-colors hover:border-accent"),
        className,
      )}
    >
      <Image
        src={asset.src}
        alt={alt}
        width={asset.width}
        height={asset.height}
        priority={priority}
        sizes={sizes}
        className={cn(
          fit === "hug"
            // An <img> is a REPLACED element: with both dimensions auto and both
            // maxes set, it scales down preserving its own aspect, and its border
            // box is exactly the painted image. So the rule hugs by construction —
            // no arithmetic, no aspect class to keep in sync.
            //
            // The maxes are percentages, which only resolve against a DEFINITE
            // parent height. That is why the wrapper above is `h-full` rather than
            // shrink-wrapped: when it shrink-wrapped, `max-h-full` silently did not
            // bind, the image overflowed its box (351px tall inside 339px at
            // 1280x800) and `object-contain` split the overflow evenly — which
            // cropped the TOP. The masthead is the one thing that must never be cut.
            ? cn(
                SHOT_BOX,
                "h-auto w-auto max-h-full max-w-full transition-colors group-hover:border-accent",
                // matches globals.css's :focus-visible exactly — 2px solid accent,
                // 2px offset — just anchored to the image instead of the cell.
                "group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent",
              )
            : fit === "contain"
              ? "h-full w-full object-contain object-top"
              // object-top, never object-center: when the box is shorter than the
              // capture, the BOTTOM is what may be lost. The top of every feed
              // capture carries the masthead and the topic nav, and a screenshot
              // that opens mid-article reads as broken.
              : "h-full w-full object-cover object-top",
        )}
      />
      {/* The alt text says what is PICTURED; a screen-reader user still needs to
          know the link's behaviour, which no part of the image conveys. Leading
          space and no dash: `alt` ends in a full stop, so the joined accessible
          name reads as two sentences rather than "...source count. — open...". */}
      <span className="sr-only"> Opens full size in a new tab.</span>
    </a>
  );
}
