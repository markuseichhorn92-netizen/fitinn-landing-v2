'use client'

import { Shield, CalendarX2, FileCheck, HeartHandshake } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionBadge } from '@/components/SectionBadge'

export function GuaranteeSection() {
  const section = useScrollReveal(0.1)

  return (
    <section id="garantie" ref={section.ref} className="py-12 md:py-24 px-5">
      <div className="mx-auto max-w-5xl">
        <SectionBadge number="07" label="Kein Risiko" />

        <h2
          className={`text-2xl md:text-4xl font-bold mb-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          Du gehst <span className="text-primary">kein Risiko</span> ein
        </h2>
        <p
          className={`text-base md:text-lg text-muted-foreground mb-12 max-w-3xl fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.05s' }}
        >
          Drei klare Zusagen, mit denen du genau weißt, worauf du dich einlässt — und worauf nicht.
        </p>

        {/* 3 Guarantee Points */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          {[
            {
              icon: Shield,
              title: 'Probetraining wirklich kostenlos',
              text: 'Kein Cent, keine Vertragsbindung, kein verstecktes Probemonats-Abo. Du kommst, lernst uns kennen und entscheidest dann selbst.',
            },
            {
              icon: FileCheck,
              title: 'Krankenkasse vorbereitet',
              text: 'Nach 8 erfolgreichen Kurseinheiten erhältst du automatisch deine Teilnahmebestätigung — fertig zum Einreichen bei deiner gesetzlichen Kasse.²',
            },
            {
              icon: HeartHandshake,
              title: 'Coach-Begleitung bis zum Ergebnis',
              text: 'Wir lassen dich nicht allein. Bei Fragen, Plateaus oder Rückschlägen sind die happyfigur Coaches per Chat, Telefon und vor Ort für dich da — auch nach Kursende.',
            },
          ].map((g, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <g.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">{g.title}</h3>
                <p className="text-sm text-muted-foreground">{g.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Kein Abo Reminder */}
        <div
          className={`flex items-start gap-3 px-5 py-4 rounded-xl bg-primary/5 border border-primary/10 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          <CalendarX2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">Kein Abo, keine Verlängerung.</span> 8 Wochen happyfigur sind 8 Wochen happyfigur — danach entscheidest du frei, ob du mit FIT-INN weitermachst. Keine automatische Vertragsverlängerung, kein Probemonat, der zur Falle wird.
          </p>
        </div>
      </div>
    </section>
  )
}
