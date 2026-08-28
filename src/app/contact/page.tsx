import type { Metadata } from "next";
import { PageShell, Frame, FrameBody, LabelStrip } from "@/components/frame";
import { SiteHeader, SiteFooter, ContactAddress, Portrait } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Contact — H72 Labs",
  description: "Get in touch with H72 Labs.",
};

// UI_DESIGN §5.4: the address, and nothing else. No form, no fields,
// nothing that can fail silently.
export default function ContactPage() {
  return (
    <PageShell>
      <Frame>
        <SiteHeader />
        <FrameBody>
          <LabelStrip>Contact</LabelStrip>
          <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.62fr)]">
            <div className="flex flex-col items-center justify-center gap-4 p-cell text-center">
              <ContactAddress className="font-mono text-[clamp(1.4rem,3vw,2.4rem)] text-accent transition-opacity hover:opacity-80" />
              <p className="max-w-[46ch] leading-relaxed text-dim">
                One person reads this address. Expect a reply from Tarek, not a ticket number.
              </p>
            </div>
            {/* MEASURED, not assumed. The source is square (1630x1630) and
                object-fit: cover always crops the axis the container is longer in.

                At xl the column is TALLER than wide, so the WIDTH is cropped:
                0% vertically, and horizontally 12% at 1512x820, 23% at 1920x1080,
                45% at 2560x1440. The face is centred in the source, so object-center
                is right and a vertical bias would be inert.

                BELOW xl the axis FLIPS. The block was `w-full max-h-[60vh]`, which at
                1279x800 measured 1194x480 — wider than tall — and cropped 60% of the
                HEIGHT, cutting off the top of the head and the chin. It rendered as a
                horizontal band, not a portrait. Fixed by constraining the block to a
                centred square below xl so the container matches the source's shape and
                nothing is cropped at all. Verified by looking at it; the measurement
                alone did not reveal how bad it was. */}
            <div className="flex min-h-0 justify-center border-t border-line p-cell xl:block xl:border-l xl:border-t-0 xl:p-0">
              <Portrait
                priority
                className="aspect-square w-full max-w-[340px] object-cover object-center xl:aspect-auto xl:h-full xl:max-w-none"
              />
            </div>
          </div>
        </FrameBody>
        <SiteFooter />
      </Frame>
    </PageShell>
  );
}
