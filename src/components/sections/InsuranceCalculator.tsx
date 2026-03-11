'use client'

import { useState } from 'react'
import { Coins, CheckCircle2, ArrowRight } from 'lucide-react'

const INSURANCE_DATA = [
  { value: 'aok-rlp', label: 'AOK Rheinland-Pfalz', amount: 179 },
  { value: 'viactiv', label: 'VIACTIV', amount: 179 },
  { value: 'mobil', label: 'Mobil Krankenkasse', amount: 179 },
  { value: 'bkk-vbu', label: 'BKK VBU', amount: 179 },
  { value: 'salus', label: 'Salus BKK', amount: 179 },
  { value: 'aok-hessen', label: 'AOK Hessen / Bayern / Nordost', amount: 150 },
  { value: 'ikk-sw', label: 'IKK Südwest', amount: 150 },
  { value: 'vivida', label: 'Vivida BKK / KKH / HEK', amount: 150 },
  { value: 'tk', label: 'Techniker (TK)', amount: 143.20 },
  { value: 'big', label: 'BIG direkt', amount: 120 },
  { value: 'barmer', label: 'BARMER', amount: 100 },
  { value: 'sbk', label: 'SBK', amount: 100 },
  { value: 'ikk-classic', label: 'IKK classic', amount: 90 },
  { value: 'aok-bw', label: 'AOK Baden-Württemberg / Niedersachsen', amount: 80 },
  { value: 'dak', label: 'DAK', amount: 75 },
  { value: 'andere', label: 'Andere Krankenkasse', amount: 100 },
]

const PROGRAM_PRICE = 179

export function InsuranceCalculator() {
  const [selected, setSelected] = useState('')
  const [amount, setAmount] = useState(0)

  const handleChange = (value: string) => {
    setSelected(value)
    const insurance = INSURANCE_DATA.find(i => i.value === value)
    setAmount(insurance?.amount || 0)
  }

  const eigenanteil = Math.max(0, PROGRAM_PRICE - amount)
  const isFree = eigenanteil === 0

  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-4xl px-6">
        <div className="feature-card corner-decorator p-8 md:p-12 animate-scale-in">
          {/* Corner decorators */}
          <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
          <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Coins className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Was erstattet <span className="text-primary">deine Krankenkasse</span>?
            </h2>
            <p className="text-muted-foreground">
              Der Kurs ist nach § 20 SGB V zertifiziert – deine Krankenkasse übernimmt bis zu 100% der Kosten.
            </p>
          </div>

          {/* Calculator */}
          <div className="max-w-md mx-auto">
            <select
              value={selected}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full p-4 rounded-xl bg-secondary border-2 border-border text-foreground cursor-pointer text-lg hover:border-primary/50 transition-colors focus:border-primary focus:outline-none"
            >
              <option value="">— Wähle deine Krankenkasse —</option>
              {INSURANCE_DATA.map(insurance => (
                <option key={insurance.value} value={insurance.value}>
                  {insurance.label} ({insurance.amount}€)
                </option>
              ))}
            </select>

            {/* Result */}
            {amount > 0 && (
              <div className="mt-6 animate-scale-in">
                {isFree ? (
                  <div className="p-6 bg-primary/20 border-2 border-primary rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                      <span className="text-3xl font-bold text-primary">Komplett kostenlos!</span>
                    </div>
                    <p className="text-muted-foreground">
                      Deine Krankenkasse erstattet die vollen {amount}€ – du zahlst 0€ Eigenanteil.
                    </p>
                  </div>
                ) : (
                  <div className="p-6 bg-card border border-border rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-muted-foreground">Programmpreis</span>
                      <span className="font-semibold">{PROGRAM_PRICE}€</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 text-primary">
                      <span>Erstattung Krankenkasse</span>
                      <span className="font-semibold">-{amount}€</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <span className="font-semibold">Dein Eigenanteil</span>
                      <span className="text-2xl font-bold text-accent">{eigenanteil.toFixed(2)}€</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      Das sind nur {(eigenanteil / 8).toFixed(2)}€ pro Woche für 8 Wochen Programm!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 text-center">
              <button className="btn-cta inline-flex items-center gap-3 text-lg">
                Jetzt Probetraining buchen
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-sm text-muted-foreground mt-3">
                Du zahlst bei Trainingsstart, Krankenkasse erstattet dir das Geld zurück.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
