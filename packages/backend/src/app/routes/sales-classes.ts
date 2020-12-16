import { Router } from 'express'

import { handleFindAllSalesClasses } from '~/app/controllers/sales-classes'

const router = Router()

router.get('/', handleFindAllSalesClasses)

export { router as salesClassesRoutes }
