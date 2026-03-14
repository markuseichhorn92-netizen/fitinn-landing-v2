'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Phone, MessageCircle } from 'lucide-react'

export function StickyBar({ onStartQuiz }: { onStartQuiz: () => void }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero-cta')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-background transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Mobile */}
      <div className="sm:hidden bg-background backdrop-blur-xl border-t border-border/60 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] sticky-accent-border">
        <div className="px-4 pt-3 pb-4">
          {/* Primary CTA */}
          <button
            onClick={onStartQuiz}
            className="btn-cta w-full inline-flex items-center justify-center gap-2 text-[15px] font-bold py-3.5 rounded-xl"
          >
            PROBETRAINING SICHERN
            <ArrowRight className="w-4 h-4" />
          </button>
          {/* Secondary contact */}
          <div className="flex gap-2 mt-2">
            <a
              href="tel:+496513085240"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 border border-border/40 text-xs text-muted-foreground active:scale-95 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              Anrufen
            </a>
            <a
              href="https://wa.me/4915679610457"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 border border-border/40 text-xs text-muted-foreground active:scale-95 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block bg-background/95 backdrop-blur-xl border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] pb-safe sticky-accent-border">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">§ 20 SGB V</span>
                {' · '}Bis zu 100% von der Krankenkasse erstattet<sup>*</sup>
              </span>
            </div>
            <button
              onClick={onStartQuiz}
              className="btn-cta inline-flex items-center gap-2 text-sm py-2.5 px-5 shrink-0"
            >
              Probetraining sichern
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
