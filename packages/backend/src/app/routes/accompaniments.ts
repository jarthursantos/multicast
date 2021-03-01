import { Router } from 'express'

import {
  handleCancelAccompaniments,
  handleCreateAccompanimentAnnotations,
  handleFindAccompanimentById,
  handleFindAccompanimentProducts,
  handleFindAccompanimentUntrackedInvoices,
  handleFindAllAccompaniments,
  handleGenerateAccompanimentPDFReport,
  handleMarkAccompanimentAsFinished,
  handleMarkAccompanimentAsReleased,
  handleMarkAccompanimentAsReviewed,
  handleMarkAccompanimentAsSended,
  handleRenewAccompaniments,
  handleUpdateAccompaniments,
  handleFindCanceledAccompaniments
} from '~/app/controllers/accompaniments'
import {
  cancelAccompanimentsSchema,
  updateAccompanimentsSchema
} from '~/modules/accompaniments'

import { validateRequestBody } from '../middlewares/validate-request-body'

const router = Router()

router.get('/', handleFindAllAccompaniments)
router.get('/canceleds', handleFindCanceledAccompaniments)
router.get('/:id', handleFindAccompanimentById)
router.get('/:id/generatePDF', handleGenerateAccompanimentPDFReport)
router.get('/:id/products', handleFindAccompanimentProducts)
router.get('/:id/untrackedInvoices', handleFindAccompanimentUntrackedInvoices)

router.put(
  '/:id',
  validateRequestBody(updateAccompanimentsSchema),
  handleUpdateAccompaniments
)
router.put(
  '/:id/cancel',
  validateRequestBody(cancelAccompanimentsSchema),
  handleCancelAccompaniments
)

router.post('/:id/renew', handleRenewAccompaniments)
router.post('/:id/annotations', handleCreateAccompanimentAnnotations)
router.post('/:id/markAsSended', handleMarkAccompanimentAsSended)
router.post('/:id/markAsReviewed', handleMarkAccompanimentAsReviewed)
router.post('/:id/markAsReleased', handleMarkAccompanimentAsReleased)
router.post('/:id/markAsFinished', handleMarkAccompanimentAsFinished)

export { router as accompanimentsRoutes }
