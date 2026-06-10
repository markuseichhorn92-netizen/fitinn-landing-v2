'use client'

import { Phone, Instagram, Facebook, MessageCircle } from 'lucide-react'

import { Navbar } from '@/components/Navbar'
import { StickyBar } from '@/components/StickyBar'
import { HeroSection } from '@/components/sections/HeroSection'
import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { FahrplanSection } from '@/components/sections/FahrplanSection'
import { PaketSection } from '@/components/sections/PaketSection'
import { KochbuchSection } from '@/components/sections/KochbuchSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { PreisSection } from '@/components/sections/PreisSection'
import { BookingSection } from '@/components/sections/BookingSection'
import { FAQSection } from '@/components/sections/FAQSection'

export default function Home() {
  // Jede Sektion mit CTA-Button braucht onCta — fehlendes Prop = toter Button
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen pt-16">
      <Navbar onCta={scrollToBooking} />

      <HeroSection onCta={scrollToBooking} />
      <MarqueeBanner />
      <ProblemSection />
      <FahrplanSection />
      <PaketSection onCta={scrollToBooking} />
      <KochbuchSection onCta={scrollToBooking} />
      <Testimonials />
      <PreisSection onCta={scrollToBooking} />
      <BookingSection />
      <FAQSection />

      {/* ═══════════════════════════════════════
          FOOTER — 4 Columns
          ═══════════════════════════════════════ */}
      <footer className="border-t border-border py-12 px-5 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-10">
            {/* Col 1: Kontakt */}
            <div className="col-span-2 md:col-span-1">
              <p className="font-bold mb-3">FIT-INN Trier</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Auf Hirtenberg 8<br />54296 Trier
              </p>
              <div className="mt-3 space-y-2">
                <a href="tel:+49651308524" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-3.5 h-3.5" /> 0651 308524
                </a>
                <a href="https://wa.me/4915679610457" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Col 2: Programm */}
            <div>
              <p className="font-bold mb-3 text-sm">Programm</p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="#booking" className="hover:text-foreground transition-colors">Probetraining buchen</a>
                <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
              </div>
            </div>

            {/* Col 3: Social */}
            <div>
              <p className="font-bold mb-3 text-sm">Social Media</p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="https://www.instagram.com/fit_inn_trier/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Instagram className="w-3.5 h-3.5" /> Instagram
                </a>
                <a href="https://www.facebook.com/FitInnFeyen" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Facebook className="w-3.5 h-3.5" /> Facebook
                </a>
              </div>
            </div>

            {/* Col 4: Rechtliches */}
            <div>
              <p className="font-bold mb-3 text-sm">Rechtliches</p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="/impressum" className="hover:text-foreground transition-colors">Impressum</a>
                <a href="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</a>
                <a href="/agb" className="hover:text-foreground transition-colors">AGB</a>
                <a href="/widerruf" className="hover:text-foreground transition-colors">Widerruf</a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center mb-6">
            <p className="text-xs text-muted-foreground">© 2026 FIT-INN Trier. Alle Rechte vorbehalten.</p>
          </div>

          {/* Legal Disclaimers */}
          <div className="pb-16 text-xs text-muted-foreground max-w-3xl mx-auto space-y-2">
            <p><strong className="text-foreground/60">¹ Preis & Zahlung:</strong> Der Programmpreis von 69€ (inkl. MwSt.) für das 30 Tage Bauchweg Projekt ist bei Programmstart an FIT-INN Trier zu entrichten. Keine Mitgliedschaft, keine automatische Verlängerung. Das Probetraining ist davon unabhängig und kostenlos.</p>
            <p><strong className="text-foreground/60">² Probetraining:</strong> Das Probetraining im FIT-INN Trier ist kostenlos und unverbindlich. Es entsteht keine Verpflichtung zur Teilnahme am Programm.</p>
            <p><strong className="text-foreground/60">³ Verfügbarkeit:</strong> Die Teilnehmerzahl pro Durchgang ist begrenzt, um eine persönliche Betreuung zu gewährleisten. Termine nach Verfügbarkeit.</p>
            <p><strong className="text-foreground/60">⁴ Ergebnisse & Hinweis:</strong> Angaben wie „bis zu 5–10 kg weniger“ beruhen auf Erfahrungswerten; individuelle Ergebnisse können variieren und hängen u. a. von Ausgangsgewicht, Ernährung und Trainingsumfang ab. Eine Erfolgsgarantie wird nicht übernommen. Das Programm ersetzt keinen ärztlichen Rat. Nicht geeignet für Minderjährige, Schwangere, Stillende oder Personen mit Essstörungen oder akuten Erkrankungen, die ärztliche Betreuung erfordern. Im Zweifel sprich vorher mit deinem Arzt.</p>
          </div>
        </div>
      </footer>

      <StickyBar onCta={scrollToBooking} />
    </main>
  )
}
