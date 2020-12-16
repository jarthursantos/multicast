import createHttpError from 'http-errors'
import { assign, omit } from 'lodash'

import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'
import { IInvoicesWithoutAccompanimentsModel } from '~/models/invoices-without-accompaniments/IInvoicesWithoutAccompanimentsModel'

import { IUpdateAccompanimentsDTO } from './dto'

export function createUpdateAccompanimentsModule(
  accompanimentsModel: IAccompanimentsModel,
  invoicesWithoutAccompanimentsModel: IInvoicesWithoutAccompanimentsModel
) {
  return {
    async execute(id: string, data: IUpdateAccompanimentsDTO) {
      const accompaniment = await accompanimentsModel.findById(id)

      if (!accompaniment) {
        throw new createHttpError.NotFound('Acompanhamento não encontrado')
      }

      const updateData = assign(accompaniment, omit(data, 'transactionNumber'))

      const { transactionNumber } = data

      if (transactionNumber) {
        const transaction = await invoicesWithoutAccompanimentsModel.findByTransaction(
          transactionNumber
        )

        if (!transaction) {
          throw new createHttpError.NotFound('Transação não encontrada')
        }

        const { number, providerCode } = transaction

        updateData.invoiceNumber = number
        updateData.invoiceProvider = providerCode
      } else if (accompaniment.transactionNumber) {
        updateData.invoiceNumber = undefined
        updateData.invoiceProvider = undefined
      }

      const updatedAccompaniment = await accompanimentsModel.update(updateData)

      return updatedAccompaniment
    }
  }
}
