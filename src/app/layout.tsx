import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CookieBanner, ConditionalAnalytics } from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LiveChat } from "@/components/LiveChat";

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
  title: {
    default: "happyfigur | Dein Weg zum Wunschgewicht – FIT-INN Trier",
    template: "%s | happyfigur – FIT-INN Trier",
  },
  description: "8-Wochen-Programm mit Körperanalyse, individuellem Trainings- & Ernährungsplan. Bis zu 100 % von der Krankenkasse erstattet (§ 20 SGB V). Jetzt kostenloses Probetraining buchen!",
  keywords: [
    "happyfigur", "FIT-INN Trier", "Abnehmen Trier", "Fitnessstudio Trier",
    "Krankenkasse Fitness", "§ 20 SGB V", "Präventionskurs",
    "Ernährungsplan", "Körperanalyse", "Probetraining", "Wunschgewicht",
    "Personal Training Trier", "Gesundheitskurs Trier",
  ],
  authors: [{ name: "FIT-INN Trier" }],
  creator: "FIT-INN Trier",
  publisher: "FIT-INN Trier",
  metadataBase: new URL("https://fitinn-trier.de"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://fitinn-trier.de",
    siteName: "happyfigur – FIT-INN Trier",
    title: "happyfigur | Dein Weg zum Wunschgewicht – FIT-INN Trier",
    description: "8-Wochen-Programm mit Körperanalyse & individuellem Trainings- und Ernährungsplan. Bis zu 100 % von der Krankenkasse erstattet. Jetzt kostenloses Probetraining buchen!",
    images: [
      {
        url: "/Download.jpg",
        width: 1200,
        height: 630,
        alt: "happyfigur Programm – FIT-INN Trier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "happyfigur | Dein Weg zum Wunschgewicht – FIT-INN Trier",
    description: "8-Wochen-Programm mit Körperanalyse. Bis zu 100 % von der Krankenkasse erstattet. Kostenloses Probetraining buchen!",
    images: ["/Download.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/Download.jpg",
    apple: "/Download.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthClub",
              name: "FIT-INN Trier",
              description: "Fitnessstudio in Trier mit zertifiziertem Präventionskurs happyfigur – 8 Wochen Training & Ernährung, bis zu 100 % von der Krankenkasse erstattet.",
              url: "https://fitinn-trier.de",
              telephone: "+49651308524",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Auf Hirtenberg 8",
                addressLocality: "Trier",
                postalCode: "54296",
                addressCountry: "DE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 49.7492,
                longitude: 6.6371,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
                bestRating: "5",
              },
              priceRange: "€€",
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "06:00", closes: "22:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "14:00" },
              ],
              sameAs: [
                "https://www.instagram.com/fitinn_trier",
                "https://www.facebook.com/fitinntrier",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "happyfigur Präventionskurs",
                itemListElement: [{
                  "@type": "Offer",
                  name: "happyfigur 8-Wochen-Programm",
                  description: "Zertifizierter Präventionskurs nach § 20 SGB V mit Körperanalyse, Trainings- und Ernährungsplan",
                  price: "179",
                  priceCurrency: "EUR",
                }],
              },
            }),
          }}
        />
      </head>
      <body className={`${barlow.variable} ${barlowCondensed.variable}`}>
        <ScrollProgress />
        {children}
        <CookieBanner />
        <ConditionalAnalytics />
        <Analytics />
        <SpeedInsights />
        <LiveChat />
      </body>
    </html>
  );
}
