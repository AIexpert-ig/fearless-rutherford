import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400","700"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400","600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Axc Concierge – Luxury Travel",
  description: "Private journeys for high‑net‑worth individuals. Zero compromises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-alabaster font-body">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
