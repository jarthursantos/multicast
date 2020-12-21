import createHttpError from 'http-errors'

import { createInvoice } from '~/domain/IInvoice'
import { InvoiceSituations } from '~/domain/InvoiceSituations'
import { IUser } from '~/domain/IUser'
import { IInvoiceSituationsModel } from '~/models/invoice-situations/IInvoiceSituationsModel'
import { IInvoicesModel } from '~/models/invoices/IInvoicesModel'
import { IProvidersModel } from '~/models/providers/IProvidersModel'

import { ICreateInvoicesDTO } from './dto'

export function createCreateInvoicesModule(
  invoicesModel: IInvoicesModel,
  providersModel: IProvidersModel,
  invoiceSituationsModel: IInvoiceSituationsModel
) {
  return {
    async execute(authUser: IUser, data: ICreateInvoicesDTO) {
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

        throw new createHttpError.BadRequest('Nota Fiscal já existe')
      })

      const situation = await invoiceSituationsModel.find(
        data.providerCode,
        data.number,
        data.importation
      )

      const invoice = createInvoice({ ...data, provider, situation })

      await invoicesModel.save(invoice)
      // await invoiceHistoryModel.logStore(authUser, invoice)

      return invoice
    }
  }
}
