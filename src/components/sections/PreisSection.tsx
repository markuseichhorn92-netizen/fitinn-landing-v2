'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function PreisSection({ onCta }: { onCta: () => void }) {
  const section = useScrollReveal(0.1)

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-5">
        <div
          ref={section.ref}
          className={`grid md:grid-cols-2 gap-8 items-stretch fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          {/* Foto */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[360px] md:min-h-full">
            <Image
              src="/dooken-magic-edit-1773336253189.png"
              alt="Teilnehmerin zeigt ihren Erfolg nach dem 30 Tage Bauchweg Projekt"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-primary-dark/30" />
          </div>

          {/* Investitions-Karte */}
          <div className="rounded-3xl shadow-2xl p-8 sm:p-10 text-center flex flex-col justify-center bg-gradient-to-br from-primary-dark to-primary">
            <span className="badge-pill self-center bg-accent text-primary-dark mb-5">
              Deine Investition
            </span>
            <h2 className="text-3xl sm:text-4xl mb-3 text-white">
              Sichere dir einen der limitierten Plätze
            </h2>
            <p className="mb-6 text-white/90">
              Begrenzte Teilnehmerzahl pro Durchgang – damit jede persönliche Begleitung
              garantiert ist.
            </p>
            <div className="my-6">
              <span className="text-6xl font-extrabold text-white">
                69 €<sup className="text-2xl align-super">¹</sup>
              </span>
              <p className="text-sm mt-2 font-medium text-white/90">
                einmalig · komplettes 30 Tage Bauchweg Projekt
              </p>
            </div>
            <button
              onClick={onCta}
              className="btn-pill btn-pill--white self-center text-base px-8 py-4"
            >
              Jetzt Platz sichern
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-5 text-xs text-white/75">
              Erst Probetraining — kostenlos & unverbindlich.²
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
