import { Request, Response } from 'express'

import { findAllRegionsModule, findRegionByIdModule } from '~/modules/regions'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleFindAllRegions(req: Request, res: Response) {
  const result = await findAllRegionsModule.execute()

  res.json(result)
}

export async function handleFindRegionById(req: Request, res: Response) {
  const { id } = req.params

  const result = await findRegionByIdModule.execute(normalizeInt(id))

  res.json(result)
}
