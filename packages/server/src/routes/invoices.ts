import { Router, Request, Response } from 'express'
import { findInvoiceProductsController } from 'use-cases/FindInvoiceProducts'

const router = Router()

router.get('/invoices/:id/products', (req: Request, res: Response) => {
  findInvoiceProductsController.handle(req, res)
})

export { router as invoicesRouter }
