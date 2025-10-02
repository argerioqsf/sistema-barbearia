'use server'

import { SalesGateway } from '@/modules/sales/infrastructure/http/sales-gateway'
import type { NormalizedError } from '@/shared/errors/types'
import { normalizeError } from '@/shared/errors/normalizeError'
import { ok, err, type Result } from '@/shared/result'
import type { SalesGatewayPort } from '@/modules/sales/application/ports/sales-gateway.port'
import type { SaleDTO } from '@/modules/sales/domain'
import { UpdatePaymentMethodDTO } from '../dto/update-payment-method.dto'

export async function updatePaymentMethod(
  input: unknown,
  deps?: { gateway?: SalesGatewayPort },
): Promise<Result<SaleDTO, NormalizedError>> {
  try {
    const dto = UpdatePaymentMethodDTO.parse(input)
    const gateway = deps?.gateway ?? new SalesGateway()
    const sale = await gateway.updatePaymentMethod(dto)
    return ok(sale.toDTO())
  } catch (error) {
    return err(normalizeError(error))
  }
}
