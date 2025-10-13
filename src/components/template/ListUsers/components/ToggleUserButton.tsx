'use client'

import { toggleCollaboratorStatusAction } from '@/actions/user'
import { buttonVariants } from '@/components/ui/button-variants'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

type ToggleUserButtonProps = {
  userId: string
  active: boolean
}

export function ToggleUserButton({ userId, active }: ToggleUserButtonProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleCollaboratorStatusAction(userId, active)
      if (!result.ok) {
        toast({
          title: 'Não foi possível atualizar o usuário',
          description: result.error?.message ?? 'Tente novamente mais tarde.',
          variant: 'destructive',
        })
        return
      }

      toast({ title: active ? 'Usuário desativado' : 'Usuário ativado' })
      router.refresh()
    })
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        buttonVariants({ variant: 'outline', size: 'sm' }),
        'rounded-full',
        active
          ? 'text-destructive border-destructive/40 hover:border-destructive'
          : 'text-emerald-600 border-emerald-300 hover:border-emerald-500',
      )}
    >
      {active ? 'Desativar' : 'Ativar'}
    </button>
  )
}
