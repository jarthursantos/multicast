import { WinThorCategoryRepository } from 'repositories/implementations/WinThorCategoryRepository'
import { WinThorSectionRepository } from 'repositories/implementations/WinThorSectionRepository'
import { WinThorSubcategoryRepository } from 'repositories/implementations/WinThorSubcategoryRepository'

import { FindSubcategoryByCodeController } from './FindSubcategoryByCodeController'
import { FindSubcategoryByCodeUseCase } from './FindSubcategoryByCodeUseCase'

const winThorSectionRepository = new WinThorSectionRepository()
const winThorCategoryRepository = new WinThorCategoryRepository()
const winThorSubcategoryRepository = new WinThorSubcategoryRepository()

const findSubcategoryByCodeUseCase = new FindSubcategoryByCodeUseCase(
  winThorSectionRepository,
  winThorCategoryRepository,
  winThorSubcategoryRepository
)

const findSubcategoryByCodeController = new FindSubcategoryByCodeController(
  findSubcategoryByCodeUseCase
)

export { findSubcategoryByCodeUseCase, findSubcategoryByCodeController }
