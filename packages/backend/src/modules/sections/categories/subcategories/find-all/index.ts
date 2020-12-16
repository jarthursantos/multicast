import createHttpError from 'http-errors'

import { ICategoriesModel } from '~/models/categories/ICategoriesModel'
import { ISectionsModel } from '~/models/sections/ISectionsModel'
import { ISubcategoriesModel } from '~/models/subcategories/ISubcategoriesModel'

export function createFindAllSubcategoriesModule(
  sectionsModel: ISectionsModel,
  categoriesModel: ICategoriesModel,
  subcategoriesModel: ISubcategoriesModel
) {
  return {
    async execute(sectionId: number, categoryId: number) {
      const section = await sectionsModel.findById(sectionId)

      if (!section) {
        throw new createHttpError.NotFound('Seção não encontrada')
      }

      const category = await categoriesModel.findById(section, categoryId)

      if (!category) {
        throw new createHttpError.NotFound('Categoria não encontrada')
      }

      const subcategories = await subcategoriesModel.findMany(section, category)

      return subcategories
    }
  }
}
