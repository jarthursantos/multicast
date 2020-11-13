import { WinThorClientsRepository } from 'repositories/implementations/WinThorClientsRepository'

import { FindClientsController } from './FindClientsController'
import { FindClientsUseCase } from './FindClientsUseCase'

const winThorClientsRepository = new WinThorClientsRepository()

const findClientsUseCase = new FindClientsUseCase(winThorClientsRepository)

const findClientsController = new FindClientsController(findClientsUseCase)

export { findClientsController, findClientsUseCase }
