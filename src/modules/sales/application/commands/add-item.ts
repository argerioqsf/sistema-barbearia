'use server'

import { SalesGateway } from '@/modules/sales/infrastructure/http/sales-gateway'
import type { NormalizedError } from '@/shared/errors/types'
import { normalizeError } from '@/shared/errors/normalizeError'
import { ok, err, type Result } from '@/shared/result'
import { AddItemDTO } from '@/modules/sales/application/dto'
import type { SalesGatewayPort } from '@/modules/sales/application/ports/sales-gateway.port'
import { SaleItem, type SaleDTO } from '@/modules/sales/domain'

export async function addItem(
  input: unknown,
  deps?: { gateway?: SalesGatewayPort },
): Promise<Result<SaleDTO, NormalizedError>> {
  try {
    const dto = AddItemDTO.parse(input)
    // Validação leve via entidade de domínio (quantidade, preço customizado)
    SaleItem.create({
      id: 'temp-item',
      saleId: dto.saleId,
      price: dto.price ?? dto.customPrice ?? 0,
      quantity: dto.quantity,
      customPrice: dto.customPrice ?? null,
      serviceId: dto.serviceId ?? null,
      productId: dto.productId ?? null,
      planId: dto.planId ?? null,
      appointmentId: dto.appointmentId ?? null,
      barberId: dto.barberId ?? null,
      couponId: null,
      porcentagemBarbeiro: null,
      commissionPaid: false,
      service: null,
      product: null,
      plan: null,
      barber: null,
      coupon: null,
      appointment: null,
      discounts: [],
      couponCode: null,
    })
    const gateway = deps?.gateway ?? new SalesGateway()
    const sale = await gateway.addItem(dto)
    return ok(sale.toDTO())
  } catch (error) {
    return err(normalizeError(error))
  }
}
