'use client'

import Image from 'next/image'
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const BULLETS = [
  '100 Genussrezepte für eine schlanke Körpermitte',
  'Schnelle Frühstücks-Bowls & Smoothies',
  'Sättigende Hauptgerichte unter 30 Minuten',
  'Snacks & Desserts ohne schlechtes Gewissen',
  'Inkl. Einkaufslisten & Wochenpläne',
]

export function KochbuchSection({ onCta }: { onCta: () => void }) {
  const left = useScrollReveal(0.1)
  const right = useScrollReveal(0.1)

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-secondary">
      <div className="blur-circle w-96 h-96 top-10 -left-32 bg-accent" />

      <div className="mx-auto max-w-6xl px-5 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* CSS-Buch-Mockup mit Food-Bildern */}
          <div
            ref={left.ref}
            className={`relative flex items-center justify-center py-8 fade-up ${left.isReady ? 'anim-ready' : ''} ${left.isVisible ? 'animate' : ''}`}
          >
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full opacity-40 bg-[radial-gradient(circle,var(--accent)_0%,transparent_70%)]" />
            <div className="relative z-10 w-64 sm:w-80 rotate-[-6deg] hover:rotate-[-2deg] transition-transform duration-500">
              {/* Buchdeckel */}
              <div className="rounded-r-2xl rounded-l-md overflow-hidden shadow-2xl bg-gradient-to-br from-primary to-primary-dark border-l-8 border-primary-dark/60">
                <div className="p-7 pb-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 mb-4">
                    FIT-INN Trier
                  </p>
                  <p className="text-3xl font-extrabold leading-tight text-white uppercase tracking-tight">
                    Schlank
                    <br />
                    mit Genuss
                  </p>
                  <p className="mt-2 text-sm text-white/85">
                    Das Bauchweg-Kochbuch
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-1 px-7 pb-7">
                  <Image src="/food-smoothie.jpg" alt="Smoothie-Rezept" width={200} height={200} className="rounded-lg aspect-square object-cover" />
                  <Image src="/food-lentils.jpg" alt="Linsen-Rezept" width={200} height={200} className="rounded-lg aspect-square object-cover" />
                  <Image src="/food-mango.jpg" alt="Mango-Bowl-Rezept" width={200} height={200} className="rounded-lg aspect-square object-cover" />
                </div>
              </div>
            </div>
            <span className="absolute z-20 top-4 right-4 sm:top-8 sm:right-8 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold tracking-wide shadow-xl rotate-12 bg-accent text-primary-dark">
              100 REZEPTE
            </span>
          </div>

          <div
            ref={right.ref}
            className={`fade-up delay-200 ${right.isReady ? 'anim-ready' : ''} ${right.isVisible ? 'animate' : ''}`}
          >
            <span className="badge-pill bg-primary text-white mb-5 shadow-md">
              <BookOpen className="w-3.5 h-3.5" />
              Im Paket enthalten
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-5">
              Dein Kochbuch für 30 Tage –
              <br />
              <span className="text-primary-dark">Schlank mit Genuss.</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-7 text-muted-foreground">
              100 alltagstaugliche Genussrezepte – speziell entwickelt für eine schlanke
              Körpermitte. Schnell zubereitet, sättigend, ohne Verzicht und Hungergefühl.
            </p>
            <ul className="space-y-3 mb-8">
              {BULLETS.map(bullet => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br from-primary to-primary-dark">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </span>
                  <span className="text-base font-medium">{bullet}</span>
                </li>
              ))}
            </ul>
            <button onClick={onCta} className="btn-pill text-base px-8 py-4">
              Jetzt mit Kochbuch starten
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
