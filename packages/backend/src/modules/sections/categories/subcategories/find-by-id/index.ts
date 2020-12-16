import createHttpError from 'http-errors'

import { ICategoriesModel } from '~/models/categories/ICategoriesModel'
import { ISectionsModel } from '~/models/sections/ISectionsModel'
import { ISubcategoriesModel } from '~/models/subcategories/ISubcategoriesModel'

export function createFindSubcategoryByIdModule(
  sectionsModel: ISectionsModel,
  categoriesModel: ICategoriesModel,
  subcategoriesModel: ISubcategoriesModel
) {
  return {
    async execute(sectionId: number, categoryId: number, id: number) {
      const section = await sectionsModel.findById(sectionId)

      if (!section) {
        throw new createHttpError.NotFound('Seção não encontrada')
      }

      const category = await categoriesModel.findById(section, categoryId)

      if (!category) {
        throw new createHttpError.NotFound('Categoria não encontrada')
      }

      const subcategory = await subcategoriesModel.findById(
        section,
        category,
        id
      )

      return subcategory
    }
  }
}
