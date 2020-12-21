import createHttpError from 'http-errors'

import { ISectionsModel } from '~/models/sections/ISectionsModel'

export function createFindSectionByIdModule(sectionsModule: ISectionsModel) {
  return {
    async execute(id: number) {
      const section = await sectionsModule.findById(id)

      if (section) {
        throw new createHttpError.NotFound('Seção não encontrada')
      }

      return section
    }
  }
}
