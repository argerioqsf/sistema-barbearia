'use server'

import { SalesGateway } from '@/modules/sales/infrastructure/http/sales-gateway'
import {
  calculateSaleTotals,
  type SaleDTO,
  type SaleTotals,
} from '@/modules/sales/domain'
import type { SalesGatewayPort } from '@/modules/sales/application/ports/sales-gateway.port'
import { z } from 'zod'
import { ok, err, type Result } from '@/shared/result'
import { normalizeError } from '@/shared/errors/normalizeError'
import type { NormalizedError } from '@/shared/errors/types'

export interface GetSaleOutput {
  sale: SaleDTO
  totals: SaleTotals
}

const saleIdSchema = z.string().uuid('saleId inválido')

export async function getSale(
  saleId: string,
  deps?: { gateway?: SalesGatewayPort },
): Promise<Result<GetSaleOutput, NormalizedError>> {
  try {
    const parsedId = saleIdSchema.parse(saleId)
    const gateway = deps?.gateway ?? new SalesGateway()
    const sale = await gateway.getSale(parsedId)
    return ok({ sale: sale.toDTO(), totals: calculateSaleTotals(sale) })
  } catch (error) {
    return err(normalizeError(error))
  }
}
