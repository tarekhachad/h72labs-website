import type { Metadata } from "next";
import { Frame, LabelStrip, Section } from "@/components/frame";
import { SiteHeader, SiteFooter, ContactAddress } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Contact — H72 Labs",
  description: "Get in touch with H72 Labs.",
};

// UI_DESIGN §5.4: the address, and nothing else. No form, no fields,
// nothing that can fail silently.
export default function ContactPage() {
  return (
    <main className="p-page">
      <Frame>
        <SiteHeader />
        <LabelStrip>Contact</LabelStrip>
        <Section>
          <ContactAddress />
          <p className="mt-6 max-w-[56ch] leading-relaxed text-dim">
            One person reads this address. Expect a reply from Tarek, not a ticket number.
          </p>
        </Section>
        <SiteFooter />
      </Frame>
    </main>
  );
}
