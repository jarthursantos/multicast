import { IReceiptPerInvoiceProvider } from 'providers/IReceiptPerInvoiceProvider'
import { IInvoicesRepository } from 'repositories/IInvoicesRepository'
import { ISchedulesRepository } from 'repositories/ISchedulesRepository'

export class GenerateInvoiceReceiptsUseCase {
  constructor(
    private scheduleRepository: ISchedulesRepository,
    private invoiceRepository: IInvoicesRepository,
    private receiptPerInvoiceProvider: IReceiptPerInvoiceProvider
  ) {}

  async execute(scheduleId: string, invoiceId: string) {
    const schedule = await this.scheduleRepository.findById(scheduleId)

    if (!schedule) {
      throw new Error('Agendamento não existe')
    }

    if (!schedule.receivedAt) {
      throw new Error('Agendamento não foi recebido')
    }

    const invoice = await this.invoiceRepository.findById(invoiceId)

    if (!invoice) {
      throw new Error('Nota Fiscal não existe')
    }

    const reportFile = await this.receiptPerInvoiceProvider.generate({
      ...schedule,
      ...invoice,
      name: invoice.provider.name
    })

    return reportFile
  }
}
