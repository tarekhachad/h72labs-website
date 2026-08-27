# h72labs-website

The public website for **H72 Labs**, a one-person product studio building AI tools. The site
carries the studio's brand thesis, a portfolio of its products with a detail page for each, a
founder note, and a contact address.

Built by [H72 Labs](https://github.com/tarekhachad) — the brand name for Hachad Solutions LLC
(Georgia).

## What it does

- Presents the studio and its thesis: *"H72 Labs builds AI tools that turn noisy information into clarity."*
- Lists the product portfolio, driven by data rather than hardcoded markup, so products can be
  added without re-cutting the layout
- Gives each product its own page: what it is, what it does, how it's used, and where the idea
  came from
- Provides a contact route that needs no backend

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) | Static generation — pages are built to HTML at deploy time, so there is no server to run |
| Styling | Tailwind 4 | CSS-first: design tokens live in a `@theme` block in `globals.css`, not `tailwind.config.js` |
| Primitives | shadcn/ui on Base UI | Taken for accessible behavior — focus trapping, ARIA, keyboard handling. Appearance is replaced entirely with this project's tokens |
| Icons | `lucide-react` | shadcn's standard pairing |
| Motion | Motion | Used lightly — motion serves orientation and feedback, not decoration |
| Hosting | Vercel | Deploys from a git push; custom domain is a settings change |
| Contact | `mailto:` on a plain text address | No backend, no third-party form service, nothing that can fail silently |

Full reasoning, and what is deliberately absent, in [`docs/(C) TECH_STACK.md`](docs/).

## Running it locally

Requires Node 20 or newer (built on 24.x). No database, no API keys, no `.env` file — the
site is fully static.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm start        # serve the production build
npx eslint src   # lint (note: `next lint` was removed in Next 16)
```

## Docs

Design docs live in [`docs/`](docs/):

- `(C) UI_DESIGN.md` — the visual identity brief: register, constraints, and what each screen is
- `(C) TECH_STACK.md` — the stack, why each piece is there, and what is deliberately absent
- `(C) UI_WORKFLOW.md` — the order UI work happens in, and why
- `(C) DESIGN_INPUTS.md` — the inputs and constraints the identity was designed against

The design token spec lives in [`design-system/`](design-system/) — palette, typography, and
component rules, with provenance and accessibility reasoning behind each value.

## Status

In build. The visual identity is decided and the token spec is written; the app is scaffolded
and renders a themed shell. Page structure is next. Not yet deployed.

Note on the products listed on the site: they are labeled **in development** because that is what
they are. As of 2026-08-27 the Personalized News Aggregator runs locally only — it is not deployed
and has no external users.

## License

[MIT](LICENSE) for the code.

The H72 Labs name, wordmark, visual identity, and site copy are **not** covered by that
grant and remain the property of Hachad Solutions LLC. Read the code, reuse the code —
just don't ship a copy of the identity.
