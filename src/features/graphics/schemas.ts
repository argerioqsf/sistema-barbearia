import { z } from 'zod'

export const RankingItemSchema = z.object({
  name: z.string(),
  quant: z.number(),
})

export const GraphicsSchema = z.object({
  leads_per_day: z.object({ value: z.number(), diff: z.number() }).optional(),
  leads_per_cycle: z.object({ value: z.number(), diff: z.number() }).optional(),
  average_service_time: z
    .object({
      dias: z.number(),
      horas: z.number(),
      minutos: z.number(),
      segundos: z.number(),
      media_em_dias: z.number(),
      totalLeads: z.number().optional(),
    })
    .optional(),
  leads_by_steps: z
    .object({
      countStepClosing: z.number(),
      countStepNegotiation: z.number(),
      countStepNewLeads: z.number(),
      countStepPreService: z.number(),
      countStepPresentationOportunity: z.number(),
    })
    .optional(),
  bonus: z
    .object({
      bonus_awaiting_confirmation: z.object({
        total: z.number(),
        indicator: z.number(),
        consultant: z.number(),
      }),
      bonus_confirmed: z.object({
        total: z.number(),
        indicator: z.number(),
        consultant: z.number(),
      }),
    })
    .optional(),
  leadsRankingConsultant: z.array(RankingItemSchema).optional(),
  leadsRankingIndicator: z.array(RankingItemSchema).optional(),
  coursesRanking: z.array(RankingItemSchema).optional(),
  rankingConsultantsCloseSales: z.array(RankingItemSchema).optional(),
})
