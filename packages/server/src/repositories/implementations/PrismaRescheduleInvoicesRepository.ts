import { Invoice } from 'entities/Invoice'
import { IInvoicesRepository } from 'repositories/IInvoicesRepository'
import { IRescheduleInvoicesRepository } from 'repositories/IRescheduleInvoicesRepository'
import { ISchedulesRepository } from 'repositories/ISchedulesRepository'

export class PrismaRescheduleInvoicesRepository
  implements IRescheduleInvoicesRepository {
  constructor(
    private invoiceRepository: IInvoicesRepository,
    private schedulesRepository: ISchedulesRepository
  ) {}

  async reschedule(
    invoices: Invoice[],
    scheduleId: string
  ): Promise<Invoice[]> {
    const rescheduledInvoices: Invoice[] = []

    for (let i = 0; i < invoices.length; i++) {
      const invoice = invoices[i]

      const rescheduledInvoice = new Invoice({ ...invoice })

      await this.invoiceRepository.save(rescheduledInvoice)

      rescheduledInvoices.push(rescheduledInvoice)

      await this.schedulesRepository.addInvoice(
        scheduleId,
        rescheduledInvoice.id
      )

      await this.invoiceRepository.update({
        ...invoice,
        divergence: 'RESCHEDULED'
      })
    }

    return rescheduledInvoices
  }
}
