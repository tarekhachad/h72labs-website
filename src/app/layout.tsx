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

export const metadata: Metadata = {
  title: "H72 Labs",
  description: "H72 Labs builds AI tools that turn noisy information into clarity.",
};

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
