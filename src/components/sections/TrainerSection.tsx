'use client'

import { useState } from 'react'
import Image from 'next/image'
import { User, Star } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useScrollFloat } from '@/hooks/useScrollFloat'
import { FloatingDecor, MedalSvg, DumbbellSvg, LeafSvg } from '@/components/FloatingDecor'

export function TrainerSection() {
  const section = useScrollReveal(0.1)
  const float = useScrollFloat(0.05)
  const [imgError, setImgError] = useState(false)

  return (
    <section className="py-10 relative overflow-hidden" ref={(node) => { section.ref(node); float.ref(node) }}>
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/4 rounded-full blur-3xl" />
      </div>

      {/* Floating Decorations */}
      <FloatingDecor position={{ top: '10%', right: '5%' }} isVisible={float.isVisible} progress={float.progress} delay={0.2} parallax={-55} sizeClass="w-6 h-6 md:w-12 md:h-12 lg:w-14 lg:h-14">
        <MedalSvg className="w-full h-full text-accent" />
      </FloatingDecor>
      <FloatingDecor position={{ bottom: '15%', left: '4%' }} isVisible={float.isVisible} progress={float.progress} delay={0.4} parallax={65} sizeClass="w-5 h-5 md:w-11 md:h-11 lg:w-13 lg:h-13">
        <DumbbellSvg className="w-full h-full text-accent" />
      </FloatingDecor>
      <FloatingDecor position={{ top: '30%', left: '3%' }} isVisible={float.isVisible} progress={float.progress} delay={0.3} parallax={50} sizeClass="w-4 h-4 md:w-9 md:h-9 lg:w-11 lg:h-11">
        <LeafSvg className="w-full h-full text-primary" />
      </FloatingDecor>

      <div className="relative mx-auto max-w-4xl px-6">
        <div className={`text-center mb-10 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
          <span className="text-sm text-primary uppercase tracking-widest font-semibold">Training & Ernährung — persönlich betreut</span>
          <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide mt-4">
            Dein <span className="text-primary">Coach</span> für beides
          </h2>
        </div>

        <div className={`feature-card p-8 md:p-12 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.2s' }}>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

            {/* Foto (trainer.jpg in /public/) — Fallback: Icon */}
            <div className="shrink-0 text-center">
              {!imgError ? (
                <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-primary/40 mx-auto">
                  <Image
                    src="/78f9c09701964478e73aa59a376482ba473970ca-1920x2000 (1).avif"
                    alt="Markus – Coach FIT-INN Trier"
                    width={144}
                    height={144}
                    className="w-full h-full object-cover object-top"
                    onError={() => setImgError(true)}
                  />
                </div>
              ) : (
                <div className="w-36 h-36 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto">
                  <User className="w-20 h-20 text-primary/40" />
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-1 text-foreground">Markus</h3>
              <p className="text-sm text-primary font-medium mb-2">
                Personal Trainer · happyfigur Coach · seit 2009
              </p>

              {/* Sterne */}
              <div className="flex items-center gap-1 mb-4 justify-center md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
                <span className="text-xs text-muted-foreground ml-2">4.9 · FIT-INN Trier</span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                Ich helfe Menschen in Trier dabei, endlich dauerhaft abzunehmen – nicht mit Diäten,
                sondern mit einem System das wirklich zu ihrem Alltag passt. Nach über 17 Jahren als
                Personal Trainer weiß ich: Der Schlüssel liegt nicht in mehr Disziplin, sondern im
                richtigen Ansatz für deinen Körper.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {[
                  { text: 'Personal Trainer', pillar: 'training' },
                  { text: 'Ernährungscoach', pillar: 'ernaehrung' },
                  { text: '17 Jahre Erfahrung', pillar: 'neutral' },
                  { text: '§ 20 SGB V zertifiziert', pillar: 'neutral' },
                ].map((tag, i) => (
                  <span
                    key={i}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium border ${
                      tag.pillar === 'training'
                        ? 'bg-accent/10 border-accent/20 text-accent'
                        : tag.pillar === 'ernaehrung'
                        ? 'bg-primary/10 border-primary/20 text-primary'
                        : 'bg-primary/10 border-primary/20 text-primary'
                    }`}
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <blockquote className="text-center text-sm text-muted-foreground italic leading-relaxed max-w-2xl mx-auto">
              &ldquo;Jeder Mensch ist anders – deshalb gibt es bei mir keinen Einheitsplan.
              Dein Körper, dein Ziel, dein Tempo. Und ich bin bei jedem Schritt dabei.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
