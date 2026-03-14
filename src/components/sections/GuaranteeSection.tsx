'use client'

import { Shield, CalendarX2, Award, HeartHandshake } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useScrollFloat } from '@/hooks/useScrollFloat'
import { FloatingDecor, ShieldCheckSvg } from '@/components/FloatingDecor'

const guarantees = [
  {
    icon: Shield,
    title: 'Probetraining 100% kostenlos',
    description: 'Lerne uns kennen – kein Cent, kein Haken.'
  },
  {
    icon: CalendarX2,
    title: 'Kein Abo, keine Falle',
    description: '8 Wochen – danach entscheidest du frei. Kein Abo, keine Verlängerung.'
  },
  {
    icon: Award,
    title: '30 Jahre Erfahrung in Trier',
    description: 'FIT-INN seit 1996. Tausende zufriedene Teilnehmer in Trier & Umgebung.'
  }
]

export function GuaranteeSection() {
  const section = useScrollReveal(0.15)
  const float = useScrollFloat(0.05)

  return (
    <section className="py-7 relative overflow-hidden" ref={(node) => { section.ref(node); float.ref(node) }}>
      {/* Floating Decorations */}
      <FloatingDecor position={{ top: '12%', right: '5%' }} isVisible={float.isVisible} progress={float.progress} delay={0.2} parallax={-20} sizeClass="w-8 h-8 md:w-11 md:h-11 lg:w-14 lg:h-14">
        <ShieldCheckSvg className="w-full h-full text-primary" />
      </FloatingDecor>
      <FloatingDecor position={{ bottom: '15%', left: '4%' }} isVisible={float.isVisible} progress={float.progress} delay={0.4} parallax={25} sizeClass="w-7 h-7 md:w-10 md:h-10 lg:w-12 lg:h-12">
        <ShieldCheckSvg className="w-full h-full text-primary" />
      </FloatingDecor>

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <div className={`feature-card p-10 md:p-14 text-center materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>

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
          <h2 className={`text-xl md:text-2xl font-semibold uppercase tracking-wide mt-4 mb-4 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
            Du gehst <span className="text-primary">kein Risiko</span> ein
          </h2>
          <p className={`text-muted-foreground text-base max-w-xl mx-auto mb-10 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.4s' }}>
            Keine Fallen, keine Ausreden. Nur Klarheit.
          </p>

          {/* Geld-zurück-Callout */}
          <div className={`mb-10 p-5 rounded-2xl bg-primary/10 border border-primary/30 max-w-lg mx-auto materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.45s' }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <HeartHandshake className="w-5 h-5 text-primary shrink-0" />
              <span className="text-primary font-bold">Wir sind für dich da</span>
            </div>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Bei Problemen oder Fragen stehen dir die Coaches von happyfigur jederzeit zur Verfügung – persönlich, per WhatsApp oder Telefon.
            </p>
          </div>

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
                <h3 className="font-semibold text-base">{g.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
