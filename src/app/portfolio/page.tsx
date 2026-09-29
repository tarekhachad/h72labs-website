import type { Metadata } from "next";
import { products } from "@/content/products";
import { PageShell, Frame, FrameBody } from "@/components/frame";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ProductCarousel } from "@/components/product-carousel";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  // Not "everything H72 Labs has built": a description that sizes the body of
  // work claims more than one live, invite-only product with no users supports.
  // The honesty rule reaches metadata.
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
