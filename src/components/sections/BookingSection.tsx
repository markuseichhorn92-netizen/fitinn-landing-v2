'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight, ArrowLeft, Loader2, CheckCircle2, Calendar as CalendarIcon,
  AlertCircle, Phone, CalendarPlus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { track } from '@vercel/analytics'
import {
  getMonthGrid, toLocalDateKey, formatTime, formatDateLong,
  formatDateShort, buildCalendarLink,
} from '@/lib/quizResult'
import { useScrollReveal } from '@/hooks/useScrollReveal'

type Slot = { startDateTime: string; endDateTime: string }
type Phase = 'slot' | 'contact' | 'done'

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

export function BookingSection() {
  const header = useScrollReveal(0.1)

  const [phase, setPhase] = useState<Phase>('slot')
  const [contact, setContact] = useState<ContactData>({
    firstName: '', lastName: '', email: '', mobilephone: '',
    gender: '', dateOfBirth: '',
    street: '', houseNumber: '', zip: '', city: '',
    marketingConsent: false, note: '',
  })

  const [slots, setSlots] = useState<Slot[]>([])
  const [slotsLoading, setSlotsLoading] = useState(true)
  const [slotsError, setSlotsError] = useState<string | null>(null)
  const [calendarMonth, setCalendarMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

  const [isBooking, setIsBooking] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)

  // Slots für die nächsten 28 Tage laden
  useEffect(() => {
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
  }, [])

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
          note: ['30 Tage Bauchweg Projekt – Anmeldung über Landingpage', contact.note.trim()]
            .filter(Boolean).join(' | '),
          startDateTime: selectedSlot.startDateTime,
        }),
      })
      const result = await res.json()
      if (!res.ok || result.error) {
        const detail = result.details ? ` — ${result.details}` : ''
        setBookingError((result.error || 'Buchung fehlgeschlagen') + detail)
      } else {
        track('booking_success')
        setPhase('done')
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

  return (
    <section id="booking" className="relative py-20 lg:py-28 overflow-hidden scroll-mt-20 bg-secondary">
      <div className="blur-circle w-96 h-96 -top-20 -right-20 bg-accent" />
      <div className="blur-circle w-80 h-80 -bottom-20 -left-20 bg-primary" />

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        {/* Header */}
        <div
          ref={header.ref}
          className={`fade-up text-center mb-10 ${header.isReady ? 'anim-ready' : ''} ${header.isVisible ? 'animate' : ''}`}
        >
          <span className="badge-pill bg-primary text-white mb-5 shadow-md">
            <CalendarIcon className="w-3.5 h-3.5" />
            Kostenloses Probetraining²
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4">
            Starte jetzt dein
            <span className="block mt-1 uppercase tracking-tight text-primary-dark">
              30 Tage Bauchweg Projekt
            </span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Wähle deinen Wunschtermin fürs kostenlose Probetraining im FIT-INN Trier —
            du bekommst sofort eine Bestätigung per E-Mail.²
          </p>
        </div>

        {/* Buchungs-Karte */}
        <div className="card-soft hover:translate-y-0 p-6 sm:p-8">
          {phase === 'done' && selectedSlot ? (
            <div className="flex flex-col items-center text-center gap-4 py-6">
              <div className="w-16 h-16 rounded-full bg-secondary border border-border-teal flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-extrabold mb-1">Termin gebucht!</p>
                <p className="text-muted-foreground">
                  {formatDateShort(selectedSlot.startDateTime)} · {formatTime(selectedSlot.startDateTime)} Uhr
                </p>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Wir freuen uns auf dich im FIT-INN Trier. Du erhältst eine Bestätigung per E-Mail.
              </p>
              <a
                href={buildCalendarLink(selectedSlot.startDateTime, selectedSlot.endDateTime)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                <CalendarPlus className="w-4 h-4" /> In Kalender speichern
              </a>
            </div>
          ) : phase === 'slot' ? (
            <div className="flex flex-col gap-4">
              <p className="text-lg font-bold">Wähle deinen Termin</p>

              {slotsLoading && (
                <div className="flex flex-col items-center gap-3 py-12">
                  <Loader2 className="w-7 h-7 text-primary animate-spin" />
                  <p className="text-sm text-muted-foreground">Termine werden geladen…</p>
                </div>
              )}

              {slotsError && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-destructive">Termine konnten nicht geladen werden</p>
                    <a href="tel:+49651308524" className="text-sm font-semibold text-primary hover:underline mt-1">
                      Telefonisch buchen → 0651 308524
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
                  <div className="border border-border-teal rounded-2xl overflow-hidden bg-secondary/50">
                    <div className="flex items-center justify-between p-3 border-b border-border-teal">
                      <button
                        type="button"
                        onClick={() => setCalendarMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                        aria-label="Vorheriger Monat"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold capitalize">{monthName}</span>
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
                                isSelected ? 'bg-primary text-white font-bold shadow-md shadow-primary/30' : '',
                              )}
                            >
                              {date.getDate()}
                            </button>
                          </div>
                        )
                      })}
                    </div>

                    {selectedDate && (
                      <div className="border-t border-border-teal p-3 max-h-[180px] overflow-y-auto bg-white">
                        <p className="text-sm font-bold mb-2">{formatDateLong(selectedDate)}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {slotsForSelected.map((slot, i) => {
                            const isActive = selectedSlot?.startDateTime === slot.startDateTime
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className={cn(
                                  'p-2 rounded-lg border text-sm font-semibold transition-all',
                                  isActive
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-border-teal hover:border-primary text-primary bg-transparent',
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
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">Aktuell keine freien Termine.</p>
                  <a href="tel:+49651308524" className="text-sm font-semibold text-primary hover:underline">
                    Telefonisch buchen → 0651 308524
                  </a>
                </div>
              )}

              <button
                type="button"
                onClick={() => { track('booking_slot_selected'); setPhase('contact') }}
                disabled={!selectedSlot}
                className={cn(
                  'w-full mt-1 inline-flex items-center justify-center gap-1.5 rounded-full font-bold py-4 transition-all',
                  selectedSlot
                    ? 'btn-pill'
                    : 'bg-muted text-muted-foreground/50 cursor-not-allowed',
                )}
              >
                Weiter zu deinen Daten <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-lg font-bold">Deine Daten</p>
              {selectedSlot && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary border border-border-teal text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-semibold">
                    {formatDateShort(selectedSlot.startDateTime)} · {formatTime(selectedSlot.startDateTime)} Uhr
                  </span>
                  <button
                    type="button"
                    onClick={() => setPhase('slot')}
                    className="ml-auto text-xs font-semibold text-primary hover:underline"
                  >
                    Ändern
                  </button>
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
                      'p-3 rounded-xl border text-sm font-medium transition-all',
                      contact.gender === opt.value
                        ? 'border-primary bg-primary text-white'
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

              <label className="flex items-start gap-2.5 cursor-pointer select-none p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
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
                    {contact.marketingConsent && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground leading-snug">
                  Ich bin einverstanden, dass FIT-INN Trier mich per E-Mail und Telefon über Angebote informiert. Jederzeit widerrufbar.
                </span>
              </label>

              {bookingError && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-destructive">{bookingError}</p>
                    <a href="tel:+49651308524" className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-primary hover:underline">
                      <Phone className="w-3.5 h-3.5" /> Telefonisch buchen · 0651 308524
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-2 mt-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setPhase('slot')}
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground px-2 py-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Zurück
                </button>
                <button
                  type="button"
                  onClick={submitBooking}
                  disabled={!contactValid || isBooking}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-6 py-3.5 ml-auto rounded-full font-bold transition-all',
                    contactValid && !isBooking
                      ? 'btn-pill'
                      : 'bg-muted text-muted-foreground/50 cursor-not-allowed',
                  )}
                >
                  {isBooking ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Buche…</>
                  ) : (
                    <>Termin verbindlich buchen <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-center font-medium text-muted-foreground mt-5">
          100% kostenlos² · Keine Verpflichtung · Bestätigung per E-Mail
        </p>
      </div>
    </section>
  )
}

// ─── Form-Helfer ─────────────────────────────────────────────────────────────

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
        className="peer w-full px-3 pt-5 pb-2 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-base"
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

  const selectClass = 'w-full px-2 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all text-base appearance-none cursor-pointer'

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
