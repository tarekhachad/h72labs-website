---
type: Doc
status: Open
created: 2026-08-26
summary: "Design inputs for h72labs-website — the structural reference, the hard constraints, the sanctioned tool surface, and the open questions the design phase must close."
---

# (C) Design Inputs — h72labs-website

**This is inputs, not decisions.** The output of the design phase is `docs/(C) UI_DESIGN.md` (the
brief) plus `design-system/h72labs-website/MASTER.md` (the tokens). When both exist and are signed
off, this file becomes provenance and stops being live.

Read this at the start of any design session.

> **Rewritten 2026-08-26.** This replaces a version built on synthesizing an identity from 3–5
> captured reference sites. That methodology is retired; the original is kept for provenance at
> `docs/internal/(C) DESIGN_INPUTS-superseded-2026-08-26.md` (gitignored). Reasoning in the Brain
> root `(C) decision-log.md`, 2026-08-26.

---

## The stated direction

> Build a **real visual identity, generated from `ui-ux-pro-max` and decided by Tarek** — not
> synthesized from other sites, and not copied from any one of them.

Simple and pure in structure, sleek in interaction. Low information volume, high polish.

**The tool supplies grounded rows. Tarek decides. `MASTER.md` records which row each value came
from.** A value that can't be traced to a named row or an explicit line in the brief is an invented
choice, and gets said out loud rather than passed off as tool output.

### ⚠ The risk this methodology carries, stated rather than glossed

The retired capture set existed to stop the identity defaulting to the AI-landing-page house style
everyone already recognizes. Removing it removes that guard. **The brief is now the only guard
left**, which means it has to be opinionated enough to reject a `uipro` row *with a reason*. A brief
that merely describes preferences will not do this.

---

## The one reference: Walter Labs — structure only

<https://walter-labs.com/> — a friend's AI product-portfolio studio, and the closest structural
analogue to H72 Labs.

**What it is used for:** the *shape* of a simple solo-studio portfolio site — a logo, a brief
description of what the company does, a few tabs (contact, portfolio), and a portfolio that today
holds one product. It is also the aspirational target for when H72's portfolio fills out.

**What it is not used for:** palette, type, motion, the mark, or any specific component. Those are
H72's own. It is a friend's company and a direct-analogue business — take the anatomy, leave the
identity.

**Measured anatomy** (from the 2026-08-21 capture, at 1920 CSS px):

| | |
|---|---|
| Whole page height | **1565px** — one screen of portfolio, one contact line, footer |
| Type | `baskerville` system serif, italic serif captions. No webfont, no accent color |
| Products | horizontal row of 9:16 device-format screenshots, caption underneath |
| Contact | the literal string `contact@walter-labs.com`, and nothing else |

Capture and style dump live in `docs/internal/references/` (gitignored). See
`(C) capture-notes.md` there.

---

## Hard constraints going into the brief

### 1. The proof-line trap — H72's product card has no metric slot

Walter Labs' cards earn credibility from a bracketed metric under the caption:
`[300M+ TikTok Views.]`, `[#1 App in France, 2024]`.

**H72 cannot fill that slot.** The honesty rule forbids inventing one and nothing true exists to put
there. Copying the card shape yields an empty bracket where the proof belongs, which reads *worse*
than not having the slot.

**Therefore: H72's product card has no metric slot at all.** It earns credibility from real
screenshots, an honest status line, and depth of engineering writeup. This is a design requirement,
not a caveat, and it belongs in `MASTER.md`'s component rules as well as the brief — so it can't be
quietly reintroduced when a generated component arrives with a stat badge in it.

### 2. Page anatomy is closed — do not re-litigate it in sitting 1

`uipro --domain landing "portfolio minimal single product"` independently returned **"Minimal
Single Column"**:

> Hero headline → short description → benefit bullets (3 max) → CTA → footer.
> *"Single CTA focus. Large typography. Lots of whitespace. No nav clutter. Mobile-first."*

That is Walter Labs' measured anatomy, arrived at from an unrelated source. Two independent
sources, same answer. **Structure is settled.** Sitting 1 decides register, palette, type, and the
mark — not section order.

The same search named **"Portfolio Grid"** (Hero → Project Grid → About/Philosophy → Contact) as the
pattern for a filled-out portfolio. That's the future shape, not v1's.

### 3. The honesty rule (from `CLAUDE.md`, non-negotiable)

PNA is labeled **in development**. No live product link. No user, traction, or usage claims of any
kind. No "trusted by," no logos, no testimonials, no fabricated metrics. If a status line is
ambiguous, make it more conservative.

### 4. Site copy is external-facing writing

The root `CLAUDE.md` Writing Style rules apply in full — the banned-word list, the noun-swap test,
and a self-check pass before anything is called done. Marketing-site copy is where AI tells are most
obvious.

---

## The sanctioned tool surface

Full reasoning in `docs/(C) UI_WORKFLOW.md` step 2.

| ✅ Use | ❌ Skip |
|---|---|
| `--domain style` | `--design-system` |
| `--domain typography` | `--persist` |
| `--domain color` | `--domain product` (as a *primary* input) |
| `--domain landing` | |
| `--stack nextjs` / `--stack shadcn` | |
| The Quick Reference + pre-delivery checklist | |

**Why `--domain product` is skipped:** `products.csv` has no "AI product studio" row, so the ranker
returns the nearest string match with full confidence. Verified 2026-08-26 on v2.15.0 —
*"Photography Studio"* still ranks first for `"AI software product studio portfolio"`. `--design-system`
builds on that same lookup and `--persist` writes the result straight into `MASTER.md`, laundering a
bad guess into the source of truth. It is usable as a **cross-check** after decisions are made
(v2.15.0 added an `AI/Chatbot Platform` row → *AI-Native UI + Minimalism & Swiss Style*), never as a
source.

**Version discipline:** `ui-ux-pro-max` must be current before sitting 2 — `uipro versions`. It was
found two versions stale on 2026-08-26 (2.13.0 vs 2.15.0), and 2.15.0 carried a materially larger
database (67→79 styles, 161→192 palettes, 57→74 font pairings). Design decisions were being made
against data that had already moved.

**Provenance source:** v2.15.0 ships `data/data-provenance.json` — per-value `verifiedAt` dates,
confidence scores, and freshness SLAs. Cite these in `MASTER.md` alongside the row name.

---

## Open questions the design phase must close

Design identity:

- [ ] **Register — the first real decision of sitting 1.** Editorial-serif, technical-mono, or
      something else? Everything else follows from it.
- [ ] **The mark.** Wordmark-only, or symbol + wordmark? Does "72" get explained publicly, or stay
      unexplained?
- [ ] Palette, type pairing, motion language — `UI_WORKFLOW` step 2/3 work.
- [ ] Dark-only, light-only, or both? Deferring one is a legitimate v1 call — decide it, don't leave
      it implicit.

Structure & content:

- [ ] **What goes on a product detail page?** Tarek's list: detailed description, what it does and
      how it's used, where the idea came from. To decide: stack/architecture summary, status +
      roadmap, a link to the repo. Does the template need variants, or one shape with optional
      blocks?
- [ ] **How does product content reach this site from the product's repo without drifting?** Note
      PNA's own `README.md` is still `create-next-app` boilerplate — the real source material is
      PNA's `docs/` and `CLAUDE.md`. Pick the v1 answer explicitly and write down what makes it
      drift.
- [ ] **What does a one-product portfolio page look like** without looking empty? A real design
      problem — one honest card beats a grid padded with "coming soon" ghosts.
- [ ] Contact: `mailto:` or a form service (Formspree et al.)? No custom backend for v1.

### Closed — do not reopen

- [x] **Presented name: "H72 Labs"** (2026-08-20, by elimination — the domain is owned).
- [x] **Domain — `h72labs.com`** bought 2026-08-20, verified against Verisign RDAP first. `h72.com`
      was already registered (ename.net).
- [x] **Email — `contact@h72labs.com`** live 2026-08-20, forwarding inbound to Gmail. Inbound-only;
      sending *as* the address needs an SMTP relay and is deferred. v1's contact route only needs a
      working inbox behind a `mailto:`.
- [x] **Page anatomy** — see Hard constraint 2.
- [x] **Founder note is a landing-page section**, not its own page (2026-08-26). Nav stays portfolio
      + contact.
- [x] **Product detail pages get a real image slot**; PNA screenshots are captured and scrubbed
      before deploy (2026-08-26).
- [x] **Stack: Next.js + Tailwind 4 + shadcn/Radix + Motion**, deployed on Vercel. Committing to
      21st.dev commits this stack — it emits nothing else.

Still open, infrastructure:

- [x] ~~`H72Labs` GitHub org~~ — **CLOSED 2026-08-27: not claiming one.** Tarek's call. Solo company; personal GitHub serves as the professional profile, carrying links to the deployed site and LinkedIn. Branded repo names cover the namespace concern. Settled — not an open question.

---

## Hard boundary

**The design phase ends when `docs/(C) UI_DESIGN.md` and `design-system/h72labs-website/MASTER.md`
both exist and are signed off.** After that, building starts. Reopening the identity requires a
stated decision, not drift.

### The phase is two sittings — "brainstorm" here means the phase, not the skill

| Sitting | What runs | Ends with |
|---|---|---|
| **1** | the `project-brainstorm` skill — conversation only, no design tooling opened | `docs/(C) UI_DESIGN.md`, the brief |
| **2** | `(C) UI_WORKFLOW.md` steps 2–3 — `uipro` domain searches → `prototype` visual pick → the spec written by hand | `design-system/h72labs-website/MASTER.md`, the tokens |

**Why they can't collapse into one sitting.** `UI_WORKFLOW` step 2 ranks every tool suggestion
against the brief, so the brief has to exist before the tool is opened — and step 3 requires every
token to trace back to a grounded `uipro` row or an explicit line in the brief, or it is an invented
value. Writing `MASTER.md` during sitting 1, before `uipro` has run, produces exactly the invented
spec step 3 forbids.

**Neither sitting is the boundary on its own.** Finishing the brief is *not* permission to start
building — that is the specific drift this boundary exists to catch, because "the brief is done"
feels like a finish line and isn't one. Sitting 2 is the finish line.

**New in sitting 2 (2026-08-26):** carry **2–3 candidate directions** out of the `uipro` searches
rather than one, then run Emil Kowalski's `prototype` skill in its standalone-HTML branch to render
one variant per direction with real H72 content behind a picker. Tarek flips through and picks; the
winner becomes `MASTER.md`. This converts the identity question from an abstract debate into a live
comparison, needs no app scaffold, and costs nothing.
