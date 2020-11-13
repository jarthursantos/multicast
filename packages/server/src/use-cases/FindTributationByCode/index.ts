import { WinThorTributationRepository } from 'repositories/implementations/WinThorTributationRepository'

import { FindTributationByCodeController } from './FindTributationByCodeController'
import { FindTributationByCodeUseCase } from './FindTributationByCodeUseCase'

const winThorTributationRepository = new WinThorTributationRepository()

const findTributationByCodeUseCase = new FindTributationByCodeUseCase(
  winThorTributationRepository
)

const findTributationByCodeController = new FindTributationByCodeController(
  findTributationByCodeUseCase
)

export { findTributationByCodeController, findTributationByCodeUseCase }
