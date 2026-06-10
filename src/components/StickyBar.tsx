'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Phone } from 'lucide-react'

export function StickyBar({ onCta }: { onCta: () => void }) {
  const [heroGone, setHeroGone] = useState(false)
  const [bookingInView, setBookingInView] = useState(false)

  useEffect(() => {
    const heroCta = document.getElementById('hero-cta')
    const booking = document.getElementById('booking')
    const observers: IntersectionObserver[] = []

    if (heroCta) {
      const io = new IntersectionObserver(
        ([entry]) => setHeroGone(!entry.isIntersecting),
        { threshold: 0 }
      )
      io.observe(heroCta)
      observers.push(io)
    }
    if (booking) {
      const io = new IntersectionObserver(
        ([entry]) => setBookingInView(entry.isIntersecting),
        { threshold: 0.15 }
      )
      io.observe(booking)
      observers.push(io)
    }
    return () => observers.forEach(io => io.disconnect())
  }, [])

  const isVisible = heroGone && !bookingInView

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Mobile */}
      <div className="sm:hidden bg-white/95 backdrop-blur-xl border-t border-black/5 shadow-[0_-4px_20px_rgba(15,80,80,0.15)]">
        <div className="px-4 pt-3 pb-4 pb-safe-4">
          <button
            onClick={onCta}
            className="btn-pill w-full text-[15px] py-3.5"
          >
            Platz sichern
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="tel:+49651308524"
            className="mt-2 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-secondary border border-border-teal text-xs text-muted-foreground active:scale-95 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            Anrufen · 0651 308524
          </a>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block bg-white/95 backdrop-blur-xl border-t border-black/5 shadow-[0_-4px_20px_rgba(15,80,80,0.12)] pb-safe">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">30 Tage Bauchweg Projekt</span>
                {' · '}Probetraining kostenlos &amp; unverbindlich²
              </span>
            </div>
            <button
              onClick={onCta}
              className="btn-pill text-sm py-2.5 px-5 shrink-0"
            >
              Platz sichern
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
