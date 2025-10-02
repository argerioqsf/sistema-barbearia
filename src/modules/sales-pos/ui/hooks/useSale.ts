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
  updatePaymentMethod as updatePaymentMethodAction,
} from '@/modules/sales/application'
import { handleUnauthorized } from '@/shared/auth/handleUnauthorized'
import { PaymentMethod } from '@/features/sales/schemas'

interface AddItemPayload {
  saleId: string
  payload: Omit<AddItemDTO, 'saleId'>
}

interface UpdateItemActionPayload {
  saleId: string
  itemId: string
  payload: Record<string, unknown>
}

interface UpdateQuantityContext {
  previousSale?: GetSaleOutput
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
    { saleId: string; method: PaymentMethod }
  >({
    mutationFn: makeMutationFn(({ saleId, method }) =>
      paySaleAction({ saleId, method }),
    ),
    ...getMutationOptions('Pagamento registrado com sucesso'),
  })

  const updatePaymentMethodMutation = useMutation<
    GetSaleOutput['sale'],
    NormalizedError,
    { saleId: string; method: PaymentMethod }
  >({
    mutationFn: makeMutationFn(({ saleId, method }) =>
      updatePaymentMethodAction({ saleId, method }),
    ),
    ...getMutationOptions('Método de pagamento atualizado com sucesso'),
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
    { itemId: string; quantity: number },
    UpdateQuantityContext
  >({
    mutationFn: makeMutationFn(({ itemId, quantity }) =>
      updateSaleItemQuantityAction({ saleItemId: itemId, quantity }),
    ),
    ...getMutationOptions('Quantidade atualizada com sucesso'),
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
  const paySale = (method: PaymentMethod) =>
    paySaleMutation.mutateAsync({ saleId, method })
  const setPaymentMethod = (method: PaymentMethod) =>
    updatePaymentMethodMutation.mutateAsync({ saleId, method })

  const updateSaleItemCoupon = (
    itemId: string,
    payload: Record<string, unknown>,
  ) => updateItemCouponMutation.mutateAsync({ saleId, itemId, payload })
  const updateSaleItemQuantity = (itemId: string, quantity: number) =>
    updateItemQuantityMutation.mutateAsync({
      itemId,
      quantity,
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
    setPaymentMethod,
    updateSaleItemCoupon,
    updateSaleItemQuantity,
    updateSaleItemCustomPrice,
    updateSaleItemBarber,
    refetch: saleQuery.refetch,
  }
}
