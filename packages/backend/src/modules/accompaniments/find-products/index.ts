import createHttpError from 'http-errors'

import { IAccompanimentProductsModel } from '~/models/accompaniment-products/IAccompanimentProductsModel'
import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'

import { IFindAccompanimentProductsOptions } from './parser'

export function createFindAccompanimentsProductsModule(
  accompanimentsModel: IAccompanimentsModel,
  accompanimentProductsModel: IAccompanimentProductsModel
) {
  return {
    async execute(id: string, options?: IFindAccompanimentProductsOptions) {
      const accompaniment = await accompanimentsModel.findById(id)

      if (!accompaniment) {
        throw new createHttpError.NotFound('Acompanhamento não encontrado')
      }

      if (options) {
        const { only } = options

        if (only === 'invoice') {
          return await accompanimentProductsModel.findFromInvoice(accompaniment)
        }

        return await accompanimentProductsModel.find(accompaniment, { only })
      }

      return await accompanimentProductsModel.find(accompaniment)
    }
  }
}
