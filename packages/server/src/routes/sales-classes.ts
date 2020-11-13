import { Router, Request, Response } from 'express'
import { findSalesClassesController } from 'use-cases/FindSalesClasses'

const router = Router()

router.get('/salesClasses', (req: Request, res: Response) => {
  findSalesClassesController.handle(req, res)
})

export { router as salesClassesRouter }
