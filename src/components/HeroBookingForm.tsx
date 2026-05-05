'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight, ArrowLeft, Loader2, CheckCircle2, Calendar as CalendarIcon,
  AlertCircle, ShieldCheck, Target, Clock, MessageSquare, Sparkles,
  BarChart2, Utensils, Dumbbell,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { openLiveChat } from '@/lib/livechat'
import { track } from '@vercel/analytics'
import {
  INSURANCE_VALUES, TOP_INSURANCE, ALL_INSURANCE,
  PROBLEM_EXPLANATIONS, GOAL_LABELS, TIME_LABELS,
} from '@/lib/insurance'
import {
  calcResult, getMonthGrid, toLocalDateKey, formatTime, formatDateLong,
  formatDateShort,
} from '@/lib/quizResult'

type Goal = 'abnehmen' | 'straffen' | 'energie' | 'gesundheit'
type TimeSel = 'wenig' | 'mittel' | 'viel'
type Slot = { startDateTime: string; endDateTime: string }

interface QuizData {
  goal: Goal | ''
  height: number
  weight: number
  targetWeight: number
  problems: string[]
  time: TimeSel | ''
  insurance: string
  insuranceAmount: number
}

interface ContactData {
  firstName: string
  lastName: string
  email: string
  mobilephone: string
  gender: 'MALE' | 'FEMALE' | ''
  dateOfBirth: string
  street: string
  houseNumber: string
  zip: string
  city: string
  marketingConsent: boolean
  note: string
}

const GOAL_OPTIONS: { value: Goal; label: string }[] = [
  { value: 'abnehmen', label: 'Abnehmen' },
  { value: 'straffen', label: 'Straffen' },
  { value: 'energie', label: 'Mehr Energie' },
  { value: 'gesundheit', label: 'Gesundheit' },
]

const PROBLEM_OPTIONS: { value: string; label: string }[] = [
  { value: 'jojo', label: 'Jo-Jo-Effekt' },
  { value: 'hunger', label: 'Heißhunger' },
  { value: 'zeit', label: 'Zeitmangel' },
  { value: 'motivation', label: 'Motivation' },
]

const TIME_OPTIONS: { value: TimeSel; label: string }[] = [
  { value: 'wenig', label: '1–2× / Woche' },
  { value: 'mittel', label: '3–4× / Woche' },
  { value: 'viel', label: '5+× / Woche' },
]

const TOTAL_STEPS = 8

export function HeroBookingForm() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<QuizData>({
    goal: '', height: 0, weight: 0, targetWeight: 0,
    problems: [], time: '', insurance: '', insuranceAmount: 0,
  })
  const [contact, setContact] = useState<ContactData>({
    firstName: '', lastName: '', email: '', mobilephone: '',
    gender: '', dateOfBirth: '',
    street: '', houseNumber: '', zip: '', city: '',
    marketingConsent: false, note: '',
  })

  const [showAllInsurance, setShowAllInsurance] = useState(false)

  const [slots, setSlots] = useState<Slot[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState<string | null>(null)
  const [calendarMonth, setCalendarMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

  const [isBooking, setIsBooking] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const next = () => {
    track('hero_form_step', { step: step + 1 })
    setStep(s => Math.min(s + 1, TOTAL_STEPS))
  }
  const back = () => setStep(s => Math.max(s - 1, 1))
  const autoAdvance = (delay: number, fn: () => void) => {
    fn()
    setTimeout(next, delay)
  }

  const selectGoal = (goal: Goal) => {
    track('hero_form_goal', { goal })
    autoAdvance(500, () => setData(d => ({ ...d, goal })))
  }
  const toggleProblem = (problem: string) => {
    setData(d => ({
      ...d,
      problems: d.problems.includes(problem)
        ? d.problems.filter(p => p !== problem)
        : [...d.problems, problem],
    }))
  }
  const selectTime = (time: TimeSel) => {
    track('hero_form_time', { time })
    autoAdvance(800, () => setData(d => ({ ...d, time })))
  }
  const selectInsurance = (insurance: string) => {
    const amount = INSURANCE_VALUES[insurance] ?? 100
    track('hero_form_insurance', { insurance, amount })
    setData(d => ({ ...d, insurance, insuranceAmount: amount }))
  }

  // Slots laden bei Schritt 7 (Termin)
  useEffect(() => {
    if (step !== 7) return
    setSlotsLoading(true)
    setSlotsError(null)
    const today = new Date()
    const end = new Date(today)
    end.setDate(end.getDate() + 28)
    const fmt = (d: Date) => d.toISOString().split('T')[0]
    fetch(`/api/trialsession?startDate=${fmt(today)}&endDate=${fmt(end)}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error)
        setSlots(d.slots || [])
        if (d.slots?.length > 0) {
          const first = new Date(d.slots[0].startDateTime)
          setCalendarMonth(new Date(first.getFullYear(), first.getMonth(), 1))
        }
      })
      .catch(e => setSlotsError(e.message || 'Termine konnten nicht geladen werden'))
      .finally(() => setSlotsLoading(false))
  }, [step])

  const slotsByDate = useMemo(() => {
    const map: Record<string, Slot[]> = {}
    for (const slot of slots) {
      const key = toLocalDateKey(slot.startDateTime)
      map[key] = [...(map[key] || []), slot]
    }
    return map
  }, [slots])

  // Realistisches Ergebnis aus den eingegebenen Maßen — gleiche Logik wie im Quiz
  const projectedResult = useMemo(
    () => calcResult({
      goal: data.goal || '',
      height: data.height,
      weight: data.weight,
      targetWeight: data.targetWeight,
      problems: data.problems,
      time: data.time || 'mittel',
      commitment: 'bereit',
    }),
    [data.goal, data.height, data.weight, data.targetWeight, data.problems, data.time],
  )

  const submitBooking = async () => {
    if (!selectedSlot) return
    setIsBooking(true)
    setBookingError(null)
    try {
      const res = await fetch('/api/trialsession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          mobilephone: contact.mobilephone,
          gender: contact.gender,
          dateOfBirth: contact.dateOfBirth,
          street: contact.street,
          houseNumber: contact.houseNumber,
          zip: contact.zip,
          city: contact.city,
          marketingConsent: contact.marketingConsent,
          note: contact.note,
          startDateTime: selectedSlot.startDateTime,
          quizData: {
            goal: data.goal,
            height: data.height,
            weight: data.weight,
            targetWeight: data.targetWeight,
            problems: data.problems,
            time: data.time,
            commitment: 'bereit',
            insurance: data.insurance,
            insuranceAmount: data.insuranceAmount,
          },
        }),
      })
      const result = await res.json()
      if (!res.ok || result.error) {
        const detail = result.details ? ` — ${result.details}` : ''
        setBookingError((result.error || 'Buchung fehlgeschlagen') + detail)
      } else {
        setBookingSuccess(true)
        track('hero_form_booking_success', {
          goal: data.goal,
          time: data.time,
          insurance: data.insurance,
          problems: data.problems.join(','),
        })
        setStep(TOTAL_STEPS)
      }
    } catch {
      setBookingError('Verbindungsfehler. Bitte versuche es erneut.')
    } finally {
      setIsBooking(false)
    }
  }

  const contactValid =
    contact.firstName.trim().length > 1 &&
    contact.lastName.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) &&
    contact.mobilephone.trim().length > 6 &&
    contact.gender !== '' &&
    /^\d{4}-\d{2}-\d{2}$/.test(contact.dateOfBirth) &&
    contact.street.trim().length > 1 &&
    contact.houseNumber.trim().length > 0 &&
    contact.zip.trim().length >= 4 &&
    contact.city.trim().length > 1

  const measuresValid =
    data.height >= 130 && data.height <= 220 &&
    data.weight >= 40 && data.weight <= 250 &&
    data.targetWeight >= 40 && data.targetWeight <= 250

  // Erfolgsschritt
  if (bookingSuccess) {
    return (
      <aside className="card-form bg-card/95 border border-primary/30 rounded-2xl p-6 md:p-7 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold mb-1">Termin gebucht!</p>
            <p className="text-sm text-muted-foreground">
              {selectedSlot && (
                <>{formatDateShort(selectedSlot.startDateTime)} · {formatTime(selectedSlot.startDateTime)} Uhr</>
              )}
            </p>
          </div>
          <p className="text-xs text-muted-foreground max-w-xs">
            Wir freuen uns auf dich. Du erhältst eine Bestätigung per E-Mail.
          </p>
        </div>
      </aside>
    )
  }

  return (
    <aside
      id="hero-form"
      aria-label="Probetraining buchen"
      className="card-form bg-card/95 border border-border rounded-2xl p-5 md:p-6 backdrop-blur-md shadow-2xl"
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-foreground">Probetraining buchen</p>
          <p className="text-xs text-muted-foreground">Kostenlos · Unverbindlich</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" /> § 20 SGB V
        </span>
      </header>

      {/* Progress */}
      <div className="flex items-center gap-1 mb-5" aria-hidden="true">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <span
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              i + 1 <= step ? 'bg-primary' : 'bg-border',
            )}
          />
        ))}
      </div>

      <div className="min-h-[300px] flex flex-col">
        {/* Step 1: Ziel */}
        {step === 1 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-5 h-5 text-primary" />
              <p className="text-base font-semibold">Was möchtest du erreichen?</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {GOAL_OPTIONS.map(opt => {
                const active = data.goal === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectGoal(opt.value)}
                    className={cn(
                      'relative px-3 py-3.5 rounded-xl border text-base font-medium transition-all duration-200 text-center',
                      active
                        ? 'border-primary bg-primary/15 text-primary shadow-md shadow-primary/20'
                        : 'border-border bg-background/50 hover:border-primary/60 hover:bg-primary/5',
                    )}
                  >
                    {active && (
                      <CheckCircle2 className="absolute top-1.5 right-1.5 w-4 h-4 text-primary animate-fade-up" />
                    )}
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 2: Maße */}
        {step === 2 && (
          <div className="flex flex-col gap-3">
            <p className="text-base font-semibold mb-1">Deine Werte</p>
            <p className="text-sm text-muted-foreground mb-2">Damit wir dein Training individuell ausrichten.</p>
            <NumberField label="Größe (cm)" value={data.height} onChange={v => setData(d => ({ ...d, height: v }))} min={130} max={220} placeholder="175" />
            <NumberField label="Aktuelles Gewicht (kg)" value={data.weight} onChange={v => setData(d => ({ ...d, weight: v }))} min={40} max={250} placeholder="80" />
            <NumberField label="Wunschgewicht (kg)" value={data.targetWeight} onChange={v => setData(d => ({ ...d, targetWeight: v }))} min={40} max={250} placeholder="72" />

            {/* Inline-Reinforcement: realistisches Ziel */}
            {measuresValid && projectedResult.kgLoss > 0 && (
              <div className="mt-1 p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-start gap-2 animate-fade-up">
                <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-snug">
                  Realistisch in 8 Wochen: <span className="font-bold text-primary">-{projectedResult.kgLoss} kg</span>
                  {projectedResult.projectedWeight && projectedResult.projectedWeight > 0 && (
                    <> — du kommst auf <span className="font-semibold">{projectedResult.projectedWeight} kg</span></>
                  )}
                  {projectedResult.bmi !== null && (
                    <> · BMI heute: <span className="font-semibold">{projectedResult.bmi}</span></>
                  )}
                  <sup>⁴</sup>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Probleme */}
        {step === 3 && (
          <div className="flex flex-col gap-3">
            <p className="text-base font-semibold mb-1">Was hat bisher nicht geklappt?</p>
            <p className="text-sm text-muted-foreground mb-2">Mehrfachauswahl möglich.</p>
            <div className="grid grid-cols-2 gap-2.5">
              {PROBLEM_OPTIONS.map(opt => {
                const explanation = PROBLEM_EXPLANATIONS[opt.value]
                const Icon = explanation?.icon
                const active = data.problems.includes(opt.value)
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleProblem(opt.value)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 text-left',
                      active
                        ? 'border-primary bg-primary/15 text-primary shadow-md shadow-primary/15'
                        : 'border-border bg-background/50 hover:border-primary/60 hover:bg-primary/5',
                    )}
                  >
                    {Icon && <Icon className="w-4 h-4 shrink-0" />}
                    <span>{opt.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Inline-Reinforcement: Lösungen für gewählte Probleme */}
            {data.problems.length > 0 && (
              <div className="mt-2 flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Darum klappt&apos;s diesmal</p>
                {data.problems.map(key => {
                  const item = PROBLEM_EXPLANATIONS[key]
                  if (!item) return null
                  const Icon = item.icon
                  return (
                    <div key={key} className="p-3 rounded-lg border border-primary/20 bg-primary/5 flex items-start gap-2 animate-fade-up">
                      <Icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground leading-snug">
                        <span className="font-semibold">{item.problem}:</span>{' '}
                        <span className="text-muted-foreground">{item.solution}</span>
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Step 4: Zeit */}
        {step === 4 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-primary" />
              <p className="text-base font-semibold">Wie viel Zeit hast du?</p>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Hilft uns, deinen Plan realistisch zu gestalten.</p>
            <div className="flex flex-col gap-2">
              {TIME_OPTIONS.map(opt => {
                const active = data.time === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectTime(opt.value)}
                    className={cn(
                      'relative px-4 py-3.5 rounded-xl border text-base font-medium transition-all duration-200 text-left',
                      active
                        ? 'border-primary bg-primary/15 text-primary shadow-md shadow-primary/15'
                        : 'border-border bg-background/50 hover:border-primary/60 hover:bg-primary/5',
                    )}
                  >
                    {active && (
                      <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-primary animate-fade-up" />
                    )}
                    {opt.label}
                  </button>
                )
              })}
            </div>

            {/* Inline-Reinforcement: Confirm-Flash */}
            {data.time && (
              <div className="mt-1 p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-start gap-2 animate-fade-up">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-snug">
                  <span className="font-semibold">Reicht völlig aus.</span>{' '}
                  <span className="text-muted-foreground">2× 30 Min sind das Maximum, was du brauchst — Quality over Quantity.</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Krankenkasse */}
        {step === 5 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 text-primary text-center font-bold text-sm leading-5">€</span>
              <p className="text-base font-semibold">Was zahlst du wirklich?</p>
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              Spoiler: Für viele ist es komplett kostenlos.<sup>²³</sup>
            </p>

            {/* Preis-Reveal */}
            <div className="text-center py-1">
              <span className="inline-block text-2xl font-bold text-muted-foreground/40 line-through">179€<sup>¹</sup></span>
            </div>

            {/* Top-5 KK-Tiles */}
            <div className="grid grid-cols-2 gap-2">
              {TOP_INSURANCE.map(ins => {
                const active = data.insurance === ins.value
                return (
                  <button
                    key={ins.value}
                    type="button"
                    onClick={() => selectInsurance(ins.value)}
                    className={cn(
                      'p-2.5 rounded-lg border text-left transition-all duration-200',
                      active ? 'border-primary bg-primary/15 shadow-md shadow-primary/15' : 'border-border bg-background/50 hover:border-primary/60',
                    )}
                  >
                    <div className="text-xs font-semibold leading-tight">{ins.label}</div>
                    <div className={cn('text-base font-bold mt-1', ins.amount >= 179 ? 'text-primary' : 'text-foreground')}>
                      {ins.amount >= 179 ? '✓ Gratis' : `${ins.amount}€`}
                    </div>
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowAllInsurance(v => !v)}
              className="text-sm text-muted-foreground hover:text-foreground underline self-center"
            >
              {showAllInsurance ? 'Weniger anzeigen' : 'Andere Krankenkasse auswählen'}
            </button>
            {showAllInsurance && (
              <select
                value={data.insurance}
                onChange={e => selectInsurance(e.target.value)}
                aria-label="Krankenkasse auswählen"
                className="w-full p-2.5 rounded-lg bg-background border border-border text-foreground cursor-pointer text-sm"
              >
                <option value="">— Alle Krankenkassen —</option>
                {ALL_INSURANCE.map(ins => (
                  <option key={ins.value} value={ins.value}>{ins.label}</option>
                ))}
              </select>
            )}

            {/* Sofortige Reaktions-Karte */}
            {data.insuranceAmount > 0 ? (
              <div className="p-3 bg-background/60 border border-primary/30 rounded-lg text-center animate-fade-up">
                {data.insuranceAmount >= 179 ? (
                  <>
                    <div className="text-xl font-bold text-primary">🎯 Komplett kostenlos<sup>²</sup></div>
                    <p className="text-sm text-muted-foreground mt-1">Deine Kasse erstattet die vollen 179€.<sup>³</sup></p>
                  </>
                ) : (
                  <>
                    <div className="text-xl font-bold text-accent">
                      Nur {((179 - data.insuranceAmount) / 56).toFixed(2)}€/Tag<sup>¹³</sup>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Erstattung {data.insuranceAmount}€ von 179€<sup>³</sup> · weniger als ein Kaffee pro Tag
                    </p>
                  </>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center mt-1">
                Bitte wähle deine Krankenkasse, um fortzufahren.
              </p>
            )}
          </div>
        )}

        {/* Step 6: Recap — "Dein Plan auf einen Blick" */}
        {step === 6 && (
          <div className="flex flex-col gap-3">
            <div className="text-center mb-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Dein 8-Wochen-Plan</p>
              <p className="text-lg font-bold leading-tight">
                {data.goal === 'abnehmen' && 'Abnehmen mit System statt Diät'}
                {data.goal === 'straffen' && 'Körper straffen & Muskeln aufbauen'}
                {data.goal === 'energie' && 'Mehr Energie für deinen Alltag'}
                {data.goal === 'gesundheit' && 'Nachhaltig gesünder leben'}
                {!data.goal && 'Dein 8-Wochen-Plan steht'}
              </p>
            </div>

            {/* 3 Säulen */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-lg border border-border bg-background/40 text-center">
                <BarChart2 className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-xs font-semibold leading-tight">Körperanalyse</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-tight">Stoffwechsel verstehen</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-background/40 text-center">
                <Dumbbell className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-xs font-semibold leading-tight">Training</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-tight">2× 30 Min/Woche</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-background/40 text-center">
                <Utensils className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-xs font-semibold leading-tight">Ernährung</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-tight">Plan auf dich</p>
              </div>
            </div>

            {/* Realistisches Ergebnis */}
            {projectedResult.kgLoss > 0 && (
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-center">
                <p className="text-xs uppercase tracking-wider text-primary font-semibold">Realistisch in 8 Wochen<sup>⁴</sup></p>
                <p className="text-2xl font-bold text-primary mt-1">
                  {data.goal === 'straffen'
                    ? `-${projectedResult.fatLoss}% Körperfett`
                    : data.goal === 'energie'
                    ? `+${projectedResult.energyPct}% Energie`
                    : `-${projectedResult.kgLoss} kg`}
                </p>
              </div>
            )}

            {/* Recap-Strip */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 p-3 rounded-lg border border-border bg-background/30 text-sm">
              {data.goal && (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Target className="w-3.5 h-3.5 text-primary" />
                  {GOAL_LABELS[data.goal]}
                </span>
              )}
              {data.time && (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {TIME_LABELS[data.time]}
                </span>
              )}
              {data.insuranceAmount > 0 && (
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 text-primary text-center font-bold text-xs leading-[14px]">€</span>
                  {data.insuranceAmount >= 179 ? (
                    <span className="text-primary font-semibold">Kostenlos</span>
                  ) : (
                    <span className="text-foreground">{((179 - data.insuranceAmount) / 56).toFixed(2)}€/Tag</span>
                  )}
                </span>
              )}
            </div>

            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary self-center">
              <ShieldCheck className="w-3.5 h-3.5" /> § 20 SGB V zertifiziert
            </div>
          </div>
        )}

        {/* Step 7: Termin */}
        {step === 7 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <p className="text-base font-semibold">Wähle deinen Termin</p>
            </div>

            {/* Recap-Chip-Strip */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              {data.goal && (
                <span className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-primary" /> {GOAL_LABELS[data.goal]}
                </span>
              )}
              {data.time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" /> {TIME_LABELS[data.time]}
                </span>
              )}
              {data.insuranceAmount > 0 && (
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 text-primary text-center font-bold text-xs leading-[14px]">€</span>
                  {data.insuranceAmount >= 179 ? (
                    <span className="text-primary font-semibold">Kostenlos</span>
                  ) : (
                    `${((179 - data.insuranceAmount) / 56).toFixed(2)}€/Tag`
                  )}
                </span>
              )}
            </div>

            {slotsLoading && (
              <div className="flex flex-col items-center gap-3 py-10">
                <Loader2 className="w-7 h-7 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Termine werden geladen…</p>
              </div>
            )}

            {slotsError && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-destructive">Termine konnten nicht geladen werden</p>
                  <button type="button" onClick={() => openLiveChat()} className="text-sm font-semibold text-accent hover:underline mt-1">Per Live-Chat buchen →</button>
                </div>
              </div>
            )}

            {!slotsLoading && !slotsError && slots.length > 0 && (() => {
              const year = calendarMonth.getFullYear()
              const month = calendarMonth.getMonth()
              const grid = getMonthGrid(year, month)
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              const monthName = calendarMonth.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
              const slotsForSelected = selectedDate ? (slotsByDate[selectedDate] || []) : []

              return (
                <div className="border border-border rounded-xl overflow-hidden bg-background/40">
                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <button
                      type="button"
                      onClick={() => setCalendarMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      aria-label="Vorheriger Monat"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-semibold capitalize">{monthName}</span>
                    <button
                      type="button"
                      onClick={() => setCalendarMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      aria-label="Nächster Monat"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 px-2 pt-2">
                    {['Mo','Di','Mi','Do','Fr','Sa','So'].map(d => (
                      <div key={d} className="text-center text-xs text-muted-foreground/60 font-medium py-1">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 px-2 pb-2">
                    {grid.map((date, i) => {
                      if (!date) return <div key={i} />
                      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                      const hasSlots = !!slotsByDate[key]
                      const isPast = date < today
                      const isSelected = selectedDate === key
                      return (
                        <div key={i} className="flex items-center justify-center py-0.5">
                          <button
                            type="button"
                            disabled={!hasSlots || isPast}
                            onClick={() => { setSelectedDate(key); setSelectedSlot(null) }}
                            className={cn(
                              'w-9 h-9 rounded-full text-sm font-medium transition-all flex items-center justify-center',
                              isPast || !hasSlots ? 'text-muted-foreground/25 cursor-not-allowed' : '',
                              hasSlots && !isPast && !isSelected ? 'text-foreground hover:bg-primary/15 cursor-pointer' : '',
                              isSelected ? 'bg-primary text-primary-foreground font-bold shadow-md shadow-primary/30' : '',
                            )}
                          >
                            {date.getDate()}
                          </button>
                        </div>
                      )
                    })}
                  </div>

                  {selectedDate && (
                    <div className="border-t border-border p-3 max-h-[170px] overflow-y-auto">
                      <p className="text-sm font-semibold mb-2">{formatDateLong(selectedDate)}</p>
                      <div className="grid grid-cols-3 gap-2">
                        {slotsForSelected.map((slot, i) => {
                          const isActive = selectedSlot?.startDateTime === slot.startDateTime
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={cn(
                                'p-2 rounded-md border text-sm font-semibold transition-all',
                                isActive
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-border hover:border-primary text-primary bg-transparent',
                              )}
                            >
                              {formatTime(slot.startDateTime)}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}

            {!slotsLoading && !slotsError && slots.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Aktuell keine freien Termine.</p>
            )}
          </div>
        )}

        {/* Step 8: Kontakt */}
        {step === 8 && (
          <div className="flex flex-col gap-3">
            <p className="text-base font-semibold mb-1">Deine Daten</p>
            {selectedSlot && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm mb-1">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium">{formatDateShort(selectedSlot.startDateTime)} · {formatTime(selectedSlot.startDateTime)} Uhr</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <FloatField label="Vorname *" value={contact.firstName} onChange={v => setContact(c => ({ ...c, firstName: v }))} autoComplete="given-name" />
              <FloatField label="Nachname *" value={contact.lastName} onChange={v => setContact(c => ({ ...c, lastName: v }))} autoComplete="family-name" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[{ value: 'FEMALE' as const, label: '♀ Weiblich' }, { value: 'MALE' as const, label: '♂ Männlich' }].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setContact(c => ({ ...c, gender: opt.value }))}
                  className={cn(
                    'p-3 rounded-lg border text-sm font-medium transition-all',
                    contact.gender === opt.value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background hover:border-primary/50 text-muted-foreground',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground/80 mb-1.5">Geburtsdatum *</p>
              <DateOfBirthInput value={contact.dateOfBirth} onChange={v => setContact(c => ({ ...c, dateOfBirth: v }))} />
            </div>

            <FloatField label="Handynummer *" type="tel" value={contact.mobilephone} onChange={v => setContact(c => ({ ...c, mobilephone: v }))} autoComplete="tel" />
            <FloatField label="E-Mail *" type="email" value={contact.email} onChange={v => setContact(c => ({ ...c, email: v }))} autoComplete="email" />

            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-3"><FloatField label="Straße *" value={contact.street} onChange={v => setContact(c => ({ ...c, street: v }))} autoComplete="address-line1" /></div>
              <FloatField label="Nr. *" value={contact.houseNumber} onChange={v => setContact(c => ({ ...c, houseNumber: v }))} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <FloatField label="PLZ *" value={contact.zip} onChange={v => setContact(c => ({ ...c, zip: v }))} autoComplete="postal-code" />
              <div className="col-span-2"><FloatField label="Stadt *" value={contact.city} onChange={v => setContact(c => ({ ...c, city: v }))} autoComplete="address-level2" /></div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer select-none p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={contact.marketingConsent}
                  onChange={e => setContact(c => ({ ...c, marketingConsent: e.target.checked }))}
                />
                <div className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
                  contact.marketingConsent ? 'border-primary bg-primary' : 'border-muted-foreground/40 bg-background',
                )}>
                  {contact.marketingConsent && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                </div>
              </div>
              <span className="text-xs text-muted-foreground leading-snug">
                Ich bin einverstanden, dass happyfigur mich per E-Mail und Telefon über Angebote informiert. Jederzeit widerrufbar.
              </span>
            </label>

            {bookingError && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-destructive">{bookingError}</p>
                  <button type="button" onClick={() => openLiveChat()} className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-accent hover:underline">
                    <MessageSquare className="w-3.5 h-3.5" /> Per Live-Chat buchen
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between gap-2 mt-5 pt-4 border-t border-border">
        {step > 1 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground px-2 py-2"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück
          </button>
        ) : <span />}

        {step === 2 && (
          <button type="button" onClick={next} disabled={!measuresValid}
            className={cn(
              'inline-flex items-center gap-1.5 text-sm px-5 py-3 ml-auto rounded-xl font-semibold transition-all',
              measuresValid
                ? 'btn-cta'
                : 'bg-secondary text-muted-foreground/50 cursor-not-allowed border border-border',
            )}>
            Weiter <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {step === 3 && (
          <button type="button" onClick={next} disabled={data.problems.length === 0}
            className={cn(
              'inline-flex items-center gap-1.5 text-sm px-5 py-3 ml-auto rounded-xl font-semibold transition-all',
              data.problems.length > 0
                ? 'btn-cta'
                : 'bg-secondary text-muted-foreground/50 cursor-not-allowed border border-border',
            )}>
            Weiter <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {step === 5 && (
          <button type="button" onClick={next} disabled={!data.insurance}
            className={cn(
              'inline-flex items-center gap-1.5 text-sm px-5 py-3 ml-auto rounded-xl font-semibold transition-all',
              data.insurance
                ? 'btn-cta'
                : 'bg-secondary text-muted-foreground/50 cursor-not-allowed border border-border',
            )}>
            Weiter <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {step === 6 && (
          <button type="button" onClick={next}
            className="btn-cta inline-flex items-center gap-1.5 text-sm px-5 py-3 ml-auto rounded-xl font-semibold">
            Termin wählen <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {step === 7 && (
          <button type="button" onClick={next} disabled={!selectedSlot}
            className={cn(
              'inline-flex items-center gap-1.5 text-sm px-5 py-3 ml-auto rounded-xl font-semibold transition-all',
              selectedSlot
                ? 'btn-cta'
                : 'bg-secondary text-muted-foreground/50 cursor-not-allowed border border-border',
            )}>
            Weiter <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {step === 8 && (
          <button type="button" onClick={submitBooking} disabled={!contactValid || isBooking}
            className={cn(
              'inline-flex items-center gap-1.5 text-sm px-5 py-3 ml-auto rounded-xl font-semibold transition-all',
              contactValid && !isBooking
                ? 'btn-cta'
                : 'bg-secondary text-muted-foreground/50 cursor-not-allowed border border-border',
            )}>
            {isBooking ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Buche…</>
            ) : (
              <>Termin buchen <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        )}
      </div>
    </aside>
  )
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function NumberField({
  label, value, onChange, min, max, placeholder,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  placeholder?: string
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-muted-foreground/80 uppercase tracking-wider">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        placeholder={placeholder}
        value={value || ''}
        onChange={e => onChange(parseInt(e.target.value) || 0)}
        className="px-3 py-3 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-base"
      />
    </label>
  )
}

function FloatField({
  label, value, onChange, type = 'text', autoComplete,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder=" "
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="peer w-full px-3 pt-5 pb-2 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-base"
      />
      <label className="absolute left-3 top-1.5 text-xs font-medium text-muted-foreground/70 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary pointer-events-none">
        {label}
      </label>
    </div>
  )
}

function DateOfBirthInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const parts = value.split('-')
  const year = parts[0] || ''
  const month = parts[1] || ''
  const day = parts[2] || ''

  const setPart = (idx: 0 | 1 | 2, v: string) => {
    const padded = idx === 0 ? v : v.padStart(2, '0')
    const next = [year, month, day]
    next[idx] = padded
    onChange(`${next[0] || '2000'}-${next[1] || '01'}-${next[2] || '01'}`)
  }

  const selectClass = 'w-full px-2 py-3 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-base appearance-none cursor-pointer'

  return (
    <div className="grid grid-cols-3 gap-2">
      <select aria-label="Geburtstag" value={day ? parseInt(day) : ''} onChange={e => setPart(2, e.target.value)} className={selectClass}>
        <option value="">Tag</option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (<option key={d} value={d}>{d}</option>))}
      </select>
      <select aria-label="Geburtsmonat" value={month ? parseInt(month) : ''} onChange={e => setPart(1, e.target.value)} className={selectClass}>
        <option value="">Monat</option>
        {['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'].map((m, i) => (<option key={i} value={i + 1}>{m}</option>))}
      </select>
      <select aria-label="Geburtsjahr" value={year ? parseInt(year) : ''} onChange={e => setPart(0, e.target.value)} className={selectClass}>
        <option value="">Jahr</option>
        {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 16 - i).map(y => (<option key={y} value={y}>{y}</option>))}
      </select>
    </div>
  )
}
