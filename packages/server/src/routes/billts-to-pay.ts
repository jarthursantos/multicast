import { Router, Response } from 'express'
import { findBillsToPayController } from 'use-cases/FindBillsToPay'
import { FindBillsToPayRequest } from 'use-cases/FindBillsToPay/FindBillstoPayParser'

const router = Router()

router.get(
  '/billsToPay/:year/:month',
  (req: FindBillsToPayRequest, res: Response) => {
    findBillsToPayController.handle(req, res)
  }
)

export { router as billsToPayRouter }
