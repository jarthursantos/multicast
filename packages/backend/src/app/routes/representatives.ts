import { Router } from 'express'

import { handleFindAllRepresentatives } from '~/app/controllers/representatives'

const router = Router()

router.get('/', handleFindAllRepresentatives)

export { router as representativesRoutes }
