import { createInvoice, IInvoice } from '~/domain/IInvoice'

import { IInvoicesModel } from '../invoices/IInvoicesModel'
import { ISchedulesModel } from '../schedules/ISchedulesModel'
import { IRescheduleInvoicesModel } from './IRescheduleInvoicesModel'

export function createPrismaRescheduleInvocesModel(
  invoicesModel: IInvoicesModel,
  schedulesModel: ISchedulesModel
): IRescheduleInvoicesModel {
  return {
    async reschedule(
      invoices: IInvoice[],
      scheduleId: string
    ): Promise<IInvoice[]> {
      const rescheduledInvoices: IInvoice[] = []

      for (let i = 0; i < invoices.length; i++) {
        const invoice = invoices[i]

        const rescheduledInvoice = createInvoice({ ...invoice })

        await invoicesModel.save(rescheduledInvoice)

        rescheduledInvoices.push(rescheduledInvoice)

        await schedulesModel.addInvoice(scheduleId, rescheduledInvoice.id)

        await invoicesModel.update({
          ...invoice,
          divergence: 'RESCHEDULED'
        })
      }

      return rescheduledInvoices
    }
  }
}
