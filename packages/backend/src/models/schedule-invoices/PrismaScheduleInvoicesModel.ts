import { PrismaClient } from '@prisma/client'
import createHttpError from 'http-errors'

import { createFile } from '~/domain/IFile'
import { createInvoice, IInvoice } from '~/domain/IInvoice'

import { IInvoiceSituationsModel } from '../invoice-situations/IInvoiceSituationsModel'
import { IProvidersModel } from '../providers/IProvidersModel'
import { IScheduleInvoicesModel } from './IScheduleInvoicesModel'

export function createPrismaScheduleInvoicesModel(
  providersModel: IProvidersModel,
  invoiceSituationsModel: IInvoiceSituationsModel
): IScheduleInvoicesModel {
  const prisma = new PrismaClient()

  return {
    async findInvoicesOfSchedule(id: string): Promise<IInvoice[]> {
      const invoices = await prisma.invoices.findMany({
        where: { scheduleId: id },
        include: { cteFile: true, invoiceFile: true },
        orderBy: { createdAt: 'desc' }
      })

      const result: IInvoice[] = []

      for (let i = 0; i < invoices.length; i++) {
        const invoice = invoices[i]

        const provider = await providersModel.findById(invoice.providerCode)

        if (!provider) {
          throw new createHttpError.NotFound('O fornecedor não foi encontrado')
        }

        const situation = await invoiceSituationsModel.find(
          invoice.providerCode,
          invoice.number,
          invoice.importation,
          invoice.canceledAt || undefined
        )

        result.push(
          createInvoice(
            {
              number: invoice.number,
              origin: invoice.origin,
              providerCode: invoice.providerCode,
              importation: invoice.importation,
              canceledAt: invoice.canceledAt || undefined,
              createdAt: invoice.createdAt,
              cteFile: invoice.cteFile
                ? createFile(invoice.cteFile)
                : undefined,
              cteFileId: invoice.cteFileId || undefined,
              cteKey: invoice.cteKey || undefined,
              cteNumber: invoice.cteNumber || undefined,
              dischargeValue: invoice.dischargeValue || undefined,
              divergence: invoice.divergence || undefined,
              emittedAt: invoice.emittedAt || undefined,
              invoiceFile: invoice.invoiceFile
                ? createFile(invoice.invoiceFile)
                : undefined,
              invoiceFileId: invoice.invoiceFileId || undefined,
              key: invoice.key || undefined,
              receiptValue: invoice.receiptValue || undefined,
              scheduleId: invoice.scheduleId || undefined,
              updatedAt: invoice.updatedAt,
              value: invoice.value || undefined,
              volume: invoice.volume || undefined,
              weight: invoice.weight || undefined,
              provider,
              situation
            },
            invoice.id
          )
        )
      }

      return result
    }
  }
}
