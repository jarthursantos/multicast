import { PrismaClient } from '@prisma/client'
import createHttpError from 'http-errors'
import { omit } from 'lodash'

import { createFile } from '~/domain/IFile'
import { createInvoice, IInvoice } from '~/domain/IInvoice'
import { ISchedule } from '~/domain/ISchedule'

import { IInvoiceSituationsModel } from '../invoice-situations/IInvoiceSituationsModel'
import { IProvidersModel } from '../providers/IProvidersModel'
import { IInvoicesModel } from './IInvoicesModel'

export function createPrismaInvoicesModel(
  providersModel: IProvidersModel,
  invoiceSituationsModel: IInvoiceSituationsModel
): IInvoicesModel {
  const prisma = new PrismaClient()

  return {
    async save(invoice: IInvoice): Promise<void> {
      await prisma.invoices.create({
        data: {
          ...omit(
            invoice,
            'provider',
            'providers',
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
    },

    async find(number: number, providerCode: number): Promise<IInvoice[]> {
      const invoices = await prisma.invoices.findMany({
        where: { number, providerCode },
        include: { cteFile: true, invoiceFile: true }
      })

      const result: IInvoice[] = []

      for (let i = 0; i < invoices.length; i++) {
        const invoice = invoices[i]

        const provider = await providersModel.findById(invoice.providerCode)

        if (!provider) {
          throw new createHttpError.NotFound('O fornecedor não foi encontrado')
        }

        const situation = await invoiceSituationsModel.find(
          providerCode,
          number,
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
    },

    async cancel(id: string): Promise<void> {
      await prisma.invoices.update({
        where: { id },
        data: { canceledAt: new Date(), divergence: 'NOT_RECEIVED' }
      })
    },

    async findById(id: string): Promise<IInvoice | undefined> {
      const invoice = await prisma.invoices.findUnique({
        where: { id },
        include: { cteFile: true, invoiceFile: true }
      })

      if (!invoice) {
        return undefined
      }

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

      return createInvoice(
        {
          number: invoice.number,
          origin: invoice.origin,
          providerCode: invoice.providerCode,
          importation: invoice.importation,
          canceledAt: invoice.canceledAt || undefined,
          createdAt: invoice.createdAt,
          cteFile: invoice.cteFile ? createFile(invoice.cteFile) : undefined,
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
    },

    async update(invoice: IInvoice): Promise<IInvoice> {
      const updatedInvoice = await prisma.invoices.update({
        where: { id: invoice.id },
        include: { cteFile: true, invoiceFile: true },
        data: {
          ...omit(
            invoice,
            'provider',
            'providers',
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

      const provider = await providersModel.findById(invoice.providerCode)

      if (!provider) {
        throw new createHttpError.NotFound('O fornecedor não foi encontrado')
      }

      const situation = await invoiceSituationsModel.find(
        invoice.providerCode,
        invoice.number,
        invoice.importation,
        invoice.canceledAt
      )

      return createInvoice(
        {
          number: updatedInvoice.number,
          origin: updatedInvoice.origin,
          providerCode: updatedInvoice.providerCode,
          importation: updatedInvoice.importation,
          canceledAt: updatedInvoice.canceledAt || undefined,
          createdAt: updatedInvoice.createdAt,
          cteFile: updatedInvoice.cteFile
            ? createFile(updatedInvoice.cteFile)
            : undefined,
          cteFileId: updatedInvoice.cteFileId || undefined,
          cteKey: updatedInvoice.cteKey || undefined,
          cteNumber: updatedInvoice.cteNumber || undefined,
          dischargeValue: updatedInvoice.dischargeValue || undefined,
          divergence: updatedInvoice.divergence || undefined,
          emittedAt: updatedInvoice.emittedAt || undefined,
          invoiceFile: updatedInvoice.invoiceFile
            ? createFile(updatedInvoice.invoiceFile)
            : undefined,
          invoiceFileId: updatedInvoice.invoiceFileId || undefined,
          key: updatedInvoice.key || undefined,
          receiptValue: updatedInvoice.receiptValue || undefined,
          scheduleId: updatedInvoice.scheduleId || undefined,
          updatedAt: updatedInvoice.updatedAt,
          value: updatedInvoice.value || undefined,
          volume: updatedInvoice.volume || undefined,
          weight: updatedInvoice.weight || undefined,

          provider,
          situation
        },
        invoice.id
      )
    },

    async delete(id: string): Promise<void> {
      await prisma.invoices.delete({ where: { id } })
    },

    async move(id: string, schedule: ISchedule): Promise<void> {
      await prisma.invoices.update({
        where: { id },
        data: { schedule: { connect: { id: schedule.id } } }
      })
    }
  }
}
