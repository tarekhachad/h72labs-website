import type { Metadata } from "next";
import { products } from "@/content/products";
import { Frame, LabelStrip } from "@/components/frame";
import { ProductList } from "@/components/product-card";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Portfolio — H72 Labs",
  description: "What H72 Labs is building.",
};

export default function PortfolioPage() {
  return (
    <main className="p-page">
      <Frame>
        <SiteHeader />
        <LabelStrip>
          Portfolio — {products.length} {products.length === 1 ? "product" : "products"}
        </LabelStrip>
        <ProductList products={products} />
        <div className="border-t border-line">
          <SiteFooter />
        </div>
      </Frame>
    </main>
  );
}
