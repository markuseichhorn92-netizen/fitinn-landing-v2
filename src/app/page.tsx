'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, Shield, Phone, MessageCircle, Instagram, Facebook } from 'lucide-react'
import { openLiveChat } from '@/lib/livechat'
import { useScrollReveal, useCountUp } from '@/hooks/useScrollReveal'
import { Navbar } from '@/components/Navbar'
import { GrainOverlay } from '@/components/GrainOverlay'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { SolutionSection } from '@/components/sections/SolutionSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { TrainerSection } from '@/components/sections/TrainerSection'
import { InsuranceCalculator } from '@/components/sections/InsuranceCalculator'
import { GuaranteeSection } from '@/components/sections/GuaranteeSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ArchitectureSection } from '@/components/sections/ArchitectureSection'
import { InsuranceBenchmark } from '@/components/InsuranceBenchmark'
import { DecoIcons, problemIcons, solutionIcons, processIcons, testimonialIcons, trainerIcons, insuranceIcons, guaranteeIcons, faqIcons, ctaIcons } from '@/components/SectionDecorations'

export default function Home() {
  const router = useRouter()
  const startQuiz = () => router.push('/quiz')

  return (
    <main className="min-h-screen overflow-x-hidden">
      <GrainOverlay />
      <Navbar onStartQuiz={startQuiz} />

      {/* ═══════════════════════════════════════
          HERO — Clean, centered, KPI Dashboard
          ═══════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-end pt-20 pb-24 px-5">
        {/* Hero background image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/hero-bg.avif"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top md:object-[right_top] opacity-25 md:opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>

        {/* Eyebrow — positioned higher */}
        <div className="absolute top-28 left-0 right-0 z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/15 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Das 8-Wochen Programm in Trier
            </span>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold leading-[0.95] mb-6 animate-fade-up delay-100">
            Abnehmen in Trier —<br />
            <span className="text-primary">mit System statt Diät.</span>
          </h1>

          {/* Subline */}
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
            happyfigur kombiniert Training, Ernährung und Coaching — zertifiziert nach § 20 SGB V.
            Deine Krankenkasse erstattet bis zu 100%.²³
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 animate-fade-up delay-300">
            <button
              id="hero-cta"
              onClick={startQuiz}
              className="btn-cta inline-flex items-center gap-3 text-base md:text-lg px-6 md:px-8 py-3.5 md:py-4"
            >
              Kostenloses Probetraining buchen
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Unverbindlich</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> 100% kostenlos</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" /> § 20 SGB V</span>
            </div>
          </div>
        </div>

        {/* KPI Dashboard Card */}
        <KPIDashboard />
      </section>

      {/* Navigation über Navbar — keine separate Journey-Nav nötig */}

      {/* 01 — Das Problem */}
      <div className="relative overflow-hidden">
        <DecoIcons icons={problemIcons} />
        <ProblemSection />
      </div>

      {/* Wave transition → subtle bg */}
      <SectionWave />

      {/* 02 — Die Lösung */}
      <div className="section-bg-subtle relative overflow-hidden">
        <div className="glow-orb glow-orb--green w-[400px] h-[400px] -top-32 -left-48" />
        <DecoIcons icons={solutionIcons} />
        <SolutionSection onStartQuiz={startQuiz} />
      </div>

      <SectionWave flip />

      {/* Architektur-Diagramm */}
      <div className="relative bg-dot-grid">
        <ArchitectureSection />
      </div>

      <SectionWave />

      {/* 03 — Dein Weg */}
      <div className="section-bg-subtle relative overflow-hidden">
        <div className="glow-orb glow-orb--gold w-[350px] h-[350px] top-20 -right-32" />
        <DecoIcons icons={processIcons} />
        <ProcessSection />
      </div>

      <SectionWave flip />

      {/* 04 — Ergebnisse */}
      <div className="relative overflow-hidden">
        <div className="glow-orb glow-orb--green w-[500px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <DecoIcons icons={testimonialIcons} />
        <Testimonials />
      </div>

      <SectionWave />

      {/* 05 — Dein Team */}
      <div className="section-bg-subtle relative overflow-hidden">
        <div className="glow-orb glow-orb--gold w-[300px] h-[300px] -top-20 -left-32" />
        <DecoIcons icons={trainerIcons} />
        <TrainerSection />
      </div>

      <SectionWave flip />

      {/* 06 — Investition */}
      <div className="relative overflow-hidden">
        <div className="glow-orb glow-orb--green w-[400px] h-[400px] bottom-0 right-0" />
        <DecoIcons icons={insuranceIcons} />
        <InsuranceCalculator onStartQuiz={startQuiz} />

        {/* Benchmark: Erstattung nach Krankenkasse */}
        <div className="mx-auto max-w-5xl px-5 pb-20">
          <InsuranceBenchmark />
        </div>
      </div>

      <SectionWave />

      {/* 07 — Kein Risiko */}
      <div className="section-bg-subtle relative overflow-hidden">
        <DecoIcons icons={guaranteeIcons} />
        <GuaranteeSection />
      </div>

      <SectionWave flip />

      {/* 08 — FAQ */}
      <div className="relative bg-dot-grid overflow-hidden">
        <DecoIcons icons={faqIcons} />
        <FAQSection />
      </div>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════ */}
      <section className="py-14 md:py-32 px-5 relative overflow-hidden">
        <div className="glow-orb glow-orb--green w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <DecoIcons icons={ctaIcons} />
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-5xl font-bold mb-6">
            Dein erster Schritt<br />
            <span className="text-primary">kostet nichts.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Starte mit einem kostenlosen Probetraining im FIT-INN Trier.
            Kein Risiko, keine Verpflichtung.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button onClick={startQuiz} className="btn-cta inline-flex items-center gap-3 text-base md:text-lg px-6 md:px-8 py-3.5 md:py-4">
              Kostenloses Probetraining buchen
              <ArrowRight className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => openLiveChat()} className="btn-outline">
              <MessageCircle className="w-4 h-4" />
              Fragen? Chatte mit uns
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Kostenlos & unverbindlich</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> § 20 SGB V zertifiziert</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER — 4 Columns
          ═══════════════════════════════════════ */}
      <footer className="border-t border-border py-12 px-5 footer-glow">
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
                <button type="button" onClick={() => openLiveChat()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" /> Live-Chat
                </button>
              </div>
            </div>

            {/* Col 2: Programm */}
            <div>
              <p className="font-bold mb-3 text-sm">Programm</p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="#programm" className="hover:text-foreground transition-colors">Was ist happyfigur?</a>
                <a href="#ablauf" className="hover:text-foreground transition-colors">So läuft es ab</a>
                <a href="#krankenkasse" className="hover:text-foreground transition-colors">Kosten & Kasse</a>
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
            <p><strong className="text-foreground/60">¹ Ablauf & Zahlung:</strong> Der Kurspreis von 179€ (inkl. MwSt.) ist bei Trainingsstart in Vorkasse an FIT-INN Trier zu entrichten. Erst nach Zahlungseingang beginnt das Programm. Das Programm umfasst 8 Kurseinheiten innerhalb von 8–12 Wochen.</p>
            <p><strong className="text-foreground/60">² Erstattung durch die Krankenkasse:</strong> Der Kurs „happyfigur – genussvoll abnehmen" ist nach § 20 SGB V zertifiziert. Voraussetzung für die Erstattung ist die vollständige, erfolgreiche Teilnahme an allen 8 Kurseinheiten inkl. Wissensüberprüfung. Nach Abschluss erhältst du eine Teilnahmebestätigung, die du eigenständig bei deiner gesetzlichen Krankenkasse einreichst. Die Erstattung erfolgt direkt von deiner Krankenkasse an dich — nicht an FIT-INN. FIT-INN hat keinen Einfluss auf den Erstattungsprozess. Eine Barauszahlung des Erstattungsbetrags durch FIT-INN ist ausgeschlossen.</p>
            <p><strong className="text-foreground/60">³ Erstattungshöhe:</strong> Die Höhe der Erstattung variiert je nach Krankenkasse und liegt erfahrungsgemäß zwischen 75€ und 100% der Kursgebühr. Alle Angaben zu Erstattungsbeträgen auf dieser Seite sind ohne Gewähr — maßgeblich ist die jeweils gültige Satzung deiner Krankenkasse.</p>
            <p><strong className="text-foreground/60">⁴ Hinweis:</strong> Das Programm ist eine Präventionsmaßnahme und ersetzt keinen ärztlichen Rat. Eine Erfolgsgarantie wird nicht übernommen. Bei gesundheitlichen Einschränkungen empfehlen wir, vor Teilnahme einen Arzt zu konsultieren. Das Programm ist nicht geeignet für Minderjährige, Schwangere, Stillende oder Personen mit Essstörungen.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

/* ─── Section Wave Divider ─── */
function SectionWave({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={`section-wave ${flip ? 'section-wave--flip' : ''}`}
      fill="currentColor"
    >
      <path d="M0 48h1440V24C1200 0 960 48 720 48S240 0 0 24v24z" />
    </svg>
  )
}

/* ─── KPI Dashboard Card ─── */
function KPIDashboard() {
  const section = useScrollReveal(0.1)

  const teilnehmer = useCountUp(127000, 2000, section.isVisible)
  const bewertung = useCountUp(49, 1500, section.isVisible)
  const kgLoss = useCountUp(72, 1500, section.isVisible)

  return (
    <div
      ref={section.ref}
      className="relative z-10 mx-auto max-w-3xl mt-16 px-5 animate-fade-up delay-400"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-t border-border pt-6 md:pt-8">
        <div>
          <span className="text-2xl md:text-3xl font-bold text-foreground font-[family-name:var(--font-barlow-condensed)]">
            {teilnehmer.toLocaleString('de-DE')}+
          </span>
          <p className="text-xs text-muted-foreground mt-1">Teilnehmer</p>
        </div>
        <div>
          <span className="text-2xl md:text-3xl font-bold text-accent font-[family-name:var(--font-barlow-condensed)]">
            {(bewertung / 10).toFixed(1)}★
          </span>
          <p className="text-xs text-muted-foreground mt-1">Google Bewertung</p>
        </div>
        <div>
          <span className="text-2xl md:text-3xl font-bold text-primary font-[family-name:var(--font-barlow-condensed)]">
            -{(kgLoss / 10).toFixed(1).replace('.', ',')} kg
          </span>
          <p className="text-xs text-muted-foreground mt-1">Ø Ergebnis¹</p>
        </div>
        <div>
          <span className="text-2xl md:text-3xl font-bold text-primary font-[family-name:var(--font-barlow-condensed)]">
            0 €
          </span>
          <p className="text-xs text-muted-foreground mt-1">bei vielen Kassen²³</p>
        </div>
      </div>
    </div>
  )
}
