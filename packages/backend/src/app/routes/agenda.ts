import { Router } from 'express'

import {
  handleCalculateAvailableHours,
  handleCreateAgenda,
  handleFingByBuyerAgenda,
  handleFingByProviderAgenda,
  handleFingManyAgenda
} from '~/app/controllers/agenda'
import { createAgendaSchema } from '~/modules/agenda'

import { validateRequestBody } from '../middlewares/validate-request-body'

const router = Router()

router.get('/', handleFingManyAgenda)
router.get('/buyer/:code', handleFingByBuyerAgenda)
router.get('/provider/:code', handleFingByProviderAgenda)

router.post('/', validateRequestBody(createAgendaSchema), handleCreateAgenda)
router.post('/:code/availableHours', handleCalculateAvailableHours)

export { router as agendaRoutes }
