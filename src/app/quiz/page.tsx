'use client'

import './quiz.css'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { QuizFunnel } from '@/components/quiz/QuizFunnel'

export default function QuizPage() {
  const router = useRouter()
  const close = () => router.push('/')

  return (
    <div className="relative min-h-[100dvh] bg-background">
      {/* Ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(207,229,234,0.06), transparent 70%)' }}
      />
      {/* Close → zurück zur Landing */}
      <button
        onClick={close}
        className="fixed top-5 right-5 z-[60] p-2.5 rounded-full bg-card/60 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
      <QuizFunnel onComplete={close} />
    </div>
  )
}
