'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  ArrowRight, ArrowLeft, Target, RefreshCw, Pizza, Clock, Frown,
  CheckCircle2, Flame, ThumbsUp, HelpCircle, Loader2, Calendar, User, AlertCircle,
  ShieldCheck, Utensils, BarChart2, MapPin, MessageSquare, Dumbbell
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuizData {
  goal: string
  height: number
  weight: number
  targetWeight: number
  problems: string[]
  time: string
  commitment: string
  insurance: string
  insuranceAmount: number
}

interface Slot {
  startDateTime: string
  endDateTime: string
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

// ─── Ergebnis-Kalkulation ────────────────────────────────────────────────────

function calcResult(data: QuizData) {
  const baseKg: Record<string, number> = { wenig: 4, mittel: 6, viel: 9 }
  const base = baseKg[data.time] ?? 6
  const mult: Record<string, number> = { unsicher: 0.75, bereit: 1.0, entschlossen: 1.3 }
  const factor = mult[data.commitment] ?? 1.0
  const actualDiff = data.weight > 0 && data.targetWeight > 0
    ? Math.max(0, data.weight - data.targetWeight)
    : null
  const rawLoss = Math.round(Math.min(11, Math.max(3, base * factor)))
  const kgLoss = actualDiff !== null
    ? Math.round(Math.min(actualDiff > 0 ? actualDiff : rawLoss, rawLoss))
    : rawLoss
  const bmi = data.height > 0 && data.weight > 0
    ? Math.round((data.weight / Math.pow(data.height / 100, 2)) * 10) / 10
    : null
  const projectedWeight = data.weight > 0 ? Math.round((data.weight - kgLoss) * 10) / 10 : null
  const fatMap: Record<string, number> = {
    abnehmen: Math.max(3, Math.round(kgLoss * 0.6)),
    straffen: Math.max(4, Math.round(kgLoss * 0.7)),
    energie: Math.max(2, Math.round(kgLoss * 0.4)),
    gesundheit: Math.max(2, Math.round(kgLoss * 0.4)),
  }
  const fatLoss = fatMap[data.goal] ?? 3
  const muscleMap: Record<string, number> = {
    abnehmen: 1, straffen: Math.min(4, Math.round(kgLoss * 0.35)), energie: 1, gesundheit: 2,
  }
  const muscleGain = muscleMap[data.goal] ?? 2
  const energyPct = data.commitment === 'entschlossen' ? 96 : data.commitment === 'bereit' ? 93 : 88
  const targetLabel = data.targetWeight > 0 ? ` (→ ${data.targetWeight} kg)` : ''
  const headlineMap: Record<string, string> = {
    abnehmen: `Realistisches Ziel: ${kgLoss} kg in 8 Wochen${targetLabel}`,
    straffen: `Realistisches Ziel: ${kgLoss} kg Fett weg, ${muscleGain} kg Muskeln auf`,
    energie: `Realistisches Ziel: Spürbar mehr Energie ab Woche 2`,
    gesundheit: `Realistisches Ziel: Nachhaltige Gesundheit & ${kgLoss} kg weniger`,
  }
  const headline = headlineMap[data.goal] ?? `Realistisches Ziel: ${kgLoss} kg in 8 Wochen`
  const primaryMetric: Record<string, { value: string; label: string }> = {
    abnehmen: { value: `-${kgLoss} kg`, label: 'Gewichtsverlust' },
    straffen: { value: `-${fatLoss}%`, label: 'Körperfett' },
    energie: { value: `${energyPct}%`, label: 'berichten mehr Energie' },
    gesundheit: { value: `-${kgLoss} kg`, label: 'Gewicht & Vitalität' },
  }
  const primary = primaryMetric[data.goal] ?? { value: `-${kgLoss} kg`, label: 'Gewichtsverlust' }
  const problemSolutions: Record<string, string> = {
    jojo: 'Kein Jo-Jo-Effekt – wir verändern dauerhaft deinen Stoffwechsel',
    hunger: 'Heißhunger-Attacken verschwinden – dank individuellem Ernährungsplan',
    zeit: '2× 30 Min/Woche reichen aus – Quality over Quantity',
    motivation: 'Unser Coaching hält dich auf Kurs – du bist nie allein',
  }
  const insights = data.problems.map(p => problemSolutions[p]).filter(Boolean)
  const endY = Math.round(18 + (kgLoss / 11) * 94)
  const midY = Math.round(18 + (endY - 18) * 0.52)
  const linePath = `M30,18 C60,18 75,${18 + (midY - 18) * 0.3} 110,${Math.round(18 + (midY - 18) * 0.6)} C140,${midY} 150,${midY + 5} 170,${midY + 3} C195,${midY + 8} 215,${Math.round(midY + (endY - midY) * 0.5)} 250,${Math.round(midY + (endY - midY) * 0.75)} C270,${endY - 4} 290,${endY - 1} 310,${endY}`
  const fillPath = linePath + ` L310,118 L30,118 Z`
  const endLabel = data.goal === 'straffen' ? `-${fatLoss}% Fett`
    : data.goal === 'energie' ? `+Energie`
    : projectedWeight ? `${projectedWeight} kg`
    : `-${kgLoss} kg`
  const yLabelStart = data.weight > 0 ? `${data.weight} kg` : 'Jetzt'
  const yLabelEnd = projectedWeight ? `${projectedWeight} kg` : 'Ziel'
  return { kgLoss, fatLoss, muscleGain, energyPct, headline, primary, insights, endY, midY, linePath, fillPath, endLabel, bmi, projectedWeight, yLabelStart, yLabelEnd, actualDiff }
}

// ─── Kalender-Hilfsfunktionen ─────────────────────────────────────────────────

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

function buildCalendarLink(startIso: string, endIso: string): string {
  const fmt = (s: string) => new Date(s).toISOString().replace(/[-:]/g, '').replace('.000Z', 'Z')
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Probetraining+happyfigur&dates=${fmt(startIso)}/${fmt(endIso)}&location=FIT-INN+Trier,+Im+Gartenfeld+7,+54295+Trier&details=Kostenloses+Probetraining+bei+happyfigur`
}

function buildWALink(startIso: string): string {
  const dateStr = formatDateShort(startIso)
  const time = formatTime(startIso)
  const text = encodeURIComponent(`Hallo! Ich möchte am ${dateStr} um ${time} Uhr ein kostenloses Probetraining buchen.`)
  return `https://wa.me/4915679610457?text=${text}`
}

// ─── Krankenkassen ───────────────────────────────────────────────────────────

const INSURANCE_VALUES: Record<string, number> = {
  'aok-rlp': 179, 'viactiv': 179, 'mobil': 179, 'bkk-vbu': 179, 'salus': 179,
  'aok-hessen': 150, 'ikk-sw': 150, 'vivida': 150,
  'tk': 143.20, 'big': 120, 'barmer': 100, 'sbk': 100,
  'ikk-classic': 90, 'aok-bw': 80, 'dak': 75, 'andere': 100
}

const TOP_INSURANCE = [
  { value: 'aok-rlp', label: 'AOK Rheinland-Pfalz', amount: 179 },
  { value: 'tk', label: 'Techniker (TK)', amount: 143.20 },
  { value: 'barmer', label: 'BARMER', amount: 100 },
  { value: 'dak', label: 'DAK', amount: 75 },
  { value: 'viactiv', label: 'VIACTIV', amount: 179 },
]

const ALL_INSURANCE = [
  { value: 'aok-rlp', label: 'AOK Rheinland-Pfalz (179€)' },
  { value: 'viactiv', label: 'VIACTIV (179€)' },
  { value: 'mobil', label: 'Mobil Krankenkasse (179€)' },
  { value: 'bkk-vbu', label: 'BKK VBU (179€)' },
  { value: 'salus', label: 'Salus BKK (179€)' },
  { value: 'aok-hessen', label: 'AOK Hessen / Bayern / Nordost (150€)' },
  { value: 'ikk-sw', label: 'IKK Südwest (150€)' },
  { value: 'vivida', label: 'Vivida BKK / KKH / HEK (150€)' },
  { value: 'tk', label: 'Techniker (TK) (143,20€)' },
  { value: 'big', label: 'BIG direkt (120€)' },
  { value: 'barmer', label: 'BARMER (100€)' },
  { value: 'sbk', label: 'SBK (100€)' },
  { value: 'ikk-classic', label: 'IKK classic (90€)' },
  { value: 'aok-bw', label: 'AOK Baden-Württemberg / Niedersachsen (80€)' },
  { value: 'dak', label: 'DAK (75€)' },
  { value: 'andere', label: 'Andere Krankenkasse (~100€)' },
]

const PROBLEM_EXPLANATIONS: Record<string, { icon: typeof RefreshCw; problem: string; solution: string }> = {
  jojo: { icon: RefreshCw, problem: 'Jo-Jo-Effekt nach jeder Diät', solution: 'Die Körperanalyse zeigt deinen echten Stoffwechsel. Wir arbeiten MIT deinem Körper — kein Hungern, kein Jojo.' },
  hunger: { icon: Pizza, problem: 'Heißhunger-Attacken', solution: 'Dein Ernährungsplan ist auf DICH abgestimmt. Satt essen statt verzichten — Heißhunger verschwindet erfahrungsgemäß nach 2–3 Wochen.' },
  zeit: { icon: Clock, problem: 'Zeitmangel', solution: '2x 30 Min pro Woche reichen aus. Das Programm passt in jeden Alltag — auch mit Job, Kindern, Stress.' },
  motivation: { icon: Frown, problem: 'Motivation fehlt', solution: 'Du trainierst nicht allein zu Hause. Im Studio hast du einen festen Ansprechpartner — die Körperanalyse zeigt Fortschritte, das motiviert.' },
}

// ─── Hauptkomponente ─────────────────────────────────────────────────────────

export function QuizFunnel({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(1)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showAllInsurance, setShowAllInsurance] = useState(false)
  const [data, setData] = useState<QuizData>({
    goal: '', height: 0, weight: 0, targetWeight: 0,
    problems: [], time: '', commitment: '', insurance: '', insuranceAmount: 0
  })

  // Kalender-State
  const [slots, setSlots] = useState<Slot[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState<string | null>(null)
  const [calendarMonth, setCalendarMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

  // Kontaktdaten-State
  const [contact, setContact] = useState<ContactData>({
    firstName: '', lastName: '', email: '', mobilephone: '',
    gender: '', dateOfBirth: '',
    street: '', houseNumber: '', zip: '', city: '',
    marketingConsent: false, note: ''
  })
  const [isBooking, setIsBooking] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const totalSteps = 12
  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const autoAdvance = (fn: () => void) => {
    fn()
    setTimeout(() => nextStep(), 350)
  }

  const selectGoal = (goal: string) => autoAdvance(() => setData(d => ({ ...d, goal })))
  const toggleProblem = (problem: string) => {
    setData(d => ({
      ...d,
      problems: d.problems.includes(problem)
        ? d.problems.filter(p => p !== problem)
        : [...d.problems, problem]
    }))
  }
  const selectTime = (time: string) => autoAdvance(() => setData(d => ({ ...d, time })))
  const selectCommitment = (commitment: string) => {
    setData(d => ({ ...d, commitment }))
    setIsCalculating(true)
    setTimeout(() => { setIsCalculating(false); nextStep() }, 1800)
  }
  const selectInsurance = (insurance: string) => {
    setData(d => ({ ...d, insurance, insuranceAmount: INSURANCE_VALUES[insurance] || 100 }))
  }

  // Slots laden wenn Schritt 7 erreicht wird
  useEffect(() => {
    if (step !== 10) return
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
        // Kalender-Monat auf ersten verfügbaren Monat setzen
        if (d.slots?.length > 0) {
          const first = new Date(d.slots[0].startDateTime)
          setCalendarMonth(new Date(first.getFullYear(), first.getMonth(), 1))
        }
      })
      .catch(e => setSlotsError(e.message || 'Termine konnten nicht geladen werden'))
      .finally(() => setSlotsLoading(false))
  }, [step])

  // Slots nach lokalem Datum gruppieren
  const slotsByDate = useMemo(() => {
    const map: Record<string, Slot[]> = {}
    for (const slot of slots) {
      const key = toLocalDateKey(slot.startDateTime)
      map[key] = [...(map[key] || []), slot]
    }
    return map
  }, [slots])

  // Buchung absenden
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
            commitment: data.commitment,
          },
        }),
      })
      const result = await res.json()
      if (!res.ok || result.error) {
        const detail = result.details ? ` — ${result.details}` : ''
        setBookingError((result.error || 'Buchung fehlgeschlagen') + detail)
      } else {
        setBookingSuccess(true)
        nextStep()
      }
    } catch {
      setBookingError('Verbindungsfehler. Bitte versuche es erneut.')
    } finally {
      setIsBooking(false)
    }
  }

  // Formular-Validierung
  const contactValid = contact.firstName.trim().length > 1
    && contact.lastName.trim().length > 1
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
    && contact.mobilephone.trim().length > 6
    && contact.gender !== ''
    && /^\d{4}-\d{2}-\d{2}$/.test(contact.dateOfBirth)
    && contact.street.trim().length > 1
    && contact.houseNumber.trim().length > 0
    && contact.zip.trim().length >= 4
    && contact.city.trim().length > 1

  const nextDisabled =
    (step === 2 && !(data.height >= 130 && data.weight >= 40 && data.targetWeight >= 40)) ||
    (step === 10 && !selectedSlot)
  const nextLabel = step === 4 ? 'Das klingt gut — weiter' : 'Weiter'

  // Loading Screen (nach Commitment)
  if (isCalculating) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        {/* Progress bar */}
        <div className="fixed top-0 left-0 right-0 z-10 h-1 bg-secondary">
          <div className="h-full bg-gradient-to-r from-primary to-emerald-400 quiz-progress-fill transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-6 quiz-step-enter px-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Deine Analyse wird berechnet…</h3>
            <p className="text-muted-foreground">Wir erstellen deine persönliche Empfehlung.</p>
          </div>
          <div className="w-48 h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  // Booking Loading Screen
  if (isBooking) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        {/* Progress bar */}
        <div className="fixed top-0 left-0 right-0 z-10 h-1 bg-secondary">
          <div className="h-full bg-gradient-to-r from-primary to-emerald-400 quiz-progress-fill transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-6 quiz-step-enter px-6">
          <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-accent animate-spin" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Dein Termin wird gebucht…</h3>
            <p className="text-muted-foreground">Einen Moment bitte.</p>
          </div>
        </div>
      </div>
    )
  }

  const result = step === 12 ? calcResult(data) : null

  return (
    <div className="relative min-h-[100dvh] flex flex-col">
      {/* Progress Bar – fixed full-width top */}
      <div className="fixed top-0 left-0 right-0 z-10 h-1 bg-secondary">
        <div
          className="h-full bg-gradient-to-r from-primary to-emerald-400 quiz-progress-fill rounded-r-full transition-all duration-500 ease-out"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      {/* ── Step 1: Ziel ── */}
      {step === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 quiz-step-enter">
          <div className="text-center mb-10 quiz-headline">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Was ist dein <span className="text-primary">Hauptziel</span>?
            </h2>
            <p className="text-lg text-muted-foreground mt-3">Klicke auf dein Ziel – wir gehen sofort weiter.</p>
          </div>
          <div className="grid gap-3 max-w-xl w-full">
            {[
              { value: 'abnehmen', icon: '⚖️', title: 'Gewicht verlieren', desc: 'Überflüssige Kilos loswerden' },
              { value: 'straffen', icon: '💪', title: 'Körper straffen', desc: 'Weniger Fett, mehr Definition' },
              { value: 'energie', icon: '⚡', title: 'Mehr Energie', desc: 'Weniger müde und schlapp' },
              { value: 'gesundheit', icon: '❤️', title: 'Gesünder leben', desc: 'Langfristig fit bleiben' },
            ].map((opt, i) => (
              <button key={opt.value} onClick={() => selectGoal(opt.value)}
                className={cn("quiz-option-card quiz-card-stagger flex items-center gap-4 p-5 md:p-6 rounded-2xl border-2 text-left hover:scale-[1.02]",
                  data.goal === opt.value ? "border-primary bg-primary/10 selected" : "border-border hover:border-primary/50 bg-card"
                )}
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                  data.goal === opt.value ? "border-primary bg-primary quiz-select-pop" : "border-muted-foreground")}>
                  {data.goal === opt.value && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                </div>
                <span className="text-2xl">{opt.icon}</span>
                <div>
                  <h3 className="font-semibold">{opt.title}</h3>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2: Körpermaße ── */}
      {step === 2 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 pb-28 md:py-24 md:pb-28 quiz-step-enter">
          <div className="text-center mb-10 quiz-headline">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">📏</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Deine <span className="text-primary">Ausgangssituation</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-3">Damit wir realistische Ziele für dich berechnen können.</p>
          </div>
          <div className="grid gap-4 max-w-sm mx-auto">
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Körpergröße</label>
              <div className="relative">
                <input type="number" min={130} max={220} placeholder="z.B. 168"
                  value={data.height || ''}
                  onChange={e => setData(d => ({ ...d, height: parseInt(e.target.value) || 0 }))}
                  className="w-full p-4 pr-14 rounded-xl border-2 border-border bg-card text-foreground text-lg font-semibold focus:border-primary focus:outline-none transition-colors appearance-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">cm</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Aktuelles Gewicht</label>
              <div className="relative">
                <input type="number" min={40} max={250} placeholder="z.B. 82"
                  value={data.weight || ''}
                  onChange={e => setData(d => ({ ...d, weight: parseInt(e.target.value) || 0 }))}
                  className="w-full p-4 pr-14 rounded-xl border-2 border-border bg-card text-foreground text-lg font-semibold focus:border-primary focus:outline-none transition-colors appearance-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">kg</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Wunschgewicht</label>
              <div className="relative">
                <input type="number" min={40} max={250} placeholder="z.B. 70"
                  value={data.targetWeight || ''}
                  onChange={e => setData(d => ({ ...d, targetWeight: parseInt(e.target.value) || 0 }))}
                  className="w-full p-4 pr-14 rounded-xl border-2 border-border bg-card text-foreground text-lg font-semibold focus:border-primary focus:outline-none transition-colors appearance-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">kg</span>
              </div>
              {data.weight > 0 && data.targetWeight > 0 && data.targetWeight < data.weight && (
                <p className="text-xs text-primary mt-2 font-semibold">
                  → Du möchtest {data.weight - data.targetWeight} kg abnehmen. Das ist ein realistisches Ziel!
                </p>
              )}
              {data.weight > 0 && data.targetWeight > 0 && data.targetWeight >= data.weight && (
                <p className="text-xs text-muted-foreground mt-2">
                  Dein Ziel: Körper formen & straffen – super Ansatz!
                </p>
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center">🔒 Deine Angaben sind vertraulich und werden nur für deine Analyse verwendet.</p>
          </div>
        </div>
      )}

      {/* ── Step 3: Probleme ── */}
      {step === 3 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 pb-28 md:py-24 md:pb-28 quiz-step-enter">
          <div className="text-center mb-10 quiz-headline">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Was <span className="text-accent">hält dich zurück</span>?
            </h2>
            <p className="text-lg text-muted-foreground mt-3">Wähle alle Herausforderungen, die du kennst:</p>
          </div>
          <div className="grid gap-3 max-w-xl w-full">
            {[
              { value: 'jojo', icon: RefreshCw, title: 'Jo-Jo-Effekt', desc: 'Nach Diäten wiege ich mehr' },
              { value: 'hunger', icon: Pizza, title: 'Heißhunger', desc: 'Kann Süßes nicht widerstehen' },
              { value: 'zeit', icon: Clock, title: 'Zeitmangel', desc: 'Kaum Zeit für Sport' },
              { value: 'motivation', icon: Frown, title: 'Motivation fehlt', desc: 'Gebe schnell auf' },
            ].map((opt, i) => (
              <button key={opt.value} onClick={() => toggleProblem(opt.value)}
                className={cn("quiz-option-card quiz-card-stagger flex items-center gap-4 p-5 md:p-6 rounded-2xl border-2 text-left hover:scale-[1.02]",
                  data.problems.includes(opt.value) ? "border-primary bg-primary/10 selected" : "border-border hover:border-primary/50 bg-card"
                )}
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className={cn("w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                  data.problems.includes(opt.value) ? "border-primary bg-primary quiz-select-pop" : "border-muted-foreground")}>
                  {data.problems.includes(opt.value) && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                </div>
                <opt.icon className="w-6 h-6 text-muted-foreground shrink-0" />
                <div>
                  <h3 className="font-semibold">{opt.title}</h3>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 p-4 bg-card border border-border rounded-xl flex items-start gap-4 max-w-xl w-full quiz-testimonial">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-black shrink-0">TK</div>
            <div>
              <p className="text-sm text-muted-foreground italic">&ldquo;Genau diese Probleme hatte ich auch. Die Körperanalyse hat mir gezeigt, dass mein Körper anders funktioniert als ich dachte.&rdquo;</p>
              <p className="text-sm font-semibold mt-1">Thomas K. <span className="text-primary">• -9 kg</span></p>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 4: Dein Programm ── */}
      {step === 4 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 pb-28 md:py-24 md:pb-28 quiz-step-enter">
          <div className="text-center mb-10 quiz-headline">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              {data.goal === 'abnehmen' && <>Dein 8-Wochen-Plan zum <span className="text-primary">Abnehmen</span></>}
              {data.goal === 'straffen' && <>Dein 8-Wochen-Plan zum <span className="text-primary">Straffen</span></>}
              {data.goal === 'energie' && <>Dein 8-Wochen-Plan für <span className="text-primary">mehr Energie</span></>}
              {data.goal === 'gesundheit' && <>Dein 8-Wochen-Plan für <span className="text-primary">deine Gesundheit</span></>}
              {!data.goal && <>Dein <span className="text-primary">8-Wochen-Plan</span></>}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-md mx-auto">happyfigur ist ein zertifizierter Präventionskurs bei FIT-INN Trier — kein Online-Kurs, kein Diätplan aus dem Internet.</p>
          </div>
          <div className="grid gap-4 max-w-xl w-full">
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border-2 border-border bg-card border-l-accent border-l-[3px] quiz-card-stagger" style={{ animationDelay: '80ms' }}>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <BarChart2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">3x InBody-Körperanalyse</h3>
                <p className="text-sm text-muted-foreground mt-1">Start, Mitte, Ende — du siehst in Zahlen, was sich verändert.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border-2 border-border bg-card border-l-accent border-l-[3px] quiz-card-stagger" style={{ animationDelay: '160ms' }}>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Dumbbell className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">8 Wochen Training im Studio</h3>
                <p className="text-sm text-muted-foreground mt-1">Individueller Plan, Trainer vor Ort für Fragen & Korrekturen.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border-2 border-border bg-card border-l-primary border-l-[3px] quiz-card-stagger" style={{ animationDelay: '240ms' }}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Utensils className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Persönlicher Ernährungsplan</h3>
                <p className="text-sm text-muted-foreground mt-1">Passend zu deinem Alltag — kein Kalorienzählen, keine Verbote.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-primary font-semibold quiz-testimonial">
            <ShieldCheck className="w-4 h-4" /> § 20 SGB V zertifiziert — von deiner Krankenkasse anerkannt
          </div>
        </div>
      )}

      {/* ── Step 5: So funktioniert's ── */}
      {step === 5 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 pb-28 md:py-24 md:pb-28 quiz-step-enter">
          <div className="text-center mb-10 quiz-headline">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              So läuft dein <span className="text-primary">Programm</span> ab
            </h2>
            <p className="text-lg text-muted-foreground mt-3">4 einfache Schritte — wir begleiten dich die gesamte Zeit.</p>
          </div>
          <div className="max-w-md w-full">
            {[
              { num: '01', title: 'Kostenloses Probetraining', desc: 'Lerne das Studio kennen & besprich deine Ziele', color: 'accent' },
              { num: '02', title: 'Körperanalyse + Plan', desc: 'InBody-Messung, individueller Trainings- & Ernährungsplan', color: 'accent' },
              { num: '03', title: '8 Wochen Training', desc: '2–3x pro Woche im FIT-INN — Trainer immer ansprechbar', color: 'accent' },
              { num: '04', title: 'Ergebnis sehen', desc: 'Abschluss-Analyse — du siehst schwarz auf weiß, was sich verändert hat', color: 'primary' },
            ].map((item, i) => {
              const baseDelay = i * 400
              return (
                <div key={i} className="flex items-start gap-4 relative">
                  {i < 3 && (
                    <div
                      className="absolute left-[19px] top-[44px] w-0.5 h-[calc(100%-20px)] bg-border quiz-timeline-line"
                      style={{ animationDelay: `${baseDelay + 300}ms` }}
                    />
                  )}
                  <div
                    className={cn("w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 z-10 quiz-timeline-circle",
                      item.color === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                    )}
                    style={{ animationDelay: `${baseDelay}ms` }}
                  >
                    {item.num}
                  </div>
                  <div
                    className="pb-6 quiz-timeline-text"
                    style={{ animationDelay: `${baseDelay + 150}ms` }}
                  >
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 p-4 bg-card border border-border rounded-xl flex items-start gap-4 max-w-md w-full quiz-testimonial">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-black shrink-0">MR</div>
            <div>
              <p className="text-sm text-muted-foreground italic">&ldquo;Ich hätte nie gedacht, dass 2x pro Woche reicht. Nach 8 Wochen passte meine alte Jeans wieder!&rdquo;</p>
              <p className="text-sm font-semibold mt-1">Marina R. <span className="text-primary">• -6 kg</span></p>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 6: Warum es diesmal klappt ── */}
      {step === 6 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 pb-28 md:py-24 md:pb-28 quiz-step-enter">
          <div className="text-center mb-10 quiz-headline">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Warum es <span className="text-accent">diesmal</span> anders wird
            </h2>
            <p className="text-lg text-muted-foreground mt-3">Du hast uns erzählt, was dich zurückhält. So lösen wir das:</p>
          </div>
          <div className="grid gap-4 max-w-xl w-full">
            {(data.problems.length > 0 ? data.problems : ['jojo', 'hunger', 'zeit', 'motivation']).map((key, i) => {
              const item = PROBLEM_EXPLANATIONS[key]
              if (!item) return null
              return (
                <div key={key} className="p-5 rounded-2xl border-2 border-border bg-card quiz-card-stagger" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-sm font-semibold text-accent">{item.problem}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.solution}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground">
            <span className="quiz-card-stagger" style={{ animationDelay: '300ms' }}><span className="font-semibold text-foreground">127.000+</span> Teilnehmer</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span className="quiz-card-stagger" style={{ animationDelay: '380ms' }}><span className="font-semibold text-foreground">4,9★</span> Bewertung</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span className="quiz-card-stagger" style={{ animationDelay: '460ms' }}><span className="font-semibold text-foreground">-7,2 kg</span> Durchschnitt<sup>⁴</sup></span>
          </div>
        </div>
      )}

      {/* ── Step 7: Zeit ── */}
      {step === 7 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 quiz-step-enter">
          <div className="text-center mb-10 quiz-headline">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Wie viel <span className="text-primary">Zeit</span> kannst du investieren?
            </h2>
            <p className="text-lg text-muted-foreground mt-3">Klicke auf deine Antwort – wir gehen sofort weiter.</p>
          </div>
          <div className="grid gap-3 max-w-xl w-full">
            {[
              { value: 'wenig', icon: '⏱️', title: '1-2 Stunden pro Woche', desc: 'Wenig Zeit, aber will Ergebnisse' },
              { value: 'mittel', icon: '📅', title: '2-3 Stunden pro Woche', desc: 'Kann mir regelmäßig Zeit nehmen' },
              { value: 'viel', icon: '💯', title: '4+ Stunden pro Woche', desc: 'Bin bereit durchzustarten' },
            ].map((opt, i) => (
              <button key={opt.value} onClick={() => selectTime(opt.value)}
                className={cn("quiz-option-card quiz-card-stagger flex items-center gap-4 p-5 md:p-6 rounded-2xl border-2 text-left hover:scale-[1.02]",
                  data.time === opt.value ? "border-primary bg-primary/10 selected" : "border-border hover:border-primary/50 bg-card"
                )}
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                  data.time === opt.value ? "border-primary bg-primary quiz-select-pop" : "border-muted-foreground")}>
                  {data.time === opt.value && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                </div>
                <span className="text-2xl">{opt.icon}</span>
                <div>
                  <h3 className="font-semibold">{opt.title}</h3>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 p-4 bg-card border border-border rounded-xl flex items-start gap-4 max-w-xl w-full quiz-testimonial">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-black shrink-0">SB</div>
            <div>
              <p className="text-sm text-muted-foreground italic">&ldquo;Als Mutter von 2 Kindern habe ich wenig Zeit. 2x 30 Min pro Woche sind machbar – und die Ergebnisse sind unglaublich!&rdquo;</p>
              <p className="text-sm font-semibold mt-1">Sarah B. <span className="text-primary">• -7 kg</span></p>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <button onClick={prevStep} className="px-6 py-3 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Zurück</button>
          </div>
        </div>
      )}

      {/* ── Step 8: Deine Investition ── */}
      {step === 8 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 pb-28 md:py-24 md:pb-28 quiz-step-enter">
          <div className="text-center mb-8 quiz-headline">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Was kostet <span className="text-primary">happyfigur</span>?
            </h2>
            <p className="text-lg text-muted-foreground mt-3">Spoiler: Für viele Teilnehmer ist es komplett kostenlos.<sup>²³</sup></p>
          </div>

          <div className="max-w-lg w-full space-y-6">
            {/* Preis-Reveal */}
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-muted-foreground/40 quiz-price-reveal quiz-strike">179€<sup>¹</sup></div>
              <p className="text-sm text-muted-foreground mt-3">happyfigur ist § 20 SGB V zertifiziert. Deine Krankenkasse erstattet bis zu 100%.<sup>²³</sup></p>
            </div>

            {/* KK-Tiles */}
            <div className="p-5 bg-primary/10 border-2 border-primary rounded-xl">
              <h4 className="text-center font-semibold mb-4">💰 Was erstattet deine Krankenkasse?</h4>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {TOP_INSURANCE.map(ins => (
                  <button key={ins.value} onClick={() => selectInsurance(ins.value)}
                    className={cn("p-3 rounded-xl border-2 text-left transition-all duration-200 text-sm",
                      data.insurance === ins.value ? "border-primary bg-primary/20" : "border-border hover:border-primary/50 bg-card"
                    )}>
                    <div className="font-semibold text-xs leading-tight">{ins.label}</div>
                    <div className={cn("text-lg font-bold mt-1", ins.amount >= 179 ? "text-primary" : "text-foreground")}>
                      {ins.amount >= 179 ? '✓ Gratis' : `${ins.amount}€`}
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setShowAllInsurance(v => !v)}
                className="w-full text-sm text-muted-foreground hover:text-foreground text-center py-2 underline">
                {showAllInsurance ? 'Weniger anzeigen' : 'Andere Krankenkasse auswählen'}
              </button>
              {showAllInsurance && (
                <select value={data.insurance} onChange={e => selectInsurance(e.target.value)}
                  className="w-full mt-2 p-3 rounded-xl bg-card border border-border text-foreground cursor-pointer text-sm">
                  <option value="">— Alle Krankenkassen —</option>
                  {ALL_INSURANCE.map(ins => (
                    <option key={ins.value} value={ins.value}>{ins.label}</option>
                  ))}
                </select>
              )}
              {data.insuranceAmount > 0 && (
                <div className="mt-4 p-4 bg-card rounded-xl text-center animate-scale-in">
                  {data.insuranceAmount >= 179 ? (
                    <>
                      <div className="text-3xl font-bold text-primary">🎉 Komplett kostenlos!<sup>²</sup></div>
                      <p className="text-sm text-muted-foreground mt-1">Deine Krankenkasse erstattet die vollen 179€.<sup>³</sup></p>
                    </>
                  ) : (
                    <>
                      <div className="text-3xl font-bold text-accent">Nur {((179 - data.insuranceAmount) / 56).toFixed(2)}€/Tag<sup>¹³</sup></div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Deine Krankenkasse erstattet {data.insuranceAmount}€ von 179€<sup>³</sup> – weniger als ein Kaffee pro Tag!
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Garantie */}
            <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Geld-zurück-Garantie:</span> Erstattet deine Kasse nicht? Wir erstatten dir den vollen Preis.<sup>²</sup>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 9: Commitment ── */}
      {step === 9 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 quiz-step-enter">
          <div className="text-center mb-10 quiz-headline">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Wie <span className="text-primary">bereit</span> bist du für Veränderung?
            </h2>
            <p className="text-lg text-muted-foreground mt-3">Klicke – wir zeigen dir sofort freie Termine.</p>
            {data.insuranceAmount > 0 && (
              <p className="text-sm text-primary font-semibold mt-2">
                Dein Plan: 8 Wochen Training + Ernährung bei FIT-INN Trier {data.insuranceAmount >= 179 ? '— komplett von deiner Kasse erstattet!' : `— ab nur ${((179 - data.insuranceAmount) / 56).toFixed(2)}€/Tag`}
              </p>
            )}
          </div>
          <div className="grid gap-3 max-w-xl w-full">
            {[
              { value: 'unsicher', icon: HelpCircle, title: 'Noch unsicher', desc: 'Ich informiere mich erstmal' },
              { value: 'bereit', icon: ThumbsUp, title: 'Bereit anzufangen', desc: 'Ich will jetzt etwas ändern' },
              { value: 'entschlossen', icon: Flame, title: 'Voll entschlossen', desc: 'Diesmal ziehe ich es durch!' },
            ].map((opt, i) => (
              <button key={opt.value} onClick={() => selectCommitment(opt.value)}
                className={cn("quiz-option-card quiz-card-stagger flex items-center gap-4 p-5 md:p-6 rounded-2xl border-2 text-left hover:scale-[1.02]",
                  data.commitment === opt.value ? "border-primary bg-primary/10 selected" : "border-border hover:border-primary/50 bg-card"
                )}
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                  data.commitment === opt.value ? "border-primary bg-primary quiz-select-pop" : "border-muted-foreground")}>
                  {data.commitment === opt.value && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                </div>
                <opt.icon className="w-6 h-6 text-muted-foreground shrink-0" />
                <div>
                  <h3 className="font-semibold">{opt.title}</h3>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <button onClick={prevStep} className="px-6 py-3 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Zurück</button>
          </div>
        </div>
      )}

      {/* ── Step 10: Kalender / Terminauswahl ── */}
      {step === 10 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 quiz-step-enter">
          <div className="text-center mb-8 quiz-headline">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Wähle deinen <span className="text-primary">Termin</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-3">Kostenlos & unverbindlich – wähle einfach einen freien Slot.</p>
          </div>

          {slotsLoading && (
            <div className="flex flex-col items-center gap-4 py-12">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-muted-foreground">Freie Termine werden geladen…</p>
            </div>
          )}

          {slotsError && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl mb-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-destructive">Termine konnten nicht geladen werden</p>
                <p className="text-xs text-muted-foreground mt-1">{slotsError}</p>
                <a href="https://wa.me/4915679610457?text=Ich%20möchte%20ein%20kostenloses%20Probetraining%20buchen"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-accent hover:underline">
                  Per WhatsApp buchen →
                </a>
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
              <div className="w-full max-w-2xl border border-border rounded-2xl overflow-hidden bg-card/50">
                <div className="grid md:grid-cols-[1fr,280px] divide-y md:divide-y-0 md:divide-x divide-border">
                  {/* Left: Calendar */}
                  <div className="p-5 md:p-6">
                    {/* Monats-Navigation */}
                    <div className="flex items-center justify-between mb-5">
                      <button onClick={() => setCalendarMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                        className="p-2 rounded-full hover:bg-secondary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <span className="text-base font-semibold capitalize">{monthName}</span>
                      <button onClick={() => setCalendarMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                        className="p-2 rounded-full hover:bg-secondary transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Wochentage */}
                    <div className="grid grid-cols-7 mb-2">
                      {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => (
                        <div key={d} className="text-center text-xs text-muted-foreground/60 font-medium py-2">{d}</div>
                      ))}
                    </div>

                    {/* Tage */}
                    <div className="grid grid-cols-7">
                      {grid.map((date, i) => {
                        if (!date) return <div key={i} />
                        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                        const hasSlots = !!slotsByDate[key]
                        const isPast = date < today
                        const isSelected = selectedDate === key
                        const isToday = date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()
                        return (
                          <div key={i} className="flex items-center justify-center py-1">
                            <button disabled={!hasSlots || isPast}
                              onClick={() => { setSelectedDate(key); setSelectedSlot(null) }}
                              className={cn(
                                "w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center",
                                isPast || !hasSlots ? "text-muted-foreground/25 cursor-not-allowed" : "",
                                hasSlots && !isPast && !isSelected ? "text-foreground hover:bg-primary/15 cursor-pointer" : "",
                                isSelected ? "bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20" : "",
                                isToday && !isSelected ? "ring-1 ring-primary/40" : ""
                              )}>
                              {date.getDate()}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Right: Time Slots */}
                  <div className="p-5 md:p-6 md:overflow-y-auto md:max-h-[400px]">
                    {!selectedDate ? (
                      <div className="flex flex-col items-center justify-center h-full text-center py-8 md:py-0">
                        <Calendar className="w-8 h-8 text-muted-foreground/30 mb-3" />
                        <p className="text-sm text-muted-foreground/60">Wähle einen Tag aus dem Kalender</p>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-semibold mb-4">
                          {formatDateLong(selectedDate)}
                        </p>
                        <div className="space-y-2">
                          {slotsForSelected.map((slot, i) => {
                            const isActive = selectedSlot?.startDateTime === slot.startDateTime
                            return (
                              <button key={i} onClick={() => setSelectedSlot(slot)}
                                className={cn(
                                  "w-full p-3 rounded-lg border text-sm font-semibold text-center transition-all duration-200",
                                  isActive
                                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "border-border hover:border-primary text-primary bg-transparent"
                                )}>
                                {formatTime(slot.startDateTime)} Uhr
                              </button>
                            )
                          })}
                        </div>
                        {slotsForSelected.length === 0 && (
                          <p className="text-sm text-muted-foreground/60 text-center py-4">Keine Slots verfügbar</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })()}

        </div>
      )}

      {/* ── Step 11: Kontaktdaten ── */}
      {step === 11 && selectedSlot && (
        <div className="flex-1 flex flex-col items-center px-6 py-16 pb-40 md:py-20 md:pb-40 quiz-step-enter">
          <div className="text-center mb-8 quiz-headline">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Fast <span className="text-primary">geschafft!</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-3">Nur noch deine Daten – dann ist der Termin gebucht.</p>
          </div>

          {/* Gewählter Termin – Calendly-style confirmation badge */}
          <div className="w-full max-w-lg flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/20 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-xs font-medium text-primary uppercase tracking-wider">Dein Termin</div>
              <div className="text-base font-bold mt-0.5">{formatDateShort(selectedSlot.startDateTime)} · {formatTime(selectedSlot.startDateTime)} – {formatTime(selectedSlot.endDateTime)} Uhr</div>
            </div>
          </div>

          {/* Form Card */}
          <div className="w-full max-w-lg border border-border rounded-2xl overflow-hidden bg-card/50">

            {/* Persönliche Daten */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Persönliche Daten</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input type="text" placeholder=" "
                    value={contact.firstName}
                    onChange={e => setContact(c => ({ ...c, firstName: e.target.value }))}
                    className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm"
                  />
                  <label className="absolute left-4 top-2 text-[10px] font-medium text-muted-foreground/70 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary pointer-events-none">Vorname *</label>
                </div>
                <div className="relative">
                  <input type="text" placeholder=" "
                    value={contact.lastName}
                    onChange={e => setContact(c => ({ ...c, lastName: e.target.value }))}
                    className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm"
                  />
                  <label className="absolute left-4 top-2 text-[10px] font-medium text-muted-foreground/70 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary pointer-events-none">Nachname *</label>
                </div>
              </div>

              {/* Geschlecht */}
              <div>
                <p className="text-[10px] font-medium text-muted-foreground/70 mb-2">Geschlecht *</p>
                <div className="grid grid-cols-2 gap-2">
                  {[{ value: 'FEMALE', label: '♀ Weiblich' }, { value: 'MALE', label: '♂ Männlich' }].map(opt => (
                    <button key={opt.value} type="button"
                      onClick={() => setContact(c => ({ ...c, gender: opt.value as 'MALE' | 'FEMALE' }))}
                      className={cn("p-3 rounded-xl border text-sm font-medium transition-all duration-200",
                        contact.gender === opt.value
                          ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/15"
                          : "border-border bg-background hover:border-primary/50 text-muted-foreground"
                      )}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Geburtsdatum – 3 Dropdowns */}
              <div>
                <p className="text-[10px] font-medium text-muted-foreground/70 mb-2">Geburtsdatum *</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative">
                    <select
                      value={contact.dateOfBirth ? parseInt(contact.dateOfBirth.split('-')[2] || '0') : ''}
                      onChange={e => {
                        const parts = (contact.dateOfBirth || '--').split('-')
                        const day = e.target.value.padStart(2, '0')
                        setContact(c => ({ ...c, dateOfBirth: `${parts[0] || '2000'}-${parts[1] || '01'}-${day}` }))
                      }}
                      className="w-full px-3 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Tag</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/40">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      value={contact.dateOfBirth ? parseInt(contact.dateOfBirth.split('-')[1] || '0') : ''}
                      onChange={e => {
                        const parts = (contact.dateOfBirth || '--').split('-')
                        const month = e.target.value.padStart(2, '0')
                        setContact(c => ({ ...c, dateOfBirth: `${parts[0] || '2000'}-${month}-${parts[2] || '01'}` }))
                      }}
                      className="w-full px-3 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Monat</option>
                      {['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'].map((m, i) => (
                        <option key={i} value={i + 1}>{m}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/40">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      value={contact.dateOfBirth ? parseInt(contact.dateOfBirth.split('-')[0] || '0') : ''}
                      onChange={e => {
                        const parts = (contact.dateOfBirth || '--').split('-')
                        setContact(c => ({ ...c, dateOfBirth: `${e.target.value}-${parts[1] || '01'}-${parts[2] || '01'}` }))
                      }}
                      className="w-full px-3 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Jahr</option>
                      {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 16 - i).map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/40">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Handynummer */}
              <div className="relative">
                <input type="tel" placeholder=" "
                  value={contact.mobilephone}
                  onChange={e => setContact(c => ({ ...c, mobilephone: e.target.value }))}
                  className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm"
                />
                <label className="absolute left-4 top-2 text-[10px] font-medium text-muted-foreground/70 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary pointer-events-none">Handynummer *</label>
              </div>

              <div className="relative">
                <input type="email" placeholder=" "
                  value={contact.email}
                  onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
                  className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm"
                />
                <label className="absolute left-4 top-2 text-[10px] font-medium text-muted-foreground/70 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary pointer-events-none">E-Mail *</label>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Adresse */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                <p className="text-sm font-semibold text-foreground">Adresse</p>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="relative col-span-3">
                  <input type="text" placeholder=" "
                    value={contact.street}
                    onChange={e => setContact(c => ({ ...c, street: e.target.value }))}
                    className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm"
                  />
                  <label className="absolute left-4 top-2 text-[10px] font-medium text-muted-foreground/70 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary pointer-events-none">Straße *</label>
                </div>
                <div className="relative">
                  <input type="text" placeholder=" "
                    value={contact.houseNumber}
                    onChange={e => setContact(c => ({ ...c, houseNumber: e.target.value }))}
                    className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm"
                  />
                  <label className="absolute left-4 top-2 text-[10px] font-medium text-muted-foreground/70 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary pointer-events-none">Nr. *</label>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="relative">
                  <input type="text" placeholder=" "
                    value={contact.zip}
                    onChange={e => setContact(c => ({ ...c, zip: e.target.value }))}
                    className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm"
                  />
                  <label className="absolute left-4 top-2 text-[10px] font-medium text-muted-foreground/70 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary pointer-events-none">PLZ *</label>
                </div>
                <div className="relative col-span-2">
                  <input type="text" placeholder=" "
                    value={contact.city}
                    onChange={e => setContact(c => ({ ...c, city: e.target.value }))}
                    className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm"
                  />
                  <label className="absolute left-4 top-2 text-[10px] font-medium text-muted-foreground/70 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary pointer-events-none">Stadt *</label>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Extras */}
            <div className="p-6 space-y-4">
              {/* Notiz (optional) */}
              <div className="relative">
                <textarea placeholder=" "
                  value={contact.note}
                  onChange={e => setContact(c => ({ ...c, note: e.target.value }))}
                  rows={2}
                  className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-sm resize-none"
                />
                <label className="absolute left-4 top-2 text-[10px] font-medium text-muted-foreground/70 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary pointer-events-none">Anmerkung (optional)</label>
              </div>

              {/* Marketing-Consent */}
              <label className="flex items-start gap-3 cursor-pointer select-none p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
                <div className="relative mt-0.5 shrink-0">
                  <input type="checkbox" className="sr-only"
                    checked={contact.marketingConsent}
                    onChange={e => setContact(c => ({ ...c, marketingConsent: e.target.checked }))}
                  />
                  <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200",
                    contact.marketingConsent ? "border-primary bg-primary" : "border-muted-foreground/40 bg-background")}>
                    {contact.marketingConsent && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  Ich bin einverstanden, dass happyfigur mich per E-Mail und Telefon über Angebote informiert. Diese Einwilligung kann jederzeit widerrufen werden.
                </span>
              </label>
            </div>
          </div>

          {bookingError && (
            <div className="w-full max-w-lg mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-2xl">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive font-semibold">{bookingError}</p>
              </div>
              <a href={buildWALink(selectedSlot.startDateTime)}
                target="_blank" rel="noopener noreferrer"
                className="btn-cta inline-flex items-center justify-center gap-2 w-full text-sm py-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.845L0 24l6.314-1.489A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.375l-.359-.214-3.748.883.934-3.646-.234-.374A9.787 9.787 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818s9.818 4.398 9.818 9.818-4.398 9.818-9.818 9.818z"/>
                </svg>
                Stattdessen per WhatsApp buchen
              </a>
            </div>
          )}
        </div>
      )}

      {/* ── Step 12: Personalisiertes Ergebnis + Buchungsbestätigung ── */}
      {step === 12 && result && (
        <div className="flex-1 flex flex-col items-center px-6 pt-16 pb-12 md:pt-20 quiz-step-enter">

          {/* Buchungsbestätigung oben */}
          {bookingSuccess && selectedSlot && (
            <div className="mb-6 p-5 bg-primary/10 border-2 border-primary rounded-xl max-w-lg mx-auto text-center">
              <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-1">Termin bestätigt!</h3>
              <p className="text-sm font-semibold">
                {formatDateShort(selectedSlot.startDateTime)} · {formatTime(selectedSlot.startDateTime)} – {formatTime(selectedSlot.endDateTime)} Uhr
              </p>
              <p className="text-xs text-muted-foreground mt-2">Eine Bestätigung wurde an {contact.email} gesendet.</p>
              <a href={buildCalendarLink(selectedSlot.startDateTime, selectedSlot.endDateTime)}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-primary hover:underline">
                <Calendar className="w-4 h-4" /> Zum Kalender hinzufügen
              </a>
            </div>
          )}

          {/* Persönliche Headline */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Dein persönliches Ergebnis</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{result.headline}</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Basierend auf deinen Angaben haben wir dein realistisches 8-Wochen-Ziel berechnet.
            </p>
          </div>

          {/* Primär-Metrik Hero */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-3 flex-wrap justify-center">
              <div className="text-center px-8 py-5 bg-primary/10 border-2 border-primary rounded-2xl">
                <div className="text-6xl font-bold text-primary glow-text">{result.primary.value}</div>
                <div className="text-sm text-muted-foreground mt-1 uppercase tracking-wider">{result.primary.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">in 8 Wochen – realistisch erreichbar</div>
              </div>
              {result.projectedWeight && (
                <div className="text-center px-6 py-5 bg-card border border-border rounded-2xl flex flex-col justify-center gap-1">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Von</div>
                  <div className="text-2xl font-bold text-muted-foreground">{data.weight} kg</div>
                  <div className="text-xs text-primary font-semibold">↓</div>
                  <div className="text-2xl font-bold text-primary">{result.projectedWeight} kg</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Nach 8 Wochen</div>
                  {result.bmi && (
                    <div className="text-xs text-muted-foreground mt-1">BMI aktuell: {result.bmi}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* SVG Chart */}
          <div className="p-5 bg-card border border-border rounded-xl max-w-2xl mx-auto mb-5">
            <h4 className="text-center font-semibold mb-1">Dein Fortschritts-Verlauf</h4>
            <p className="text-center text-xs text-muted-foreground mb-4">Individuelle Prognose basierend auf deinen Antworten</p>
            <div className="relative w-full">
              <svg viewBox="0 0 320 135" className="w-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="chartFill2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#cfe5ea" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#cfe5ea" stopOpacity="0.02" />
                  </linearGradient>
                  <style>{`
                    .cl { stroke-dasharray: 450; stroke-dashoffset: 450; animation: dl 1.8s cubic-bezier(0.16,1,0.3,1) 0.2s forwards; }
                    .cf { opacity: 0; animation: df 0.5s ease 1.9s forwards; }
                    .cd { opacity: 0; animation: dd 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
                    @keyframes dl { to { stroke-dashoffset: 0; } }
                    @keyframes df { to { opacity: 1; } }
                    @keyframes dd { to { opacity: 1; } }
                  `}</style>
                </defs>
                {[20, 50, 80, 110].map(y => (
                  <line key={y} x1="28" y1={y} x2="312" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                ))}
                <text x="24" y="23" textAnchor="end" fontSize="7.5" fill="#71717a">{result.yLabelStart}</text>
                <text x="24" y={result.endY + 4} textAnchor="end" fontSize="7.5" fill="#cfe5ea">{result.yLabelEnd}</text>
                <path className="cf" d={result.fillPath} fill="url(#chartFill2)" />
                <path className="cl" d={result.linePath} stroke="#cfe5ea" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <rect x="30" y="10" width="55" height="108" fill="rgba(255,255,255,0.01)" rx="2" />
                <text x="57" y="8" textAnchor="middle" fontSize="6" fill="#71717a">Eingewöhnung</text>
                <circle className="cd" style={{ animationDelay: '1.8s' }} cx="30" cy="18" r="5" fill="#cfe5ea" />
                <circle cx="30" cy="18" r="9" fill="none" stroke="#cfe5ea" strokeOpacity="0.25" strokeWidth="1" />
                <text x="30" y="10" textAnchor="middle" fontSize="6.5" fill="#fafafa" fontWeight="bold">W0</text>
                <circle className="cd" style={{ animationDelay: '2.1s' }} cx="170" cy={result.midY + 3} r="5" fill="#ffb54f" />
                <circle cx="170" cy={result.midY + 3} r="9" fill="none" stroke="#ffb54f" strokeOpacity="0.25" strokeWidth="1" />
                <rect x="130" y={result.midY - 20} width="80" height="16" rx="3" fill="#1a1a1a" stroke="#ffb54f" strokeWidth="0.8" />
                <text x="170" y={result.midY - 9} textAnchor="middle" fontSize="6.5" fill="#ffb54f" fontWeight="bold">🔬 Analyse W4</text>
                <circle className="cd" style={{ animationDelay: '2.3s' }} cx="310" cy={result.endY} r="6" fill="#cfe5ea" />
                <circle cx="310" cy={result.endY} r="11" fill="none" stroke="#cfe5ea" strokeOpacity="0.35" strokeWidth="1.5" />
                <circle cx="310" cy={result.endY} r="16" fill="none" stroke="#cfe5ea" strokeOpacity="0.12" strokeWidth="1" />
                <rect x="258" y={result.endY - 22} width="54" height="16" rx="3" fill="#cfe5ea" />
                <text x="285" y={result.endY - 11} textAnchor="middle" fontSize="7" fill="#0a0a0a" fontWeight="bold">{result.endLabel}</text>
                {['W0','W1','W2','W3','W4','W5','W6','W7','W8'].map((l, i) => (
                  <text key={i} x={30 + i * 35} y="130" textAnchor="middle" fontSize="6.5"
                    fill={[0,4,8].includes(i) ? '#fafafa' : '#71717a'}
                    fontWeight={[0,4,8].includes(i) ? 'bold' : 'normal'}>{l}</text>
                ))}
              </svg>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-xl font-bold text-primary">-{result.kgLoss} kg</div>
                <div className="text-xs text-muted-foreground">Gewicht</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-primary">-{result.fatLoss}%</div>
                <div className="text-xs text-muted-foreground">Körperfett</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-primary">+{result.muscleGain} kg</div>
                <div className="text-xs text-muted-foreground">Muskelmasse</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs text-muted-foreground shrink-0">Mehr Energie</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full transition-all duration-1000"
                  style={{ width: `${result.energyPct}%` }} />
              </div>
              <span className="text-xs font-bold text-primary shrink-0">{result.energyPct}%</span>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-1">
              {result.energyPct}% unserer Teilnehmer mit deinem Profil berichten von mehr Energie
            </p>
          </div>

          {/* Problem-Lösungen */}
          {result.insights.length > 0 && (
            <div className="max-w-lg mx-auto mb-5 space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">So lösen wir deine Herausforderungen:</p>
              {result.insights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{insight}</span>
                </div>
              ))}
            </div>
          )}

          {/* KK-Ergebnis (bereits in Step 8 ausgewählt) */}
          {data.insuranceAmount > 0 && (
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl max-w-lg mx-auto mb-6 text-center">
              {data.insuranceAmount >= 179 ? (
                <div className="text-lg font-bold text-primary">🎉 Komplett kostenlos — deine Kasse erstattet 179€<sup>²³</sup></div>
              ) : (
                <div className="text-lg font-bold text-accent">Dein Eigenanteil: nur {((179 - data.insuranceAmount) / 56).toFixed(2)}€/Tag<sup>¹³</sup></div>
              )}
            </div>
          )}

          <div className="mt-4 flex justify-center">
            <button onClick={onComplete}
              className="px-8 py-3 text-muted-foreground hover:text-foreground border border-border rounded-xl transition-colors">
              Schließen
            </button>
          </div>
        </div>
      )}
      {/* ── Sticky Navigation (Steps 2–4, 7–8) ── */}
      {[2, 3, 4, 5, 6, 8, 10, 11].includes(step) && (
        <div className="fixed bottom-0 left-0 right-0 z-[110] bg-background/95 backdrop-blur-md border-t border-border">
          <div className="max-w-lg mx-auto px-6 pt-4 pb-safe-4">
            {step === 11 ? (
              <div className="space-y-3">
                <button onClick={submitBooking} disabled={!contactValid}
                  className="btn-cta inline-flex items-center justify-center gap-2 w-full text-lg py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed">
                  Jetzt verbindlich buchen <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                    Sicher übertragen
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span>Deutschland (DE)</span>
                </div>
                <div className="flex justify-center">
                  <button onClick={prevStep} className="px-6 py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Zurück
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center gap-6">
                <button onClick={prevStep} className="px-6 py-3 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Zurück
                </button>
                <button onClick={nextStep} disabled={nextDisabled}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                  {nextLabel} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
