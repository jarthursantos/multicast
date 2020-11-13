import { Router, Request, Response } from 'express'
import { findActivityBranchByCodeController } from 'use-cases/FindActivityBranchByCode'
import { findActivityBranchesController } from 'use-cases/FindActivityBranches'

const router = Router()

router.get('/acitivtyBranches', (req: Request, res: Response) => {
  findActivityBranchesController.handle(req, res)
})

router.get('/acitivtyBranches/:id', (req: Request, res: Response) => {
  findActivityBranchByCodeController.handle(req, res)
})

export { router as acitivtyBranchesRouter }
