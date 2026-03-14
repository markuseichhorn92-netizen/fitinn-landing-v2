'use client'

import Image from 'next/image'
import { ChartLine, Dumbbell, Utensils, Users, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const features = [
  {
    icon: ChartLine,
    title: '3x Körperanalyse',
    description: 'Start, Mitte, Ende – du siehst in Zahlen, was sich verändert. Wir passen laufend an.',
    highlight: 'Datenbasiert'
  },
  {
    icon: Dumbbell,
    title: '8 Wochen Training',
    description: 'Unbegrenzter Zugang. Dein Plan, dein Körper, dein Ziel – kein Allgemeinplan.',
    highlight: 'Individuell & betreut'
  },
  {
    icon: Utensils,
    title: 'Ernährungsplan',
    description: 'Passend zu deinem Alltag. Kein Kalorienzählen, keine Verbote, kein Hungern.',
    highlight: 'Passend zu deinem Leben'
  },
  {
    icon: Users,
    title: 'Coaching & Support',
    description: 'Persönliche Einweisung zum Start. Danach trainierst du eigenständig – mit einem Coach vor Ort, der jederzeit für dich da ist.',
    highlight: 'Du bist nie allein'
  },
  {
    icon: Smartphone,
    title: '24/7 Support',
    description: 'WhatsApp, E-Mail, Telefon – wir sind für dich da.',
    highlight: 'Immer erreichbar'
  },
  {
    icon: CheckCircle2,
    title: 'Zertifiziert § 20',
    description: '§ 20 SGB V zertifiziert. Deine Kasse erstattet 75€–179€ – bei vielen komplett kostenlos.²³',
    highlight: 'Bis zu 100% erstattet'
  }
]

const foodImages = [
  { src: '/food-smoothie.jpg', alt: 'Smoothie Bowl mit Spinat und Erdbeeren' },
  { src: '/food-lentils.jpg', alt: 'Linsen mit Süßkartoffeln und Rote Bete' },
  { src: '/food-mango.jpg', alt: 'Mango Smoothie Bowl mit Blaubeeren' },
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
        <div className={`text-center mb-12 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
          <span className="text-sm text-primary uppercase tracking-widest font-semibold">Die Lösung</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Was ist <span className="text-primary">happyfigur</span>?
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Ein 8-Wochen-Programm, das nicht Kalorien zählt – sondern deinen Stoffwechsel neu aktiviert.
          </p>
        </div>

        {/* Mockup + Food Strip */}
        <div className={`mb-16 float-in-left ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.1s' }}>
          {/* Mockup */}
          <div className="relative max-w-3xl mx-auto">
            <Image
              src="/mockup-paket.png"
              alt="Happyfigur Komplettpaket – App, Online-Plattform, Ernährungsplan und Rezeptbuch"
              width={900}
              height={600}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
            <div className="absolute inset-0 -z-10 bg-primary/10 rounded-3xl blur-3xl scale-90" />
          </div>

          {/* Food Strip */}
          <div className="grid grid-cols-3 gap-3 mt-8 max-w-2xl mx-auto">
            {foodImages.map((img, j) => (
              <div key={j} className="aspect-[3/2] rounded-xl overflow-hidden border border-border/20">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Leckere Rezepte aus deinem individuellen Ernährungsplan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`feature-card corner-decorator p-6 group scan-reveal ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
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
