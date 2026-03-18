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
            {/* Background line */}
            <div className="absolute top-8 left-[calc(12.5%)] right-[calc(12.5%)] h-0.5 bg-border" />

            <div className="grid grid-cols-4">
              {steps.map((step, i) => {
                const colors = colorMap[step.color]
                const isActive = i <= activeStep
                const justActivated = i === activeStep

                return (
                  <div key={i} className="flex flex-col items-center relative">
                    {/* Animated line segment to next step */}
                    {i < steps.length - 1 && (
                      <div
                        className={`absolute top-8 left-1/2 h-0.5 transition-all ease-out ${colors.line}`}
                        style={{
                          width: isActive && activeStep > i ? '100%' : '0%',
                          transitionDuration: `${STEP_INTERVAL * 0.8}ms`,
                        }}
                      />
                    )}

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

        {/* ═══ MOBILE: Vertical sequential timeline ═══ */}
        <div className="md:hidden">
          <div className="relative pl-10">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />
            {/* Animated fill line */}
            <div
              className="absolute left-[19px] top-0 w-0.5 bg-primary transition-all ease-out"
              style={{
                height: activeStep >= 0 ? `${Math.min(100, (activeStep / (steps.length - 1)) * 100)}%` : '0%',
                transitionDuration: `${STEP_INTERVAL * 0.8}ms`,
              }}
            />

            <div className="space-y-8">
              {steps.map((step, i) => {
                const colors = colorMap[step.color]
                const isActive = i <= activeStep
                const justActivated = i === activeStep

                return (
                  <div key={i} className="relative">
                    {/* Dot on the line */}
                    <div
                      className={`absolute -left-10 top-1 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? `${colors.iconBg} border ${colors.iconBorder} shadow-md ${colors.glow} scale-100`
                          : 'bg-secondary border border-border scale-75 opacity-40'
                      }`}
                    >
                      <step.icon className={`w-4.5 h-4.5 transition-colors duration-500 ${isActive ? colors.iconText : 'text-muted-foreground/40'}`} />

                      {justActivated && (
                        <div className={`absolute inset-0 rounded-xl border ${colors.iconBorder} animate-[ping_0.8s_ease-out_forwards]`} />
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`transition-all duration-500 ${
                        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                    >
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-1.5 ${colors.iconBg} ${colors.numberText}`}>
                        {step.when}
                      </span>
                      <h3 className="text-base font-bold mb-1">{step.title}</h3>
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
