'use client'

import { useScrollReveal, useCountUp } from '@/hooks/useScrollReveal'
import { SectionBadge } from '@/components/SectionBadge'
import { TrendingDown, Clock, Ban, Scale, Frown, Repeat } from 'lucide-react'

const problems = [
  {
    icon: Scale,
    title: 'Die Waage bewegt sich nicht',
    text: 'Egal was du isst, egal wie viel du trainierst — die Zahl bleibt stehen.',
  },
  {
    icon: Repeat,
    title: 'Jo-Jo-Effekt nach jeder Diät',
    text: 'Zwei Wochen durchgehalten, dann kommt alles zurück — plus Extra-Kilos.',
  },
  {
    icon: Ban,
    title: 'Kein Plan für deinen Alltag',
    text: 'Meal-Prep, Kalorienzählen, 6x Training — klingt gut, passt aber nicht ins echte Leben.',
  },
]

export function ProblemSection() {
  const section = useScrollReveal(0.1)
  const counter1 = useCountUp(73, 1200, section.isVisible)
  const counter2 = useCountUp(9, 1000, section.isVisible)

  return (
    <section id="problem" ref={section.ref} className="py-14 md:py-28 px-5">
      <div className="mx-auto max-w-5xl">
        <SectionBadge number="01" label="Das Problem" />

        <h2
          className={`text-3xl md:text-5xl font-bold mb-4 leading-tight fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          Alles versucht.<br />
          <span className="text-muted-foreground/60">Nichts hat funktioniert.</span>
        </h2>

        <p
          className={`text-muted-foreground text-base md:text-lg max-w-2xl mb-12 md:mb-16 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          Du hast Diäten, Apps und Trainingspläne ausprobiert — aber nichts hat langfristig funktioniert. Das Problem ist nicht dein Wille. <strong className="text-foreground">Es ist der Ansatz.</strong>
        </p>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
          <div
            className={`rounded-2xl border border-border bg-card p-5 md:p-8 relative overflow-hidden fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.15s' }}
          >
            <div className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-destructive/5 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 md:w-6 md:h-6 text-destructive/40" />
            </div>
            <span className="text-4xl md:text-7xl font-bold text-foreground font-[family-name:var(--font-barlow-condensed)] tracking-tight">
              {counter1}%
            </span>
            <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-[200px]">
              aller Diäten enden im Jo-Jo-Effekt⁴
            </p>
          </div>

          <div
            className={`rounded-2xl border border-border bg-card p-5 md:p-8 relative overflow-hidden fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.25s' }}
          >
            <div className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-destructive/5 flex items-center justify-center">
              <Frown className="w-5 h-5 md:w-6 md:h-6 text-destructive/40" />
            </div>
            <span className="text-4xl md:text-7xl font-bold text-foreground font-[family-name:var(--font-barlow-condensed)] tracking-tight">
              {counter2}
            </span>
            <span className="text-lg md:text-3xl font-bold text-muted-foreground/50 font-[family-name:var(--font-barlow-condensed)] ml-1">
              von 10
            </span>
            <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-[240px]">
              geben nach 6 Wochen auf — weil der Plan nicht passt
            </p>
          </div>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {problems.map((problem, i) => (
            <div
              key={i}
              className={`group rounded-2xl border border-border bg-card p-5 md:p-6 transition-all duration-300 hover:border-destructive/20 hover:shadow-md fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-destructive/5 flex items-center justify-center mb-4 group-hover:bg-destructive/10 transition-colors">
                <problem.icon className="w-5 h-5 text-destructive/50" />
              </div>
              <h3 className="text-base font-bold mb-1.5">{problem.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
