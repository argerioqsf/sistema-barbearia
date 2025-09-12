import { LimitColsGrid } from '@/types/general'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import grid from '../../../constants/grid.json'

type BoxProps = {
  children: ReactNode
  className?: string
  cols?: LimitColsGrid
  row?: LimitColsGrid
}

const Box = ({ children, className, cols = 1, row = 1 }: BoxProps) => {
  return (
    <div
      className={twMerge(
        grid.colSpan[cols - 1],
        grid.gridCols[cols - 1],
        grid.rowSpan[row - 1],
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Box
