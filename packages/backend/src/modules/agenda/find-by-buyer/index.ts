import createHttpError from 'http-errors'

import { IAgendaModel } from '~/models/agenda/IAgendaModel'
import { IBuyersModel } from '~/models/buyers/IBuyersModel'

export function createFindByBuyerAgendaModule(
  agendaModel: IAgendaModel,
  buyersModel: IBuyersModel
) {
  return {
    async execute(buyerCode: number) {
      const buyer = await buyersModel.findById(buyerCode)

      if (!buyer) {
        throw new createHttpError.NotFound('Comprador não encontrado')
      }

      const agenda = await agendaModel.findByBuyer(buyer)

      return agenda
    }
  }
}
