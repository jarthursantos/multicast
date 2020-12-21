import createHttpError from 'http-errors'

import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'
import { IRenewAccompanimentModel } from '~/models/renew-accompaniments/IRenewAccompanimentModel'

export function createRenewAccompanimentsModule(
  accompanimentModel: IAccompanimentsModel,
  renewAccompanimentModel: IRenewAccompanimentModel
) {
  return {
    async execute(id: string) {
      const accompaniment = await accompanimentModel.findById(id)

      if (!accompaniment) {
        throw new createHttpError.NotFound('Acompanhamento não encontrado')
      }

      if (accompaniment.renewedAt) {
        throw new createHttpError.BadRequest('Acompanhamento já renovado')
      }

      if (!accompaniment.transactionNumber) {
        throw new createHttpError.BadRequest(
          'Acompanhamento não possuí nota fiscal'
        )
      }

      const renewed = await renewAccompanimentModel.renew(accompaniment)

      return renewed
    }
  }
}
