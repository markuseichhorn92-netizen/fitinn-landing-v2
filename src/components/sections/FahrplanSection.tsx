'use client'

import { Zap } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const WEEKS = [
  {
    num: '1',
    title: 'Reset & Bauchgefühl',
    desc: 'Stoffwechsel anschalten, Wassereinlagerungen reduzieren, ersten Bauchumfang verlieren.',
  },
  {
    num: '2',
    title: 'Fettverbrennung aktivieren',
    desc: 'Gezielte Ernährung & Bewegung – dein Körper greift gezielt das Bauchfett an.',
  },
  {
    num: '3',
    title: 'Definition & Energie',
    desc: 'Mehr Power, sichtbar straffere Mitte, klare Veränderung auf der Waage und im Spiegel.',
  },
  {
    num: '4',
    title: 'Strandfigur-Finish',
    desc: 'Stabilisieren, Ergebnisse sichern – bereit für Pool, Strand und kurze Sommer-Outfits.',
  },
]

export function FahrplanSection() {
  const header = useScrollReveal(0.1)
  const cards = useScrollReveal(0.1)

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="blur-circle w-96 h-96 -top-24 -left-24 bg-primary" />
      <div className="blur-circle w-80 h-80 -bottom-20 -right-20 bg-accent" />

      <div className="mx-auto max-w-6xl px-5 relative z-10">
        <div
          ref={header.ref}
          className={`text-center mb-14 fade-up ${header.isReady ? 'anim-ready' : ''} ${header.isVisible ? 'animate' : ''}`}
        >
          <span className="badge-pill bg-primary text-white mb-5 shadow-md">
            <Zap className="w-3.5 h-3.5" />
            4 Wochen · 4 Stufen
          </span>
          <h2 className="text-3xl sm:text-5xl leading-tight">
            Dein Fahrplan zur <span className="text-primary-dark">Strandfigur</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-muted-foreground">
            Schritt für Schritt, ohne Hunger, mit klarer Struktur – damit du dich am Pool,
            am Strand und im Spiegel wieder rundum wohlfühlst.
          </p>
        </div>

        <div ref={cards.ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {WEEKS.map((week, i) => {
            const alt = i % 2 === 1
            return (
              <div
                key={week.num}
                className={`card-soft relative h-full p-7 overflow-hidden fade-up ${cards.isReady ? 'anim-ready' : ''} ${cards.isVisible ? 'animate' : ''}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-60 ${alt ? 'bg-accent/30' : 'bg-secondary'}`}
                />
                <div className="relative z-10 flex items-baseline gap-2 mb-4">
                  <span className={`text-7xl font-extrabold leading-none gradient-number ${alt ? 'gradient-number--alt' : ''}`}>
                    {week.num}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.22em] ${alt ? 'text-accent-deep' : 'text-primary-dark'}`}>
                    Woche
                  </span>
                </div>
                <h3 className="relative z-10 text-lg mb-2 leading-tight">{week.title}</h3>
                <p className="relative z-10 text-sm leading-relaxed text-muted-foreground">{week.desc}</p>
                <div
                  className={`absolute bottom-0 left-0 h-1 w-full ${
                    alt
                      ? 'bg-gradient-to-r from-accent to-accent-deep'
                      : 'bg-gradient-to-r from-primary to-primary-dark'
                  }`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
