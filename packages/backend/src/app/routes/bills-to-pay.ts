import { Router } from 'express'

import { handleFindAllBillsToPay } from '~/app/controllers/bills-to-pay'

const router = Router()

router.get('/', handleFindAllBillsToPay)

export { router as billsToPayRoutes }
