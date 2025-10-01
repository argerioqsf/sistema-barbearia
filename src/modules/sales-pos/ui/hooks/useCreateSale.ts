'use client'

import { useMutation } from '@tanstack/react-query'
import { showApiErrorToast, showApiSuccessToast } from '@/lib/toast-utils'
import { makeMutationFn } from '@/shared/react-query-adapter'
import type { NormalizedError } from '@/shared/errors/types'
import { createSale } from '@/modules/sales/application'
import { handleUnauthorized } from '@/shared/auth/handleUnauthorized'

export function useCreateSale() {
  return useMutation({
    mutationFn: makeMutationFn(createSale),
    onSuccess: () => showApiSuccessToast('Venda criada com sucesso'),
    onError: async (error: NormalizedError) => {
      if (error.type === 'http' && error.status === 401) {
        await handleUnauthorized()
        return
      }
      showApiErrorToast(error.message ?? 'Não foi possível criar a venda')
    },
  })
}
