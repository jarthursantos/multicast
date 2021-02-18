import { createWinThorProductPriceHistoryModel } from '~/models/product-price-history/WinThorProductPriceHistoryModel'
import { createWinThorProductsModel } from '~/models/products/WinThorProductsModel'

import { createFindProductPriceHistory } from './find'

const productsModel = createWinThorProductsModel()
const productPriceHistoryModel = createWinThorProductPriceHistoryModel()

const findProductPriceHistory = createFindProductPriceHistory(
  productsModel,
  productPriceHistoryModel
)

export { findProductPriceHistory }
