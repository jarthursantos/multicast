import { Router } from 'express'

import { handleFindAllClasses } from '~/app/controllers/classes'

const router = Router()

router.get('/', handleFindAllClasses)

export { router as classesRoutes }
