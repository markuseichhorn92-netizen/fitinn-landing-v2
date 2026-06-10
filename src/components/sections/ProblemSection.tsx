'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const SIGNS = [
  'Hartnäckiger Bauchumfang trotz Training',
  'Wenig Energie & Motivationstiefs',
  'Heißhunger – besonders abends',
  'Frust vor jeder Bikini-Saison',
]

export function ProblemSection() {
  const left = useScrollReveal(0.1)
  const right = useScrollReveal(0.1)

  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            ref={left.ref}
            className={`fade-up ${left.isReady ? 'anim-ready' : ''} ${left.isVisible ? 'animate' : ''}`}
          >
            <p className="text-xs uppercase tracking-[0.22em] font-bold text-primary">
              Der unsichtbare Gegner
            </p>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.1] tracking-tight">
              Viszerales Fett –
              <span className="block font-extrabold mt-2 text-primary-dark">
                was deinen Sommerbody blockiert.
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed">
              <p>
                Trotz Training, Diäten und Disziplin verändert sich der Bauch oft kaum.
                Der Grund liegt häufig tiefer:{' '}
                <strong className="text-primary-dark">viszerales Fett</strong> rund um die
                inneren Organe.
              </p>
              <p>
                Dieses unsichtbare Bauchfett steht in Verbindung mit Müdigkeit, Heißhunger,
                Stoffwechselproblemen und einem wachsenden Bauchumfang – und ist exakt das,
                was zwischen dir und deinem Sommer-Wohlfühlgefühl steht.
              </p>
            </div>

            <div className="mt-6 p-5 rounded-xl border-l-4 border-accent bg-white shadow-sm">
              <p className="text-sm leading-relaxed">
                <strong className="text-primary-dark">Die gute Nachricht:</strong>{' '}
                Genau dieses Fett reagiert besonders gut auf die richtige Kombination aus
                Ernährung, Stoffwechsel-Training und persönlicher Begleitung – wie im
                30 Tage Bauchweg Projekt.⁴
              </p>
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.22em] font-bold mb-4 text-primary-dark">
                Typische Anzeichen
              </p>
              <ul className="space-y-3">
                {SIGNS.map(sign => (
                  <li key={sign} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-primary" />
                    <span className="text-sm font-medium">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            ref={right.ref}
            className={`fade-up delay-200 ${right.isReady ? 'anim-ready' : ''} ${right.isVisible ? 'animate' : ''}`}
          >
            <div className="rounded-3xl overflow-hidden shadow-xl bg-white">
              <Image
                src="/Gemini_Generated_Image_opjcz0opjcz0opjc.png"
                alt="Persönliche Betreuung im FIT-INN Trier – Coach erklärt die Körperanalyse"
                width={1408}
                height={768}
                className="w-full h-auto block"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className="mt-6 text-xs text-center font-medium text-muted-foreground">
              Persönliche Betreuung & Körperanalyse im FIT-INN Trier.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
