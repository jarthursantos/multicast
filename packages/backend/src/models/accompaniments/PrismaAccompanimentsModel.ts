import { PrismaClient } from '@prisma/client'
import createHttpError from 'http-errors'
import { omit } from 'lodash'

import { CriticalLevel } from '~/domain/CriticalLevel'
import { createAccompaniment, IAccompaniment } from '~/domain/IAccompaniment'
import { IPurchaseOrder } from '~/domain/IPurchaseOrder'
import { IUser } from '~/domain/IUser'
import { IAccompanimentDelayProvider } from '~/providers/accompaniment-delay/IAccompanimentDelayProvider'

import { IAccompanimentScheduleModel } from '../accompaniment-schedule/IAccompanimentScheduleModel'
import { IAnnotationsModel } from '../annotations/IAnnotationsModel'
import { IInvoicesWithoutAccompanimentsModel } from '../invoices-without-accompaniments/IInvoicesWithoutAccompanimentsModel'
import { IPurchaseOrderModel } from '../purchase-orders/IPurchaseOrderModel'
import { IAccompanimentsModel, Data } from './IAccompanimentsModel'

export function createPrismaAccompanimentsModel(
  purchaseOrderModel: IPurchaseOrderModel,
  annotationsModel: IAnnotationsModel,
  invoicesWithoutAccompanimentsModel: IInvoicesWithoutAccompanimentsModel,
  accompanimentDelayProvider: IAccompanimentDelayProvider,
  accompanimentScheduleModel: IAccompanimentScheduleModel
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
            'schedule',
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
      const accompaniment = await prisma.accompaniments.findUnique({
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

      const { count, criticalLevel } = accompanimentDelayProvider.calculate({
        billingAt: accompaniment.billingAt || undefined,
        expectedBillingAt: accompaniment.expectedBillingAt || undefined,
        freeOnBoardAt: accompaniment.freeOnBoardAt || undefined,
        releasedAt: accompaniment.releasedAt || undefined,
        reviewedAt: accompaniment.reviewedAt || undefined,
        schedulingAt: accompaniment.schedulingAt || undefined,
        sendedAt: accompaniment.sendedAt || undefined,
        purchaseOrder,
        annotations
      })

      const schedule = await accompanimentScheduleModel.find({
        invoiceNumber: accompaniment.invoiceNumber,
        invoiceProvider: accompaniment.invoiceProvider,
        schedulingAt: accompaniment.schedulingAt
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
          schedule,
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

        const schedule = await accompanimentScheduleModel.find({
          invoiceNumber: accompaniment.invoiceNumber,
          invoiceProvider: accompaniment.invoiceProvider,
          schedulingAt: accompaniment.schedulingAt
        })

        const { count, criticalLevel } = accompanimentDelayProvider.calculate({
          billingAt: accompaniment.billingAt || undefined,
          expectedBillingAt: accompaniment.expectedBillingAt || undefined,
          freeOnBoardAt: accompaniment.freeOnBoardAt || undefined,
          releasedAt: accompaniment.releasedAt || undefined,
          reviewedAt: accompaniment.reviewedAt || undefined,
          schedulingAt: accompaniment.schedulingAt || undefined,
          sendedAt: accompaniment.sendedAt || undefined,
          purchaseOrder,
          annotations
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
              schedule,
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
            'schedule',
            'criticalLevel',
            'updatedAt',
            'createdAt'
          )
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

      const schedule = await accompanimentScheduleModel.find({
        invoiceNumber: accompaniment.invoiceNumber,
        invoiceProvider: accompaniment.invoiceProvider,
        schedulingAt: accompaniment.schedulingAt
      })

      const purchaseOrder = await purchaseOrderModel.findByNumber(
        updatedData.number
      )

      if (!purchaseOrder) {
        throw new createHttpError.NotFound('Pedido de compra não existe')
      }

      const { count, criticalLevel } = accompanimentDelayProvider.calculate({
        billingAt: updatedData.billingAt || undefined,
        expectedBillingAt: updatedData.expectedBillingAt || undefined,
        freeOnBoardAt: updatedData.freeOnBoardAt || undefined,
        releasedAt: updatedData.releasedAt || undefined,
        reviewedAt: updatedData.reviewedAt || undefined,
        schedulingAt: updatedData.schedulingAt || undefined,
        sendedAt: updatedData.sendedAt || undefined,
        purchaseOrder,
        annotations
      })

      return createAccompaniment(
        {
          billingAt: updatedData.billingAt || undefined,
          createdAt: updatedData.createdAt || undefined,
          expectedBillingAt: updatedData.expectedBillingAt || undefined,
          freeOnBoardAt: updatedData.freeOnBoardAt || undefined,
          invoiceNumber: updatedData.invoiceNumber || undefined,
          invoiceProvider: updatedData.invoiceProvider || undefined,
          releasedAt: updatedData.releasedAt || undefined,
          renewedAt: updatedData.renewedAt || undefined,
          reviewedAt: updatedData.reviewedAt || undefined,
          schedulingAt: updatedData.schedulingAt || undefined,
          sendedAt: updatedData.sendedAt || undefined,
          updatedAt: updatedData.updatedAt || undefined,
          purchaseOrder,
          delay: count,
          criticalLevel,
          annotations,
          schedule,
          transactionNumber: transactionNumber || undefined,
          isOutstanding: !!updatedData.renewedFrom
        },
        accompaniment.id
      )
    }
  }
}
