'use client'

import { useScrollReveal, useCountUp } from '@/hooks/useScrollReveal'

function StatItem({ endValue, format, label, sub, isVisible }: {
  endValue: number
  format: (n: number) => string
  label: string
  sub: string
  isVisible: boolean
}) {
  const count = useCountUp(endValue, 2000, isVisible)
  return (
    <div className="text-center relative">
      <div className="relative inline-block">
        <div className="text-2xl md:text-3xl font-bold text-primary glow-text">
          {format(count)}
        </div>
      </div>
      <div className="text-xs font-semibold mt-1 uppercase tracking-wider">{label}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
    </div>
  )
}

export function SocialProofStrip() {
  const stats = useScrollReveal(0.3)

  return (
    <section className="py-5 border-y border-border/50" ref={stats.ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem endValue={30} format={n => `${n}+`} label="Jahre Erfahrung" sub="FIT-INN seit 1996" isVisible={stats.isVisible} />
          <StatItem endValue={127000} format={n => `${n.toLocaleString('de-DE')}+`} label="happyfigur Teilnehmer" sub="deutschlandweit" isVisible={stats.isVisible} />
          <StatItem endValue={49} format={n => `${(n / 10).toFixed(1)}★`} label="Google Bewertung" sub="127 Rezensionen" isVisible={stats.isVisible} />
          <StatItem endValue={72} format={n => `-${(n / 10).toFixed(1).replace('.', ',')} kg`} label="Ø Gewichtsverlust" sub="in 8 Wochen¹" isVisible={stats.isVisible} />
        </div>
      </div>
    </section>
  )
}
