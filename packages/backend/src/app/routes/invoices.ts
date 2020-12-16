import { Router } from 'express'

import { handleFindInvoiceProducts } from '~/app/controllers/invoices'

const routes = Router()

routes.get('/:id/products', (req, res) => {
  console.log('handleFindInvoiceProducts')

  handleFindInvoiceProducts(req, res)
})

export { routes as invoicesRouter }
