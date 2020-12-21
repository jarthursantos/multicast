import { Router } from 'express'

import {
  handleFindAllSchedules,
  handleCreateSchedule,
  handleUpdateSchedule,
  handleRescheduleSchedule,
  handleCloseSchedule,
  handleCancelSchedule,
  handleDeleteSchedule,
  handleCreateScheduleInvoice,
  handleUpdateScheduleInvoice,
  handleDeleteScheduleInvoice,
  handleCancelScheduleInvoice,
  handleMoveScheduleInvoice,
  handleSearchSchedules,
  handleReceiveSchedules,
  handleMarkScheduleInvoiceAsNonReceived,
  handleMarkScheduleInvoiceAsReceived,
  handleGenerateScheduleCostsReport,
  handleGenerateScheduleInvoiceReceipt,
  handleGenerateScheduleReceipt
} from '~/app/controllers/schedules'
import { createInvoicesSchema, updateInvoicesSchema } from '~/modules/invoices'
import {
  createSchedulesSchema,
  updateSchedulesSchema,
  rescheduleSchedulesSchema,
  receiveSchedulesSchema
} from '~/modules/schedules'

import { validateRequestBody } from '../middlewares/validate-request-body'

const router = Router()

// #region Schedules

router.get('/search', handleSearchSchedules)

router.get('/', handleFindAllSchedules)
router.post(
  '/',
  validateRequestBody(createSchedulesSchema),
  handleCreateSchedule
)
router.put(
  '/:id',
  validateRequestBody(updateSchedulesSchema),
  handleUpdateSchedule
)
router.put(
  '/:id/reschedule',
  validateRequestBody(rescheduleSchedulesSchema),
  handleRescheduleSchedule
)
router.put('/:id/close', handleCloseSchedule)
router.put(
  '/:id/receive',
  validateRequestBody(receiveSchedulesSchema),
  handleReceiveSchedules
)
router.put('/:id/cancel', handleCancelSchedule)
router.delete('/:id', handleDeleteSchedule)
router.get('/:id/receipt', handleGenerateScheduleReceipt)

// #endregion

// #region Invoices

router.post(
  '/:id/invoices',
  validateRequestBody(createInvoicesSchema),
  handleCreateScheduleInvoice
)
router.put(
  '/:scheduleId/invoices/:id',
  validateRequestBody(updateInvoicesSchema),
  handleUpdateScheduleInvoice
)
router.delete('/:scheduleId/invoices/:id', handleDeleteScheduleInvoice)
router.put('/:scheduleId/invoices/:id/cancel', handleCancelScheduleInvoice)
router.put(
  '/:scheduleId/invoices/:id/move/:destinationId',
  handleMoveScheduleInvoice
)
router.put(
  '/:scheduleId/invoices/:id/nonReceive',
  handleMarkScheduleInvoiceAsNonReceived
)
router.put(
  '/:scheduleId/invoices/:id/receive',
  handleMarkScheduleInvoiceAsReceived
)
router.get(
  '/:scheduleId/invoices/:id/receipt',
  handleGenerateScheduleInvoiceReceipt
)

// #endregion

// #region Reports

router.get('/reports/cost', handleGenerateScheduleCostsReport)

// #endregion

export { router as schedulesRoutes }
