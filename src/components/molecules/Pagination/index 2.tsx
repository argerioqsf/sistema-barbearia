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
}

export function Pagintaion({
  pageIndex,
  totalCount,
  perPage,
}: PagintaionProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between bg-amber-300">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Pagina {pageIndex + 1} de {pages}
        </div>
        <div className="flx items-center gap-2">
          <Button>
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button>
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Ultima página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
