import { z } from 'zod'

export const LeadSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    phone: z.string().optional(),
    document: z.string().optional(),
    email: z.string().optional(),
    city: z.string().optional(),
    indicatorId: z.string().optional(),
    consultantId: z.string().optional(),
    segmentId: z.string().optional(),
    courseId: z.string().optional(),
    unitId: z.string().optional(),
    archived: z.boolean().optional(),
    matriculation: z.boolean().optional(),
    documents: z.boolean().optional(),
    amount_pay_indicator: z.number().optional(),
    amount_pay_consultant: z.number().optional(),
    released: z.boolean().optional(),
    birthday: z.string().optional(),
    class: z.string().optional(),
    noteLead: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
    shift: z.string().optional(),
    course_modality: z.string().optional(),
    education: z.string().optional(),
    personalityTraits: z.string().optional(),
  })
  .passthrough()

export const LeadsListResponseSchema = z.object({
  leads: z.array(LeadSchema),
  count: z.number(),
})

export type ZLead = z.infer<typeof LeadSchema>
