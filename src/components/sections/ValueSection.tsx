import { CheckCircle2, ArrowRight } from 'lucide-react'

const valueItems = [
  { name: '3x Körperanalyse', value: '120€' },
  { name: '8 Wochen Studionutzung', value: '160€' },
  { name: 'Individueller Ernährungsplan', value: '79€' },
  { name: 'Einweisung + Coach vor Ort', value: '200€' },
  { name: 'Online-Lernplattform', value: '49€' },
  { name: '24/7 Live-Chat-Support', value: '50€' },
]

const totalValue = 658

export function ValueSection({ onStartQuiz }: { onStartQuiz: () => void }) {
  return (
    <section className="py-24 bg-card relative">
      <div className="mx-auto max-w-4xl px-6">
        <div className="feature-card corner-decorator p-8 md:p-12 animate-scale-in">
          {/* Corner decorators */}
          <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
          <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />

          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-sm text-accent uppercase tracking-widest font-semibold">Unschlagbarer Wert</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Wert von <span className="text-muted-foreground line-through decoration-2">{totalValue}€</span>
            </h2>
            <p className="text-xl text-primary font-bold mt-2">
              Für viele Teilnehmer komplett kostenlos<sup>²³</sup>
            </p>
          </div>

          {/* Value Breakdown */}
          <div className="max-w-md mx-auto mb-10">
            {valueItems.map((item, i) => (
              <div 
                key={i}
                className="flex justify-between items-center py-4 border-b border-border/50 animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  {item.name}
                </span>
                <span className="text-muted-foreground line-through">{item.value}</span>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-between items-center pt-6 mt-2">
              <span className="font-bold text-lg">Gesamtwert</span>
              <span className="text-2xl font-bold text-muted-foreground line-through">{totalValue}€</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-primary/10 border-2 border-primary rounded-2xl p-6 text-center max-w-md mx-auto mb-8">
            <p className="text-sm text-muted-foreground mb-2">Dein Preis</p>
            <div className="text-5xl font-bold text-primary">ab 0€<sup className="text-lg align-super">²³</sup></div>
            <p className="text-sm text-primary mt-2 font-medium">
              Bei vielen Krankenkassen komplett kostenlos
            </p>
            <div className="mt-3 pt-3 border-t border-primary/20">
              <p className="text-xs text-muted-foreground">
                Ohne Erstattung: <span className="text-foreground font-semibold">3,20€/Tag</span><sup>¹</sup> — weniger als ein Kaffee
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Gesamtpreis 179€<sup>¹</sup> · 8 Wochen
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button onClick={onStartQuiz} className="btn-cta inline-flex items-center gap-3 text-lg">
              Jetzt Probetraining buchen
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-muted-foreground mt-4">
              Du zahlst bei Trainingsstart<sup>¹</sup>, Krankenkasse erstattet dir das Geld zurück.<sup>²</sup>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
