import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerActivityBranchController } from './FindSalesByProviderPerActivityBranchController'
import { FindSalesByProviderPerActivityBranchUseCase } from './FindSalesByProviderPerActivityBranchUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerActivityBranchUseCase = new FindSalesByProviderPerActivityBranchUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerActivityBranchController = new FindSalesByProviderPerActivityBranchController(
  findSalesByProviderPerActivityBranchUseCase
)

export {
  findSalesByProviderPerActivityBranchController,
  findSalesByProviderPerActivityBranchUseCase
}
