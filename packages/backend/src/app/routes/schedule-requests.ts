import { Router } from 'express'

import {
  handleCreateScheduleRequests,
  handleFindAllScheduleRequests,
  handleRemoveScheduleRequests,
  handleUpdateScheduleRequests
} from '~/app/controllers/schedule-requests'
import {
  createScheduleRequestsSchema,
  updateScheduleRequestsSchema
} from '~/modules/schedule-requests'

import { validateRequestBody } from '../middlewares/validate-request-body'

const router = Router()

router.get('/', handleFindAllScheduleRequests)
router.post(
  '/',
  validateRequestBody(createScheduleRequestsSchema),
  handleCreateScheduleRequests
)
router.put(
  '/:id',
  validateRequestBody(updateScheduleRequestsSchema),
  handleUpdateScheduleRequests
)
router.delete('/:id', handleRemoveScheduleRequests)

export { router as scheduleRequestsRoutes }
