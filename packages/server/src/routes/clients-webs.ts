import { Router, Request, Response } from 'express'
import { findClientWebByCodeController } from 'use-cases/FindClientWebByCode'
import { findClientWebsController } from 'use-cases/FindClientWebs'

const router = Router()

router.get('/clientsWebs', (req: Request, res: Response) => {
  findClientWebsController.handle(req, res)
})

router.get('/clientsWebs/:id', (req: Request, res: Response) => {
  findClientWebByCodeController.handle(req, res)
})

export { router as clientsWebsRouter }
