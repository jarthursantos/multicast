import { PrismaClient } from '@prisma/client'
import { Invoice } from 'entities/Invoice'
import { IInvoiceSituationsRepository } from 'repositories/IInvoiceSituationsRepository'
import { IProviderRepository } from 'repositories/IProviderRepository'
import { IScheduleInvoicesRepository } from 'repositories/IScheduleInvoicesRepository'

export class PrismaScheduleInvoicesRepository
  implements IScheduleInvoicesRepository {
  private prisma = new PrismaClient()

  constructor(
    private providerRepository: IProviderRepository,
    private invoiceSituationsRepository: IInvoiceSituationsRepository
  ) {}

  async findInvoicesOfSchedule(id: string): Promise<Invoice[]> {
    const invoices = await this.prisma.invoices.findMany({
      where: { scheduleId: id },
      include: { cteFile: true, invoiceFile: true },
      orderBy: { createdAt: 'desc' }
    })

    const result: Invoice[] = []

    for (let i = 0; i < invoices.length; i++) {
      const invoice = invoices[i]

      const provider = await this.providerRepository.findById(
        invoice.providerCode
      )

      const situation = await this.invoiceSituationsRepository.find(
        invoice.providerCode,
        invoice.number,
        invoice.canceledAt
      )

      result.push(new Invoice({ ...invoice, provider, situation }, invoice.id))
    }

    return result
  }
}
