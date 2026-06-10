'use client'

import Image from 'next/image'
import { Phone } from 'lucide-react'

export function Navbar({ onCta }: { onCta: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 flex items-center justify-between h-16">
        <a href="#" aria-label="Zum Seitenanfang" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo.png"
            alt="FIT-INN Trier"
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
            priority
          />
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="tel:+49651308524"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="w-4 h-4" /> 0651 308524
          </a>
          <button
            onClick={onCta}
            className="btn-pill text-sm px-5 py-2.5"
          >
            Platz sichern
          </button>
        </div>
      </div>
    </header>
  )
}
