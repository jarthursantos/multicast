import { assign, omit } from 'lodash'
import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'
import { IInvoicesWithoutAccompanimentsRepository } from 'repositories/IInvoicesWithoutAccompanimentsRepository'

import { UpdateAccompanimentsRequestDTO } from './UpdateAccompanimentsDTO'

export class UpdateAccompanimentsUseCase {
  constructor(
    private accompanimentsRepository: IAccompanimentsRepository,
    private invoicesWithoutAccompanimentsRepository: IInvoicesWithoutAccompanimentsRepository
  ) {}

  async execute(id: string, data: UpdateAccompanimentsRequestDTO) {
    const accompaniment = await this.accompanimentsRepository.findById(id)

    if (!accompaniment) {
      throw new Error('Acompanhamento não existe')
    }

    const updateData = assign(accompaniment, omit(data, 'transactionNumber'))

    const { transactionNumber } = data

    if (transactionNumber) {
      const transaction = await this.invoicesWithoutAccompanimentsRepository.findByTransaction(
        transactionNumber
      )

      if (!transaction) {
        throw new Error('Transação não existe')
      }

      const { number, providerCode } = transaction

      updateData.invoiceNumber = number
      updateData.invoiceProvider = providerCode
    } else if (accompaniment.transactionNumber) {
      updateData.invoiceNumber = null
      updateData.invoiceProvider = null
    }

    const updatedAccompaniment = await this.accompanimentsRepository.update(
      updateData
    )

    return updatedAccompaniment
  }
}
