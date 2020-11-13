import { WinThorTributationRepository } from 'repositories/implementations/WinThorTributationRepository'

import { FindTributationsController } from './FindTributationsController'
import { FindTributationsUseCase } from './FindTributationsUseCase'

const winThorTributationRepository = new WinThorTributationRepository()

const findTributationsUseCase = new FindTributationsUseCase(
  winThorTributationRepository
)

const findTributationsController = new FindTributationsController(
  findTributationsUseCase
)

export { findTributationsController, findTributationsUseCase }
