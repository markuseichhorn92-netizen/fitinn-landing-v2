'use client'

import { TrendingDown, Scale, ThumbsUp, Check, X } from 'lucide-react'
import { useScrollReveal, useCountUp } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

const resultStats = [
  { value: 72, suffix: ' kg', prefix: '-', label: 'Ø Gewichtsverlust⁴', color: 'primary' as const },
  { value: 8, suffix: ' cm', prefix: '-', label: 'Ø Bauchumfang⁴', color: 'primary' as const },
  { value: 94, suffix: '%', prefix: '', label: 'empfehlen weiter', color: 'accent' as const },
]

const compareRows = [
  { feature: 'Persönliche Betreuung', happyfigur: true, diet: false, app: false, pt: true },
  { feature: 'Ernährungsplan', happyfigur: true, diet: false, app: true, pt: false },
  { feature: 'KK-Erstattung', happyfigur: true, diet: false, app: false, pt: false },
  { feature: 'Kein Abo', happyfigur: true, diet: true, app: false, pt: false },
  { feature: 'Messbare Ergebnisse', happyfigur: true, diet: false, app: false, pt: true },
]

const costs = [
  { label: 'happyfigur', cost: 'ab 0 €²³', highlight: true },
  { label: 'Diät', cost: 'variabel', highlight: false },
  { label: 'App', cost: '10–30€/Mo', highlight: false },
  { label: 'PT', cost: '200–400€/Mo', highlight: false },
]

// Mobile-Layout: eine Karte pro Alternative, sortiert nach Anzahl ✓-Features
const mobileCards = [
  {
    key: 'happyfigur', label: 'happyfigur', cost: 'ab 0 €²³', highlight: true,
    features: compareRows.map(r => ({ feature: r.feature, value: r.happyfigur })),
  },
  {
    key: 'pt', label: 'Personal Trainer', cost: '200–400€/Mo', highlight: false,
    features: compareRows.map(r => ({ feature: r.feature, value: r.pt })),
  },
  {
    key: 'app', label: 'Fitness-App', cost: '10–30€/Mo', highlight: false,
    features: compareRows.map(r => ({ feature: r.feature, value: r.app })),
  },
  {
    key: 'diet', label: 'Diät', cost: 'variabel', highlight: false,
    features: compareRows.map(r => ({ feature: r.feature, value: r.diet })),
  },
]

export function InsuranceBenchmark() {
  const section = useScrollReveal(0.15)

  return (
    <div className="space-y-8">
      {/* ─── Ergebnis-Stats ─── */}
      <div
        ref={section.ref}
        className={`grid grid-cols-3 gap-3 md:gap-6 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
      >
        {resultStats.map((stat, i) => (
          <ResultCard key={i} stat={stat} index={i} isVisible={section.isVisible} isReady={section.isReady} />
        ))}
      </div>

      {/* ─── Vergleich ─── */}
      <div
        className={`rounded-2xl border border-border overflow-hidden shadow-sm fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        style={{ animationDelay: '0.3s' }}
      >
        {/* Header */}
        <div className="px-4 md:px-6 py-4 md:py-5 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">Vergleich</p>
          <p className="text-lg md:text-xl font-bold">Warum happyfigur?</p>
        </div>

        {/* ═══ DESKTOP: Tabelle ═══ */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/20">
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3 w-[40%]" />
                <th className="text-center text-xs font-bold text-primary px-2 py-3 w-[15%]">
                  <span className="inline-flex flex-col items-center gap-0.5">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </span>
                    <span>happyfigur</span>
                  </span>
                </th>
                <th className="text-center text-xs text-muted-foreground px-2 py-3 w-[15%]">Diät</th>
                <th className="text-center text-xs text-muted-foreground px-2 py-3 w-[15%]">App</th>
                <th className="text-center text-xs text-muted-foreground px-2 py-3 w-[15%]">PT</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, i) => (
                <tr key={i} className={`${i < compareRows.length - 1 ? 'border-b border-border/30' : ''} hover:bg-secondary/10 transition-colors`}>
                  <td className="px-6 py-4 text-sm font-medium">{row.feature}</td>
                  <td className="text-center px-2 py-4 bg-primary/[0.02]"><CellIcon value={row.happyfigur} highlight /></td>
                  <td className="text-center px-2 py-4"><CellIcon value={row.diet} /></td>
                  <td className="text-center px-2 py-4"><CellIcon value={row.app} /></td>
                  <td className="text-center px-2 py-4"><CellIcon value={row.pt} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ═══ MOBILE: Karte pro Alternative ═══ */}
        <div className="md:hidden">
          {/* happyfigur — Highlight-Karte */}
          <MobileCard card={mobileCards[0]} />

          {/* Trenner */}
          <div className="px-4 py-3 bg-secondary/20 border-y border-border/40">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground text-center">
              Andere Optionen im Vergleich
            </p>
          </div>

          {/* Alternativen */}
          {mobileCards.slice(1).map(card => (
            <MobileCard key={card.key} card={card} />
          ))}
        </div>

        {/* Desktop-Kosten-Footer (Mobile zeigt Preise in den Karten-Headern) */}
        <div className="hidden md:block border-t border-border bg-gradient-to-r from-primary/5 to-transparent">
          <div className="grid items-center py-4 md:py-5" style={{ gridTemplateColumns: '40% 15% 15% 15% 15%' }}>
            <div className="px-6">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Kosten im Vergleich</p>
            </div>
            {costs.map((c, i) => (
              <div key={i} className={`text-center px-2 ${c.highlight ? 'bg-primary/[0.04] py-2 rounded-lg mx-1' : ''}`}>
                <p className={`text-lg lg:text-xl font-bold ${c.highlight ? 'text-primary' : 'text-foreground'}`}>{c.cost}</p>
                <p className={`text-[11px] mt-0.5 ${c.highlight ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultCard({ stat, index, isVisible, isReady }: {
  stat: typeof resultStats[number]; index: number; isVisible: boolean; isReady: boolean
}) {
  const rawValue = useCountUp(stat.value, 1500, isVisible)
  const display = stat.value === 72
    ? `${stat.prefix}${(rawValue / 10).toFixed(1)}${stat.suffix}`
    : `${stat.prefix}${rawValue}${stat.suffix}`

  const icons = [TrendingDown, Scale, ThumbsUp]
  const Icon = icons[index]

  return (
    <div
      className={`rounded-2xl border border-border p-3 md:p-6 text-center bg-card shadow-sm fade-up ${isReady ? 'anim-ready' : ''} ${isVisible ? 'animate' : ''}`}
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-1.5 md:mb-3 ${
        stat.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
      }`}>
        <Icon className={`w-4 h-4 md:w-6 md:h-6 ${stat.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
      </div>
      <p className={`text-xl md:text-4xl font-bold font-[family-name:var(--font-barlow-condensed)] ${
        stat.color === 'primary' ? 'text-primary' : 'text-accent'
      }`}>
        {display}
      </p>
      <p className="text-[9px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">{stat.label}</p>
    </div>
  )
}

function CellIcon({ value, highlight }: { value: boolean; highlight?: boolean }) {
  if (value) {
    return (
      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${highlight ? 'bg-primary/10' : 'bg-secondary'}`}>
        <Check className={`w-3.5 h-3.5 ${highlight ? 'text-primary' : 'text-foreground'}`} />
      </span>
    )
  }
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full">
      <X className="w-3.5 h-3.5 text-muted-foreground/25" />
    </span>
  )
}

function MobileCard({ card }: { card: typeof mobileCards[number] }) {
  return (
    <div
      className={cn(
        'mx-4 my-3 rounded-xl border p-4 transition-shadow',
        card.highlight
          ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20 shadow-md shadow-primary/10'
          : 'bg-card border-border',
      )}
    >
      {/* Header: Name + Preis */}
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <p className={cn('text-base font-bold', card.highlight && 'text-primary')}>
          {card.label}
        </p>
        <p className={cn(
          'text-sm font-semibold whitespace-nowrap',
          card.highlight ? 'text-primary' : 'text-muted-foreground',
        )}>
          {card.cost}
        </p>
      </div>

      {/* Empfohlen-Badge */}
      {card.highlight && (
        <span className="inline-block px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider mb-3">
          Empfohlen
        </span>
      )}

      {/* Feature-Liste */}
      <ul className="flex flex-col gap-2">
        {card.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm">
            {f.value ? (
              <span className={cn(
                'inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0',
                card.highlight ? 'bg-primary/15' : 'bg-secondary',
              )}>
                <Check className={cn(
                  'w-3 h-3',
                  card.highlight ? 'text-primary' : 'text-foreground',
                )} />
              </span>
            ) : (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive/10 shrink-0">
                <X className="w-3 h-3 text-destructive/70" />
              </span>
            )}
            <span className={cn(
              'leading-tight',
              f.value ? 'text-foreground' : 'text-muted-foreground line-through decoration-1 decoration-destructive/30',
            )}>
              {f.feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
