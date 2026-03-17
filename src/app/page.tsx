import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Target, ArrowRight, CheckCircle2, Shield, Dumbbell, Apple, HeartPulse, Phone, MessageCircle, Instagram, Facebook, Youtube } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { HeroHeadline } from '@/components/HeroHeadline'
import { SocialProofStrip } from '@/components/SocialProofStrip'
import { LiveChatButton } from '@/components/LiveChatButton'

const WhySection = dynamic(() => import('@/components/sections/WhySection').then(m => ({ default: m.WhySection })))
const ProcessSection = dynamic(() => import('@/components/sections/ProcessSection').then(m => ({ default: m.ProcessSection })))
const TrainerSection = dynamic(() => import('@/components/sections/TrainerSection').then(m => ({ default: m.TrainerSection })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const InsuranceCalculator = dynamic(() => import('@/components/sections/InsuranceCalculator').then(m => ({ default: m.InsuranceCalculator })))
const GuaranteeSection = dynamic(() => import('@/components/sections/GuaranteeSection').then(m => ({ default: m.GuaranteeSection })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))

const heroFeatures = [
  {
    icon: Dumbbell,
    pillar: 'training' as const,
    title: 'Gezieltes Training',
    text: <>Individueller Trainingsplan, angepasst an deinen Stoffwechsel. Vor Ort ist immer ein Coach für dich da.</>,
  },
  {
    icon: Apple,
    pillar: 'ernaehrung' as const,
    title: 'Ernährung ohne Verbote',
    text: <>Kein Kalorienzählen, keine Diät. Ein Ernährungsplan, den du auch in zwei Jahren noch lebst.</>,
  },
  {
    icon: HeartPulse,
    pillar: 'kasse' as const,
    title: 'Viele zahlen am Ende 0€',
    text: <>§ 20 SGB V: Deine Kasse übernimmt bis zu 100%.<sup>²³</sup> Einfach teilnehmen, Bestätigung einreichen, Geld zurück.</>,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-24">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Hero background image — Ken Burns */}
          <div className="hero-ken-burns absolute inset-0">
            <Image
              src="/hero-bg.avif"
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
            <div className="inline-flex flex-wrap justify-center items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent uppercase tracking-wider text-center">
                Das 8-Wochen Stoffwechsel-Programm in Trier
              </span>
            </div>

            {/* Krankenkassen-Badge Hero */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary font-medium text-sm">
                <Shield className="w-4 h-4" />
                <span>§ 20 SGB V zertifiziert · Bis zu 100% Kostenübernahme</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] mb-8">
              Abnehmen in Trier
              <HeroHeadline />
              <span className="block text-primary mt-2">Jetzt nimmst du wirklich ab.</span>
            </h1>

            <p className="text-base md:text-lg font-medium max-w-xl mx-auto mb-3">
              <span className="text-accent">Training</span>
              {' · '}
              <span className="text-primary">Ernährung</span>
              {' · '}
              <span className="text-accent">Coaching</span>
              {' · '}
              <span className="text-muted-foreground">8 Wochen · FIT-INN Trier</span>
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Das Problem ist nicht deine Disziplin –{' '}
              <strong className="text-foreground">es ist der falsche Ansatz.</strong>{' '}
              happyfigur setzt gezielt an deinem Stoffwechsel an.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-5 mt-6">
              <Link
                id="hero-cta"
                href="/quiz"
                className="btn-cta cta-pulse inline-flex items-center gap-3 text-lg md:text-xl px-8 md:px-10 py-4 md:py-5"
              >
                <Target className="w-6 h-6 shrink-0" />
                <span className="text-left leading-tight">Passt das Programm zu dir?<br/><span className="text-sm font-normal opacity-90">Finde es in 1 Min heraus</span></span>
                <ArrowRight className="w-6 h-6 shrink-0" />
              </Link>

              {/* Trust & Social Proof under CTA */}
              <div className="flex flex-col items-center gap-2 mt-2">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[
                      { initials: 'SK', bg: '#7dd87d' },
                      { initials: 'TM', bg: '#f5a623' },
                      { initials: 'MH', bg: '#7dd87d' },
                      { initials: 'JR', bg: '#f5a623' },
                    ].map((p, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-black" style={{ backgroundColor: p.bg }}>{p.initials}</div>
                    ))}
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex text-accent text-sm">
                      {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">Bereits über 127.000 erfolgreiche Teilnehmer</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm text-muted-foreground mt-2">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-primary" /> Unverbindliches Quiz</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-primary" /> 100% kostenlos</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Oder ruf uns direkt an:{' '}
                <a href="tel:+49651308524" className="text-accent hover:underline font-medium">
                  0651 308524
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Feature-Karten */}
        <div className="relative z-10 w-full px-6 lg:px-8 pb-12 mt-8 md:mt-12">
          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {heroFeatures.map(({ icon: Icon, pillar, title, text }, i) => (
              <div key={i} className="feature-card p-6 group">
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    pillar === 'training' ? 'bg-accent/15' : pillar === 'ernaehrung' ? 'bg-primary/15' : 'bg-primary/10'
                  }`}>
                    <Icon className={`w-5 h-5 ${pillar === 'training' ? 'text-accent' : 'text-primary'}`} />
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                    pillar === 'training' ? 'bg-accent/10 text-accent'
                    : pillar === 'ernaehrung' ? 'bg-primary/10 text-primary'
                    : 'bg-primary/10 text-primary'
                  }`}>
                    {pillar === 'training' ? 'Training' : pillar === 'ernaehrung' ? 'Ernährung' : '§ 20 SGB V'}
                  </span>
                </div>
                <h2 className="text-foreground font-bold text-lg mb-2 relative z-10">{title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Krankenkassen Banner */}
      <section className="py-5 bg-gradient-to-r from-[#0a2e0a] via-[#1a4d1a] to-[#0a2e0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.05)_20px)]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="text-primary text-lg font-semibold">
            <Shield className="w-5 h-5 inline-block mr-2 -mt-0.5" />
            § 20 SGB V zertifiziert · Training + Ernährung ·{' '}
            <span className="underline decoration-2 font-black text-white">bis zu 100% erstattet</span>
            <sup>²³</sup>
          </p>
        </div>
      </section>

      {/* Social Proof Bar — Counter Animation */}
      <SocialProofStrip />

      {/* Why Section (Problem + Solution zusammengelegt) */}
      <div className="section-divider" />
      <WhySection />

      {/* Process Section — leicht abgehoben */}
      <div className="bg-card/40 bg-nutrition">
        <ProcessSection />
      </div>

      {/* Trainer / Coach */}
      <TrainerSection />

      {/* Die 2 Säulen: Training + Ernährung */}
      <section className="relative py-10 overflow-hidden bg-card/30 bg-fitness">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <span className="text-sm text-primary uppercase tracking-widest font-semibold">Dein Programm — zwei Säulen</span>
            <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide mt-4">
              <span className="text-accent">Training</span> + <span className="text-primary">Ernährung</span> = Ergebnis
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Säule 1: Training */}
            <div className="feature-card p-0 overflow-hidden group">
              <div className="studio-image relative aspect-[16/10]">
                <Image
                  src="/studio-1.avif"
                  alt="FIT-INN Trier – Trainingsbereich"
                  width={800}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Dumbbell className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-bold text-accent uppercase tracking-wider">Training</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">Gezieltes Stoffwechsel-Training</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    2–3× pro Woche, je 30 Min. Individuell auf deinen Körper abgestimmt — im modernsten Studio Triers.
                  </p>
                </div>
              </div>
            </div>

            {/* Säule 2: Ernährung */}
            <div className="feature-card p-0 overflow-hidden group">
              <div className="studio-image relative aspect-[16/10]">
                <Image
                  src="/food-smoothie.jpg"
                  alt="Gesunde Ernährung – Smoothie"
                  width={800}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Apple className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">Ernährung</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">Essen ohne Verbote</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Kein Kalorienzählen, keine Diät. Ein alltagstauglicher Ernährungsplan, der zu dir und deinem Leben passt.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Zweite Reihe: Studio + Food Details */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="studio-image relative aspect-[4/3] rounded-xl overflow-hidden border border-border/30">
              <Image src="/studio-2.avif" alt="FIT-INN Trier – Gerätepark" width={400} height={300} sizes="33vw" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div className="studio-image relative aspect-[4/3] rounded-xl overflow-hidden border border-border/30">
              <Image src="/food-lentils.jpg" alt="Gesunde Mahlzeit – Linsen" width={400} height={300} sizes="33vw" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div className="studio-image relative aspect-[4/3] rounded-xl overflow-hidden border border-border/30">
              <Image src="/food-mango.jpg" alt="Frisches Obst – Mango" width={400} height={300} sizes="33vw" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            FIT-INN Trier – Über 800m² mit modernster Technogym-Ausstattung · Gesunde Rezepte inklusive
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <div className="section-divider" />
      <Testimonials />

      {/* Insurance Calculator */}
      <InsuranceCalculator />

      {/* Guarantee Section — leicht abgehoben */}
      <div className="bg-card/40">
        <GuaranteeSection />
      </div>

      {/* FAQ Section */}
      <div className="section-divider" />
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
            Jetzt Abnehmen starten — dein erster Schritt kostet nichts.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-4 max-w-2xl mx-auto animate-fade-up delay-200">
            Starte heute mit einem kostenlosen Probetraining im FIT-INN Trier.
            Kein Risiko, keine Verpflichtung – nur dein erster Schritt zum Abnehmen mit dem Stoffwechsel-Programm.
          </p>
          <p className="text-base text-primary font-semibold mb-10 animate-fade-up delay-200">
            Bei vielen Krankenkassen komplett kostenlos<sup>²³</sup> — sonst ab 3,20€/Tag.<sup>¹</sup>
          </p>

          <div className="flex flex-col items-center gap-4 animate-fade-up delay-300 mt-6">
            <Link href="/quiz" className="btn-cta cta-pulse text-lg px-10 py-4 inline-flex items-center gap-3">
              <Target className="w-6 h-6 shrink-0" />
              <span className="text-left leading-tight">Passt das Programm zu dir?<br/><span className="text-sm font-normal opacity-90">Finde es in 1 Min heraus</span></span>
              <ArrowRight className="w-6 h-6 shrink-0" />
            </Link>
            <LiveChatButton className="btn-outline" />
            <a href="tel:+49651308524" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-border/40 text-sm text-muted-foreground hover:text-foreground transition-colors">
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

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 footer-glow">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

            {/* Spalte 1: Kontakt */}
            <div className="space-y-3">
              <p className="font-bold text-base">FIT-INN Trier</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Auf Hirtenberg 8<br />54296 Trier
              </p>
              <div className="space-y-2">
                <a href="tel:+49651308524" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />
                  0651 308524
                </a>
                <a href="mailto:info@fit-inn-trier.de" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <span className="w-4 h-4 shrink-0 text-center text-xs">@</span>
                  info@fit-inn-trier.de
                </a>
                <LiveChatButton className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  Live-Chat
                </LiveChatButton>
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

      {/* StickyBar entfernt — LiveChat-Widget übernimmt CTA */}
    </main>
  )
}
