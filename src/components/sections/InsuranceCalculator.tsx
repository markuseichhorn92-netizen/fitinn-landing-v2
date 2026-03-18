'use client'

import { useState } from 'react'
import { Coins, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react'
import { openLiveChat } from '@/lib/livechat'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionBadge } from '@/components/SectionBadge'

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
  { text: '3× Körperanalyse (InBody)', pillar: 'training' as const },
  { text: '8 Wochen Studionutzung', pillar: 'training' as const },
  { text: 'Einweisung + Coach vor Ort', pillar: 'training' as const },
  { text: 'Individueller Ernährungsplan', pillar: 'ernaehrung' as const },
  { text: 'Online-Lernplattform happyfigur', pillar: 'ernaehrung' as const },
  { text: 'Persönlicher Support per Chat', pillar: 'ernaehrung' as const },
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
    <section id="krankenkasse" ref={section.ref} className="py-12 md:py-24 px-5">
      <div className="mx-auto max-w-5xl">
        <SectionBadge number="06" label="Investition" />

        <h2
          className={`text-2xl md:text-4xl font-bold mb-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          179 € — bei vielen Kassen<br />
          <span className="text-primary">komplett erstattet</span>
        </h2>

        <p
          className={`text-muted-foreground text-lg max-w-2xl mb-14 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          Kein Abo. Du zahlst einmal — und kannst das Geld vollständig von deiner Krankenkasse zurückbekommen.²³
        </p>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left: What's included */}
          <div
            className={`fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.15s' }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">Im Programm enthalten</h3>

            <div className="space-y-0">
              {included.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${item.pillar === 'training' ? 'text-accent' : 'text-primary'}`} />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Einmaliger Programmpreis</p>
              <div className={`text-4xl md:text-5xl font-bold text-primary price-shimmer ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '1s' }}>
                179€<sup className="text-2xl">¹</sup>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Einmalig · 8 Wochen · Kein Abo — nur <strong className="text-foreground">3,20€/Tag</strong>¹
              </p>
            </div>
          </div>

          {/* Right: Calculator */}
          <div
            className={`feature-card p-6 md:p-8 flex flex-col fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.25s' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Coins className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold">Wie viel erstattet deine Kasse?</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              § 20 SGB V zertifiziert — bis zu 100% erstattet.²³
            </p>

            <select
              value={selected}
              onChange={(e) => handleChange(e.target.value)}
              aria-label="Krankenkasse auswählen"
              className="w-full p-3.5 rounded-xl bg-secondary border border-border text-foreground cursor-pointer text-base hover:border-primary/30 transition-colors focus:border-primary focus:outline-none"
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
                  <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Dein Eigenanteil</p>
                    <div className="text-5xl font-bold text-primary mb-2">0€</div>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-primary">Deine Kasse zahlt alles²³</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      {amount}€ Erstattung · Du zahlst 179€ vor, bekommst {amount}€ zurück
                    </p>
                  </div>
                ) : (
                  <div className="p-5 border border-border rounded-xl">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-muted-foreground">Programmpreis</span>
                      <span className="font-semibold">{PROGRAM_PRICE}€¹</span>
                    </div>
                    <div className="flex justify-between items-center mb-3 text-primary">
                      <span className="text-sm">Erstattung</span>
                      <span className="font-semibold">−{amount}€³</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border">
                      <span className="font-semibold">Eigenanteil</span>
                      <span className="text-2xl font-bold text-accent">{eigenanteil.toFixed(2)}€</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex-1" />

            {/* CTA */}
            <div className="mt-6 space-y-3">
              <button onClick={onStartQuiz} className="btn-cta inline-flex items-center gap-3 w-full justify-center">
                Jetzt Probetraining buchen
                <ArrowRight className="w-5 h-5" />
              </button>
              <button type="button" onClick={() => openLiveChat()} className="btn-outline w-full justify-center">
                <MessageCircle className="w-4 h-4" />
                Noch Fragen?
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
