import { z } from 'zod'

export const SegmentSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    createdAt: z.string().optional(),
  })
  .passthrough()

export const SegmentsListResponseSchema = z.object({
  segments: z.array(SegmentSchema),
  count: z.number(),
})

export const SegmentDetailResponseSchema = z.object({
  segment: SegmentSchema,
})

export const SegmentsSelectResponseSchema = z.object({
  segments: z.array(SegmentSchema),
})

export type ZSegment = z.infer<typeof SegmentSchema>
