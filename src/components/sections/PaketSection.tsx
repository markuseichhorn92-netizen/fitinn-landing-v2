'use client'

import Image from 'next/image'
import {
  ArrowRight, BarChart2, BookOpen, CalendarCheck, Flame,
  MessageCircle, MonitorPlay, Sparkles,
} from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const FEATURES = [
  {
    icon: CalendarCheck,
    title: '30 Tage Komplettbetreuung',
    desc: 'Vier Wochen klare Struktur, persönliche Begleitung und echte Ansprechpartner – kein Algorithmus.',
  },
  {
    icon: BookOpen,
    title: 'Bauchweg-Kochbuch „Schlank mit Genuss“',
    desc: '100 Genussrezepte für eine schlanke Körpermitte – alltagstauglich und sättigend.',
  },
  {
    icon: MonitorPlay,
    title: 'Digitale Lernplattform',
    desc: 'Video-Module zu Ernährung, Bauchfett & Mindset – jederzeit auf Laptop, Tablet & Smartphone.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp-Support',
    desc: 'Direkter Draht zu deinem Coach – Fragen, Motivation, kurze Check-ins ohne Wartezeit.',
  },
  {
    icon: BarChart2,
    title: '3 Körperanalysen',
    desc: 'Fett-, Muskel-, Wasseranteil und viszerales Bauchfett – messbare Ergebnisse statt Bauchgefühl.',
  },
  {
    icon: Flame,
    title: 'Stoffwechsel-Training im Studio',
    desc: 'Kompakte Einheiten pro Woche – maximaler Effekt in minimaler Zeit, direkt im FIT-INN Trier.',
  },
]

export function PaketSection({ onCta }: { onCta: () => void }) {
  const header = useScrollReveal(0.1)
  const mockup = useScrollReveal(0.1)
  const cards = useScrollReveal(0.05)

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="blur-circle w-96 h-96 -top-20 -right-20 bg-secondary opacity-60" />
      <div className="blur-circle w-80 h-80 bottom-10 -left-24 bg-accent" />

      <div className="mx-auto max-w-6xl px-5 relative z-10">
        <div
          ref={header.ref}
          className={`text-center max-w-3xl mx-auto mb-12 lg:mb-16 fade-up ${header.isReady ? 'anim-ready' : ''} ${header.isVisible ? 'animate' : ''}`}
        >
          <span className="badge-pill bg-primary text-white mb-5 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            Dein Komplett-Paket
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05]">
            30 Tage. Alles dabei.{' '}
            <span className="text-primary-dark">Kein Detail zum Glück fehlt.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
            Du bekommst nicht nur ein Programm – du bekommst ein komplettes System aus
            Coaching, Wissen, Rezepten und Tools, damit du in 30 Tagen wirklich Ergebnisse
            siehst.⁴
          </p>
        </div>

        <div
          ref={mockup.ref}
          className={`relative max-w-4xl mx-auto mb-14 lg:mb-20 fade-up ${mockup.isReady ? 'anim-ready' : ''} ${mockup.isVisible ? 'animate' : ''}`}
        >
          <Image
            src="/Gemini_Generated_Image_eoal4reoal4reoal.png"
            alt="Dein Komplett-Paket: Lernplattform, WhatsApp-Support und das Bauchweg-Kochbuch"
            width={1312}
            height={810}
            className="w-full h-auto relative z-10 drop-shadow-2xl"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <span className="absolute -top-2 left-2 sm:top-6 sm:left-6 z-20 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wide shadow-2xl -rotate-6 bg-accent text-primary-dark">
            <Sparkles className="w-4 h-4" />
            ALLES DABEI
          </span>
        </div>

        <div ref={cards.ref} className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {FEATURES.map((feature, i) => {
            const alt = i % 2 === 1
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`flex items-start gap-5 p-6 rounded-2xl h-full shadow-[0_8px_30px_-12px_rgba(15,80,80,0.2)] hover:-translate-y-1 hover:shadow-[0_15px_40px_-12px_rgba(15,80,80,0.3)] transition-all duration-300 border fade-up ${
                  alt ? 'bg-white border-border' : 'bg-secondary border-border-teal'
                } ${cards.isReady ? 'anim-ready' : ''} ${cards.isVisible ? 'animate' : ''}`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                    alt
                      ? 'bg-gradient-to-br from-accent to-accent-deep'
                      : 'bg-gradient-to-br from-primary to-primary-dark'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${alt ? 'text-primary-dark' : 'text-white'}`} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg mb-1">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <button onClick={onCta} className="btn-pill text-base px-10 py-4">
            Komplett-Paket sichern
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
