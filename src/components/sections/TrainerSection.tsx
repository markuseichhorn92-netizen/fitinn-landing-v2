'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Award, Users, Salad } from 'lucide-react'
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
      icon: Award,
      color: 'accent' as const,
      tags: ['Personal Trainer', 'Head Coach', 'Seit 2009'],
      quote: 'Jeder Teilnehmer startet anders — aber keiner trainiert bei uns allein.',
    },
    {
      name: 'Unsere Trainer',
      role: 'Qualifiziertes Trainer-Team',
      img: '',
      initials: '💪',
      icon: Users,
      color: 'accent' as const,
      tags: ['Betreuung vor Ort', 'Technik & Korrekturen', 'Motivation'],
      quote: 'Immer ansprechbar — für Fragen, Korrekturen und den extra Push.',
    },
    {
      name: 'Ernährungsexperten',
      role: 'Zertifizierte Ernährungsberatung',
      img: '',
      initials: '🥗',
      icon: Salad,
      color: 'primary' as const,
      tags: ['Ernährungspläne', '§ 20 zertifiziert', 'Individuelle Beratung'],
      quote: 'Kein Hungern, keine Verbote — ein Plan, der zu deinem Alltag passt.',
    },
  ]

  return (
    <section id="team" ref={section.ref} className="py-12 md:py-24 px-5">
      <div className="mx-auto max-w-5xl">
        <SectionBadge number="05" label="Dein Team" />

        <h2
          className={`text-2xl md:text-4xl font-bold mb-4 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
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

        {/* Studio-Atmosphäre */}
        <div
          className={`relative rounded-2xl overflow-hidden mb-10 h-48 md:h-64 fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.15s' }}
        >
          <Image
            src="/studio-2.avif"
            alt="FIT-INN Trier — dein Studio für happyfigur"
            fill
            sizes="(max-width: 768px) 100vw, 960px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-5 md:left-6">
            <p className="text-white font-bold text-lg md:text-xl drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>FIT-INN Trier</p>
            <p className="text-white/90 text-sm drop-shadow-lg" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>Dein Studio für happyfigur</p>
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-lg fade-up ${
                member.color === 'accent' ? 'border-accent/15 hover:border-accent/30 hover:shadow-accent/5' : 'border-primary/15 hover:border-primary/30 hover:shadow-primary/5'
              } ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              {/* Header: Avatar + Name */}
              <div className="flex items-center gap-4 mb-5">
                {member.img && !imgError ? (
                  <div className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 ${
                    member.color === 'accent' ? 'border-accent/20' : 'border-primary/20'
                  }`}>
                    <Image
                      src={member.img}
                      alt={`${member.name} – FIT-INN Trier`}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover object-top"
                      onError={() => setImgError(true)}
                    />
                  </div>
                ) : (
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                    member.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
                  }`}>
                    <member.icon className={`w-6 h-6 ${member.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
                  </div>
                )}
                <div>
                  <h3 className="text-base font-bold leading-tight">{member.name}</h3>
                  <p className={`text-xs font-medium ${member.color === 'accent' ? 'text-accent' : 'text-primary'}`}>
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">
                &ldquo;{member.quote}&rdquo;
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {member.tags.map((tag, j) => (
                  <span
                    key={j}
                    className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${
                      member.color === 'accent'
                        ? 'bg-accent/5 border-accent/15 text-accent'
                        : 'bg-primary/5 border-primary/15 text-primary'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Rating bar */}
        <div
          className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
          style={{ animationDelay: '0.45s' }}
        >
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-sm font-semibold">4.9</span>
          <span className="text-sm text-muted-foreground">· FIT-INN Trier · 127 Bewertungen</span>
        </div>
      </div>
    </section>
  )
}
