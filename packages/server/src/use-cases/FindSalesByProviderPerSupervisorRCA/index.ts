import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerSupervisorRCAController } from './FindSalesByProviderPerSupervisorRCAController'
import { FindSalesByProviderPerSupervisorRCAUseCase } from './FindSalesByProviderPerSupervisorRCAUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerSupervisorRCAUseCase = new FindSalesByProviderPerSupervisorRCAUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerSupervisorRCAController = new FindSalesByProviderPerSupervisorRCAController(
  findSalesByProviderPerSupervisorRCAUseCase
)

export {
  findSalesByProviderPerSupervisorRCAController,
  findSalesByProviderPerSupervisorRCAUseCase
}
