'use client'

import { Star } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const testimonials = [
  {
    text: "Nach Jahren des Scheiterns hat mir die Körperanalyse endlich gezeigt, woran es lag. Jetzt esse ich mehr als vorher – und nehme trotzdem ab!",
    name: "Sandra K.",
    age: 42,
    result: "-8 kg in 8 Wochen",
    initials: "SK",
    color: "#cfe5ea"
  },
  {
    text: "Ich war skeptisch, aber die Zahlen lügen nicht. Bei der Zwischen-Analyse hatte ich schon 4 kg weniger – das hat mich so motiviert!",
    name: "Thomas M.",
    age: 48,
    result: "-11 kg in 8 Wochen",
    initials: "TM",
    color: "#ffb54f"
  },
  {
    text: "Endlich ein Konzept, das zu meinem Alltag passt. 2x 30 Minuten pro Woche – mehr brauche ich nicht. Und die Ergebnisse sprechen für sich.",
    name: "Marion H.",
    age: 55,
    result: "-6 kg, 2 Kleidergrößen",
    initials: "MH",
    color: "#cfe5ea"
  }
]

export function Testimonials() {
  const section = useScrollReveal(0.1)

  return (
    <section id="erfahrungen" className="py-16 relative" ref={section.ref}>
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
          <span className="text-sm text-primary uppercase tracking-widest font-semibold">Aus der Region · Echte Ergebnisse</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Was Teilnehmer aus <span className="text-primary">Trier & Umgebung</span> sagen
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
              className={`feature-card corner-decorator p-6 flex flex-col ${
                i % 2 === 0 ? 'float-in-left' : 'float-in-right'
              } ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.2 + i * 0.2}s` }}
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
        {/* Durchschnittswerte */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">-7,2 kg</div>
            <div className="text-sm text-muted-foreground mt-1">Ø Gewichtsverlust<sup>¹</sup></div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">-8 cm</div>
            <div className="text-sm text-muted-foreground mt-1">Ø Bauchumfang<sup>¹</sup></div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">8 Wochen</div>
            <div className="text-sm text-muted-foreground mt-1">Programmdauer</div>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          Individuelle Ergebnisse können variieren. Erfahrungsberichte verifizierter Kursteilnehmer.
        </p>
      </div>
    </section>
  )
}
