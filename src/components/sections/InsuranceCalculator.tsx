'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Coins, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react'
import { openLiveChat } from '@/lib/livechat'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useScrollFloat } from '@/hooks/useScrollFloat'
import { FloatingDecor, EuroSvg, ShieldCheckSvg } from '@/components/FloatingDecor'

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
  { text: '3x Körperanalyse (Inbody)', pillar: 'training' as const },
  { text: '8 Wochen Studionutzung', pillar: 'training' as const },
  { text: 'Einweisung + Coach vor Ort', pillar: 'training' as const },
  { text: 'Individueller Ernährungsplan', pillar: 'ernaehrung' as const },
  { text: 'Online-Lernplattform happyfigur', pillar: 'ernaehrung' as const },
  { text: 'Persönlicher Support per WhatsApp', pillar: 'ernaehrung' as const },
]

export function InsuranceCalculator() {
  const section = useScrollReveal(0.1)
  const float = useScrollFloat(0.05)
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
    <section id="krankenkasse" className="py-7 relative overflow-hidden" ref={(node) => { section.ref(node); float.ref(node) }}>
      {/* Floating Decorations */}
      <FloatingDecor position={{ top: '8%', right: '4%' }} isVisible={float.isVisible} progress={float.progress} delay={0.2} parallax={-65} sizeClass="w-6 h-6 md:w-13 md:h-13 lg:w-16 lg:h-16">
        <EuroSvg className="w-full h-full text-primary" />
      </FloatingDecor>
      <FloatingDecor position={{ bottom: '10%', left: '3%' }} isVisible={float.isVisible} progress={float.progress} delay={0.4} parallax={55} sizeClass="w-5 h-5 md:w-11 md:h-11 lg:w-14 lg:h-14">
        <ShieldCheckSvg className="w-full h-full text-primary" />
      </FloatingDecor>
      <FloatingDecor position={{ top: '30%', left: '5%' }} isVisible={float.isVisible} progress={float.progress} delay={0.3} parallax={75} sizeClass="w-4 h-4 md:w-10 md:h-10 lg:w-12 lg:h-12">
        <EuroSvg className="w-full h-full text-accent" />
      </FloatingDecor>

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
          <div className={`feature-card p-6 md:p-8 float-in-left ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.2s' }}>

            <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Im Programm enthalten</h3>

            {included.map((item, i) => (
              <div
                key={i}
                className={`checklist-item flex items-center gap-2.5 py-3 border-b border-border/30 last:border-0 ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
                style={{ animationDelay: `${0.4 + i * 0.2}s` }}
              >
                <CheckCircle2 className={`check-icon w-4 h-4 shrink-0 ${item.pillar === 'training' ? 'text-accent' : 'text-primary'}`} />
                <span className="text-sm text-muted-foreground flex-1">{item.text}</span>
                <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded shrink-0 ${
                  item.pillar === 'training' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                }`}>
                  {item.pillar === 'training' ? 'Training' : 'Ernährung'}
                </span>
              </div>
            ))}

            {/* Real price box */}
            <div className="mt-6 bg-primary/10 border border-primary/30 rounded-xl p-5 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Einmaliger Programmpreis</p>
              <div className={`text-5xl font-bold text-primary price-shimmer ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '1.6s' }}>179€<sup className="text-2xl">¹</sup></div>
              <p className="text-sm text-primary font-semibold mt-2">Einmalig · Für 8 Wochen · Kein Abo</p>
              <p className="text-xs text-muted-foreground mt-1">
                Das sind nur <strong className="text-foreground">3,20€/Tag</strong> — weniger als ein Kaffee.<sup>¹</sup>
              </p>
            </div>
          </div>

          {/* Right: Insurance Calculator */}
          <div className={`feature-card p-6 md:p-8 flex flex-col float-in-right ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.35s' }}>

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
              aria-label="Krankenkasse auswählen"
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
            <div className="mt-6 text-center space-y-3">
              <Link href="/quiz" className="btn-cta inline-flex items-center gap-3 text-lg w-full justify-center">
                Jetzt Probetraining buchen
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button type="button" onClick={() => openLiveChat()} className="btn-outline w-full justify-center">
                <MessageCircle className="w-4 h-4" />
                Noch Fragen? Chatte mit uns
              </button>
              <p className="text-xs text-muted-foreground mt-1">
                Du zahlst bei Trainingsstart<sup>¹</sup>, Krankenkasse erstattet dir das Geld zurück.<sup>²</sup>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
