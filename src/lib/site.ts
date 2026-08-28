import type { Metadata } from "next";

export const SITE_NAME = "H72 Labs";
export const THESIS = "H72 Labs builds AI tools that turn noisy information into clarity.";

/**
 * The canonical origin. Overridable so a preview deployment advertises itself
 * rather than production — set `NEXT_PUBLIC_SITE_URL` in the Vercel environment
 * for Preview (see `.env.example`). Unset, it falls back to production, which is
 * the right default for the build that actually serves the public.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://h72labs.com";

/**
 * The share card, served from `public/social-card.png`.
 *
 * It deliberately does NOT live at `src/app/opengraph-image.png`. That filename is
 * one of Next's special conventions, and **inside its own segment the convention
 * overrides an explicit `openGraph.images`** — which is not what the docs lead you
 * to expect and is not what the rest of this file assumes. Concretely: with the
 * file there, `/` alone shipped a hash-suffixed image URL and no `og:image:alt`,
 * while every other route used the explicit descriptor below. Moving the asset to
 * `public/` removes the auto-route, so the config here is the only mechanism on
 * every route including the homepage.
 */
const SHARE_IMAGE = {
  url: "/social-card.png",
  width: 1200,
  height: 630,
  alt: `H72_LABS, above the line "${THESIS}"`,
};

/**
 * The link-preview fields, built once and shared by every route.
 *
 * WHY THIS IS CENTRALISED — three variants of one bug reached review, all from the
 * same root cause: **Next REPLACES a child's `openGraph` object wholesale rather
 * than merging it.**
 *
 *   1. A page that set only `title`/`description` inherited the parent's entire
 *      `openGraph`, so every route advertised the homepage — the product link
 *      previewed as "H72 Labs" and the studio thesis.
 *   2. Giving each page its own `openGraph` then silently DROPPED the image and
 *      url, which had been arriving via the file convention. Measured: three
 *      routes emitted no `og:image` and no `og:url` at all.
 *   3. Declaring images explicitly fixed those, but not on `/`, because the
 *      special-named file in that segment kept winning. The comment claiming
 *      "one mechanism" was, at that point, false.
 *
 * Each fix looked complete because the field it set was correct; nothing pointed
 * at what it had quietly removed or failed to reach. So the whole preview surface
 * is assembled here, in one function, and every route — homepage included — is
 * built from it.
 */
type RoutePath = `/${string}`;

function previewFields(title: string, description: string, path: RoutePath) {
  // The homepage's card is titled with the bare site name; a subpage gets the
  // suffix. Composed here rather than via the `title.template` in the metadata,
  // because that template governs the document <title> only and never reaches
  // `og:title` — two outputs, one visible string.
  const cardTitle = path === "/" ? SITE_NAME : `${title} — ${SITE_NAME}`;
  return {
    description,
    openGraph: {
      type: "website" as const,
      siteName: SITE_NAME,
      locale: "en_US",
      title: cardTitle,
      description,
      url: `${SITE_URL}${path}`,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: cardTitle,
      description,
      images: [SHARE_IMAGE],
    },
  };
}

/** Metadata for the root layout, and therefore for the homepage. */
export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
    applicationName: SITE_NAME,
    alternates: { canonical: "/" },
    ...previewFields(SITE_NAME, THESIS, "/"),
  };
}

/**
 * Metadata for a single page. Assign it directly — `export const metadata =
 * pageMetadata({...})` — and never spread it into an object literal. A spread
 * leaves a slot where a sibling key can override a nested field with no signal,
 * which is variant 1 above wearing a different hat: a top-level `description`
 * beside a spread sets `<meta name="description">` while `og:description` keeps
 * the old value, and the two disagree silently.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  /**
   * Route path. Typed as `/${string}` so a missing leading slash is a compile
   * error rather than a silently malformed URL — `"portfolio"` would otherwise
   * concatenate into `https://h72labs.compportfolio` with nothing to catch it.
   */
  path: RoutePath;
  /**
   * For not-found responses. A 404 must not name another page as its canonical
   * URL — that tells a crawler the error page IS that page. Sets `noindex` and
   * omits the canonical entirely instead.
   */
  noIndex?: boolean;
}): Metadata {
  const fields = previewFields(title, description, path);
  return {
    title,
    ...fields,
    ...(noIndex
      ? {
          // `canonical: null` is load-bearing, not decoration. Omitting the key
          // does NOT clear it — the root layout sets `canonical: "/"` and a child
          // that says nothing inherits it, so every 404 was telling crawlers it
          // WAS the homepage. Explicit null is the only thing that suppresses it.
          robots: { index: false, follow: true },
          alternates: { canonical: null },
        }
      : { alternates: { canonical: path } }),
  };
}
