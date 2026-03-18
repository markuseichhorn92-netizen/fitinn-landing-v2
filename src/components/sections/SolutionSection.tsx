'use client'

import { Dumbbell, Apple, Users, Shield, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionBadge } from '@/components/SectionBadge'

const pillars = [
  {
    icon: Dumbbell,
    title: 'Gezieltes Training',
    description: '2–3× pro Woche, je 30 Min. Individuell auf deinen Körper und Stoffwechsel abgestimmt — im FIT-INN Trier.',
    color: 'accent' as const,
  },
  {
    icon: Apple,
    title: 'Ernährung ohne Verbote',
    description: 'Kein Kalorienzählen, keine Diät. Ein alltagstauglicher Ernährungsplan, den du auch in zwei Jahren noch lebst.',
    color: 'primary' as const,
  },
  {
    icon: Users,
    title: 'Persönliche Betreuung',
    description: 'Trainer immer vor Ort ansprechbar. Dazu 24/7 Support per Live-Chat, E-Mail und Telefon.',
    color: 'primary' as const,
  },
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
          <span className="text-primary">Ein Stoffwechsel-System.</span>
        </h2>

        <p
          className={`text-muted-foreground text-lg max-w-2xl mb-14 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          happyfigur kombiniert Training, Ernährung und Coaching zu einem 8-Wochen-Programm, das deinen Stoffwechsel neu aktiviert — nicht Kalorien zählt.
        </p>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className={`feature-card ${pillar.color === 'accent' ? 'feature-card--training' : ''} p-8 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${
                pillar.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
              }`}>
                <pillar.icon className={`w-6 h-6 ${pillar.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* §20 Badge */}
        <div
          className={`flex items-center gap-3 px-5 py-4 rounded-xl bg-primary/5 border border-primary/10 mb-12 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.4s' }}
        >
          <Shield className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm">
            <span className="text-primary font-semibold">§ 20 SGB V zertifiziert</span>
            <span className="text-muted-foreground"> — Deine Krankenkasse erstattet bis zu 100% der Kosten.²³</span>
          </p>
        </div>

        {/* CTA */}
        <div
          className={`fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.45s' }}
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
