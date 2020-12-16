import { IDepartmentsModel } from '~/models/departments/IDepartmentsModel'

export function createFindDepartmentByIdModule(
  departmentsModel: IDepartmentsModel
) {
  return {
    async execute(code: number) {
      const department = await departmentsModel.findById(code)

      return department
    }
  }
}
