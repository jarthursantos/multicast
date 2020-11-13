import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerCategoryProductController } from './FindSalesByProviderPerCategoryProductController'
import { FindSalesByProviderPerCategoryProductUseCase } from './FindSalesByProviderPerCategoryProductUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerCategoryProductUseCase = new FindSalesByProviderPerCategoryProductUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerCategoryProductController = new FindSalesByProviderPerCategoryProductController(
  findSalesByProviderPerCategoryProductUseCase
)

export {
  findSalesByProviderPerCategoryProductController,
  findSalesByProviderPerCategoryProductUseCase
}
