import createHttpError from 'http-errors'

import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'
import { IInvoicesWithoutAccompanimentsModel } from '~/models/invoices-without-accompaniments/IInvoicesWithoutAccompanimentsModel'

export function createFindAccompanimentUntrackedInvoices(
  accompanimentsModel: IAccompanimentsModel,
  invoicesWithoutAccompanimentsModel: IInvoicesWithoutAccompanimentsModel
) {
  return {
    async execute(id: string) {
      const accompaniment = await accompanimentsModel.findById(id)

      if (!accompaniment) {
        throw new createHttpError.NotFound('Acompanhamento não encontrado')
      }

      const result = await invoicesWithoutAccompanimentsModel.findMany(
        accompaniment
      )

      return result
    }
  }
}
