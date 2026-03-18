interface SectionBadgeProps {
  number: string
  label: string
}

export function SectionBadge({ number, label }: SectionBadgeProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="relative">
        <span className="text-5xl md:text-7xl font-extrabold font-barlow-condensed text-accent/[0.30] leading-none select-none">
          {number}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold tracking-[0.3em] text-accent/50 font-mono uppercase">
          Schritt {number}
        </span>
        <span className="text-sm md:text-base font-bold tracking-wider text-foreground uppercase">
          {label}
        </span>
      </div>
    </div>
  )
}
