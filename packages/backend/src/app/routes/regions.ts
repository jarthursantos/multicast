import { Router } from 'express'

import {
  handleFindAllRegions,
  handleFindRegionById
} from '~/app/controllers/regions'

const router = Router()

router.get('/', handleFindAllRegions)
router.get('/:id', handleFindRegionById)

export { router as regionsRoutes }
