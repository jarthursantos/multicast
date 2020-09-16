import { Router, Request, Response } from 'express'
import { validateBody } from 'middlewares/validate-body'
import {
  createDischargeTableSchema,
  createDischargeTableController
} from 'use-cases/CreateDischargeTables'
import { findDischargeTablesController } from 'use-cases/FindDischargeTables'

const router = Router()

router.get('/dischargeTables', (req: Request, res: Response) => {
  findDischargeTablesController.handle(req, res)
})

router.post(
  '/dischargeTables',
  validateBody(createDischargeTableSchema),
  (req: Request, res: Response) => {
    createDischargeTableController.handle(req, res)
  }
)

export { router as dischargeTablesRouter }
