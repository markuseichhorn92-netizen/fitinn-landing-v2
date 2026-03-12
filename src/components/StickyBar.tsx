'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function StickyBar({ onStartQuiz }: { onStartQuiz: () => void }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-card/95 backdrop-blur-md border-t border-border shadow-2xl">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Trust */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">§ 20 SGB V</span> · Bis zu 100% von der Krankenkasse erstattet<sup>²³</sup>
              </span>
            </div>

            {/* Mobile: Short text */}
            <div className="flex sm:hidden items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-semibold text-accent">Noch 3 Plätze frei</span>
            </div>

            {/* CTA */}
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
