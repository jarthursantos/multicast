import { Request, Response } from 'express'

import {
  createPermissionsModule,
  findAllPermissionsModule,
  findPermissionsByIdModule,
  updatePermissionsModule
} from '~/modules/permissions'

export async function handleCreatePermissions(req: Request, res: Response) {
  const { auth, body } = req

  const result = await createPermissionsModule.execute(auth.user, body)

  res.json(result)
}

export async function handleFindAllPermissions(req: Request, res: Response) {
  const result = await findAllPermissionsModule.execute()

  res.json(result)
}

export async function handleFindPermissionById(req: Request, res: Response) {
  const { id } = req.params

  const result = await findPermissionsByIdModule.execute(id)

  res.json(result)
}

export async function handleUpdatePermissions(req: Request, res: Response) {
  const { auth, body } = req
  const { id } = req.params

  const result = await updatePermissionsModule.execute(auth.user, id, body)

  res.json(result)
}
