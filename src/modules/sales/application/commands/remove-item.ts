'use server'

import { z } from 'zod'
import { SalesGateway } from '@/modules/sales/infrastructure/http/sales-gateway'
import type { NormalizedError } from '@/shared/errors/types'
import { normalizeError } from '@/shared/errors/normalizeError'
import { ok, err, type Result } from '@/shared/result'
import type { SalesGatewayPort } from '@/modules/sales/application/ports/sales-gateway.port'
import type { SaleDTO } from '@/modules/sales/domain'

const RemoveItemSchema = z.object({
  saleId: z.string().uuid('saleId inválido'),
  itemId: z.string().uuid('itemId inválido'),
})

export async function removeItem(
  input: unknown,
  deps?: { gateway?: SalesGatewayPort },
): Promise<Result<SaleDTO, NormalizedError>> {
  try {
    const dto = RemoveItemSchema.parse(input)
    const gateway = deps?.gateway ?? new SalesGateway()
    const sale = await gateway.removeItem(dto.saleId, dto.itemId)
    return ok(sale.toDTO())
  } catch (error) {
    return err(normalizeError(error))
  }
}
