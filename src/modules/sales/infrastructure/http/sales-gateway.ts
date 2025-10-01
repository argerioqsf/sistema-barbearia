import {
  fetchSale,
  createSale,
  removeOrAddSaleItems,
  updateSaleCoupon,
  updateSaleClient,
  paySale,
  updateCouponSaleItem,
  updateQuantitySaleItem,
  updateCustomPriceSaleItem,
  updateBarberSaleItem,
} from '@/features/sales/api'
import type {
  BodyRemoveOrAddSaleItem,
  BodyUpdateSaleCoupon,
  ZUpdateSaleItemResponseSchema,
} from '@/features/sales/schemas'
import type { ZSaleItems } from '@/features/saleItems/schema'
import type { SalesGatewayPort } from '@/modules/sales/application/ports/sales-gateway.port'
import type {
  CreateSaleDTO,
  AddItemDTO,
  ApplyCouponDTO,
  RemoveCouponDTO,
  UpdateClientDTO,
  PaySaleDTO,
  UpdateSaleItemCouponDTO,
  UpdateSaleItemQuantityDTO,
  UpdateSaleItemCustomPriceDTO,
  UpdateSaleItemBarberDTO,
} from '@/modules/sales/application/dto'
import { mapSaleFromApi } from '@/modules/sales/infrastructure/mappers/sale.mapper'
import type { Sale } from '@/modules/sales/domain'

export class SalesGateway implements SalesGatewayPort {
  // TODO: Otimização futura
  // - Alinhar com o backend para que TODAS as rotas de mutação (POST/PATCH/DELETE)
  //   retornem a Sale atualizada no corpo da resposta.
  // - Com isso, o gateway poderá sempre mapear diretamente a Sale do retorno,
  //   eliminando quaisquer chamadas extras de GET.
  // - Em paralelo, os hooks do React Query poderão adotar optimistic updates,
  //   usando o valor retornado para atualizar o cache local antes da invalidação.
  // - Por ora, confiamos nos revalidates do Next e na invalidação do React Query.
  async getSale(id: string): Promise<Sale> {
    const sale = await fetchSale(id)
    return mapSaleFromApi(sale)
  }

  async createSale(input: CreateSaleDTO): Promise<Sale> {
    const saleUpdated = await createSale({
      clientId: input.clientId,
      observation: input.observation ?? undefined,
      method: input.method,
    })
    return mapSaleFromApi(saleUpdated)
  }

  async addItem(input: AddItemDTO): Promise<Sale> {
    const { saleId, ...rest } = input
    const item: Partial<ZSaleItems> = {
      quantity: rest.quantity,
      price: rest.price ?? undefined,
      productId: rest.productId ?? undefined,
      serviceId: rest.serviceId ?? undefined,
      planId: rest.planId ?? undefined,
      appointmentId: rest.appointmentId ?? undefined,
      customPrice: rest.customPrice ?? undefined,
      barberId: rest.barberId ?? undefined,
    }
    const payload: BodyRemoveOrAddSaleItem = { addItemsIds: [item] }
    const saleUpdated = await removeOrAddSaleItems(saleId, payload)
    return mapSaleFromApi(saleUpdated)
  }

  async removeItem(saleId: string, itemId: string): Promise<Sale> {
    const payload: BodyRemoveOrAddSaleItem = { removeItemIds: [itemId] }
    const saleUpdated = await removeOrAddSaleItems(saleId, payload)
    return mapSaleFromApi(saleUpdated)
  }

  async updateClient(input: UpdateClientDTO): Promise<Sale> {
    const saleUpdated = await updateSaleClient(input.saleId, {
      clientId: input.clientId,
    })
    return mapSaleFromApi(saleUpdated)
  }

  async applyCoupon(input: ApplyCouponDTO): Promise<Sale> {
    const body: BodyUpdateSaleCoupon = { couponCode: input.couponCode }
    const saleUpdated = await updateSaleCoupon(input.saleId, body)
    return mapSaleFromApi(saleUpdated)
  }

  async removeCoupon(input: RemoveCouponDTO): Promise<Sale> {
    const saleUpdated = await updateSaleCoupon(input.saleId, {
      removeCoupon: true,
    })
    return mapSaleFromApi(saleUpdated)
  }

  async paySale(input: PaySaleDTO): Promise<Sale> {
    const saleUpdated = await paySale(input.saleId, {
      paymentMethod: input.paymentMethod,
    })
    return mapSaleFromApi(saleUpdated)
  }

  async updateSaleItemCoupon(input: UpdateSaleItemCouponDTO): Promise<Sale> {
    const { saleItemId, ...body } = input
    const response = await updateCouponSaleItem(saleItemId, body)
    return this.refreshFromSaleItems(response)
  }

  async updateSaleItemQuantity(
    input: UpdateSaleItemQuantityDTO,
  ): Promise<Sale> {
    const { saleItemId, ...body } = input
    const response = await updateQuantitySaleItem(saleItemId, body)
    return this.refreshFromSaleItems(response)
  }

  async updateSaleItemCustomPrice(
    input: UpdateSaleItemCustomPriceDTO,
  ): Promise<Sale> {
    const { saleItemId, ...body } = input
    const response = await updateCustomPriceSaleItem(saleItemId, body)
    return this.refreshFromSaleItems(response)
  }

  async updateSaleItemBarber(input: UpdateSaleItemBarberDTO): Promise<Sale> {
    const { saleItemId, ...body } = input
    const response = await updateBarberSaleItem(saleItemId, body)
    return this.refreshFromSaleItems(response)
  }

  private async refreshFromSaleItems(
    response: ZUpdateSaleItemResponseSchema,
  ): Promise<Sale> {
    // Se a API já retornar a sale atualizada, aproveitamos para evitar GET extra.
    if (response.sale) {
      return mapSaleFromApi(response.sale)
    }
    const saleId = response.saleItems?.[0]?.saleId
    if (!saleId) {
      throw new Error('Unable to resolve sale id after item mutation')
    }
    // Ainda precisamos buscar a sale quando a API retornar apenas itens.
    const updated = await fetchSale(saleId)
    return mapSaleFromApi(updated)
  }
}
