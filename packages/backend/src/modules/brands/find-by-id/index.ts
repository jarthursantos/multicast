import createHttpError from 'http-errors'

import { IBrandsModel } from '~/models/brands/IBrandsModel'

export function createFindBrandByIdModule(brandsModel: IBrandsModel) {
  return {
    async execute(id: number) {
      const brand = await brandsModel.findById(id)

      if (!brand) {
        throw new createHttpError.NotFound('Marca não encontrada')
      }

      return brand
    }
  }
}
