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
    question: 'Ich hab schon alles probiert — warum soll das klappen?',
    answer: 'Weil wir nicht mit Diätplänen arbeiten, sondern deinen Stoffwechsel analysieren. Das Programm wird individuell auf dich zugeschnitten — nicht auf den Durchschnitt. Viele Teilnehmer berichten, dass sie satt essen und trotzdem Fortschritte sehen.⁴'
  },
  {
    question: 'Wie schnell sehe ich erste Ergebnisse?',
    answer: 'Erfahrungsgemäß spüren Teilnehmer ab Woche 2 mehr Energie und besseren Schlaf. Sichtbare Veränderungen an Gewicht und Bauchumfang berichten viele ab Woche 3–4. Die größten Sprünge zeigt die Körperanalyse meist nach Woche 6.⁴'
  },
  {
    question: 'Was passiert, wenn ich krank werde oder Urlaub habe?',
    answer: 'Kein Stress. Die 8 Kurseinheiten verteilen sich flexibel über 8–12 Wochen. Wenn du eine Einheit verpasst, holst du sie einfach in der nächsten Woche nach. Sprich uns an — wir finden eine Lösung.'
  },
  {
    question: 'Muss ich ins Studio kommen?',
    answer: 'Ja, das Training findet im FIT-INN Trier (Auf Hirtenberg 8, 54296 Trier-Feyen) statt. 2–3 Einheiten à 30 Minuten pro Woche reichen — auch mit Job und Familie gut machbar.'
  },
  {
    question: 'Kann ich nach den 8 Wochen weiter trainieren?',
    answer: 'Wenn du willst, ja — aber du musst nicht. Nach den 8 Wochen endet happyfigur automatisch. Wer weitermachen möchte, kann freiwillig eine FIT-INN-Mitgliedschaft anschließen — kein Auto-Renew, keine Verlängerungs-Falle.'
  },
  {
    question: 'Was kostet das Programm?',
    answer: '179€ einmalig — kein Abo, keine Mitgliedschaft. Bei vielen Krankenkassen werden 75–179€ erstattet, oft sogar 100%. Im kostenlosen Probetraining rechnen wir gemeinsam aus, was deine Kasse genau erstattet.¹²³'
  },
  {
    question: 'Für wen ist happyfigur nicht geeignet?',
    answer: 'Das Programm ist eine Präventionsmaßnahme nach § 20 SGB V — kein Ersatz für ärztliche Behandlung. Nicht geeignet für Minderjährige, Schwangere, Stillende oder Menschen mit Essstörungen oder akuten Erkrankungen, die ärztliche Betreuung erfordern. Im Zweifel sprich vorher mit deinem Arzt.⁴'
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
