'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionBadge } from '@/components/SectionBadge'

const faqs = [
  {
    question: 'Was genau ist HappyFigur?',
    answer: 'HappyFigur ist ein 8-Wochen-Abnehmprogramm von FIT-INN Trier, zertifiziert nach § 20 SGB V. Du bekommst Körperanalyse, individuellen Trainings- und Ernährungsplan — und persönliche Betreuung vor Ort.'
  },
  {
    question: 'Muss ich ins Studio kommen?',
    answer: 'Ja, das Training findet im FIT-INN Trier (Auf Hirtenberg 8, Trier) statt. 2–3 Einheiten à 30 Minuten pro Woche reichen — auch mit Job und Familie gut machbar.'
  },
  {
    question: 'Was kostet das Programm?',
    answer: '179€ einmalig — kein Abo, keine Mitgliedschaft. Im kostenlosen Probetraining klären wir, ob es zu dir passt — ohne Risiko.¹'
  },
  {
    question: 'Ich hab schon alles probiert — warum soll das klappen?',
    answer: 'Weil wir nicht mit Diätplänen arbeiten, sondern deinen Stoffwechsel analysieren. Das Programm wird individuell auf dich zugeschnitten — nicht auf den Durchschnitt.⁴'
  },
]

export function FAQSection() {
  const section = useScrollReveal(0.1)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" ref={section.ref} className="py-12 md:py-24 px-5">
      <div className="mx-auto max-w-3xl">
        <SectionBadge number="08" label="Fragen" />

        <h2
          className={`text-2xl md:text-4xl font-bold mb-12 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          Häufige Fragen —<br />
          <span className="text-primary">ehrliche Antworten</span>
        </h2>

        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border-t border-border fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.1 + i * 0.06}s` }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 py-6 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-base leading-snug">{faq.question}</span>
                <span className={`shrink-0 w-7 h-7 rounded-full border border-border flex items-center justify-center transition-all duration-300 ${
                  openIndex === i ? 'bg-primary border-primary text-primary-foreground' : 'text-muted-foreground'
                }`}>
                  {openIndex === i ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <p className="pb-6 text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
