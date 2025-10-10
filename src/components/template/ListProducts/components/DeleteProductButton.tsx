'use client'

import { deleteProduct } from '@/actions/product'
import { buttonVariants } from '@/components/ui/button-variants'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { cn } from '@/lib/utils'

type DeleteProductButtonProps = {
  productId: string
}

export function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

  function handleDelete() {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja remover este produto?',
    )
    if (!confirmDelete) return

    startTransition(async () => {
      const result = await deleteProduct(productId)
      if (!result.ok) {
        toast({
          title: 'Não foi possível remover o produto',
          description: result.errors?.request ?? 'Tente novamente mais tarde.',
          variant: 'destructive',
        })
        return
      }

      toast({ title: 'Produto removido com sucesso' })
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
