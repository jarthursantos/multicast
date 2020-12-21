import { InvoiceOrigin } from '@prisma/client'
import createHttpError from 'http-errors'

import { IUser } from '~/domain/IUser'
import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'
import { createInvoicesModule } from '~/modules/invoices'
import { ICreateInvoicesDTO } from '~/modules/invoices/create/dto'

export function createCreateScheduleInvoicesModule(
  schedulesModel: ISchedulesModel
) {
  return {
    async execute(authUser: IUser, id: string, data: ICreateInvoicesDTO) {
      const schedule = await schedulesModel.findById(id)

      if (!schedule) {
        throw new createHttpError.NotFound('Agendamento não existe')
      }

      if (schedule.canceledAt) {
        throw new createHttpError.BadRequest(
          'Esse agendamento já foi cancelado'
        )
      }

      if (schedule.closedAt) {
        data.divergence = 'ADDED'
      }

      if (schedule.receivedAt) {
        throw new createHttpError.BadRequest('Esse agendamento já foi recebido')
      }

      const invoice = await createInvoicesModule.execute(authUser, {
        ...data,
        origin: InvoiceOrigin.SCHEDULE
      })

      await schedulesModel.addInvoice(id, invoice.id)

      return invoice
    }
  }
}
