'use client'

import { useState, useCallback } from 'react'
import {
  BodyPaySale,
  BodyUpdateBarberSaleItem,
  BodyUpdateCouponSaleItem,
  BodyUpdateCustomPriceSaleItem,
  BodyUpdateQuantitySaleItem,
  BodyUpdateSaleItem,
  ZSale as Sale,
} from '@/features/sales/schemas'
import {
  createSaleAction,
  updateSaleClientAction,
  updateSaleCouponAction,
  paySaleAction,
  addSaleItemsAction,
  removeSaleItemsAction,
  updateSaleItemAction,
  updateCouponSaleItemAction,
  updateQuantitySaleItemAction,
  updateCustomPriceSaleItemAction,
  updateBarberSaleItemAction,
} from '@/actions/sale'
import { ZProduct } from '@/features/products/schemas'
import { ZService } from '@/features/services/schemas'
import { ZAppointment } from '@/features/appointments/schemas'
import { ZPlan } from '@/features/plans/schema'
import { ZUser } from '@/features/users/schemas'
import { showApiErrorToast, showApiSuccessToast } from '@/lib/toast-utils'
import { ReturnRequest } from '@/types/general'
import { onUnauthorizedDefault } from '@/shared/errors/onUnauthorized'
import { NormalizedError } from '@/shared/errors/types'
export type ItemFormatted = {
  quantity: number
  price?: number
  productId?: string
  serviceId?: string
  appointmentId?: string
  planId?: string
}

export function usePOS() {
  const [sale, setSale] = useState<Sale | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handlerResponseApi<T>(result: ReturnRequest<T>): {
    data?: T
    error?: NormalizedError
  } {
    if (!result.ok) {
      if (result.error.type === 'http' && result.error.status === 401) {
        onUnauthorizedDefault()
      }
      setError(result.error.message)
      showApiErrorToast(result.error.message)
      setLoading(false)
      return { error: result.error }
    }
    setLoading(false)
    return { data: result.data }
  }

  const createSaleWithClient = useCallback(async (clientId: string) => {
    setLoading(true)
    setError(null)
    const response = await createSaleAction(
      clientId,
      'Venda criada pelo Point Of Sale',
    )
    return handlerResponseApi(response)
  }, [])

  const addItem = useCallback(
    async (itemFormatted: ItemFormatted, saleId: string) => {
      setLoading(true)
      setError(null)
      const response = await addSaleItemsAction(saleId, [itemFormatted])
      return handlerResponseApi(response)
    },
    [],
  )

  const addProduct = useCallback(
    async (item: ZProduct, saleId: string) => {
      const itemFormatted: ItemFormatted = {
        quantity: 1,
        price: item.price || 0,
        productId: item.id,
      }
      await addItem(itemFormatted, saleId)
    },
    [addItem],
  )

  const addService = useCallback(
    async (item: ZService, saleId: string) => {
      const itemFormatted: ItemFormatted = {
        quantity: 1,
        price: item.price || 0,
        serviceId: item.id,
      }
      await addItem(itemFormatted, saleId)
    },
    [addItem],
  )

  const addPlan = useCallback(
    async (item: ZPlan, saleId: string) => {
      const itemFormatted: ItemFormatted = {
        quantity: 1,
        price: item.price || 0,
        planId: item.id,
      }
      await addItem(itemFormatted, saleId)
    },
    [addItem],
  )

  const addAppointment = useCallback(
    async (item: ZAppointment, saleId: string) => {
      const itemFormatted: ItemFormatted = {
        quantity: 1,
        price: undefined,
        appointmentId: item.id,
      }
      await addItem(itemFormatted, saleId)
    },
    [addItem],
  )

  const updateItem = async (saleItemId: string, body: BodyUpdateSaleItem) => {
    setLoading(true)
    setError(null)
    const response = await updateSaleItemAction(saleItemId, body)
    return handlerResponseApi(response)
  }

  const updateCouponItem = async (
    saleItemId: string,
    body: BodyUpdateCouponSaleItem,
  ) => {
    setLoading(true)
    setError(null)
    const response = await updateCouponSaleItemAction(saleItemId, body)
    return handlerResponseApi(response)
  }

  const updateQuantityItem = async (
    saleItemId: string,
    body: BodyUpdateQuantitySaleItem,
  ) => {
    setLoading(true)
    setError(null)
    const response = await updateQuantitySaleItemAction(saleItemId, body)
    return handlerResponseApi(response)
  }

  const updateCustomPriceItem = async (
    saleItemId: string,
    body: BodyUpdateCustomPriceSaleItem,
  ) => {
    setLoading(true)
    setError(null)
    const response = await updateCustomPriceSaleItemAction(saleItemId, body)
    return handlerResponseApi(response)
  }

  const updateBarberItem = async (
    saleItemId: string,
    body: BodyUpdateBarberSaleItem,
  ) => {
    setLoading(true)
    setError(null)
    const response = await updateBarberSaleItemAction(saleItemId, body)
    const resp = handlerResponseApi(response)
    if (resp.data) {
      showApiSuccessToast('Colaborador adicionado com sucesso')
    }
    return resp
  }

  const setCustomer = useCallback(async (saleId: string, customer: ZUser) => {
    setLoading(true)
    setError(null)

    const response = await updateSaleClientAction(saleId, customer.id)
    return handlerResponseApi(response)
  }, [])

  const applyCoupon = useCallback(async (coupon: string, saleId: string) => {
    setLoading(true)
    setError(null)
    const response = await updateSaleCouponAction(saleId, {
      couponCode: coupon,
    })
    return handlerResponseApi(response)
  }, [])

  const processPayment = useCallback(
    async (body: BodyPaySale, saleId: string) => {
      setLoading(true)
      setError(null)
      const response = await paySaleAction(saleId, body)
      return handlerResponseApi(response)
    },
    [],
  )

  const removeItem = useCallback(async (itemId: string, saleId: string) => {
    setLoading(true)
    setError(null)
    const response = await removeSaleItemsAction(saleId, [itemId])
    return handlerResponseApi(response)
  }, [])

  const removeCoupon = useCallback(async (saleId: string) => {
    setLoading(true)
    setError(null)
    const response = await updateSaleCouponAction(saleId, {
      removeCoupon: true,
    })
    return handlerResponseApi(response)
  }, [])

  return {
    sale,
    setSale,
    addProduct,
    addService,
    addPlan,
    addAppointment,
    setCustomer,
    applyCoupon,
    processPayment,
    removeItem,
    removeCoupon,
    loading,
    error,
    createSaleWithClient,
    updateItem,
    updateCouponItem,
    updateQuantityItem,
    updateCustomPriceItem,
    updateBarberItem,
  }
}
