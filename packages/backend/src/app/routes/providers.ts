import { Router } from 'express'

import { handleSearchProviders } from '~/app/controllers/providers'

const router = Router()

router.get('/', handleSearchProviders)

export { router as providersRoutes }
