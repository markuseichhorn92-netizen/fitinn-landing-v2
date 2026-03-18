import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CookieBanner, ConditionalAnalytics } from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LazyLiveChat } from "@/components/LazyLiveChat";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#fafafa',
}

export const metadata: Metadata = {
  title: {
    default: "Abnehmen in Trier | Stoffwechsel-Programm happyfigur – FIT-INN",
    template: "%s | happyfigur – FIT-INN Trier",
  },
  description: "Abnehmen in Trier: 8-Wochen Stoffwechsel-Programm mit Körperanalyse, Trainings- & Ernährungsplan. Bis zu 100 % von der Krankenkasse erstattet (§ 20 SGB V). Kostenloses Probetraining im FIT-INN Trier buchen!",
  keywords: [
    "Abnehmen Trier", "Stoffwechsel Trier", "Stoffwechsel anregen Trier",
    "Gewicht verlieren Trier", "happyfigur", "FIT-INN Trier",
    "Fitnessstudio Trier", "Abnehmprogramm Trier", "Ernährungsberatung Trier",
    "Krankenkasse Fitness", "§ 20 SGB V", "Präventionskurs Trier",
    "Ernährungsplan", "Körperanalyse", "Probetraining Trier",
    "Personal Training Trier", "Gesundheitskurs Trier",
    "Stoffwechseltraining", "Abnehmen mit Krankenkasse",
  ],
  authors: [{ name: "FIT-INN Trier" }],
  creator: "FIT-INN Trier",
  publisher: "FIT-INN Trier",
  metadataBase: new URL("https://happyfigur.fit-inn-trier.de"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://happyfigur.fit-inn-trier.de",
    siteName: "happyfigur – FIT-INN Trier",
    title: "Abnehmen in Trier | Stoffwechsel-Programm happyfigur – FIT-INN",
    description: "Abnehmen in Trier: 8-Wochen Stoffwechsel-Programm mit Körperanalyse & individuellem Trainings- und Ernährungsplan. Bis zu 100 % von der Krankenkasse erstattet. Kostenloses Probetraining buchen!",
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
    title: "Abnehmen in Trier | Stoffwechsel-Programm happyfigur – FIT-INN",
    description: "8-Wochen Stoffwechsel-Programm zum Abnehmen in Trier. Bis zu 100 % von der Krankenkasse erstattet. Kostenloses Probetraining buchen!",
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
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthClub",
              name: "FIT-INN Trier",
              description: "Abnehmen in Trier: Fitnessstudio mit zertifiziertem Stoffwechsel-Programm happyfigur – 8 Wochen gezieltes Training & Ernährung zum Abnehmen, bis zu 100 % von der Krankenkasse erstattet.",
              url: "https://happyfigur.fit-inn-trier.de",
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
                "https://www.instagram.com/fit_inn_trier/",
                "https://www.facebook.com/FitInnFeyen",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "happyfigur Präventionskurs",
                itemListElement: [{
                  "@type": "Offer",
                  name: "happyfigur 8-Wochen Stoffwechsel-Programm zum Abnehmen",
                  description: "Zertifizierter Präventionskurs nach § 20 SGB V: Stoffwechseltraining, Körperanalyse, individueller Trainings- und Ernährungsplan zum Abnehmen in Trier",
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
        <LazyLiveChat />
      </body>
    </html>
  );
}
