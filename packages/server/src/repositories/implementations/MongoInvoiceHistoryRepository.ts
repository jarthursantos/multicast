import { Invoice } from 'entities/Invoice'
import { InvoiceHistory } from 'entities/InvoiceHistory'
import { User } from 'entities/User'
import { IUsersRepository } from 'repositories/IUserRepository'
import { InvoiceHistorySchema } from 'schemas/InvoiceHistorySchema'
import { extractDifferences, hasDifferences } from 'utils/extract-diff'

import { IInvoiceHistoryRepository } from '../IInvoiceHistoryRepository'

export class MongoInvoiceHistoryRepository
  implements IInvoiceHistoryRepository {
  constructor(private userRepository: IUsersRepository) {}

  async findHistory(Invoice: Invoice): Promise<InvoiceHistory[]> {
    const histories = await InvoiceHistorySchema.find({
      changedUser: Invoice.id
    })
      .select(['-_id', '-__v', '-changedUser'])
      .sort({ createdAt: 'asc' })

    const result: InvoiceHistory[] = []

    for (let index = 0; index < histories.length; index++) {
      const history = histories[index]

      const user = await this.userRepository.findById(history.user)

      delete user.password

      result.push({ ...history.toJSON(), user })
    }

    return result
  }

  async logStore(changedBy: User, storedInvoice: Invoice): Promise<void> {
    this.logUpdate(
      changedBy,
      {
        id: undefined,
        origin: undefined,
        providerCode: undefined,
        number: undefined,
        value: undefined,
        emittedAt: null,
        key: '',
        weight: undefined,
        volume: undefined,
        cteNumber: undefined,
        cteKey: '',
        dischargeValue: undefined,
        receiptValue: undefined,
        divergence: undefined,
        scheduleId: undefined,
        invoiceFileId: undefined,
        cteFileId: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        canceledAt: null,
        provider: undefined,
        invoiceFile: undefined,
        cteFile: undefined,
        situation: undefined
      },
      storedInvoice
    )
  }

  async logUpdate(
    changedBy: User,
    oldInvoice: Invoice,
    newInvoice: Invoice
  ): Promise<void> {
    const changes = extractDifferences(newInvoice, oldInvoice, ['updatedAt'])

    if (hasDifferences(changes)) {
      await InvoiceHistorySchema.create({
        user: changedBy.id,
        changedInvoice: newInvoice.id,
        changes
      })
    }
  }
}
