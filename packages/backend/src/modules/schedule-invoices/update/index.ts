import createHttpError from 'http-errors'

import { IUser } from '~/domain/IUser'
import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'
import { updateInvoicesModule } from '~/modules/invoices'
import { IUpdateInvoicesDTO } from '~/modules/invoices/update/dto'

export function createUpdateScheduleInvoicesModule(
  schedulesModel: ISchedulesModel
) {
  return {
    async execute(
      authUser: IUser,
      scheduleId: string,
      invoiceId: string,
      data: IUpdateInvoicesDTO
    ) {
      const schedule = await schedulesModel.findById(scheduleId)

      if (!schedule) {
        throw new createHttpError.NotFound('Agendamento não existe')
      }

      if (schedule.canceledAt) {
        throw new createHttpError.BadRequest('Esse agendamento foi cancelado')
      }

      const updatedInvoice = await updateInvoicesModule.execute(
        authUser,
        invoiceId,
        data
      )

      return updatedInvoice
    }
  }
}
