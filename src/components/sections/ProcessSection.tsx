'use client'

import React from 'react'
import { Calendar, BarChart2, Target } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const steps = [
  {
    icon: Calendar,
    step: '01',
    title: 'Probetraining buchen',
    description: 'Sichere dir deinen kostenlosen Termin per WhatsApp oder Telefon – in unter 2 Minuten.',
  },
  {
    icon: BarChart2,
    step: '02',
    title: 'Körperanalyse starten',
    description: 'Wir messen präzise Gewicht, Fettanteil und Muskelmasse. So wissen wir genau, wo du stehst.',
  },
  {
    icon: Target,
    step: '03',
    title: '8 Wochen durchstarten',
    description: 'Mit individuellem Trainings- und Ernährungsplan erreichst du dein Ziel – begleitet von echten Profis.',
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
        <div className={`text-center mb-16 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
          <span className="text-sm text-primary uppercase tracking-widest font-semibold">So einfach geht&apos;s</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            3 Schritte zu <span className="text-primary">deinem Ziel</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            Kein komplizierter Prozess. Kein langer Weg. Einfach anfangen – wir machen den Rest.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-0 relative">
          {/* Energy Beam Connectors (Desktop) */}
          <div
            className={`hidden md:block absolute top-[3.5rem] left-[20%] w-[26%] energy-beam ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.5s' }}
          />
          <div
            className={`hidden md:block absolute top-[3.5rem] left-[54%] w-[26%] energy-beam ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.8s' }}
          />

          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div
                className={`relative flex flex-col items-center text-center px-6 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
                style={{ animationDelay: `${0.2 + i * 0.25}s` }}
              >
                {/* Step Number + Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center relative z-10">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Vertical Energy Beam (Mobile only) */}
              {i < steps.length - 1 && (
                <div className={`md:hidden flex justify-center py-2 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: `${0.35 + i * 0.25}s` }}>
                  <div className={`energy-beam-vertical ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: `${0.4 + i * 0.25}s` }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  )
}
