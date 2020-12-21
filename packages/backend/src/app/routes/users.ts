import { Router } from 'express'

import {
  handleCreateUser,
  handleDisableUser,
  handleFindAllUsers,
  handleFindUserById,
  handleUpdateUser
} from '~/app/controllers/users'
import { validateRequestBody } from '~/app/middlewares/validate-request-body'
import { createUserSchema, updateUserSchema } from '~/modules/users'

const routes = Router()

routes.get('/', handleFindAllUsers)
routes.get('/:id', handleFindUserById)
routes.post('/', validateRequestBody(createUserSchema), handleCreateUser)
routes.put('/:id', validateRequestBody(updateUserSchema), handleUpdateUser)
routes.delete('/:id', handleDisableUser)

export { routes as usersRoutes }
