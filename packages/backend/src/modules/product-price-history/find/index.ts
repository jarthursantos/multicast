import createHttpError from 'http-errors'

import { IProductPriceHistoryModel } from '~/models/product-price-history/IProductPriceHistoryModel'
import { IProductsModel } from '~/models/products/IProductsModel'

export function createFindProductPriceHistory(
  productsModel: IProductsModel,
  productPriceHistoryModel: IProductPriceHistoryModel
) {
  return {
    async execute(productCode: number) {
      const product = await productsModel.findById(productCode)

      if (!product) {
        throw new createHttpError.NotFound('Produto não encontrado')
      }

      const history = await productPriceHistoryModel.find(product)

      return history
    }
  }
}
