import { WinThorBuyerRepository } from 'repositories/implementations/WinThorBuyerRepository'

import { FindBuyerByCodeController } from './FindBuyerByCodeController'
import { FindBuyerByCodeUseCase } from './FindBuyerByCodeUseCase'

const winThorBuyerRepository = new WinThorBuyerRepository()

const findBuyerByCodeUseCase = new FindBuyerByCodeUseCase(
  winThorBuyerRepository
)

const findBuyerByCodeController = new FindBuyerByCodeController(
  findBuyerByCodeUseCase
)

export { findBuyerByCodeUseCase, findBuyerByCodeController }
