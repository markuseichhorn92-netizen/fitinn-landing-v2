'use client'

import { useState } from 'react'
import { Banknote, CheckCircle2, PartyPopper, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const insuranceOptions = [
  { name: 'AOK Rheinland-Pfalz', value: 179 },
  { name: 'VIACTIV', value: 179 },
  { name: 'Mobil Krankenkasse', value: 179 },
  { name: 'BKK VBU', value: 179 },
  { name: 'Salus BKK', value: 179 },
  { name: 'AOK Hessen / Bayern / Nordost', value: 150 },
  { name: 'IKK Südwest', value: 150 },
  { name: 'Vivida BKK / KKH / HEK', value: 150 },
  { name: 'Techniker (TK)', value: 143.20 },
  { name: 'BIG direkt', value: 120 },
  { name: 'BARMER / SBK', value: 100 },
  { name: 'IKK classic', value: 90 },
  { name: 'AOK Baden-Württemberg / Niedersachsen', value: 80 },
  { name: 'DAK', value: 75 },
  { name: 'Andere Krankenkasse', value: 100 },
]

const PROGRAM_PRICE = 179

export function InsuranceCalculator() {
  const [selected, setSelected] = useState<string>('')
  const [reimbursement, setReimbursement] = useState<number | null>(null)
  
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value
    setSelected(name)
    const option = insuranceOptions.find(o => o.name === name)
    setReimbursement(option?.value || null)
  }
  
  const isFree = reimbursement !== null && reimbursement >= PROGRAM_PRICE
  const outOfPocket = reimbursement !== null ? Math.max(0, PROGRAM_PRICE - reimbursement) : null
  
  return (
    <div className="feature-card corner-decorator p-6 md:p-8 max-w-2xl mx-auto">
      <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
      <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Banknote className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-2">
          Was erstattet deine Krankenkasse?
        </h3>
        <p className="text-muted-foreground">
          Die meisten Kassen übernehmen 75€ bis 179€ für §20-Kurse.
        </p>
      </div>
      
      {/* Select */}
      <div className="relative mb-6">
        <select
          value={selected}
          onChange={handleSelect}
          className={cn(
            'w-full px-5 py-4 rounded-xl bg-secondary border-2 transition-all duration-300',
            'text-foreground text-lg font-medium cursor-pointer',
            'appearance-none bg-no-repeat',
            selected ? 'border-primary' : 'border-border hover:border-primary/50'
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2310b981'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            backgroundPosition: 'right 16px center',
            backgroundSize: '24px',
          }}
        >
          <option value="">— Wähle deine Krankenkasse —</option>
          {insuranceOptions.map(option => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Result */}
      {reimbursement !== null && (
        <div className={cn(
          'rounded-xl p-6 text-center animate-scale-in',
          isFree ? 'bg-primary/10 border-2 border-primary' : 'bg-accent/10 border-2 border-accent'
        )}>
          {isFree ? (
            <>
              <PartyPopper className="w-12 h-12 mx-auto text-primary mb-3" />
              <h4 className="text-2xl font-bold text-primary mb-2">
                Komplett kostenlos für dich!
              </h4>
              <p className="text-muted-foreground">
                Deine {selected} erstattet die vollen {PROGRAM_PRICE}€.
              </p>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-12 h-12 mx-auto text-accent mb-3" />
              <h4 className="text-2xl font-bold mb-2">
                Du zahlst nur <span className="text-accent">{outOfPocket?.toFixed(2).replace('.', ',')}€</span>
              </h4>
              <p className="text-muted-foreground mb-2">
                Deine {selected} erstattet {reimbursement.toFixed(2).replace('.', ',')}€ von {PROGRAM_PRICE}€.
              </p>
              <p className="text-sm text-primary">
                Das sind nur {(outOfPocket! / 8).toFixed(2).replace('.', ',')}€ pro Woche!
              </p>
            </>
          )}
          
          <button className="btn-primary mt-6 flex items-center justify-center gap-2 w-full">
            Jetzt Probetraining buchen
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Trust Elements */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          § 20 SGB V zertifiziert
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          Zentrale Prüfstelle
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          Alle Kassen akzeptiert
        </span>
      </div>
    </div>
  )
}
