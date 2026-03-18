'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

const benchmarkData = [
  { label: 'AOK Rheinl.-Pfalz', amount: 179, count: '+ 4 weitere' },
  { label: 'AOK Hessen / Bayern', amount: 150, count: '+ 2 weitere' },
  { label: 'Techniker (TK)', amount: 143, count: '' },
  { label: 'BIG direkt', amount: 120, count: '' },
  { label: 'BARMER / SBK', amount: 100, count: '' },
  { label: 'DAK', amount: 75, count: '' },
]

const PROGRAM_PRICE = 179

export function InsuranceBenchmark() {
  const section = useScrollReveal(0.15)

  return (
    <div
      ref={section.ref}
      className={`border border-border rounded-xl overflow-hidden fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <p className="text-xs font-bold uppercase tracking-widest text-accent">Benchmark</p>
        <p className="text-lg font-bold mt-1">Erstattung nach Krankenkasse³</p>
      </div>

      {/* Bars */}
      <div className="px-5 py-4 space-y-4">
        {benchmarkData.map((item, i) => {
          const pct = Math.round((item.amount / PROGRAM_PRICE) * 100)
          const isFull = pct >= 100

          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-muted-foreground">
                  {item.label}
                  {item.count && <span className="text-xs text-muted-foreground/50 ml-1">{item.count}</span>}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{pct}%</span>
                  {isFull && (
                    <span className="text-[10px] font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">
                      kostenlos
                    </span>
                  )}
                </div>
              </div>
              <div className="h-2 bg-card rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    isFull ? 'bg-primary' : pct < 60 ? 'bg-accent' : 'bg-foreground'
                  }`}
                  style={{
                    width: section.isVisible ? `${pct}%` : '0%',
                    transitionDelay: `${0.3 + i * 0.1}s`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Durchschnitt aller Kassen</span>
        <span className="text-sm font-bold font-mono">78%</span>
      </div>
    </div>
  )
}
