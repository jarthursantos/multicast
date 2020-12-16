import { Router } from 'express'

import { handleCreateSession } from '~/app/controllers/sessions'
import { validateRequestBody } from '~/app/middlewares/validate-request-body'
import { createSessionSchema } from '~/modules/sessions'

const router = Router()

router.post('/', validateRequestBody(createSessionSchema), handleCreateSession)

export { router as sessionsRoutes }
