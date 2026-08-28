import type { Metadata } from "next";
import { Fira_Sans, Fira_Code } from "next/font/google";
import { ThemeScript } from "@/components/theme-toggle";
import "./globals.css";

// MASTER.md §3 — typography.csv "Dashboard Data" (Fira Code + Fira Sans).
// Weights trimmed to the five the §3.2 role table actually uses.
const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

import { rootMetadata } from "@/lib/site";

// Link previews matter more here than on most sites: the way anyone arrives is
// Tarek pasting the URL into an application form, a LinkedIn message or an email
// to a recruiter — so the card is read BEFORE the site is. Without these tags the
// paste renders as a bare URL or an empty grey box.
//
// Everything is assembled in lib/site.ts so the homepage cannot drift from the
// rest of the site. It did, twice: read the note there before changing any of it.
export const metadata: Metadata = rootMetadata();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${firaSans.variable} ${firaCode.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
