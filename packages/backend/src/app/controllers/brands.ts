import { Request, Response } from 'express'

import { findAllBrandsModule, findBrandByIdModule } from '~/modules/brands'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleFindAllBrands(req: Request, res: Response) {
  const result = await findAllBrandsModule.execute()

  res.json(result)
}

export async function handleFindBrandById(req: Request, res: Response) {
  const { id } = req.params

  const result = await findBrandByIdModule.execute(normalizeInt(id))

  res.json(result)
}
