import { User } from 'entities/User'
import { IInvoicesRepository } from 'repositories/IInvoicesRepository'
import { ISchedulesRepository } from 'repositories/ISchedulesRepository'
import { updateInvoicesUseCase } from 'use-cases/UpdateInvoices'
import { UpdateInvoicesRequestDTO } from 'use-cases/UpdateInvoices/UpdateInvoicesDTO'

export class UpdateScheduleInvoicesUseCase {
  constructor(
    private schedulesRepository: ISchedulesRepository,
    private invoicesRepository: IInvoicesRepository
  ) {}

  async execute(
    authUser: User,
    scheduleId: string,
    invoiceId: string,
    data: UpdateInvoicesRequestDTO
  ) {
    const schedule = await this.schedulesRepository.findById(scheduleId)

    if (!schedule) {
      throw Error('Agendamento não existe')
    }

    if (schedule.canceledAt) {
      throw Error('Esse agendamento foi cancelado')
    }

    if (schedule.closedAt) {
      throw Error('Esse agendamento foi fechado')
    }

    const invoice = this.invoicesRepository.findById(invoiceId)

    if (!invoice) {
      throw new Error('Nota Fiscal não existe')
    }

    const updatedInvoice = await updateInvoicesUseCase.execute(
      authUser,
      invoiceId,
      data
    )

    return updatedInvoice
  }
}
