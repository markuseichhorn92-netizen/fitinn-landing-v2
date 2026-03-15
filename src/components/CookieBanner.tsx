'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'cookie-consent'

type ConsentValue = 'all' | 'essential' | null

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentValue>(null)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'all' || stored === 'essential') {
      setConsent(stored)
    }
  }, [])

  const acceptAll = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'all')
    setConsent('all')
  }, [])

  const acceptEssential = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'essential')
    setConsent('essential')
  }, [])

  return { consent, acceptAll, acceptEssential }
}

export function CookieBanner() {
  const { consent, acceptAll, acceptEssential } = useCookieConsent()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Don't render on server or if consent already given
  if (!mounted || consent !== null) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6 animate-slide-up">
      <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl shadow-2xl shadow-black/50 p-5 sm:p-6">
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Wir verwenden Cookies und Analysetools, um diese Website zu verbessern.
          Weitere Infos findest du in unserer{' '}
          <Link href="/datenschutz" className="text-primary underline hover:text-primary/80">
            Datenschutzerklärung
          </Link>.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={acceptAll}
            className="btn-cta flex-1 py-3 rounded-xl text-sm font-semibold"
          >
            Alle akzeptieren
          </button>
          <button
            onClick={acceptEssential}
            className="flex-1 py-3 rounded-xl text-sm font-semibold border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            Nur notwendige
          </button>
        </div>
      </div>
    </div>
  )
}

export function ConditionalAnalytics() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'all') {
      setAnalyticsAllowed(true)
    }

    // Listen for consent changes (same tab)
    const handleStorage = () => {
      setAnalyticsAllowed(localStorage.getItem(CONSENT_KEY) === 'all')
    }
    window.addEventListener('storage', handleStorage)

    // Also poll briefly for same-tab updates
    const interval = setInterval(() => {
      const current = localStorage.getItem(CONSENT_KEY) === 'all'
      if (current !== analyticsAllowed) setAnalyticsAllowed(current)
    }, 500)

    return () => {
      window.removeEventListener('storage', handleStorage)
      clearInterval(interval)
    }
  }, [analyticsAllowed])

  if (!analyticsAllowed) return null

  // Dynamic import to avoid loading analytics code before consent
  return <AnalyticsLoader />
}

function AnalyticsLoader() {
  const [Components, setComponents] = useState<{
    Analytics: React.ComponentType
    SpeedInsights: React.ComponentType
  } | null>(null)

  useEffect(() => {
    Promise.all([
      import('@vercel/analytics/next'),
      import('@vercel/speed-insights/next'),
    ]).then(([analytics, speed]) => {
      setComponents({
        Analytics: analytics.Analytics,
        SpeedInsights: speed.SpeedInsights,
      })
    })
  }, [])

  if (!Components) return null

  return (
    <>
      <Components.Analytics />
      <Components.SpeedInsights />
    </>
  )
}
