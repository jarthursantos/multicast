import { Router, Request, Response } from 'express'
import { findBuyerByCodeController } from 'use-cases/FindBuyerByCode'
import { findBuyersController } from 'use-cases/FindBuyers'

const router = Router()

router.get('/buyers', (req: Request, res: Response) => {
  findBuyersController.handle(req, res)
})

router.get('/buyers/:id', (req: Request, res: Response) => {
  findBuyerByCodeController.handle(req, res)
})

export { router as buyersRouter }
