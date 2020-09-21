import { Request, Response, Router } from 'express'
import { findEmployeesController } from 'use-cases/FindEmployees'

const router = Router()

router.get(
  '/employees',
  (req: Request<{}, {}, {}, { name: string }>, res: Response) => {
    findEmployeesController.handle(req, res)
  }
)

export { router as employeesRouter }
