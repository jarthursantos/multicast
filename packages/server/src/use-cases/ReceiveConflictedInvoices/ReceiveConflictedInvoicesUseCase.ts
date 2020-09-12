import { IInvoicesRepository } from 'repositories/IInvoicesRepository'
import { ISchedulesRepository } from 'repositories/ISchedulesRepository'

export class ReceiveConflictedInvoicesUseCase {
  constructor(
    private schedulesRepository: ISchedulesRepository,
    private invoicesRepository: IInvoicesRepository
  ) {}

  async execute(scheduleId: string, invoiceId: string) {
    const schedule = await this.schedulesRepository.findById(scheduleId)

    if (!schedule) {
      throw Error('Agendamento não existe')
    }

    if (!schedule.closedAt) {
      throw new Error('Agendamento não foi fechado')
    }

    if (schedule.receivedAt) {
      throw new Error('Agendamento já teve os recibos confirmados')
    }

    const invoice = await this.invoicesRepository.findById(invoiceId)

    if (!invoice) {
      throw Error('Nota Fiscal não existe')
    }

    if (invoice.divergence === 'ADDED') {
      throw Error('Nota Fiscal já possui uma divergência')
    }

    if (schedule.canceledAt) {
      throw Error('Esse agendamento foi cancelado')
    }

    if (!schedule.closedAt) {
      throw Error('Esse agendamento ainda não foi fechado')
    }

    invoice.divergence = 'RECEIVED'

    await this.invoicesRepository.update(invoice)

    return invoice
  }
}
