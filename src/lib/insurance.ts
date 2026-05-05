import { RefreshCw, Pizza, Clock, Frown, type LucideIcon } from 'lucide-react'

export const INSURANCE_VALUES: Record<string, number> = {
  'aok-rlp': 179, 'viactiv': 179, 'mobil': 179, 'bkk-vbu': 179, 'salus': 179,
  'aok-hessen': 150, 'ikk-sw': 150, 'vivida': 150,
  'tk': 143.20, 'big': 120, 'barmer': 100, 'sbk': 100,
  'ikk-classic': 90, 'aok-bw': 80, 'dak': 75, 'andere': 100,
}

export const TOP_INSURANCE = [
  { value: 'aok-rlp', label: 'AOK Rheinland-Pfalz', amount: 179 },
  { value: 'tk', label: 'Techniker (TK)', amount: 143.20 },
  { value: 'barmer', label: 'BARMER', amount: 100 },
  { value: 'dak', label: 'DAK', amount: 75 },
  { value: 'viactiv', label: 'VIACTIV', amount: 179 },
]

export const ALL_INSURANCE = [
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

export const INSURANCE_LABEL: Record<string, string> = Object.fromEntries(
  ALL_INSURANCE.map(i => [i.value, i.label])
)

export const GOAL_LABELS: Record<string, string> = {
  abnehmen: 'Abnehmen',
  straffen: 'Straffen & Tonen',
  energie: 'Mehr Energie',
  gesundheit: 'Gesundheit & Fitness',
}

export const TIME_LABELS: Record<string, string> = {
  wenig: '1–2× / Woche',
  mittel: '3–4× / Woche',
  viel: '5+× / Woche',
}

export const PROBLEM_EXPLANATIONS: Record<string, { icon: LucideIcon; problem: string; solution: string }> = {
  jojo: {
    icon: RefreshCw,
    problem: 'Jo-Jo-Effekt nach jeder Diät',
    solution: 'Die Körperanalyse zeigt deinen echten Stoffwechsel. Wir arbeiten MIT deinem Körper — kein Hungern, kein Jojo.',
  },
  hunger: {
    icon: Pizza,
    problem: 'Heißhunger-Attacken',
    solution: 'Dein Ernährungsplan ist auf DICH abgestimmt. Satt essen statt verzichten — Heißhunger verschwindet erfahrungsgemäß nach 2–3 Wochen.',
  },
  zeit: {
    icon: Clock,
    problem: 'Zeitmangel',
    solution: '2× 30 Min pro Woche reichen aus. Das Programm passt in jeden Alltag — auch mit Job, Kindern, Stress.',
  },
  motivation: {
    icon: Frown,
    problem: 'Motivation fehlt',
    solution: 'Du trainierst nicht allein zu Hause. Im Studio hast du einen festen Ansprechpartner — die Körperanalyse zeigt Fortschritte, das motiviert.',
  },
}
