'use client'

import { MessageSquare, BarChart2, Dumbbell, Target } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const steps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Kostenloses Probetraining',
    description: 'Lerne das Studio kennen, trainiere einmal mit und besprich deine Ziele — unverbindlich und kostenlos.',
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
    description: '2–3 Einheiten/Woche im FIT-INN Trier – ein Trainer ist immer vor Ort für Fragen und Korrekturen.',
  },
  {
    icon: Target,
    step: '04',
    title: 'Dein Ergebnis',
    description: 'Abschluss-Körperanalyse nach 8 Wochen – du siehst schwarz auf weiß was sich verändert hat.',
  },
]

const framePath = 'M 4 1 H 196 Q 199 1 199 4 V 96 Q 199 99 196 99 H 4 Q 1 99 1 96 V 4 Q 1 1 4 1 Z'

export function ProcessSection() {
  const section = useScrollReveal(0.15)

  return (
    <section id="ablauf" className="py-10 relative overflow-hidden" ref={section.ref}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`text-center mb-12 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0s' }}
        >
          <span className="text-sm text-primary uppercase tracking-widest font-semibold">So läuft HappyFigur ab</span>
          <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide mt-4">
            4 Schritte zu <span className="text-primary">deinem Ergebnis</span>
          </h2>
        </div>

        {/* === DESKTOP === */}
        <div className="hidden md:block relative">

          {/* SVG Frame — zeichnet sich als Rahmen um alle Steps */}
          <div className="absolute -inset-x-4 -inset-y-3 pointer-events-none">
            <svg
              className={`w-full h-full process-frame ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: '0.5s' }}
              viewBox="0 0 200 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
                  <stop offset="40%" stopColor="var(--primary)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.4" />
                </linearGradient>
                <filter id="frameGlow">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                </filter>
              </defs>
              {/* Glow-Layer */}
              <path
                d={framePath}
                stroke="var(--primary)" strokeWidth="2.5" strokeOpacity="0.25"
                filter="url(#frameGlow)"
                pathLength="100" className="frame-draw"
              />
              {/* Hauptlinie */}
              <path
                d={framePath}
                stroke="url(#frameGrad)" strokeWidth="0.9"
                pathLength="100" className="frame-draw"
              />
              {/* Shimmer — leuchtet endlos entlang */}
              <path
                d={framePath}
                stroke="white" strokeWidth="1.8" strokeOpacity="0.1"
                pathLength="100" className="frame-shimmer-path"
              />
            </svg>
          </div>

          {/* Step Cards */}
          <div className="relative z-10 grid grid-cols-4 gap-8 py-6 px-2">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex flex-col items-center text-center materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
                style={{ animationDelay: `${0.15 + i * 0.2}s` }}
              >
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 step-icon-box ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
                    style={{ animationDelay: `${0.8 + i * 0.5}s` }}
                  >
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-20">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[220px]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* === MOBILE === */}
        <div className="md:hidden relative">
          {/* SVG Frame vertikal */}
          <div className="absolute -inset-x-2 -inset-y-2 pointer-events-none">
            <svg
              className={`w-full h-full process-frame ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: '0.5s' }}
              viewBox="0 0 100 200"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="frameGradM" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.3" />
                </linearGradient>
                <filter id="frameGlowM">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                </filter>
              </defs>
              <rect x="1" y="1" width="98" height="198" rx="4" ry="4"
                stroke="var(--primary)" strokeWidth="2" strokeOpacity="0.2"
                filter="url(#frameGlowM)"
                pathLength="100" className="frame-draw" />
              <rect x="1" y="1" width="98" height="198" rx="4" ry="4"
                stroke="url(#frameGradM)" strokeWidth="0.8"
                pathLength="100" className="frame-draw" />
              <rect x="1" y="1" width="98" height="198" rx="4" ry="4"
                stroke="white" strokeWidth="1.5" strokeOpacity="0.1"
                pathLength="100" className="frame-shimmer-path" />
            </svg>
          </div>

          {/* Step Cards vertikal */}
          <div className="relative z-10 flex flex-col gap-8 py-4 px-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 step-icon-box ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
                    style={{ animationDelay: `${0.8 + i * 0.5}s` }}
                  >
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-20 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
                    style={{ animationDelay: `${0.3 + i * 0.2}s` }}
                  >
                    {step.step}
                  </span>
                </div>
                <div
                  className={`pt-2 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
                  style={{ animationDelay: `${0.3 + i * 0.2}s` }}
                >
                  <h3 className="text-sm font-bold uppercase tracking-wide mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft CTA */}
        <div className="mt-10 text-center">
          <a href="https://wa.me/4915679610457" target="_blank" rel="noopener noreferrer" className="btn-outline">
            Fragen? Wir antworten auf WhatsApp
          </a>
          <p className="text-xs text-muted-foreground mt-3">Schnell, unkompliziert — wir melden uns</p>
        </div>

      </div>
    </section>
  )
}
