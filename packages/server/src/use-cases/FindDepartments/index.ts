import { WinThorDepartmentRepository } from 'repositories/implementations/WinThorDepartmentRepository'

import { FindDepartmentsController } from './FindDepartmentsController'
import { FindDepartmentsUseCase } from './FindDepartmentsUseCase'

const winThorDepartmentRepository = new WinThorDepartmentRepository()

const findDepartmentsUseCase = new FindDepartmentsUseCase(
  winThorDepartmentRepository
)

const findDepartmentsController = new FindDepartmentsController(
  findDepartmentsUseCase
)

export { findDepartmentsController, findDepartmentsUseCase }
