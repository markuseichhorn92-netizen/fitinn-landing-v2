'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

const faqs = [
  {
    question: 'Muss ich nach dem Programm weiter Mitglied bleiben?',
    answer: 'Nein. 8 Wochen – fertig. Keine automatische Verlängerung, kein Abo, kein Druck.'
  },
  {
    question: 'Was wenn meine Krankenkasse nicht erstattet?',
    answer: 'Kein Rezept, keine Vorab-Genehmigung. Nach dem Kurs Bestätigung einreichen – Geld kommt zurück. Bei Fragen helfen dir die Coaches von happyfigur jederzeit weiter.'
  },
  {
    question: 'Wie beantrage ich die Erstattung bei meiner Krankenkasse?',
    answer: 'Nach dem Kurs bekommst du eine Teilnahmebestätigung. Die schickst du an deine Kasse – per Post oder online. Rückzahlung meist in 4–6 Wochen. Wir helfen dir dabei.'
  },
  {
    question: 'Bin ich fit genug für das Programm?',
    answer: 'Ja! Das Programm startet bei Null. Dein Trainer erstellt einen Plan passend zu deinem Fitnesslevel – und passt ihn laufend an.'
  },
  {
    question: 'Kann ich mitmachen, wenn ich hormonelle Veränderungen oder gesundheitliche Besonderheiten habe?',
    answer: 'Das Programm richtet sich an gesunde Erwachsene. Bei bestehenden Erkrankungen empfehlen wir, vorab den Arzt zu fragen. Im Probetraining sprechen wir gerne mit dir darüber.'
  },
  {
    question: 'Was ist der Unterschied zu einem normalen Fitnessstudio?',
    answer: 'Im normalen Studio bist du allein. Bei happyfigur: 3 Körperanalysen, individueller Plan, Coaching, 24/7 Support – und die Kasse zahlt.'
  },
  {
    question: 'Wie schnell sehe ich erste Ergebnisse?',
    answer: 'Viele spüren nach 2–3 Wochen mehr Energie. Sichtbare Veränderungen ab Woche 3–4. Individuelle Ergebnisse können variieren.'
  },
  {
    question: 'Werde ich beim Training betreut?',
    answer: 'Ja. Persönliche Einweisung zum Start, danach Trainer bei jedem Besuch. Du bist nie allein.'
  },
  {
    question: 'Wie viel Zeit brauche ich pro Woche?',
    answer: '2–3 Einheiten à 30–60 Min. pro Woche reichen. Passt in jeden Alltag – auch mit Job und Familie.'
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="py-24 relative">
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
