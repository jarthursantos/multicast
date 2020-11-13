import { WinThorSquareRepository } from 'repositories/implementations/WinThorSquareRepository'

import { FindSquareByCodeController } from './FindSquareByCodeController'
import { FindSquareByCodeUseCase } from './FindSquareByCodeUseCase'

const winThorSquareRepository = new WinThorSquareRepository()

const findSquareByCodeUseCase = new FindSquareByCodeUseCase(
  winThorSquareRepository
)

const findSquareByCodeController = new FindSquareByCodeController(
  findSquareByCodeUseCase
)

export { findSquareByCodeController, findSquareByCodeUseCase }
