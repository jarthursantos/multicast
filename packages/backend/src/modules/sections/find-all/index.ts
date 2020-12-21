import { ISectionsModel } from '~/models/sections/ISectionsModel'

export function createFindAllSectionsModule(sectionsModel: ISectionsModel) {
  return {
    async execute() {
      const sections = await sectionsModel.findMany()

      return sections
    }
  }
}
