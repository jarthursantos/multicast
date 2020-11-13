import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerRCASalesValueController } from './FindSalesByProviderPerRCASalesValueController'
import { FindSalesByProviderPerRCASalesValueUseCase } from './FindSalesByProviderPerRCASalesValueUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerRCASalesValueUseCase = new FindSalesByProviderPerRCASalesValueUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerRCASalesValueController = new FindSalesByProviderPerRCASalesValueController(
  findSalesByProviderPerRCASalesValueUseCase
)

export {
  findSalesByProviderPerRCASalesValueController,
  findSalesByProviderPerRCASalesValueUseCase
}
