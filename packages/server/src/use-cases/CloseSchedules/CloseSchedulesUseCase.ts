import { ISchedulesRepository } from 'repositories/ISchedulesRepository'

export class CloseSchedulesUseCase {
  constructor(private schedulesRepository: ISchedulesRepository) {}

  async execute(scheduleId: string) {
    const schedule = await this.schedulesRepository.findById(scheduleId)

    if (!schedule) {
      throw new Error('Agendamento não existe')
    }

    if (schedule.closedAt) {
      throw new Error('Agendamento já fechado')
    }

    if (schedule.receivedAt) {
      throw Error('Esse agendamento já foi recebido')
    }

    if (!schedule.invoices || schedule.invoices.length === 0) {
      throw new Error('Esse agendamento não possui notas')
    }

    const invoicesWithPendingData = schedule.invoices.filter(invoice => {
      const { number, value, volume, weight, key, emittedAt } = invoice

      if (!number || !value || !volume || !weight || !key || !emittedAt) {
        return true
      }

      return false
    })

    if (invoicesWithPendingData.length !== 0) {
      throw new Error('Esse agendamento possui notas com informações pendentes')
    }

    const closedSchedule = await this.schedulesRepository.close(schedule)

    return closedSchedule
  }
}
