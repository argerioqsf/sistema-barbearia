'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export type ComboboxOption<T> = {
  value: T
  label: string
}

interface ComboboxProps<T> {
  options: ComboboxOption<T>[]
  value?: T
  onValueChange: (value: T | '') => void
  placeholder?: string
  searchPlaceholder?: string
  emptyPlaceholder?: string
  disabled?: boolean
}

export function Combobox<T>({
  options,
  value,
  onValueChange,
  placeholder = 'Selecione uma opção...',
  searchPlaceholder = 'Busque uma opção...',
  emptyPlaceholder = 'Nenhuma opção encontrada.',
  disabled = false,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false)

  const selectedOption = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
            <CommandGroup>
              {options.map((option, idx) => (
                <CommandItem
                  key={idx}
                  value={option.label} // value is used for filtering
                  onSelect={() => {
                    console.log('onSelect')
                    onValueChange(option.value === value ? '' : option.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
