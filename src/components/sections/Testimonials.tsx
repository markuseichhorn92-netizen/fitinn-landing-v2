'use client'

import { Star } from 'lucide-react'
import { useScrollReveal, useCountUp } from '@/hooks/useScrollReveal'
import { SectionBadge } from '@/components/SectionBadge'
import { LiveFeedTable } from '@/components/LiveFeed'

const testimonials = [
  {
    text: "Nach Jahren des Scheiterns hat mir die Körperanalyse endlich gezeigt, woran es lag. Jetzt esse ich mehr als vorher — und nehme trotzdem ab!",
    name: "Sandra K.",
    age: 42,
    result: "-8 kg",
    initials: "SK",
    color: "#7dd87d"
  },
  {
    text: "Ich war skeptisch, aber die Zahlen lügen nicht. Bei der Zwischen-Analyse hatte ich schon 4 kg weniger — das hat mich so motiviert!",
    name: "Thomas M.",
    age: 48,
    result: "-11 kg",
    initials: "TM",
    color: "#e8a948"
  },
  {
    text: "Endlich ein Konzept, das zu meinem Alltag passt. 2× 30 Minuten pro Woche — mehr brauche ich nicht. Und die Ergebnisse sprechen für sich.",
    name: "Marion H.",
    age: 55,
    result: "-6 kg",
    initials: "MH",
    color: "#7dd87d"
  }
]

export function Testimonials() {
  const section = useScrollReveal(0.1)
  const kgLoss = useCountUp(72, 1200, section.isVisible)
  const cmLoss = useCountUp(8, 1000, section.isVisible)

  return (
    <section id="erfahrungen" ref={section.ref} className="py-20 md:py-32 px-5">
      <div className="mx-auto max-w-5xl">
        <SectionBadge number="04" label="Ergebnisse" />

        <h2
          className={`text-3xl md:text-5xl font-bold mb-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          Was Teilnehmer aus <span className="text-primary">Trier</span> sagen
        </h2>

        <div
          className={`flex items-center gap-1 mb-12 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">4.9 auf Google · 127 Bewertungen</span>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`border-t border-border pt-6 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <span className="text-sm font-semibold">{t.name}, {t.age}</span>
                  <span className="ml-2 text-xs text-primary font-bold">{t.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-8 mb-8 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.4s' }}
        >
          <div>
            <span className="text-3xl md:text-4xl font-bold text-primary font-[family-name:var(--font-barlow-condensed)]">
              -{(kgLoss / 10).toFixed(1).replace('.', ',')} kg
            </span>
            <p className="text-xs text-muted-foreground mt-1">Ø Gewichtsverlust¹</p>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-bold text-primary font-[family-name:var(--font-barlow-condensed)]">
              -{cmLoss} cm
            </span>
            <p className="text-xs text-muted-foreground mt-1">Ø Bauchumfang¹</p>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-barlow-condensed)]">
              8 Wochen
            </span>
            <p className="text-xs text-muted-foreground mt-1">Programmdauer</p>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-bold text-accent font-[family-name:var(--font-barlow-condensed)]">
              4.9★
            </span>
            <p className="text-xs text-muted-foreground mt-1">127 Bewertungen</p>
          </div>
        </div>

        {/* Live Activity Feed (athleo-style) */}
        <div
          className={`mt-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.5s' }}
        >
          <LiveFeedTable />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Individuelle Ergebnisse können variieren. Erfahrungsberichte verifizierter Kursteilnehmer.
        </p>
      </div>
    </section>
  )
}
