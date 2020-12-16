import createHttpError from 'http-errors'

import { IBuyersModel } from '~/models/buyers/IBuyersModel'

export function createFindBuyerByIdModule(buyersModel: IBuyersModel) {
  return {
    async execute(id: number) {
      const buyer = await buyersModel.findById(id)

      if (!buyer) {
        throw new createHttpError.NotFound('Comprador não encontrado')
      }

      return buyer
    }
  }
}
