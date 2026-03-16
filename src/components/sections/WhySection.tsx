'use client'

import Image from 'next/image'
import { ChartLine, Dumbbell, Utensils, Users, Smartphone, CheckCircle2, ArrowRight, X, MessageCircle } from 'lucide-react'
import { openLiveChat } from '@/lib/livechat'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useScrollFloat } from '@/hooks/useScrollFloat'
import { FloatingDecor, DumbbellSvg, AppleSvg, LeafSvg } from '@/components/FloatingDecor'

const problems = [
  'Die Waage bewegt sich nicht — egal was du isst',
  'Jo-Jo-Effekt nach jeder Diät',
  'Kein Plan, der wirklich zu deinem Alltag passt',
]

const solutions = [
  'Gezielt auf deinen Stoffwechsel — kein Allgemeinplan',
  'Kein Kalorienzählen, keine Verbote',
  'Trainer vor Ort immer ansprechbar — persönlich, nicht per App',
  '§ 20 SGB V: Deine Kasse übernimmt bis zu 100%²³',
]

const features = [
  { icon: ChartLine, title: '3× Körperanalyse', desc: 'Start, Mitte, Ende — du siehst in Zahlen was sich verändert.', pillar: 'training' as const },
  { icon: Dumbbell, title: '8 Wochen Training', desc: 'Individueller Plan, unbegrenzter Zugang, keine Allgemeinroutine.', pillar: 'training' as const },
  { icon: Users, title: 'Personal Coaching', desc: 'Persönliche Einweisung + Trainer jederzeit vor Ort ansprechbar.', pillar: 'training' as const },
  { icon: Utensils, title: 'Ernährungsplan', desc: 'Passend zu deinem Alltag. Kein Hungern, keine Verbote.', pillar: 'ernaehrung' as const },
  { icon: Smartphone, title: '24/7 Support', desc: 'WhatsApp, E-Mail, Telefon — wir sind immer erreichbar.', pillar: 'ernaehrung' as const },
  { icon: CheckCircle2, title: 'Zertifiziert § 20', desc: 'Deine Kasse erstattet 75€–179€ — bei vielen komplett kostenlos.²³', pillar: 'ernaehrung' as const },
]

export function WhySection({ onStartQuiz }: { onStartQuiz: () => void }) {
  const section = useScrollReveal(0.05)
  const float = useScrollFloat(0.05)

  return (
    <section id="programm" className="py-8 relative overflow-hidden" ref={(node) => { section.ref(node); float.ref(node) }}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent" />
      </div>

      {/* Floating Decorations */}
      <FloatingDecor position={{ top: '8%', left: '3%' }} isVisible={float.isVisible} progress={float.progress} delay={0.1} parallax={80} sizeClass="w-6 h-6 md:w-14 md:h-14 lg:w-16 lg:h-16">
        <DumbbellSvg className="w-full h-full text-accent" />
      </FloatingDecor>
      <FloatingDecor position={{ top: '15%', right: '5%' }} isVisible={float.isVisible} progress={float.progress} delay={0.3} parallax={-50} sizeClass="w-5 h-5 md:w-11 md:h-11 lg:w-14 lg:h-14">
        <AppleSvg className="w-full h-full text-primary" />
      </FloatingDecor>
      <FloatingDecor position={{ bottom: '20%', left: '5%' }} isVisible={float.isVisible} progress={float.progress} delay={0.5} parallax={60} sizeClass="w-4 h-4 md:w-10 md:h-10 lg:w-12 lg:h-12">
        <LeafSvg className="w-full h-full text-primary" />
      </FloatingDecor>
      <FloatingDecor position={{ bottom: '12%', right: '3%' }} isVisible={float.isVisible} progress={float.progress} delay={0.4} parallax={-70} sizeClass="w-5 h-5 md:w-12 md:h-12 lg:w-14 lg:h-14">
        <DumbbellSvg className="w-full h-full text-accent" />
      </FloatingDecor>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <div className={`text-center mb-12 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
          <span className="text-sm text-primary uppercase tracking-widest font-semibold">Training + Ernährung = Ergebnis</span>
          <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide mt-4">
            Kein Diät-Plan. Ein System aus <span className="text-accent">Training</span> & <span className="text-primary">Ernährung</span>, das funktioniert.
          </h2>
        </div>

        {/* 2-Column: Problem vs. Solution */}
        <div className={`grid md:grid-cols-2 gap-6 mb-12 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.15s' }}>
          {/* Left: Problems */}
          <div className="rounded-2xl bg-white/3 border border-white/8 p-6">
            <p className="text-sm text-red-400 uppercase tracking-widest font-semibold mb-4">Das kennst du</p>
            <ul className="space-y-3">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Solutions */}
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
            <p className="text-sm text-primary uppercase tracking-widest font-semibold mb-4">HappyFigur macht es anders</p>
            <ul className="space-y-3">
              {solutions.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className={`feature-card p-5 group lift-in ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  f.pillar === 'training'
                    ? 'bg-accent/10 group-hover:bg-accent/20'
                    : 'bg-primary/10 group-hover:bg-primary/20'
                }`}>
                  <f.icon className={`w-5 h-5 ${f.pillar === 'training' ? 'text-accent' : 'text-primary'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold">{f.title}</h3>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
                      f.pillar === 'training'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {f.pillar === 'training' ? 'Training' : 'Ernährung'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mockup */}
        <div className="mt-8 relative max-w-2xl mx-auto">
          <Image
            src="/mockup-paket.png"
            alt="Happyfigur – App, Online-Plattform, Ernährungsplan und Rezeptbuch"
            width={900}
            height={600}
            className="w-full h-auto drop-shadow-2xl"
          />
          <div className="absolute inset-0 -z-10 bg-primary/10 rounded-3xl blur-3xl scale-90" />
          <p className="text-center text-xs text-muted-foreground mt-2">
            happyfigur – App, Online-Lernplattform & individueller Ernährungsplan
          </p>
        </div>

        {/* CTA */}
        <div className={`mt-10 text-center materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.9s' }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={onStartQuiz} className="btn-cta inline-flex items-center gap-3 text-lg">
              Jetzt Probetraining sichern
              <ArrowRight className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => openLiveChat()} className="btn-outline">
              <MessageCircle className="w-4 h-4" />
              Fragen? Chatte mit uns
            </button>
          </div>
          <p className="text-muted-foreground text-sm mt-3">✓ Unverbindlich · ✓ Kostenlos · ✓ § 20 SGB V zertifiziert</p>
        </div>

      </div>
    </section>
  )
}
