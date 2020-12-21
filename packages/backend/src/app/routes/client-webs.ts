import { Router } from 'express'

import {
  handleFindAllClientWebs,
  handleFindClientWebById
} from '~/app/controllers/client-webs'

const router = Router()

router.get('/', handleFindAllClientWebs)
router.get('/:id', handleFindClientWebById)

export { router as clientWebsRoutes }
