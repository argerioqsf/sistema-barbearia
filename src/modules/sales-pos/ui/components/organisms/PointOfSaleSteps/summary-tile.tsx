import { cn } from '@/lib/utils'

type SummaryTileProps = {
  label: string
  value: string
  description?: string
  emphasize?: boolean
}

export function SummaryTile({
  label,
  value,
  description,
  emphasize = false,
}: SummaryTileProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm transition-transform',
        emphasize &&
          'border-primary/70 bg-primary/5 text-primary shadow-primary/10',
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-base font-semibold text-slate-900">{value}</p>
      {description && (
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      )}
    </div>
  )
}
