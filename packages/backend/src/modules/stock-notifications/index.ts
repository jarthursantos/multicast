import { createWinThorStockNotificationsModel } from '~/models/stock-notifications/WinThorStockNotificationsModel'

import { createFindStockNotificationsModule } from './find'

const winThorStockNotificationsModel = createWinThorStockNotificationsModel()

const findStockNotificationsModule = createFindStockNotificationsModule(
  winThorStockNotificationsModel
)

export { findStockNotificationsModule }
export * from './find/parser'
