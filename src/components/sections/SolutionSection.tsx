'use client'

import Image from 'next/image'
import { Dumbbell, Apple, Users, Shield, ArrowRight, BookOpen, Monitor, BarChart2, Check } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionBadge } from '@/components/SectionBadge'

const pillars = [
  {
    icon: Apple,
    title: 'Ernährung ohne Verbote',
    description: 'Kein Kalorienzählen, keine Diät. Ein alltagstauglicher Ernährungsplan, den du auch in zwei Jahren noch lebst.',
    color: 'primary' as const,
    image: '/Gemini_Generated_Image_eoal4reoal4reoal.png',
    imageAlt: 'Gesunde Ernährung ohne Verbote — happyfigur',
    isMockup: false,
  },
  {
    icon: Dumbbell,
    title: 'Gezieltes Training',
    description: '2–3× pro Woche, je 30 Min. Individuell auf deinen Körper und Stoffwechsel abgestimmt — im FIT-INN Trier.',
    color: 'accent' as const,
    image: '/studio-1.avif',
    imageAlt: 'FIT-INN Trier — modernes Fitnessstudio',
    isMockup: false,
  },
  {
    icon: Users,
    title: 'Persönliche Betreuung',
    description: 'Trainer immer vor Ort ansprechbar. Dazu 24/7 Support per Live-Chat, E-Mail und Telefon.',
    color: 'primary' as const,
    image: '/Gemini_Generated_Image_opjcz0opjcz0opjc.png',
    imageAlt: 'Persönliche Betreuung — Trainerin mit Kundin im Studio',
    isMockup: false,
  },
]

const packageFeatures = [
  { icon: Dumbbell, title: '8 Wochen Training', sub: '2–3× pro Woche im FIT-INN', color: 'accent' as const },
  { icon: Apple, title: 'Ernährungsplan', sub: 'Individuell auf dein Ziel', color: 'primary' as const },
  { icon: BookOpen, title: 'Rezeptbuch', sub: 'Gedruckt + digital', color: 'primary' as const },
  { icon: Users, title: 'Persönliche Betreuung', sub: 'Trainer + Coaches per Chat', color: 'accent' as const },
  { icon: Monitor, title: 'Online-Plattform', sub: 'Kursvideos + Wissensquiz', color: 'primary' as const },
  { icon: BarChart2, title: '3× Körperanalyse', sub: 'Vorher · Zwischen · Nachher', color: 'accent' as const },
]

export function SolutionSection({ onStartQuiz }: { onStartQuiz: () => void }) {
  const section = useScrollReveal(0.1)

  return (
    <section id="programm" ref={section.ref} className="py-12 md:py-24 px-5">
      <div className="mx-auto max-w-5xl">
        <SectionBadge number="02" label="Die Lösung" />

        <h2
          className={`text-2xl md:text-4xl font-bold mb-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          Kein Diät-Plan.<br />
          <span className="text-primary">Happyfigur Stoffwechsel-System</span><br />
          <span className="text-muted-foreground text-lg md:text-xl font-medium">powered by FIT-INN Trier</span>
        </h2>

        <p
          className={`text-muted-foreground text-lg max-w-2xl mb-14 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          happyfigur kombiniert Training, Ernährung und Coaching zu einem 8-Wochen-Programm, das deinen Stoffwechsel neu aktiviert — nicht Kalorien zählt.
        </p>

        {/* ═══ 3 Pillar Cards mit Bildern ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className={`feature-card ${pillar.color === 'accent' ? 'feature-card--training' : ''} overflow-hidden !p-0 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <div className={`relative h-40 md:h-48 w-full ${
                pillar.isMockup
                  ? `bg-gradient-to-br ${pillar.color === 'primary' ? 'from-primary/5 to-primary/10' : 'from-accent/5 to-accent/10'}`
                  : ''
              }`}>
                <Image
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={pillar.isMockup ? 'object-contain p-3' : 'object-cover'}
                />
              </div>
              <div className="p-6">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  pillar.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
                }`}>
                  <pillar.icon className={`w-5 h-5 ${pillar.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ Food-Galerie ═══ */}
        <div
          className={`mb-12 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.4s' }}
        >
          <div className="grid grid-cols-3 gap-2 md:gap-3 rounded-2xl overflow-hidden">
            {[
              { src: '/food-smoothie.jpg', alt: 'Smoothie-Bowl' },
              { src: '/food-lentils.jpg', alt: 'Linsen-Salat' },
              { src: '/food-mango.jpg', alt: 'Mango-Bowl' },
            ].map((img, i) => (
              <div key={i} className="relative h-24 md:h-36">
                <Image src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover" />
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">Leckere Rezepte — keine Verbote</p>
        </div>

        {/* ═══ §20 Badge ═══ */}
        <div
          className={`flex items-center gap-3 px-5 py-4 rounded-xl bg-primary/5 border border-primary/10 mb-14 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.4s' }}
        >
          <Shield className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm">
            <span className="text-primary font-semibold">§ 20 SGB V zertifiziert</span>
            <span className="text-muted-foreground"> — Deine Krankenkasse erstattet bis zu 100% der Kosten.²³</span>
          </p>
        </div>

        {/* ═══ Das bekommst du ═══ */}
        <div className="text-center mb-10">
          <p
            className={`text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.45s' }}
          >
            Das bekommst du
          </p>
          <h3
            className={`text-2xl md:text-3xl font-bold mb-3 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.48s' }}
          >
            Alles für deinen Erfolg — in einem Paket.
          </h3>
          <p
            className={`text-sm text-muted-foreground fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.5s' }}
          >
            Keine versteckten Kosten. Alles inklusive ab Tag 1.
          </p>
        </div>

        {/* Mockup */}
        <div
          className={`flex justify-center mb-10 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.52s' }}
        >
          <div className="relative max-w-sm md:max-w-lg transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src="/mockup-paket.avif"
              alt="Happyfigur Paket — Ernährungsplan, Rezeptbuch, Online-Plattform"
              width={900}
              height={600}
              sizes="(max-width: 768px) 85vw, 512px"
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* 6 Feature-Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-6">
          {packageFeatures.map((f, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-border bg-card p-4 md:p-5 text-center transition-all duration-300 hover:shadow-md fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.55 + i * 0.06}s` }}
            >
              <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                f.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
              }`}>
                <f.icon className={`w-5 h-5 md:w-6 md:h-6 ${f.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
              </div>
              <p className="text-sm md:text-base font-bold mb-0.5">{f.title}</p>
              <p className="text-[11px] md:text-xs text-muted-foreground">{f.sub}</p>
            </div>
          ))}
        </div>

        {/* Converging Flow → Hub */}
        <div
          className={`fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.9s' }}
        >
          <div className="flex justify-center py-2">
            <svg width="200" height="44" viewBox="0 0 200 44" className="overflow-visible">
              {[
                'M 20 0 Q 50 22, 100 40',
                'M 60 0 Q 75 20, 100 40',
                'M 100 0 L 100 40',
                'M 140 0 Q 125 20, 100 40',
                'M 180 0 Q 150 22, 100 40',
              ].map((path, i) => (
                <g key={i}>
                  <path d={path} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle r="2.5" fill="var(--primary)" opacity="0.6">
                    <animateMotion dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" path={path} />
                  </circle>
                </g>
              ))}
              <circle cx="100" cy="40" r="4" fill="var(--primary)" opacity="0.2" />
            </svg>
          </div>

          <div className="flex justify-center mb-10">
            <div className="flex flex-col items-center gap-4 px-8 md:px-12 py-6 md:py-8 rounded-2xl border-2 border-primary/20 bg-card shadow-xl shadow-primary/5">
              <img src="/favicon.jpg" alt="FIT-INN" width={64} height={64} className="w-16 h-16 object-contain" />
              <div className="text-center">
                <p className="font-bold text-xl md:text-2xl uppercase tracking-wider">happyfigur</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Alles aus einer Hand</p>
              </div>
              <div className="h-px w-full bg-border" />
              <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary" /> Stoffwechsel aktivieren</span>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary" /> Ernährung optimieren</span>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary" /> Ergebnis messen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preis-Hinweis */}
        <p
          className={`text-center text-sm text-muted-foreground mb-10 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.95s' }}
        >
          Alles inklusive für <strong className="text-foreground">179€</strong>¹ — bei vielen Kassen <strong className="text-primary">0 €</strong>²³
        </p>

        {/* CTA */}
        <div
          className={`text-center fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '1s' }}
        >
          <button onClick={onStartQuiz} className="btn-cta inline-flex items-center gap-3">
            Jetzt Probetraining sichern
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-muted-foreground text-sm mt-3">
            ✓ Unverbindlich · ✓ Kostenlos · ✓ § 20 SGB V zertifiziert
          </p>
        </div>
      </div>
    </section>
  )
}
