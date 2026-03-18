'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionBadge } from '@/components/SectionBadge'

export function TrainerSection() {
  const section = useScrollReveal(0.1)
  const [imgError, setImgError] = useState(false)

  const team = [
    {
      name: 'Markus',
      role: 'Head Coach · Personal Trainer',
      img: '/78f9c09701964478e73aa59a376482ba473970ca-1920x2000 (1).avif',
      initials: 'ME',
      color: 'accent' as const,
      tags: ['Personal Trainer', 'Head Coach', 'Seit 2009'],
    },
    {
      name: 'Unsere Trainer',
      role: 'Qualifiziertes Trainer-Team',
      img: '',
      initials: '💪',
      color: 'accent' as const,
      tags: ['Betreuung vor Ort', 'Technik & Korrekturen', 'Motivation'],
    },
    {
      name: 'Ernährungsexperten',
      role: 'Zertifizierte Ernährungsberatung',
      img: '',
      initials: '🥗',
      color: 'primary' as const,
      tags: ['Ernährungspläne', '§ 20 zertifiziert', 'Individuelle Beratung'],
    },
  ]

  return (
    <section ref={section.ref} className="py-20 md:py-32 px-5">
      <div className="mx-auto max-w-5xl">
        <SectionBadge number="05" label="Dein Team" />

        <h2
          className={`text-3xl md:text-5xl font-bold mb-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
        >
          Persönliche Betreuung —<br />
          <span className="text-primary">kein App-Training.</span>
        </h2>

        <p
          className={`text-muted-foreground text-lg max-w-2xl mb-14 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          Bei uns trainierst du nicht allein. Unser Team ist immer vor Ort — für Fragen, Korrekturen und Motivation.
        </p>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`border-t ${member.color === 'accent' ? 'border-accent/20' : 'border-primary/20'} pt-6 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              {/* Avatar */}
              <div className="mb-4">
                {member.img && !imgError ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-accent/30">
                    <Image
                      src={member.img}
                      alt={`${member.name} – FIT-INN Trier`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover object-top"
                      onError={() => setImgError(true)}
                    />
                  </div>
                ) : (
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg ${
                    member.color === 'accent' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                  }`}>
                    {member.initials}
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className={`text-xs font-medium mb-3 ${member.color === 'accent' ? 'text-accent' : 'text-primary'}`}>
                {member.role}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {member.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-card border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Team Quote */}
        <div
          className={`flex items-center gap-3 text-sm text-muted-foreground fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
            ))}
          </div>
          <span>4.9 · FIT-INN Trier · 127 Bewertungen</span>
        </div>
      </div>
    </section>
  )
}
