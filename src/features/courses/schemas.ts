import { z } from 'zod'

export const CourseSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    quant_leads: z.number().optional(),
    active: z.boolean().optional(),
  })
  .passthrough()

export const CoursesListResponseSchema = z.object({
  courses: z.array(CourseSchema),
  count: z.number(),
})

export const CourseDetailResponseSchema = z.object({
  course: CourseSchema,
})

export const CoursesSelectResponseSchema = z.object({
  courses: z.array(CourseSchema),
})

export type ZCourse = z.infer<typeof CourseSchema>
