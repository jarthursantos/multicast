import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerCategoryController } from './FindSalesByProviderPerCategoryController'
import { FindSalesByProviderPerCategoryUseCase } from './FindSalesByProviderPerCategoryUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerCategoryUseCase = new FindSalesByProviderPerCategoryUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerCategoryController = new FindSalesByProviderPerCategoryController(
  findSalesByProviderPerCategoryUseCase
)

export {
  findSalesByProviderPerCategoryController,
  findSalesByProviderPerCategoryUseCase
}
