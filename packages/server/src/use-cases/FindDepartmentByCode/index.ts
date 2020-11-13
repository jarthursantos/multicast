import { WinThorDepartmentRepository } from 'repositories/implementations/WinThorDepartmentRepository'

import { FindDepartmentByCodeController } from './FindDepartmentByCodeController'
import { FindDepartmentByCodeUseCase } from './FindDepartmentByCodeUseCase'

const winThorDepartmentRepository = new WinThorDepartmentRepository()

const findDepartmentByCodeUseCase = new FindDepartmentByCodeUseCase(
  winThorDepartmentRepository
)

const findDepartmentByCodeController = new FindDepartmentByCodeController(
  findDepartmentByCodeUseCase
)

export { findDepartmentByCodeController, findDepartmentByCodeUseCase }
