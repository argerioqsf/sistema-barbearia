import { z } from 'zod'
import { UUID } from '../schemas'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const WithdrawalFormSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('COLLABORATOR'),
    amount: z.coerce
      .number({ invalid_type_error: 'O valor deve ser um número.' })
      .positive('O valor da retirada deve ser positivo.'),
    description: z.string().min(1, 'A descrição é obrigatória.'),
    affectedUserId: UUID(),
    receipt: z
      .any()
      .optional()
      .refine((file) => {
        if (!file || !(file instanceof File) || file.size === 0) return true // Campo opcional
        return file.size <= MAX_FILE_SIZE
      }, `O tamanho máximo da imagem é 5MB.`)
      .refine((file) => {
        if (!file || !(file instanceof File) || file.size === 0) return true // Campo opcional
        return ACCEPTED_IMAGE_TYPES.includes(file.type)
      }, 'Apenas os formatos .jpg, .jpeg, .png e .webp são suportados.'),
  }),
  z.object({
    unitId: z.string(),
    type: z.literal('UNIT'),
    amount: z.coerce
      .number({ invalid_type_error: 'O valor deve ser um número.' })
      .positive('O valor da retirada deve ser positivo.'),
    description: z.string().min(1, 'A descrição é obrigatória.'),
    affectedUserId: z.null({
      required_error: 'O campo affectedUserId deve ser nulo para UNIT.',
    }),
    receipt: z
      .any()
      .optional()
      .refine((file) => {
        if (!file || !(file instanceof File) || file.size === 0) return true // Campo opcional
        return file.size <= MAX_FILE_SIZE
      }, `O tamanho máximo da imagem é 5MB.`)
      .refine((file) => {
        if (!file || !(file instanceof File) || file.size === 0) return true // Campo opcional
        return ACCEPTED_IMAGE_TYPES.includes(file.type)
      }, 'Apenas os formatos .jpg, .jpeg, .png e .webp são suportados.'),
  }),
])

export type ZWithdrawalForm = z.infer<typeof WithdrawalFormSchema>
