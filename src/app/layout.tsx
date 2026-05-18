import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/common/SmoothScroll";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://silkbytex.com"),
  title: "SilkByteX | Digital Creative Studio",
  description:
    "SilkByteX is a creative digital studio that handcrafts products, brands, and experiences.",
  icons: {
    icon: [
      { url: "/brand/silkbytex-logo-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/silkbytex-logo-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/brand/silkbytex-apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "SilkByteX | Digital Creative Studio",
    description:
      "SilkByteX is a creative digital studio that handcrafts products, brands, and experiences.",
    type: "website",
    images: [
      {
        url: "/brand/silkbytex-logo-512.png",
        width: 512,
        height: 512,
        alt: "SilkByteX logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "SilkByteX | Digital Creative Studio",
    description:
      "SilkByteX is a creative digital studio that handcrafts products, brands, and experiences.",
    images: ["/brand/silkbytex-logo-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} antialiased`}
    >
      <body className="relative min-h-screen bg-[#f2f0ee] text-[#0d0d0d] font-sans overflow-x-hidden">
        <SmoothScroll>
          <div className="relative z-10">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
