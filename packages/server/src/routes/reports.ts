import { Router, Request, Response } from 'express'
import { generateScheduleCostsReportsController } from 'use-cases/GenerateScheduleCostsReports'

const router = Router()

router.get(
  '/reports/schedules/cost',
  (
    req: Request<{}, {}, {}, { periodStart: string; periodEnd: string }>,
    res: Response
  ) => {
    generateScheduleCostsReportsController.handle(req, res)
  }
)

export { router as reportsRouter }
