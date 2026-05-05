export interface QuizResultInput {
  goal: string
  height: number
  weight: number
  targetWeight: number
  problems: string[]
  time: string
  commitment: string
}

export function calcResult(data: QuizResultInput) {
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
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Probetraining+happyfigur&dates=${fmt(startIso)}/${fmt(endIso)}&location=FIT-INN+Trier,+Auf+Hirtenberg+8,+54296+Trier&details=Kostenloses+Probetraining+bei+happyfigur`
}
