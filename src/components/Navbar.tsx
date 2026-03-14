'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, ArrowRight, Phone, MessageCircle } from 'lucide-react'

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
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace('#', ''))
    const observers: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection('#' + id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      io.observe(el)
      observers.push(io)
    })
    return () => observers.forEach(io => io.disconnect())
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-background backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/20'
          : 'bg-background border-b border-border/20 md:bg-background/60 md:backdrop-blur-md md:border-white/5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#hero"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="shrink-0"
        >
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
              className={`relative px-3 py-2 text-sm transition-colors rounded-lg hover:bg-white/5 group ${
                activeSection === link.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
              {/* Animated underline */}
              <span className={`absolute bottom-0.5 left-3 right-3 h-px bg-primary transition-all duration-300 ${
                activeSection === link.href ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100'
              }`} style={{ transformOrigin: 'center' }} />
            </button>
          ))}
          <a
            href="tel:+496513085240"
            className="ml-2 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
          >
            <Phone className="w-3.5 h-3.5" />
            0651 308524
          </a>
          <button
            onClick={onStartQuiz}
            className="ml-1 btn-cta text-sm px-5 py-2.5 inline-flex items-center gap-2"
          >
            Probetraining
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/8 border border-white/10 text-foreground transition-all active:scale-95"
          aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/40">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-3.5 text-[15px] font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 pt-3 border-t border-border/30 space-y-2">
              <button
                onClick={() => { setMobileOpen(false); onStartQuiz() }}
                className="btn-cta w-full inline-flex items-center justify-center gap-2 text-[15px] py-3.5 rounded-xl"
              >
                Kostenloses Probetraining
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-xs text-muted-foreground">
                ✓ Unverbindlich · ✓ 100% kostenlos
              </p>
              <div className="flex gap-2 pt-1">
                <a
                  href="tel:+496513085240"
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white/5 border border-border/40 text-sm text-muted-foreground hover:text-foreground active:scale-95 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Anrufen
                </a>
                <a
                  href="https://wa.me/4915679610457"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white/5 border border-border/40 text-sm text-muted-foreground hover:text-foreground active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
