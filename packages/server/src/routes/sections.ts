import { Router, Request, Response } from 'express'
import { findSectionByCodeController } from 'use-cases/FindSectionByCode'
import { findSectionsController } from 'use-cases/FindSections'

const router = Router()

router.get('/sections', (req: Request, res: Response) => {
  findSectionsController.handle(req, res)
})

router.get('/sections/:id', (req: Request, res: Response) => {
  findSectionByCodeController.handle(req, res)
})

export { router as sectionsRouter }
