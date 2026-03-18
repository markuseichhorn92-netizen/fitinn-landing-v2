'use client'

import { Shield, CalendarX2, Award, HeartHandshake } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionBadge } from '@/components/SectionBadge'

export function GuaranteeSection() {
  const section = useScrollReveal(0.1)

  return (
    <section ref={section.ref} className="py-20 md:py-32 px-5">
      <div className="mx-auto max-w-5xl">
        <SectionBadge number="07" label="Kein Risiko" />

        <h2
          className={`text-3xl md:text-5xl font-bold mb-12 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          Du gehst <span className="text-primary">kein Risiko</span> ein
        </h2>

        {/* 3 Guarantee Points */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          {[
            { icon: Shield, title: 'Probetraining kostenlos', text: 'Lerne uns kennen — kein Cent, kein Haken.' },
            { icon: CalendarX2, title: 'Kein Abo', text: '8 Wochen, dann entscheidest du frei. Keine Verlängerung.' },
            { icon: Award, title: '30 Jahre Erfahrung', text: 'FIT-INN seit 1996. Tausende zufriedene Teilnehmer.' },
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

        {/* Coach Support */}
        <div
          className={`flex items-start gap-3 px-5 py-4 rounded-xl bg-primary/5 border border-primary/10 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          <HeartHandshake className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">Wir sind für dich da</span> — Bei Problemen oder Fragen stehen dir die Coaches von happyfigur jederzeit zur Verfügung — persönlich, per Live Chat oder Telefon.
          </p>
        </div>
      </div>
    </section>
  )
}
