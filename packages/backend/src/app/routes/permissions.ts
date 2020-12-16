import { Router } from 'express'

import {
  handleCreatePermissions,
  handleFindAllPermissions,
  handleFindPermissionById,
  handleUpdatePermissions
} from '~/app/controllers/permissions'
import { validateRequestBody } from '~/app/middlewares/validate-request-body'
import {
  createPermissionsSchema,
  updatePermissionsSchema
} from '~/modules/permissions'

const router = Router()

router.get('/', handleFindAllPermissions)
router.get('/:id', handleFindPermissionById)
router.post(
  '/',
  validateRequestBody(createPermissionsSchema),
  handleCreatePermissions
)
router.put(
  '/:id',
  validateRequestBody(updatePermissionsSchema),
  handleUpdatePermissions
)

export { router as permissionsRoutes }
