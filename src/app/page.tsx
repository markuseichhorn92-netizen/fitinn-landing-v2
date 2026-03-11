'use client'

import { useState } from 'react'
import { Target, ArrowRight, Play, X } from 'lucide-react'
import { QuizFunnel } from '@/components/quiz/QuizFunnel'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { SolutionSection } from '@/components/sections/SolutionSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { InsuranceCalculator } from '@/components/sections/InsuranceCalculator'
import { ValueSection } from '@/components/sections/ValueSection'

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  const startQuiz = () => setShowQuiz(true)
  const closeQuiz = () => setShowQuiz(false)
  const openBooking = () => {
    setShowQuiz(false)
    setShowBooking(true)
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      
      {/* Hero Section */}
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
                <button onClick={startQuiz} className="btn-primary flex items-center justify-center gap-3">
                  <Target className="w-5 h-5" />
                  Kostenlose Analyse starten
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              <p className="mt-4 text-sm text-muted-foreground">
                ✓ Unverbindlich · ✓ 2 Minuten · ✓ 100% kostenlos
              </p>
            </div>
            
            {/* Right: Video */}
            <div className="relative animate-fade-up delay-200">
              <div className="feature-card corner-decorator p-8">
                <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
                <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />
                
                {/* Video Embed */}
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

      {/* Problem Section */}
      <ProblemSection />

      {/* Solution Section */}
      <SolutionSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Insurance Calculator */}
      <InsuranceCalculator />

      {/* Value Section */}
      <ValueSection />

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
          <button onClick={startQuiz} className="btn-primary text-xl px-10 py-5 animate-fade-up delay-200">
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
              <a href="/widerruf" className="hover:text-foreground transition-colors">Widerruf</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
            <p>* Die Erstattung durch deine Krankenkasse kann je nach Anbieter variieren. Die meisten gesetzlichen Krankenkassen erstatten zwischen 70€ und 100% der Kursgebühr. Der Kurs ist nach § 20 SGB V zertifiziert.</p>
          </div>
        </div>
      </footer>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeQuiz}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl p-6 md:p-8 animate-scale-in">
            {/* Close Button */}
            <button 
              onClick={closeQuiz}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <QuizFunnel onComplete={openBooking} />
          </div>
        </div>
      )}

      {/* Booking Modal Placeholder */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowBooking(false)}
          />
          <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl p-8 animate-scale-in text-center">
            <button 
              onClick={() => setShowBooking(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-4">Probetraining buchen</h2>
            <p className="text-muted-foreground mb-6">
              Kontaktiere uns direkt per WhatsApp für deinen Wunschtermin:
            </p>
            <a 
              href="https://wa.me/4915679610457?text=Hallo!%20Ich%20möchte%20gerne%20ein%20kostenloses%20Probetraining%20bei%20happyfigur%20buchen."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta inline-flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Per WhatsApp buchen
            </a>
          </div>
        </div>
      )}
    </main>
  )
}
