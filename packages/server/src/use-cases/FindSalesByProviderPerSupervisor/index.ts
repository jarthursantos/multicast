import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerSupervisorController } from './FindSalesByProviderPerSupervisorController'
import { FindSalesByProviderPerSupervisorUseCase } from './FindSalesByProviderPerSupervisorUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerSupervisorUseCase = new FindSalesByProviderPerSupervisorUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerSupervisorController = new FindSalesByProviderPerSupervisorController(
  findSalesByProviderPerSupervisorUseCase
)

export {
  findSalesByProviderPerSupervisorController,
  findSalesByProviderPerSupervisorUseCase
}
