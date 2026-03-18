'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, BarChart2, Dumbbell, Target } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionBadge } from '@/components/SectionBadge'

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Probetraining buchen',
    when: 'Heute',
    description: 'Lerne das Studio kennen und besprich deine Ziele — kostenlos und unverbindlich.',
    color: 'accent' as const,
  },
  {
    icon: BarChart2,
    number: '02',
    title: 'Analyse + Plan',
    when: 'Woche 1',
    description: 'InBody-Körperanalyse, individueller Trainings- und Ernährungsplan.',
    color: 'primary' as const,
  },
  {
    icon: Dumbbell,
    number: '03',
    title: '8 Wochen Training',
    when: 'Woche 1–8',
    description: '2–3× pro Woche im FIT-INN. Trainer immer vor Ort ansprechbar.',
    color: 'accent' as const,
  },
  {
    icon: Target,
    number: '04',
    title: 'Ergebnis sehen',
    when: 'Woche 8',
    description: 'Abschluss-Analyse — du siehst schwarz auf weiß, was sich verändert hat.',
    color: 'primary' as const,
  },
]

const colorMap = {
  accent: {
    iconBg: 'bg-accent/10',
    iconBorder: 'border-accent/30',
    iconText: 'text-accent',
    numberText: 'text-accent',
    dot: 'bg-accent',
    glow: 'shadow-accent/20',
    line: 'bg-accent',
  },
  primary: {
    iconBg: 'bg-primary/10',
    iconBorder: 'border-primary/30',
    iconText: 'text-primary',
    numberText: 'text-primary',
    dot: 'bg-primary',
    glow: 'shadow-primary/20',
    line: 'bg-primary',
  },
}

// Step delay in ms — each step appears sequentially
const STEP_BASE_DELAY = 800
const STEP_INTERVAL = 1200

export function ProcessSection() {
  const section = useScrollReveal(0.1)
  const [activeStep, setActiveStep] = useState(-1)

  useEffect(() => {
    if (!section.isVisible) return
    const timers: ReturnType<typeof setTimeout>[] = []
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveStep(i), STEP_BASE_DELAY + i * STEP_INTERVAL))
    })
    return () => timers.forEach(clearTimeout)
  }, [section.isVisible])

  return (
    <section id="ablauf" ref={section.ref} className="py-16 md:py-28 px-5">
      <div className="mx-auto max-w-5xl">
        <SectionBadge number="03" label="Dein Weg" />

        <h2
          className={`text-2xl md:text-4xl font-bold mb-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          4 Schritte zum <span className="text-primary">Ergebnis</span>
        </h2>

        <p
          className={`text-muted-foreground text-lg max-w-2xl mb-16 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          Von der ersten Beratung bis zum messbaren Ergebnis — wir begleiten dich die gesamte Zeit.
        </p>

        {/* ═══ DESKTOP: Horizontal sequential timeline ═══ */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Background line segments BETWEEN icons (not through them) */}
            {/* Each segment: from right edge of icon i to left edge of icon i+1 */}
            {/* Icon centers are at 12.5%, 37.5%, 62.5%, 87.5%. Icon width = 64px = ~4rem */}
            {[0, 1, 2].map(i => (
              <div
                key={`bg-${i}`}
                className="absolute top-8 h-0.5 bg-border"
                style={{
                  left: `calc(${12.5 + i * 25}% + 36px)`,
                  right: `calc(${87.5 - (i + 1) * 25}% + 36px)`,
                }}
              />
            ))}

            {/* Animated colored line segments */}
            {[0, 1, 2].map(i => {
              const colors = colorMap[steps[i].color]
              const shouldFill = i < activeStep
              return (
                <div
                  key={`line-${i}`}
                  className={`absolute top-8 h-0.5 origin-left transition-transform ease-out ${colors.line}`}
                  style={{
                    left: `calc(${12.5 + i * 25}% + 36px)`,
                    right: `calc(${87.5 - (i + 1) * 25}% + 36px)`,
                    transform: shouldFill ? 'scaleX(1)' : 'scaleX(0)',
                    transitionDuration: `${STEP_INTERVAL * 0.8}ms`,
                  }}
                />
              )
            })}

            <div className="grid grid-cols-4">
              {steps.map((step, i) => {
                const colors = colorMap[step.color]
                const isActive = i <= activeStep
                const justActivated = i === activeStep

                return (
                  <div key={i} className="flex flex-col items-center relative">
                    {/* Icon dot */}
                    <div
                      className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                        isActive
                          ? `${colors.iconBorder} ${colors.iconBg} shadow-lg ${colors.glow} scale-100`
                          : 'border-border bg-secondary scale-75 opacity-40'
                      }`}
                    >
                      <step.icon className={`w-7 h-7 transition-colors duration-500 ${isActive ? colors.iconText : 'text-muted-foreground/40'}`} />

                      {/* Pop ring when activating */}
                      {justActivated && (
                        <div className={`absolute inset-0 rounded-2xl border-2 ${colors.iconBorder} animate-[ping_0.8s_ease-out_forwards]`} />
                      )}
                    </div>

                    {/* When badge */}
                    <div
                      className={`mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                        isActive
                          ? `${colors.iconBg} ${colors.numberText}`
                          : 'bg-transparent text-transparent'
                      }`}
                    >
                      {step.when}
                    </div>

                    {/* Content */}
                    <div
                      className={`text-center mt-3 transition-all duration-500 ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}
                    >
                      <h3 className="text-lg font-bold mb-1.5">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px] mx-auto">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ═══ MOBILE: Vertikale Timeline (gleicher Style wie Desktop) ═══ */}
        <div className="md:hidden">
          <div className="relative pl-14">
            {/* Vertikale Hintergrund-Linie — zentriert durch Icons */}
            <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-border/40 rounded-full" />

            {/* Animierte farbige Segmente */}
            {[0, 1, 2].map(i => {
              const colors = colorMap[steps[i].color]
              const shouldFill = i < activeStep
              return (
                <div
                  key={`vseg-${i}`}
                  className={`absolute left-[27px] w-[2px] rounded-full origin-top transition-transform ease-out ${colors.line}`}
                  style={{
                    top: `calc(${i * 25}% + 48px)`,
                    height: 'calc(25% - 40px)',
                    transform: shouldFill ? 'scaleY(1)' : 'scaleY(0)',
                    transitionDuration: `${STEP_INTERVAL * 0.8}ms`,
                  }}
                />
              )
            })}

            <div className="space-y-10">
              {steps.map((step, i) => {
                const colors = colorMap[step.color]
                const isActive = i <= activeStep
                const justActivated = i === activeStep

                return (
                  <div key={i} className="relative">
                    {/* Icon — absolut links positioniert auf der Linie */}
                    <div className="absolute -left-14 top-0">
                      <div
                        className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                          isActive
                            ? `${colors.iconBorder} ${colors.iconBg} shadow-lg ${colors.glow} scale-100`
                            : 'border-border bg-secondary scale-75 opacity-40'
                        }`}
                      >
                        <step.icon className={`w-6 h-6 transition-colors duration-500 ${isActive ? colors.iconText : 'text-muted-foreground/40'}`} />
                        {justActivated && (
                          <div className={`absolute inset-0 rounded-2xl border-2 ${colors.iconBorder} animate-[ping_0.8s_ease-out_forwards]`} />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`transition-all duration-500 ${
                        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
                      }`}
                    >
                      <div
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 transition-all duration-500 ${
                          isActive ? `${colors.iconBg} ${colors.numberText}` : 'bg-transparent text-transparent'
                        }`}
                      >
                        {step.when}
                      </div>
                      <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
