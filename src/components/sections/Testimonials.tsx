import { Star } from 'lucide-react'

const testimonials = [
  {
    text: "Nach Jahren des Scheiterns hat mir die Körperanalyse endlich gezeigt, woran es lag. Jetzt esse ich mehr als vorher – und nehme trotzdem ab!",
    name: "Sandra K.",
    age: 42,
    result: "-8 kg in 8 Wochen",
    initials: "SK",
    color: "#10b981"
  },
  {
    text: "Ich war skeptisch, aber die Zahlen lügen nicht. Bei der Zwischen-Analyse hatte ich schon 4 kg weniger – das hat mich so motiviert!",
    name: "Thomas M.",
    age: 48,
    result: "-11 kg in 8 Wochen",
    initials: "TM",
    color: "#f97316"
  },
  {
    text: "Endlich ein Konzept, das zu meinem Alltag passt. 2x 30 Minuten pro Woche – mehr brauche ich nicht. Und die Ergebnisse sprechen für sich.",
    name: "Marion H.",
    age: 55,
    result: "-6 kg, 2 Kleidergrößen",
    initials: "MH",
    color: "#10b981"
  }
]

export function Testimonials() {
  return (
    <section className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-sm text-primary uppercase tracking-widest font-semibold">Echte Erfolgsgeschichten</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Was unsere <span className="text-primary">Teilnehmer</span> sagen
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            ))}
            <span className="ml-2 text-muted-foreground text-sm">4.9 auf Google (127 Bewertungen)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="feature-card corner-decorator p-6 animate-fade-up flex flex-col"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Corner decorators */}
              <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
              <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Result Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4 self-start">
                <span className="text-primary font-bold text-sm">{testimonial.result}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-black shrink-0"
                  style={{ backgroundColor: testimonial.color }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}, {testimonial.age}</h4>
                  <p className="text-xs text-muted-foreground">Verifizierter Teilnehmer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
