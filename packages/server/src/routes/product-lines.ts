import { Router, Request, Response } from 'express'
import { findProductLineByCodeController } from 'use-cases/FindProductLineByCode'
import { findProductLinesController } from 'use-cases/FindProductLines'

const router = Router()

router.get('/productLines', (req: Request, res: Response) => {
  findProductLinesController.handle(req, res)
})

router.get('/productLines/:id', (req: Request, res: Response) => {
  findProductLineByCodeController.handle(req, res)
})

export { router as productLinesRouter }
