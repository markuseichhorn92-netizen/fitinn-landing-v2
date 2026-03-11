import { ChartLine, Dumbbell, Target, Utensils, Users, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      
      {/* Hero Section - Asymmetric Layout */}
      <section className="relative min-h-screen flex items-center py-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Content */}
            <div className="animate-fade-up">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                <span className="text-sm font-medium text-destructive uppercase tracking-wider">Diäten funktionieren nicht</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6">
                Du hast
                <span className="block text-destructive relative">
                  alles versucht
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-destructive/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <path d="M0,6 Q50,0 100,6 T200,6" stroke="currentColor" strokeWidth="4" fill="none"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mb-10 leading-relaxed">
                Sport, Diäten, Verzicht – und trotzdem bleiben die Kilos? 
                <strong className="text-foreground"> Das Problem liegt nicht bei dir.</strong>
              </p>
              
              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex items-center justify-center gap-3">
                  <Target className="w-5 h-5" />
                  Kostenlose Analyse starten
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              <p className="mt-4 text-sm text-muted-foreground">
                ✓ Unverbindlich · ✓ 2 Minuten · ✓ 100% kostenlos
              </p>
            </div>
            
            {/* Right: Visual */}
            <div className="relative animate-fade-up delay-200">
              <div className="feature-card corner-decorator p-8">
                <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
                <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />
                
                {/* Video Embed Placeholder */}
                <div className="aspect-video bg-secondary/50 rounded-lg overflow-hidden relative">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/IAJXZ3qp6GU?rel=0&modestbranding=1"
                    title="Was ist happyfigur?"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Das Programm</p>
                    <p className="text-2xl font-bold">8 Wochen · 3 Analysen</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Erstattung</p>
                    <p className="text-2xl font-bold text-primary">Bis zu 100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Krankenkassen Banner */}
      <section className="py-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.05)_20px)]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="text-primary-foreground text-lg font-semibold">
            § 20 SGB V · Deine Krankenkasse übernimmt bis zu <span className="underline decoration-2">100% der Kosten</span>
          </p>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-12 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '30', label: 'Jahre Erfahrung' },
              { value: '93%', label: 'Erfolgsquote' },
              { value: '4.9★', label: 'Google Bewertung' },
              { value: '8', label: 'Wochen Programm' },
            ].map((stat, i) => (
              <div key={i} className="text-center animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold text-primary glow-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is happyfigur - Feature Cards */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16 animate-fade-up">
            <span className="text-sm text-accent uppercase tracking-widest font-semibold">Das Programm</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-4">
              Was ist <span className="text-primary">happyfigur</span>?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ChartLine, title: '3x Körperanalyse', desc: 'Start, Mitte, Ende – du siehst schwarz auf weiß, wie sich Gewicht, Fett und Muskeln verändern.' },
              { icon: Dumbbell, title: '8 Wochen Training', desc: 'Unbegrenzter Zugang zum Studio mit persönlicher Betreuung und Trainingsplan.' },
              { icon: Utensils, title: 'Ernährungsplan', desc: 'Kein Verzicht, kein Hungern. Individuell auf deinen Stoffwechsel abgestimmt.' },
              { icon: Users, title: 'Personal Coaching', desc: '3 Termine mit persönlicher Betreuung. Wir begleiten dich auf deinem Weg.' },
              { icon: Smartphone, title: '24/7 Support', desc: 'WhatsApp, E-Mail, Telefon – wir sind immer für dich da.' },
              { icon: CheckCircle2, title: 'Zertifiziert § 20', desc: 'Krankenkassen erstatten 75€ bis 179€. Bei vielen Kassen komplett kostenlos.' },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="feature-card corner-decorator p-6 animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
                <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />
                
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Comparison */}
      <section className="py-24 bg-card relative">
        <div className="mx-auto max-w-4xl px-6">
          <div className="feature-card corner-decorator p-8 md:p-12 animate-scale-in">
            <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
            <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />
            
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-bold">
                Wert von <span className="text-muted-foreground line-through">658€</span>
              </h2>
              <p className="text-xl text-primary font-bold mt-2">Für viele komplett kostenlos</p>
            </div>
            
            <div className="grid gap-4 mb-8">
              {[
                { name: '3x Körperanalyse', value: '120€' },
                { name: '8 Wochen Studionutzung', value: '160€' },
                { name: 'Individueller Ernährungsplan', value: '79€' },
                { name: 'Personal Coaching (3 Termine)', value: '200€' },
                { name: 'Online-Lernplattform', value: '49€' },
                { name: '24/7 WhatsApp-Support', value: '50€' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="text-muted-foreground line-through">{item.value}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button className="btn-cta flex items-center justify-center gap-3 mx-auto">
                Jetzt Probetraining buchen
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="mt-4 text-sm text-muted-foreground">
                Du zahlst bei Trainingsstart, Krankenkasse erstattet dir das Geld zurück
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
            Bereit für <span className="text-primary">echte Veränderung</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up delay-100">
            Dein Probetraining ist komplett kostenlos. Keine Verpflichtung, kein Risiko. 
            Nur der erste Schritt zu deinem Wunschgewicht.
          </p>
          <button className="btn-primary text-xl px-10 py-5 animate-fade-up delay-200">
            <Target className="w-6 h-6 inline mr-3" />
            Kostenlose Analyse starten
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-bold text-lg">FIT-INN Trier</p>
              <p className="text-sm text-muted-foreground">Auf Hirtenberg 8, 54296 Trier</p>
              <p className="text-sm text-muted-foreground">Seit 1996 · Tel: 0651 9949540</p>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="/impressum" className="hover:text-foreground transition-colors">Impressum</a>
              <a href="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</a>
              <a href="/agb" className="hover:text-foreground transition-colors">AGB</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
