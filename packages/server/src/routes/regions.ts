import { Router, Request, Response } from 'express'
import { findRegionByCodeController } from 'use-cases/FindRegionByCode'
import { findRegionsController } from 'use-cases/FindRegions'

const router = Router()

router.get('/regions', (req: Request, res: Response) => {
  findRegionsController.handle(req, res)
})

router.get('/regions/:id', (req: Request, res: Response) => {
  findRegionByCodeController.handle(req, res)
})

export { router as regionsRouter }
