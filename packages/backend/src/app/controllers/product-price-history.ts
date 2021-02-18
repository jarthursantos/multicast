import { Request, Response } from 'express'

import { findProductPriceHistory } from '~/modules/product-price-history'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleFindProductPriceHistory(
  req: Request,
  res: Response
) {
  const { id } = req.params

  const result = await findProductPriceHistory.execute(normalizeInt(id))

  return res.json(result)
}
