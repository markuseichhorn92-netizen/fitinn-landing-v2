import { Features } from "@/components/blocks/features-10"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5 text-sm font-medium text-destructive mb-6">
            ⚠️ Diäten funktionieren nicht
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Du hast <span className="text-destructive">alles versucht</span> – aber die Kilos bleiben?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Diäten, Verzicht, Sport... und trotzdem passiert nichts. <strong className="text-foreground">Das liegt nicht an dir.</strong> Du weißt nur noch nicht, was DEIN Körper wirklich braucht.
          </p>
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
              <circle cx="12" cy="12" r="2"/>
            </svg>
            Kostenlose Analyse starten
          </button>
          <p className="text-muted-foreground text-sm mt-4">Unverbindlich • 2 Minuten • Keine Kosten</p>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Social Proof */}
      <section className="py-12 border-y bg-muted/30">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">30</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Jahre Erfahrung</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">93%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Erfolgsquote</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">4.9★</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Google Bewertung</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">8</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Wochen Programm</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bereit für <span className="text-primary">echte Veränderung</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Dein Probetraining ist komplett kostenlos. Keine Verpflichtung, kein Risiko.
          </p>
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors">
            Jetzt Probetraining buchen
          </button>
        </div>
      </section>
    </main>
  )
}
