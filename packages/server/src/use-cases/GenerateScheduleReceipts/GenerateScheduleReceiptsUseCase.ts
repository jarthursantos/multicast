import { IReceiptScheduleProvider } from 'providers/IReceiptScheduleProvider'
import { ISchedulesRepository } from 'repositories/ISchedulesRepository'

export class GenerateScheduleReceiptsUseCase {
  constructor(
    private scheduleRepository: ISchedulesRepository,
    private receiptScheduleProvider: IReceiptScheduleProvider
  ) {}

  async execute(scheduleId: string) {
    const schedule = await this.scheduleRepository.findById(scheduleId)

    if (!schedule) {
      throw new Error('Agendamento não existe')
    }

    if (!schedule.receivedAt) {
      throw new Error('Agendamento não foi recebido')
    }

    const reportFile = await this.receiptScheduleProvider.generate({
      ...schedule,
      invoices: schedule.invoices.map(invoice => ({
        ...invoice,
        name: invoice.provider.name
      }))
    })

    return reportFile
  }
}
