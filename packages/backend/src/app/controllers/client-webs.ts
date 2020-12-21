import { Request, Response } from 'express'

import {
  findAllClientWebsModule,
  findClientWebByIdModule
} from '~/modules/client-webs'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleFindAllClientWebs(req: Request, res: Response) {
  const result = await findAllClientWebsModule.execute()

  res.json(result)
}

export async function handleFindClientWebById(req: Request, res: Response) {
  const { id } = req.params

  const result = await findClientWebByIdModule.execute(normalizeInt(id))

  res.json(result)
}
