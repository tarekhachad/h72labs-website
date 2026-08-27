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
| **Component primitives** | shadcn/ui (built on **Base UI**) | Accessible, keyboard-correct building blocks — focus trapping, ARIA, keyboard handling. You copy the components into the repo and own them rather than installing a dependency. **We take these for their behavior and replace their appearance entirely** with our own tokens. **Corrected 2026-08-27:** this table said *Radix* until Phase 1, because that was true when the choice was made on 08-26. `shadcn` 4.x now installs `@base-ui/react` instead — Base UI is the successor project from overlapping authors, serving the same role (unstyled, accessible primitives). The decision is unchanged in substance; the dependency name is not what it was, and the doc is corrected rather than left to rot. |
| **Icons** | `lucide-react` | shadcn's standard pairing. Consistent line weight, no emoji as icons. |
| **Motion** | Motion (formerly Framer Motion) | A real animation engine for anything orchestrated. Expected to be used lightly here — see `UI_DESIGN.md` §8. |
| **Hosting** | Vercel | Made by Next.js's authors, deploys from a git push, free tier is sufficient, and custom domains are a settings change. |
| **Domain** | `h72labs.com` | Owned since 2026-08-20. |
| **Contact** | `mailto:` on a plain text address | No backend, no third-party form service, nothing that can fail silently. `contact@h72labs.com` forwards to Tarek's Gmail. |

**One thing to know about this list:** committing to the 21st.dev MCP for components *commits this
stack*. It emits React + TypeScript on shadcn/Tailwind/Radix and nothing else. That was a
deliberate, stated choice on 2026-08-26, not a discovery.

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
