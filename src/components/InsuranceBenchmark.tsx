'use client'

import { TrendingDown, Scale, ThumbsUp, Check, X } from 'lucide-react'
import { useScrollReveal, useCountUp } from '@/hooks/useScrollReveal'

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
  { label: 'Fitness-App', cost: '10–30€/Mo', highlight: false },
  { label: 'Personal Trainer', cost: '200–400€/Mo', highlight: false },
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

        {/* ═══ MOBILE: Feature-Cards ═══ */}
        <div className="md:hidden divide-y divide-border/30">
          {compareRows.map((row, i) => (
            <div key={i} className="px-4 py-4">
              <p className="text-sm font-bold mb-3">{row.feature}</p>
              <div className="flex gap-2">
                {[
                  { label: 'happyfigur', value: row.happyfigur, hl: true },
                  { label: 'Diät', value: row.diet, hl: false },
                  { label: 'App', value: row.app, hl: false },
                  { label: 'PT', value: row.pt, hl: false },
                ].map((v, j) => (
                  <div
                    key={j}
                    className={`flex-1 py-2 rounded-lg text-center ${
                      v.value
                        ? v.hl ? 'bg-primary/10 border border-primary/20' : 'bg-secondary border border-border'
                        : 'bg-transparent'
                    }`}
                  >
                    <div className="flex justify-center mb-1">
                      {v.value ? (
                        <Check className={`w-4 h-4 ${v.hl ? 'text-primary' : 'text-foreground'}`} />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/20" />
                      )}
                    </div>
                    <p className={`text-[10px] leading-tight ${v.hl ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                      {v.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Kosten-Footer */}
        <div className="border-t border-border bg-gradient-to-r from-primary/5 to-transparent px-4 md:px-6 py-4 md:py-5">
          {/* Desktop: 4-Spalten */}
          <div className="hidden md:grid grid-cols-4 gap-3">
            {costs.map((c, i) => (
              <div key={i}>
                <p className={`text-xl font-bold ${c.highlight ? 'text-primary' : 'text-foreground'}`}>{c.cost}</p>
                <p className={`text-[11px] ${c.highlight ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>{c.label}</p>
              </div>
            ))}
          </div>
          {/* Mobile: happyfigur groß + Rest klein */}
          <div className="md:hidden">
            <div className="flex items-baseline gap-2 mb-3">
              <p className="text-2xl font-bold text-primary">ab 0 €²³</p>
              <p className="text-sm text-primary font-semibold">mit happyfigur</p>
            </div>
            <div className="flex gap-4">
              {costs.slice(1).map((c, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-muted-foreground">{c.cost}</p>
                  <p className="text-[10px] text-muted-foreground/70">{c.label}</p>
                </div>
              ))}
            </div>
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
