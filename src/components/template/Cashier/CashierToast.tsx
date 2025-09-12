'use client'

import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
// TODO: analisar se faz sentido esse componente ou se esta no lugar certo ou com o nome certo
export default function CashierToast() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const t = searchParams.get('toast')
    if (!t) return
    const messages: Record<
      string,
      {
        title: string
        description?: string
        variant?: 'default' | 'destructive'
      }
    > = {
      open_success: { title: 'Caixa aberto com sucesso!' },
      open_error: { title: 'Falha ao abrir o caixa', variant: 'destructive' },
      close_success: { title: 'Caixa fechado com sucesso!' },
      close_error: { title: 'Falha ao fechar o caixa', variant: 'destructive' },
    }
    const msg = messages[t]
    if (msg) toast(msg)

    const params = new URLSearchParams(searchParams.toString())
    params.delete('toast')
    router.replace(
      `${pathname}${params.toString() ? `?${params.toString()}` : ''}`,
    )
  }, [searchParams, toast, pathname, router])

  return null
}
