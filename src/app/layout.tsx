import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CookieBanner, ConditionalAnalytics } from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#faf4ea',
}

export const metadata: Metadata = {
  title: {
    default: "30 Tage Bauchweg Projekt in Trier | FIT-INN",
    template: "%s | FIT-INN Trier",
  },
  description: "Das 30 Tage Bauchweg Projekt in Trier: Stoffwechsel-Training, Ernährungsplan, Kochbuch mit 100 Rezepten & persönliche Betreuung. Jetzt kostenloses Probetraining im FIT-INN Trier buchen!",
  keywords: [
    "Bauchweg Trier", "Bauchfett verlieren Trier", "Abnehmen Trier",
    "Stoffwechsel Trier", "30 Tage Programm", "FIT-INN Trier",
    "Fitnessstudio Trier", "Abnehmprogramm Trier", "Ernährungsberatung Trier",
    "Probetraining Trier", "Körperanalyse Trier", "Stoffwechseltraining",
    "Strandfigur", "Bauchumfang reduzieren",
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
    siteName: "FIT-INN Trier",
    title: "30 Tage Bauchweg Projekt in Trier | FIT-INN",
    description: "30 Tage Bauchweg Projekt: Stoffwechsel-Training, Ernährungsplan & persönliche Betreuung im FIT-INN Trier. Kostenloses Probetraining buchen!",
    images: [
      {
        url: "/Download.jpg",
        width: 1200,
        height: 630,
        alt: "30 Tage Bauchweg Projekt – FIT-INN Trier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "30 Tage Bauchweg Projekt in Trier | FIT-INN",
    description: "30 Tage Bauchweg Projekt im FIT-INN Trier. Kostenloses Probetraining buchen!",
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
              description: "Fitnessstudio in Trier mit dem 30 Tage Bauchweg Projekt: Stoffwechsel-Training, Ernährungsplan, Kochbuch und persönliche Betreuung.",
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
              priceRange: "€",
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
                name: "30 Tage Bauchweg Projekt",
                itemListElement: [{
                  "@type": "Offer",
                  name: "30 Tage Bauchweg Projekt",
                  description: "30-Tage-Programm mit Stoffwechsel-Training im Studio, Ernährungsplan, Kochbuch mit 100 Rezepten, digitaler Lernplattform, WhatsApp-Support und 3 Körperanalysen",
                  price: "69",
                  priceCurrency: "EUR",
                }],
              },
            }),
          }}
        />
      </head>
      <body className={jakarta.variable}>
        <ScrollProgress />
        {children}
        <CookieBanner />
        <ConditionalAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
