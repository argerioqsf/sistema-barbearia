import { buttonVariants } from '@/components/ui/button-variants'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { DataListToolbar } from './DataListToolbar'

type DataListSearchFormProps = {
  defaultValue?: string
  placeholder?: string
  searchParamKey?: string
  submitLabel?: string
  clearHref?: string
  extraActions?: ReactNode
}

export function DataListSearchForm({
  defaultValue,
  placeholder = 'Buscar…',
  searchParamKey = 'q',
  submitLabel = 'Filtrar',
  clearHref,
  extraActions,
}: DataListSearchFormProps) {
  return (
    <form>
      <DataListToolbar>
        <div className="flex-1 min-w-0">
          <input
            type="search"
            name={searchParamKey}
            defaultValue={defaultValue}
            placeholder={placeholder}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <button type="submit" className={buttonVariants({ size: 'sm' })}>
            {submitLabel}
          </button>
          {clearHref && (
            <Link
              href={clearHref}
              className={buttonVariants({ variant: 'ghost', size: 'sm' })}
            >
              Limpar
            </Link>
          )}
          {extraActions}
        </div>
      </DataListToolbar>
    </form>
  )
}
