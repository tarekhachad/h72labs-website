---
type: Doc
status: Open
created: 2026-08-27
summary: "The token spec for h72labs-website. Output of sitting 2 of the design phase. Hand-written, every value traced. This file is the source of truth; globals.css is its implementation."
---

# MASTER — h72labs-website token spec

**Direction: Frame.** Chosen 2026-08-27 by Tarek from three rendered candidates (Grid / Scale /
Frame) behind the `prototype` picker: <https://claude.ai/code/artifact/7fa6acb6-aed5-4f98-a679-cd82d982a0b4>

> **The frame is the identity.** Every region of the page is boxed by a 1px rule. Products are
> indexed rows, not decorated cards. Labels are mono strips on a tinted surface. The page reads as a
> spec sheet, which is the `(C) UI_DESIGN.md` §2 register — *the register of a build log* — taken
> literally rather than suggested.

**This file is the spec. `globals.css` is its implementation. When they disagree, this file is
correct and the CSS is the bug.** Tokens land in a Tailwind 4 `@theme` block (CSS-first — there is
no `tailwind.config.js`; see `(C) TECH_STACK.md`).

---

## 0. Provenance — read this before trusting any value

### 0.1 The provenance requirement could not be met as specified

`(C) IMPLEMENTATION_PLAN_sitting-2.md` step 3 requires, per value, "the named `uipro` row, its
`verifiedAt` date and confidence from `data-provenance.json`." **That data does not exist for the
rows this spec draws on.** Verified 2026-08-27:

- `data-provenance.json` holds **51 records**. Per-row `style` records exist for exactly **six**
  styles — `liquid-glass`, `material-you-md3-mobile`, `fluent-2`, `shopify-polaris`,
  `spectrum-design-system`, `spectrum-2` — all vendor design systems, and **all six were rejected**
  during the sitting-2 search pass.
- `colors.csv`, `typography.csv` and `landing.csv` have **no per-row provenance records at all** —
  only dataset-level contracts (`core-colors-accessibility`, `core-typography-imports`,
  `core-landing-accessibility`), each `verifiedAt: 2026-08-13`, `sla: manual-verified`, no
  confidence score.

**So provenance below is stated at dataset level**, against the catalog snapshot
(`catalog-summary.json`, `verifiedAt: 2026-08-13`, `uipro` 2.15.0), plus an explicit
**Authored / Brief / Row** tag per value. This is a deviation from the runbook, recorded rather than
hidden. It does not weaken the positive test — every value below still traces to a *named row* or a
*named line of the brief*, or is marked **Authored** and defended.

### 0.2 The `colors.csv` schema does not map onto this project's semantic roles

`colors.csv` is keyed by **Product Type** and returns a five-slot product palette — Primary /
On Primary / Accent / On Accent / Background. `(C) UI_DESIGN.md` §7 requires semantic roles —
`--ground`, `--ink`, `--dim`, `--line`, `--accent`. **Only `Accent` and `Background` transfer.**
There is no row anywhere in the dataset that supplies a text ramp. The ink/dim/line ramp below is
therefore **authored**, and is labelled as such value by value. Anyone reading this file later
should not mistake it for tool output.

### 0.3 Rows this spec draws on

| Row | Dataset | Snapshot | What was taken |
|---|---|---|---|
| `brutalism` | `styles.csv` (active) | 2026-08-13 | Three Design System Variables only — see §0.4 |
| `Dashboard Data` | `typography.csv` | 2026-08-13 | The Fira Code + Fira Sans pairing |
| `Knowledge Base/Documentation` | `colors.csv` | 2026-08-13 | `Accent #2563EB` |
| `Portfolio/Personal` | `colors.csv` | 2026-08-13 | `Accent #2563EB` (independent second occurrence) |
| `portfolio-grid` | `landing.csv` | 2026-08-13 | Section-order confirmation only; anatomy was already closed |

### 0.4 The `brutalism` row carries a warning against this exact use — and it is overridden deliberately

Quoted verbatim from the row:

> **Do Not Use For:** Corporate environments, conservative industries, **critical accessibility,
> customer-facing professional**

This site is customer-facing and professional, and its priority reader is a recruiter. **The warning
is acknowledged and overridden, on a stated ground:** what Frame adopts from `brutalism` is three
structural variables and nothing else —

```
--border-radius: 0px        --border-style: visible        --grid-visible: true
```

**Explicitly rejected from the same row:** its palette (`#FF0000 / #0000FF / #FFFF00`), its
`font-weight: 700-900`, its `border: visible 2-4px`, its `transition: none or 0s`, and every
keyword in its *anti-design* register — *raw, unpolished, asymmetric, default fonts, counter-culture*.

The row's warning attaches to that register. Frame does not adopt it. What Frame keeps is a squared,
visibly-ruled grid, executed with typographic discipline and a measured palette. The row's own
Accessibility field requires `contrast-text-4.5, keyboard, visible-focus, reduced-motion` — **all
four are satisfied and specified below**, §2 and §5.4.

**If the built site starts reading as raw or unpolished rather than as instrumentation, this
override is what failed** — revisit here first.

---

## 1. Palette

Semantic roles from `(C) UI_DESIGN.md` §7. Both themes are complete and independent; no token is
defined as a literal that works in only one mode.

### 1.1 Light

| Role | Variable | Hex | Source |
|---|---|---|---|
| Ground | `--ground` | `#FFFFFF` | **Authored.** The row's `#F8FAFC` was rejected: a tinted ground reduces ground-to-line separation, and in Frame the line carries the identity. |
| Surface | `--surface` | `#F7F7F8` | **Authored.** Label strips only. Sixth token, beyond the brief's named five — see §1.3. |
| Ink | `--ink` | `#111827` | **Authored.** Statement type, headings, status text. |
| Dim | `--dim` | `#666B75` | **Authored.** Body copy and label text. Cool-biased, not neutral grey. |
| Line | `--line` | `#111827` | **Authored**, = `--ink` by intent: in Frame the rule is as load-bearing as the text. |
| Accent | `--accent` | `#2563EB` | **Row.** `colors.csv` → `Knowledge Base/Documentation` **and** `Portfolio/Personal`, independently. |

### 1.2 Dark

| Role | Variable | Hex | Source |
|---|---|---|---|
| Ground | `--ground` | `#0A0A0A` | **Authored.** |
| Surface | `--surface` | `#141414` | **Authored.** |
| Ink | `--ink` | `#EDEDED` | **Authored.** Not `#FFFFFF` — full white on near-black glares at statement size. |
| Dim | `--dim` | `#9CA3AF` | **Authored.** |
| Line | `--line` | `#666B75` | **Authored.** Raised from a first pass of `#4A4A4A`, which **failed** 1.4.11 at 2.23:1. See §2.2. |
| Accent | `--accent` | `#6699FF` | **Authored**, derived by lightening the row's `#2563EB` for the dark ground. The *hue* traces to the row; this value does not. |

> `--dim` (light) and `--line` (dark) are both `#666B75`. Coincidence of two ramps meeting at the
> same luminance, not a shared token. Keep them separate — they move independently.

### 1.3 On the sixth token

`(C) UI_DESIGN.md` §7 names five roles. This spec adds **`--surface`**, because Frame's label strips
need a fill distinct from the ground, and the prototype expressed that as an inline
`color-mix(in srgb, var(--ink) 4%, var(--ground))`. A computed value inside a component is exactly
the drift this file exists to prevent, so it is promoted to a named token. **Deviation from the
brief, deliberate, recorded.**

### 1.4 The accent, stated plainly

`#2563EB` is the default link-blue of most of the web, and the dataset leans on it heavily: it is
the `Accent` value in **17 of 192** rows in `colors.csv` (checked 2026-08-27), and it appeared in
**three of the six** rows the sitting-2 colour search surfaced. It was flagged as a generic-output
risk *before* the picker was built, and **it was rendered in Frame and chosen with that flag
standing**. It is kept on that basis, not defaulted into.

For the record, it is not the dataset's most-repeated accent — `#059669` and `#16A34A` appear 24
times each, `#EA580C` 22. The point is not that blue is uniquely overused; it is that no accent
returned by a product-type lookup carries any signal about *this* studio, so the choice had to be
made by looking at it. It was.

It is also the value most open to a later deliberate swap. Per `CLAUDE.md`, reopening it after
sitting 2 takes a stated decision, not drift.

---

## 2. Accessibility — measured, not asserted

Computed 2026-08-27 with the WCAG 2.1 relative-luminance formula against the final token set.
**16 of 16 pairs pass. Zero failures.**

### 2.1 Measured ratios

| Pair | Light | Dark | Min | Used for |
|---|---|---|---|---|
| `--ink` on `--ground` | **17.74:1** | **16.91:1** | 4.5 | Statement type, headings |
| `--dim` on `--ground` | **5.35:1** | **7.80:1** | 4.5 | Product description — this is body copy |
| `--accent` on `--ground` | **5.17:1** | **7.13:1** | 4.5 | Index numerals (13px), email link |
| `--line` on `--ground` | **17.74:1** | **3.70:1** | 3.0 | Frame rules — non-text, WCAG 1.4.11 |
| `--dim` on `--surface` | **5.00:1** | **7.26:1** | 4.5 | Label-strip text |
| `--line` on `--surface` | **16.57:1** | **3.44:1** | 3.0 | Strip dividers |
| `--ink` on `--surface` | **16.57:1** | **15.74:1** | 4.5 | Status pill text |
| `--accent` on `--surface` | **4.83:1** | **6.64:1** | 4.5 | Reserved; no current usage |

### 2.2 The one failure found and fixed

The prototype's dark `--line` was `#4A4A4A`, measuring **2.23:1** on `--ground` and **2.08:1** on
`--surface` — below the 3.0 that WCAG 1.4.11 requires. In Frame the rule is not decoration; it
delineates every region and carries the identity, so it is treated as a meaningful non-text element
and held to 1.4.11 rather than exempted as ornament. Raised to `#666B75` (**3.70 / 3.44**).

The brief's rule — *if a call is ambiguous, make it more conservative* (§3.2, applied here by
analogy) — is why this was not waived as decorative.

### 2.3 Scope limits per token

- **`--dim` is cleared for body text in both themes** (5.35 / 7.80). It is the product description's
  colour, so this is load-bearing, not a caption allowance.
- **`--accent` is cleared for small text** (5.17 / 7.13) — index numerals run at 13px. It is *not*
  cleared for use as a large filled ground behind `--ground`-coloured text; no such pairing is
  specified, and none may be added without re-measuring.
- **`--line` is cleared for rules and borders only.** It is **never** a text colour in either theme —
  dark `--line` at 3.70:1 would fail body text.
- **`--surface` is a fill only**, never a text colour.

### 2.4 Non-colour requirements

Carried from the `brutalism` row's own Accessibility field, all mandatory:

- **Visible focus.** 2px `--accent` outline, 2px offset, on every interactive element. Never
  `outline: none`.
- **Keyboard.** Nav, email link, and the theme toggle are all reachable and operable by keyboard.
- **Reduced motion.** `prefers-reduced-motion` handled from the first animated element, per
  `(C) UI_DESIGN.md` §8 — not retrofitted.
- **Theme toggle** persists its preference and has a sensible default (§5.5).

---

## 3. Typography

**Pairing: Fira Sans + Fira Code** — `typography.csv` → **`Dashboard Data`** (Mono + Sans;
keywords *dashboard, data, analytics, code, technical, precise*; note: *"Fira family cohesion"*).

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Fira+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

Weights trimmed from the row's offer (`Fira Code 400;500;600;700`, `Fira Sans 300;400;500;600;700`)
to the five actually used. Every face declares a real fallback stack.

```css
--font-sans: 'Fira Sans', system-ui, -apple-system, sans-serif;
--font-mono: 'Fira Code', ui-monospace, 'SF Mono', Menlo, monospace;
```

### 3.1 Deviation from the row's usage note

The row's note reads *"Code for data, Sans for labels."* **This spec assigns them the other way
round**, because `(C) UI_DESIGN.md` §2 is explicit: *mono for labels, metadata, status and indices;
sans for statement type.* The brief governs the roles; the row supplies only the pairing.

### 3.2 Role assignment — this table is the register

| Role | Face | Size | Weight | Tracking | Notes |
|---|---|---|---|---|---|
| Statement (thesis) | **Sans** | `clamp(1.7rem, 3.9vw, 2.75rem)` | 500 | `-0.02em` | `max-width: 19ch`, `line-height: 1.22`. Brief §5.1.2. |
| Product name | **Sans** | `1.25rem` | 600 | `-0.01em` | |
| Body copy | **Sans** | `1rem` | 400 | `0` | `line-height: 1.6`, max ~65ch. Raised from the prototype's `0.96rem`. |
| Founder note | **Sans** | `1.0625rem` | 400 | `0` | The one human voice on the site — brief §5.1.4. |
| Section label | **Mono** | `0.6875rem` (11px) | 400 | `+0.14em` | Uppercase. Strip text. |
| Status line | **Mono** | `0.75rem` (12px) | 400 | `0` | Flat. Never a badge — §5.2. |
| Index numeral | **Mono** | `0.8125rem` (13px) | 500 | `0` | `--accent`. `tabular-nums`. |
| Wordmark | **Mono** | `0.8125rem` (13px) | 500 | `+0.2em` | `H72_LABS`. §5.1. |
| Nav | **Mono** | `0.75rem` (12px) | 400 | `0` | Boxed cells, `margin-left: -1px`. |
| Email | **Mono** | `clamp(1rem, 2.3vw, 1.5rem)` | 400 | `0` | `--accent`, `mailto:`, selectable. |
| Footer / legal | **Mono** | `0.6875rem` (11px) | 400 | `+0.06em` | |

Sizes are **Authored** — no dataset supplies a type scale. `tabular-nums` on every index numeral so
`01 / 02 / 03` stay in column as the portfolio grows.

---

## 4. Spacing

4px base. **Authored** — no dataset supplies a spacing scale.

| Token | Value | Used for |
|---|---|---|
| `--s-1` | `4px` | Border offsets, focus offset |
| `--s-2` | `8px` | Status-pill padding (vertical) |
| `--s-3` | `12px` | Nav cell padding, inline gaps |
| `--s-4` | `16px` | Header padding (vertical) |
| `--s-6` | `24px` | **The cell unit** — standard padding inside every framed region |
| `--s-8` | `32px` | Gap between cell columns (min) |
| `--s-12` | `48px` | Section padding (min) |
| `--s-16` | `64px` | Founder/contact block padding |
| `--s-24` | `96px` | Thesis cell padding (max) |

Fluid spans used at section level:

```css
--pad-cell:    24px;                        /* fixed — the frame's rhythm must not drift */
--pad-section: clamp(48px, 7vw, 96px);      /* thesis, founder, contact */
--gap-cell:    clamp(32px, 3.4vw, 40px);    /* screenshot ↔ text inside a product row */
--pad-page:    clamp(16px, 3vw, 34px);      /* outside the outer frame */
```

**`--pad-cell` is deliberately not fluid.** Every framed cell shares one padding value at every
viewport; that constancy is what makes the structure read as a grid rather than a stack of boxes.

---

## 5. Component rules

### 5.1 The frame

- Outer wrapper: `1px solid var(--line)`. **The frame fills the padded area** — gutter is
  `--pad-page` (`clamp(16px, 3vw, 34px)`), capped at `--frame-max: 1800px` for ultra-wide displays.
  At 1512px that is a 1444px frame with 34px margins. *(Changed 2026-08-27 from a fixed
  `max-width: 1120px`, which left 189px of empty gutter each side — 26% of the screen.)*
- **The frame is exactly one viewport tall at ≥1280px**, so no page scrolls on desktop. Below
  1280px it reverts to natural document height and the page scrolls normally. Use `dvh`, never
  `vh` — `vh` overshoots on mobile Safari by the toolbar height and produces a page that scrolls
  by exactly that much.

> **Why 1280 and not 1024** (changed 2026-08-27 after measurement): at 1024–1279 the one-screen
> layout produced three narrow columns whose panels scrolled internally. Content was reachable but
> the experience was worse than a page that simply scrolls, so tablets and small windows now behave
> like mobile. **Measured boundary: the detail page fits completely at ≥1280×800.** On a 720px-tall
> desktop viewport one panel scrolls ~25px with a visible scrollbar — content reachable, nothing
> lost. That is the documented edge, not a defect to discover later.

> **Verification note, learned the hard way.** "No page scroll" and "no content hidden" are
> different claims and this project proved it three times: `getBoundingClientRect` reports layout
> boxes for content already clipped; `scrollHeight <= clientHeight` passes *because*
> `overflow:hidden` discards content; and a measurement against a dead server reports zero of
> everything. **Any height check must (a) assert the page actually loaded, (b) await
> `document.fonts.ready` — web-font swap changes text height — and (c) test panels, not just the
> document.**
- Every region separated by `1px solid var(--line)`. **`border-radius: 0` everywhere, no exceptions**
  (`brutalism` → `--border-radius: 0px`). *Implemented as `--radius: 0rem` in `globals.css` — the
  shadcn/Tailwind convention name, numerically identical. The whole `--radius-*` scale derives from
  it, so there is one value to change. Named here as the row names it; named there as the framework
  expects it.*
- **1px only.** The row offers `2-4px`; that is the anti-design register and is rejected (§0.4).
- Adjacent boxed elements collapse borders with `margin-left: -1px` / `margin-top: -1px`. No
  doubled 2px seams — a doubled seam is a bug, not a style.
- No `box-shadow` anywhere. Depth is not part of this direction.

> **The collapse idiom above is NOT universal — `LabelStrip` is the documented exception**
> (2026-08-28). A label strip draws its own bottom rule only; its top edge normally belongs to
> whatever sits above it. Two strips shipped in Phase 2 with **no** top rule because they followed
> a content block rather than opening a column, which draws nothing above them.
>
> The obvious fix — always draw `border-t` and collapse it with `-mt-px` — was **rejected, and not
> on taste.** The detail page's `What it is` strip is the literal first child of an
> `overflow-y-auto` column, so a negative top margin pulls it above that container's scroll origin:
> a 1px clip inside a scroller, which is exactly the "content present but not visible" class this
> section's verification note was already burned by three times. It is also only safe while every
> future top-neighbour carries a `--line` edge — an invariant that breaks silently.
>
> CSS cannot derive the condition either: `:not(:first-child)` is right for the nine in-column
> strips and **wrong for block 7** of the product detail page, which is the first child of its own
> wrapper and still needs a rule.
>
> So `LabelStrip` takes a **required** `topRule` boolean — required, because defaulting false
> reships the original bug silently and defaulting true ships a doubled seam. `tsc` rejects a call
> site that omits it (verified: `TS2741`). The reasoning lives in `src/components/frame.tsx`'s
> header comment; this pointer exists so a reader who consults only `MASTER.md` doesn't
> reintroduce the `-mt-px` approach.

### 5.2 The product card — **NO METRIC SLOT**

**Non-negotiable, from `(C) UI_DESIGN.md` §3.1 and `CLAUDE.md`.** Walter Labs' cards earn
credibility from a bracketed metric. H72 has nothing true to put there and the honesty rule forbids
inventing one. **The slot does not exist.**

A generated or refactored component may **never** introduce: a stat badge, a metric bracket, a KPI
figure, a user count, a "trusted by" strip, a logo wall, a testimonial, a star rating, or a progress
indicator standing in for traction. **If a component looks incomplete without one, the component is
wrong — not the constraint.**

Anatomy, in order (brief §5.5):

1. **Index numeral** — mono, `--accent`, own bordered column, `56px` wide (`38px` under 760px)
2. **Screenshot** — `1px solid var(--line)`, no radius, no shadow. **The aspect is the CAPTURE's,
   not a fixed 16:10** *(amended 2026-08-31; 16:10 as written here was the placeholder's shape, and
   it survived into the spec after real captures landed)*. A card's box stretches with the frame's
   height — the landing slot measures 555x592 at 1920 and 555x937 at 2560 — so no single source
   aspect fills it, and forcing 16:10 crops the capture's sides: the carousel sliced a headline
   mid-word. The rule therefore goes **on the image**, which hugs it by construction. §6 records
   this and `Shot`'s `hug` mode implements it. Do not "restore" a fixed 16:10 here
3. **Product name** — sans 600
4. **One-sentence description** — sans, `--dim`
5. **Status line** — mono, in a `1px solid var(--line)` box, `--ink`. Reads `Status: in development`

Verified against §9.2's empty-slot test: rendered with nothing in a metric position, the card does
not look broken.

### 5.3 The 1..n requirement

Brief §5.3, a build constraint rather than a preference. The portfolio renders **from the product
list** and adapts by count.

**Mechanism changed 2026-08-27: a carousel, one product at a time.** With the frame fixed to one
viewport there is no vertical scroll, so the previous row-per-product stack had nowhere to go.

- **n = 1** → the single product fills the frame. **No arrows render** — disabled arrows would be
  chrome implying content that does not exist, the same failure as a "coming soon" cell.
- **n ≥ 2** → arrows appear and slides advance, wrapping at both ends; Left/Right arrow keys step.
  The numeral becomes a position indicator (`01 / 03`), which under a carousel encodes something
  true rather than decorating.
- Nothing is re-cut and no component is replaced when a product is added. The requirement is
  unchanged; only "rows stack" became "slides advance".

**Never render a placeholder or "coming soon" row.** An empty cell is the clearest possible signal
that the studio has nothing yet.

### 5.4 Motion

Brief §8: minimal, earns its place, serves orientation and feedback. The `brutalism` row specifies
`transition: none or 0s` — **rejected**; that is the anti-design register, and instant state change
reads as broken rather than disciplined.

- Hover/focus state changes: `120ms linear` on colour only.
- Theme switch: `120ms linear` on `background-color` and `color`.

> **⚠ Implementation note added 2026-08-27, raised by round-2 review — read before Phase 3.**
> These two cases are implemented by overriding Tailwind's global defaults in `globals.css`
> (`--default-transition-duration: 120ms`, `--default-transition-timing-function: linear`),
> because Tailwind otherwise ships `150ms cubic-bezier(0.4,0,0.2,1)` and every `transition-*`
> utility would silently miss this spec. **That override is broader than this section's scope.**
> It reaches every bare `transition-*` utility in the app, including any shadcn/Radix primitive
> added later with entrance/exit motion. Nothing is harmed today — every current use is exactly
> the hover-colour case. But **`120ms linear` is right for colour and wrong for movement**: it
> reads abrupt on anything that travels. When Phase 3 adds real motion, either give those
> components explicit `duration-*`/`ease-*` classes or narrow the override. Do not discover
> this by feel.
- **No** scroll-jacking, parallax, or entrance animations that replay on navigation.
- `prefers-reduced-motion: reduce` → all transitions to `0s`, from the first animated element.

### 5.5 Theme toggle

Committed scope, not a nice-to-have (brief §7, Tarek's call against the recommendation).

- **Sits in the header, right, beside the nav**, in a bordered mono cell — visible on load without
  scrolling. *(Moved from the footer 2026-08-27, Tarek's call.)* The footer carries
  `Hachad Solutions LLC` alone.
- Persists to `localStorage`; wrap every read and write in `try`/`catch` and render correctly with no
  stored value.
- Default follows `prefers-color-scheme`.
- Both themes complete and independently measured (§2).
- **Screenshot treatment must be decided before capture, not after** — brief §7 names this as the
  cost most easily discovered too late. Frame's answer: every screenshot sits inside a
  `1px solid var(--line)` box, which gives it a defined edge on either ground.
- **The founder portrait** (`public/founder.png`, added 2026-08-27) passes the same test by luck
  worth recording: it is pixel art with a **mid-tone slate background that sits between both
  grounds**, so it reads correctly on `#FFFFFF` and on `#0A0A0A` without a cutout or a per-theme
  variant. Framed in 1px `--line` like a screenshot. **`image-rendering: pixelated` is mandatory**,
  and it is served `unoptimized` — Next's image optimizer would resample and soften the blocks,
  which are the whole character of the image. 11 KB, 3-colour palette; there is nothing to optimize.
- **Portrait crop, contact page — the cropped axis DEPENDS ON THE BREAKPOINT.**
  `object-fit: cover` always crops whichever axis the container is longer in, and the source is
  square (1630×1630), so the container's shape decides everything.
  - **At `xl` (≥1280px)** the column is taller than wide → the **width** is cropped: 0% vertically,
    and horizontally 12% at 1512×820, 23% at 1920×1080, 45% at 2560×1440. `object-center` is
    correct because the face is centred in the source; a vertical bias would be inert.
  - **Below `xl`** the block is constrained to a **centred square** (`aspect-square`,
    `max-w-[340px]`), so it matches the source's shape and **nothing is cropped on either axis**.
  *This was wrong three times before it was right, and the sequence is worth keeping:* a comment
  claimed a 40% vertical bias that was never implemented; the measurement script that "confirmed"
  the reasoning had its **axis logic inverted**; and once the axis was finally correct, the
  below-`xl` case was still broken — the block was `w-full max-h-[60vh]`, measuring 1194×480 at
  1279×800 and cropping **60% of the height**, cutting off the top of the head and the chin. It
  rendered as a horizontal band, not a portrait.
  **Two rules earned here:** compute the cropped axis from natural-vs-rendered dimensions, never
  infer it from the container's apparent shape; and **check both sides of every breakpoint** —
  a screenshot showing headroom at one width says nothing about the other.

---

## 6. Open

- ~~**License for `README.md`**~~ — **CLOSED 2026-08-27.** MIT for the code, with brand assets
  (the H72 Labs name, wordmark, visual identity, and site copy) explicitly excluded. `LICENSE` is
  written and `README.md`'s section is filled. One `README` TODO remains and is not blocking:
  run commands, which need the scaffold (Phase 1).
- **`--gap-cell` IS DEAD CSS — recorded here 2026-08-31 because it was previously known only to a
  code comment.** §4 defines it as `clamp(32px, 3.4vw, 40px)` for the screenshot-to-text gap inside a
  product row. `globals.css` declares it at `:root` but never registers it in the `@theme inline`
  block, so every `gap-cell` utility on the site silently resolves through `--spacing-cell`
  (= `--pad-cell` = **24px**) instead. Measured: computed `columnGap` on the detail page's
  screenshot row is 24px, and the `sizes` arithmetic in `frame.tsx` is derived from 24px because
  that is what actually renders. Wiring the token in is a one-line change with a **site-wide visual
  effect** — every `gap-cell` gap grows by up to 16px — so it is a deliberate decision, not a
  cleanup. Until then the spec and the render disagree and this entry is the disclosure.
- **`--accent` `#2563EB`** — kept knowingly (§1.4). A swap after this point is a stated decision, not drift.
- ~~**Screenshots do not exist yet.**~~ — **CLOSED 2026-08-31.** Real captures of the News
  Aggregator now fill **every** screenshot slot on the site: the product detail page's two-up row
  (the front page, and one story expanded), the landing page's product card, and the portfolio
  carousel panel. Lossless WebP at native 2x. §5.5's frame treatment was specified before capture
  exactly as intended and held — every one sits in the 1px `--line` box, and the filled and empty
  states draw the same rectangle.

  **Two rules were earned filling them, and both are now encoded in `Shot` rather than left to each
  call site:**
  - **The top of a capture is never cropped.** The masthead and topic nav have to read, or the shot
    looks like a rendering fault. `object-position` is top wherever cropping is possible; losing the
    BOTTOM is fine and intended.
  - **No band of empty space inside the rule.** A slot whose box shape moves with the viewport (the
    landing card is 555x592 at 1920 but 555x937 at 2560) cannot be filled by any single source
    aspect. Those slots put the rule *on the image*, so it hugs by construction.

  *Deferred, date-blocked: one digest per page, so the three pages show three different days —
  see `docs/internal/(C) ROADMAP.md` → "Deferred — needs elapsed time".*
