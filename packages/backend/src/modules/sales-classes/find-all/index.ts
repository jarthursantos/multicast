import { ISalesClassModel } from '~/models/sales-classes/ISalesClassesModel'

export function createFindAllSalesClassesModule(
  salesClassesModel: ISalesClassModel
) {
  return {
    async execute() {
      const salesClasses = await salesClassesModel.findMany()

      return salesClasses
    }
  }
}
