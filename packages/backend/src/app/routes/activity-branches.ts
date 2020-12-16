import { Router } from 'express'

import {
  handleFindActivityBranchById,
  handleFindAllActivityBranches
} from '~/app/controllers/activity-branches'

const router = Router()

router.get('/', handleFindAllActivityBranches)
router.get('/:id', handleFindActivityBranchById)

export { router as activityBranchesRoutes }
