'use client'

import { Dumbbell, Apple, MessageCircle, BarChart2, Users, Target } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const leftItems = [
  { icon: Dumbbell, label: 'Studio-Training', sub: 'FIT-INN Trier' },
  { icon: Apple, label: 'Ernährungsplan', sub: 'Individuell angepasst' },
  { icon: MessageCircle, label: 'Support', sub: 'Chat, Telefon, E-Mail' },
]

const rightItems = [
  { icon: BarChart2, label: '3× Körperanalyse', sub: 'InBody-Messung' },
  { icon: Users, label: 'Persönliches Coaching', sub: 'Trainer vor Ort' },
  { icon: Target, label: 'Messbares Ergebnis', sub: 'Schwarz auf weiß' },
]

export function ArchitectureSection() {
  const section = useScrollReveal(0.1)

  return (
    <section ref={section.ref} className="py-20 md:py-32 px-5">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
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

        {/* Architecture Diagram — Desktop with SVG connectors */}
        <div
          className={`hidden md:block relative fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="grid grid-cols-[1fr_220px_1fr] gap-0 items-center">
            {/* Left cards */}
            <div className="space-y-3 pr-4">
              {leftItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50 hover:border-primary/20 transition-colors relative"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                  {/* Connector dot on right edge */}
                  <div className="absolute -right-[7px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-card border-2 border-primary/30 z-10" />
                </div>
              ))}
            </div>

            {/* Center hub with SVG lines */}
            <div className="relative flex flex-col items-center justify-center">
              {/* SVG connector lines — left side */}
              <svg className="absolute left-0 top-0 w-full h-full pointer-events-none overflow-visible" style={{ left: '-16px', width: 'calc(100% + 32px)' }}>
                {/* Left connectors (3 lines from left cards to center) */}
                {[0, 1, 2].map(i => {
                  const cardY = 40 + i * 68 // approximate card center positions
                  const centerY = 120 // center of hub
                  return (
                    <g key={`l${i}`}>
                      <path
                        d={`M 0 ${cardY} C 40 ${cardY}, 60 ${centerY}, 90 ${centerY}`}
                        fill="none"
                        stroke="rgba(125,216,125,0.15)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      {/* Animated dot traveling along path */}
                      <circle r="3" fill="var(--primary)" opacity="0.6">
                        <animateMotion
                          dur={`${2.5 + i * 0.3}s`}
                          repeatCount="indefinite"
                          path={`M 0 ${cardY} C 40 ${cardY}, 60 ${centerY}, 90 ${centerY}`}
                        />
                      </circle>
                      {/* Static dot at card edge */}
                      <circle cx="0" cy={cardY} r="3" fill="var(--primary)" opacity="0.3" />
                    </g>
                  )
                })}
                {/* Right connectors (3 lines from center to right cards) */}
                {[0, 1, 2].map(i => {
                  const cardY = 40 + i * 68
                  const centerY = 120
                  const svgW = 252 // approximate total width
                  return (
                    <g key={`r${i}`}>
                      <path
                        d={`M ${svgW - 90} ${centerY} C ${svgW - 60} ${centerY}, ${svgW - 40} ${cardY}, ${svgW} ${cardY}`}
                        fill="none"
                        stroke="rgba(125,216,125,0.15)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      {/* Animated dot traveling along path */}
                      <circle r="3" fill="var(--primary)" opacity="0.6">
                        <animateMotion
                          dur={`${2.8 + i * 0.3}s`}
                          repeatCount="indefinite"
                          path={`M ${svgW - 90} ${centerY} C ${svgW - 60} ${centerY}, ${svgW - 40} ${cardY}, ${svgW} ${cardY}`}
                        />
                      </circle>
                      {/* Static dot at card edge */}
                      <circle cx={svgW} cy={cardY} r="3" fill="var(--primary)" opacity="0.3" />
                    </g>
                  )
                })}
              </svg>

              {/* Center card */}
              <div className="relative z-10 w-48 p-6 rounded-2xl border-2 border-primary/20 bg-card text-center shadow-lg shadow-primary/5">
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
            </div>

            {/* Right cards */}
            <div className="space-y-3 pl-4">
              {rightItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50 hover:border-primary/20 transition-colors relative"
                >
                  {/* Connector dot on left edge */}
                  <div className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-card border-2 border-primary/30 z-10" />
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical flow */}
        <div
          className={`md:hidden space-y-3 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          {/* Left items */}
          {leftItems.map((item, i) => (
            <div key={`l${i}`} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </div>
          ))}

          {/* Arrow down */}
          <div className="flex justify-center py-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-primary/20" />
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="w-px h-6 bg-primary/20" />
            </div>
          </div>

          {/* Center hub */}
          <div className="w-full p-6 rounded-2xl border-2 border-primary/20 bg-card text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-primary text-xl font-bold">hf</span>
            </div>
            <p className="font-bold text-sm uppercase tracking-wider">happyfigur</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">8-Wochen-System</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {['Stoffwechsel aktivieren', 'Ernährung optimieren', 'Ergebnis messen'].map((t, i) => (
                <div key={i} className="text-xs text-muted-foreground">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary/60 mr-1" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center py-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-primary/20" />
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="w-px h-6 bg-primary/20" />
            </div>
          </div>

          {/* Right items */}
          {rightItems.map((item, i) => (
            <div key={`r${i}`} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
