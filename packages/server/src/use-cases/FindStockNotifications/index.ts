import { WinThorStockNotificationsRepository } from 'repositories/implementations/WinThorStockNotificationsRepository'

import { FindStockNotificationsController } from './FindStockNotificationsController'
import { findStockNotificationsSchema } from './findStockNotificationsSchema'
import { FindStockNotificationsUseCase } from './FindStockNotificationsUseCase'

const winThorStockNotificationsRepository = new WinThorStockNotificationsRepository()

const findStockNotificationsUseCase = new FindStockNotificationsUseCase(
  winThorStockNotificationsRepository
)

const findStockNotificationsController = new FindStockNotificationsController(
  findStockNotificationsUseCase
)

export {
  findStockNotificationsUseCase,
  findStockNotificationsController,
  findStockNotificationsSchema
}
