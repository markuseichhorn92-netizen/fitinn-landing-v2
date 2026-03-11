'use client'

import { Dumbbell, ChartLine, Target, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    icon: Dumbbell,
    title: 'Kostenloses Probetraining',
    description: 'Körperanalyse + Beratung + Geräte-Einweisung',
    time: 'Dein erster Termin',
    active: true,
  },
  {
    icon: ChartLine,
    title: 'Zwischen-Analyse',
    description: 'Fortschrittskontrolle & Plan-Anpassung',
    time: 'Woche 4',
  },
  {
    icon: Target,
    title: 'Abschluss-Analyse',
    description: 'Deine Transformation schwarz auf weiß',
    time: 'Woche 8',
  },
]

export function Timeline() {
  return (
    <section className="py-24 bg-card relative">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-sm text-accent uppercase tracking-widest font-semibold">Der Ablauf</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Dein Weg zum <span className="text-primary">Wunschgewicht</span>
          </h2>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 md:-translate-x-px" />
          
          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`relative flex items-start gap-6 mb-12 last:mb-0 animate-fade-up ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Content */}
              <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-16 md:pl-0`}>
                <div className={`feature-card corner-decorator p-6 inline-block ${step.active ? 'border-primary' : ''}`}>
                  <span className="corner-bl absolute -bottom-px -left-px w-2 h-2 border-b-2 border-l-2 border-primary" />
                  <span className="corner-br absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 border-primary" />
                  
                  <span className="text-xs uppercase tracking-wider text-primary font-semibold">{step.time}</span>
                  <h3 className="text-xl font-bold mt-1 mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
              
              {/* Icon */}
              <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-xl flex items-center justify-center z-10 transition-all ${step.active ? 'bg-primary text-primary-foreground glow-box' : 'bg-secondary text-muted-foreground'}`}>
                <step.icon className="w-6 h-6" />
              </div>
              
              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-16 animate-fade-up delay-300">
          <p className="text-muted-foreground mb-4">Alles beginnt mit deinem kostenlosen Probetraining</p>
          <button className="btn-primary inline-flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Jetzt Termin sichern
          </button>
        </div>
      </div>
    </section>
  )
}
