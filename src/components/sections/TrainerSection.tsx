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
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  const team = [
    {
      name: 'Markus',
      role: 'Head Coach · Personal Trainer',
      img: '/78f9c09701964478e73aa59a376482ba473970ca-1920x2000 (1).avif',
      initials: 'ME',
      color: 'accent',
      tags: ['Personal Trainer', 'Head Coach', 'Seit 2009'],
    },
    {
      name: 'Unsere Trainer',
      role: 'Qualifiziertes Trainer-Team',
      img: '',
      initials: '💪',
      color: 'accent',
      tags: ['Betreuung vor Ort', 'Technik & Korrekturen', 'Motivation'],
    },
    {
      name: 'Ernährungsexperten',
      role: 'Zertifizierte Ernährungsberatung',
      img: '',
      initials: '🥗',
      color: 'primary',
      tags: ['Ernährungspläne', '§ 20 zertifiziert', 'Individuelle Beratung'],
    },
  ]

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
            Unser <span className="text-primary">Team</span> für deinen Erfolg
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`feature-card p-6 text-center materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.2 + i * 0.15}s` }}
            >
              {/* Avatar */}
              <div className="mb-4">
                {member.img && !imgErrors[member.name] ? (
                  <div className={`w-24 h-24 rounded-full overflow-hidden border-2 mx-auto ${member.color === 'accent' ? 'border-accent/40' : 'border-primary/40'}`}>
                    <Image
                      src={member.img}
                      alt={`${member.name} – FIT-INN Trier`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover object-top"
                      onError={() => setImgErrors(e => ({ ...e, [member.name]: true }))}
                    />
                  </div>
                ) : (
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto text-xl font-bold ${
                    member.color === 'accent'
                      ? 'bg-accent/10 border-2 border-accent/30 text-accent'
                      : 'bg-primary/10 border-2 border-primary/30 text-primary'
                  }`}>
                    {member.initials}
                  </div>
                )}
              </div>

              {/* Name + Rolle */}
              <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
              <p className={`text-xs font-medium mb-3 ${member.color === 'accent' ? 'text-accent' : 'text-primary'}`}>
                {member.role}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 justify-center">
                {member.tags.map((tag, j) => (
                  <span
                    key={j}
                    className={`text-[10px] px-2.5 py-1 rounded-full font-medium border ${
                      member.color === 'accent'
                        ? 'bg-accent/10 border-accent/20 text-accent'
                        : 'bg-primary/10 border-primary/20 text-primary'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Team-Quote */}
        <div className={`mt-6 feature-card p-6 materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-1 mb-3 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
            <span className="text-xs text-muted-foreground ml-2">4.9 · FIT-INN Trier</span>
          </div>
          <blockquote className="text-center text-sm text-muted-foreground italic leading-relaxed max-w-2xl mx-auto">
            &ldquo;Bei uns trainierst du nicht allein. Unser Team ist immer vor Ort — für Fragen, Korrekturen und Motivation. Dein Ziel ist unser Ziel.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  )
}
