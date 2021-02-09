import { Request, Response } from 'express'

import {
  availableHoursModule,
  createAgendaModule,
  findManyAgendaModule,
  findByBuyerAgendaModule,
  findByProviderAgendaModule
} from '~/modules/agenda'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleCalculateAvailableHours(
  req: Request,
  res: Response
) {
  const { body, params } = req

  const result = await availableHoursModule.execute(
    normalizeInt(params.code),
    body
  )

  res.json(result)
}

export async function handleCreateAgenda(req: Request, res: Response) {
  const { auth, body } = req

  const result = await createAgendaModule.execute(auth.user, body)

  res.json(result)
}

export async function handleFingManyAgenda(req: Request, res: Response) {
  const result = await findManyAgendaModule.execute()

  res.json(result)
}

export async function handleFingByBuyerAgenda(req: Request, res: Response) {
  const result = await findByBuyerAgendaModule.execute(
    normalizeInt(req.params.code)
  )

  res.json(result)
}

export async function handleFingByProviderAgenda(req: Request, res: Response) {
  const result = await findByProviderAgendaModule.execute(
    normalizeInt(req.params.code)
  )

  res.json(result)
}
