'use client'

import { useEffect } from 'react'
import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query'
import { makeQueryFn } from '@/shared/react-query-adapter'
import type { NormalizedError } from '@/shared/errors/types'
import { handleUnauthorized } from '@/shared/auth/handleUnauthorized'
import { fetchUsersAll } from '@/features/users/api'
import { ZUser } from '@/features/users/schemas'
import { err, ok } from '@/shared/result'
import { normalizeError } from '@/shared/errors/normalizeError'

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

export function useCollaboratorsCatalog() {
  return useAuthQuery<ZUser[]>({
    queryKey: ['users'],
    queryFn: makeQueryFn(async () => {
      try {
        const users = await fetchUsersAll()
        return ok(users)
      } catch (error) {
        return err(normalizeError(error))
      }
    }),
  })
}
