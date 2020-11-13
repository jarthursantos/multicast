import { Router, Request, Response } from 'express'
import { findBrandByCodeController } from 'use-cases/FindBrandByCode'
import { findBrandsController } from 'use-cases/FindBrands'

const router = Router()

router.get('/brands', (req: Request, res: Response) => {
  findBrandsController.handle(req, res)
})

router.get('/brands/:id', (req: Request, res: Response) => {
  findBrandByCodeController.handle(req, res)
})

export { router as brandsRouter }
