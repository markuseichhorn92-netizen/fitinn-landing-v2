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
      <div className="bg-card/97 backdrop-blur-xl border-t border-border/60 shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">

        {/* Mobile Layout: Urgency-Text + vollbreiter Button */}
        <div className="sm:hidden px-4 pt-3 pb-safe-4">
          <div className="flex items-center justify-center gap-2 mb-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">
              <span className="text-accent font-semibold">Noch 3 Plätze</span> · Kostenlos & unverbindlich
            </span>
          </div>
          <button
            onClick={onStartQuiz}
            className="btn-cta w-full inline-flex items-center justify-center gap-2 text-base py-3.5 rounded-xl"
          >
            Probetraining sichern
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop Layout: Trust links + Button rechts */}
        <div className="hidden sm:block pb-safe">
          <div className="mx-auto max-w-7xl px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">§ 20 SGB V</span> · Bis zu 100% von der Krankenkasse erstattet<sup>²³</sup>
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
    </div>
  )
}
