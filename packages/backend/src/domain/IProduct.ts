import { IProvider } from './IProvider'

export interface IBasicProduct {
  code: number
  description: string
}

export interface IBaseProduct extends IBasicProduct {
  factoryCode: string
  packing: string
  unity: string

  provider?: IProvider
}

export interface IProduct extends IBaseProduct {
  price: number

  deliveredQuantity: number
  requestedQuantity: number

  requestsCount?: number

  ipi?: number
  icmsBase?: number
  icmsValue?: number
  volume?: number
}

export interface IStockProduct extends IBaseProduct {
  invoiceNumber: number
  lastPurchaseOrderAt: Date
  lastBuyPrice: number
  lastEntryQuantity: number
}

export interface IArrivalStockProduct extends IStockProduct {
  arrivedAt?: Date
}

export interface IReleaseStockProduct extends IStockProduct {
  releasedAt?: Date
}

export interface ITerminationStockProduct
  extends Omit<IStockProduct, 'invoiceNumber'> {
  terminationAt?: Date
}
