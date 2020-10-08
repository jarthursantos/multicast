import { Invoice } from 'entities/Invoice'
import { InvoiceSituations } from 'entities/InvoiceSituations'
import { assign, omit } from 'lodash'
import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'
import { IInvoicesRepository } from 'repositories/IInvoicesRepository'

import { UpdateAccompanimentsRequestDTO } from './UpdateAccompanimentsDTO'

export class UpdateAccompanimentsUseCase {
  constructor(
    private accompanimentsRepository: IAccompanimentsRepository,
    private invoicesRepository: IInvoicesRepository
  ) {}

  async execute(id: string, data: UpdateAccompanimentsRequestDTO) {
    const accompaniment = await this.accompanimentsRepository.findById(id)

    if (!accompaniment) {
      throw new Error('Acompanhamento não existe')
    }

    const updateData = assign(
      accompaniment,
      omit(data, 'emittedAt', 'number', 'value')
    )

    const { number, value, emittedAt } = data

    const invoiceData = [number, value, emittedAt]
    const informedFieldsCount = invoiceData.filter(Boolean).length

    if (informedFieldsCount !== 0) {
      if (informedFieldsCount !== 3) {
        throw new Error('Falta informações da nota fiscal')
      }

      if (accompaniment.invoice) {
        const updatedInvoice = assign(accompaniment.invoice, {
          number,
          value,
          emittedAt
        })

        await this.invoicesRepository.update(updatedInvoice)
      } else {
        const provider = accompaniment.purchaseOrder.provider

        const invoice = new Invoice({
          providerCode: provider.code,
          provider,
          number,
          value,
          emittedAt,
          origin: 'FOLLOWUP',
          situation: InvoiceSituations.INVOICE_NON_LAUNCHED
        })

        await this.invoicesRepository.save(invoice)

        updateData.invoice = invoice
      }
    }

    const updatedAccompaniment = await this.accompanimentsRepository.update(
      updateData
    )

    return updatedAccompaniment
  }
}
