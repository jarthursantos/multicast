import { Provider } from './Provider'

export interface BasicProduct {
  code: number
  description: string
}

export interface BaseProduct extends BasicProduct {
  factoryCode: string
  packing: string
  unity: string

  provider: Provider
}

export interface Product extends BaseProduct {
  price: number

  deliveredQuantity: number
  requestedQuantity: number

  requestsCount?: number

  ipi?: number
  icmsBase?: number
  icmsValue?: number
  volume?: number
}

export interface StockProduct extends BaseProduct {
  invoiceNumber: number
  lastPurchaseOrderAt: Date
  lastBuyPrice: number
  lastEntryQuantity: number
}

export interface ArrivalStockProduct extends StockProduct {
  arrivedAt: Date
}

export interface ReleaseStockProduct extends StockProduct {
  releasedAt: Date
}

export interface TerminationStockProduct
  extends Omit<StockProduct, 'invoiceNumber'> {
  terminationAt: Date
}
