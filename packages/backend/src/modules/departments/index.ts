import { createWinThorDepartmentsModel } from '~/models/departments/WinThorDepartmentsModel'

import { createFindAllDepartmentsModule } from './find-all'
import { createFindDepartmentByIdModule } from './find-by-id'

const departmentsModel = createWinThorDepartmentsModel()

const findAllDepartmentsModule = createFindAllDepartmentsModule(
  departmentsModel
)

const findDepartmentByIdModule = createFindDepartmentByIdModule(
  departmentsModel
)

export { findDepartmentByIdModule, findAllDepartmentsModule }
