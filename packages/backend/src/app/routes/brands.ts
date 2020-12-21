import { Router } from 'express'

import {
  handleFindAllBrands,
  handleFindBrandById
} from '~/app/controllers/brands'

const router = Router()

router.get('/', handleFindAllBrands)
router.get('/:id', handleFindBrandById)

export { router as brandsRoutes }
