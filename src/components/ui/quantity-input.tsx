'use client'

import * as React from 'react'
import { Plus, Minus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface QuantityInputProps {
  value: number
  onChange: (value: number) => void
  className?: string
  disabled?: boolean
}

const QuantityInput = React.forwardRef<HTMLDivElement, QuantityInputProps>(
  ({ value, onChange, className, disabled }, ref) => {
    const handleIncrement = () => {
      onChange(value + 1)
    }

    const handleDecrement = () => {
      if (value > 1) {
        onChange(value - 1)
      }
    }

    return (
      <div className={cn('flex items-center gap-2', className)} ref={ref}>
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecrement}
          className="h-8 w-8 rounded-full"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-8 w-14 pl-2 rounded-md border text-center"
          disabled={disabled}
        />
        <Button
          size="icon"
          variant="outline"
          onClick={handleIncrement}
          className="h-8 w-8 rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    )
  },
)

QuantityInput.displayName = 'QuantityInput'

export { QuantityInput }
