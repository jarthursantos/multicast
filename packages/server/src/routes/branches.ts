import { Router, Request, Response } from 'express'
import { findBranchesController } from 'use-cases/FindBranches'

const router = Router()

router.get('/branches', (req: Request, res: Response) => {
  findBranchesController.handle(req, res)
})

export { router as branchesRouter }
