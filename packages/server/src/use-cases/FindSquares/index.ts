import { WinThorSquareRepository } from 'repositories/implementations/WinThorSquareRepository'

import { FindSquaresController } from './FindSquaresController'
import { FindSquaresUseCase } from './FindSquaresUseCase'

const winThorSquareRepository = new WinThorSquareRepository()

const findSquaresUseCase = new FindSquaresUseCase(winThorSquareRepository)

const findSquaresController = new FindSquaresController(findSquaresUseCase)

export { findSquaresController, findSquaresUseCase }
