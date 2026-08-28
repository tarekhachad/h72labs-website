---
type: Doc
status: Open
created: 2026-08-26
summary: "The stack for h72labs-website and why each piece is there — plus the architecture, which for a site this small fits in one section."
---

# (C) Tech Stack — h72labs-website

Deliberately thin. This is a four-page static marketing site; a long stack document would be
ceremony. Everything here is explained in plain language, because the point of building it is to
understand it.

> **There is no separate `ARCHITECTURE.md`.** For a static site the architecture *is* the file tree
> and the render model, and both fit in §3 below. Writing a second thin document to satisfy a
> template would be worse than this note.

---

## 1. The stack

| Layer | Choice | Why |
|---|---|---|
| **Framework** | Next.js (App Router) | Renders pages to static HTML at build time, so the site is fast and there is no server to run or pay for. Already the stack used on the News Aggregator, so nothing new to learn mid-build. |
| **Styling** | Tailwind 4 | Styles are written as small utility classes directly on elements. Tailwind 4 is **CSS-first**: design tokens live in a `@theme` block in `globals.css`, **not** in a `tailwind.config.js` theme block. That distinction matters and is easy to get wrong from older tutorials. |
| **Component primitives** | **None — removed 2026-08-28** | shadcn/ui on Base UI was scaffolded in at Phase 1 and taken out at the Phase 4 audit. The reasoning below still holds — you take these for accessible *behavior*, not appearance — but this site never had a surface that needed it: no dialog, menu, select, combobox or form. Its whole interactive surface is a theme toggle, two nav links and a carousel control, and the one component that did get installed (`button.tsx`) was never imported by anything. Carrying a primitives library for zero primitives is the cost without the benefit. **Revisit the moment a real dialog, menu or form appears** — hand-rolling focus trapping and ARIA is the mistake this row originally existed to prevent. The `shadcn` CLI and `components.json` are deliberately kept so that revisit is one command. *(Earlier history: this row said Radix until Phase 1, because that was true when the choice was made on 08-26; `shadcn` 4.x installs `@base-ui/react` instead.)* |
| **Icons** | **None — removed 2026-08-28** | `lucide-react` came in as shadcn's standard pairing and was never used. The site ships no icon set; its only glyph is a typed arrow. No emoji as icons still stands as a rule. |
| **Motion** | Motion (formerly Framer Motion) | A real animation engine for anything orchestrated. Used **once**, as intended: a directional slide on the portfolio carousel (Phase 3, 2026-08-28). Three other candidate surfaces were considered and rejected — see `UI_DESIGN.md` §8. |
| **Hosting** | Vercel | Made by Next.js's authors, deploys from a git push, free tier is sufficient, and custom domains are a settings change. |
| **Domain** | `h72labs.com` | Owned since 2026-08-20. |
| **Contact** | `mailto:` on a plain text address | No backend, no third-party form service, nothing that can fail silently. `contact@h72labs.com` forwards to Tarek's Gmail. |

**One thing to know about this list:** committing to the 21st.dev MCP for components *commits this
stack*. It emits React + TypeScript on shadcn/Tailwind/Radix and nothing else. That was a
deliberate, stated choice on 2026-08-26, not a discovery.

> **Update 2026-08-28.** The MCP was never connected (deferred by Tarek on 08-27 — it needs his API
> key, and MCP auth cannot be completed from inside a Claude Code session), and the Phase 4 audit
> then removed the primitives library it would have fed. **That is not a loss for this project** —
> the site has no component surface that needs it. The commitment above still describes what
> connecting it later would imply. The place it genuinely pays off is the News Aggregator's V2
> onboarding and multi-select screens, where the components are real; that is now a recorded
> deferred item in that project's `ROADMAP.md`.

---

## 2. What is deliberately absent

Naming these stops them being re-proposed mid-build.

- **No database.** Nothing is stored. Product content is files in this repo.
- **No authentication.** There are no user accounts. Nobody logs in.
- **No API routes and no backend.** Contact is a `mailto:`.
- **No CMS.** One product, edited by hand. A CMS for one product is a hobby, not a requirement.
- **No analytics in v1.** It can be added later; it isn't needed to reach the ship bar, and it is
  one more thing to get wrong on a public site.
- **No tests in the usual sense.** This project's verification convention is explicitly *run it and
  look at it* — screenshots, computed values, real mobile widths. That is a deliberate convention
  for a design-led static site, not a coverage gap. State it that way when scoping a QA round.

---

## 3. Architecture

**Render model:** static generation. Every page is built to HTML at deploy time and served from a
CDN. Nothing is computed while a visitor is on the site.

**Where content lives:** one structured content file per product in this repo. Pages read the
product list and render 1..n entries — this is what makes the portfolio absorb product #2 without a
redesign (`UI_DESIGN.md` §5.3). The list is never hardcoded to one card.

**Where the design lives:** `design-system/h72labs-website/MASTER.md` is the written token spec —
the *why* behind every color and font, with provenance and contrast reasoning. `globals.css`'s
`@theme` block is that spec **implemented**. When they disagree, `MASTER.md` is correct and the CSS
is a bug.

**Routes:**

```
/                     landing — wordmark, thesis, featured product, founder note, contact
/portfolio            all products, 1..n
/portfolio/[slug]     product detail, one per product, templated
/contact              the address, standalone
```

**The data flow, in one line:** product content files → the product list → landing card + portfolio
entries + detail pages. One source, three surfaces, no duplication.
