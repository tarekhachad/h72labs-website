import type { Metadata } from "next";
import { products } from "@/content/products";
import { PageShell, Frame, FrameBody } from "@/components/frame";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ProductCarousel } from "@/components/product-carousel";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  // Not "everything H72 Labs has built" — the one entry is labelled in
  // development everywhere else on the site, and a description implying
  // delivered work would contradict it. The honesty rule reaches metadata.
  description: "H72 Labs' product portfolio, with a detail page for each.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <PageShell>
      <Frame>
        <SiteHeader />
        <FrameBody>
          <ProductCarousel products={products} />
        </FrameBody>
        <SiteFooter />
      </Frame>
    </PageShell>
  );
}
