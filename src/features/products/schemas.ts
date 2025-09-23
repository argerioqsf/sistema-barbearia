import { z } from 'zod'
import { UUID } from '../schemas'

export const ProductSchema = z
  .object({
    id: UUID(),
    name: z.string(),
    description: z.string(),
    imageUrl: z.string().url().nullable(),
    quantity: z.number(),
    cost: z.number(),
    commissionPercentage: z.number().nullable(),
    price: z.number(),
    unitId: UUID(),
    categoryId: UUID(),
  })
  .passthrough()

export const ProductsListResponseSchema = z.array(ProductSchema)

export const ProductsListPaginateResponseSchema = z.object({
  items: z.array(ProductSchema),
  count: z.number(),
  page: z.number(),
  perPage: z.number(),
})

export const ProductDetailResponseSchema = z.object({
  product: ProductSchema,
})

export const ProductSellersResponseSchema = z.object({
  sellers: z.array(
    z.object({ id: z.string(), name: z.string() }).passthrough(),
  ),
})

export type ZProduct = z.infer<typeof ProductSchema>
