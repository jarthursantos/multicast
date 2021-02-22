import { Response } from 'express'

import {
  findAllBillsToPayModule,
  parseBillsToPayOptions,
  IFindBillsToPayRequest
} from '~/modules/bills-to-pay'

export async function handleFindAllBillsToPay(
  req: IFindBillsToPayRequest,
  res: Response
) {
  const result = await findAllBillsToPayModule.execute(
    parseBillsToPayOptions(req.query)
  )

  res.json(result)
}
