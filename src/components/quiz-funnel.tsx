'use client'

import { useState } from 'react'
import { Target, Scale, Dumbbell, Zap, Heart, RefreshCw, Pizza, Clock, Frown, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuizOption {
  value: string
  icon: React.ReactNode
  title: string
  description: string
}

interface QuizStep {
  question: string
  subtitle: string
  options: QuizOption[]
  multi?: boolean
}

const quizSteps: QuizStep[] = [
  {
    question: 'Was ist dein Hauptziel?',
    subtitle: 'Das hilft uns, die richtige Empfehlung für dich zu erstellen.',
    options: [
      { value: 'abnehmen', icon: <Scale className="w-6 h-6" />, title: 'Gewicht verlieren', description: 'Überflüssige Kilos loswerden' },
      { value: 'straffen', icon: <Dumbbell className="w-6 h-6" />, title: 'Körper straffen', description: 'Weniger Fett, mehr Definition' },
      { value: 'energie', icon: <Zap className="w-6 h-6" />, title: 'Mehr Energie', description: 'Weniger müde und schlapp' },
      { value: 'gesundheit', icon: <Heart className="w-6 h-6" />, title: 'Gesünder leben', description: 'Langfristig fit bleiben' },
    ]
  },
  {
    question: 'Was hält dich zurück?',
    subtitle: 'Wähle alle Herausforderungen, die du kennst:',
    multi: true,
    options: [
      { value: 'jojo', icon: <RefreshCw className="w-6 h-6" />, title: 'Jo-Jo-Effekt', description: 'Nach Diäten wiege ich mehr' },
      { value: 'hunger', icon: <Pizza className="w-6 h-6" />, title: 'Heißhunger', description: 'Kann Süßes nicht widerstehen' },
      { value: 'zeit', icon: <Clock className="w-6 h-6" />, title: 'Zeitmangel', description: 'Kaum Zeit für Sport' },
      { value: 'motivation', icon: <Frown className="w-6 h-6" />, title: 'Motivation fehlt', description: 'Gebe schnell auf' },
    ]
  },
  {
    question: 'Wie viel Zeit kannst du investieren?',
    subtitle: 'Sei ehrlich – wir finden einen Plan, der zu dir passt.',
    options: [
      { value: 'wenig', icon: <Clock className="w-6 h-6" />, title: '1-2 Stunden pro Woche', description: 'Wenig Zeit, aber will Ergebnisse' },
      { value: 'mittel', icon: <Clock className="w-6 h-6" />, title: '2-3 Stunden pro Woche', description: 'Kann mir regelmäßig Zeit nehmen' },
      { value: 'viel', icon: <Clock className="w-6 h-6" />, title: '4+ Stunden pro Woche', description: 'Bin bereit durchzustarten' },
    ]
  },
  {
    question: 'Wie bereit bist du für Veränderung?',
    subtitle: 'Ehrlichkeit hilft uns, die richtige Empfehlung zu geben.',
    options: [
      { value: 'unsicher', icon: <Target className="w-6 h-6" />, title: 'Noch unsicher', description: 'Ich informiere mich erstmal' },
      { value: 'bereit', icon: <Target className="w-6 h-6" />, title: 'Bereit anzufangen', description: 'Ich will jetzt etwas ändern' },
      { value: 'entschlossen', icon: <Target className="w-6 h-6" />, title: 'Voll entschlossen', description: 'Diesmal ziehe ich es durch!' },
    ]
  },
]

interface QuizFunnelProps {
  onComplete: () => void
}

export function QuizFunnel({ onComplete }: QuizFunnelProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  
  const step = quizSteps[currentStep]
  const progress = ((currentStep + 1) / quizSteps.length) * 100
  
  const handleSelect = (value: string) => {
    if (step.multi) {
      const current = (answers[currentStep] as string[]) || []
      if (current.includes(value)) {
        setAnswers({ ...answers, [currentStep]: current.filter(v => v !== value) })
      } else {
        setAnswers({ ...answers, [currentStep]: [...current, value] })
      }
    } else {
      setAnswers({ ...answers, [currentStep]: value })
    }
  }
  
  const isSelected = (value: string) => {
    const answer = answers[currentStep]
    if (Array.isArray(answer)) return answer.includes(value)
    return answer === value
  }
  
  const canContinue = () => {
    const answer = answers[currentStep]
    if (!answer) return false
    if (Array.isArray(answer)) return answer.length > 0
    return true
  }
  
  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }
  
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Frage {currentStep + 1} von {quizSteps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Question */}
      <div className="text-center mb-8 animate-fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          {step.question.split(' ').map((word, i) => (
            <span key={i} className={word.includes('Hauptziel') || word.includes('zurück') || word.includes('Zeit') || word.includes('bereit') ? 'text-primary' : ''}>
              {word}{' '}
            </span>
          ))}
        </h2>
        <p className="text-muted-foreground">{step.subtitle}</p>
      </div>
      
      {/* Options */}
      <div className="grid gap-3 mb-8">
        {step.options.map((option, i) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={cn(
              'feature-card corner-decorator p-4 text-left transition-all duration-300 flex items-center gap-4',
              'hover:border-primary/50 cursor-pointer',
              isSelected(option.value) && 'border-primary bg-primary/5'
            )}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <span className="corner-bl absolute -bottom-px -left-px w-2 h-2 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100" />
            <span className="corner-br absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100" />
            
            {/* Radio/Checkbox */}
            <div className={cn(
              'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
              isSelected(option.value) ? 'border-primary bg-primary' : 'border-muted-foreground/30'
            )}>
              {isSelected(option.value) && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
            </div>
            
            {/* Icon */}
            <div className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
              isSelected(option.value) ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'
            )}>
              {option.icon}
            </div>
            
            {/* Text */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{option.title}</h3>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
          </button>
        ))}
      </div>
      
      {/* Navigation */}
      <div className="flex gap-4">
        {currentStep > 0 && (
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Zurück
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canContinue()}
          className={cn(
            'btn-primary flex-1 flex items-center justify-center gap-2',
            !canContinue() && 'opacity-50 cursor-not-allowed'
          )}
        >
          {currentStep < quizSteps.length - 1 ? 'Weiter' : 'Ergebnis anzeigen'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
