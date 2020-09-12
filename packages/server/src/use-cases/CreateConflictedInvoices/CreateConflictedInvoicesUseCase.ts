import { User } from 'entities/User'
import { ISchedulesRepository } from 'repositories/ISchedulesRepository'
import { createInvoicesUseCase } from 'use-cases/CreateInvoices'
import { CreateInvoicesRequestDTO } from 'use-cases/CreateInvoices/CreateInvoicesDTO'

export class CreateConflictedInvoicesUseCase {
  constructor(private schedulesRepository: ISchedulesRepository) {}

  async execute(authUser: User, id: string, data: CreateInvoicesRequestDTO) {
    const schedule = await this.schedulesRepository.findById(id)

    if (!schedule) {
      throw Error('Agendamento não existe')
    }

    if (schedule.canceledAt) {
      throw Error('Esse agendamento foi cancelado')
    }

    if (!schedule.closedAt) {
      throw Error('Esse agendamento ainda não foi fechado')
    }

    if (schedule.receivedAt) {
      throw Error('Esse agendamento já foi recebido')
    }

    const invoice = await createInvoicesUseCase.execute(authUser, {
      ...data,
      origin: 'SCHEDULE',
      divergence: 'ADDED'
    })

    await this.schedulesRepository.addInvoice(id, invoice.id)

    return invoice
  }
}
