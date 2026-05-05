'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight, ArrowLeft, Loader2, CheckCircle2, Calendar as CalendarIcon,
  AlertCircle, ShieldCheck, Target, RefreshCw, Pizza, Clock, Frown, MessageSquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { openLiveChat } from '@/lib/livechat'
import { track } from '@vercel/analytics'

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

const PROBLEM_OPTIONS: { value: string; label: string; icon: typeof RefreshCw }[] = [
  { value: 'jojo', label: 'Jo-Jo-Effekt', icon: RefreshCw },
  { value: 'hunger', label: 'Heißhunger', icon: Pizza },
  { value: 'zeit', label: 'Zeitmangel', icon: Clock },
  { value: 'motivation', label: 'Motivation', icon: Frown },
]

const TIME_OPTIONS: { value: TimeSel; label: string }[] = [
  { value: 'wenig', label: '1–2× / Woche' },
  { value: 'mittel', label: '3–4× / Woche' },
  { value: 'viel', label: '5+× / Woche' },
]

const TOTAL_STEPS = 6

function getMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startPad = (firstDay.getDay() + 6) % 7
  const grid: (Date | null)[] = []
  for (let i = 0; i < startPad; i++) grid.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) grid.push(new Date(year, month, d))
  while (grid.length % 7 !== 0) grid.push(null)
  return grid
}

function toLocalDateKey(isoStr: string): string {
  const d = new Date(isoStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function formatTime(isoStr: string): string {
  return new Date(isoStr).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

function formatDateLong(dateKey: string): string {
  const d = new Date(dateKey + 'T12:00:00')
  return d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })
}

function formatDateShort(isoStr: string): string {
  const d = new Date(isoStr)
  return d.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'long' })
}

export function HeroBookingForm() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<QuizData>({
    goal: '', height: 0, weight: 0, targetWeight: 0, problems: [], time: '',
  })
  const [contact, setContact] = useState<ContactData>({
    firstName: '', lastName: '', email: '', mobilephone: '',
    gender: '', dateOfBirth: '',
    street: '', houseNumber: '', zip: '', city: '',
    marketingConsent: false, note: '',
  })

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
  const autoAdvance = (fn: () => void) => { fn(); setTimeout(next, 300) }

  const selectGoal = (goal: Goal) => {
    track('hero_form_goal', { goal })
    autoAdvance(() => setData(d => ({ ...d, goal })))
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
    autoAdvance(() => setData(d => ({ ...d, time })))
  }

  // Slots laden bei Schritt 5
  useEffect(() => {
    if (step !== 5) return
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

  const canNext =
    (step === 2 && measuresValid) ||
    (step === 3 && data.problems.length > 0) ||
    (step === 5 && !!selectedSlot)

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
          <p className="text-xs font-semibold text-foreground">Probetraining buchen</p>
          <p className="text-[11px] text-muted-foreground">Kostenlos · Unverbindlich</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-semibold text-primary uppercase tracking-wider">
          <ShieldCheck className="w-3 h-3" /> § 20 SGB V
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

      <div className="min-h-[280px] flex flex-col">
        {/* Step 1: Ziel */}
        {step === 1 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold">Was möchtest du erreichen?</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {GOAL_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => selectGoal(opt.value)}
                  className={cn(
                    'px-3 py-3 rounded-xl border text-sm font-medium transition-all duration-200 text-center',
                    data.goal === opt.value
                      ? 'border-primary bg-primary/15 text-primary shadow-md shadow-primary/15'
                      : 'border-border bg-background/50 hover:border-primary/60 hover:bg-primary/5',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Maße */}
        {step === 2 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold mb-1">Deine Werte</p>
            <p className="text-xs text-muted-foreground mb-2">Damit wir dein Training individuell ausrichten.</p>
            <NumberField label="Größe (cm)" value={data.height} onChange={v => setData(d => ({ ...d, height: v }))} min={130} max={220} placeholder="175" />
            <NumberField label="Aktuelles Gewicht (kg)" value={data.weight} onChange={v => setData(d => ({ ...d, weight: v }))} min={40} max={250} placeholder="80" />
            <NumberField label="Wunschgewicht (kg)" value={data.targetWeight} onChange={v => setData(d => ({ ...d, targetWeight: v }))} min={40} max={250} placeholder="72" />
          </div>
        )}

        {/* Step 3: Probleme */}
        {step === 3 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold mb-1">Was hat bisher nicht geklappt?</p>
            <p className="text-xs text-muted-foreground mb-2">Mehrfachauswahl möglich.</p>
            <div className="grid grid-cols-2 gap-2">
              {PROBLEM_OPTIONS.map(opt => {
                const Icon = opt.icon
                const active = data.problems.includes(opt.value)
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleProblem(opt.value)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-3 rounded-xl border text-sm font-medium transition-all duration-200 text-left',
                      active
                        ? 'border-primary bg-primary/15 text-primary shadow-md shadow-primary/15'
                        : 'border-border bg-background/50 hover:border-primary/60 hover:bg-primary/5',
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{opt.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 4: Zeit */}
        {step === 4 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold">Wie viel Zeit hast du?</p>
            </div>
            <p className="text-xs text-muted-foreground mb-2">Hilft uns, deinen Plan realistisch zu gestalten.</p>
            <div className="flex flex-col gap-2">
              {TIME_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => selectTime(opt.value)}
                  className={cn(
                    'px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 text-left',
                    data.time === opt.value
                      ? 'border-primary bg-primary/15 text-primary shadow-md shadow-primary/15'
                      : 'border-border bg-background/50 hover:border-primary/60 hover:bg-primary/5',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Termin */}
        {step === 5 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <CalendarIcon className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold">Wähle deinen Termin</p>
            </div>

            {slotsLoading && (
              <div className="flex flex-col items-center gap-3 py-10">
                <Loader2 className="w-7 h-7 text-primary animate-spin" />
                <p className="text-xs text-muted-foreground">Termine werden geladen…</p>
              </div>
            )}

            {slotsError && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-destructive">Termine konnten nicht geladen werden</p>
                  <button type="button" onClick={() => openLiveChat()} className="text-xs font-semibold text-accent hover:underline mt-1">Per Live-Chat buchen →</button>
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
                  {/* Monats-Navi */}
                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <button
                      type="button"
                      onClick={() => setCalendarMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                      className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                      aria-label="Vorheriger Monat"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-semibold capitalize">{monthName}</span>
                    <button
                      type="button"
                      onClick={() => setCalendarMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                      className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                      aria-label="Nächster Monat"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Wochentage */}
                  <div className="grid grid-cols-7 px-2 pt-2">
                    {['Mo','Di','Mi','Do','Fr','Sa','So'].map(d => (
                      <div key={d} className="text-center text-[10px] text-muted-foreground/60 font-medium py-1">{d}</div>
                    ))}
                  </div>

                  {/* Tage */}
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
                              'w-8 h-8 rounded-full text-xs font-medium transition-all flex items-center justify-center',
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

                  {/* Slots für Tag */}
                  {selectedDate && (
                    <div className="border-t border-border p-3 max-h-[150px] overflow-y-auto">
                      <p className="text-[11px] font-semibold mb-2">{formatDateLong(selectedDate)}</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {slotsForSelected.map((slot, i) => {
                          const isActive = selectedSlot?.startDateTime === slot.startDateTime
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={cn(
                                'p-1.5 rounded-md border text-[11px] font-semibold transition-all',
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
              <p className="text-xs text-muted-foreground text-center py-4">Aktuell keine freien Termine.</p>
            )}
          </div>
        )}

        {/* Step 6: Kontakt */}
        {step === 6 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold mb-1">Deine Daten</p>
            {selectedSlot && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/20 text-xs mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
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
                    'p-2.5 rounded-lg border text-xs font-medium transition-all',
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
              <p className="text-[10px] font-medium text-muted-foreground/70 mb-1.5">Geburtsdatum *</p>
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

            <label className="flex items-start gap-2 cursor-pointer select-none p-2.5 rounded-lg border border-border hover:border-primary/30 transition-colors">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={contact.marketingConsent}
                  onChange={e => setContact(c => ({ ...c, marketingConsent: e.target.checked }))}
                />
                <div className={cn(
                  'w-4 h-4 rounded border-2 flex items-center justify-center transition-all',
                  contact.marketingConsent ? 'border-primary bg-primary' : 'border-muted-foreground/40 bg-background',
                )}>
                  {contact.marketingConsent && <CheckCircle2 className="w-2.5 h-2.5 text-primary-foreground" />}
                </div>
              </div>
              <span className="text-[11px] text-muted-foreground leading-snug">
                Ich bin einverstanden, dass happyfigur mich per E-Mail und Telefon über Angebote informiert. Jederzeit widerrufbar.
              </span>
            </label>

            {bookingError && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-destructive">{bookingError}</p>
                  <button type="button" onClick={() => openLiveChat()} className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-accent hover:underline">
                    <MessageSquare className="w-3 h-3" /> Per Live-Chat buchen
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
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground px-2 py-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Zurück
          </button>
        ) : <span />}

        {step < 5 && step !== 1 && step !== 4 && (
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            className="btn-cta inline-flex items-center gap-1.5 text-xs px-4 py-2.5 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Weiter <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

        {step === 5 && (
          <button
            type="button"
            onClick={next}
            disabled={!selectedSlot}
            className="btn-cta inline-flex items-center gap-1.5 text-xs px-4 py-2.5 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Weiter <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

        {step === 6 && (
          <button
            type="button"
            onClick={submitBooking}
            disabled={!contactValid || isBooking}
            className="btn-cta inline-flex items-center gap-1.5 text-xs px-4 py-2.5 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isBooking ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Buche…</>
            ) : (
              <>Termin buchen <ArrowRight className="w-3.5 h-3.5" /></>
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
      <span className="text-[10px] font-medium text-muted-foreground/80 uppercase tracking-wider">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        placeholder={placeholder}
        value={value || ''}
        onChange={e => onChange(parseInt(e.target.value) || 0)}
        className="px-3 py-2.5 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm"
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
        className="peer w-full px-3 pt-5 pb-2 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm"
      />
      <label className="absolute left-3 top-2 text-[10px] font-medium text-muted-foreground/70 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary pointer-events-none">
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

  const selectClass = 'w-full px-2 py-2.5 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm appearance-none cursor-pointer'

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
