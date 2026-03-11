import { Scale, Flame, TrendingDown, Frown } from 'lucide-react'

const problems = [
  {
    icon: Scale,
    title: "Die Waage lügt",
    description: "Du achtest auf deine Ernährung, aber die Zahl geht nicht runter – oder sogar hoch."
  },
  {
    icon: Flame,
    title: "Dein Stoffwechsel schläft",
    description: "Nach Jahren von Diäten hat sich dein Körper angepasst und verbrennt weniger."
  },
  {
    icon: TrendingDown,
    title: "Jo-Jo-Effekt",
    description: "Jede Diät endet gleich: Erst Erfolg, dann wieder alles drauf – plus Extra-Kilos."
  },
  {
    icon: Frown,
    title: "Frust & Resignation",
    description: "Du hast alles versucht und fragst dich: Was stimmt nicht mit mir?"
  }
]

export function ProblemSection() {
  return (
    <section className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-destructive/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-sm text-destructive uppercase tracking-widest font-semibold">Das Problem</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Warum <span className="text-destructive">Diäten scheitern</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            95% aller Diäten scheitern langfristig. Das liegt nicht an dir – sondern am falschen Ansatz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => (
            <div 
              key={i}
              className="group p-6 bg-card border border-border rounded-xl hover:border-destructive/30 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>

        {/* Transition to Solution */}
        <div className="mt-16 text-center animate-fade-up delay-400">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30">
            <span className="text-primary font-semibold">
              ↓ Die gute Nachricht: Es gibt einen besseren Weg
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
