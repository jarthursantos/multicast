import { Router, Request, Response } from 'express'
import { findProductByCodeController } from 'use-cases/FindProductByCode'
import { findProductsController } from 'use-cases/FindProducts'

const router = Router()

router.get('/products', (req: Request, res: Response) => {
  findProductsController.handle(req, res)
})

router.get('/products/:id', (req: Request, res: Response) => {
  findProductByCodeController.handle(req, res)
})

export { router as productsRouter }
