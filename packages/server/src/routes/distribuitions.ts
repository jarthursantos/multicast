import { Router, Request, Response } from 'express'
import { findDistribuitionByCodeController } from 'use-cases/FindDistribuitionByCode'
import { findDistribuitionsController } from 'use-cases/FindDistribuitions'

const router = Router()

router.get('/distribuitions', (req: Request, res: Response) => {
  findDistribuitionsController.handle(req, res)
})

router.get('/distribuitions/:id', (req: Request, res: Response) => {
  findDistribuitionByCodeController.handle(req, res)
})

export { router as distribuitionsRouter }
