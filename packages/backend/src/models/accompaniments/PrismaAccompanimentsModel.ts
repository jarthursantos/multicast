import { PrismaClient } from '@prisma/client'
import createHttpError from 'http-errors'
import { omit } from 'lodash'

import { CriticalLevel } from '~/domain/CriticalLevel'
import { createAccompaniment, IAccompaniment } from '~/domain/IAccompaniment'
import { IPurchaseOrder } from '~/domain/IPurchaseOrder'
import { IUser } from '~/domain/IUser'
import { IAccompanimentDelayProvider } from '~/providers/accompaniment-delay/IAccompanimentDelayProvider'

import { IAnnotationsModel } from '../annotations/IAnnotationsModel'
import { IInvoicesWithoutAccompanimentsModel } from '../invoices-without-accompaniments/IInvoicesWithoutAccompanimentsModel'
import { IInvoicesModel } from '../invoices/IInvoicesModel'
import { IPurchaseOrderModel } from '../purchase-orders/IPurchaseOrderModel'
import { IAccompanimentsModel, Data } from './IAccompanimentsModel'

export function createPrismaAccompanimentsModel(
  purchaseOrderModel: IPurchaseOrderModel,
  annotationsModel: IAnnotationsModel,
  invoicesModel: IInvoicesModel,
  invoicesWithoutAccompanimentsModel: IInvoicesWithoutAccompanimentsModel,
  accompanimentDelayProvider: IAccompanimentDelayProvider
): IAccompanimentsModel {
  const prisma = new PrismaClient()

  return {
    async cancel(
      accompaniment: IAccompaniment,
      data: Data,
      user: IUser
    ): Promise<void> {
      const { motive } = data

      await prisma.cancelations.create({
        data: {
          motive,
          accompaniment: { connect: { id: accompaniment.id } },
          user: { connect: { id: user.id } }
        }
      })
    },

    async save(accompaniment: IAccompaniment): Promise<void> {
      await prisma.accompaniments.create({
        data: {
          ...omit(
            accompaniment,
            'invoiceId',
            'invoice',
            'purchaseOrder',
            'annotations',
            'transactionNumber',
            'number',
            'value',
            'emittedAt',
            'isOutstanding',
            'delay',
            'criticalLevel'
          ),
          number: accompaniment.purchaseOrder.number
        }
      })
    },

    async registerPurchaseOrders(purchases: IPurchaseOrder[]): Promise<void> {
      for (let i = 0; i < purchases.length; i++) {
        const purchaseOrder = purchases[i]

        const accompaniment = createAccompaniment({
          ...purchaseOrder,
          purchaseOrder,
          annotations: [],
          isOutstanding: false,
          criticalLevel: CriticalLevel.NORMAL,
          delay: 0
        })

        await this.save(accompaniment)
      }
    },

    async findById(id: string): Promise<IAccompaniment | undefined> {
      const accompaniment = await prisma.accompaniments.findOne({
        where: { id },
        include: { renewedFrom: true }
      })

      if (!accompaniment) {
        return undefined
      }

      const purchaseOrder = await purchaseOrderModel.findByNumber(
        accompaniment.number
      )

      if (!purchaseOrder) {
        throw new createHttpError.NotFound('Pedido de compra não existe')
      }

      const annotations = await annotationsModel.findFromAccompaniment(id)

      let transactionNumber: number | undefined

      const { invoiceNumber, invoiceProvider } = accompaniment

      if (invoiceNumber && invoiceProvider) {
        const transaction = await invoicesWithoutAccompanimentsModel.findByInvoice(
          invoiceNumber,
          invoiceProvider
        )

        if (transaction) {
          transactionNumber = transaction.transactionNumber
        }
      }

      const invoice = accompaniment.invoiceId
        ? await invoicesModel.findById(accompaniment.invoiceId)
        : undefined

      const { count, criticalLevel } = accompanimentDelayProvider.calculate({
        purchaseOrder,
        billingAt: accompaniment.billingAt || undefined,
        expectedBillingAt: accompaniment.expectedBillingAt || undefined,
        freeOnBoardAt: accompaniment.billingAt || undefined,
        releasedAt: accompaniment.billingAt || undefined,
        reviewedAt: accompaniment.billingAt || undefined,
        schedulingAt: accompaniment.billingAt || undefined,
        sendedAt: accompaniment.billingAt || undefined
      })

      return createAccompaniment(
        {
          billingAt: accompaniment.billingAt || undefined,
          expectedBillingAt: accompaniment.expectedBillingAt || undefined,
          freeOnBoardAt: accompaniment.freeOnBoardAt || undefined,
          releasedAt: accompaniment.releasedAt || undefined,
          reviewedAt: accompaniment.reviewedAt || undefined,
          schedulingAt: accompaniment.schedulingAt || undefined,
          sendedAt: accompaniment.sendedAt || undefined,
          invoiceNumber: accompaniment.invoiceNumber || undefined,
          renewedAt: accompaniment.renewedAt || undefined,
          createdAt: accompaniment.createdAt || undefined,
          updatedAt: accompaniment.updatedAt || undefined,
          invoiceProvider: accompaniment.invoiceProvider || undefined,
          purchaseOrder,
          delay: count,
          criticalLevel,
          annotations,
          invoice,
          transactionNumber,
          isOutstanding: !!accompaniment.renewedFrom
        },
        accompaniment.id
      )
    },

    async findMany(): Promise<IAccompaniment[]> {
      const result: IAccompaniment[] = []

      const accompaniments = await prisma.accompaniments.findMany({
        where: { cancelation: null },
        include: { renewedFrom: true },
        orderBy: { number: 'asc' }
      })

      for (let i = 0; i < accompaniments.length; i++) {
        const accompaniment = accompaniments[i]

        const purchaseOrder = await purchaseOrderModel.findByNumber(
          accompaniment.number
        )

        if (!purchaseOrder) {
          continue
        }

        const annotations = await annotationsModel.findFromAccompaniment(
          accompaniment.id
        )

        let transactionNumber: number | null = null

        const { invoiceNumber, invoiceProvider } = accompaniment

        if (invoiceNumber && invoiceProvider) {
          const transaction = await invoicesWithoutAccompanimentsModel.findByInvoice(
            invoiceNumber,
            invoiceProvider
          )

          if (transaction) {
            transactionNumber = transaction.transactionNumber
          }
        }

        const invoice = accompaniment.invoiceId
          ? await invoicesModel.findById(accompaniment.invoiceId)
          : undefined

        const { count, criticalLevel } = accompanimentDelayProvider.calculate({
          billingAt: accompaniment.billingAt || undefined,
          expectedBillingAt: accompaniment.expectedBillingAt || undefined,
          freeOnBoardAt: accompaniment.billingAt || undefined,
          releasedAt: accompaniment.billingAt || undefined,
          reviewedAt: accompaniment.billingAt || undefined,
          schedulingAt: accompaniment.billingAt || undefined,
          sendedAt: accompaniment.billingAt || undefined,
          purchaseOrder
        })

        result.push(
          createAccompaniment(
            {
              billingAt: accompaniment.billingAt || undefined,
              createdAt: accompaniment.createdAt || undefined,
              expectedBillingAt: accompaniment.expectedBillingAt || undefined,
              freeOnBoardAt: accompaniment.freeOnBoardAt || undefined,
              invoiceNumber: accompaniment.invoiceNumber || undefined,
              invoiceProvider: accompaniment.invoiceProvider || undefined,
              releasedAt: accompaniment.releasedAt || undefined,
              renewedAt: accompaniment.renewedAt || undefined,
              reviewedAt: accompaniment.reviewedAt || undefined,
              schedulingAt: accompaniment.schedulingAt || undefined,
              sendedAt: accompaniment.sendedAt || undefined,
              updatedAt: accompaniment.updatedAt || undefined,
              delay: count,
              criticalLevel,
              purchaseOrder,
              annotations,
              invoice,
              transactionNumber: transactionNumber || undefined,
              isOutstanding: !!accompaniment.renewedFrom
            },
            accompaniment.id
          )
        )
      }

      return result
    },

    async update(accompaniment: IAccompaniment): Promise<IAccompaniment> {
      const updatedData = await prisma.accompaniments.update({
        where: { id: accompaniment.id },
        include: { renewedFrom: true },
        data: {
          ...omit(
            accompaniment,
            'invoiceId',
            'invoice',
            'purchaseOrder',
            'annotations',
            'transactionNumber',
            'number',
            'value',
            'emittedAt',
            'isOutstanding',
            'delay',
            'criticalLevel',
            'updatedAt',
            'createdAt'
          ),
          invoice: accompaniment.invoice
            ? { connect: { id: accompaniment.invoice.id } }
            : undefined
        }
      })

      const annotations = await annotationsModel.findFromAccompaniment(
        accompaniment.id
      )

      let transactionNumber: number | null = null

      const { invoiceNumber, invoiceProvider } = accompaniment

      if (invoiceNumber && invoiceProvider) {
        const transaction = await invoicesWithoutAccompanimentsModel.findByInvoice(
          invoiceNumber,
          invoiceProvider
        )

        if (transaction) {
          transactionNumber = transaction.transactionNumber
        }
      }

      const invoice = updatedData.invoiceId
        ? await invoicesModel.findById(updatedData.invoiceId)
        : undefined

      const { count, criticalLevel } = accompanimentDelayProvider.calculate({
        billingAt: accompaniment.billingAt || undefined,
        expectedBillingAt: accompaniment.expectedBillingAt || undefined,
        freeOnBoardAt: accompaniment.billingAt || undefined,
        releasedAt: accompaniment.billingAt || undefined,
        reviewedAt: accompaniment.billingAt || undefined,
        schedulingAt: accompaniment.billingAt || undefined,
        sendedAt: accompaniment.billingAt || undefined,
        purchaseOrder: accompaniment.purchaseOrder
      })

      return createAccompaniment(
        {
          billingAt: accompaniment.billingAt || undefined,
          createdAt: accompaniment.createdAt || undefined,
          expectedBillingAt: accompaniment.expectedBillingAt || undefined,
          freeOnBoardAt: accompaniment.freeOnBoardAt || undefined,
          invoiceNumber: accompaniment.invoiceNumber || undefined,
          invoiceProvider: accompaniment.invoiceProvider || undefined,
          releasedAt: accompaniment.releasedAt || undefined,
          renewedAt: accompaniment.renewedAt || undefined,
          reviewedAt: accompaniment.reviewedAt || undefined,
          schedulingAt: accompaniment.schedulingAt || undefined,
          sendedAt: accompaniment.sendedAt || undefined,
          updatedAt: accompaniment.updatedAt || undefined,
          purchaseOrder: accompaniment.purchaseOrder,
          delay: count || 0,
          criticalLevel,
          annotations,
          invoice,
          transactionNumber: transactionNumber || undefined,
          isOutstanding: !!updatedData.renewedFrom
        },
        accompaniment.id
      )
    }
  }
}
