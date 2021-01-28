import { Router } from 'express'

import { handleFindInvoiceProducts } from '~/app/controllers/invoices'

const routes = Router()

routes.get('/:id/products', (req, res) => {
  handleFindInvoiceProducts(req, res)
})

export { routes as invoicesRouter }
