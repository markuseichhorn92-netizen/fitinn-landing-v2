'use client'

import { MessageCircle } from 'lucide-react'
import { openLiveChat } from '@/lib/livechat'

export function LiveChatButton({ className, children }: { className?: string, children?: React.ReactNode }) {
  return (
    <button type="button" onClick={() => openLiveChat()} className={className}>
      {children ?? (
        <>
          <MessageCircle className="w-4 h-4" />
          Fragen? Chatte mit uns
        </>
      )}
    </button>
  )
}
