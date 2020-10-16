import { Invoice } from 'entities/Invoice'
import { InvoiceSituations } from 'entities/InvoiceSituations'
import { User } from 'entities/User'
import { IInvoiceHistoryRepository } from 'repositories/IInvoiceHistoryRepository'
import { IInvoiceSituationsRepository } from 'repositories/IInvoiceSituationsRepository'
import { IInvoicesRepository } from 'repositories/IInvoicesRepository'
import { IProviderRepository } from 'repositories/IProviderRepository'

import { CreateInvoicesRequestDTO } from './CreateInvoicesDTO'

export class CreateInvoicesUseCase {
  constructor(
    private invoicesRepository: IInvoicesRepository,
    private providerRepository: IProviderRepository,
    private invoiceSituationRepository: IInvoiceSituationsRepository,
    private invoiceHistoryRepository: IInvoiceHistoryRepository
  ) {}

  async execute(authUser: User, data: CreateInvoicesRequestDTO) {
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
        invoiceWithSameData.divergence !== 'RESCHEDULED' ||
        invoiceWithSameData.situation !== InvoiceSituations.CANCELED
      ) {
        throw Error('Nota Fiscal já existe')
      }
    })

    const situation = await this.invoiceSituationRepository.find(
      data.providerCode,
      data.number
    )

    // TODO: check if files exists

    const invoice = new Invoice({ ...data, provider, situation })

    await this.invoicesRepository.save(invoice)
    await this.invoiceHistoryRepository.logStore(authUser, invoice)

    return invoice
  }
}
