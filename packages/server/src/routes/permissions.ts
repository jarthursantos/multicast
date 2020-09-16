import { Router, Request, Response } from 'express'
import { validateBody } from 'middlewares/validate-body'
import {
  createPermissionsSchema,
  createPermissionsController
} from 'use-cases/CreatePermissions'
import { findPermissionsByIdController } from 'use-cases/FindPermissionById'
import { findPermissionsController } from 'use-cases/FindPermissions'
import {
  updatePermissionsSchema,
  updatePermissionsController
} from 'use-cases/UpdatePermissions'

const router = Router()

router.get('/permissions', (req: Request, res: Response) => {
  findPermissionsController.handle(req, res)
})

router.get('/permissions/:id', (req: Request, res: Response) => {
  findPermissionsByIdController.handle(req, res)
})

router.post(
  '/permissions',
  validateBody(createPermissionsSchema),
  (req: Request, res: Response) => {
    createPermissionsController.handle(req, res)
  }
)

router.put(
  '/permissions/:id',
  validateBody(updatePermissionsSchema),
  (req: Request, res: Response) => {
    updatePermissionsController.handle(req, res)
  }
)

export { router as permissionsRouter }
