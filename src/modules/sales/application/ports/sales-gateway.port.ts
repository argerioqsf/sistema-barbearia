import type { Sale } from '@/modules/sales/domain'
import type {
  AddItemDTO,
  ApplyCouponDTO,
  RemoveCouponDTO,
  UpdateSaleItemCouponDTO,
  UpdateSaleItemQuantityDTO,
  UpdateSaleItemCustomPriceDTO,
  UpdateSaleItemBarberDTO,
  UpdateClientDTO,
  PaySaleDTO,
  CreateSaleDTO,
} from '@/modules/sales/application/dto'
import { UpdatePaymentMethodDTO } from '../dto/update-payment-method.dto'

export interface SalesGatewayPort {
  getSale(id: string): Promise<Sale>
  createSale(input: CreateSaleDTO): Promise<Sale>
  addItem(input: AddItemDTO): Promise<Sale>
  removeItem(saleId: string, itemId: string): Promise<Sale>
  updateClient(input: UpdateClientDTO): Promise<Sale>
  applyCoupon(input: ApplyCouponDTO): Promise<Sale>
  removeCoupon(input: RemoveCouponDTO): Promise<Sale>
  paySale(input: PaySaleDTO): Promise<Sale>
  updatePaymentMethod(input: UpdatePaymentMethodDTO): Promise<Sale>
  updateSaleItemCoupon(input: UpdateSaleItemCouponDTO): Promise<Sale>
  updateSaleItemQuantity(input: UpdateSaleItemQuantityDTO): Promise<Sale>
  updateSaleItemCustomPrice(input: UpdateSaleItemCustomPriceDTO): Promise<Sale>
  updateSaleItemBarber(input: UpdateSaleItemBarberDTO): Promise<Sale>
}
