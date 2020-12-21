import createHttpError from 'http-errors'

import { ICategoriesModel } from '~/models/categories/ICategoriesModel'
import { ISectionsModel } from '~/models/sections/ISectionsModel'

export function createFindAllCategoriesModule(
  sectionsModel: ISectionsModel,
  categoriesModel: ICategoriesModel
) {
  return {
    async execute(sectionId: number) {
      const section = await sectionsModel.findById(sectionId)

      if (!section) {
        throw new createHttpError.NotFound('Seção não encontrada')
      }

      const categories = await categoriesModel.findMany(section)

      return categories
    }
  }
}
