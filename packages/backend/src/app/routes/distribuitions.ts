import { Router } from 'express'

import {
  handleFindAllDistribuitions,
  handleFindDistribuitionById
} from '~/app/controllers/distribuitions'

const router = Router()

router.get('/', handleFindAllDistribuitions)
router.get('/:id', handleFindDistribuitionById)

export { router as distribuitionsRoutes }
