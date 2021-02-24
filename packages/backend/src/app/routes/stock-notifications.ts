import { Router } from 'express'

import { handleFindStockNotifications } from '~/app/controllers/stock-notifications'

const router = Router()

router.get('/', handleFindStockNotifications)

export { router as stockNotificationsRoutes }
