import { Router, Request, Response } from 'express'
import { findSupervisorByCodeController } from 'use-cases/FindSupervisorByCode'
import { findSupervisorsController } from 'use-cases/FindSupervisors'

const router = Router()

router.get('/supervisors', (req: Request, res: Response) => {
  findSupervisorsController.handle(req, res)
})

router.get('/supervisors/:id', (req: Request, res: Response) => {
  findSupervisorByCodeController.handle(req, res)
})

export { router as supervisorsRouter }
