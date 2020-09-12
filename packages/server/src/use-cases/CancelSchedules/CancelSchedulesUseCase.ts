import { IInvoicesRepository } from 'repositories/IInvoicesRepository'
import { IScheduleInvoicesRepository } from 'repositories/IScheduleInvoicesRepository'
import { ISchedulesRepository } from 'repositories/ISchedulesRepository'

import { CancelSchedulesRequestDTO } from './CancelSchedulesDTO'

export class CancelSchedulesUseCase {
  constructor(
    private schedulesRepository: ISchedulesRepository,
    private scheduleInvoicesRepository: IScheduleInvoicesRepository,
    private invoiceRepository: IInvoicesRepository
  ) {}

  async execute(id: string, data: CancelSchedulesRequestDTO) {
    const schedule = await this.schedulesRepository.findById(id)

    if (!schedule) {
      throw Error('Agendamento não existe')
    }

    if (schedule.receivedAt) {
      throw Error('Esse agendamento já foi recebido')
    }

    const { motive } = data

    const canceledSchedule = await this.schedulesRepository.cancel(id, motive)

    const invoices = await this.scheduleInvoicesRepository.findInvoicesOfSchedule(
      id
    )

    for (let i = 0; i < invoices.length; i++) {
      const invoice = invoices[i]

      await this.invoiceRepository.cancel(invoice.id)
    }

    return canceledSchedule
  }
}
