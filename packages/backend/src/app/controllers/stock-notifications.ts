import { Response } from 'express'

import {
  findStockNotificationsModule,
  parseFindStockNotificationsOptions,
  IFindStockNotificationsRequest
} from '~/modules/stock-notifications'

export async function handleFindStockNotifications(
  req: IFindStockNotificationsRequest,
  res: Response
) {
  const result = await findStockNotificationsModule.execute(
    parseFindStockNotificationsOptions(req.query)
  )

  res.json(result)
}
