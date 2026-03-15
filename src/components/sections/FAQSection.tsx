'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

const faqs = [
  {
    question: 'Was genau ist HappyFigur?',
    answer: 'HappyFigur ist ein 8-Wochen-Abnehmprogramm von FIT-INN Trier, zertifiziert nach § 20 SGB V. Du bekommst Körperanalyse, individuellen Trainings- und Ernährungsplan – und persönliche Betreuung vor Ort.'
  },
  {
    question: 'Muss ich ins Studio kommen?',
    answer: 'Ja, das Training findet im FIT-INN Trier (Auf Hirtenberg 8, Trier) statt. 2–3 Einheiten à 30 Minuten pro Woche reichen – auch mit Job und Familie gut machbar.'
  },
  {
    question: 'Was kostet das Programm?',
    answer: '179€ einmalig – kein Abo, keine Mitgliedschaft. Im kostenlosen Probetraining klären wir, ob es zu dir passt – ohne Risiko.¹'
  },
  {
    question: 'Ich hab schon alles probiert — warum soll das klappen?',
    answer: 'Weil wir nicht mit Diätplänen arbeiten, sondern deinen Stoffwechsel analysieren. Das Programm wird individuell auf dich zugeschnitten – nicht auf den Durchschnitt.⁴'
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="py-7 relative">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-10 animate-fade-up">
          <span className="text-sm text-primary uppercase tracking-widest font-semibold">Häufige Fragen</span>
          <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide mt-4">
            Deine Fragen — <span className="text-primary">ehrliche Antworten</span>
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="feature-card overflow-hidden animate-fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-base leading-snug">{faq.question}</span>
                <span className={`shrink-0 w-7 h-7 rounded-full border border-border flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-primary border-primary text-primary-foreground rotate-0' : 'text-muted-foreground'}`}>
                  {openIndex === i ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
