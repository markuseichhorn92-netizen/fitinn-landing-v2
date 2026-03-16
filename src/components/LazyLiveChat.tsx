'use client'

import dynamic from 'next/dynamic'

const LiveChat = dynamic(
  () => import('@/components/LiveChat').then(m => ({ default: m.LiveChat })),
  { ssr: false }
)

export function LazyLiveChat() {
  return <LiveChat />
}
