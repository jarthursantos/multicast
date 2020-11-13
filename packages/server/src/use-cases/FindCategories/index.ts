import { WinThorCategoryRepository } from 'repositories/implementations/WinThorCategoryRepository'
import { WinThorSectionRepository } from 'repositories/implementations/WinThorSectionRepository'

import { FindCategoriesController } from './FindCategoriesController'
import { FindCategoriesUseCase } from './FindCategoriesUseCase'

const winThorSectionRepository = new WinThorSectionRepository()
const winThorCategoryRepository = new WinThorCategoryRepository()

const findCategoriesUseCase = new FindCategoriesUseCase(
  winThorSectionRepository,
  winThorCategoryRepository
)

const findCategoriesController = new FindCategoriesController(
  findCategoriesUseCase
)

export { findCategoriesController }
