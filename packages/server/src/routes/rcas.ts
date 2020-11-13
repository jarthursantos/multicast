import { Router, Request, Response } from 'express'
import { findRCAByCodeController } from 'use-cases/FindRCAByCode'
import { findRCAsController } from 'use-cases/FindRCAs'

const router = Router()

router.get('/rcas', (req: Request, res: Response) => {
  findRCAsController.handle(req, res)
})

router.get('/rcas/:id', (req: Request, res: Response) => {
  findRCAByCodeController.handle(req, res)
})

export { router as rcasRouter }
