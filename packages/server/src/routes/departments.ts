import { Router, Request, Response } from 'express'
import { findDepartmentByCodeController } from 'use-cases/FindDepartmentByCode'
import { findDepartmentsController } from 'use-cases/FindDepartments'

const router = Router()

router.get('/departments', (req: Request, res: Response) => {
  findDepartmentsController.handle(req, res)
})

router.get('/departments/:id', (req: Request, res: Response) => {
  findDepartmentByCodeController.handle(req, res)
})

export { router as departmentsRouter }
