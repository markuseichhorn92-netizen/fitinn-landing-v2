'use client'

import React from 'react'
import { MessageSquare, BarChart2, Dumbbell, Target } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const steps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Kostenloses Erstgespräch',
    description: 'Ruf an oder schreib uns – wir klären ob happyfigur zu dir passt.',
  },
  {
    icon: BarChart2,
    step: '02',
    title: 'Dein persönlicher Plan',
    description: 'InBody-Körperanalyse + individueller Trainings- und Ernährungsplan.',
  },
  {
    icon: Dumbbell,
    step: '03',
    title: 'Begleitetes Training',
    description: '2–3 Einheiten/Woche im FIT-INN Trier – immer mit Coach an deiner Seite.',
  },
  {
    icon: Target,
    step: '04',
    title: 'Dein Ergebnis',
    description: 'Abschluss-Körperanalyse nach 8 Wochen – du siehst schwarz auf weiß was sich verändert hat.',
  },
]

export function ProcessSection() {
  const section = useScrollReveal(0.15)

  return (
    <section id="ablauf" className="py-16 relative overflow-hidden" ref={section.ref}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className={`text-center mb-10 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
          <span className="text-sm text-primary uppercase tracking-widest font-semibold">So läuft HappyFigur ab</span>
          <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide mt-4">
            4 Schritte zu <span className="text-primary">deinem Ergebnis</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6 md:gap-0 relative">
          {/* Energy Beam Connectors (Desktop) — 3 Beams für 4 Spalten */}
          <div
            className={`hidden md:block absolute top-[3.5rem] left-[15%] w-[19%] energy-beam ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.4s' }}
          />
          <div
            className={`hidden md:block absolute top-[3.5rem] left-[40%] w-[19%] energy-beam ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.65s' }}
          />
          <div
            className={`hidden md:block absolute top-[3.5rem] left-[65%] w-[19%] energy-beam ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.9s' }}
          />

          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div
                className={`relative flex flex-col items-center text-center px-4 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
                style={{ animationDelay: `${0.2 + i * 0.2}s` }}
              >
                {/* Step Number + Icon */}
                <div className="relative mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center relative z-10">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Vertical Energy Beam (Mobile only) */}
              {i < steps.length - 1 && (
                <div className={`md:hidden flex justify-center py-2 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: `${0.3 + i * 0.2}s` }}>
                  <div className={`energy-beam-vertical ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: `${0.35 + i * 0.2}s` }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  )
}
