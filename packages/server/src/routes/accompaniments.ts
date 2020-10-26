import { Router, Request, Response } from 'express'
import { validateBody } from 'middlewares/validate-body'
import {
  cancelAccompanimentSchema,
  cancelAccompanimentsController
} from 'use-cases/CancelAccompaniments'
import { createAnnotationsController } from 'use-cases/CreateAnnotations'
import { findAccompanimentByIdController } from 'use-cases/FindAccompanimentById'
import { findAccompanimentProductsController } from 'use-cases/FindAccompanimentProducts'
import { findAccompanimentsController } from 'use-cases/FindAccompaniments'
import { findInvoicesWithoutAccompanimentsController } from 'use-cases/FindInvoicesWithoutAccompaniments'
import { generateAccompanimentPDFController } from 'use-cases/GenerateAccompanimentPDF'
import { markAccompanimentAsReleasedController } from 'use-cases/MarkAccompanimentAsReleased'
import { markAccompanimentAsReviewedController } from 'use-cases/MarkAccompanimentAsReviewed'
import { markAccompanimentAsSendedController } from 'use-cases/MarkAccompanimentAsSender'
import { renewAccompanimentController } from 'use-cases/RenewAccompaniment'
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

router.get('/accompaniments/:id/generatePDF', (req: Request, res: Response) => {
  generateAccompanimentPDFController.handle(req, res)
})

router.put(
  '/accompaniments/:id',
  validateBody(updateAccompanimentsSchema),
  (req: Request, res: Response) => {
    updateAccompanimentsController.handle(req, res)
  }
)

router.put(
  '/accompaniments/:id/cancel',
  validateBody(cancelAccompanimentSchema),
  (req: Request, res: Response) => {
    cancelAccompanimentsController.handle(req, res)
  }
)

router.get(
  '/accompaniments/:id/products',
  (
    req: Request<
      { id: string },
      {},
      {},
      { only: 'invoice' | 'pending' | 'delivered' }
    >,
    res: Response
  ) => {
    findAccompanimentProductsController.handle(req, res)
  }
)

router.get(
  '/accompaniments/:id/untrackedInvoices',
  (req: Request, res: Response) => {
    findInvoicesWithoutAccompanimentsController.handle(req, res)
  }
)

router.post('/accompaniments/:id/renew', (req: Request, res: Response) => {
  renewAccompanimentController.handle(req, res)
})

router.post(
  '/accompaniments/:id/annotations',
  (req: Request, res: Response) => {
    createAnnotationsController.handle(req, res)
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
