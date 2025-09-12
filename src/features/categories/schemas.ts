import { z } from 'zod'

export const CategorySchema = z
  .object({
    id: z.string(),
    name: z.string(),
    active: z.boolean().optional(),
    createdAt: z.string().optional(),
  })
  .passthrough()

export const CategoriesListResponseSchema = z.object({
  categories: z
    .array(CategorySchema)
    .or(z.array(CategorySchema).transform((s) => s)),
  count: z.number().optional().default(0),
})

export type ZCategory = z.infer<typeof CategorySchema>
