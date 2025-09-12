import { Button } from '@/components/atoms'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

export interface PagintaionProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagintaion({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PagintaionProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex} de {pages}
        </div>

        <div className="flx items-center gap-2">
          <Button
            className="rounded-md border border-zinc-300 p-2 mr-1"
            onClick={() => onPageChange(1)}
            disabled={pageIndex === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button
            className="rounded-md border border-zinc-300 p-2 mr-1"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button
            className="rounded-md border border-zinc-300 p-2 mr-1"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pages <= pageIndex}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button
            className="rounded-md border border-zinc-300 p-2"
            onClick={() => onPageChange(pages)}
            disabled={pages <= pageIndex}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Ultima página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
