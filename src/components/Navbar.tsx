'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Programm', href: '#programm' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'Erfahrungen', href: '#erfahrungen' },
  { label: 'Krankenkasse', href: '#krankenkasse' },
  { label: 'FAQ', href: '#faq' },
]

export function Navbar({ onStartQuiz }: { onStartQuiz: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/20'
          : 'bg-background/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#hero" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="shrink-0">
          <Image
            src="/logo.png"
            alt="FIT-INN Trier"
            width={180}
            height={29}
            className="h-7 md:h-8 w-auto"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onStartQuiz}
            className="ml-3 btn-cta text-sm px-5 py-2.5 inline-flex items-center gap-2"
          >
            Probetraining
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 text-foreground transition-colors active:bg-white/10"
          aria-label="Menü öffnen"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu – Fullscreen Overlay */}
      {mobileOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-2xl border-b border-border/50">
          <div className="px-5 pt-2 pb-6 flex flex-col">
            {/* Nav Links */}
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-left px-4 py-4 text-base font-medium text-muted-foreground active:text-foreground active:bg-white/5 rounded-xl transition-colors ${
                  i < navLinks.length - 1 ? 'border-b border-border/30' : ''
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* CTA Block */}
            <div className="mt-5 space-y-3">
              <button
                onClick={() => { setMobileOpen(false); onStartQuiz() }}
                className="btn-cta w-full inline-flex items-center justify-center gap-2 text-base py-4 rounded-xl"
              >
                Kostenloses Probetraining
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-xs text-muted-foreground">
                ✓ Unverbindlich · ✓ 100% kostenlos · ✓ Krankenkasse bis 100%
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
