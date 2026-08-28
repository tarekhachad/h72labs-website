---
type: Doc
status: Open
created: 2026-08-26
summary: "The visual identity brief for h72labs-website — register, constraints, screens, and the rules a tool suggestion must pass. Output of sitting 1 of the design phase."
---

# (C) UI Design — h72labs-website

**This is a brief, not a build plan.** It sets the voice, the constraints, and what each screen is.
It deliberately does **not** set tokens — palette, type pairing, type scale and spacing come from
sitting 2 (`UI_WORKFLOW` steps 2–3), traced per value.

> **This document carries more weight than a normal brief.** The reference-capture methodology that
> used to guard against generic AI-landing-page output was retired on 2026-08-26. Nothing replaced
> it. **This brief is the only remaining guard**, which is why it ends with explicit rejection
> criteria rather than a description of preferences. If it can't be used to reject a `uipro` row
> *with a reason*, it has failed at its job.

---

## 1. What the site is

The public front door for **H72 Labs** — the brand name for Hachad Solutions LLC, a one-person
product studio building AI tools.

**Its readers, in priority order:** recruiters and hiring managers first, then potential early users
and collaborators. That ordering decides arguments. When a choice would please a user but weaken a
recruiter's read, the recruiter wins.

**The single job of the site:** make a recruiter conclude *this is a real studio doing real
engineering*, in under sixty seconds, from one product that isn't deployed.

That constraint is the whole design problem. There is no traction to show, no user count, no live
link. **The only asset is depth of work.** Every decision below follows from that.

**Brand thesis, verbatim, never paraphrased:**

> "H72 Labs builds AI tools that turn noisy information into clarity."

---

## 2. The register — **Technical**

Chosen 2026-08-26 from three rendered candidates.

> **Provenance.** The decision was made by looking, not by argument. Three specimens — Technical,
> Editorial, Swiss — were rendered with real H72 content (the thesis verbatim, the actual product,
> the actual status line) and a live light/dark control, then compared side by side:
> <https://claude.ai/code/artifact/2e76d0b5-7de9-4e64-8150-e3c0b0a7cfb3>
> Source file: `scratchpad/register-study.html` (session-local, not in this repo).
> The typefaces there — IBM Plex Sans/Mono, Libre Baskerville, Archivo — were **stand-ins to make
> each register legible, not token decisions.** The real pairing comes from sitting 2.

Mono for labels, metadata, status and indices; sans for statement type. Tight tracking. Flat status
lines. Products indexed rather than decorated. **The register of a build log.**

### Why this one

1. **It makes the proof native.** The only credibility available is engineering depth. A register
   that *looks* like engineering makes a stack summary read as the natural content of the page,
   rather than as compensation for missing traction.
2. **It performs the thesis instead of describing it.** "Noise into clarity" is a precision claim.
   Mono labels, a disciplined grey ramp, and a flatly-stated status enact precision; a decorative
   register would merely assert it.
3. **It solves the hardest line on the site.** `Status: in development` has to appear and must not
   read as an apology. In this register a status line is a normal, expected artifact — it looks like
   instrumentation, not like an excuse.
4. **It puts distance between H72 and Walter Labs.** See below.

### Why not the alternatives — keep these reasons; they are how rows get rejected later

- **Editorial / literary serif — rejected.** It is Walter Labs' register near-exactly: same
  Baskerville class, same italic captions, same centered restraint. Walter Labs is a friend's
  company in the same business, and the whole stated direction is *take the structure, leave the
  identity*. Adopting its type takes the identity. A recruiter who sees both sites sees one studio
  and one copy. **This rejection is not aesthetic and is not reopenable on taste.**
- **Swiss / grid minimalism — rejected, narrowly.** Genuinely good and genuinely safe. Rejected
  because neutrality is the least memorable outcome, and on a one-product site there is nothing else
  carrying distinctiveness. Its best property — a grid that absorbs products 2..n without a
  redesign — is **retained** as a structural requirement (§5.3) without adopting its voice.

### What the register is not

Not a dark developer-tool landing page. Not terminal cosplay — no fake shell prompts, no blinking
cursors, no ASCII art, no code-editor chrome. The register comes from **typographic discipline**
(mono used for what mono is for: labels, metadata, status, indices) and from restraint, never from
props. If a decision would look at home in a screenshot of a terminal emulator, it is wrong.

---

## 3. Hard constraints

### 3.1 The product card has no metric slot — non-negotiable

Walter Labs' cards earn credibility from a bracketed metric under the caption
(`[300M+ TikTok Views.]`, `[#1 App in France, 2024]`). **H72 has nothing true to put there** and the
honesty rule forbids inventing one. Copying the shape yields an empty bracket where the proof
belongs, which reads worse than not having the slot.

**Therefore the slot does not exist.** Credibility comes from a real screenshot, an honest status
line, and depth of writeup. This constraint belongs in `MASTER.md`'s component rules as well as
here, so a generated component cannot quietly reintroduce a stat badge.

### 3.2 The honesty rule

- The News Aggregator is labeled **in development**. Not launched, not beta, not live.
- **No live product link** until a product has a working public URL.
- **No user, traction, or usage claims of any kind.** None exist.
- No "trusted by", no client logos, no testimonials, no fabricated metrics.
- If a status line is ambiguous, make it **more** conservative.

### 3.3 Page anatomy is closed

`uipro --domain landing` returned **"Minimal Single Column"** (hero headline → short description →
≤3 bullets → CTA → footer). Walter Labs' measured anatomy at 1920px is 1565px total: headline, one
product row, an email address, footer. Two unrelated sources, same answer. **Section order is not
reopened.**

### 3.4 Copy is external-facing writing

The root `CLAUDE.md` Writing Style rules apply in full — banned-word list, the noun-swap test, and a
self-check pass before anything is called done. Marketing-site copy is where AI tells are most
obvious. Specifically banned here and worth naming because they are the exact temptations of this
genre: *leverage, unlock, harness, seamless, robust, cutting-edge, empower, streamline,
revolutionize, elevate*, and any "It's not just X, it's Y" construction.

### 3.5 Mobile-responsive is in the ship bar

"Verify it live" means at real mobile widths, not only 1920.

---

## 4. Decisions ledger

| Decision | Call | Date |
|---|---|---|
| Register | **Technical** — mono labels + sans statement type | 2026-08-26 |
| Mark | **Wordmark only.** No symbol for v1. Spacing, weight and tracking *are* the design. A symbol can be added later without redoing anything | 2026-08-26 |
| "72" | **Never explained publicly.** Not in the hero, not in the founder note, not in the footer | 2026-08-26 |
| Theme | **Light and dark, with a toggle.** Tarek's call, against the recommendation — see §7 for what it costs | 2026-08-26 |
| Founder note | **A section on the landing page**, not its own page | 2026-08-26 |
| Contact | **Plain email address as text**, mono, selectable, with a `mailto:` on it. No form, no third-party service | 2026-08-26 |
| Portfolio | **One entry at full weight**, in a layout that renders 1..n — see §5.3 | 2026-08-26 |
| Detail page | Description · what it does & how it's used · origin · screenshots · **stack/architecture** · **honest limits** — see §5.4 | 2026-08-26 |
| Product content | **Structured content files in this repo**, hand-authored for a public reader — see §6 | 2026-08-26 |
| Presented name | "H72 Labs". `Hachad Solutions LLC` appears in the footer only, as legal attribution | 2026-08-20 |

---

## 5. The screens

### 5.1 Landing

One column, generous vertical rhythm, no nav clutter. Sections in order:

1. **Wordmark + nav.** Wordmark left in mono, tracked wide. Nav right: `Portfolio` · `Contact`. Two
   items, never more.
2. **Thesis.** The brand line, set large in the sans face, tight tracking, max ~19ch per line so it
   breaks as a statement rather than a paragraph. This is the hero. There is no illustration, no
   gradient, no background graphic behind it.
3. **Featured product.** One product, rendered as the product card (§5.5). Data-driven from the
   start — it renders 1..n, not a hardcoded single card.
4. **Founder note.** Short. First person. Who is building this and why. This is the only place on
   the site with a human voice rather than an instrument's voice, and that contrast is deliberate —
   keep it to a few sentences so the contrast stays sharp.
   **A portrait was added 2026-08-27** (Tarek's call, reversing this section's original "no photo
   for v1"): pixel art, framed, sitting below the note. Reason given and accepted — the site is
   otherwise entirely instrument-voiced, and this section is the one place a human element belongs.
5. **Contact.** The address as text. Nothing else.
6. **Footer.** `Hachad Solutions LLC`. *(The theme toggle moved to the header 2026-08-27.)*

### 5.2 Product detail (templated, one per product)

Blocks, in order:

1. Product name + status line
2. What it is — a real paragraph, not a tagline
3. What it does and how it's used
4. **Screenshots** — real, scrubbed, in a fixed slot (§7)
5. **Stack / architecture** — the pipeline named plainly. For PNA: RSS ingest → embedding-based
   clustering → Haiku triage → Sonnet card writing. **This block is the page's proof and the reason
   the Technical register was chosen.**
6. **What it doesn't do yet** — honest limits, stated flatly
7. Where the idea came from

> **Revision trigger (Tarek, 2026-08-26).** If blocks 5 and 6 make the page read as *too much
> information for a public site*, fall back to blocks 1–4 + 7 only — description, what it does, how
> it's used, screenshots, origin. **Judge this on the rendered page, not in the abstract**, and make
> the call once, out loud, rather than trimming gradually.

**No repo link in v1.** PNA's `README.md` is still `create-next-app` boilerplate, so a link
currently sends a recruiter somewhere that undercuts the page. Revisit when PNA's README is
rewritten (its own Roadmap V2.2).

**No public roadmap in v1.** A published roadmap is a promise you then own.

### 5.3 Portfolio — the 1..n requirement

**This is a build constraint, not a layout preference.** Tarek's instruction: one entry now, and
product #2 must be absorbed *naturally*, with no rework.

Concretely, the page renders from the product list and adapts by count:

- **n = 1** → the single entry occupies the full content width: large screenshot, stack line, status,
  a real paragraph. It reads as deliberate, not sparse.
- **n ≥ 2** → the same entries flow into the grid. Nothing is re-cut, no component is replaced, no
  layout is swapped.

> **Mechanism changed 2026-08-27: the portfolio is now a carousel, one product at a time.** With the
> frame fixed to one viewport there is no vertical scroll, so a stacked list had nowhere to go.
> **The requirement above is unchanged and still binding** — it renders from the product list and
> absorbs n ≥ 2 with no rework; only "rows stack" became "slides advance". **Arrows render only at
> n ≥ 2**: disabled arrows at n = 1 would be chrome implying content that does not exist, which is
> the same failure as the "coming soon" cells this section forbids.

The mechanism is a **flow layout that adapts by item count** — not a fixed 3-up grid holding empty
cells. **Never render placeholder or "coming soon" cells.** One honest entry beats a grid padded
with ghosts, and an empty cell is the clearest possible signal that the studio has nothing yet.

### 5.4 Contact

Reachable from the landing page and as its own route. The address in mono, selectable, `mailto:`
attached. No form. No name/email/message fields. Nothing that can fail silently.

### 5.5 The product card — the site's most important component

Used on landing and portfolio. Anatomy:

- Index label (mono, e.g. `01 — Product`)
- Screenshot in a fixed-ratio frame
- Product name
- One-sentence description
- **Status line** (mono, flat: `Status: in development`)
- **No metric slot.** See §3.1.

The card must look complete without a metric. If it looks like something is missing, the card is
wrong — not the constraint.

---

## 6. How product content reaches this site

**One structured content file per product, in this repo, hand-authored for a public reader.** This
is also what makes the 1..n product list work, so it is required regardless.

**Written for a recruiter, not lifted from internal docs.** PNA's `docs/` and `CLAUDE.md` are the
source *material*; they are written for Tarek and for Claude, and they are not publishable prose.
Note that PNA's `README.md` is still boilerplate and is **not** a source.

**The drift, stated so it can't be claimed as unforeseen:** when PNA's real status changes — when it
deploys, when V2 lands — this file does not update itself and nothing surfaces that it has gone
stale. **The rule: any change to a product's real status requires editing its content file in the
same sitting.** With one product this is a two-minute task. The rule exists so it doesn't rot at
three.

---

## 7. Theme — what the toggle costs

Light and dark, with a working toggle. Tarek's call, made against the recommendation to ship one
mode well. Recorded here as **scope, not a nice-to-have**:

- Two complete palettes, both with verified contrast ratios per token.
- Every token defined at semantic-role level from the start (`--ground`, `--ink`, `--dim`,
  `--line`, `--accent`), never as a literal that works in one mode.
- **Every PNA screenshot must sit well on both grounds.** This is the real cost and the easiest to
  discover too late — a screenshot with a light chrome on a dark page looks like a bug. Decide the
  screenshot treatment (framed? bordered? mode-matched pair?) **before** capture, not after.
- The toggle is a real control with a persisted preference and a sensible default.

---

## 8. Motion

Minimal, and it earns its place or it doesn't ship. Detail belongs to `UI_WORKFLOW` step 6; the
constraints from here:

- Motion serves **orientation and feedback**, never decoration. A static site with animated
  ornament reads as a template.
- No scroll-jacking, no parallax, no entrance animations that replay on every navigation.
- `prefers-reduced-motion` handled from the first animated element, not retrofitted.
- The Technical register implies **restraint**: state changes, not performances.

---

## 9. Rejection criteria — how to test a `uipro` row against this brief

**This section is the brief's actual job.** In sitting 2, a candidate row is rejected if any of the
following is true. Reject with the reason named.

1. **It reproduces the editorial-serif register.** Rejected by §2 — that is Walter Labs' identity.
   A serif *may* appear in a supporting role; a Baskerville-class display face with italic captions
   may not.
2. **It requires a proof point, metric, badge, or social-proof element to look complete.** Rejected
   by §3.1. Test: render it with nothing in that slot. If it looks broken, reject.
3. **It requires imagery, illustration, or a hero graphic H72 does not have.** There is one product
   and no illustration budget. A style whose examples all lean on photography or 3D is not
   executable here.
4. **Its palette can't survive both light and dark** with verified contrast at every semantic role.
   Rejected by §7.
5. **It is decorative rather than instrumental** — gradients as ground, glassmorphism, aurora
   effects, heavy shadows, bold primaries "for creative freedom". Rejected by §2's *what the
   register is not*.
6. **It is terminal cosplay** — shell prompts, code-editor chrome, monospace body text. Mono is for
   labels, metadata, status and indices. Body copy is the sans face.
7. **It came from `--domain product`, `--design-system`, or `--persist`.** Rejected by
   `UI_WORKFLOW` §2 regardless of how good it looks. Those paths have no correct answer for this
   product type.

**And the positive test, which matters more than the seven above:** a chosen row must be traceable
to a named `uipro` row with its `verifiedAt` date and confidence, **or** to an explicit line in this
brief. If it is traceable to neither, it is an invented value — say so out loud rather than letting
it pass as tool output.

---

## 10. What this brief does not decide

Deliberately left to sitting 2, so the tool has something to be ranked against:

- The typefaces. IBM Plex Sans/Mono were **stand-ins** in the register study, chosen to make the
  register legible. The real pairing comes from `uipro --domain typography`.
- The palette, including the accent hue. `--domain color`.
- The type scale and the spacing scale.
- Component rules beyond §5.5's card anatomy.

**The design phase ends when `design-system/h72labs-website/MASTER.md` exists and is signed off —
not when this file is finished.** Finishing the brief is not the boundary.
