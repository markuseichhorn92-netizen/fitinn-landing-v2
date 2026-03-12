'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Target, ArrowRight, X, CheckCircle2, Phone, Shield, Dumbbell, Apple, HeartPulse } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { QuizFunnel } from '@/components/quiz/QuizFunnel'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { SolutionSection } from '@/components/sections/SolutionSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { InsuranceCalculator } from '@/components/sections/InsuranceCalculator'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { GuaranteeSection } from '@/components/sections/GuaranteeSection'
import { StickyBar } from '@/components/StickyBar'
import { Navbar } from '@/components/Navbar'

const heroFeatures = [
  {
    icon: Dumbbell,
    title: 'Kein Trial-and-Error mehr',
    text: 'Du bekommst einen Plan, der speziell für deinen Körper funktioniert. Dein Trainer setzt gezielt an deinem Stoffwechsel an – damit du endlich Ergebnisse siehst, nicht irgendwann, sondern ab Woche 1.',
  },
  {
    icon: Apple,
    title: 'Abnehmen ohne Verzicht',
    text: 'Diäten scheitern, weil sie dein Leben ignorieren. Das happyfigur-Prinzip nicht. Kein Kalorienzählen, keine Verbote – ein System, das du auch in zwei Jahren noch lebst.',
  },
  {
    icon: HeartPulse,
    title: 'Viele zahlen am Ende 0€',
    text: 'Was die meisten nicht wissen: Deine Krankenkasse übernimmt nach § 20 SGB V bis zu 100% der Kosten. Du nimmst teil, reichst die Bestätigung ein – und bekommst dein Geld zurück.',
  },
]

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  const [heroAnimated, setHeroAnimated] = useState(false)
  const stats = useScrollReveal(0.3)

  useEffect(() => {
    const timer = setTimeout(() => setHeroAnimated(true), 400)
    return () => clearTimeout(timer)
  }, [])

  const startQuiz = () => setShowQuiz(true)
  const closeQuiz = () => setShowQuiz(false)
  const openBooking = () => {
    setShowQuiz(false)
    setShowBooking(true)
  }

  return (
    <main className="min-h-screen overflow-x-hidden">

      {/* Navbar */}
      <Navbar onStartQuiz={startQuiz} />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-24">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Hero background image */}
          <Image
            src="/dooken-magic-edit-1773336253189.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_15%] md:object-[right_top] opacity-15 md:opacity-25"
            priority
          />
          {/* Mobile: heavy overlay so text stays readable over the person */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/95 md:bg-gradient-to-r md:from-background/90 md:via-background/60 md:to-background/20" />
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8">
              Du hast
              <span
                className={`block text-accent relative glitch-text ${heroAnimated ? 'animate' : ''}`}
                data-text="alles versucht"
              >
                alles versucht
              </span>
              <span className="block text-primary mt-2">Jetzt nimmst du wirklich ab.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Das Problem ist nicht deine Disziplin –{' '}
              <strong className="text-foreground">es ist der falsche Ansatz.</strong>{' '}
              happyfigur setzt gezielt an deinem Stoffwechsel an.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={startQuiz}
                className="btn-cta inline-flex items-center gap-3 text-xl px-10 py-5"
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

      {/* Social Proof Bar — Number Slam */}
      <section className="py-12 border-y border-border/50" ref={stats.ref}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '30+', label: 'Jahre Erfahrung', sub: 'FIT-INN seit 1996' },
              { value: '127.000+', label: 'happyfigur Teilnehmer', sub: 'deutschlandweit' },
              { value: '4.9★', label: 'Google Bewertung', sub: '127 Rezensionen' },
              { value: '-7,2 kg', label: 'Ø Gewichtsverlust', sub: 'in 8 Wochen¹' },
            ].map((stat, i) => (
              <div key={i} className="text-center relative">
                <div className="relative inline-block">
                  <div
                    className={`text-4xl md:text-5xl font-bold text-primary glow-text number-slam ${stats.isReady ? 'anim-ready' : ''} ${stats.isVisible ? 'animate' : ''}`}
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`impact-ring ${stats.isReady ? 'anim-ready' : ''} ${stats.isVisible ? 'animate' : ''}`}
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                </div>
                <div
                  className={`text-sm font-semibold mt-1 number-slam ${stats.isReady ? 'anim-ready' : ''} ${stats.isVisible ? 'animate' : ''}`}
                  style={{ animationDelay: `${i * 0.15 + 0.2}s` }}
                >
                  {stat.label}
                </div>
                <div
                  className={`text-xs text-muted-foreground mt-1 number-slam ${stats.isReady ? 'anim-ready' : ''} ${stats.isVisible ? 'animate' : ''}`}
                  style={{ animationDelay: `${i * 0.15 + 0.3}s` }}
                >
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <ProblemSection />

      {/* Solution Section */}
      <SolutionSection onStartQuiz={startQuiz} />

      {/* Process Section */}
      <ProcessSection />

      {/* Studio Einblick */}
      <section className="relative py-20 overflow-hidden">
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

      {/* Guarantee Section */}
      <GuaranteeSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/8 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Jetzt handeln</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up delay-100">
            Dein kostenloser <span className="text-primary">Platz wartet</span> auf dich
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
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">Noch 3 Plätze frei · Angebot endet bald</span>
            </div>
          </div>

          {/* Mini Trust */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground animate-fade-up delay-400">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Kostenlos & unverbindlich</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> § 20 SGB V zertifiziert</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 30 Jahre Erfahrung</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-bold text-lg">FIT-INN Trier</p>
              <p className="text-sm text-muted-foreground">Auf Hirtenberg 8, 54296 Trier</p>
              <p className="text-sm text-muted-foreground">Seit 1996 · Tel: 0651 308524</p>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="/impressum" className="hover:text-foreground transition-colors">Impressum</a>
              <a href="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</a>
              <a href="/agb" className="hover:text-foreground transition-colors">AGB</a>
              <a href="/widerruf" className="hover:text-foreground transition-colors">Widerruf</a>
            </div>
          </div>
          <div className="mt-8 pt-8 pb-20 border-t border-border/50 text-xs text-muted-foreground max-w-3xl mx-auto space-y-2">
            <p><strong className="text-foreground/60">¹ Ablauf & Zahlung:</strong> Der Kurspreis von 179€ (inkl. MwSt.) ist bei Trainingsstart in Vorkasse an FIT-INN Trier zu entrichten. Erst nach Zahlungseingang beginnt das Programm. Das Programm umfasst 8 Kurseinheiten innerhalb von 8–12 Wochen.</p>
            <p><strong className="text-foreground/60">² Erstattung durch die Krankenkasse:</strong> Der Kurs „happyfigur – genussvoll abnehmen" ist nach § 20 SGB V zertifiziert. Voraussetzung für die Erstattung ist die vollständige, erfolgreiche Teilnahme an allen 8 Kurseinheiten inkl. Wissensüberprüfung. Nach Abschluss erhältst du eine Teilnahmebestätigung, die du eigenständig bei deiner gesetzlichen Krankenkasse einreichst. Die Erstattung erfolgt direkt von deiner Krankenkasse an dich – nicht an FIT-INN. FIT-INN hat keinen Einfluss auf den Erstattungsprozess. Eine Barauszahlung des Erstattungsbetrags durch FIT-INN ist ausgeschlossen.</p>
            <p><strong className="text-foreground/60">³ Erstattungshöhe:</strong> Die Höhe der Erstattung variiert je nach Krankenkasse und liegt erfahrungsgemäß zwischen 75€ und 100% der Kursgebühr. Alle Angaben zu Erstattungsbeträgen auf dieser Seite sind ohne Gewähr – maßgeblich ist die jeweils gültige Satzung deiner Krankenkasse.</p>
            <p><strong className="text-foreground/60">⁴ Hinweis:</strong> Das Programm ist eine Präventionsmaßnahme und ersetzt keinen ärztlichen Rat. Eine Erfolgsgarantie wird nicht übernommen. Bei gesundheitlichen Einschränkungen empfehlen wir, vor Teilnahme einen Arzt zu konsultieren. Das Programm ist nicht geeignet für Minderjährige, Schwangere, Stillende oder Personen mit Essstörungen.</p>
          </div>
        </div>
      </footer>

      {/* Sticky Bar */}
      <StickyBar onStartQuiz={startQuiz} />

      {/* Quiz Modal – Fullscreen Funnel */}
      {showQuiz && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto animate-funnel-enter">
          {/* Ambient glow */}
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(207,229,234,0.06), transparent 70%)' }} />
          {/* Close button */}
          <button
            onClick={closeQuiz}
            className="fixed top-5 right-5 z-[51] p-2.5 rounded-full bg-card/60 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <QuizFunnel onComplete={openBooking} />
        </div>
      )}

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowBooking(false)}
          />
          <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl p-8 animate-scale-in text-center">
            <button
              onClick={() => setShowBooking(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>

            <h2 className="text-3xl font-bold mb-2">Dein Probetraining ist so gut wie gebucht!</h2>
            <p className="text-muted-foreground mb-6">
              Bestätige deinen Platz jetzt per WhatsApp – dauert nur 30 Sekunden.
            </p>

            {/* Trust Points */}
            <div className="flex flex-col gap-2 mb-8 text-left">
              {[
                '100% kostenlos & unverbindlich',
                'Keine Mitgliedschaft erforderlich',
                'Termin nach deinem Wunsch',
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/4915679610457?text=Hallo!%20Ich%20m%C3%B6chte%20gerne%20ein%20kostenloses%20Probetraining%20bei%20happyfigur%20buchen.%20Wann%20gibt%20es%20freie%20Termine%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta inline-flex items-center justify-center gap-3 w-full text-lg py-4 mb-4"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Per WhatsApp buchen
            </a>

            {/* Phone Alternative */}
            <a
              href="tel:+49651308524"
              className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              Lieber anrufen: 0651 308524
            </a>

            <p className="text-xs text-muted-foreground mt-4">
              Kein Risiko · Keine Mitgliedschaft · Keine Verpflichtung
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
