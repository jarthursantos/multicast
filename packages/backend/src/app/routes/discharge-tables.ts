import { Router } from 'express'

import {
  handleCreateDischargeTables,
  handleFindLatestDischargeTable
} from '~/app/controllers/discharge-tables'
import { createDischargeTableSchema } from '~/modules/discharge-tables'

import { validateRequestBody } from '../middlewares/validate-request-body'

const router = Router()

router.get('/', handleFindLatestDischargeTable)
router.post(
  '/',
  validateRequestBody(createDischargeTableSchema),
  handleCreateDischargeTables
)

export { router as dischargeTablesRoutes }
