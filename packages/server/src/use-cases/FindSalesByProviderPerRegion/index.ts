import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerRegionController } from './FindSalesByProviderPerRegionController'
import { FindSalesByProviderPerRegionUseCase } from './FindSalesByProviderPerRegionUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerRegionUseCase = new FindSalesByProviderPerRegionUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerRegionController = new FindSalesByProviderPerRegionController(
  findSalesByProviderPerRegionUseCase
)

export {
  findSalesByProviderPerRegionController,
  findSalesByProviderPerRegionUseCase
}
