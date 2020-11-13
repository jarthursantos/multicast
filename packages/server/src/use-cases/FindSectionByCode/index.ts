import { WinThorSectionRepository } from 'repositories/implementations/WinThorSectionRepository'

import { FindSectionByCodeController } from './FindSectionByCodeController'
import { FindSectionByCodeUseCase } from './FindSectionByCodeUseCase'

const winThorSectionRepository = new WinThorSectionRepository()

const findSectionByCodeUseCase = new FindSectionByCodeUseCase(
  winThorSectionRepository
)

const findSectionByCodeController = new FindSectionByCodeController(
  findSectionByCodeUseCase
)

export { findSectionByCodeUseCase, findSectionByCodeController }
