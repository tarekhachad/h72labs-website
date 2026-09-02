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

/**
 * One real capture of a running product. See `Product.screenshots`.
 *
 * `src` is the 16:10 master. The optional variants are the same SCREEN of the
 * product recaptured at another aspect ratio, for slots whose box is a different
 * shape — not crops of the master, because cropping a 16:10 feed to a square
 * would slice the cards' left and right edges off. Recapturing lets the product's
 * own responsive layout fill each shape.
 *
 * SAME SCREEN, NOT NECESSARILY THE SAME MOMENT — corrected 2026-09-01, and the
 * distinction is load-bearing. THE POLICY, which outlives any one capture: no two
 * PAGES of this site show the same edition. Variants that used to come from a
 * single digest run put the identical stories on the landing page, the
 * portfolio and the detail page, and a reader cannot tell from that whether the
 * product writes a new edition each day or one canned page. So they are captured
 * on DIFFERENT DAYS, and `capturedOn` is the day behind a given asset. How that
 * was carried out is stated once, beside `screenshots` below, not here.
 *
 * The consequence for anyone editing this file: `alt` is shared across a
 * Screenshot's variants, so it may only state what is true of every variant on
 * every one of those days — which in practice means describing the SHAPE of the
 * screen (a lead card, its controls, further cards below) and never a headline, a
 * topic, a card count that differs, or a date.
 *
 * Why they exist at all: every slot draws the image with `object-cover`, which
 * fills the box and crops the overflowing axis. Give it a source whose aspect
 * matches the box and there is neither a crop nor a band of empty white inside
 * the border. Give it a mismatched one and you must pick which of those two you
 * want. A slot with no matching variant therefore falls back to `contain`, which
 * shows the whole capture and accepts the band.
 */
export type ScreenshotAsset = {
  src: string;
  /**
   * The asset's REAL pixel dimensions. Carried per variant, not assumed, because
   * `next/image` derives the reserved aspect ratio from these before the file is
   * decoded — hardcoding one pair for all three variants told the browser the
   * 1:1 and 23:20 captures were 16:10 and reintroduced exactly the layout shift
   * the props exist to prevent.
   */
  width: number;
  height: number;
  /**
   * The date of the product run this asset was captured on, ISO `YYYY-MM-DD`.
   * NOTHING RENDERS THIS. It exists because the variants are deliberately
   * captured on different days (see the type doc above) and provenance had been
   * living only in a hand-written comment — which is precisely the thing that
   * goes stale when one variant is recaptured and the prose beside it is not.
   *
   * BE CLEAR ABOUT WHAT THIS BUYS, because it is less than it looks. Required
   * rather than optional means a NEW asset cannot be added without stating a day
   * — `tsc` catches the omission. It cannot catch a STALE value: swap in a fresh
   * .webp, leave this at the day the file it replaced was taken, and everything
   * still compiles and ships a date that lies. Nothing in the type system can know
   * what is inside a .webp — and the type is a bare `string`, so it will not catch
   * a malformed date either. The real guard is the recipe in
   * docs/internal/(C) ROADMAP.md, which lists updating this field as a step of
   * every recapture alongside rewriting the alt text.
   */
  capturedOn: string;
};

export type Screenshot = {
  /** 16:10 — the product detail page's two-up row. */
  master: ScreenshotAsset;
  alt: string;
  /** 1:1 — the landing page's product card. */
  square?: ScreenshotAsset;
  /** 23:20 — the portfolio carousel panel. */
  card?: ScreenshotAsset;
};

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
  /**
   * Detail page, block 6 — one line framing the list, then the list itself,
   * both stated flatly with no softening.
   *
   * THE HONESTY RULE BINDS THIS FIELD. As of 2026-08-27 PNA v1 closed on
   * 2026-08-15 and Roadmap V2 has not started, so this may NOT claim the product
   * is actively being worked on — nobody is working on it today. "Still in
   * development" is true because it matches the status line already carried
   * elsewhere on the site; "actively being worked on" would not be.
   */
  limitsFraming: string;
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
  /**
   * Detail page, block 4. Real captures of the running product, or an empty
   * array — never a stock image and never a mockup.
   *
   * THE HONESTY RULE BINDS THIS FIELD TOO. A screenshot is a claim that the
   * product does the thing pictured, so a capture may only come from the real
   * app in a real run. `alt` says what is actually on screen; it is not a place
   * to describe a capability the shot doesn't show.
   *
   * An empty list renders the honest empty frame, which is why this is a list
   * rather than a fixed pair: a future product with no captures yet must degrade
   * to the placeholder rather than borrow this one's.
   *
   * RESOLVED 2026-08-31: the landing product card and the portfolio carousel now
   * BOTH read this field and render `screenshots[0]`, each through the aspect
   * variant that matches its slot. They previously showed an unconditional empty
   * `ShotFrame` while the detail page had real captures, which was the
   * inconsistency this note used to flag as open. MASTER.md §5.2 card anatomy is
   * unchanged — a screenshot slot was always part of it; only its contents were
   * missing.
   *
   * TYPED AS AT MOST TWO, not `Screenshot[]`, because block 4 has exactly two
   * slots and renders no more. As a plain array a third entry would compile,
   * ship, and be silently dropped with nothing to notice it; as a bounded tuple
   * `tsc` refuses it and whoever adds it has to decide what the layout does.
   */
  screenshots: readonly [] | readonly [Screenshot] | readonly [Screenshot, Screenshot];
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
      ],
    },
    limitsFraming: "Still in development — these are the known gaps, not hidden ones.",
    limits: [
      "It is not deployed. It runs locally, for one person. There are no users.",
      "“Today” is a UTC day, not yours. Generate a digest on an Atlanta evening and it can reclassify itself as yesterday before you have read it.",
      "Two outlets covering one story sometimes still produce two cards. The clustering is good, not solved.",
      "There is no password reset.",
      "Backgrounding the tab while a digest is generating hides the new cards until you reload.",
    ],
    origin: null,
    // ONE DIGEST PER PAGE — the rollout of the policy stated in the
    // `ScreenshotAsset` type doc above. Decided 2026-08-31 (Tarek's call);
    // COMPLETE 2026-09-02. It ran one capture a morning across three days,
    // because a digest only exists on the day it is generated; that is why it was
    // filed in the ROADMAP under "Deferred — needs elapsed time" rather than done
    // in one sitting. The finish condition was per PAGE, not per asset: the detail
    // page's two slots are one digest seen two ways (the feed, then a story from
    // that same feed expanded), so those two share a `capturedOn` and that is
    // correct — three pages, three editions, four assets.
    //
    // DO NOT restate the per-asset dates here. Read `capturedOn` below — it is the
    // state, per asset, and duplicating it in prose is how three review rounds
    // running found a comment claiming something the assets no longer said.
    // Recipe, aspects and capture viewports live in ONE other place:
    // docs/internal/(C) ROADMAP.md → "Deferred — needs elapsed time".
    //
    // EVERY capture below comes from a real digest run against live RSS feeds, on a
    // throwaway account so no personal data is in frame — see `capturedOn` on each
    // asset for which day's run. Login, signup and onboarding are deliberately not
    // pictured: they are the least finished screens in the product.
    //
    // Captured at NATIVE retina resolution rather than downscaled to 1800px as the
    // first set was: the portfolio panel alone renders 948 CSS px, which needs 1896
    // real pixels on a retina screen, and the old assets could not supply them.
    // They looked soft, and on a site whose whole argument is craft that reads as
    // sloppiness. Three are a straight 2x (3280x2050, 2800x2800, 2460x1536). THE
    // CARD CROP IS NOT 2x — it is dsf 2.35, giving 3852x3349, so that its long edge
    // clears Next's largest srcset bucket (3840w). Below that the browser is handed
    // a 3840w descriptor for a smaller file, infers a density from the descriptor,
    // and at DPR3 lays the hugged box out 10-22% smaller than it should. Keep any
    // recapture of this variant above 3840px on its long edge.
    //
    // WHAT THEY ACTUALLY SHOW, stated precisely because the temptation is to
    // claim they cover all of block 2's sentence. Each feed variant leads with one
    // complete story card — topic label, headline, subject tags, summary, a save
    // control and a source count — followed by further cards: two in the 16:10
    // master, four (two rows) in the square and card crops. THE CLIPPING DIFFERS
    // per variant, and three earlier versions of this sentence each described it
    // wrongly. What is true of the assets now shipped: the MASTER was captured
    // from a 1640x1025 viewport at dsf 2 (= the 3280x2050 file), its one further
    // row of two cards fully rendered with 15px of gutter below it; the SQUARE
    // crop's last row is complete including its "Save / Sources" footer; and the
    // CARD crop came from a 1639x1425 viewport at dsf 2.35 (= the 3852x3349 file).
    // Both those heights were picked precisely so the bottom edge falls in the
    // gutter BELOW the last row rather than flush against that row's body copy,
    // which is how the card read before (text running into the 1px rule with no
    // footer and no margin — the frame's most prominent image looking truncated).
    //
    // The capture viewport is re-measured against each new digest rather than
    // carried over: the cards are a different height every day, so a bottom edge
    // that cuts in the gutter is a property of that day's digest, not of the
    // number that worked last time. The measurement procedure and the numbers it
    // produced live in the ROADMAP, not here.
    //
    // The report shot shows a topic label, a headline, the grey summary and the
    // opening paragraphs of the multi-paragraph report, which runs past the bottom
    // edge. NEITHER SHOWS THE SOURCE LIST: the feed has only the "Sources (n)"
    // affordance, and the report is cut off well above its list. So these evidence "a
    // short summary up front and the full report", and not yet "and its sources one
    // click down". A capture of the opened source list would close that gap.
    screenshots: [
      {
        master: { src: "/pna-feed.webp", width: 3280, height: 2050, capturedOn: "2026-09-02" },
        square: { src: "/pna-feed-square.webp", width: 2800, height: 2800, capturedOn: "2026-08-31" },
        card: { src: "/pna-feed-card.webp", width: 3852, height: 3349, capturedOn: "2026-09-01" },
        // One alt for all three variants, so it may only claim what is true of
        // every one of them. They differ in how many cards fit — the counts are in
        // the "WHAT THEY ACTUALLY SHOW" block above — hence "further story cards"
        // rather than a count. Scoped to the lead card because it is the only one
        // whose footer is fully in frame in every variant; an earlier version said
        // "each" and was wrong.
        //
        // The variants are also DIFFERENT DAYS' digests, so this sentence has to
        // survive a change of content as well as a change of crop. RE-VERIFY IT
        // WHENEVER ANY `capturedOn` ABOVE CHANGES — open the new file and read
        // the alt clause by clause against it (topic label, headline, subject tags,
        // summary, save control, source count, further cards below). It held at the
        // last check; it is not guaranteed to hold at the next, because a digest
        // with one story or one source renders a different card. Anything
        // day-specific — a headline, a topic, a count — would have to move to a
        // per-variant alt first.
        //
        // KNOWN AND ACCEPTED, not an oversight: because this alt describes only the
        // SHAPE of the screen, a screen-reader user gets no signal about WHICH
        // edition any slot holds, however many distinct ones are in play. So the
        // "a new edition every day" argument the varied captures exist to make is
        // visual only. Stating the day in the alt would mean splitting one alt into
        // three, and a date read aloud is a weaker claim than it looks: a reader
        // hears one date, not a series. The honest fix, if this matters later, is
        // prose in block 2 saying the captures are different days, which every
        // reader gets.
        alt: "The front page of the news reader: a lead story card with its topic label, headline, subject tags, summary, a save control and a source count, with further story cards below it.",
      },
      {
        master: { src: "/pna-report.webp", width: 2460, height: 1536, capturedOn: "2026-09-02" },
        // The grey summary IS in frame and the alt says so. A previous version
        // claimed it was not — true of the earlier, smaller capture, which clipped
        // it, and quietly false once the shot was retaken at a since-superseded
        // 1800x1125 (that figure is history, not this file's size — see `width`
        // above). A comment asserting the absence of something is only as good as
        // the asset it was written against, and this one outlived its asset by one
        // recapture. It nearly did so again: generating the report scrolls the
        // panel's own scroll container down to the report paragraph, which drops
        // the summary out of frame with nothing to show for it. The capture is
        // taken with that container reset to the top.
        alt: "A single story expanded to full width: its topic label, headline, the short summary in grey, then the opening paragraphs of the full report beneath it, running past the bottom of the frame.",
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
