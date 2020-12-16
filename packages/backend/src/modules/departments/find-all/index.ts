import { IDepartmentsModel } from '~/models/departments/IDepartmentsModel'

export function createFindAllDepartmentsModule(
  departmentsModel: IDepartmentsModel
) {
  return {
    async execute() {
      const departments = await departmentsModel.findMany()

      return departments
    }
  }
}
