import { Request, Response, Router } from 'express'
import { validateBody } from 'middlewares/validate-body'
import { createUserSchema, createUserController } from 'use-cases/CreateUser'
import { disableUserController } from 'use-cases/DisableUser'
import { enableUserController } from 'use-cases/EnableUser'
import { findUserByIdController } from 'use-cases/FindUserById'
import { findUserChangesController } from 'use-cases/FindUserChanges'
import { findUsersController } from 'use-cases/FindUsers'
import { updateUserSchema, updateUserController } from 'use-cases/UpdateUser'

const router = Router()

router.get('/users', (req: Request, res: Response) => {
  findUsersController.handle(req, res)
})

router.get('/users/:id', (req: Request, res: Response) => {
  findUserByIdController.handle(req, res)
})

router.post(
  '/users',
  validateBody(createUserSchema),
  (req: Request, res: Response) => {
    createUserController.handle(req, res)
  }
)

router.put(
  '/users/:id',
  validateBody(updateUserSchema),
  (req: Request, res: Response) => {
    updateUserController.handle(req, res)
  }
)

router.delete('/users/:id', (req: Request, res: Response) => {
  disableUserController.handle(req, res)
})

router.put('/users/:id/enable', (req: Request, res: Response) => {
  enableUserController.handle(req, res)
})

router.get('/users/:id/changes', (req: Request, res: Response) => {
  findUserChangesController.handle(req, res)
})

export { router as usersRouter }
