import createHttpError from 'http-errors'

import { IInvoicesModel } from '~/models/invoices/IInvoicesModel'
import { IScheduleInvoicesModel } from '~/models/schedule-invoices/IScheduleInvoicesModel'
import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'

import { ICancelSchedulesDTO } from './dto'

export function createCancelSchedulesModule(
  schedulesModel: ISchedulesModel,
  invoicesModel: IInvoicesModel,
  scheduleInvoicesModel: IScheduleInvoicesModel
) {
  return {
    async execute(id: string, data: ICancelSchedulesDTO) {
      const schedule = await schedulesModel.findById(id)

      if (!schedule) {
        throw new createHttpError.NotFound('Agendamento não existe')
      }

      if (schedule.receivedAt) {
        throw new createHttpError.BadRequest('Esse agendamento já foi recebido')
      }

      const { motive } = data

      await schedulesModel.cancel(id, motive)

      const invoices = await scheduleInvoicesModel.findInvoicesOfSchedule(id)

      for (let i = 0; i < invoices.length; i++) {
        const invoice = invoices[i]

        await invoicesModel.cancel(invoice.id)
      }

      const canceledSchedule = await schedulesModel.findById(id)

      return canceledSchedule
    }
  }
}
