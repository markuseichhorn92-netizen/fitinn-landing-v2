'use client'

import { Scale, Flame, TrendingDown, Frown } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const problems = [
  {
    icon: Scale,
    title: "Die Waage bewegt sich nicht",
    description: "Du achtest auf deine Ernährung – und trotzdem passiert nichts. Oder es wird sogar mehr."
  },
  {
    icon: Flame,
    title: "Der Stoffwechsel hat sich angepasst",
    description: "Nach Jahren von Diäten verbrennt dein Körper weniger Energie. Das ist Biologie – keine Schwäche."
  },
  {
    icon: TrendingDown,
    title: "Der Jo-Jo-Effekt ist kein Zufall",
    description: "Kaloriendefizit-Diäten enden immer gleich: Erst Erfolg, dann wieder alles drauf. Das System ist falsch – nicht du."
  },
  {
    icon: Frown,
    title: "Die stille Frage",
    description: "\"Was stimmt nicht mit mir?\" Die ehrliche Antwort: Du hattest bisher nie den richtigen Ansatz."
  }
]

export function ProblemSection() {
  const section = useScrollReveal(0.1)

  return (
    <section className="py-24 relative" ref={section.ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
          <span className="text-sm text-accent uppercase tracking-widest font-semibold">Das Problem</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Warum <span className="text-accent">Diäten scheitern</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Studien zeigen: Die meisten Diäten scheitern langfristig. Das liegt nicht an dir – sondern am falschen Ansatz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => (
            <div
              key={i}
              className={`group p-6 bg-card border border-border rounded-xl hover:border-accent/30 transition-all duration-300 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.2 + i * 0.12}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <problem.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>

        {/* Transition to Solution */}
        <div className={`mt-16 text-center materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30">
            <span className="text-primary font-semibold">
              ↓ Die gute Nachricht: Du kannst deinen Stoffwechsel neu aktivieren
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
