import { Request, Response } from 'express'

import {
  createScheduleInvoicesModule,
  updateScheduleInvoicesModule,
  deleteScheduleInvoicesModule,
  cancelScheduleInvoicesModule,
  moveScheduleInvoicesModule
} from '~/modules/schedule-invoices'
import {
  createSchedulesModule,
  findAllSchedulesModule,
  updateSchedulesModule,
  rescheduleSchedulesModule,
  IFindAllSchedulesRequest,
  parseFindAllSchedulesOptions,
  closeSchedulesModule,
  cancelSchedulesModule,
  deleteSchedulesModule,
  searchSchedulesModule,
  ISearchSchedulesRequest,
  parseSearchSchedulesOptions,
  receiveSchedulesModule
} from '~/modules/schedules'

export async function handleFindAllSchedules(
  req: IFindAllSchedulesRequest,
  res: Response
) {
  const result = await findAllSchedulesModule.execute(
    parseFindAllSchedulesOptions(req.query)
  )

  res.json(result)
}

export async function handleCreateSchedule(req: Request, res: Response) {
  const { auth, body } = req

  const result = await createSchedulesModule.execute(auth.user, body)

  res.json(result)
}

export async function handleUpdateSchedule(req: Request, res: Response) {
  const { auth, body } = req
  const { id } = req.params

  const result = await updateSchedulesModule.execute(auth.user, id, body)

  res.json(result)
}

export async function handleRescheduleSchedule(req: Request, res: Response) {
  const { body } = req
  const { id } = req.params

  const result = await rescheduleSchedulesModule.execute(id, body)

  res.json(result)
}

export async function handleCloseSchedule(req: Request, res: Response) {
  const { id } = req.params

  const result = await closeSchedulesModule.execute(id)

  res.json(result)
}

export async function handleCancelSchedule(req: Request, res: Response) {
  const { body } = req
  const { id } = req.params

  const result = await cancelSchedulesModule.execute(id, body)

  res.json(result)
}

export async function handleDeleteSchedule(req: Request, res: Response) {
  const { id } = req.params

  const result = await deleteSchedulesModule.execute(id)

  res.json(result)
}

export async function handleCreateScheduleInvoice(req: Request, res: Response) {
  const { auth, body } = req
  const { id } = req.params

  const result = await createScheduleInvoicesModule.execute(auth.user, id, body)

  res.json(result)
}

export async function handleUpdateScheduleInvoice(req: Request, res: Response) {
  const { auth, body } = req
  const { scheduleId, id } = req.params

  const result = await updateScheduleInvoicesModule.execute(
    auth.user,
    scheduleId,
    id,
    body
  )

  res.json(result)
}

export async function handleDeleteScheduleInvoice(req: Request, res: Response) {
  const { scheduleId, id } = req.params

  const result = await deleteScheduleInvoicesModule.execute(scheduleId, id)

  res.json(result)
}

export async function handleCancelScheduleInvoice(req: Request, res: Response) {
  const { scheduleId, id } = req.params

  const result = await cancelScheduleInvoicesModule.execute(scheduleId, id)

  res.json(result)
}

export async function handleMoveScheduleInvoice(req: Request, res: Response) {
  const { scheduleId, id, destinationId } = req.params

  const result = await moveScheduleInvoicesModule.execute(
    scheduleId,
    id,
    destinationId
  )

  res.json(result)
}

export async function handleSearchSchedules(
  req: ISearchSchedulesRequest,
  res: Response
) {
  const result = await searchSchedulesModule.execute(
    parseSearchSchedulesOptions(req.query)
  )

  res.json(result)
}

export async function handleReceiveSchedules(req: Request, res: Response) {
  const { id } = req.params

  const result = await receiveSchedulesModule.execute(id, req.body)

  res.json(result)
}
