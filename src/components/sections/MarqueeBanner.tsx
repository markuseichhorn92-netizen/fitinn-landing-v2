import { Check } from 'lucide-react'

const ITEMS = [
  'STRAFFER BAUCH',
  'STRANDFIGUR',
  'MEHR ENERGIE',
  'WOHLFÜHLEN IM BIKINI',
  'SICHTBARE ERGEBNISSE',
  '30 TAGE KOMPLETT',
]

export function MarqueeBanner() {
  return (
    <div className="overflow-hidden py-4 bg-primary">
      <div className="marquee-track whitespace-nowrap text-white text-sm font-bold tracking-wide">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 shrink-0 pr-12"
            aria-hidden={i >= ITEMS.length ? 'true' : undefined}
          >
            <Check className="w-4 h-4" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
