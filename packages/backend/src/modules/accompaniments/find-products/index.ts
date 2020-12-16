import createHttpError from 'http-errors'

import { IAccompanimentProductsModel } from '~/models/accompaniment-products/IAccompanimentProductsModel'
import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'

export function createFindAccompanimentsProductsModule(
  accompanimentsModel: IAccompanimentsModel,
  accompanimentProductsModel: IAccompanimentProductsModel
) {
  return {
    async execute(id: string, filter?: 'invoice' | 'pending' | 'delivered') {
      const accompaniment = await accompanimentsModel.findById(id)

      if (!accompaniment) {
        throw new createHttpError.NotFound('Acompanhamento não encontrado')
      }

      if (filter === 'invoice') {
        return await accompanimentProductsModel.findFromInvoice(accompaniment)
      } else {
        return await accompanimentProductsModel.find(
          accompaniment,
          filter ? { only: filter } : undefined
        )
      }
    }
  }
}
