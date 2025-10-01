'use server'

import { SalesGateway } from '@/modules/sales/infrastructure/http/sales-gateway'
import type { NormalizedError } from '@/shared/errors/types'
import { normalizeError } from '@/shared/errors/normalizeError'
import { ok, err, type Result } from '@/shared/result'
import {
  UpdateSaleItemCouponDTO,
  UpdateSaleItemQuantityDTO,
  UpdateSaleItemCustomPriceDTO,
  UpdateSaleItemBarberDTO,
} from '@/modules/sales/application/dto'
import type { SalesGatewayPort } from '@/modules/sales/application/ports/sales-gateway.port'
import type { SaleDTO } from '@/modules/sales/domain'
import { Money } from '@/shared/domain/value-objects/money'

function resolveGateway(override?: SalesGatewayPort) {
  return override ?? new SalesGateway()
}

export async function updateSaleItemCoupon(
  input: unknown,
  deps?: { gateway?: SalesGatewayPort },
): Promise<Result<SaleDTO, NormalizedError>> {
  try {
    const dto = UpdateSaleItemCouponDTO.parse(input)
    const sale = await resolveGateway(deps?.gateway).updateSaleItemCoupon(dto)
    return ok(sale.toDTO())
  } catch (error) {
    return err(normalizeError(error))
  }
}

export async function updateSaleItemQuantity(
  input: unknown,
  deps?: { gateway?: SalesGatewayPort },
): Promise<Result<SaleDTO, NormalizedError>> {
  try {
    const dto = UpdateSaleItemQuantityDTO.parse(input)
    if (!Number.isInteger(dto.quantity) || dto.quantity < 1) {
      throw new Error('Quantidade inválida')
    }
    const sale = await resolveGateway(deps?.gateway).updateSaleItemQuantity(dto)
    return ok(sale.toDTO())
  } catch (error) {
    return err(normalizeError(error))
  }
}

export async function updateSaleItemCustomPrice(
  input: unknown,
  deps?: { gateway?: SalesGatewayPort },
): Promise<Result<SaleDTO, NormalizedError>> {
  try {
    const dto = UpdateSaleItemCustomPriceDTO.parse(input)
    if (dto.customPrice !== null) {
      Money.fromFloat(dto.customPrice)
    }
    const sale = await resolveGateway(deps?.gateway).updateSaleItemCustomPrice(
      dto,
    )
    return ok(sale.toDTO())
  } catch (error) {
    return err(normalizeError(error))
  }
}

export async function updateSaleItemBarber(
  input: unknown,
  deps?: { gateway?: SalesGatewayPort },
): Promise<Result<SaleDTO, NormalizedError>> {
  try {
    const dto = UpdateSaleItemBarberDTO.parse(input)
    const sale = await resolveGateway(deps?.gateway).updateSaleItemBarber(dto)
    return ok(sale.toDTO())
  } catch (error) {
    return err(normalizeError(error))
  }
}
