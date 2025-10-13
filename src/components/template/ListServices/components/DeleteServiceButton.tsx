'use client'

import { deleteService } from '@/actions/service'
import { buttonVariants } from '@/components/ui/button-variants'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export function DeleteServiceButton({ serviceId }: { serviceId: string }) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

  function handleDelete() {
    const confirmed = window.confirm(
      'Tem certeza que deseja remover este serviço?',
    )
    if (!confirmed) return

    startTransition(async () => {
      const result = await deleteService(serviceId)
      if (!result.ok) {
        toast({
          title: 'Não foi possível remover o serviço',
          description:
            !result.ok && result.error?.message
              ? result.error.message
              : 'Tente novamente mais tarde.',
          variant: 'destructive',
        })
        return
      }

      toast({ title: 'Serviço removido com sucesso' })
      router.refresh()
    })
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className={cn(
        buttonVariants({ variant: 'outline', size: 'sm' }),
        'rounded-full text-destructive border-destructive/40 hover:text-destructive hover:border-destructive',
      )}
    >
      Remover
    </button>
  )
}
