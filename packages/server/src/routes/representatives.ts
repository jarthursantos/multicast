import { Router, Request, Response } from 'express'
import { findRepresentativesController } from 'use-cases/FindRepresentatives'

const router = Router()

router.get('/representatives', (req: Request, res: Response) => {
  findRepresentativesController.handle(req, res)
})

export { router as representativesRouter }
