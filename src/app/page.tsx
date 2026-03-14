'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Target, ArrowRight, CheckCircle2, Shield, Dumbbell, Apple, HeartPulse, Phone, MessageCircle, Instagram, Facebook, Youtube } from 'lucide-react'
import { useScrollReveal, useCountUp } from '@/hooks/useScrollReveal'
import { WhySection } from '@/components/sections/WhySection'
import { Testimonials } from '@/components/sections/Testimonials'
import { InsuranceCalculator } from '@/components/sections/InsuranceCalculator'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { GuaranteeSection } from '@/components/sections/GuaranteeSection'
import { TrainerSection } from '@/components/sections/TrainerSection'
import { StickyBar } from '@/components/StickyBar'
import { Navbar } from '@/components/Navbar'

const heroFeatures = [
  {
    icon: Dumbbell,
    title: 'Kein Trial-and-Error mehr',
    text: <>Gezielt an deinem Stoffwechsel — kein Allgemeinplan. Vor Ort ist immer ein Coach für dich da.</>,
  },
  {
    icon: Apple,
    title: 'Abnehmen ohne Verzicht',
    text: <>Kein Kalorienzählen, keine Verbote. Ein System, das du auch in zwei Jahren noch lebst.</>,
  },
  {
    icon: HeartPulse,
    title: 'Viele zahlen am Ende 0€',
    text: <>§ 20 SGB V: Deine Kasse übernimmt bis zu 100%.<sup>²³</sup> Einfach teilnehmen, Bestätigung einreichen, Geld zurück.</>,
  },
]

function StatItem({ endValue, format, label, sub, delay, isVisible }: {
  endValue: number
  format: (n: number) => string
  label: string
  sub: string
  delay: number
  isVisible: boolean
}) {
  const count = useCountUp(endValue, 2000, isVisible)
  return (
    <div className="text-center relative">
      <div className="relative inline-block">
        <div className="text-2xl md:text-3xl font-bold text-primary glow-text">
          {format(count)}
        </div>
      </div>
      <div className="text-xs font-semibold mt-1 uppercase tracking-wider">{label}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const startQuiz = () => router.push('/quiz')

  const [heroAnimated, setHeroAnimated] = useState(false)
  const stats = useScrollReveal(0.3)

  useEffect(() => {
    const timer = setTimeout(() => setHeroAnimated(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen overflow-x-hidden">

      {/* Navbar */}
      <Navbar onStartQuiz={startQuiz} />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-24">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Hero background image — Ken Burns */}
          <div className="hero-ken-burns absolute inset-0">
            <Image
              src="/dooken-magic-edit-1773336253189.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-top md:object-[right_top] opacity-30 md:opacity-35"
              priority
            />
          </div>
          {/* Mobile overlay: oben mittel (Frau sichtbar), unten stark (Text lesbar) */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background/95 md:hidden" />
          {/* Desktop overlay: links dunkel (Text), rechts transparent (Frau) */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-background/95 via-background/70 to-background/10" />
          {/* Accent blobs */}
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 pb-12">
          <div className="text-center animate-fade-up">

            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                FIT-INN Trier · Abnehmprogramm happyfigur
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] mb-8">
              Du hast
              <span
                className={`block text-accent relative glitch-text ${heroAnimated ? 'animate' : ''}`}
                data-text="alles versucht"
              >
                alles versucht
              </span>
              <span className="block text-primary mt-2">Jetzt nimmst du wirklich ab.</span>
            </h1>

            <p className="text-base md:text-lg text-primary font-medium max-w-xl mx-auto mb-3">
              8-Wochen-Programm · Personal Training · Ernährungsbegleitung · FIT-INN Trier
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Das Problem ist nicht deine Disziplin –{' '}
              <strong className="text-foreground">es ist der falsche Ansatz.</strong>{' '}
              happyfigur setzt gezielt an deinem Stoffwechsel an.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4">
              <button
                id="hero-cta"
                onClick={startQuiz}
                className="btn-cta cta-pulse inline-flex items-center gap-3 text-xl px-10 py-5"
              >
                <Target className="w-6 h-6" />
                Kostenloses Probetraining sichern
                <ArrowRight className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><span className="text-primary">✓</span> Unverbindlich</span>
                <span className="flex items-center gap-1"><span className="text-primary">✓</span> 100% kostenlos</span>
                <span className="flex items-center gap-1"><span className="text-primary">✓</span> Krankenkasse bis 100%<sup>³</sup></span>
              </div>
              <p className="text-sm text-muted-foreground">
                Oder ruf uns direkt an:{' '}
                <a href="tel:+496513085240" className="text-accent hover:underline font-medium">
                  0651 308524
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Feature-Karten */}
        <div className="relative z-10 w-full px-6 lg:px-8 pb-12">
          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4">
            {heroFeatures.map(({ icon: Icon, title, text }, i) => (
              <div key={i} className="rounded-2xl bg-card border-t-2 border-primary p-6">
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-foreground font-bold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Krankenkassen Banner */}
      <section className="py-5 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.05)_20px)]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="text-primary-foreground text-lg font-semibold">
            § 20 SGB V · Deine Krankenkasse übernimmt bis zu{' '}
            <span className="underline decoration-2 font-black">100% der Kosten</span>
            <sup>²³</sup>
            {' '}· Bei vielen Kassen komplett gratis
          </p>
        </div>
      </section>

      {/* Social Proof Bar — Counter Animation */}
      <section className="py-5 border-y border-border/50" ref={stats.ref}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem endValue={30} format={n => `${n}+`} label="Jahre Erfahrung" sub="FIT-INN seit 1996" delay={0} isVisible={stats.isVisible} />
            <StatItem endValue={127000} format={n => `${n.toLocaleString('de-DE')}+`} label="happyfigur Teilnehmer" sub="deutschlandweit" delay={0.15} isVisible={stats.isVisible} />
            <StatItem endValue={49} format={n => `${(n / 10).toFixed(1)}★`} label="Google Bewertung" sub="127 Rezensionen" delay={0.3} isVisible={stats.isVisible} />
            <StatItem endValue={72} format={n => `-${(n / 10).toFixed(1).replace('.', ',')} kg`} label="Ø Gewichtsverlust" sub="in 8 Wochen¹" delay={0.45} isVisible={stats.isVisible} />
          </div>
        </div>
      </section>

      {/* Why Section (Problem + Solution zusammengelegt) */}
      <WhySection onStartQuiz={startQuiz} />

      {/* Process Section — leicht abgehoben */}
      <div className="bg-card/40">
        <ProcessSection />
      </div>

      {/* Trainer / Coach */}
      <TrainerSection />

      {/* Studio Einblick — leicht abgehoben */}
      <section className="relative py-6 overflow-hidden bg-card/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/studio-1.avif"
                alt="FIT-INN Trier – Trainingsbereich"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/studio-2.avif"
                alt="FIT-INN Trier – Gerätepark"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            FIT-INN Trier – Über 800m² mit modernster Technogym-Ausstattung
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Insurance Calculator */}
      <InsuranceCalculator onStartQuiz={startQuiz} />

      {/* Guarantee Section — leicht abgehoben */}
      <div className="bg-card/40">
        <GuaranteeSection />
      </div>

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-14 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/8 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Jetzt handeln</span>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide mb-6 animate-fade-up delay-100">
            Dein erster Schritt kostet nichts.
          </h2>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto animate-fade-up delay-200">
            Starte heute mit einem kostenlosen Probetraining.
            Kein Risiko, keine Verpflichtung – nur dein erster Schritt zum Wunschgewicht.
          </p>
          <p className="text-base text-primary font-semibold mb-10 animate-fade-up delay-200">
            Bei vielen Krankenkassen komplett kostenlos<sup>²³</sup> — sonst ab 3,20€/Tag.<sup>¹</sup>
          </p>

          <div className="flex flex-col items-center gap-4 animate-fade-up delay-300">
            <button onClick={startQuiz} className="btn-cta text-xl px-12 py-5 inline-flex items-center gap-3">
              <Target className="w-6 h-6" />
              Jetzt kostenloses Probetraining buchen
              <ArrowRight className="w-6 h-6" />
            </button>
            <a href="https://wa.me/4915679610457" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <MessageCircle className="w-4 h-4" />
              Fragen? Schreib uns auf WhatsApp
            </a>
            <a href="tel:+496513085240" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-border/40 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-3.5 h-3.5" />
              0651 308524
            </a>
          </div>

          {/* Mini Trust */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground animate-fade-up delay-400">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Kostenlos & unverbindlich</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> § 20 SGB V zertifiziert</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 30 Jahre Erfahrung</span>
          </div>
        </div>
      </section>

      {/* Fußnoten */}
      <div className="mx-auto max-w-3xl px-6 pt-8 pb-6 text-xs text-muted-foreground space-y-1.5 border-t border-border/30">
        <p><sup>¹</sup> Kurspreis 179 € inkl. MwSt., fällig bei Trainingsstart (Vorkasse). 8 Einheiten in 8–12 Wochen.</p>
        <p><sup>²</sup> Erstattung nach § 20 SGB V: Teilnahmebestätigung selbst einreichen, kein Vorab-Antrag nötig. Bei Nicht-Erstattung erstattet FIT-INN den vollen Betrag.</p>
        <p><sup>³</sup> Erstattungshöhe variiert je Krankenkasse (erfahrungsgemäß 75 €–100 %). Alle Angaben ohne Gewähr.</p>
        <p><sup>⁴</sup> Präventionsprogramm, kein Ersatz für ärztliche Beratung. Ergebnisse individuell verschieden.</p>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

            {/* Spalte 1: Kontakt */}
            <div className="space-y-3">
              <p className="font-bold text-base">FIT-INN Trier</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Auf Hörstenberg 8<br />54296 Trier
              </p>
              <div className="space-y-2">
                <a href="tel:+496513085240" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />
                  0651 308524
                </a>
                <a href="mailto:info@fit-inn-trier.de" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <span className="w-4 h-4 shrink-0 text-center text-xs">@</span>
                  info@fit-inn-trier.de
                </a>
                <a href="https://wa.me/4915679610457" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Spalte 2: Social Media */}
            <div className="space-y-3">
              <p className="font-bold text-base">Social Media</p>
              <div className="flex flex-col gap-2">
                <a href="#" aria-label="Instagram" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="w-4 h-4 shrink-0" />
                  Instagram
                </a>
                <a href="#" aria-label="Facebook" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="w-4 h-4 shrink-0" />
                  Facebook
                </a>
                <a href="#" aria-label="YouTube" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Youtube className="w-4 h-4 shrink-0" />
                  YouTube
                </a>
              </div>
            </div>

            {/* Spalte 3: Rechtliches */}
            <div className="space-y-3">
              <p className="font-bold text-base">Rechtliches</p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="/impressum" className="hover:text-foreground transition-colors">Impressum</a>
                <a href="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</a>
                <a href="/agb" className="hover:text-foreground transition-colors">AGB</a>
                <a href="/widerruf" className="hover:text-foreground transition-colors">Widerruf</a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 text-center mb-6">
            <p className="text-xs text-muted-foreground">© 2026 FIT-INN Trier. Alle Rechte vorbehalten.</p>
          </div>
          <div className="pb-20 text-xs text-muted-foreground max-w-3xl mx-auto space-y-2">
            <p><strong className="text-foreground/60">¹ Ablauf & Zahlung:</strong> Der Kurspreis von 179€ (inkl. MwSt.) ist bei Trainingsstart in Vorkasse an FIT-INN Trier zu entrichten. Erst nach Zahlungseingang beginnt das Programm. Das Programm umfasst 8 Kurseinheiten innerhalb von 8–12 Wochen.</p>
            <p><strong className="text-foreground/60">² Erstattung durch die Krankenkasse:</strong> Der Kurs „happyfigur – genussvoll abnehmen" ist nach § 20 SGB V zertifiziert. Voraussetzung für die Erstattung ist die vollständige, erfolgreiche Teilnahme an allen 8 Kurseinheiten inkl. Wissensüberprüfung. Nach Abschluss erhältst du eine Teilnahmebestätigung, die du eigenständig bei deiner gesetzlichen Krankenkasse einreichst. Die Erstattung erfolgt direkt von deiner Krankenkasse an dich – nicht an FIT-INN. FIT-INN hat keinen Einfluss auf den Erstattungsprozess. Eine Barauszahlung des Erstattungsbetrags durch FIT-INN ist ausgeschlossen.</p>
            <p><strong className="text-foreground/60">³ Erstattungshöhe:</strong> Die Höhe der Erstattung variiert je nach Krankenkasse und liegt erfahrungsgemäß zwischen 75€ und 100% der Kursgebühr. Alle Angaben zu Erstattungsbeträgen auf dieser Seite sind ohne Gewähr – maßgeblich ist die jeweils gültige Satzung deiner Krankenkasse.</p>
            <p><strong className="text-foreground/60">⁴ Hinweis:</strong> Das Programm ist eine Präventionsmaßnahme und ersetzt keinen ärztlichen Rat. Eine Erfolgsgarantie wird nicht übernommen. Bei gesundheitlichen Einschränkungen empfehlen wir, vor Teilnahme einen Arzt zu konsultieren. Das Programm ist nicht geeignet für Minderjährige, Schwangere, Stillende oder Personen mit Essstörungen.</p>
          </div>
        </div>
      </footer>

      {/* Sticky Bar */}
      <StickyBar onStartQuiz={startQuiz} />
    </main>
  )
}
