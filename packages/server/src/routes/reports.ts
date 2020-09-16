import { Router, Request, Response } from 'express'
import { validateParams } from 'middlewares/validate-params'
import {
  generateScheduleCostsReportsController,
  generateScheduleCostsReportsSchema
} from 'use-cases/GenerateScheduleCostsReports'

const router = Router()

router.get(
  '/reports/schedules/cost',
  validateParams(generateScheduleCostsReportsSchema),
  (req: Request, res: Response) => {
    generateScheduleCostsReportsController.handle(req, res)
  }
)

export { router as reportsRouter }
