'use client'

import { useState } from 'react'
import { Dumbbell, Apple, Users, Shield, ArrowRight, MessageCircle, BarChart2, Target, Check, ChevronDown } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionBadge } from '@/components/SectionBadge'

const archItems = [
  { icon: Dumbbell, label: 'Studio-Training', sub: 'FIT-INN Trier', color: 'accent' as const, detail: '2–3× pro Woche im FIT-INN Trier. Moderne Geräte, klimatisiert, persönliche Einweisung.' },
  { icon: Apple, label: 'Ernährungsplan', sub: 'Individuell angepasst', color: 'primary' as const, detail: 'Kein Hungern — ein Plan der zu deinem Alltag passt. Angepasst an dein Ziel und deine Vorlieben.' },
  { icon: MessageCircle, label: 'Support', sub: 'Chat, Telefon, E-Mail', color: 'primary' as const, detail: 'Fragen zur Ernährung, zum Training oder zur Krankenkasse? Unsere Coaches helfen jederzeit.' },
  { icon: BarChart2, label: '3× Körperanalyse', sub: 'InBody-Messung', color: 'accent' as const, detail: 'InBody-Messung zu Beginn, nach 4 und nach 8 Wochen. Du siehst genau, was sich verändert.' },
  { icon: Users, label: 'Persönliches Coaching', sub: 'Trainer vor Ort', color: 'accent' as const, detail: 'Ein Trainer ist immer vor Ort ansprechbar für Fragen und Korrekturen.' },
  { icon: Target, label: 'Messbares Ergebnis', sub: 'Schwarz auf weiß', color: 'primary' as const, detail: 'Vorher-Nachher-Vergleich schwarz auf weiß. Deine Fortschritte sind dokumentiert.' },
]

const pillars = [
  {
    icon: Dumbbell,
    title: 'Gezieltes Training',
    description: '2–3× pro Woche, je 30 Min. Individuell auf deinen Körper und Stoffwechsel abgestimmt — im FIT-INN Trier.',
    color: 'accent' as const,
  },
  {
    icon: Apple,
    title: 'Ernährung ohne Verbote',
    description: 'Kein Kalorienzählen, keine Diät. Ein alltagstauglicher Ernährungsplan, den du auch in zwei Jahren noch lebst.',
    color: 'primary' as const,
  },
  {
    icon: Users,
    title: 'Persönliche Betreuung',
    description: 'Trainer immer vor Ort ansprechbar. Dazu 24/7 Support per Live-Chat, E-Mail und Telefon.',
    color: 'primary' as const,
  },
]

export function SolutionSection({ onStartQuiz }: { onStartQuiz: () => void }) {
  const section = useScrollReveal(0.1)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="programm" ref={section.ref} className="py-12 md:py-24 px-5">
      <div className="mx-auto max-w-5xl">
        <SectionBadge number="02" label="Die Lösung" />

        <h2
          className={`text-2xl md:text-4xl font-bold mb-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          Kein Diät-Plan.<br />
          <span className="text-primary">Happyfigur Stoffwechsel-System</span><br />
          <span className="text-muted-foreground text-lg md:text-xl font-medium">powered by FIT-INN Trier</span>
        </h2>

        <p
          className={`text-muted-foreground text-lg max-w-2xl mb-14 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          happyfigur kombiniert Training, Ernährung und Coaching zu einem 8-Wochen-Programm, das deinen Stoffwechsel neu aktiviert — nicht Kalorien zählt.
        </p>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className={`feature-card ${pillar.color === 'accent' ? 'feature-card--training' : ''} p-8 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${
                pillar.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
              }`}>
                <pillar.icon className={`w-6 h-6 ${pillar.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* §20 Badge */}
        <div
          className={`flex items-center gap-3 px-5 py-4 rounded-xl bg-primary/5 border border-primary/10 mb-12 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.4s' }}
        >
          <Shield className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm">
            <span className="text-primary font-semibold">§ 20 SGB V zertifiziert</span>
            <span className="text-muted-foreground"> — Deine Krankenkasse erstattet bis zu 100% der Kosten.²³</span>
          </p>
        </div>

        {/* ═══ Alles aus einer Hand — Architektur-Diagramm ═══ */}
        <div className="mb-14">
          <p
            className={`text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.5s' }}
          >
            Alles aus einer Hand
          </p>

          {/* Desktop: Radiales Layout */}
          <div
            className={`hidden md:block relative fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.55s' }}
          >
            <div className="relative" style={{ height: '420px' }}>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 420" preserveAspectRatio="xMidYMid meet">
                {[
                  { x: 60, y: 70 }, { x: 60, y: 210 }, { x: 60, y: 350 },
                  { x: 740, y: 70 }, { x: 740, y: 210 }, { x: 740, y: 350 },
                ].map((pos, i) => {
                  const cx = 400, cy = 210
                  const cpx1 = pos.x < 400 ? pos.x + 120 : pos.x - 120
                  const cpx2 = pos.x < 400 ? cx - 80 : cx + 80
                  const path = `M ${pos.x} ${pos.y} C ${cpx1} ${pos.y}, ${cpx2} ${cy}, ${cx} ${cy}`
                  return (
                    <g key={i}>
                      <path d={path} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 4" />
                      <circle r="4" fill="var(--primary)" opacity="0.7">
                        <animateMotion dur={`${2.2 + i * 0.25}s`} repeatCount="indefinite" path={path} />
                      </circle>
                      <circle cx={pos.x} cy={pos.y} r="3" fill="var(--primary)" opacity="0.25" />
                    </g>
                  )
                })}
                <circle cx="400" cy="210" r="6" fill="var(--primary)" opacity="0.15" />
              </svg>

              {archItems.slice(0, 3).map((item, i) => (
                <div key={`l${i}`} className="absolute left-0 w-[220px]" style={{ top: `${i * 130 + 20}px` }}>
                  <ArchCard item={item} index={i} isOpen={openIndex === i} onToggle={() => setOpenIndex(prev => prev === i ? null : i)} />
                </div>
              ))}
              {archItems.slice(3, 6).map((item, i) => (
                <div key={`r${i}`} className="absolute right-0 w-[220px]" style={{ top: `${i * 130 + 20}px` }}>
                  <ArchCard item={item} index={i + 3} isOpen={openIndex === i + 3} onToggle={() => setOpenIndex(prev => prev === i + 3 ? null : i + 3)} isRight />
                </div>
              ))}

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <CenterHub />
              </div>
            </div>
          </div>

          {/* Mobile: 2-Spalten Grid → Hub */}
          <div
            className={`md:hidden fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.55s' }}
          >
            <div className="grid grid-cols-2 gap-3 mb-6">
              {archItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center text-center rounded-xl border bg-card p-3.5 cursor-pointer transition-all duration-300 ${
                    openIndex === i ? 'border-primary/30 shadow-md' : 'border-border'
                  }`}
                  onClick={() => setOpenIndex(prev => prev === i ? null : i)}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${item.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'}`}>
                    <item.icon className={`w-4 h-4 ${item.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
                  </div>
                  <p className="font-semibold text-sm leading-tight">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.sub}</p>
                  {openIndex === i && (
                    <p className="text-[11px] text-muted-foreground leading-relaxed border-t border-border pt-2 mt-2 mx-1">{item.detail}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <CenterHub />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.6s' }}
        >
          <button onClick={onStartQuiz} className="btn-cta inline-flex items-center gap-3">
            Jetzt Probetraining sichern
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-muted-foreground text-sm mt-3">
            ✓ Unverbindlich · ✓ Kostenlos · ✓ § 20 SGB V zertifiziert
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Architektur Helper-Komponenten ─── */

function ArchCard({ item, index, isOpen, onToggle, isRight }: {
  item: typeof archItems[number]; index: number; isOpen: boolean; onToggle: () => void; isRight?: boolean
}) {
  return (
    <div className="relative" onClick={onToggle}>
      <div className={`rounded-xl border bg-card transition-all duration-300 cursor-pointer ${isOpen ? 'border-primary/30 shadow-md' : 'border-border hover:border-primary/20'}`}>
        <div className="flex items-center gap-3 p-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'}`}>
            <item.icon className={`w-5 h-5 ${item.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.sub}</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      {isOpen && (
        <div className={`absolute top-full mt-2 z-20 w-[260px] p-3.5 rounded-xl border border-primary/20 bg-card shadow-lg text-xs text-muted-foreground leading-relaxed ${isRight ? 'right-0' : 'left-0'}`}>
          <div className={`absolute -top-1.5 ${isRight ? 'right-5' : 'left-5'} w-3 h-3 rotate-45 border-l border-t border-primary/20 bg-card`} />
          {item.detail}
        </div>
      )}
    </div>
  )
}

function CenterHub() {
  return (
    <div className="w-56 p-6 rounded-2xl border-2 border-primary/20 bg-card text-center shadow-xl shadow-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
      <div className="relative">
        <div className="w-16 h-16 mx-auto mb-3">
          <img src="/favicon.jpg" alt="FIT-INN Trier" width={64} height={64} className="w-full h-full object-contain" />
        </div>
        <p className="font-bold text-base uppercase tracking-wider">happyfigur</p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-0.5 mb-4">8-Wochen-System</p>
        <div className="h-px bg-border mb-4" />
        <div className="space-y-2.5 text-left">
          {['Stoffwechsel aktivieren', 'Ernährung optimieren', 'Ergebnis messen'].map((t, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-xs font-medium text-foreground/80">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
