import { IBasicProduct, IPriceHistory } from '~/domain/IProduct'

export interface IProductPriceHistoryModel {
  find(product: IBasicProduct): Promise<IPriceHistory[]>
}
