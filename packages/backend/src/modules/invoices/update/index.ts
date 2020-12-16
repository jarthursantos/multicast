import createHttpError from 'http-errors'
import { assign } from 'lodash'

import { createInvoice } from '~/domain/IInvoice'
import { InvoiceSituations } from '~/domain/InvoiceSituations'
import { IUser } from '~/domain/IUser'
import { IInvoicesModel } from '~/models/invoices/IInvoicesModel'
import { IProvidersModel } from '~/models/providers/IProvidersModel'

import { IUpdateInvoicesDTO } from './dto'

export function createUpdateInvoicesModule(
  invoicesModel: IInvoicesModel,
  providersModel: IProvidersModel
) {
  return {
    async execute(authUser: IUser, id: string, data: IUpdateInvoicesDTO) {
      const provider = await providersModel.findById(data.providerCode)

      if (!provider) {
        throw new createHttpError.NotFound('Fornecedor não existe')
      }

      const invoicesWithSameData = await invoicesModel.find(
        data.number,
        data.providerCode
      )

      invoicesWithSameData.forEach(invoiceWithSameData => {
        if (invoiceWithSameData.divergence === 'RESCHEDULED') {
          return
        }

        if (invoiceWithSameData.situation === InvoiceSituations.CANCELED) {
          return
        }

        if (id === invoiceWithSameData.id) {
          return
        }

        throw new createHttpError.BadRequest('Nota Fiscal já existe')
      })

      const invoice = await invoicesModel.findById(id)

      if (!invoice) {
        throw new createHttpError.NotFound('Nota Fiscal não existe')
      }

      const updateData = assign(createInvoice(invoice, invoice.id), data)

      const updatedInvoice = await invoicesModel.update(updateData)

      // await invoiceHistoryRepository.logUpdate(
      //   authUser,
      //   invoice,
      //   updatedInvoice
      // )

      return updatedInvoice
    }
  }
}
