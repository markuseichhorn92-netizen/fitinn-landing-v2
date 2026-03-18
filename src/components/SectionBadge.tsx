interface SectionBadgeProps {
  number: string
  label: string
}

export function SectionBadge({ number, label }: SectionBadgeProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-sm font-bold tracking-widest text-accent/60 font-mono">
        {number}
      </span>
      <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  )
}
