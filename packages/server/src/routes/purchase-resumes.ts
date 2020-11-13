import { Router, Request, Response } from 'express'
import { findPurchaseResumesPerBuyerController } from 'use-cases/FindPurchaseResumesPerBuyer'
import { findPurchaseResumesPerBuyerInvoicesController } from 'use-cases/FindPurchaseResumesPerBuyerInvoices'
import { findPurchaseResumesPerEvolutionController } from 'use-cases/FindPurchaseResumesPerEvolution'
import { findPurchaseResumesPerEvolutionInvoicesController } from 'use-cases/FindPurchaseResumesPerEvolutionInvoices'
import { findPurchaseResumesPerProviderController } from 'use-cases/FindPurchaseResumesPerProvider'
import { findPurchaseResumesPerProviderInvoicesController } from 'use-cases/FindPurchaseResumesPerProviderInvoices'
import { findPurchaseResumesPerUFController } from 'use-cases/FindPurchaseResumesPerUF'
import { findPurchaseResumesPerUFInvoicesController } from 'use-cases/FindPurchaseResumesPerUFInvoices'
import { FindPurchaseResumesQueryOptions } from 'utils/parse-purchase-resume-options'

const router = Router()

router.get(
  '/purchaseResumes/buyers',
  (req: PurchaseResumseRequest, res: Response) => {
    findPurchaseResumesPerBuyerController.handle(req, res)
  }
)

router.get(
  '/purchaseResumes/buyers/:id',
  (req: PurchaseResumseInvoicesRequest, res: Response) => {
    findPurchaseResumesPerBuyerInvoicesController.handle(req, res)
  }
)

router.get(
  '/purchaseResumes/providers',
  (req: PurchaseResumseRequest, res: Response) => {
    findPurchaseResumesPerProviderController.handle(req, res)
  }
)

router.get(
  '/purchaseResumes/providers/:id',
  (req: PurchaseResumseInvoicesRequest, res: Response) => {
    findPurchaseResumesPerProviderInvoicesController.handle(req, res)
  }
)

router.get(
  '/purchaseResumes/evolutions',
  (req: PurchaseResumseRequest, res: Response) => {
    findPurchaseResumesPerEvolutionController.handle(req, res)
  }
)

router.get(
  '/purchaseResumes/evolutions/:id',
  (req: PurchaseResumseInvoicesRequest, res: Response) => {
    findPurchaseResumesPerEvolutionInvoicesController.handle(req, res)
  }
)

router.get(
  '/purchaseResumes/ufs',
  (req: PurchaseResumseRequest, res: Response) => {
    findPurchaseResumesPerUFController.handle(req, res)
  }
)

router.get(
  '/purchaseResumes/ufs/:id',
  (req: PurchaseResumseInvoicesRequest, res: Response) => {
    findPurchaseResumesPerUFInvoicesController.handle(req, res)
  }
)

type PurchaseResumseRequest = Request<
  {},
  {},
  {},
  FindPurchaseResumesQueryOptions
>

type PurchaseResumseInvoicesRequest = Request<
  { id: string },
  {},
  {},
  FindPurchaseResumesQueryOptions
>

export { router as purchaseResumesRouter }
