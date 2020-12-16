import { Request, Response } from 'express'

import {
  createScheduleRequestModule,
  findAllScheduleRequestsModule,
  removeScheduleRequestsModule,
  updateScheduleRequestsModule
} from '~/modules/schedule-requests'

export async function handleCreateScheduleRequests(
  req: Request,
  res: Response
) {
  const { auth, body } = req

  const result = await createScheduleRequestModule.execute(auth.user, body)

  res.json(result)
}

export async function handleFindAllScheduleRequests(
  req: Request,
  res: Response
) {
  const result = await findAllScheduleRequestsModule.execute()

  res.json(result)
}

export async function handleRemoveScheduleRequests(
  req: Request,
  res: Response
) {
  const { id } = req.params

  const result = await removeScheduleRequestsModule.execute(id)

  res.json(result)
}

export async function handleUpdateScheduleRequests(
  req: Request,
  res: Response
) {
  const { auth, body } = req
  const { id } = req.params

  const result = await updateScheduleRequestsModule.execute(auth.user, id, body)

  res.json(result)
}
