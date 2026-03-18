'use client'

import { Dumbbell, Apple, MessageCircle, BarChart2, Users, Target } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const allItems = [
  { icon: Dumbbell, label: 'Studio-Training', sub: 'FIT-INN Trier', color: 'accent' as const },
  { icon: Apple, label: 'Ernährungsplan', sub: 'Individuell angepasst', color: 'primary' as const },
  { icon: MessageCircle, label: 'Support', sub: 'Chat, Telefon, E-Mail', color: 'primary' as const },
  { icon: BarChart2, label: '3× Körperanalyse', sub: 'InBody-Messung', color: 'accent' as const },
  { icon: Users, label: 'Persönliches Coaching', sub: 'Trainer vor Ort', color: 'accent' as const },
  { icon: Target, label: 'Messbares Ergebnis', sub: 'Schwarz auf weiß', color: 'primary' as const },
]

export function ArchitectureSection() {
  const section = useScrollReveal(0.1)

  return (
    <section ref={section.ref} className="py-20 md:py-32 px-5">
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
            className={`text-3xl md:text-5xl font-bold mb-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
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
              {/* 6 lines from outer cards to center (400, 210) */}
              {[
                { x: 60, y: 70 },   // top-left
                { x: 60, y: 210 },  // mid-left
                { x: 60, y: 350 },  // bottom-left
                { x: 740, y: 70 },  // top-right
                { x: 740, y: 210 }, // mid-right
                { x: 740, y: 350 }, // bottom-right
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
              {/* Center dot glow */}
              <circle cx="400" cy="210" r="6" fill="var(--primary)" opacity="0.15" />
            </svg>

            {/* Outer cards — positioned absolutely */}
            {/* Left column */}
            {allItems.slice(0, 3).map((item, i) => (
              <div
                key={`l${i}`}
                className="absolute left-0 w-[220px]"
                style={{ top: `${i * 130 + 20}px` }}
              >
                <ItemCard item={item} />
              </div>
            ))}

            {/* Right column */}
            {allItems.slice(3, 6).map((item, i) => (
              <div
                key={`r${i}`}
                className="absolute right-0 w-[220px]"
                style={{ top: `${i * 130 + 20}px` }}
              >
                <ItemCard item={item} />
              </div>
            ))}

            {/* Center hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <CenterHub />
            </div>
          </div>
        </div>

        {/* ═══ MOBILE: Vertical with animated connectors ═══ */}
        <div
          className={`md:hidden fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="space-y-3">
            {allItems.slice(0, 3).map((item, i) => (
              <div key={`ml${i}`}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          {/* Animated connector to center */}
          <div className="flex justify-center py-4">
            <svg width="2" height="60" className="overflow-visible">
              <line x1="1" y1="0" x2="1" y2="60" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle r="3" fill="var(--primary)" opacity="0.7">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 1 0 L 1 60" />
              </circle>
            </svg>
          </div>

          {/* Center hub */}
          <CenterHub />

          {/* Animated connector from center */}
          <div className="flex justify-center py-4">
            <svg width="2" height="60" className="overflow-visible">
              <line x1="1" y1="0" x2="1" y2="60" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle r="3" fill="var(--primary)" opacity="0.7">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 1 0 L 1 60" />
              </circle>
            </svg>
          </div>

          <div className="space-y-3">
            {allItems.slice(3, 6).map((item, i) => (
              <div key={`mr${i}`}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ItemCard({ item }: { item: typeof allItems[number] }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
        item.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
      }`}>
        <item.icon className={`w-5 h-5 ${item.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
      </div>
      <div>
        <p className="font-semibold text-sm">{item.label}</p>
        <p className="text-xs text-muted-foreground">{item.sub}</p>
      </div>
    </div>
  )
}

function CenterHub() {
  return (
    <div className="w-52 p-6 rounded-2xl border-2 border-primary/20 bg-card text-center shadow-lg shadow-primary/5">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
        <span className="text-primary text-xl font-bold">hf</span>
      </div>
      <p className="font-bold text-sm uppercase tracking-wider">happyfigur</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">8-Wochen-System</p>
      <div className="mt-4 space-y-1.5 text-left">
        {['Stoffwechsel aktivieren', 'Ernährung optimieren', 'Ergebnis messen'].map((t, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-1 h-1 rounded-full bg-primary/60" />
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}
