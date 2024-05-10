'use client'

import { ListAction } from '@/types/general'
import { Dispatch, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'
import DotAction from '../DotAction'

type DropDownDotsProps<T> = {
  listActions: Array<ListAction<T>>
  className?: string
  id?: string
  setShowDot: Dispatch<SetStateAction<string>>
  showDot: string
}

export default function DropDownDots<T>({
  listActions,
  className,
  id,
  setShowDot,
  showDot,
}: DropDownDotsProps<T>) {
  return (
    <div className={className}>
      <button
        id="dropdownMenuIconButton"
        onClick={() =>
          setShowDot(
            id ? (showDot?.length > 0 && showDot === id ? '' : id) : '',
          )
        }
        data-dropdown-toggle="dropdownDots"
        className="inline-flex rounded-full items-center p-2 text-sm font-medium text-center text-gray-900 bg-white hover:bg-secondary-50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-secondary-50 dark:hover:bg-prim dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>

      <div
        id="dropdownDots"
        className={twMerge(
          showDot === id ? 'flex' : 'hidden',
          'absolute top-6 right-16',
          'z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-secondary-50 dark:divide-gray-600',
        )}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconButton"
        >
          {listActions.map((action) => (
            <li key={action.id}>
              <DotAction
                name={action.name}
                href={action.href ? `${action.href}${id}` : undefined}
                onClick={action.onclick?.bind(null, id)}
                toastInfo={action.toast}
                alertInfo={action.alert}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
