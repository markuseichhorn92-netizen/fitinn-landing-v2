'use client'

import Image from 'next/image'
import { ArrowRight, Star, Zap } from 'lucide-react'

export function HeroSection({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative overflow-hidden min-h-[88vh]">
      {/* Hintergrundbild + Creme-Verlauf */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.avif"
          alt="Training im FIT-INN Trier"
          fill
          priority
          className="object-cover object-[center_30%] sm:object-[right_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-background via-background/85 to-background/10" />
        <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-background/25 via-background/60 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 flex items-center min-h-[88vh]">
        <div className="max-w-xl py-28">
          <span className="badge-pill bg-primary text-white mb-7 animate-fade-up">
            <Zap className="w-3.5 h-3.5" />
            30-Tage-Programm
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] mb-5 uppercase tracking-tight text-primary animate-fade-up delay-100">
            30 Tage
            <br />
            <span className="text-primary-dark">Bauchweg</span>
            <br />
            <span className="text-primary-dark">Projekt</span>
          </h1>

          <p className="text-2xl sm:text-3xl font-extrabold italic mb-2 uppercase tracking-tight text-accent-deep animate-fade-up delay-200">
            bis zu 5–10 kg weniger<sup>⁴</sup>
          </p>
          <p className="text-sm sm:text-base font-bold tracking-[0.28em] uppercase mb-8 text-primary animate-fade-up delay-200">
            Schnell · Einfach · Effektiv.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start animate-fade-up delay-300">
            <button id="hero-cta" onClick={onCta} className="btn-pill text-base px-8 py-4">
              Jetzt Platz sichern
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex flex-col gap-0.5 pt-1">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm font-bold">4.9</span>
              </div>
              <span className="text-xs text-muted-foreground">127 Google-Rezensionen</span>
            </div>
          </div>

          <p className="flex items-center gap-3 mt-6 text-sm font-medium animate-fade-up delay-400">
            „Endlich Struktur und echte Begleitung.“
          </p>
        </div>
      </div>
    </section>
  )
}
