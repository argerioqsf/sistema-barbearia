'use client'

import * as React from 'react'
import { Input, type InputProps } from '@/components/ui/input'

interface CurrencyInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  value: number | null | undefined
  onValueChange: (value: number | undefined) => void
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onValueChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState('')

    React.useEffect(() => {
      const formatted = formatCurrency(value)
      setDisplayValue(formatted)
    }, [value])

    const formatCurrency = (numberValue: number | null | undefined) => {
      if (numberValue === null || numberValue === undefined) return ''
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(numberValue)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, '')
      if (rawValue === '') {
        onValueChange(undefined)
        setDisplayValue('')
        return
      }
      const newValue = parseInt(rawValue, 10) / 100
      onValueChange(newValue)
      const formatted = formatCurrency(newValue)
      setDisplayValue(formatted)
    }

    return (
      <Input
        ref={ref}
        value={displayValue}
        onChange={handleInputChange}
        {...props}
      />
    )
  },
)

CurrencyInput.displayName = 'CurrencyInput'

export { CurrencyInput }
