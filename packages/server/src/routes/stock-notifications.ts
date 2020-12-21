import { Response, Router } from 'express'
import { findStockNotificationsController } from 'use-cases/FindStockNotifications'
import { FindStockNotificationsRequest } from 'utils/parse-stock-notifications-options'

const router = Router()

router.get(
  '/stockNotifications',
  (req: FindStockNotificationsRequest, res: Response) => {
    findStockNotificationsController.handle(req, res)
  }
)

export { router as stockNotificationsRouter }
