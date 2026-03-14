'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MessageSquare, BarChart2, Dumbbell, Target } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const steps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Kostenloses Probetraining',
    description: 'Lerne das Studio kennen, trainiere einmal mit und besprich deine Ziele – unverbindlich und kostenlos.',
  },
  {
    icon: BarChart2,
    step: '02',
    title: 'Dein persönlicher Plan',
    description: 'InBody-Körperanalyse + individueller Trainings- und Ernährungsplan.',
  },
  {
    icon: Dumbbell,
    step: '03',
    title: 'Begleitetes Training',
    description: '2–3 Einheiten/Woche im FIT-INN Trier – dein fester Ansprechpartner ist immer vor Ort für Fragen und Korrekturen.',
  },
  {
    icon: Target,
    step: '04',
    title: 'Dein Ergebnis',
    description: 'Abschluss-Körperanalyse nach 8 Wochen – du siehst schwarz auf weiß was sich verändert hat.',
  },
]

const THRESHOLDS = [0.05, 0.32, 0.58, 0.85]
const LERP_SPEED = 0.08 // Easing-Faktor: 0.05 = weich, 0.15 = schnell

/* ─── SVG-Pfad: Linie → Kreis → Linie → Kreis ... ─── */
function buildTimelinePath(
  dots: { cx: number; cy: number; r: number }[],
  containerHeight: number,
): string {
  if (dots.length === 0) return ''
  const cx = dots[0].cx
  const parts: string[] = [`M ${cx} 0`]

  for (let i = 0; i < dots.length; i++) {
    const { cy, r } = dots[i]
    parts.push(`L ${cx} ${cy - r}`)
    parts.push(`A ${r} ${r} 0 0 1 ${cx} ${cy + r}`)
    parts.push(`A ${r} ${r} 0 0 1 ${cx} ${cy - r}`)
    parts.push(`A ${r} ${r} 0 0 1 ${cx} ${cy + r}`)
  }

  parts.push(`L ${cx} ${containerHeight}`)
  return parts.join(' ')
}

export function ProcessSection() {
  const heading = useScrollReveal(0.15)
  const timelineRef = useRef<HTMLDivElement>(null)
  const fillPathRef = useRef<SVGPathElement>(null)
  const tipRef = useRef<SVGCircleElement>(null)
  const desktopDotRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobileDotRefs = useRef<(HTMLDivElement | null)[]>([])

  // Scroll-Ziel (roh) vs. gerenderten Wert (geglättet)
  const targetProgress = useRef(0)
  const currentProgress = useRef(0)
  const rafId = useRef(0)

  // React-State nur für Layout (Cards ein/ausblenden)
  const [activeSteps, setActiveSteps] = useState([false, false, false, false])
  const [pathData, setPathData] = useState('')
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 })

  // Scroll-Position → targetProgress (kein setState!)
  useEffect(() => {
    const onScroll = () => {
      if (!timelineRef.current) return
      const rect = timelineRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      const start = rect.top - vh * 0.75
      const end = rect.bottom - vh * 0.3
      targetProgress.current = Math.max(0, Math.min(1, -start / (end - start)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // rAF-Loop: Lerp currentProgress → targetProgress, DOM direkt manipulieren
  useEffect(() => {
    let prevActive = [false, false, false, false]

    const tick = () => {
      const target = targetProgress.current
      const current = currentProgress.current

      // Lerp: sanft zum Zielwert gleiten
      const diff = target - current
      if (Math.abs(diff) > 0.0005) {
        currentProgress.current += diff * LERP_SPEED
      } else {
        currentProgress.current = target
      }

      const p = currentProgress.current

      // SVG strokeDashoffset direkt setzen (kein React-Render)
      if (fillPathRef.current) {
        fillPathRef.current.style.strokeDashoffset = String(100 - p * 100)
      }

      // Leuchtpunkt direkt positionieren
      if (tipRef.current && fillPathRef.current) {
        if (p > 0.01 && p < 0.99) {
          const totalLen = fillPathRef.current.getTotalLength()
          const pt = fillPathRef.current.getPointAtLength(p * totalLen)
          tipRef.current.setAttribute('cx', String(pt.x))
          tipRef.current.setAttribute('cy', String(pt.y))
          tipRef.current.style.opacity = '1'
        } else {
          tipRef.current.style.opacity = '0'
        }
      }

      // Card-Sichtbarkeit nur bei Schwellenwert-Änderung updaten (selten)
      const newActive = THRESHOLDS.map(t => p >= t)
      if (newActive.some((v, i) => v !== prevActive[i])) {
        prevActive = newActive
        setActiveSteps([...newActive])
      }

      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  // Dot-Positionen messen + Pfad generieren
  const measure = useCallback(() => {
    if (!timelineRef.current) return
    const containerRect = timelineRef.current.getBoundingClientRect()

    const isDesktop = containerRect.width >= 768
    const refs = isDesktop ? desktopDotRefs : mobileDotRefs
    const visibleDots = refs.current.filter((d): d is HTMLDivElement => d !== null)

    if (visibleDots.length === 0) return

    const dots = visibleDots.map(dot => {
      const rect = dot.getBoundingClientRect()
      return {
        cx: rect.left + rect.width / 2 - containerRect.left,
        cy: rect.top + rect.height / 2 - containerRect.top,
        r: rect.width / 2,
      }
    })

    setPathData(buildTimelinePath(dots, containerRect.height))
    setContainerSize({ w: containerRect.width, h: containerRect.height })
  }, [])

  useEffect(() => {
    if (!timelineRef.current) return
    requestAnimationFrame(() => requestAnimationFrame(measure))
    const ro = new ResizeObserver(measure)
    ro.observe(timelineRef.current)
    return () => ro.disconnect()
  }, [measure])

  return (
    <section id="ablauf" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        {/* Heading */}
        <div
          ref={heading.ref}
          className={`text-center mb-14 md:mb-20 materialize ${heading.isReady ? 'anim-ready' : ''} ${heading.isVisible ? 'animate' : ''}`}
        >
          <span className="text-sm text-primary uppercase tracking-widest font-semibold">Deine Erfolgsreise</span>
          <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide mt-4">
            4 Schritte zu <span className="text-primary">deinem Ergebnis</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">

          {/* === SVG-Overlay: durchgehender Pfad === */}
          {pathData && (
            <svg
              className="absolute inset-0 pointer-events-none z-0"
              width={containerSize.w}
              height={containerSize.h}
              fill="none"
            >
              <defs>
                <linearGradient id="tl-grad" x1="0" y1="0" x2="0" y2={containerSize.h} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--primary)" />
                </linearGradient>
              </defs>

              {/* Dim Track */}
              <path
                d={pathData}
                stroke="var(--primary)"
                strokeOpacity={0.08}
                strokeWidth={2}
                strokeLinecap="round"
                pathLength={100}
              />

              {/* Fill — direkt via ref manipuliert, keine CSS-Transition */}
              <path
                ref={fillPathRef}
                d={pathData}
                stroke="url(#tl-grad)"
                strokeWidth={2.5}
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray={100}
                strokeDashoffset={100}
              />

              {/* Leuchtpunkt — direkt via ref positioniert */}
              <circle
                ref={tipRef}
                cx={0}
                cy={0}
                r={5}
                fill="var(--accent)"
                opacity={0}
                style={{ filter: 'drop-shadow(0 0 6px var(--accent)) drop-shadow(0 0 14px rgba(255,181,79,0.4))' }}
              />
            </svg>
          )}

          {/* === DESKTOP Steps (alternierend) === */}
          <div className="hidden md:flex flex-col gap-24">
            {steps.map((step, i) => {
              const active = activeSteps[i]
              const isEven = i % 2 === 0
              return (
                <div key={i} className="grid grid-cols-[1fr_auto_1fr] items-center gap-10">
                  <div className={isEven ? 'text-right' : ''}>
                    {isEven && <StepCard step={step} active={active} direction="right" />}
                  </div>

                  <MilestoneDot
                    step={step}
                    active={active}
                    dotRef={(el) => { desktopDotRefs.current[i] = el }}
                  />

                  <div>
                    {!isEven && <StepCard step={step} active={active} direction="left" />}
                  </div>
                </div>
              )
            })}
          </div>

          {/* === MOBILE Steps (vertikal links) === */}
          <div className="md:hidden flex flex-col gap-14">
            {steps.map((step, i) => {
              const active = activeSteps[i]
              return (
                <div key={i} className="relative flex items-start gap-5">
                  <MilestoneDot
                    step={step}
                    active={active}
                    size="sm"
                    dotRef={(el) => { mobileDotRefs.current[i] = el }}
                  />
                  <div className="flex-1 pt-1">
                    <StepCard step={step} active={active} direction="up" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Soft CTA */}
        <div className="mt-14 text-center">
          <a href="https://wa.me/4915679610457" target="_blank" rel="noopener noreferrer" className="btn-outline">
            Fragen? Wir antworten auf WhatsApp
          </a>
          <p className="text-xs text-muted-foreground mt-3">Schnell, unkompliziert — wir melden uns</p>
        </div>
      </div>
    </section>
  )
}

/* ─── Sub-Komponenten ─── */

function MilestoneDot({ step, active, size = 'md', dotRef }: {
  step: (typeof steps)[number]
  active: boolean
  size?: 'sm' | 'md'
  dotRef?: (el: HTMLDivElement | null) => void
}) {
  const px = size === 'sm' ? 'w-[2.875rem] h-[2.875rem]' : 'w-14 h-14'
  const iconPx = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'
  return (
    <div className="relative z-10 shrink-0">
      <div
        ref={dotRef}
        className={`${px} rounded-full flex items-center justify-center border-2 transition-all duration-700 ease-out ${
          active
            ? 'border-accent/50 bg-card shadow-[0_0_20px_rgba(255,181,79,0.2)]'
            : 'border-primary/15 bg-card'
        }`}
      >
        <step.icon
          className={`${iconPx} transition-colors duration-700 ${
            active ? 'text-accent' : 'text-muted-foreground/60'
          }`}
        />
      </div>
      <span
        className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all duration-500 ${
          active
            ? 'bg-accent text-background scale-100'
            : 'bg-muted text-muted-foreground scale-90'
        }`}
      >
        {step.step}
      </span>
    </div>
  )
}

function StepCard({ step, active, direction }: {
  step: (typeof steps)[number]
  active: boolean
  direction: 'left' | 'right' | 'up'
}) {
  const slideClass =
    direction === 'left'  ? 'translate-x-8'  :
    direction === 'right' ? '-translate-x-8' :
    'translate-y-5'

  const alignClass = direction === 'right' ? 'ml-auto text-right' : ''

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        active
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${slideClass}`
      }`}
    >
      <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-foreground">
        {step.title}
      </h3>
      <p className={`text-muted-foreground text-sm leading-relaxed max-w-xs ${alignClass}`}>
        {step.description}
      </p>
    </div>
  )
}
