'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Bidirectional visibility + scroll progress for parallax effects.
 * Returns isVisible (true when section is in viewport) and
 * progress (0→1 as the section scrolls through the viewport).
 */
export function useScrollFloat(threshold = 0.1) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const nodeRef = useRef<HTMLElement | null>(null)
  const rafRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  // Track scroll progress via rAF when visible
  useEffect(() => {
    if (!isVisible || !nodeRef.current) return

    const update = () => {
      const node = nodeRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 = section just entered bottom, 1 = section top reached viewport top
      const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)))
      setProgress(p)
      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isVisible])

  const setRef = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    nodeRef.current = node
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
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { ref: setRef, isVisible, progress }
}
