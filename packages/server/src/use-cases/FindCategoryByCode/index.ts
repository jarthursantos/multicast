import { WinThorCategoryRepository } from 'repositories/implementations/WinThorCategoryRepository'
import { WinThorSectionRepository } from 'repositories/implementations/WinThorSectionRepository'

import { FindCategoryByCodeController } from './FindCategoryByCodeController'
import { FindCategoryByCodeUseCase } from './FindCategoryByCodeUseCase'

const winThorSectionRepository = new WinThorSectionRepository()

const winThorCategoryRepository = new WinThorCategoryRepository()

const findCategoryByCodeUseCase = new FindCategoryByCodeUseCase(
  winThorSectionRepository,
  winThorCategoryRepository
)

const findCategoryByCodeController = new FindCategoryByCodeController(
  findCategoryByCodeUseCase
)

export { findCategoryByCodeUseCase, findCategoryByCodeController }
