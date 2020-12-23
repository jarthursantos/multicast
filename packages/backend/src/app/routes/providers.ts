import { Router } from 'express'

import {
  handleSearchProviders,
  handleFindProviderByCode
} from '~/app/controllers/providers'

const router = Router()

router.get('/', handleSearchProviders)
router.get('/:id', handleFindProviderByCode)

export { router as providersRoutes }
