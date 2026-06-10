'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const faqs = [
  {
    question: 'Wie lange dauert das Programm?',
    answer: 'Das Bauchweg Projekt läuft über 30 Tage / 4 Wochen mit klarer Wochenstruktur. Inhalte und Lernplattform stehen dir darüber hinaus weiter zur Verfügung.'
  },
  {
    question: 'Muss ich hungern oder Kalorien zählen?',
    answer: 'Nein. Wir arbeiten mit alltagstauglichen Mahlzeiten, klaren Empfehlungen und Rezepten – ohne Hungergefühl.'
  },
  {
    question: 'Für wen ist das Programm geeignet?',
    answer: 'Für alle, die rechtzeitig zum Sommer Bauchfett verlieren möchten – egal ob aktiv oder gerade wieder am Anfang stehend. Das Training findet im FIT-INN Trier (Auf Hirtenberg 8, 54296 Trier-Feyen) statt.⁴'
  },
  {
    question: 'Bekomme ich persönliche Begleitung?',
    answer: 'Ja, das Programm wird vom FIT-INN Trier betreut. Du hast jederzeit echte Ansprechpartner vor Ort und keine anonyme App.'
  },
  {
    question: 'Was passiert nach den 30 Tagen?',
    answer: 'Du hast neue Routinen, klare Struktur und Zugang zur Lernplattform – damit deine Ergebnisse langfristig bleiben. Keine Mitgliedschaft, keine automatische Verlängerung.¹'
  },
  {
    question: 'Wer beantwortet meine Ernährungsfragen?',
    answer: 'Ein Team von studierten Ernährungsberatern steht dir per WhatsApp & Mail zur Seite.'
  },
]

export function FAQSection() {
  const section = useScrollReveal(0.1)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" ref={section.ref} className="py-20 bg-white px-5">
      <div className="mx-auto max-w-3xl">
        <div
          className={`text-center mb-10 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          <h2 className="text-3xl sm:text-4xl">Häufige Fragen</h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl px-5 bg-background border border-border fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.1 + i * 0.06}s` }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-bold text-base leading-snug">{faq.question}</span>
                <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  openIndex === i ? 'bg-primary border-primary text-white' : 'border-border text-muted-foreground'
                }`}>
                  {openIndex === i ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <p className="pb-5 text-muted-foreground text-sm leading-relaxed">
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
