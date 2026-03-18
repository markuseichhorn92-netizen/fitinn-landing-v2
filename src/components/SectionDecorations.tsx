'use client'

import { type LucideIcon, Scale, Clock, Frown, Leaf, Heart, Sparkles, Flag, Footprints, Trophy, Star, Quote, Dumbbell, Users, Salad, Euro, ShieldCheck, CircleCheck, HelpCircle, Lightbulb, Zap, TrendingDown, Apple, Activity, Medal, Target, Flame, Timer, Ban, ArrowDownCircle, Cherry, Carrot, Utensils, Route, CalendarCheck, BarChart3, ThumbsUp, MessageCircle, Award, BadgeCheck, Coins, Receipt, Wallet, FileCheck, Lock, Handshake, BookOpen, Search, Info } from 'lucide-react'

type FloatingIcon = {
  icon: LucideIcon
  x: string
  y: string
  size: number
  delay: number
  duration: number
  color: 'green' | 'gold' | 'muted'
  side?: 'left' | 'right'
}

const colorClass = {
  green: 'text-primary/[0.06]',
  gold: 'text-accent/[0.06]',
  muted: 'text-muted-foreground/[0.04]',
}

type Side = 'left' | 'right'

function FloatingIcon({ icon: Icon, x, y, size, delay, duration, color, side }: FloatingIcon & { side?: Side }) {
  const posStyle: Record<string, string> = { top: y }
  if (side === 'right') {
    posStyle.right = x
  } else {
    posStyle.left = x
  }
  return (
    <div
      className={`absolute pointer-events-none hidden md:block ${colorClass[color]}`}
      style={{
        ...posStyle,
        animation: `float-drift ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      <Icon style={{ width: size, height: size }} strokeWidth={1} />
    </div>
  )
}

export function DecoIcons({ icons }: { icons: FloatingIcon[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {icons.map((icon, i) => (
        <FloatingIcon key={i} {...icon} />
      ))}
    </div>
  )
}

// ── Preset icon sets per section theme ──

export const problemIcons: FloatingIcon[] = [
  { icon: Scale, x: '3%', y: '8%', size: 48, delay: 0, duration: 7, color: 'muted', side: 'left' },
  { icon: Timer, x: '5%', y: '12%', size: 42, delay: 0.5, duration: 7.5, color: 'muted', side: 'right' },
  { icon: TrendingDown, x: '15%', y: '28%', size: 40, delay: 1.5, duration: 8, color: 'muted', side: 'left' },
  { icon: Ban, x: '12%', y: '35%', size: 38, delay: 2.5, duration: 6, color: 'muted', side: 'right' },
  { icon: Clock, x: '2%', y: '50%', size: 44, delay: 3, duration: 6.5, color: 'muted', side: 'left' },
  { icon: ArrowDownCircle, x: '8%', y: '55%', size: 44, delay: 1, duration: 8, color: 'muted', side: 'right' },
  { icon: Frown, x: '10%', y: '72%', size: 36, delay: 0.8, duration: 7.5, color: 'muted', side: 'left' },
  { icon: Frown, x: '3%', y: '78%', size: 34, delay: 3.5, duration: 7, color: 'muted', side: 'right' },
  { icon: Flame, x: '4%', y: '90%', size: 32, delay: 2.2, duration: 8.5, color: 'muted', side: 'left' },
  { icon: Scale, x: '14%', y: '92%', size: 30, delay: 0.3, duration: 6.5, color: 'muted', side: 'right' },
]

export const solutionIcons: FloatingIcon[] = [
  { icon: Leaf, x: '2%', y: '5%', size: 48, delay: 0, duration: 8, color: 'green', side: 'left' },
  { icon: Sparkles, x: '4%', y: '8%', size: 42, delay: 1, duration: 6.5, color: 'gold', side: 'right' },
  { icon: Heart, x: '12%', y: '22%', size: 40, delay: 2, duration: 7, color: 'green', side: 'left' },
  { icon: Zap, x: '15%', y: '25%', size: 38, delay: 0.5, duration: 7.5, color: 'gold', side: 'right' },
  { icon: Apple, x: '3%', y: '40%', size: 44, delay: 0.5, duration: 8.5, color: 'green', side: 'left' },
  { icon: Dumbbell, x: '6%', y: '42%', size: 46, delay: 2.5, duration: 8, color: 'gold', side: 'right' },
  { icon: Cherry, x: '8%', y: '58%', size: 36, delay: 3, duration: 6.5, color: 'green', side: 'left' },
  { icon: Activity, x: '10%', y: '60%', size: 40, delay: 3.5, duration: 7, color: 'gold', side: 'right' },
  { icon: Carrot, x: '2%', y: '75%', size: 42, delay: 1.5, duration: 7.5, color: 'green', side: 'left' },
  { icon: Heart, x: '3%', y: '78%', size: 34, delay: 1.5, duration: 6, color: 'green', side: 'right' },
  { icon: Utensils, x: '14%', y: '90%', size: 34, delay: 2.5, duration: 8, color: 'green', side: 'left' },
  { icon: Leaf, x: '12%', y: '92%', size: 38, delay: 0, duration: 8.5, color: 'green', side: 'right' },
]

export const processIcons: FloatingIcon[] = [
  { icon: Flag, x: '2%', y: '8%', size: 46, delay: 0, duration: 7, color: 'gold', side: 'left' },
  { icon: Activity, x: '6%', y: '10%', size: 42, delay: 0.5, duration: 7.5, color: 'green', side: 'right' },
  { icon: Footprints, x: '14%', y: '25%', size: 40, delay: 1.5, duration: 8, color: 'gold', side: 'left' },
  { icon: Dumbbell, x: '12%', y: '30%', size: 46, delay: 2, duration: 6, color: 'gold', side: 'right' },
  { icon: Route, x: '3%', y: '45%', size: 44, delay: 3, duration: 6.5, color: 'gold', side: 'left' },
  { icon: Timer, x: '4%', y: '50%', size: 38, delay: 3.5, duration: 8, color: 'gold', side: 'right' },
  { icon: CalendarCheck, x: '8%', y: '65%', size: 38, delay: 0.8, duration: 7.5, color: 'green', side: 'left' },
  { icon: Trophy, x: '8%', y: '72%', size: 44, delay: 1, duration: 7, color: 'gold', side: 'right' },
  { icon: BarChart3, x: '2%', y: '85%', size: 42, delay: 2.2, duration: 8.5, color: 'green', side: 'left' },
  { icon: Target, x: '3%', y: '90%', size: 36, delay: 2.5, duration: 6.5, color: 'green', side: 'right' },
]

export const testimonialIcons: FloatingIcon[] = [
  { icon: Star, x: '2%', y: '5%', size: 44, delay: 0, duration: 6, color: 'gold', side: 'left' },
  { icon: Star, x: '5%', y: '10%', size: 40, delay: 2, duration: 7, color: 'gold', side: 'right' },
  { icon: ThumbsUp, x: '10%', y: '20%', size: 38, delay: 1.5, duration: 7, color: 'gold', side: 'left' },
  { icon: Heart, x: '14%', y: '28%', size: 36, delay: 0.5, duration: 6, color: 'green', side: 'right' },
  { icon: Heart, x: '3%', y: '38%', size: 42, delay: 2.5, duration: 8, color: 'green', side: 'left' },
  { icon: Award, x: '4%', y: '45%', size: 44, delay: 3.5, duration: 8, color: 'gold', side: 'right' },
  { icon: Quote, x: '8%', y: '55%', size: 46, delay: 0.5, duration: 6.5, color: 'muted', side: 'left' },
  { icon: ThumbsUp, x: '10%', y: '62%', size: 38, delay: 1.5, duration: 7.5, color: 'gold', side: 'right' },
  { icon: Star, x: '2%', y: '72%', size: 36, delay: 3, duration: 7.5, color: 'gold', side: 'left' },
  { icon: Star, x: '3%', y: '80%', size: 32, delay: 2.5, duration: 6.5, color: 'gold', side: 'right' },
  { icon: MessageCircle, x: '12%', y: '88%', size: 40, delay: 1, duration: 8.5, color: 'green', side: 'left' },
  { icon: Sparkles, x: '8%', y: '92%', size: 34, delay: 0, duration: 7, color: 'gold', side: 'right' },
]

export const trainerIcons: FloatingIcon[] = [
  { icon: Dumbbell, x: '2%', y: '5%', size: 48, delay: 0, duration: 7, color: 'gold', side: 'left' },
  { icon: Salad, x: '4%', y: '8%', size: 44, delay: 1, duration: 6.5, color: 'green', side: 'right' },
  { icon: Users, x: '14%', y: '22%', size: 42, delay: 1.5, duration: 8, color: 'gold', side: 'left' },
  { icon: Apple, x: '12%', y: '28%', size: 40, delay: 2, duration: 7, color: 'green', side: 'right' },
  { icon: Medal, x: '3%', y: '40%', size: 44, delay: 2.5, duration: 6.5, color: 'gold', side: 'left' },
  { icon: Heart, x: '6%', y: '48%', size: 38, delay: 0.5, duration: 8, color: 'green', side: 'right' },
  { icon: Award, x: '8%', y: '58%', size: 40, delay: 0.5, duration: 7.5, color: 'gold', side: 'left' },
  { icon: BadgeCheck, x: '8%', y: '65%', size: 42, delay: 3.5, duration: 7.5, color: 'green', side: 'right' },
  { icon: Flame, x: '2%', y: '78%', size: 36, delay: 3, duration: 8.5, color: 'gold', side: 'left' },
  { icon: Activity, x: '3%', y: '85%', size: 36, delay: 1.5, duration: 6, color: 'gold', side: 'right' },
]

export const insuranceIcons: FloatingIcon[] = [
  { icon: Euro, x: '2%', y: '5%', size: 48, delay: 0, duration: 7, color: 'green', side: 'left' },
  { icon: FileCheck, x: '5%', y: '10%', size: 42, delay: 0.5, duration: 7.5, color: 'green', side: 'right' },
  { icon: ShieldCheck, x: '12%', y: '20%', size: 44, delay: 1.5, duration: 8, color: 'green', side: 'left' },
  { icon: Euro, x: '14%', y: '28%', size: 46, delay: 2, duration: 6, color: 'green', side: 'right' },
  { icon: Coins, x: '3%', y: '38%', size: 40, delay: 2.5, duration: 6.5, color: 'green', side: 'left' },
  { icon: BadgeCheck, x: '4%', y: '45%', size: 40, delay: 3.5, duration: 8, color: 'green', side: 'right' },
  { icon: Receipt, x: '8%', y: '55%', size: 42, delay: 0.8, duration: 7.5, color: 'green', side: 'left' },
  { icon: ShieldCheck, x: '10%', y: '62%', size: 44, delay: 1, duration: 7, color: 'green', side: 'right' },
  { icon: Wallet, x: '2%', y: '72%', size: 38, delay: 3, duration: 8.5, color: 'green', side: 'left' },
  { icon: Coins, x: '3%', y: '82%', size: 36, delay: 2.5, duration: 6.5, color: 'green', side: 'right' },
  { icon: CircleCheck, x: '10%', y: '88%', size: 36, delay: 1, duration: 7, color: 'green', side: 'left' },
]

export const guaranteeIcons: FloatingIcon[] = [
  { icon: ShieldCheck, x: '3%', y: '8%', size: 50, delay: 0, duration: 8, color: 'green', side: 'left' },
  { icon: Handshake, x: '5%', y: '12%', size: 44, delay: 1, duration: 7.5, color: 'green', side: 'right' },
  { icon: Lock, x: '14%', y: '30%', size: 42, delay: 1.5, duration: 7, color: 'green', side: 'left' },
  { icon: BadgeCheck, x: '12%', y: '38%', size: 48, delay: 2, duration: 6, color: 'green', side: 'right' },
  { icon: CircleCheck, x: '2%', y: '52%', size: 46, delay: 2.5, duration: 6.5, color: 'green', side: 'left' },
  { icon: ShieldCheck, x: '4%', y: '60%', size: 42, delay: 3, duration: 8, color: 'green', side: 'right' },
  { icon: Heart, x: '8%', y: '75%', size: 40, delay: 0.5, duration: 7.5, color: 'green', side: 'left' },
  { icon: ThumbsUp, x: '8%', y: '82%', size: 38, delay: 0.5, duration: 7, color: 'green', side: 'right' },
]

export const faqIcons: FloatingIcon[] = [
  { icon: HelpCircle, x: '2%', y: '5%', size: 46, delay: 0, duration: 7, color: 'muted', side: 'left' },
  { icon: Info, x: '5%', y: '10%', size: 40, delay: 0.5, duration: 7.5, color: 'muted', side: 'right' },
  { icon: Lightbulb, x: '14%', y: '22%', size: 42, delay: 1.5, duration: 8, color: 'gold', side: 'left' },
  { icon: Lightbulb, x: '12%', y: '32%', size: 46, delay: 2, duration: 6, color: 'gold', side: 'right' },
  { icon: Search, x: '3%', y: '42%', size: 38, delay: 2.5, duration: 6.5, color: 'muted', side: 'left' },
  { icon: Target, x: '4%', y: '52%', size: 42, delay: 3.5, duration: 8, color: 'green', side: 'right' },
  { icon: BookOpen, x: '8%', y: '60%', size: 44, delay: 0.8, duration: 7.5, color: 'muted', side: 'left' },
  { icon: HelpCircle, x: '10%', y: '72%', size: 36, delay: 1, duration: 7, color: 'muted', side: 'right' },
  { icon: HelpCircle, x: '2%', y: '80%', size: 40, delay: 3, duration: 8.5, color: 'muted', side: 'left' },
  { icon: Sparkles, x: '3%', y: '90%', size: 38, delay: 2.5, duration: 6.5, color: 'gold', side: 'right' },
]

export const ctaIcons: FloatingIcon[] = [
  { icon: Sparkles, x: '3%', y: '10%', size: 48, delay: 0, duration: 6, color: 'green', side: 'left' },
  { icon: Star, x: '5%', y: '15%', size: 46, delay: 1, duration: 7, color: 'gold', side: 'right' },
  { icon: Trophy, x: '15%', y: '30%', size: 44, delay: 1.5, duration: 7, color: 'gold', side: 'left' },
  { icon: Leaf, x: '12%', y: '35%', size: 42, delay: 2, duration: 8, color: 'green', side: 'right' },
  { icon: Heart, x: '2%', y: '50%', size: 42, delay: 2.5, duration: 8, color: 'green', side: 'left' },
  { icon: Flame, x: '4%', y: '55%', size: 40, delay: 3.5, duration: 6, color: 'gold', side: 'right' },
  { icon: Star, x: '8%', y: '70%', size: 40, delay: 0.5, duration: 6.5, color: 'gold', side: 'left' },
  { icon: Target, x: '8%', y: '75%', size: 44, delay: 0.5, duration: 7.5, color: 'green', side: 'right' },
  { icon: Zap, x: '4%', y: '88%', size: 36, delay: 3, duration: 7.5, color: 'gold', side: 'left' },
  { icon: Sparkles, x: '3%', y: '90%', size: 38, delay: 2, duration: 6.5, color: 'gold', side: 'right' },
]
