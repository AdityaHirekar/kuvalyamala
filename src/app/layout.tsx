import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Frame from "@/components/ui/Frame";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kuvalaya-mālā: Story of a Crown without Peace",
  description: "An interactive journey through the 8th-century Jain text by Uddyotana Sūri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${inter.variable} antialiased font-sans bg-paper text-ink`}
      >
        <Frame />
        {children}
      </body>
    </html>
  );
}
