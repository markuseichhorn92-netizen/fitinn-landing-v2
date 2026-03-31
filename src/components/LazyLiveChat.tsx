'use client'

import dynamic from 'next/dynamic'

const WhatsAppWidget = dynamic(
  () => import('@/components/WhatsAppWidget').then(m => ({ default: m.WhatsAppWidget })),
  { ssr: false }
)

export function LazyLiveChat() {
  return <WhatsAppWidget />
}
