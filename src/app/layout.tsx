import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  title: "happyfigur | Dein Weg zum Wunschgewicht – FIT-INN Trier",
  description: "8-Wochen Programm mit 3x Körperanalyse. Finde heraus, wie du mit begleitetem Training endlich dein Wunschgewicht erreichst. Bis zu 100% von der Krankenkasse erstattet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body className={`${barlow.variable} ${barlowCondensed.variable}`}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
