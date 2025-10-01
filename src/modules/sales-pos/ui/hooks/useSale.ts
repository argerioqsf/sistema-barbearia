'use client'

import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { qk } from '@/shared/query-keys'
import type { GetSaleOutput } from '@/modules/sales/application/queries/get-sale'
import type { NormalizedError } from '@/shared/errors/types'
import { showApiErrorToast, showApiSuccessToast } from '@/lib/toast-utils'
import type { AddItemDTO } from '@/modules/sales/application/dto'
import { makeMutationFn, makeQueryFn } from '@/shared/react-query-adapter'
import {
  getSale as getSaleAction,
  addItem as addItemAction,
  removeItem as removeItemAction,
  updateClient as updateClientAction,
  applyCoupon as applyCouponAction,
  removeCoupon as removeCouponAction,
  paySale as paySaleAction,
  updateSaleItemCoupon as updateSaleItemCouponAction,
  updateSaleItemQuantity as updateSaleItemQuantityAction,
  updateSaleItemCustomPrice as updateSaleItemCustomPriceAction,
  updateSaleItemBarber as updateSaleItemBarberAction,
} from '@/modules/sales/application'
import { handleUnauthorized } from '@/shared/auth/handleUnauthorized'

interface AddItemPayload {
  saleId: string
  payload: Omit<AddItemDTO, 'saleId'>
}

interface UpdateItemActionPayload {
  saleId: string
  itemId: string
  payload: Record<string, unknown>
}

export function useSale(saleId: string) {
  const queryClient = useQueryClient()

  const ensureAuthorized = async (error: NormalizedError) => {
    if (error.type === 'http' && error.status === 401) {
      await handleUnauthorized()
      return true
    }
    return false
  }

  const saleQuery = useQuery<GetSaleOutput, NormalizedError>({
    queryKey: qk.sales.byId(saleId),
    queryFn: makeQueryFn(() => getSaleAction(saleId)),
  })

  useEffect(() => {
    if (!saleQuery.error) return
    ensureAuthorized(saleQuery.error).catch(() => undefined)
  }, [saleQuery.error])

  const invalidateSale = () =>
    queryClient.invalidateQueries({ queryKey: qk.sales.byId(saleId) })

  // TODO: Implementar Optimistic Updates para melhorar a responsividade da UI.
  // A ideia é atualizar a UI localmente (via `queryClient.setQueryData`) antes da confirmação do servidor.
  // 1. `onMutate`: Cancela queries, salva o estado anterior e atualiza o cache otimistamente.
  // 2. `onError`: Reverte para o estado anterior em caso de falha na mutação.
  // 3. `onSettled`: Garante a invalidação (`invalidateQueries`) para sincronia final com o backend.
  const getMutationOptions = (successMessage: string) => ({
    onSuccess: () => {
      invalidateSale()
      showApiSuccessToast(successMessage)
    },
    onError: (error: NormalizedError) => {
      ensureAuthorized(error)
        .then((unauthorized) => {
          if (!unauthorized) showApiErrorToast(error.message)
        })
        .catch(() => {
          showApiErrorToast(error.message)
        })
    },
  })

  const addItemMutation = useMutation<
    GetSaleOutput['sale'],
    NormalizedError,
    AddItemPayload
  >({
    mutationFn: makeMutationFn(({ saleId, payload }) =>
      addItemAction({ saleId, ...payload }),
    ),
    ...getMutationOptions('Item adicionado com sucesso'),
  })

  const removeItemMutation = useMutation<
    GetSaleOutput['sale'],
    NormalizedError,
    { saleId: string; itemId: string }
  >({
    mutationFn: makeMutationFn(({ saleId, itemId }) =>
      removeItemAction({ saleId, itemId }),
    ),
    ...getMutationOptions('Item removido com sucesso'),
  })

  const updateSaleClientMutation = useMutation<
    GetSaleOutput['sale'],
    NormalizedError,
    { saleId: string; clientId: string }
  >({
    mutationFn: makeMutationFn(({ saleId, clientId }) =>
      updateClientAction({ saleId, clientId }),
    ),
    ...getMutationOptions('Cliente atualizado com sucesso'),
  })

  const applyCouponMutation = useMutation<
    GetSaleOutput['sale'],
    NormalizedError,
    { saleId: string; couponCode: string }
  >({
    mutationFn: makeMutationFn(({ saleId, couponCode }) =>
      applyCouponAction({ saleId, couponCode }),
    ),
    ...getMutationOptions('Cupom aplicado com sucesso'),
  })

  const removeCouponMutation = useMutation<
    GetSaleOutput['sale'],
    NormalizedError,
    { saleId: string }
  >({
    mutationFn: makeMutationFn(({ saleId }) => removeCouponAction({ saleId })),
    ...getMutationOptions('Cupom removido com sucesso'),
  })

  const paySaleMutation = useMutation<
    GetSaleOutput['sale'],
    NormalizedError,
    { saleId: string; paymentMethod: string }
  >({
    mutationFn: makeMutationFn(({ saleId, paymentMethod }) =>
      paySaleAction({ saleId, paymentMethod }),
    ),
    ...getMutationOptions('Pagamento registrado com sucesso'),
  })

  const updateItemCouponMutation = useMutation<
    GetSaleOutput['sale'],
    NormalizedError,
    UpdateItemActionPayload
  >({
    mutationFn: makeMutationFn(({ itemId, payload }) =>
      updateSaleItemCouponAction({ saleItemId: itemId, ...payload }),
    ),
    ...getMutationOptions('Cupom atualizado com sucesso'),
  })

  const updateItemQuantityMutation = useMutation<
    GetSaleOutput['sale'],
    NormalizedError,
    UpdateItemActionPayload
  >({
    mutationFn: makeMutationFn(({ itemId, payload }) =>
      updateSaleItemQuantityAction({ saleItemId: itemId, ...payload }),
    ),
    ...getMutationOptions('Quantidade atualizada'),
  })

  const updateItemCustomPriceMutation = useMutation<
    GetSaleOutput['sale'],
    NormalizedError,
    UpdateItemActionPayload
  >({
    mutationFn: makeMutationFn(({ itemId, payload }) =>
      updateSaleItemCustomPriceAction({ saleItemId: itemId, ...payload }),
    ),
    ...getMutationOptions('Preço personalizado atualizado'),
  })

  const updateItemBarberMutation = useMutation<
    GetSaleOutput['sale'],
    NormalizedError,
    UpdateItemActionPayload
  >({
    mutationFn: makeMutationFn(({ itemId, payload }) =>
      updateSaleItemBarberAction({ saleItemId: itemId, ...payload }),
    ),
    ...getMutationOptions('Colaborador atualizado'),
  })

  const addItem = (payload: Omit<AddItemDTO, 'saleId'>) =>
    addItemMutation.mutateAsync({ saleId, payload })
  const removeItem = (itemId: string) =>
    removeItemMutation.mutateAsync({ saleId, itemId })
  const updateSaleClient = (clientId: string) =>
    updateSaleClientMutation.mutateAsync({ saleId, clientId })
  const setCustomer = (clientId: string) => updateSaleClient(clientId)
  const applyCoupon = (couponCode: string) =>
    applyCouponMutation.mutateAsync({ saleId, couponCode })
  const removeCoupon = () => removeCouponMutation.mutateAsync({ saleId })
  const paySale = (paymentMethod: string) =>
    paySaleMutation.mutateAsync({ saleId, paymentMethod })
  const updateSaleItemCoupon = (
    itemId: string,
    payload: Record<string, unknown>,
  ) => updateItemCouponMutation.mutateAsync({ saleId, itemId, payload })
  const updateSaleItemQuantity = (itemId: string, quantity: number) =>
    updateItemQuantityMutation.mutateAsync({
      saleId,
      itemId,
      payload: { quantity },
    })
  const updateSaleItemCustomPrice = (
    itemId: string,
    customPrice: number | null,
  ) =>
    updateItemCustomPriceMutation.mutateAsync({
      saleId,
      itemId,
      payload: { customPrice },
    })
  const updateSaleItemBarber = (itemId: string, barberId: string | null) =>
    updateItemBarberMutation.mutateAsync({
      saleId,
      itemId,
      payload: { barberId },
    })

  return {
    sale: saleQuery.data?.sale,
    totals: saleQuery.data?.totals,
    isLoading: saleQuery.isLoading,
    error: saleQuery.error,
    addItem,
    removeItem,
    updateSaleClient,
    setCustomer,
    applyCoupon,
    removeCoupon,
    paySale,
    updateSaleItemCoupon,
    updateSaleItemQuantity,
    updateSaleItemCustomPrice,
    updateSaleItemBarber,
    refetch: saleQuery.refetch,
  }
}
