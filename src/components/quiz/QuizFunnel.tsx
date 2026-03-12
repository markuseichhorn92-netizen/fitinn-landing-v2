'use client'

import { useState } from 'react'
import {
  ArrowRight, ArrowLeft, Target, RefreshCw, Pizza, Clock, Frown,
  CheckCircle2, Flame, ThumbsUp, HelpCircle, Loader2
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

// ─── Ergebnis-Kalkulation ────────────────────────────────────────────────────

function calcResult(data: QuizData) {
  // Basis-Gewichtsverlust nach verfügbarer Zeit
  const baseKg: Record<string, number> = { wenig: 4, mittel: 6, viel: 9 }
  const base = baseKg[data.time] ?? 6

  // Commitment-Multiplikator
  const mult: Record<string, number> = { unsicher: 0.75, bereit: 1.0, entschlossen: 1.3 }
  const factor = mult[data.commitment] ?? 1.0

  // Tatsächlicher Abstand zum Wunschgewicht
  const actualDiff = data.weight > 0 && data.targetWeight > 0
    ? Math.max(0, data.weight - data.targetWeight)
    : null

  // kgLoss: nie mehr als tatsächlicher Abstand, min 2 kg (auch bei kleinem Abstand Körperzusammensetzung verbessern)
  const rawLoss = Math.round(Math.min(11, Math.max(3, base * factor)))
  const kgLoss = actualDiff !== null
    ? Math.round(Math.min(actualDiff > 0 ? actualDiff : rawLoss, rawLoss))
    : rawLoss

  // BMI berechnen
  const bmi = data.height > 0 && data.weight > 0
    ? Math.round((data.weight / Math.pow(data.height / 100, 2)) * 10) / 10
    : null

  // Zielgewicht nach Programm
  const projectedWeight = data.weight > 0 ? Math.round((data.weight - kgLoss) * 10) / 10 : null

  // Körperfett je nach Ziel
  const fatMap: Record<string, number> = {
    abnehmen: Math.max(3, Math.round(kgLoss * 0.6)),
    straffen: Math.max(4, Math.round(kgLoss * 0.7)),
    energie: Math.max(2, Math.round(kgLoss * 0.4)),
    gesundheit: Math.max(2, Math.round(kgLoss * 0.4)),
  }
  const fatLoss = fatMap[data.goal] ?? 3

  // Muskelzunahme je nach Ziel
  const muscleMap: Record<string, number> = {
    abnehmen: 1,
    straffen: Math.min(4, Math.round(kgLoss * 0.35)),
    energie: 1,
    gesundheit: 2,
  }
  const muscleGain = muscleMap[data.goal] ?? 2

  // Energie-Verbesserung
  const energyPct = data.commitment === 'entschlossen' ? 96 : data.commitment === 'bereit' ? 93 : 88

  // Headline – mit echtem Wunschgewicht wenn vorhanden
  const targetLabel = data.targetWeight > 0 ? ` (→ ${data.targetWeight} kg)` : ''
  const headlineMap: Record<string, string> = {
    abnehmen: `Realistisches Ziel: ${kgLoss} kg in 8 Wochen${targetLabel}`,
    straffen: `Realistisches Ziel: ${kgLoss} kg Fett weg, ${muscleGain} kg Muskeln auf`,
    energie: `Realistisches Ziel: Spürbar mehr Energie ab Woche 2`,
    gesundheit: `Realistisches Ziel: Nachhaltige Gesundheit & ${kgLoss} kg weniger`,
  }
  const headline = headlineMap[data.goal] ?? `Realistisches Ziel: ${kgLoss} kg in 8 Wochen`

  // Primär-Metrik (je nach Ziel)
  const primaryMetric: Record<string, { value: string; label: string }> = {
    abnehmen: { value: `-${kgLoss} kg`, label: 'Gewichtsverlust' },
    straffen: { value: `-${fatLoss}%`, label: 'Körperfett' },
    energie: { value: `${energyPct}%`, label: 'berichten mehr Energie' },
    gesundheit: { value: `-${kgLoss} kg`, label: 'Gewicht & Vitalität' },
  }
  const primary = primaryMetric[data.goal] ?? { value: `-${kgLoss} kg`, label: 'Gewichtsverlust' }

  // Problem-spezifische Lösungshinweise
  const problemSolutions: Record<string, string> = {
    jojo: 'Kein Jo-Jo-Effekt – wir verändern dauerhaft deinen Stoffwechsel',
    hunger: 'Heißhunger-Attacken verschwinden – dank individuellem Ernährungsplan',
    zeit: '2× 30 Min/Woche reichen aus – Quality over Quantity',
    motivation: 'Unser Coaching hält dich auf Kurs – du bist nie allein',
  }
  const insights = data.problems.map(p => problemSolutions[p]).filter(Boolean)

  // Chart-Kurve: End-Y berechnen (SVG: y=18 = Start, je niedriger desto mehr Verlust)
  // Range: y=18 (kein Verlust) bis y=112 (max 11 kg)
  const endY = Math.round(18 + (kgLoss / 11) * 94)
  // W4-Mittelpunkt: leicht verzögert (Plateau in Woche 1-2)
  const midY = Math.round(18 + (endY - 18) * 0.52)

  // SVG-Pfad dynamisch
  const linePath = `M30,18 C60,18 75,${18 + (midY - 18) * 0.3} 110,${Math.round(18 + (midY - 18) * 0.6)} C140,${midY} 150,${midY + 5} 170,${midY + 3} C195,${midY + 8} 215,${Math.round(midY + (endY - midY) * 0.5)} 250,${Math.round(midY + (endY - midY) * 0.75)} C270,${endY - 4} 290,${endY - 1} 310,${endY}`
  const fillPath = linePath + ` L310,118 L30,118 Z`

  // Label für Endpunkt-Badge
  const endLabel = data.goal === 'straffen'
    ? `-${fatLoss}% Fett`
    : data.goal === 'energie'
    ? `+Energie`
    : projectedWeight
    ? `${projectedWeight} kg`
    : `-${kgLoss} kg`

  // Y-Achse Beschriftung mit echten Gewichtswerten
  const yLabelStart = data.weight > 0 ? `${data.weight} kg` : 'Jetzt'
  const yLabelEnd = projectedWeight ? `${projectedWeight} kg` : 'Ziel'

  return { kgLoss, fatLoss, muscleGain, energyPct, headline, primary, insights, endY, midY, linePath, fillPath, endLabel, bmi, projectedWeight, yLabelStart, yLabelEnd, actualDiff }
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

// ─── Hauptkomponente ─────────────────────────────────────────────────────────

export function QuizFunnel({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(1)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showAllInsurance, setShowAllInsurance] = useState(false)
  const [data, setData] = useState<QuizData>({
    goal: '', height: 0, weight: 0, targetWeight: 0,
    problems: [], time: '', commitment: '', insurance: '', insuranceAmount: 0
  })

  const totalSteps = 7
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

  // Loading Screen
  if (isCalculating) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 animate-fade-up">
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
    )
  }

  // Ergebnis berechnen (nur in Step 7 genutzt)
  const result = step === 7 ? calcResult(data) : null

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Schritt {step} von {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Step 1: Ziel ── */}
      {step === 1 && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Was ist dein <span className="text-primary">Hauptziel</span>?
            </h2>
            <p className="text-muted-foreground">Klicke auf dein Ziel – wir gehen sofort weiter.</p>
          </div>
          <div className="grid gap-3 max-w-lg mx-auto">
            {[
              { value: 'abnehmen', icon: '⚖️', title: 'Gewicht verlieren', desc: 'Überflüssige Kilos loswerden' },
              { value: 'straffen', icon: '💪', title: 'Körper straffen', desc: 'Weniger Fett, mehr Definition' },
              { value: 'energie', icon: '⚡', title: 'Mehr Energie', desc: 'Weniger müde und schlapp' },
              { value: 'gesundheit', icon: '❤️', title: 'Gesünder leben', desc: 'Langfristig fit bleiben' },
            ].map(opt => (
              <button key={opt.value} onClick={() => selectGoal(opt.value)}
                className={cn("flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.01]",
                  data.goal === opt.value ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card"
                )}>
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                  data.goal === opt.value ? "border-primary bg-primary" : "border-muted-foreground")}>
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
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📏</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Deine <span className="text-primary">Ausgangssituation</span>
            </h2>
            <p className="text-muted-foreground">Damit wir realistische Ziele für dich berechnen können.</p>
          </div>

          <div className="grid gap-4 max-w-sm mx-auto">
            {/* Größe */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Körpergröße</label>
              <div className="relative">
                <input
                  type="number"
                  min={130} max={220} placeholder="z.B. 168"
                  value={data.height || ''}
                  onChange={e => setData(d => ({ ...d, height: parseInt(e.target.value) || 0 }))}
                  className="w-full p-4 pr-14 rounded-xl border-2 border-border bg-card text-foreground text-lg font-semibold focus:border-primary focus:outline-none transition-colors appearance-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">cm</span>
              </div>
            </div>

            {/* Aktuelles Gewicht */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Aktuelles Gewicht</label>
              <div className="relative">
                <input
                  type="number"
                  min={40} max={250} placeholder="z.B. 82"
                  value={data.weight || ''}
                  onChange={e => setData(d => ({ ...d, weight: parseInt(e.target.value) || 0 }))}
                  className="w-full p-4 pr-14 rounded-xl border-2 border-border bg-card text-foreground text-lg font-semibold focus:border-primary focus:outline-none transition-colors appearance-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">kg</span>
              </div>
            </div>

            {/* Wunschgewicht */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Wunschgewicht</label>
              <div className="relative">
                <input
                  type="number"
                  min={40} max={250} placeholder="z.B. 70"
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

          <div className="mt-8 flex justify-center gap-4">
            <button onClick={prevStep} className="px-6 py-3 text-muted-foreground hover:text-foreground flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Zurück</button>
            <button
              onClick={nextStep}
              disabled={!(data.height >= 130 && data.weight >= 40 && data.targetWeight >= 40)}
              className="btn-primary inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Weiter <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Probleme ── */}
      {step === 3 && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Was <span className="text-destructive">hält dich zurück</span>?
            </h2>
            <p className="text-muted-foreground">Wähle alle Herausforderungen, die du kennst:</p>
          </div>
          <div className="grid gap-3 max-w-lg mx-auto">
            {[
              { value: 'jojo', icon: RefreshCw, title: 'Jo-Jo-Effekt', desc: 'Nach Diäten wiege ich mehr' },
              { value: 'hunger', icon: Pizza, title: 'Heißhunger', desc: 'Kann Süßes nicht widerstehen' },
              { value: 'zeit', icon: Clock, title: 'Zeitmangel', desc: 'Kaum Zeit für Sport' },
              { value: 'motivation', icon: Frown, title: 'Motivation fehlt', desc: 'Gebe schnell auf' },
            ].map(opt => (
              <button key={opt.value} onClick={() => toggleProblem(opt.value)}
                className={cn("flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
                  data.problems.includes(opt.value) ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card"
                )}>
                <div className={cn("w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                  data.problems.includes(opt.value) ? "border-primary bg-primary" : "border-muted-foreground")}>
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
          <div className="mt-6 p-4 bg-card border border-border rounded-xl flex items-start gap-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-black shrink-0">TK</div>
            <div>
              <p className="text-sm text-muted-foreground italic">&ldquo;Genau diese Probleme hatte ich auch. Die Körperanalyse hat mir gezeigt, dass mein Körper anders funktioniert als ich dachte.&rdquo;</p>
              <p className="text-sm font-semibold mt-1">Thomas K. <span className="text-primary">• -9 kg</span></p>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={prevStep} className="px-6 py-3 text-muted-foreground hover:text-foreground flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Zurück</button>
            <button onClick={nextStep} className="btn-primary inline-flex items-center gap-2">Weiter <ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
      )}

      {/* ── Step 4: Transformation ── */}
      {step === 4 && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              So kann deine <span className="text-primary">Transformation</span> aussehen
            </h2>
            <p className="text-muted-foreground">Das erleben unsere Teilnehmer typischerweise:</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/30">
              <div className="text-sm font-semibold text-destructive uppercase tracking-wider mb-4">Vorher</div>
              <div className="text-4xl mb-4">😔</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="text-destructive">✗</span> Ständig müde & antriebslos</li>
                <li className="flex items-center gap-2"><span className="text-destructive">✗</span> Kleidung sitzt nicht mehr</li>
                <li className="flex items-center gap-2"><span className="text-destructive">✗</span> Heißhunger-Attacken</li>
                <li className="flex items-center gap-2"><span className="text-destructive">✗</span> Frustriert von Diäten</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-primary/10 border border-primary/30">
              <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Nach 8 Wochen</div>
              <div className="text-4xl mb-4">😊</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Voller Energie</li>
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Kleidung sitzt wieder</li>
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Kontrolliertes Essverhalten</li>
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Stolz auf dich selbst</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-xl max-w-2xl mx-auto">
            <p className="text-sm text-center"><span className="font-semibold text-primary">💡 Das ist möglich:</span> 93% unserer Teilnehmer berichten von deutlich mehr Energie bereits nach 2 Wochen.</p>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={prevStep} className="px-6 py-3 text-muted-foreground hover:text-foreground flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Zurück</button>
            <button onClick={nextStep} className="btn-primary inline-flex items-center gap-2">Das will ich auch! <ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
      )}

      {/* ── Step 5: Zeit ── */}
      {step === 5 && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Wie viel <span className="text-primary">Zeit</span> kannst du investieren?
            </h2>
            <p className="text-muted-foreground">Klicke auf deine Antwort – wir gehen sofort weiter.</p>
          </div>
          <div className="grid gap-3 max-w-lg mx-auto">
            {[
              { value: 'wenig', icon: '⏱️', title: '1-2 Stunden pro Woche', desc: 'Wenig Zeit, aber will Ergebnisse' },
              { value: 'mittel', icon: '📅', title: '2-3 Stunden pro Woche', desc: 'Kann mir regelmäßig Zeit nehmen' },
              { value: 'viel', icon: '💯', title: '4+ Stunden pro Woche', desc: 'Bin bereit durchzustarten' },
            ].map(opt => (
              <button key={opt.value} onClick={() => selectTime(opt.value)}
                className={cn("flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.01]",
                  data.time === opt.value ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card"
                )}>
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                  data.time === opt.value ? "border-primary bg-primary" : "border-muted-foreground")}>
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
          <div className="mt-6 p-4 bg-card border border-border rounded-xl flex items-start gap-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-black shrink-0">SB</div>
            <div>
              <p className="text-sm text-muted-foreground italic">&ldquo;Als Mutter von 2 Kindern habe ich wenig Zeit. 2x 30 Min pro Woche sind machbar – und die Ergebnisse sind unglaublich!&rdquo;</p>
              <p className="text-sm font-semibold mt-1">Sarah B. <span className="text-primary">• -7 kg</span></p>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button onClick={prevStep} className="px-6 py-3 text-muted-foreground hover:text-foreground flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Zurück</button>
          </div>
        </div>
      )}

      {/* ── Step 6: Commitment ── */}
      {step === 6 && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Wie <span className="text-primary">bereit</span> bist du für Veränderung?
            </h2>
            <p className="text-muted-foreground">Klicke – wir zeigen dir sofort dein persönliches Ergebnis.</p>
          </div>
          <div className="grid gap-3 max-w-lg mx-auto">
            {[
              { value: 'unsicher', icon: HelpCircle, title: 'Noch unsicher', desc: 'Ich informiere mich erstmal' },
              { value: 'bereit', icon: ThumbsUp, title: 'Bereit anzufangen', desc: 'Ich will jetzt etwas ändern' },
              { value: 'entschlossen', icon: Flame, title: 'Voll entschlossen', desc: 'Diesmal ziehe ich es durch!' },
            ].map(opt => (
              <button key={opt.value} onClick={() => selectCommitment(opt.value)}
                className={cn("flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.01]",
                  data.commitment === opt.value ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card"
                )}>
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                  data.commitment === opt.value ? "border-primary bg-primary" : "border-muted-foreground")}>
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
          <div className="mt-8 flex justify-center">
            <button onClick={prevStep} className="px-6 py-3 text-muted-foreground hover:text-foreground flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Zurück</button>
          </div>
        </div>
      )}

      {/* ── Step 7: Personalisiertes Ergebnis ── */}
      {step === 7 && result && (
        <div className="animate-fade-up">

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
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
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

                {/* Grid */}
                {[20, 50, 80, 110].map(y => (
                  <line key={y} x1="28" y1={y} x2="312" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                ))}

                {/* Y Achse Labels */}
                <text x="24" y="23" textAnchor="end" fontSize="7.5" fill="#71717a">{result.yLabelStart}</text>
                <text x="24" y={result.endY + 4} textAnchor="end" fontSize="7.5" fill="#10b981">{result.yLabelEnd}</text>

                {/* Fill */}
                <path className="cf" d={result.fillPath.replace(/M30,/g, 'M30,').replace(/L310,118/g, 'L310,118').replace(/L30,118/g, 'L30,118')} fill="url(#chartFill2)" />

                {/* Linie */}
                <path className="cl" d={result.linePath} stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                {/* Plateau-Zone W1-W2 (leicht grau hinterlegt) */}
                <rect x="30" y="10" width="55" height="108" fill="rgba(255,255,255,0.01)" rx="2" />
                <text x="57" y="8" textAnchor="middle" fontSize="6" fill="#71717a">Eingewöhnung</text>

                {/* Milestone: Start */}
                <circle className="cd" style={{ animationDelay: '1.8s' }} cx="30" cy="18" r="5" fill="#10b981" />
                <circle cx="30" cy="18" r="9" fill="none" stroke="#10b981" strokeOpacity="0.25" strokeWidth="1" />
                <text x="30" y="10" textAnchor="middle" fontSize="6.5" fill="#fafafa" fontWeight="bold">W0</text>

                {/* Milestone: W4 Zwischen-Analyse */}
                <circle className="cd" style={{ animationDelay: '2.1s' }} cx="170" cy={result.midY + 3} r="5" fill="#f97316" />
                <circle cx="170" cy={result.midY + 3} r="9" fill="none" stroke="#f97316" strokeOpacity="0.25" strokeWidth="1" />
                <rect x="130" y={result.midY - 20} width="80" height="16" rx="3" fill="#1a1a1a" stroke="#f97316" strokeWidth="0.8" />
                <text x="170" y={result.midY - 9} textAnchor="middle" fontSize="6.5" fill="#f97316" fontWeight="bold">🔬 Analyse W4</text>

                {/* Milestone: Ende W8 */}
                <circle className="cd" style={{ animationDelay: '2.3s' }} cx="310" cy={result.endY} r="6" fill="#10b981" />
                <circle cx="310" cy={result.endY} r="11" fill="none" stroke="#10b981" strokeOpacity="0.35" strokeWidth="1.5" />
                <circle cx="310" cy={result.endY} r="16" fill="none" stroke="#10b981" strokeOpacity="0.12" strokeWidth="1" />
                <rect x="258" y={result.endY - 22} width="54" height="16" rx="3" fill="#10b981" />
                <text x="285" y={result.endY - 11} textAnchor="middle" fontSize="7" fill="#0a0a0a" fontWeight="bold">{result.endLabel}</text>

                {/* X Achse */}
                {['W0','W1','W2','W3','W4','W5','W6','W7','W8'].map((l, i) => (
                  <text key={i} x={30 + i * 35} y="130" textAnchor="middle" fontSize="6.5"
                    fill={[0,4,8].includes(i) ? '#fafafa' : '#71717a'}
                    fontWeight={[0,4,8].includes(i) ? 'bold' : 'normal'}>{l}</text>
                ))}
              </svg>
            </div>

            {/* Stats Row */}
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

            {/* Energie-Indikator */}
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs text-muted-foreground shrink-0">Mehr Energie</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full transition-all duration-1000"
                  style={{ width: `${result.energyPct}%` }}
                />
              </div>
              <span className="text-xs font-bold text-primary shrink-0">{result.energyPct}%</span>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-1">
              {result.energyPct}% unserer Teilnehmer mit deinem Profil berichten von mehr Energie
            </p>
          </div>

          {/* Problem-Lösungen (individuell) */}
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

          {/* Krankenkassen-Kacheln */}
          <div className="p-5 bg-primary/10 border-2 border-primary rounded-xl max-w-lg mx-auto mb-6">
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
                    <div className="text-3xl font-bold text-primary">🎉 Komplett kostenlos!</div>
                    <p className="text-sm text-muted-foreground mt-1">Deine Krankenkasse erstattet die vollen 179€.</p>
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-accent">Nur {(179 - data.insuranceAmount).toFixed(0)}€ Eigenanteil</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Deine Krankenkasse erstattet {data.insuranceAmount}€ von 179€ – das sind nur {((179 - data.insuranceAmount) / 8).toFixed(0)}€/Woche!
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button onClick={prevStep} className="px-6 py-3 text-muted-foreground hover:text-foreground flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Zurück
            </button>
            <button onClick={onComplete} className="btn-cta inline-flex items-center gap-2 text-lg px-8 py-4">
              Jetzt Probetraining buchen <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
