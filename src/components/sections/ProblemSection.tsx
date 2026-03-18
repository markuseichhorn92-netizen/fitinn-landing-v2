'use client'

import { useScrollReveal, useCountUp } from '@/hooks/useScrollReveal'
import { SectionBadge } from '@/components/SectionBadge'
import { X } from 'lucide-react'

export function ProblemSection() {
  const section = useScrollReveal(0.1)
  const counter1 = useCountUp(73, 1200, section.isVisible)
  const counter2 = useCountUp(9, 1000, section.isVisible)

  return (
    <section id="problem" ref={section.ref} className="py-12 md:py-24 px-5">
      <div className="mx-auto max-w-5xl">
        <SectionBadge number="01" label="Das Problem" />

        <h2
          className={`text-2xl md:text-4xl font-bold mb-6 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          Alles versucht.<br />
          <span className="text-muted-foreground">Nichts hat funktioniert.</span>
        </h2>

        <p
          className={`text-muted-foreground text-lg max-w-2xl mb-12 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          Du hast Diäten, Apps und Trainingspläne ausprobiert — aber nichts hat langfristig funktioniert. Das Problem ist nicht dein Wille. Es ist der Ansatz.
        </p>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            className={`border-t border-border pt-8 pb-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.15s' }}
          >
            <span className="text-4xl md:text-6xl font-bold text-foreground font-[family-name:var(--font-barlow-condensed)] tracking-tight">
              {counter1}%
            </span>
            <p className="text-muted-foreground mt-2">
              aller Diäten enden im Jo-Jo-Effekt⁴
            </p>
          </div>
          <div
            className={`border-t border-border pt-8 pb-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.25s' }}
          >
            <span className="text-4xl md:text-6xl font-bold text-foreground font-[family-name:var(--font-barlow-condensed)] tracking-tight">
              {counter2} <span className="text-xl md:text-3xl text-muted-foreground">von 10</span>
            </span>
            <p className="text-muted-foreground mt-2">
              geben nach 6 Wochen auf — weil der Plan nicht zu ihrem Alltag passt
            </p>
          </div>
        </div>

        {/* Problem points */}
        <div className="space-y-4">
          {[
            'Die Waage bewegt sich nicht — egal was du isst',
            'Jo-Jo-Effekt nach jeder Diät',
            'Kein Plan, der wirklich zu deinem Alltag passt',
          ].map((text, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 text-muted-foreground fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
            >
              <X className="w-5 h-5 text-destructive/60 shrink-0 mt-0.5" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
