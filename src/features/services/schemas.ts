import { z } from 'zod'
import { UUID } from '../schemas'

export const ServiceSchema = z.object({
  id: UUID(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().url().nullable(),
  cost: z.number(),
  price: z.number(),
  defaultTime: z.number().nullable(), // veio null; se for minutos, mantenha number
  commissionPercentage: z.number().optional().nullable(),
  unitId: UUID(),
  categoryId: UUID(),
})

export const ServicesListResponseSchema = z.array(ServiceSchema)

export const ServicesListResponsePaginatedSchema = z.object({
  items: z.array(ServiceSchema),
  count: z.number(),
  page: z.number(),
  perPage: z.number(),
})

export type ZService = z.infer<typeof ServiceSchema>

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const RegisterServiceFormSchema = z.object({
  name: z.string().min(1, 'O nome do serviço é obrigatório.'),
  description: z.string().optional(),
  cost: z.coerce.number().min(0, 'O custo não pode ser negativo.'),
  price: z.coerce.number().min(0, 'O preço não pode ser negativo.'),
  defaultTime: z.coerce
    .number()
    .min(0, 'O tempo padrão não pode ser negativo.')
    .optional(),
  commissionPercentage: z.coerce.number().min(0).max(100).optional().nullable(),
  categoryId: z.string().uuid('A categoria é obrigatória.'),
  image: z
    .any()
    .optional()
    .refine(
      (file) => file ?? file.size <= MAX_FILE_SIZE,
      `O tamanho máximo da imagem é 5MB.`,
    )
    .refine(
      (file) => file ?? ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Apenas os formatos .jpg, .jpeg, .png e .webp são suportados.',
    ),
})

export const UpdateServiceFormSchema = RegisterServiceFormSchema.partial()

export type RegisterServiceBody = z.infer<typeof RegisterServiceFormSchema>
export const registerServiceResponseSchema = ServiceSchema
