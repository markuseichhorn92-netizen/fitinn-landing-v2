'use client'

import { Frown, Smile, ArrowRight } from 'lucide-react'

const beforeItems = [
  'Ständig müde & antriebslos',
  'Kleidung sitzt nicht mehr',
  'Heißhunger-Attacken',
  'Frustriert von Diäten',
]

const afterItems = [
  'Voller Energie',
  'Kleidung sitzt wieder',
  'Kontrolliertes Essverhalten',
  'Stolz auf dich selbst',
]

export function Transformation() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-destructive/5 via-transparent to-primary/5" />
      
      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-sm text-accent uppercase tracking-widest font-semibold">Deine Reise</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            So kann deine <span className="text-primary">Transformation</span> aussehen
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Das erleben unsere Teilnehmer typischerweise in 8 Wochen.
          </p>
        </div>
        
        {/* Before/After Grid */}
        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Arrow in the middle (desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center glow-box">
              <ArrowRight className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          {/* Before */}
          <div className="feature-card corner-decorator p-8 border-destructive/30 animate-fade-up">
            <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-destructive" />
            <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-destructive" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Frown className="w-8 h-8 text-destructive" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-destructive font-semibold">Vorher</span>
                <h3 className="text-2xl font-bold">So fühlst du dich jetzt</h3>
              </div>
            </div>
            
            <ul className="space-y-4">
              {beforeItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-destructive/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* After */}
          <div className="feature-card corner-decorator p-8 border-primary/30 animate-fade-up delay-100">
            <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
            <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Smile className="w-8 h-8 text-primary" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-semibold">Nach 8 Wochen</span>
                <h3 className="text-2xl font-bold">So wirst du dich fühlen</h3>
              </div>
            </div>
            
            <ul className="space-y-4">
              {afterItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-12 animate-fade-up delay-200">
          {[
            { value: '-6 kg', label: 'Durchschnitt' },
            { value: '-4%', label: 'Körperfett' },
            { value: '+2 kg', label: 'Muskelmasse' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Info Box */}
        <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20 text-center animate-fade-up delay-300">
          <p className="text-lg">
            <span className="text-primary font-bold">93%</span> unserer Teilnehmer berichten von deutlich mehr Energie bereits nach <span className="text-primary font-bold">2 Wochen</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
