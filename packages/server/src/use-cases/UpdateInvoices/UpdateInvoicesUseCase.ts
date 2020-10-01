import { Invoice } from 'entities/Invoice'
import { User } from 'entities/User'
import { assign } from 'lodash'
import { IInvoiceHistoryRepository } from 'repositories/IInvoiceHistoryRepository'
import { IInvoicesRepository } from 'repositories/IInvoicesRepository'
import { IProviderRepository } from 'repositories/IProviderRepository'

import { UpdateInvoicesRequestDTO } from './UpdateInvoicesDTO'

export class UpdateInvoicesUseCase {
  constructor(
    private invoicesRepository: IInvoicesRepository,
    private providerRepository: IProviderRepository,
    private invoiceHistoryRepository: IInvoiceHistoryRepository
  ) {}

  async execute(authUser: User, id: string, data: UpdateInvoicesRequestDTO) {
    const provider = await this.providerRepository.findById(data.providerCode)

    if (!provider) {
      throw new Error('Fornecedor não existe')
    }

    const invoicesWithSameData = await this.invoicesRepository.find(
      data.number,
      data.providerCode
    )

    invoicesWithSameData.forEach(invoiceWithSameData => {
      if (
        !invoiceWithSameData.canceledAt &&
        invoiceWithSameData.divergence !== 'RESCHEDULED' &&
        id !== invoiceWithSameData.id
      ) {
        throw Error('Nota Fiscal já existe')
      }
    })

    const invoice = await this.invoicesRepository.findById(id)

    if (!invoice) {
      throw new Error('Nota Fiscal não existe')
    }

    const updateData = assign(new Invoice(invoice, invoice.id), data)

    const updatedInvoice = await this.invoicesRepository.update(updateData)

    await this.invoiceHistoryRepository.logUpdate(
      authUser,
      invoice,
      updatedInvoice
    )

    return updatedInvoice
  }
}
