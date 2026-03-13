'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

const faqs = [
  {
    question: 'Was kostet das Programm?',
    answer: '179€ einmalig – kein Abo, keine Mitgliedschaft. Deine Krankenkasse erstattet je nach Kasse 75€ bis 100%. Bei vielen zahlst du am Ende 0€.²³'
  },
  {
    question: 'Muss ich nach dem Programm weiter Mitglied bleiben?',
    answer: 'Nein. 8 Wochen – fertig. Keine automatische Verlängerung, kein Abo, kein Druck.'
  },
  {
    question: 'Wie schnell sehe ich erste Ergebnisse?',
    answer: 'Viele spüren nach 2–3 Wochen mehr Energie. Sichtbare Veränderungen ab Woche 3–4.'
  },
  {
    question: 'Wie viel Zeit brauche ich pro Woche?',
    answer: '2–3 Einheiten à 30–60 Min. reichen. Passt in jeden Alltag – auch mit Job und Familie.'
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="py-16 relative">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-sm text-primary uppercase tracking-widest font-semibold">Häufige Fragen</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
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
