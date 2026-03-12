'use client'

import { Shield, CheckCircle2, Award } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const guarantees = [
  {
    icon: Shield,
    title: 'Probetraining 100% kostenlos',
    description: 'Lerne uns kennen, ohne einen Cent auszugeben. Keine versteckten Kosten, kein Haken.'
  },
  {
    icon: CheckCircle2,
    title: 'Krankenkasse übernimmt bis zu 100%',
    description: 'Wir helfen dir aktiv bei der Erstattung. Du musst dich um fast nichts kümmern.'
  },
  {
    icon: Award,
    title: '30 Jahre Erfahrung in Trier',
    description: 'FIT-INN ist seit 1996 für Trier und Umgebung da. Tausende zufriedene Teilnehmer sprechen für uns.'
  }
]

export function GuaranteeSection() {
  const section = useScrollReveal(0.15)

  return (
    <section className="py-24 relative overflow-hidden" ref={section.ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <div className={`feature-card corner-decorator p-10 md:p-14 text-center materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
          <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
          <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />

          {/* Shield Icon with Forge Animation */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className={`w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shield-forge ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <div className={`forge-ring ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} />
            <div className={`forge-ring ring-2 ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} />
            <div className={`forge-ring ring-3 ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} />
          </div>

          <span className={`inline-block text-sm text-primary uppercase tracking-widest font-semibold materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.2s' }}>
            Unser Versprechen
          </span>
          <h2 className={`text-3xl md:text-5xl font-bold mt-4 mb-4 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
            Du gehst <span className="text-primary">kein Risiko</span> ein
          </h2>
          <p className={`text-muted-foreground text-lg max-w-xl mx-auto mb-12 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.4s' }}>
            Wir wissen, dass Vertrauen verdient werden muss. Deshalb machen wir es dir so leicht wie möglich.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {guarantees.map((g, i) => (
              <div
                key={i}
                className={`flex flex-col items-center text-center gap-3 scan-reveal ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
                style={{ animationDelay: `${0.5 + i * 0.15}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <g.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-base">{g.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
