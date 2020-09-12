import { PrismaClient } from '@prisma/client'
import { Invoice } from 'entities/Invoice'
import { omit } from 'lodash'
import { IInvoiceSituationsRepository } from 'repositories/IInvoiceSituationsRepository'
import { IInvoicesRepository } from 'repositories/IInvoicesRepository'
import { IProviderRepository } from 'repositories/IProviderRepository'

export class PrismaInvoicesRepository implements IInvoicesRepository {
  private prisma = new PrismaClient()

  constructor(
    private providerRepository: IProviderRepository,
    private invoiceSituationsRepository: IInvoiceSituationsRepository
  ) {}

  async save(invoice: Invoice): Promise<void> {
    await this.prisma.invoices.create({
      data: {
        ...omit(
          invoice,
          'provider',
          'scheduleId',
          'situation',
          'invoiceFileId',
          'cteFileId',
          'invoiceFile',
          'cteFile'
        ),
        cteFile: invoice.cteFileId
          ? { connect: { id: invoice.cteFileId } }
          : undefined,
        invoiceFile: invoice.invoiceFileId
          ? { connect: { id: invoice.invoiceFileId } }
          : undefined
      }
    })
  }

  async find(number: number, providerCode: number): Promise<Invoice[]> {
    const invoices = await this.prisma.invoices.findMany({
      where: { number, providerCode },
      include: { cteFile: true, invoiceFile: true }
    })

    const result: Invoice[] = []

    for (let i = 0; i < invoices.length; i++) {
      const invoice = invoices[i]

      const provider = await this.providerRepository.findById(
        invoice.providerCode
      )

      const situation = await this.invoiceSituationsRepository.find(
        providerCode,
        number,
        invoice.canceledAt
      )

      result.push(new Invoice({ ...invoice, provider, situation }, invoice.id))
    }

    return result
  }

  async cancel(id: string): Promise<void> {
    await this.prisma.invoices.update({
      where: { id },
      data: { canceledAt: new Date() }
    })
  }

  async findById(id: string): Promise<Invoice> {
    const invoice = await this.prisma.invoices.findOne({
      where: { id },
      include: { cteFile: true, invoiceFile: true }
    })

    const provider = await this.providerRepository.findById(
      invoice.providerCode
    )

    const situation = await this.invoiceSituationsRepository.find(
      invoice.providerCode,
      invoice.number,
      invoice.canceledAt
    )

    return new Invoice({ ...invoice, provider, situation }, invoice.id)
  }

  async update(invoice: Invoice): Promise<Invoice> {
    const updatedInvoice = await this.prisma.invoices.update({
      where: { id: invoice.id },
      include: { cteFile: true, invoiceFile: true },
      data: {
        ...omit(
          invoice,
          'provider',
          'scheduleId',
          'situation',
          'invoiceFileId',
          'cteFileId',
          'invoiceFile',
          'cteFile'
        ),
        cteFile: invoice.cteFileId
          ? { connect: { id: invoice.cteFileId } }
          : undefined,
        invoiceFile: invoice.invoiceFileId
          ? { connect: { id: invoice.invoiceFileId } }
          : undefined
      }
    })

    const provider = await this.providerRepository.findById(
      invoice.providerCode
    )

    const situation = await this.invoiceSituationsRepository.find(
      invoice.providerCode,
      invoice.number,
      invoice.canceledAt
    )

    return new Invoice({ ...updatedInvoice, provider, situation }, invoice.id)
  }
}
