import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type DataListColumn<T> = {
  key: keyof T | 'actions'
  header: ReactNode
  className?: string
  render?: (item: T) => ReactNode
  align?: 'left' | 'center' | 'right'
  hideOnMobile?: boolean
}

type DataListTableProps<T> = {
  items: T[]
  columns: DataListColumn<T>[]
  getRowId: (item: T, index: number) => string
  emptyState?: ReactNode
  tableClassName?: string
  headClassName?: string
  bodyClassName?: string
}

function getAlignmentClass(align?: 'left' | 'center' | 'right') {
  switch (align) {
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    default:
      return 'text-left'
  }
}

function renderValue(value: ReactNode): ReactNode {
  if (value === null || value === undefined || value === '') {
    return '—'
  }
  if (Array.isArray(value)) {
    return <div className="flex flex-wrap items-center gap-2">{value}</div>
  }
  return value
}

export function DataListTable<T>({
  items,
  columns,
  getRowId,
  emptyState,
  tableClassName,
  headClassName,
  bodyClassName,
}: DataListTableProps<T>) {
  if (items.length === 0) {
    return <>{emptyState}</>
  }

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table
          className={cn(
            'w-full border-collapse text-sm text-slate-600',
            tableClassName,
          )}
        >
          <thead className={cn('border-b border-slate-200', headClassName)}>
            <tr className="text-xs uppercase tracking-[0.18em] text-slate-400">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    'px-4 py-3 font-semibold',
                    getAlignmentClass(column.align),
                    column.hideOnMobile && 'hidden md:table-cell',
                    column.className,
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={cn('divide-y divide-slate-100', bodyClassName)}>
            {items.map((item, index) => (
              <tr
                key={getRowId(item, index)}
                className="transition-colors hover:bg-slate-50/70"
              >
                {columns.map((column) => {
                  console.log('item: ', item)
                  console.log('column: ', column.key)
                  const alignClass = getAlignmentClass(column.align)
                  const rawValue =
                    column.render?.(item) ??
                    (column.key !== 'actions' && String(item[column.key]))

                  return (
                    <td
                      key={String(column.key)}
                      className={cn(
                        'px-4 py-3',
                        alignClass,
                        column.hideOnMobile && 'hidden md:table-cell',
                        column.className,
                      )}
                    >
                      {renderValue(rawValue)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {items.map((item, index) => (
          <article
            key={getRowId(item, index)}
            className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm"
          >
            <dl className="divide-y divide-slate-100">
              {columns.map((column, columnIndex) => {
                if (column.hideOnMobile) {
                  return null
                }

                const value =
                  column.render?.(item) ??
                  (column.key !== 'actions' && String(item[column.key]))
                const isActions = column.key === 'actions'

                return (
                  <div
                    key={`${String(column.key)}-${columnIndex}`}
                    className="flex flex-col gap-2 px-4 py-3"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {column.header}
                    </span>
                    <div
                      className={cn(
                        'text-sm text-slate-700',
                        isActions && 'flex flex-wrap gap-2 text-primary-600',
                      )}
                    >
                      {renderValue(value)}
                    </div>
                  </div>
                )
              })}
            </dl>
          </article>
        ))}
      </div>
    </>
  )
}
