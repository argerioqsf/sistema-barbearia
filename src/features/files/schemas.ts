import { z } from 'zod'

export const FileSchema = z.object({
  filename: z.string(),
  url: z.string().url(),
})

export const FilesListResponseSchema = z
  .object({
    files: z.array(FileSchema).optional(),
  })
  .passthrough()

export type ZFile = z.infer<typeof FileSchema>
