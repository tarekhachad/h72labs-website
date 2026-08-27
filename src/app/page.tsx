import { products } from "@/content/products";
import { Frame, LabelStrip, Section } from "@/components/frame";
import { ProductList } from "@/components/product-card";
import { SiteHeader, SiteFooter, ContactAddress } from "@/components/site-chrome";

// UI_DESIGN §5.1 — section order is CLOSED (§3.3). Two independent sources agreed
// on it. Do not reorder.
export default function Home() {
  return (
    <main className="p-page">
      <Frame>
        <SiteHeader />

        {/* The thesis, verbatim and never paraphrased (UI_DESIGN §1). No
            illustration, no gradient, no background graphic behind it. */}
        <Section>
          <h1 className="max-w-[19ch] text-[clamp(1.7rem,3.9vw,2.75rem)] font-medium leading-[1.22] tracking-[-0.02em] text-balance">
            H72 Labs builds AI tools that turn noisy information into clarity.
          </h1>
        </Section>

        <LabelStrip>Portfolio</LabelStrip>
        <div className="border-b border-line">
          <ProductList products={products} />
        </div>

        <LabelStrip>Founder</LabelStrip>
        <Section>
          {/* The only place on the site with a human voice rather than an
              instrument's. Keep it short so the contrast stays sharp. §5.1.4 */}
          <p className="max-w-[56ch] text-[1.0625rem] leading-relaxed">
            I&apos;m Tarek Hachad. I build these on my own — the design, the code, and the
            unglamorous parts in between. H72 Labs is where that work lives. Right now there is one
            product and it isn&apos;t finished; when it is, this page will say so.
          </p>
        </Section>

        <LabelStrip>Contact</LabelStrip>
        <Section>
          <ContactAddress />
        </Section>

        <SiteFooter />
      </Frame>
    </main>
  );
}
