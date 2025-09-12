import { z } from 'zod'

export const ProductSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    imageUrl: z.string().url().nullable(),
    quantity: z.number(),
    cost: z.number(),
    commissionPercentage: z.number().nullable(),
    price: z.number(),
    unitId: z.string(),
    categoryId: z.string(),
  })
  .passthrough()

export const ProductsListResponseSchema = z.object({
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
