import { Router, Request, Response } from 'express'
import { findTributationByCodeController } from 'use-cases/FindTributationByCode'
import { findTributationsController } from 'use-cases/FindTributations'

const router = Router()

router.get('/tributations', (req: Request, res: Response) => {
  findTributationsController.handle(req, res)
})

router.get('/tributations/:id', (req: Request, res: Response) => {
  findTributationByCodeController.handle(req, res)
})

export { router as tributationsRouter }
