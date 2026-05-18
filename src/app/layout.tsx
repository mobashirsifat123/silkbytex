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
  title: "SilkByteX | Digital Creative Studio",
  description:
    "SilkByteX is a creative digital studio that handcrafts products, brands, and experiences.",
  openGraph: {
    title: "SilkByteX | Digital Creative Studio",
    description:
      "SilkByteX is a creative digital studio that handcrafts products, brands, and experiences.",
    type: "website",
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
