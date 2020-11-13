import {
  ArrivalStockProduct,
  ReleaseStockProduct,
  TerminationStockProduct
} from 'entities/Product'

export interface Options {
  providers?: number[]
  buyers?: number[]
  periodFrom: Date | string
  periodTo: Date | string
}

export interface StockNotificationsResult {
  arrived: ArrivalStockProduct[]
  released: ReleaseStockProduct[]
  terminated: TerminationStockProduct[]
}

export interface IStockNotificationsRepository {
  find(options: Options): Promise<StockNotificationsResult>
}
