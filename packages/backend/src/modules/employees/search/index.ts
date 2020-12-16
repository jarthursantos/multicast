import { IEmployeesModel } from '~/models/employees/IEmployeesModel'

import { ISearchEmployeesOptions } from './parser'

export function createSearchEmployeesModel(employeesModel: IEmployeesModel) {
  return {
    async execute({ name = '' }: ISearchEmployeesOptions) {
      const employees = await employeesModel.search(name.trim().toUpperCase())

      return employees
    }
  }
}
