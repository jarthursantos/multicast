import { createWinThorEmployeesModel } from '~/models/employees/WinThorEmployeesModel'

import { createSearchEmployeesModel } from './search'

const employeesModel = createWinThorEmployeesModel()

const searchEmployeesModel = createSearchEmployeesModel(employeesModel)

export { searchEmployeesModel }
export * from './search/parser'
