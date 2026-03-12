'use client'

import { ChartLine, Dumbbell, Utensils, Users, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const features = [
  {
    icon: ChartLine,
    title: '3x Körperanalyse',
    description: 'Start, Mitte, Ende – du siehst schwarz auf weiß, wie sich Gewicht, Fett und Muskeln verändern.',
    highlight: 'Wissenschaftlich fundiert'
  },
  {
    icon: Dumbbell,
    title: '8 Wochen Training',
    description: 'Unbegrenzter Zugang zum Studio mit persönlicher Betreuung und individuellem Trainingsplan.',
    highlight: 'Unbegrenzter Zugang'
  },
  {
    icon: Utensils,
    title: 'Ernährungsplan',
    description: 'Kein Verzicht, kein Hungern. Individuell auf deinen Stoffwechsel abgestimmt – mehr essen, trotzdem abnehmen.',
    highlight: 'Individuell für dich'
  },
  {
    icon: Users,
    title: 'Personal Coaching',
    description: '3 Termine mit persönlicher Betreuung. Wir begleiten dich auf deinem Weg und passen den Plan an.',
    highlight: '1:1 Betreuung'
  },
  {
    icon: Smartphone,
    title: '24/7 Support',
    description: 'WhatsApp, E-Mail, Telefon – wir sind immer für dich da, wenn du Fragen hast oder Motivation brauchst.',
    highlight: 'Immer erreichbar'
  },
  {
    icon: CheckCircle2,
    title: 'Zertifiziert § 20',
    description: 'Der Kurs ist nach § 20 SGB V zertifiziert. Deine Krankenkasse erstattet 75€ bis 179€ – bei vielen komplett kostenlos.',
    highlight: 'Bis zu 100% erstattet'
  }
]

export function SolutionSection({ onStartQuiz }: { onStartQuiz: () => void }) {
  const section = useScrollReveal(0.05)

  return (
    <section id="programm" className="py-24 relative overflow-hidden" ref={section.ref}>
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
          <span className="text-sm text-primary uppercase tracking-widest font-semibold">Die Lösung</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Was ist <span className="text-primary">happyfigur</span>?
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Ein 8-Wochen Programm, das an der Ursache ansetzt – nicht an den Symptomen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`feature-card corner-decorator p-6 group scan-reveal ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              {/* Corner decorators */}
              <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
              <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />

              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                {feature.highlight}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-16 text-center materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.9s' }}>
          <button onClick={onStartQuiz} className="btn-cta inline-flex items-center gap-3 text-lg">
            Jetzt kostenloses Probetraining sichern
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-muted-foreground text-sm mt-4">
            ✓ Unverbindlich · ✓ 2 Minuten · ✓ 100% kostenlos
          </p>
        </div>
      </div>
    </section>
  )
}
