'use client'

import { useState } from 'react'
import { Dumbbell, Apple, MessageCircle, BarChart2, Users, Target, Check, ChevronDown } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const allItems = [
  {
    icon: Dumbbell, label: 'Studio-Training', sub: 'FIT-INN Trier', color: 'accent' as const,
    detail: '2–3× pro Woche im FIT-INN Trier. Moderne Geräte, klimatisiert, persönliche Einweisung.',
  },
  {
    icon: Apple, label: 'Ernährungsplan', sub: 'Individuell angepasst', color: 'primary' as const,
    detail: 'Kein Hungern — ein Plan der zu deinem Alltag passt. Angepasst an dein Ziel und deine Vorlieben.',
  },
  {
    icon: MessageCircle, label: 'Support', sub: 'Chat, Telefon, E-Mail', color: 'primary' as const,
    detail: 'Fragen zur Ernährung, zum Training oder zur Krankenkasse? Unsere Coaches helfen jederzeit.',
  },
  {
    icon: BarChart2, label: '3× Körperanalyse', sub: 'InBody-Messung', color: 'accent' as const,
    detail: 'InBody-Messung zu Beginn, nach 4 und nach 8 Wochen. Du siehst genau, was sich verändert.',
  },
  {
    icon: Users, label: 'Persönliches Coaching', sub: 'Trainer vor Ort', color: 'accent' as const,
    detail: 'Ein Trainer ist immer vor Ort ansprechbar für Fragen und Korrekturen.',
  },
  {
    icon: Target, label: 'Messbares Ergebnis', sub: 'Schwarz auf weiß', color: 'primary' as const,
    detail: 'Vorher-Nachher-Vergleich schwarz auf weiß. Deine Fortschritte sind dokumentiert.',
  },
]

export function ArchitectureSection() {
  const section = useScrollReveal(0.1)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleCard = (i: number) => {
    setOpenIndex(prev => prev === i ? null : i)
  }

  return (
    <section ref={section.ref} className="py-12 md:py-24 px-5">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Architektur</span>
          </div>
          <h2
            className={`text-2xl md:text-4xl font-bold mb-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.1s' }}
          >
            Alles greift ineinander.<br />
            <span className="text-primary">Ein System.</span>
          </h2>
          <p
            className={`text-muted-foreground text-lg max-w-xl mx-auto fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
            style={{ animationDelay: '0.15s' }}
          >
            Training, Ernährung und Coaching — perfekt aufeinander abgestimmt für maximale Ergebnisse.
          </p>
        </div>

        {/* ═══ DESKTOP: Radial layout ═══ */}
        <div
          className={`hidden md:block relative fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="relative" style={{ height: '420px' }}>
            {/* SVG connector lines + animated dots */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 420" preserveAspectRatio="xMidYMid meet">
              {[
                { x: 60, y: 70 },
                { x: 60, y: 210 },
                { x: 60, y: 350 },
                { x: 740, y: 70 },
                { x: 740, y: 210 },
                { x: 740, y: 350 },
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

            {/* Left column */}
            {allItems.slice(0, 3).map((item, i) => (
              <div
                key={`l${i}`}
                className="absolute left-0 w-[220px]"
                style={{ top: `${i * 130 + 20}px` }}
              >
                <ItemCard item={item} index={i} isOpen={openIndex === i} onToggle={() => toggleCard(i)} />
              </div>
            ))}

            {/* Right column */}
            {allItems.slice(3, 6).map((item, i) => (
              <div
                key={`r${i}`}
                className="absolute right-0 w-[220px]"
                style={{ top: `${i * 130 + 20}px` }}
              >
                <ItemCard item={item} index={i + 3} isOpen={openIndex === i + 3} onToggle={() => toggleCard(i + 3)} />
              </div>
            ))}

            {/* Center hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <CenterHub />
            </div>
          </div>
        </div>

        {/* ═══ MOBILE: Funnel layout — alles fließt in den Hub ═══ */}
        <div
          className={`md:hidden fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="relative">
            {/* SVG connector lines from each card to hub */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
              {allItems.map((_, i) => {
                const isLeft = i % 2 === 0
                const row = Math.floor(i / 2)
                const startX = isLeft ? '30%' : '70%'
                const startY = `${row * 120 + 60}px`
                return (
                  <line
                    key={i}
                    x1={startX} y1={startY}
                    x2="50%" y2="calc(100% - 100px)"
                    stroke="var(--border)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.5"
                  />
                )
              })}
            </svg>

            {/* Feature cards — 2-column staggered grid */}
            <div className="relative z-10 grid grid-cols-2 gap-3 mb-4">
              {allItems.map((item, i) => (
                <div key={i}>
                  <ItemCardMobile item={item} index={i} isOpen={openIndex === i} onToggle={() => toggleCard(i)} />
                </div>
              ))}
            </div>

            {/* Animated flow dots converging to center */}
            <div className="flex justify-center py-3">
              <svg width="60" height="32" className="overflow-visible">
                <path d="M 0 0 Q 15 16, 30 28" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 30 0 L 30 28" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 60 0 Q 45 16, 30 28" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
                {[
                  'M 0 0 Q 15 16, 30 28',
                  'M 30 0 L 30 28',
                  'M 60 0 Q 45 16, 30 28',
                ].map((path, i) => (
                  <circle key={i} r="2.5" fill="var(--primary)" opacity="0.6">
                    <animateMotion dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" path={path} />
                  </circle>
                ))}
              </svg>
            </div>

            {/* Center hub — destination of all flows */}
            <div className="relative z-10 flex justify-center">
              <CenterHub />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ItemCard({ item, index, isOpen, onToggle }: {
  item: typeof allItems[number]; index: number; isOpen: boolean; onToggle: () => void
}) {
  const isRight = index >= 3
  return (
    <div className="relative" onClick={onToggle}>
      <div
        className={`rounded-xl border bg-card transition-all duration-300 cursor-pointer ${
          isOpen ? 'border-primary/30 shadow-md' : 'border-border hover:border-primary/20'
        }`}
      >
        <div className="flex items-center gap-3 p-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
            item.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
          }`}>
            <item.icon className={`w-5 h-5 ${item.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.sub}</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      {/* Floating tooltip — doesn't affect layout */}
      {isOpen && (
        <div className={`absolute top-full mt-2 z-20 w-[260px] p-3.5 rounded-xl border border-primary/20 bg-card shadow-lg text-xs text-muted-foreground leading-relaxed ${
          isRight ? 'right-0' : 'left-0'
        }`}>
          <div className={`absolute -top-1.5 ${isRight ? 'right-5' : 'left-5'} w-3 h-3 rotate-45 border-l border-t border-primary/20 bg-card`} />
          {item.detail}
        </div>
      )}
    </div>
  )
}

function ItemCardMobile({ item, index, isOpen, onToggle }: {
  item: typeof allItems[number]; index: number; isOpen: boolean; onToggle: () => void
}) {
  return (
    <div
      className={`flex flex-col items-center text-center rounded-xl border bg-card relative cursor-pointer transition-all duration-300 ${
        isOpen ? 'border-primary/30 shadow-md' : 'border-border'
      }`}
      onClick={onToggle}
    >
      <div className="flex flex-col items-center gap-2 p-3.5 w-full">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          item.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
        }`}>
          <item.icon className={`w-4.5 h-4.5 ${item.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">{item.label}</p>
          <p className="text-[11px] text-muted-foreground">{item.sub}</p>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Expandable detail */}
      <div
        className="grid w-full transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-3.5 pb-3.5 text-[11px] text-muted-foreground leading-relaxed border-t border-border pt-2.5 mx-2">
            {item.detail}
          </p>
        </div>
      </div>

      {/* Small down-arrow showing flow direction */}
      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center z-10">
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </div>
    </div>
  )
}

function CenterHub() {
  return (
    <div className="w-56 p-6 rounded-2xl border-2 border-primary/20 bg-card text-center shadow-xl shadow-primary/5 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />

      <div className="relative">
        {/* FIT-INN Logo */}
        <div className="w-16 h-16 mx-auto mb-3">
          <img
            src="/favicon.jpg"
            alt="FIT-INN Trier"
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
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
