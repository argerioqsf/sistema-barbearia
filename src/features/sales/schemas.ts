import { z } from 'zod'

export const SaleSchema = z
  .object({
    id: z.string(),
    observation: z.string().optional(),
    method: z.string().optional(),
  })
  .passthrough()

export const SalesListResponseSchema = z.object({
  items: z.array(SaleSchema),
  count: z.number().optional(),
  page: z.number().optional(),
  perPage: z.number().optional(),
})

export type ZSale = z.infer<typeof SaleSchema>
