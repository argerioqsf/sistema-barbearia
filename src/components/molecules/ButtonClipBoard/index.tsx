'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface ButtonClipBoardProps {
  label: string
  value: string
  textToast: string
}

export function ButtonClipBoard({
  label,
  value,
  textToast,
}: ButtonClipBoardProps) {
  const { toast } = useToast()
  function copyValue() {
    navigator.clipboard.writeText(value)
    toast({
      title: textToast,
    })
  }
  return <Button onClick={copyValue}>{label}</Button>
}
