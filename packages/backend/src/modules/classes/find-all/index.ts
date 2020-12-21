import { IClassesModel } from '~/models/classes/IClassesModel'

export function createFindAllClassesModule(classesModel: IClassesModel) {
  return {
    async execute() {
      const classes = await classesModel.findMany()

      return classes
    }
  }
}
