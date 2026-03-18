'use client'

import { useState, useEffect } from 'react'
import { MapPin, CheckCircle2 } from 'lucide-react'

const FEED_ITEMS = [
  { city: 'Trier', action: 'Probetraining gebucht', icon: '📅', accent: false },
  { city: 'Konz', action: '-8 kg in 8 Wochen erreicht', icon: '🎉', accent: true },
  { city: 'Schweich', action: 'Probetraining gebucht', icon: '📅', accent: false },
  { city: 'Trier', action: 'Körperanalyse abgeschlossen', icon: '📊', accent: false },
  { city: 'Saarburg', action: '-6 kg erreicht', icon: '🎉', accent: true },
  { city: 'Wittlich', action: 'Probetraining gebucht', icon: '📅', accent: false },
]

export function LiveFeedCards() {
  const [current, setCurrent] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false)
      setTimeout(() => {
        setCurrent(c => (c + 1) % FEED_ITEMS.length)
        setShow(true)
      }, 500)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const item = FEED_ITEMS[current]
  const prev = FEED_ITEMS[(current - 1 + FEED_ITEMS.length) % FEED_ITEMS.length]
  const prev2 = FEED_ITEMS[(current - 2 + FEED_ITEMS.length) % FEED_ITEMS.length]

  return (
    <div className="flex flex-col items-center gap-2 relative h-[130px]">
      {/* Stacked cards — newest on top */}

      {/* Background card (2 behind) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[85%] max-w-md">
        <MiniCard item={prev2} opacity={0.15} scale={0.92} />
      </div>

      {/* Middle card (1 behind) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md">
        <MiniCard item={prev} opacity={0.35} scale={0.96} />
      </div>

      {/* Active card (top) */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md transition-all duration-500 ${
          show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-3 scale-95'
        }`}
      >
        <MiniCard item={item} opacity={1} scale={1} active />
      </div>
    </div>
  )
}

function MiniCard({ item, opacity, scale, active }: {
  item: typeof FEED_ITEMS[number]
  opacity: number
  scale: number
  active?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border bg-card ${
        active ? 'border-primary/20 shadow-sm' : 'border-border'
      }`}
      style={{ opacity, transform: `scale(${scale})` }}
    >
      <span className="text-lg">{item.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
          <span className="text-xs text-muted-foreground">{item.city}</span>
          {active && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse ml-1" />}
        </div>
        <p className={`text-sm font-medium truncate ${item.accent ? 'text-primary' : 'text-foreground'}`}>
          {item.action}
        </p>
      </div>
      {active && (
        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
      )}
    </div>
  )
}

/* Re-export for backwards compat */
export function LiveFeedTable() {
  return <LiveFeedCards />
}

export function LiveFeed() {
  return <LiveFeedCards />
}
