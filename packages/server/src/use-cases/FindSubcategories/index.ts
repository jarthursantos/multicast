import { WinThorCategoryRepository } from 'repositories/implementations/WinThorCategoryRepository'
import { WinThorSectionRepository } from 'repositories/implementations/WinThorSectionRepository'
import { WinThorSubcategoryRepository } from 'repositories/implementations/WinThorSubcategoryRepository'

import { FindSubcategoriesController } from './FindSubcategoriesController'
import { FindSubcategoriesUseCase } from './FindSubcategoriesUseCase'

const winThorSectionRepository = new WinThorSectionRepository()
const winThorCategoryRepository = new WinThorCategoryRepository()
const winThorSubcategoryRepository = new WinThorSubcategoryRepository()

const findSubcategoriesUseCase = new FindSubcategoriesUseCase(
  winThorSectionRepository,
  winThorCategoryRepository,
  winThorSubcategoryRepository
)

const findSubcategoriesController = new FindSubcategoriesController(
  findSubcategoriesUseCase
)

export { findSubcategoriesUseCase, findSubcategoriesController }
