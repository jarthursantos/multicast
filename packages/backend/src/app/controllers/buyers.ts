import { Request, Response } from 'express'

import { findAllBuyersModule, findBuyerByIdModule } from '~/modules/buyers'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleFindAllBuyers(req: Request, res: Response) {
  const result = await findAllBuyersModule.execute()

  res.json(result)
}

export async function handleFindBuyerById(req: Request, res: Response) {
  const { id } = req.params

  const result = await findBuyerByIdModule.execute(normalizeInt(id))

  res.json(result)
}
