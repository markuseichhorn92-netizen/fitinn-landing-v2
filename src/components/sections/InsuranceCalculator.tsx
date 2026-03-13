'use client'

import { useState } from 'react'
import { Coins, CheckCircle2, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

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

const included = [
  '3x Körperanalyse (Inbody)',
  '8 Wochen Studionutzung',
  'Individueller Ernährungsplan',
  'Einweisung + Trainerbetreuung',
  'Online-Lernplattform happyfigur',
  'Persönlicher Support per WhatsApp',
]

export function InsuranceCalculator({ onStartQuiz }: { onStartQuiz: () => void }) {
  const section = useScrollReveal(0.1)
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
    <section id="krankenkasse" className="py-16 relative" ref={section.ref}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className={`text-center mb-12 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
          <span className="text-sm text-accent uppercase tracking-widest font-semibold">Was kostet happyfigur wirklich?</span>
          <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide mt-4">
            179€ einmalig –{' '}
            <span className="text-primary">oft zurückerstattet</span>
          </h2>
          <p className="text-muted-foreground text-base mt-3 max-w-xl mx-auto">
            Kein Abo. Du zahlst einmal – und kannst das Geld vollständig von deiner Krankenkasse zurückbekommen.<sup>²³</sup>
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left: What's included */}
          <div className={`feature-card corner-decorator p-6 md:p-8 float-in-left ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.2s' }}>
            <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
            <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />

            <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Im Programm enthalten</h3>

            {included.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 py-3 border-b border-border/30 last:border-0 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
                style={{ animationDelay: `${0.4 + i * 0.08}s` }}
              >
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}

            {/* Real price box */}
            <div className="mt-6 bg-primary/10 border border-primary/30 rounded-xl p-5 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Einmaliger Programmpreis</p>
              <div className="text-5xl font-bold text-primary">179€<sup className="text-2xl">¹</sup></div>
              <p className="text-sm text-primary font-medium mt-2">Kein Abo · Keine Mitgliedschaft</p>
              <p className="text-xs text-muted-foreground mt-1">Nur diese 8 Wochen – danach entscheidest du frei</p>
            </div>
          </div>

          {/* Right: Insurance Calculator */}
          <div className={`feature-card corner-decorator p-6 md:p-8 flex flex-col float-in-right ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.35s' }}>
            <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
            <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Coins className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Wie viel erstattet deine Kasse?</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              § 20 SGB V zertifiziert – bis zu 100% der Kosten erstattet.<sup>²³</sup>
            </p>

            <select
              value={selected}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-secondary border-2 border-border text-foreground cursor-pointer text-base hover:border-primary/50 transition-colors focus:border-primary focus:outline-none"
            >
              <option value="">— Wähle deine Krankenkasse —</option>
              {INSURANCE_DATA.map(insurance => (
                <option key={insurance.value} value={insurance.value}>
                  {insurance.label}
                </option>
              ))}
            </select>

            {/* Result */}
            {amount > 0 && (
              <div className="mt-5 animate-scale-in">
                {isFree ? (
                  <div className="p-6 bg-primary/20 border-2 border-primary rounded-xl text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Dein Eigenanteil</p>
                    <div className="text-6xl font-bold text-primary mb-2">0€</div>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-primary">Deine Kasse zahlt alles<sup>²³</sup></span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      {amount}€ Erstattung · Du zahlst 179€ vor, bekommst {amount}€ zurück
                    </p>
                  </div>
                ) : (
                  <div className="p-5 bg-card border border-border rounded-xl">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-muted-foreground">Programmpreis</span>
                      <span className="font-semibold">{PROGRAM_PRICE}€<sup>¹</sup></span>
                    </div>
                    <div className="flex justify-between items-center mb-3 text-primary">
                      <span className="text-sm">Erstattung Krankenkasse</span>
                      <span className="font-semibold">−{amount}€<sup>³</sup></span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border">
                      <span className="font-semibold">Dein Eigenanteil</span>
                      <span className="text-3xl font-bold text-accent">{eigenanteil.toFixed(2)}€</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      Das sind nur <span className="text-foreground font-semibold">{(eigenanteil / 56).toFixed(2)}€/Tag<sup>¹</sup></span> — weniger als ein Kaffee
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Spacer to push CTA to bottom */}
            <div className="flex-1" />

            {/* CTA */}
            <div className="mt-6 text-center">
              <button onClick={onStartQuiz} className="btn-cta inline-flex items-center gap-3 text-lg w-full justify-center">
                Jetzt Probetraining buchen
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-muted-foreground mt-3">
                Du zahlst bei Trainingsstart<sup>¹</sup>, Krankenkasse erstattet dir das Geld zurück.<sup>²</sup>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
