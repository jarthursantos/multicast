import { Router, Request, Response } from 'express'
import { findClassesController } from 'use-cases/FindClasses'

const router = Router()

router.get('/classes', (req: Request, res: Response) => {
  findClassesController.handle(req, res)
})

export { router as classesRouter }
