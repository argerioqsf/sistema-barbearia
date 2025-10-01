'use server'

import type { NormalizedError } from '@/shared/errors/types'
import { ok, err, type Result } from '@/shared/result'
import { normalizeError } from '@/shared/errors/normalizeError'
import type { ZProduct } from '@/features/products/schemas'
import { fetchProducts } from '@/features/products/api'

// TODO: Migrar para módulo de domínio `products` (ex.: src/modules/products/application/queries/list-products.ts)
export async function getProductsCatalog({
  search,
}: {
  search?: string
}): Promise<
  Result<
    { items: ZProduct[]; count?: number; page?: number; perPage?: number },
    NormalizedError
  >
> {
  try {
    const { items, count, page, perPage } = await fetchProducts(undefined, {
      name: search,
    })
    return ok({ items, count, page, perPage })
  } catch (error) {
    return err(normalizeError(error))
  }
}

export type ProductsCatalog =
  Awaited<ReturnType<typeof getProductsCatalog>> extends Result<
    infer T,
    unknown
  >
    ? T
    : never
