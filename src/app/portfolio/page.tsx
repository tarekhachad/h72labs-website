import type { Metadata } from "next";
import { products } from "@/content/products";
import { PageShell, Frame, FrameBody } from "@/components/frame";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ProductCarousel } from "@/components/product-carousel";

export const metadata: Metadata = {
  title: "Portfolio — H72 Labs",
  description: "What H72 Labs is building.",
};

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
