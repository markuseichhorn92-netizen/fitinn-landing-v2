'use client'

import { useState, useEffect } from 'react'

export function HeroHeadline() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <span className={`block text-accent relative lift-in ${animated ? 'animate' : ''}`}>
      — alles versucht?
    </span>
  )
}
