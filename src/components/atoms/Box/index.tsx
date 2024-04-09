import { LimitColsGrid } from '@/types/general'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type BoxProps = {
  children: ReactNode
  className?: string
  cols?: LimitColsGrid
}

const Box = ({ children, className, cols = 1 }: BoxProps) => {
  const gridCols = [
    'grid grid-cols-1 gap-6 md:grid-cols-1',
    'grid grid-cols-1 gap-6 md:grid-cols-2',
    'grid grid-cols-1 gap-6 md:grid-cols-3',
    'grid grid-cols-1 gap-6 md:grid-cols-4',
    'grid grid-cols-1 gap-6 md:grid-cols-5',
    'grid grid-cols-1 gap-6 md:grid-cols-6',
    'grid grid-cols-1 gap-6 md:grid-cols-7',
    'grid grid-cols-1 gap-6 md:grid-cols-8',
    'grid grid-cols-1 gap-6 md:grid-cols-9',
    'grid grid-cols-1 gap-6 md:grid-cols-10',
    'grid grid-cols-1 gap-6 md:grid-cols-11',
    'grid grid-cols-1 gap-6 md:grid-cols-12',
  ]
  return (
    <div className={twMerge(gridCols[cols - 1], className)}>{children}</div>
  )
}

export default Box
