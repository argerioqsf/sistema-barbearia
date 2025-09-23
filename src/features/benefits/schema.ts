import { z } from 'zod'
import { UUID } from '../schemas'

const BenefitServiceLinkSchema = z.object({
  id: UUID(),
  benefitId: UUID(),
  serviceId: UUID(),
})
const BenefitProductLinkSchema = z.object({
  id: UUID(),
  benefitId: UUID(),
  productId: UUID(),
})

/** Benefit “mestre” (com serviços/produtos e categorias) */
export const BenefitSchema = z.object({
  id: UUID(),
  name: z.string(),
  description: z.string(),
  discount: z.number(),
  discountType: z.enum(['PERCENTAGE']), // amplie se houver outros (ex.: "VALUE")
  unitId: UUID(),
  categories: z.array(z.unknown()), // sem exemplo do item de categoria
  services: z.array(BenefitServiceLinkSchema),
  products: z.array(BenefitProductLinkSchema),
})

/** Pivot Plan<->Benefit (com objeto embutido) */
export const PlanBenefitSchema = z.object({
  id: UUID(),
  planId: UUID(),
  benefitId: UUID(),
  benefit: BenefitSchema,
})
