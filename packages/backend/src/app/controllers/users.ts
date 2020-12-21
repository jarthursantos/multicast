import { Request, Response } from 'express'

import {
  createUserModule,
  disableUserModule,
  enableUserModule,
  findAllUsersModule,
  findUserByIdModule
} from '~/modules/users'

export async function handleFindAllUsers(_req: Request, res: Response) {
  const result = await findAllUsersModule.execute()

  res.json(result)
}

export async function handleFindUserById(req: Request, res: Response) {
  const { id } = req.params

  const result = await findUserByIdModule.execute(id)

  res.json(result)
}

export async function handleDisableUser(req: Request, res: Response) {
  const { user } = req.auth
  const { id } = req.params

  if (user.role !== 'ADMIN') {
    return res.status(401).send()
  }

  await disableUserModule.execute(user, id)

  res.status(200).send()
}

export async function handleEnableUser(req: Request, res: Response) {
  const { user } = req.auth
  const { id } = req.params

  if (user.role !== 'ADMIN') {
    return res.status(401).send()
  }

  await enableUserModule.execute(user, id)

  res.status(200).send()
}

export async function handleCreateUser(req: Request, res: Response) {
  const { auth, body } = req

  const result = await createUserModule.execute(auth.user, body)

  res.status(201).json(result)
}

export async function handleUpdateUser(req: Request, res: Response) {
  const { auth, body } = req

  const result = await createUserModule.execute(auth.user, body)

  res.status(201).json(result)
}
