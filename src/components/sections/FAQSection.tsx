'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

const faqs = [
  {
    question: 'Muss ich nach dem Programm weiter Mitglied bleiben?',
    answer: 'Nein! Das happyfigur-Programm ist ein eigenständiges 8-Wochen-Programm ohne automatische Verlängerung oder Mitgliedschaft. Du buchst genau diese 8 Wochen – und entscheidest danach völlig frei, ob du weitermachen möchtest.'
  },
  {
    question: 'Was wenn meine Krankenkasse nicht erstattet?',
    answer: 'Der Kurs ist nach § 20 SGB V zertifiziert und wird von den meisten gesetzlichen Krankenkassen erstattet. Falls deine Kasse nicht im Rechner auftaucht: Ruf uns einfach an – wir helfen dir bei der Anfrage bei deiner Krankenkasse und klären es gemeinsam.'
  },
  {
    question: 'Wie beantrage ich die Erstattung bei meiner Krankenkasse?',
    answer: 'Ganz einfach: Nach dem Kurs erhältst du eine Teilnahmebestätigung mit allen nötigen Informationen. Diese schickst du an deine Krankenkasse – entweder per Post oder online. Die meisten Kassen überweisen das Geld innerhalb von 4–6 Wochen zurück. Wir unterstützen dich dabei!'
  },
  {
    question: 'Bin ich fit genug für das Programm?',
    answer: 'Absolut! Das Programm ist speziell für Menschen konzipiert, die keine regelmäßige Sportpraxis haben. Bei deiner persönlichen Einweisung erstellen wir gemeinsam einen Trainingsplan, der genau zu deinem Fitnesslevel passt. Während der 8 Wochen steht dir jederzeit ein Trainer zur Seite, der bei Fragen hilft und den Plan bei Bedarf anpasst.'
  },
  {
    question: 'Funktioniert das auch nach der Menopause oder bei Schilddrüsenproblemen?',
    answer: 'Ja! Gerade bei hormonellen Veränderungen wie der Menopause oder Schilddrüsenerkrankungen ist ein wissenschaftlich fundierter Ansatz besonders wichtig. Unsere Körperanalyse zeigt genau, wo dein Stoffwechsel steht – und der Plan wird exakt darauf abgestimmt. Viele unserer erfolgreichsten Teilnehmer haben genau diese Vorgeschichte.'
  },
  {
    question: 'Was ist der Unterschied zu einem normalen Fitnessstudio?',
    answer: 'In einem normalen Studio bist du auf dich allein gestellt. Bei happyfigur bekommst du 3 persönliche Körperanalysen, einen individuellen Trainingsplan, einen auf dich abgestimmten Ernährungsplan, eine persönliche Einweisung und jederzeit einen Trainer an deiner Seite – plus 24/7 WhatsApp-Support. Alles in einem 8-Wochen-Programm. Plus: Die Krankenkasse zahlt.'
  },
  {
    question: 'Wie schnell sehe ich erste Ergebnisse?',
    answer: 'Die meisten Teilnehmer berichten schon nach 2 Wochen von mehr Energie und weniger Blähungen. Sichtbare Veränderungen am Körper zeigen sich typischerweise ab Woche 3–4. Bei der Zwischen-Analyse nach 4 Wochen sehen wir schwarz auf weiß, was sich verändert hat – das motiviert enorm!'
  },
  {
    question: 'Werde ich beim Training betreut?',
    answer: 'Ja! Zum Start bekommst du eine persönliche Einweisung, bei der wir gemeinsam deinen Trainingsplan erstellen und alle Geräte erklären. Danach steht dir bei jedem Besuch ein Trainer im Studio zur Verfügung – für Fragen, Korrekturen oder Anpassungen deines Plans. Du bist nie auf dich allein gestellt.'
  },
  {
    question: 'Wie viel Zeit brauche ich pro Woche?',
    answer: '2–3 Einheiten à 30–60 Minuten pro Woche reichen völlig aus. Das Programm ist so konzipiert, dass es in jeden Alltag passt – auch wenn du voll berufstätig bist oder Familie hast. Qualität schlägt Quantität: Wir zeigen dir, was wirklich wirkt.'
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
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Alles, was du <span className="text-primary">wissen möchtest</span>
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
