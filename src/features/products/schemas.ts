import { z } from 'zod'
import { UUID } from '../schemas'

export const ProductSchema = z
  .object({
    id: UUID(),
    name: z.string(),
    description: z.string().optional().nullable(),
    imageUrl: z.string().url().nullable(),
    quantity: z.number().optional().nullable(),
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

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const RegisterProductFormSchema = z.object({
  name: z.string().min(1, 'O nome do produto é obrigatório.'),
  description: z.string().optional().nullable(),
  categoryId: z.string().uuid('A categoria é obrigatória.'),
  quantity: z.coerce
    .number()
    .min(0, 'A quantidade não pode ser negativa.')
    .default(0)
    .optional(),
  cost: z.coerce.number().min(0, 'O custo não pode ser negativo.'),
  price: z.coerce.number().min(0, 'O preço não pode ser negativo.'),
  commissionPercentage: z.coerce.number().min(0).max(100).optional().nullable(),
  image: z
    .any()
    .optional()
    .refine(
      (file) => file ?? file?.size <= MAX_FILE_SIZE,
      `O tamanho máximo da imagem é 5MB.`,
    )
    .refine(
      (file) => file ?? ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Apenas os formatos .jpg, .jpeg, .png e .webp são suportados.',
    ),
})
export type RegisterProductBody = z.infer<typeof RegisterProductFormSchema>

export const registerProductResponseSchema = ProductSchema

export const UpdateProductFormSchema = z.object({
  name: z.string().min(1, 'O nome do produto é obrigatório.').optional(),
  description: z.string().optional().nullable(),
  categoryId: z.string().uuid('A categoria é obrigatória.').optional(),
  quantity: z.coerce
    .number()
    .min(0, 'A quantidade não pode ser negativa.')
    .optional(),
  cost: z.coerce.number().min(0, 'O custo não pode ser negativo.').optional(),
  price: z.coerce.number().min(0, 'O preço não pode ser negativo.').optional(),
  commissionPercentage: z.coerce.number().min(0).max(100).optional().nullable(),
})
