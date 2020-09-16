import { Router, Request, Response } from 'express'
import { validateBody } from 'middlewares/validate-body'
import {
  generateScheduleCostsReportsController,
  generateScheduleCostsReportsSchema
} from 'use-cases/GenerateScheduleCostsReports'

const router = Router()

router.get(
  '/reports/schedules/cost',
  validateBody(generateScheduleCostsReportsSchema),
  (req: Request, res: Response) => {
    generateScheduleCostsReportsController.handle(req, res)
  }
)

export { router as reportsRouter }
