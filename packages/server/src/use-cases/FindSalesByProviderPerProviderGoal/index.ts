import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerProviderGoalController } from './FindSalesByProviderPerProviderGoalController'
import { FindSalesByProviderPerProviderGoalUseCase } from './FindSalesByProviderPerProviderGoalUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerProviderGoalUseCase = new FindSalesByProviderPerProviderGoalUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerProviderGoalController = new FindSalesByProviderPerProviderGoalController(
  findSalesByProviderPerProviderGoalUseCase
)

export {
  findSalesByProviderPerProviderGoalController,
  findSalesByProviderPerProviderGoalUseCase
}
