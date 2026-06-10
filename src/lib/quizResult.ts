// ─── Kalender-Hilfsfunktionen ─────────────────────────────────────────────────

export function getMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startPad = (firstDay.getDay() + 6) % 7
  const grid: (Date | null)[] = []
  for (let i = 0; i < startPad; i++) grid.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) grid.push(new Date(year, month, d))
  while (grid.length % 7 !== 0) grid.push(null)
  return grid
}

export function toLocalDateKey(isoStr: string): string {
  const d = new Date(isoStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function formatTime(isoStr: string): string {
  return new Date(isoStr).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

export function formatDateLong(dateKey: string): string {
  const d = new Date(dateKey + 'T12:00:00')
  return d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })
}

export function formatDateShort(isoStr: string): string {
  const d = new Date(isoStr)
  return d.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'long' })
}

export function buildCalendarLink(startIso: string, endIso: string): string {
  const fmt = (s: string) => new Date(s).toISOString().replace(/[-:]/g, '').replace('.000Z', 'Z')
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Probetraining+FIT-INN+Trier&dates=${fmt(startIso)}/${fmt(endIso)}&location=FIT-INN+Trier,+Auf+Hirtenberg+8,+54296+Trier&details=Kostenloses+Probetraining+im+FIT-INN+Trier`
}
