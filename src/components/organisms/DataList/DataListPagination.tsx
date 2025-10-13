import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type DataListPaginationProps = {
  currentPage: number
  totalPages: number
  totalCount: number
  makeHref: (page: number) => string
}

export function DataListPagination({
  currentPage,
  totalPages,
  totalCount,
  makeHref,
}: DataListPaginationProps) {
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  return (
    <nav
      aria-label="Paginação"
      className={cn(
        'flex flex-col text-center gap-3 rounded-2xl border border-slate-200/60 bg-white/60 px-4 py-4 text-sm text-slate-600 shadow-sm',
        'lg:flex-row',
        'md:flex-col',
        'sm:flex-col sm:items-center sm:justify-between',
      )}
    >
      <span>
        Total de <strong>{totalCount}</strong> item(s)
      </span>

      <div
        className={cn(
          'flex flex-wrap flex-col items-center justify-center gap-2',
          'sm:flex-row',
          'md:flex-row',
          'lg:flex-row lg:justify-end',
        )}
      >
        <PaginationLink
          href={makeHref(1)}
          label="Primeira"
          disabled={isFirst}
          className="hidden sm:flex"
        />
        <PaginationLink
          href={makeHref(Math.max(1, currentPage - 1))}
          label="Anterior"
          disabled={isFirst}
        />
        <span className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Página {currentPage} de {totalPages}
        </span>
        <PaginationLink
          href={makeHref(Math.min(totalPages, currentPage + 1))}
          label="Próxima"
          disabled={isLast}
        />
        <PaginationLink
          href={makeHref(totalPages)}
          label="Última"
          disabled={isLast}
          className="hidden sm:flex"
        />
      </div>
    </nav>
  )
}

type PaginationLinkProps = {
  href: string
  label: string
  disabled?: boolean
  className?: string
}

function PaginationLink({
  href,
  label,
  disabled,
  className,
}: PaginationLinkProps) {
  return (
    <Link
      href={href}
      aria-disabled={disabled}
      className={cn(
        buttonVariants({ variant: 'outline', size: 'sm' }),
        'rounded-full px-2 py-0 text-xs font-semibold uppercase tracking-wider transition-all hover:bg-primary/10 hover:text-primary',
        'md:text-xs md:px-4 md:py-2',
        'lg:tracking-[0.2em]',
        disabled && 'pointer-events-none opacity-40',
        className,
      )}
    >
      {label}
    </Link>
  )
}
