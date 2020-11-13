import { Request, Response, Router } from 'express'
import { validateBody } from 'middlewares/validate-body'
import {
  findStockNotificationsController,
  findStockNotificationsSchema
} from 'use-cases/FindStockNotifications'

const router = Router()

router.post(
  '/stockNotifications',
  validateBody(findStockNotificationsSchema),
  (req: Request, res: Response) => {
    findStockNotificationsController.handle(req, res)
  }
)

export { router as stockNotificationsRouter }
