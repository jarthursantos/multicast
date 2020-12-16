import { Router } from 'express'

import {
  handleFindAllClients,
  handleFindClientById
} from '~/app/controllers/clients'

const router = Router()

router.get('/', handleFindAllClients)
router.get('/:id', handleFindClientById)

export { router as clientsRoutes }
