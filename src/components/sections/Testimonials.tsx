'use client'

import { Star } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const TESTIMONIALS = [
  {
    name: 'Lisa M., 34',
    initials: 'LM',
    color: 'bg-primary',
    text: '4 cm weniger Bauchumfang in 4 Wochen – pünktlich vor unserem Urlaub. Endlich wieder Bikini.',
  },
  {
    name: 'Sandra K., 41',
    initials: 'SK',
    color: 'bg-accent-deep',
    text: 'Ich habe alles probiert. Mit dem Bauchweg Projekt hat es endlich Klick gemacht – ohne Hungern.',
  },
  {
    name: 'Nadine R., 38',
    initials: 'NR',
    color: 'bg-primary-dark',
    text: 'Klare Struktur, ehrliches Coaching, sichtbare Ergebnisse. Hätte ich viel früher machen sollen.',
  },
]

export function Testimonials() {
  const header = useScrollReveal(0.1)
  const cards = useScrollReveal(0.1)

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-5xl px-5">
        <div
          ref={header.ref}
          className={`text-center mb-12 fade-up ${header.isReady ? 'anim-ready' : ''} ${header.isVisible ? 'animate' : ''}`}
        >
          <p className="text-xs uppercase tracking-[0.22em] font-bold mb-4 text-primary">
            Echte Stimmen
          </p>
          <h2 className="text-3xl sm:text-4xl">Das sagen unsere Teilnehmer</h2>
        </div>

        <div ref={cards.ref} className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`p-6 rounded-2xl h-full shadow-sm bg-background border border-border fade-up ${cards.isReady ? 'anim-ready' : ''} ${cards.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="leading-relaxed mb-4">„{t.text}“</p>
              <div className="flex items-center gap-2.5">
                <span className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${t.color}`}>
                  {t.initials}
                </span>
                <p className="text-sm font-bold text-primary-dark">{t.name}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Individuelle Ergebnisse können variieren.⁴
        </p>
      </div>
    </section>
  )
}
