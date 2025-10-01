'use client'

import { useEffect } from 'react'
import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query'
import { qk } from '@/shared/query-keys'
import { makeQueryFn } from '@/shared/react-query-adapter'
import type { NormalizedError } from '@/shared/errors/types'
import {
  getAppointmentsCatalog,
  getBarbersCatalog,
  getClientsCatalog,
  getPlansCatalog,
  getProductsCatalog,
  getServicesCatalog,
} from '@/modules/sales-pos/application/queries/catalog'
import type {
  AppointmentsCatalog,
  BarbersCatalog,
  ClientsCatalog,
  PlansCatalog,
  ProductsCatalog,
  ServicesCatalog,
} from '@/modules/sales-pos/application/queries/catalog'
import { handleUnauthorized } from '@/shared/auth/handleUnauthorized'

function useAuthQuery<
  TQueryFnData,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(options: UseQueryOptions<TQueryFnData, NormalizedError, TData, TQueryKey>) {
  const query = useQuery<TQueryFnData, NormalizedError, TData, TQueryKey>(
    options,
  )

  useEffect(() => {
    if (query.error?.type === 'http' && query.error.status === 401) {
      handleUnauthorized().catch(() => undefined)
    }
  }, [query.error])

  return query
}

export function useProductsCatalog(search: string) {
  return useAuthQuery<ProductsCatalog>({
    queryKey: qk.products.list({ q: search }),
    queryFn: makeQueryFn(() => getProductsCatalog({ search })),
  })
}

export function useServicesCatalog(search: string) {
  return useAuthQuery<ServicesCatalog>({
    queryKey: qk.services.list({ q: search }),
    queryFn: makeQueryFn(() => getServicesCatalog({ search })),
  })
}

export function usePlansCatalog(search: string) {
  return useAuthQuery<PlansCatalog>({
    queryKey: ['plans', { q: search }],
    queryFn: makeQueryFn(() => getPlansCatalog({ search })),
  })
}

export function useAppointmentsCatalog(date: string) {
  return useAuthQuery<AppointmentsCatalog>({
    queryKey: qk.appointments.list({ date }),
    queryFn: makeQueryFn(() => getAppointmentsCatalog({ date })),
  })
}

export function useClientsCatalog(search: string) {
  return useAuthQuery<ClientsCatalog>({
    queryKey: ['clients', { q: search }],
    queryFn: makeQueryFn(() => getClientsCatalog({ search })),
    enabled: search.length > 2,
  })
}

export function useBarbersCatalog() {
  return useAuthQuery<BarbersCatalog>({
    queryKey: ['barbers'],
    queryFn: makeQueryFn(() => getBarbersCatalog()),
  })
}
