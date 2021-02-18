import { Router } from 'express'

import { handleFindProductPriceHistory } from '~/app/controllers/product-price-history'

const routes = Router()

routes.get('/:id/priceHistory', handleFindProductPriceHistory)

export { routes as productsRoutes }
