'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Like useScrollReveal, but bidirectional: elements appear when section
 * enters viewport and disappear when it leaves.
 */
export function useScrollFloat(threshold = 0.1) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const setRef = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold, rootMargin: '0px' }
    )

    observer.observe(node)
    observerRef.current = observer
  }, [threshold])

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return { ref: setRef, isVisible }
}
