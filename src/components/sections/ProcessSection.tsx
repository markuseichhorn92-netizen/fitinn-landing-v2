'use client'

import { MessageSquare, BarChart2, Dumbbell, Target } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionBadge } from '@/components/SectionBadge'

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Probetraining',
    description: 'Lerne das Studio kennen und besprich deine Ziele — kostenlos und unverbindlich.',
  },
  {
    icon: BarChart2,
    number: '02',
    title: 'Analyse + Plan',
    description: 'InBody-Körperanalyse, individueller Trainings- und Ernährungsplan.',
  },
  {
    icon: Dumbbell,
    number: '03',
    title: '8 Wochen Training',
    description: '2–3× pro Woche im FIT-INN. Trainer immer vor Ort ansprechbar.',
  },
  {
    icon: Target,
    number: '04',
    title: 'Ergebnis sehen',
    description: 'Abschluss-Analyse — du siehst schwarz auf weiß, was sich verändert hat.',
  },
]

export function ProcessSection() {
  const section = useScrollReveal(0.1)

  return (
    <section id="ablauf" ref={section.ref} className="py-12 md:py-24 px-5">
      <div className="mx-auto max-w-5xl">
        <SectionBadge number="03" label="Dein Weg" />

        <h2
          className={`text-2xl md:text-4xl font-bold mb-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          4 Schritte zum <span className="text-primary">Ergebnis</span>
        </h2>

        <p
          className={`text-muted-foreground text-lg max-w-2xl mb-14 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          Von der ersten Beratung bis zum messbaren Ergebnis — wir begleiten dich die gesamte Zeit.
        </p>

        {/* Horizontal Timeline (Desktop) / Vertical (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              {/* Connector line (desktop only, not on last item) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-[-50%] h-px bg-border" />
              )}

              {/* Step number + icon */}
              <div className="flex items-center gap-4 md:flex-col md:items-start mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-border ${
                  i === 0 ? 'bg-accent/10 border-accent/20' : 'bg-card'
                }`}>
                  <step.icon className={`w-5 h-5 ${i === 0 ? 'text-accent' : 'text-muted-foreground'}`} />
                </div>
                <span className="text-xs font-mono font-bold text-muted-foreground tracking-widest md:mt-3">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
