'use client'

import { ReactNode } from 'react'

type Position = {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

interface FloatingDecorProps {
  children: ReactNode
  position: Position
  isVisible: boolean
  delay?: number
  size?: number
}

export function FloatingDecor({ children, position, isVisible, delay = 0, size = 48 }: FloatingDecorProps) {
  return (
    <div
      className={`absolute pointer-events-none select-none transition-all duration-700 ease-out ${
        isVisible ? 'opacity-[0.07] translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
      }`}
      style={{
        ...position,
        width: size,
        height: size,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// --- SVG Icons (inline, no dependencies) ---

export function DumbbellSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="8" y="22" width="8" height="20" rx="2" fill="currentColor" />
      <rect x="48" y="22" width="8" height="20" rx="2" fill="currentColor" />
      <rect x="2" y="26" width="6" height="12" rx="2" fill="currentColor" />
      <rect x="56" y="26" width="6" height="12" rx="2" fill="currentColor" />
      <rect x="16" y="29" width="32" height="6" rx="1" fill="currentColor" />
    </svg>
  )
}

export function AppleSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 12c2-6 8-8 8-8s-1 5-3 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 14c-2-1-4-1-6 0-4 0-8 2-11 7-4 7-3 18 4 24 3 3 5 4 7 4s3-1 6-1 4 1 6 1 4-1 7-4c7-6 8-17 4-24-3-5-7-7-11-7-2-1-4-1-6 0z" fill="currentColor" />
    </svg>
  )
}

export function LeafSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M12 52C12 52 14 20 48 12c0 0-4 36-36 40z" fill="currentColor" />
      <path d="M12 52C24 40 36 28 48 12" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path d="M20 44c6-8 12-14 20-20" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

export function HeartbeatSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M4 32h14l4-12 6 24 6-16 4 4h22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StarSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 4l8 16 18 3-13 13 3 18-16-8-16 8 3-18L6 23l18-3z" fill="currentColor" />
    </svg>
  )
}

export function ShieldCheckSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 4L8 16v16c0 14 10 24 24 28 14-4 24-14 24-28V16L32 4z" fill="currentColor" />
      <path d="M22 32l7 7 13-14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
    </svg>
  )
}

export function EuroSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M44 14c-4-3-9-4-14-2-8 3-13 12-12 22 1 8 7 16 14 18 5 1 9 0 13-3" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <line x1="12" y1="28" x2="38" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="12" y1="36" x2="36" y2="36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function MedalSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M22 4l4 20M42 4l-4 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="38" r="16" fill="currentColor" />
      <circle cx="32" cy="38" r="11" stroke="white" strokeWidth="1.5" opacity="0.3" />
    </svg>
  )
}

export function ScaleSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="12" y="48" width="40" height="6" rx="3" fill="currentColor" />
      <rect x="28" y="20" width="8" height="28" rx="2" fill="currentColor" />
      <circle cx="32" cy="16" r="8" fill="currentColor" />
      <path d="M28 16h8" stroke="white" strokeWidth="1.5" opacity="0.3" />
      <path d="M32 12v8" stroke="white" strokeWidth="1.5" opacity="0.3" />
    </svg>
  )
}
