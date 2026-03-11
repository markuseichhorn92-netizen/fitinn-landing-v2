'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Target, RefreshCw, Pizza, Clock, Frown, CheckCircle2, Flame, ThumbsUp, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuizData {
  goal: string
  problems: string[]
  time: string
  commitment: string
  insurance: string
  insuranceAmount: number
}

const INSURANCE_VALUES: Record<string, number> = {
  'aok-rlp': 179, 'viactiv': 179, 'mobil': 179, 'bkk-vbu': 179, 'salus': 179,
  'aok-hessen': 150, 'ikk-sw': 150, 'vivida': 150,
  'tk': 143.20, 'big': 120, 'barmer': 100, 'sbk': 100,
  'ikk-classic': 90, 'aok-bw': 80, 'dak': 75, 'andere': 100
}

export function QuizFunnel({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<QuizData>({
    goal: '', problems: [], time: '', commitment: '', insurance: '', insuranceAmount: 0
  })

  const totalSteps = 6

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const selectGoal = (goal: string) => {
    setData(d => ({ ...d, goal }))
  }

  const toggleProblem = (problem: string) => {
    setData(d => ({
      ...d,
      problems: d.problems.includes(problem)
        ? d.problems.filter(p => p !== problem)
        : [...d.problems, problem]
    }))
  }

  const selectTime = (time: string) => setData(d => ({ ...d, time }))
  const selectCommitment = (commitment: string) => setData(d => ({ ...d, commitment }))
  const selectInsurance = (insurance: string) => {
    setData(d => ({ ...d, insurance, insuranceAmount: INSURANCE_VALUES[insurance] || 100 }))
  }

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Schritt {step} von {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Goal */}
      {step === 1 && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Was ist dein <span className="text-primary">Hauptziel</span>?
            </h2>
            <p className="text-muted-foreground">Das hilft uns, die richtige Empfehlung für dich zu erstellen.</p>
          </div>

          <div className="grid gap-3 max-w-lg mx-auto">
            {[
              { value: 'abnehmen', icon: '⚖️', title: 'Gewicht verlieren', desc: 'Überflüssige Kilos loswerden' },
              { value: 'straffen', icon: '💪', title: 'Körper straffen', desc: 'Weniger Fett, mehr Definition' },
              { value: 'energie', icon: '⚡', title: 'Mehr Energie', desc: 'Weniger müde und schlapp' },
              { value: 'gesundheit', icon: '❤️', title: 'Gesünder leben', desc: 'Langfristig fit bleiben' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => selectGoal(option.value)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
                  data.goal === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 bg-card"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                  data.goal === option.value ? "border-primary bg-primary" : "border-muted-foreground"
                )}>
                  {data.goal === option.value && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                </div>
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <h3 className="font-semibold">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={nextStep}
              disabled={!data.goal}
              className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Weiter <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Problems */}
      {step === 2 && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Was <span className="text-destructive">hält dich zurück</span>?
            </h2>
            <p className="text-muted-foreground">Wähle alle Herausforderungen, die du kennst:</p>
          </div>

          <div className="grid gap-3 max-w-lg mx-auto">
            {[
              { value: 'jojo', icon: RefreshCw, title: 'Jo-Jo-Effekt', desc: 'Nach Diäten wiege ich mehr' },
              { value: 'hunger', icon: Pizza, title: 'Heißhunger', desc: 'Kann Süßes nicht widerstehen' },
              { value: 'zeit', icon: Clock, title: 'Zeitmangel', desc: 'Kaum Zeit für Sport' },
              { value: 'motivation', icon: Frown, title: 'Motivation fehlt', desc: 'Gebe schnell auf' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => toggleProblem(option.value)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
                  data.problems.includes(option.value)
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 bg-card"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
                  data.problems.includes(option.value) ? "border-primary bg-primary" : "border-muted-foreground"
                )}>
                  {data.problems.includes(option.value) && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                </div>
                <option.icon className="w-6 h-6 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Mini Testimonial */}
          <div className="mt-6 p-4 bg-card border border-border rounded-xl flex items-start gap-4 max-w-lg mx-auto">
            <img 
              src="https://www.figurscout.de/assets/images/8/Bernd%20B.-69fad676.webp" 
              alt="Thomas K." 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-muted-foreground italic">
                "Genau diese Probleme hatte ich auch. Die Körperanalyse hat mir gezeigt, dass mein Körper anders funktioniert als ich dachte."
              </p>
              <p className="text-sm font-semibold mt-1">Thomas K. <span className="text-primary">• -9 kg</span></p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button onClick={prevStep} className="px-6 py-3 text-muted-foreground hover:text-foreground flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Zurück
            </button>
            <button onClick={nextStep} className="btn-primary inline-flex items-center gap-2">
              Weiter <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Transformation */}
      {step === 3 && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              So kann deine <span className="text-primary">Transformation</span> aussehen
            </h2>
            <p className="text-muted-foreground">Das erleben unsere Teilnehmer typischerweise:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Before */}
            <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/30">
              <div className="text-sm font-semibold text-destructive uppercase tracking-wider mb-4">Vorher</div>
              <div className="text-4xl mb-4">😔</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="text-destructive">✗</span> Ständig müde & antriebslos</li>
                <li className="flex items-center gap-2"><span className="text-destructive">✗</span> Kleidung sitzt nicht mehr</li>
                <li className="flex items-center gap-2"><span className="text-destructive">✗</span> Heißhunger-Attacken</li>
                <li className="flex items-center gap-2"><span className="text-destructive">✗</span> Frustriert von Diäten</li>
              </ul>
            </div>

            {/* After */}
            <div className="p-6 rounded-xl bg-primary/10 border border-primary/30">
              <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Nach 8 Wochen</div>
              <div className="text-4xl mb-4">😊</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Voller Energie</li>
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Kleidung sitzt wieder</li>
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Kontrolliertes Essverhalten</li>
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Stolz auf dich selbst</li>
              </ul>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-xl max-w-2xl mx-auto">
            <p className="text-sm text-center">
              <span className="font-semibold text-primary">💡 Das ist möglich:</span>{' '}
              93% unserer Teilnehmer berichten von deutlich mehr Energie bereits nach 2 Wochen.
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button onClick={prevStep} className="px-6 py-3 text-muted-foreground hover:text-foreground flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Zurück
            </button>
            <button onClick={nextStep} className="btn-primary inline-flex items-center gap-2">
              Das will ich auch! <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Time */}
      {step === 4 && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Wie viel <span className="text-primary">Zeit</span> kannst du investieren?
            </h2>
            <p className="text-muted-foreground">Sei ehrlich – wir finden einen Plan, der zu dir passt.</p>
          </div>

          <div className="grid gap-3 max-w-lg mx-auto">
            {[
              { value: 'wenig', icon: '⏱️', title: '1-2 Stunden pro Woche', desc: 'Wenig Zeit, aber will Ergebnisse' },
              { value: 'mittel', icon: '📅', title: '2-3 Stunden pro Woche', desc: 'Kann mir regelmäßig Zeit nehmen' },
              { value: 'viel', icon: '💯', title: '4+ Stunden pro Woche', desc: 'Bin bereit durchzustarten' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => selectTime(option.value)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
                  data.time === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 bg-card"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                  data.time === option.value ? "border-primary bg-primary" : "border-muted-foreground"
                )}>
                  {data.time === option.value && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                </div>
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <h3 className="font-semibold">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Mini Testimonial */}
          <div className="mt-6 p-4 bg-card border border-border rounded-xl flex items-start gap-4 max-w-lg mx-auto">
            <img 
              src="https://www.figurscout.de/assets/images/d/Lydia%20W.%20nachher-kleiner-f115509b.webp" 
              alt="Sarah B." 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-muted-foreground italic">
                "Als Mutter von 2 Kindern habe ich wenig Zeit. 2x 30 Min pro Woche sind machbar – und die Ergebnisse sind unglaublich!"
              </p>
              <p className="text-sm font-semibold mt-1">Sarah B. <span className="text-primary">• -7 kg</span></p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button onClick={prevStep} className="px-6 py-3 text-muted-foreground hover:text-foreground flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Zurück
            </button>
            <button 
              onClick={nextStep}
              disabled={!data.time}
              className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Weiter <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Commitment */}
      {step === 5 && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Wie <span className="text-primary">bereit</span> bist du für Veränderung?
            </h2>
            <p className="text-muted-foreground">Ehrlichkeit hilft uns, die richtige Empfehlung zu geben.</p>
          </div>

          <div className="grid gap-3 max-w-lg mx-auto">
            {[
              { value: 'unsicher', icon: HelpCircle, title: 'Noch unsicher', desc: 'Ich informiere mich erstmal' },
              { value: 'bereit', icon: ThumbsUp, title: 'Bereit anzufangen', desc: 'Ich will jetzt etwas ändern' },
              { value: 'entschlossen', icon: Flame, title: 'Voll entschlossen', desc: 'Diesmal ziehe ich es durch!' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => selectCommitment(option.value)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
                  data.commitment === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 bg-card"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                  data.commitment === option.value ? "border-primary bg-primary" : "border-muted-foreground"
                )}>
                  {data.commitment === option.value && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                </div>
                <option.icon className="w-6 h-6 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button onClick={prevStep} className="px-6 py-3 text-muted-foreground hover:text-foreground flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Zurück
            </button>
            <button 
              onClick={nextStep}
              disabled={!data.commitment}
              className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Weiter <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Insurance & Result */}
      {step === 6 && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Dein <span className="text-primary">persönliches Ergebnis</span>
            </h2>
          </div>

          {/* Progress Graph */}
          <div className="p-6 bg-card border border-border rounded-xl max-w-2xl mx-auto mb-6">
            <h4 className="text-center font-semibold mb-4">Typischer Gewichtsverlauf über 8 Wochen</h4>
            <div className="flex items-end justify-between gap-2 h-32 px-4">
              {[100, 97, 94, 91, 89, 87, 85, 83].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-primary to-emerald-400 rounded-t transition-all duration-500"
                    style={{ height: `${height}%`, animationDelay: `${i * 0.1}s` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2 px-4">
              <span>Start</span>
              <span>W2</span>
              <span>W4</span>
              <span>W6</span>
              <span>W8</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">-6 kg</div>
                <div className="text-xs text-muted-foreground">Durchschnitt</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">-4%</div>
                <div className="text-xs text-muted-foreground">Körperfett</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">+2 kg</div>
                <div className="text-xs text-muted-foreground">Muskelmasse</div>
              </div>
            </div>
          </div>

          {/* Insurance Calculator */}
          <div className="p-6 bg-primary/10 border-2 border-primary rounded-xl max-w-lg mx-auto mb-6">
            <h4 className="text-center font-semibold mb-2">💰 Was erstattet deine Krankenkasse?</h4>
            <select 
              value={data.insurance}
              onChange={(e) => selectInsurance(e.target.value)}
              className="w-full p-4 rounded-xl bg-card border border-border text-foreground cursor-pointer"
            >
              <option value="">— Wähle deine Krankenkasse —</option>
              <option value="aok-rlp">AOK Rheinland-Pfalz (179€)</option>
              <option value="viactiv">VIACTIV (179€)</option>
              <option value="mobil">Mobil Krankenkasse (179€)</option>
              <option value="tk">Techniker TK (143,20€)</option>
              <option value="barmer">BARMER (100€)</option>
              <option value="dak">DAK (75€)</option>
              <option value="andere">Andere Krankenkasse (~100€)</option>
            </select>

            {data.insuranceAmount > 0 && (
              <div className="mt-4 p-4 bg-card rounded-xl text-center animate-scale-in">
                {data.insuranceAmount >= 179 ? (
                  <>
                    <div className="text-3xl font-bold text-primary">🎉 Komplett kostenlos!</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Deine Krankenkasse erstattet die vollen 179€.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-primary">
                      Nur {179 - data.insuranceAmount}€ Eigenanteil
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Deine Krankenkasse erstattet {data.insuranceAmount}€ von 179€.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button onClick={prevStep} className="px-6 py-3 text-muted-foreground hover:text-foreground flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Zurück
            </button>
            <button 
              onClick={onComplete}
              className="btn-cta inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Jetzt Probetraining buchen <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
