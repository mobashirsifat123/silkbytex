import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import GlobalAtmosphere from "@/components/layout/GlobalAtmosphere";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://silkbytex.com"),
  title: {
    default: "SilkByteX — Premium Software Studio",
    template: "%s | SilkByteX",
  },
  description:
    "We weave the future of software. SilkByteX is a premium software agency crafting world-class digital experiences.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SilkByteX",
    title: "SilkByteX — Premium Software Studio",
    description:
      "We weave the future of software. SilkByteX is a premium software agency crafting world-class digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="relative min-h-screen overflow-x-hidden">
        <GlobalAtmosphere />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
