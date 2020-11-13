import { WinThorSalesClassRepository } from 'repositories/implementations/WinThorSalesClassRepository'

import { FindSalesClassesController } from './FindSalesClassesController'
import { FindSalesClassesUseCase } from './FindSalesClassesUseCase'

const winThorSalesClassRepository = new WinThorSalesClassRepository()

const findSalesClassesUseCase = new FindSalesClassesUseCase(
  winThorSalesClassRepository
)

const findSalesClassesController = new FindSalesClassesController(
  findSalesClassesUseCase
)

export { findSalesClassesController, findSalesClassesUseCase }
