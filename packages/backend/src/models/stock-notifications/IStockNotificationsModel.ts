import {
  IArrivalStockProduct,
  IReleaseStockProduct,
  ITerminationStockProduct
} from '~/domain/IProduct'

export interface IOptions {
  providers?: number[]
  buyers?: number[]
  periodFrom: Date | string
  periodTo: Date | string
}

export interface IStockNotificationsResult {
  arrived: IArrivalStockProduct[]
  released: IReleaseStockProduct[]
  terminated: ITerminationStockProduct[]
}

export interface IStockNotificationsModel {
  find(options: IOptions): Promise<IStockNotificationsResult>
}
