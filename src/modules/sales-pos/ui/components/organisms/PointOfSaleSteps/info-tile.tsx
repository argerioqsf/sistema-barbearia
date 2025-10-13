import { cn } from '@/lib/utils'

type InfoTileProps = {
  label: string
  value: string
  highlight?: boolean
}

export function InfoTile({ label, value, highlight = false }: InfoTileProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4 py-4 shadow-sm transition-transform',
        highlight &&
          'border-emerald-300/80 bg-emerald-50/70 text-emerald-700 shadow-emerald-200/40',
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  )
}
