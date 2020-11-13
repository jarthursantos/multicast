import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerRouteController } from './FindSalesByProviderPerRouteController'
import { FindSalesByProviderPerRouteUseCase } from './FindSalesByProviderPerRouteUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerRouteUseCase = new FindSalesByProviderPerRouteUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerRouteController = new FindSalesByProviderPerRouteController(
  findSalesByProviderPerRouteUseCase
)

export {
  findSalesByProviderPerRouteController,
  findSalesByProviderPerRouteUseCase
}
