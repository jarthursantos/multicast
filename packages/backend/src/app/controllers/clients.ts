import { Request, Response } from 'express'

import { findAllClientsModule, findClientByIdModule } from '~/modules/clients'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleFindAllClients(req: Request, res: Response) {
  const result = await findAllClientsModule.execute()

  res.json(result)
}

export async function handleFindClientById(req: Request, res: Response) {
  const { id } = req.params

  const result = await findClientByIdModule.execute(normalizeInt(id))

  res.json(result)
}
