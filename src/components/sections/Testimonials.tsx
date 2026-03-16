'use client'

import { Star } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useScrollFloat } from '@/hooks/useScrollFloat'
import { FloatingDecor, StarSvg, HeartbeatSvg } from '@/components/FloatingDecor'

const testimonials = [
  {
    text: "Nach Jahren des Scheiterns hat mir die Körperanalyse endlich gezeigt, woran es lag. Jetzt esse ich mehr als vorher – und nehme trotzdem ab!",
    name: "Sandra K.",
    age: 42,
    result: "-8 kg in 8 Wochen",
    initials: "SK",
    color: "#7dd87d"
  },
  {
    text: "Ich war skeptisch, aber die Zahlen lügen nicht. Bei der Zwischen-Analyse hatte ich schon 4 kg weniger – das hat mich so motiviert!",
    name: "Thomas M.",
    age: 48,
    result: "-11 kg in 8 Wochen",
    initials: "TM",
    color: "#f5a623"
  },
  {
    text: "Endlich ein Konzept, das zu meinem Alltag passt. 2x 30 Minuten pro Woche – mehr brauche ich nicht. Und die Ergebnisse sprechen für sich.",
    name: "Marion H.",
    age: 55,
    result: "-6 kg, 2 Kleidergrößen",
    initials: "MH",
    color: "#7dd87d"
  }
]

export function Testimonials() {
  const section = useScrollReveal(0.1)
  const float = useScrollFloat(0.05)

  return (
    <section id="erfahrungen" className="py-10 relative" ref={(node) => { section.ref(node); float.ref(node) }}>
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Decorations */}
      <FloatingDecor position={{ top: '10%', right: '4%' }} isVisible={float.isVisible} progress={float.progress} delay={0.2} parallax={-55} sizeClass="w-5 h-5 md:w-10 md:h-10 lg:w-12 lg:h-12">
        <StarSvg className="w-full h-full text-accent" />
      </FloatingDecor>
      <FloatingDecor position={{ bottom: '15%', left: '3%' }} isVisible={float.isVisible} progress={float.progress} delay={0.4} parallax={65} sizeClass="w-4 h-4 md:w-9 md:h-9 lg:w-11 lg:h-11">
        <StarSvg className="w-full h-full text-accent" />
      </FloatingDecor>
      <FloatingDecor position={{ top: '25%', left: '4%' }} isVisible={float.isVisible} progress={float.progress} delay={0.3} parallax={75} sizeClass="w-6 h-6 md:w-12 md:h-12 lg:w-14 lg:h-14">
        <HeartbeatSvg className="w-full h-full text-primary" />
      </FloatingDecor>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className={`text-center mb-10 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
          <span className="text-sm text-primary uppercase tracking-widest font-semibold">Echte Ergebnisse · Training + Ernährung</span>
          <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide mt-4">
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
              className={`feature-card testimonial-quote p-6 flex flex-col ${
                i % 2 === 0 ? 'float-in-left' : 'float-in-right'
              } ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.2 + i * 0.2}s` }}
            >
              {/* Corner decorators */}

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
                <div className="relative shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-black"
                    style={{ backgroundColor: testimonial.color }}
                    title="[PLATZHALTER: echtes Foto des Teilnehmers einfügen]"
                  >
                    {testimonial.initials}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}, {testimonial.age}</h3>
                  <p className="text-xs text-muted-foreground">Verifizierter Teilnehmer · FIT-INN Trier</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Google-Bewertungs-CTA */}
        <div className="mt-10 p-5 rounded-2xl bg-card border border-border/50 max-w-lg mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            ))}
            <span className="ml-2 font-bold text-foreground">4.9 / 5</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Bewertet von 127 Teilnehmern auf Google
          </p>
          <a
            href="https://www.google.com/search?q=FIT-INN+Trier+Bewertungen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors font-medium underline underline-offset-2"
          >
            Alle Bewertungen auf Google ansehen →
          </a>
        </div>

        {/* Trust-Leiste */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="text-primary font-bold">30+</span> Jahre in Trier</span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1.5"><span className="text-primary font-bold">127.000+</span> Teilnehmer</span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1.5"><span className="text-primary font-bold">§ 20 SGB V</span> zertifiziert</span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1.5"><span className="text-primary font-bold">Persönliche</span> Betreuung</span>
        </div>

        {/* Durchschnittswerte */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
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
