'use client'

import { useState, useEffect } from 'react'

const FEED_ITEMS = [
  { city: 'Trier', action: 'Probetraining gebucht', channel: 'Live-Chat', time: 'vor 2 Min.' },
  { city: 'Konz', action: '-8 kg erreicht', channel: '8 Wochen', time: 'vor 3 Tagen' },
  { city: 'Schweich', action: 'Probetraining gebucht', channel: 'Website', time: 'vor 12 Min.' },
  { city: 'Trier', action: 'Körperanalyse abgeschlossen', channel: 'Studio', time: 'vor 1 Std.' },
  { city: 'Saarburg', action: '-6 kg erreicht', channel: '8 Wochen', time: 'vor 2 Tagen' },
  { city: 'Trier', action: 'Ernährungsplan erhalten', channel: 'App', time: 'vor 4 Std.' },
  { city: 'Wittlich', action: 'Probetraining gebucht', channel: 'Live-Chat', time: 'vor 25 Min.' },
]

const channelStyles: Record<string, string> = {
  'Live-Chat': 'bg-primary/15 text-primary',
  'Website': 'bg-accent/15 text-accent',
  'Studio': 'bg-accent/15 text-accent',
  '8 Wochen': 'bg-primary/15 text-primary',
  'App': 'bg-primary/15 text-primary',
}

export function LiveFeedTable() {
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    if (visibleCount < FEED_ITEMS.length) {
      const timer = setTimeout(() => setVisibleCount(c => c + 1), 1500)
      return () => clearTimeout(timer)
    }
  }, [visibleCount])

  const items = FEED_ITEMS.slice(0, Math.min(visibleCount, 5))

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Live</span>
      </div>

      {/* Feed rows */}
      <div className="divide-y divide-border">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5 py-3 text-sm transition-all duration-500"
            style={{
              opacity: i === items.length - 1 && visibleCount <= FEED_ITEMS.length ? 0.7 : 1,
              animation: i === items.length - 1 ? 'fadeUp 0.4s ease both' : undefined,
            }}
          >
            <span className="font-semibold text-foreground min-w-[80px]">{item.city}</span>
            <span className="text-muted-foreground flex-1">{item.action}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${channelStyles[item.channel] || 'bg-card text-muted-foreground'}`}>
              {item.channel}
            </span>
            <span className="text-xs text-muted-foreground/60 min-w-[70px] text-right font-mono">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Simple single-line feed (kept for other uses) */
export function LiveFeed() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % FEED_ITEMS.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const item = FEED_ITEMS[index]

  return (
    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground h-6 overflow-hidden">
      <span className="inline-block w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
      <span className={`transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {item.city} · {item.action} · {item.channel} · {item.time}
      </span>
    </div>
  )
}
