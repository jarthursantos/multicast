import { Response } from 'express'

import {
  findAllBillsToPayModule,
  parseBillsToPayOptions,
  IFindBillsToPayRequest
} from '~/modules/bills-to-pay'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleFindAllBillsToPay(
  req: IFindBillsToPayRequest,
  res: Response
) {
  const { month, year } = req.params

  const result = await findAllBillsToPayModule.execute(
    parseBillsToPayOptions(req.query),
    normalizeInt(month),
    normalizeInt(year)
  )

  res.json(result)
}
