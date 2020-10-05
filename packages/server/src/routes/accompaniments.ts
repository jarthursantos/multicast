import { Router, Request, Response } from 'express'
import { validateBody } from 'middlewares/validate-body'
import { findAccompanimentByIdController } from 'use-cases/FindAccompanimentById'
import { findAccompanimentsController } from 'use-cases/FindAccompaniments'
import { markAccompanimentAsReleasedController } from 'use-cases/MarkAccompanimentAsReleased'
import { markAccompanimentAsReviewedController } from 'use-cases/MarkAccompanimentAsReviewed'
import { markAccompanimentAsSendedController } from 'use-cases/MarkAccompanimentAsSender'
import {
  updateAccompanimentsController,
  updateAccompanimentsSchema
} from 'use-cases/UpdateAccompaniments'

const router = Router()

router.get('/accompaniments', (req: Request, res: Response) => {
  findAccompanimentsController.handle(req, res)
})

router.get('/accompaniments/:id', (req: Request, res: Response) => {
  findAccompanimentByIdController.handle(req, res)
})

router.put(
  '/accompaniments/:id',
  validateBody(updateAccompanimentsSchema),
  (req: Request, res: Response) => {
    updateAccompanimentsController.handle(req, res)
  }
)

router.post(
  '/accompaniments/:id/markAsSended',
  (req: Request, res: Response) => {
    markAccompanimentAsSendedController.handle(req, res)
  }
)

router.post(
  '/accompaniments/:id/markAsReviewed',
  (req: Request, res: Response) => {
    markAccompanimentAsReviewedController.handle(req, res)
  }
)

router.post(
  '/accompaniments/:id/markAsReleased',
  (req: Request, res: Response) => {
    markAccompanimentAsReleasedController.handle(req, res)
  }
)

export { router as accompanimentsRouter }
