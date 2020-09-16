import { Router, Request, Response } from 'express'
import { generateScheduleCostsReportsController } from 'use-cases/GenerateScheduleCostsReports'

const router = Router()

router.get('/reports/schedules/cost', (req: Request, res: Response) => {
  generateScheduleCostsReportsController.handle(req, res)
})

export { router as reportsRouter }
