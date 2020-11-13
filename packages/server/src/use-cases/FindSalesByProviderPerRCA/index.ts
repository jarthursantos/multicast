import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerRCAController } from './FindSalesByProviderPerRCAController'
import { FindSalesByProviderPerRCAUseCase } from './FindSalesByProviderPerRCAUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerRCAUseCase = new FindSalesByProviderPerRCAUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerRCAController = new FindSalesByProviderPerRCAController(
  findSalesByProviderPerRCAUseCase
)

export { findSalesByProviderPerRCAController, findSalesByProviderPerRCAUseCase }
