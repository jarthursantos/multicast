import { Router } from 'express'

import {
  handleFindAllBuyers,
  handleFindBuyerById
} from '~/app/controllers/buyers'

const router = Router()

router.get('/', handleFindAllBuyers)
router.get('/:id', handleFindBuyerById)

export { router as buyersRoutes }
