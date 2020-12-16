import createHttpError from 'http-errors'

import { IMoveInvoiceResult } from '~/domain/IMoveInvoiceResult'
import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'
import { moveInvoicesModule } from '~/modules/invoices'

export function createMoveScheduleInvoicesModule(
  schedulesModel: ISchedulesModel
) {
  return {
    async execute(
      scheduleId: string,
      invoiceId: string,
      destinationId: string
    ): Promise<IMoveInvoiceResult> {
      const schedule = await schedulesModel.findById(scheduleId)

      if (!schedule) {
        throw new createHttpError.NotFound('Agendamento de origem não existe')
      }

      if (schedule.receivedAt) {
        throw new createHttpError.BadRequest(
          'O agendamento de origem já foi recebido'
        )
      }

      const destinationSchedule = await schedulesModel.findById(destinationId)

      if (!destinationSchedule) {
        throw new createHttpError.NotFound('Agendamento de destino não existe')
      }

      if (destinationSchedule.receivedAt) {
        throw new createHttpError.BadRequest(
          'O agendamento de destino já foi recebido'
        )
      }

      if (schedule.id === destinationSchedule.id) {
        throw new createHttpError.BadRequest(
          'Não é possivel move a nota para o mesmo agendamento'
        )
      }

      const movedInvoice = await moveInvoicesModule.execute(
        invoiceId,
        destinationSchedule
      )

      if (!schedule.invoices) {
        schedule.invoices = []
      }

      schedule.invoices = schedule.invoices.filter(
        invoice => invoice.id !== movedInvoice.id
      )

      if (!destinationSchedule.invoices) {
        destinationSchedule.invoices = []
      }

      destinationSchedule.invoices.push(movedInvoice)

      return {
        originSchedule: schedule,
        destinationSchedule
      }
    }
  }
}
