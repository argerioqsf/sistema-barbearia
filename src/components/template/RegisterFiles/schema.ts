import { z } from 'zod'

export const formSchemaRegisterFile = z.object({
  avatar: z
    .instanceof(File)
    .refine((file) => {
      return file.type.match(/^image\/(jpg|jpeg|png|gif)$/)
    }, 'Erro: O arquivo não é uma imagem válida.')
    .refine((file) => {
      const maxSize = 1024 * 1024 * 10
      return file.size <= maxSize
    }, 'Erro: O arquivo é muito grande.'),
})
