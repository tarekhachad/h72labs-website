// The product list. Single source of truth for the landing card, the portfolio,
// and every detail page — UI_DESIGN §5.3 and §6.
//
// THE HONESTY RULE (CLAUDE.md, non-negotiable) binds this file above all others:
//   - status is what the product actually is. "in development" is not a placeholder.
//   - no live link until a product has a working public URL.
//   - no user, traction, or usage claims. There are none to make.
//   - there is NO metric field on this type, deliberately. See UI_DESIGN §3.1.
//
// THE DRIFT RULE (UI_DESIGN §6): when a product's real status changes, this file
// is edited in the SAME sitting. Nothing surfaces that it has gone stale.

export type ProductStatus = "in development";

export type Product = {
  slug: string;
  name: string;
  /** One sentence. Used on the card. */
  summary: string;
  status: ProductStatus;
  /** Detail page, block 2 — a real paragraph, not a tagline. */
  whatItIs: string;
  /** Detail page, block 3. */
  howItsUsed: string;
  /**
   * Detail page, block 5 — the page's proof, and why the Technical register was
   * chosen. Split so the render does not infer meaning from array position:
   * `pipeline` is the one-line flow, set in mono; `details` are prose.
   */
  stack: { pipeline: string; details: string[] };
  /** Detail page, block 6 — stated flatly, no softening. */
  limits: string[];
  /**
   * Detail page, block 7. Null until Tarek writes it — the block does not render
   * when null. An invented origin story would be a fabrication, and a
   * "coming soon" block is the ghost cell §5.3 forbids.
   *
   * DEFERRED 2026-08-27 to a dedicated brainstorm sitting, at Tarek's call.
   * The brief for that sitting, in his framing and sharper than the block's own
   * title: it is not enough to say where the idea came from. It has to answer
   * **why build this instead of using Apple News, Flipboard, or any other reader
   * that already exists.** That is the question a recruiter reads this block
   * asking, and an origin story that doesn't answer it reads as naivety rather
   * than judgment.
   *
   * Two things already in the repo are raw material for that answer, and neither
   * is a feature Apple News or Flipboard offers: one card per *story*
   * synthesized across every outlet that covered it (rather than a ranked list
   * of headlines pointing at one outlet each), and a source list the reader
   * chooses rather than one an engagement ranker chooses for them.
   * That is an argument about editorial control, not about technology — which is
   * probably where the honest answer lives.
   */
  origin: string | null;
};

export const products: Product[] = [
  {
    slug: "personalized-news-aggregator",
    name: "Personalized News Aggregator",
    summary:
      "Reads a few hundred RSS feeds a day, groups the articles that are really the same story, and writes one card for each thing worth knowing about.",
    status: "in development",
    whatItIs:
      "A daily news reader built around one question: what actually happened today in the things I care about? You choose topics and sources once. After that, asking for the day's news returns a feed where every card is a single story — not a headline, not a topic roundup — written from all the outlets that covered it, with a short summary up front and the full report and its sources one click down.",
    howItsUsed:
      "Pick topics and preferred sources at signup. Ask for the day's news. Read the feed, expand anything worth more than a summary, bookmark what you want to keep, and walk back through previous days from the history view. That is the whole loop. It is built to be a five-minute morning habit rather than somewhere you lose an hour.",
    stack: {
      pipeline:
        "RSS ingest → local embedding-based clustering → Claude Haiku notability triage → Claude Sonnet card writing → ranked front page.",
      details: [
        "The tiering is the design, not an optimization bolted on afterwards. Embeddings run locally and cost nothing, so clustering several hundred articles is free. Haiku is cheap enough to ask “is this worth writing about?” of every cluster. Sonnet only ever sees the clusters that survived triage.",
        "Next.js, with Supabase for Postgres and managed authentication.",
        "A late pass cut the cost of one digest from $1.944 to $0.399 — 79.5% — by taking Claude calls from 930 down to 107. The target was $0.30. It missed, and $0.399 is the real number.",
      ],
    },
    limits: [
      "It is not deployed. It runs locally, for one person. There are no users.",
      "“Today” is a UTC day, not yours. Generate a digest on an Atlanta evening and it can reclassify itself as yesterday before you have read it.",
      "Two outlets covering one story sometimes still produce two cards. The clustering is good, not solved.",
      "There is no password reset.",
      "Backgrounding the tab while a digest is generating hides the new cards until you reload.",
    ],
    origin: null,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
