'use client'

import { Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    text: 'Nach Jahren des Scheiterns hat mir die Körperanalyse endlich gezeigt, woran es lag. Jetzt esse ich mehr als vorher – und nehme trotzdem ab!',
    name: 'Sandra K.',
    age: 42,
    result: '-8 kg in 8 Wochen',
    image: 'https://www.figurscout.de/assets/images/f/Claudia%20S-4ca75631.webp',
  },
  {
    text: 'Ich war skeptisch, aber die Zahlen lügen nicht. Bei der Zwischen-Analyse hatte ich schon 4 kg weniger – das hat mich so motiviert!',
    name: 'Thomas M.',
    age: 48,
    result: '-11 kg in 8 Wochen',
    image: 'https://www.figurscout.de/assets/images/8/Bernd%20B.-69fad676.webp',
  },
  {
    text: 'Endlich ein Konzept, das zu meinem Alltag passt. 2x 30 Minuten pro Woche – mehr brauche ich nicht. Und die Ergebnisse sprechen für sich.',
    name: 'Marion H.',
    age: 55,
    result: '-6 kg, 2 Kleidergrößen',
    image: 'https://www.figurscout.de/assets/images/f/Monika%20M-c852dd19.webp',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-sm text-accent uppercase tracking-widest font-semibold">Echte Ergebnisse</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Was unsere <span className="text-primary">Teilnehmer</span> sagen
          </h2>
        </div>
        
        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i}
              className="feature-card corner-decorator p-6 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="corner-bl absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
              <span className="corner-br absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />
              
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              
              {/* Text */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {testimonial.text}
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}, {testimonial.age}</h4>
                  <p className="text-sm text-primary font-medium">{testimonial.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
