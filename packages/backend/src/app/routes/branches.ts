import { Router } from 'express'

import { handleFindAllBranches } from '~/app/controllers/branches'

const router = Router()

router.get('/', handleFindAllBranches)

export { router as branchesRoutes }
