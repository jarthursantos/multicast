import { WinThorEmployeeRepository } from 'repositories/implementations/WinThorEmployeeRepository'

import { FindEmployeesController } from './FindEmployeesController'
import { FindEmployeesUseCase } from './FindEmployeesUseCase'

const winthorEmployeesRepository = new WinThorEmployeeRepository()

const findEmployeesUseCase = new FindEmployeesUseCase(
  winthorEmployeesRepository
)

const findEmployeesController = new FindEmployeesController(
  findEmployeesUseCase
)

export { findEmployeesUseCase, findEmployeesController }
