import { PrismaClient } from '@prisma/client'
import { Accompaniment } from 'entities/Accompaniment'
import { CriticalLevel } from 'entities/CriticalLevel'
import { PurchaseOrder } from 'entities/PurchaseOrder'
import { User } from 'entities/User'
import { omit } from 'lodash'
import { IAccompanimentDelayProvider } from 'providers/IAccompanimentDelayProvider'
import {
  IAccompanimentsRepository,
  Data
} from 'repositories/IAccompanimentsRepository'
import { IAnnotationsRepository } from 'repositories/IAnnotationsRepository'
import { IInvoicesRepository } from 'repositories/IInvoicesRepository'
import { IInvoicesWithoutAccompanimentsRepository } from 'repositories/IInvoicesWithoutAccompanimentsRepository'
import { IPurchaseOrderRepository } from 'repositories/IPurchaseOrderRepository'

export class PrismaAccompanimentsRepository
  implements IAccompanimentsRepository {
  private prisma = new PrismaClient()

  constructor(
    private purchaseOrderRepository: IPurchaseOrderRepository,
    private annotationsRepository: IAnnotationsRepository,
    private invoiceRepository: IInvoicesRepository,
    private invoicesWithoutAccompanimentsRepository: IInvoicesWithoutAccompanimentsRepository,
    private accompanimentDelayProvider: IAccompanimentDelayProvider
  ) {}

  async cancel(
    accompaniment: Accompaniment,
    data: Data,
    user: User
  ): Promise<void> {
    const { motive } = data

    await this.prisma.cancelations.create({
      data: {
        motive,
        accompaniment: { connect: { id: accompaniment.id } },
        user: { connect: { id: user.id } }
      }
    })
  }

  async save(accompaniment: Accompaniment): Promise<void> {
    await this.prisma.accompaniments.create({
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
  }

  async registerPurchaseOrders(purchases: PurchaseOrder[]): Promise<void> {
    for (let i = 0; i < purchases.length; i++) {
      const purchaseOrder = purchases[i]

      const accompaniment = new Accompaniment({
        ...purchaseOrder,
        purchaseOrder,
        annotations: [],
        isOutstanding: false,
        criticalLevel: CriticalLevel.NORMAL,
        delay: 0
      })

      await this.save(accompaniment)
    }
  }

  async findById(id: string): Promise<Accompaniment> {
    const accompaniment = await this.prisma.accompaniments.findOne({
      where: { id },
      include: { renewedFrom: true }
    })

    if (!accompaniment) {
      return undefined
    }

    const purchaseOrder = await this.purchaseOrderRepository.findByNumber(
      accompaniment.number
    )

    const annotations = await this.annotationsRepository.findFromAccompaniment(
      id
    )

    let transactionNumber: number

    const { invoiceNumber, invoiceProvider } = accompaniment

    if (invoiceNumber && invoiceProvider) {
      const transaction = await this.invoicesWithoutAccompanimentsRepository.findByInvoice(
        invoiceNumber,
        invoiceProvider
      )

      if (transaction) {
        transactionNumber = transaction.transactionNumber
      }
    }

    const invoice = accompaniment.invoiceId
      ? await this.invoiceRepository.findById(accompaniment.invoiceId)
      : undefined

    const { count, criticalLevel } = this.accompanimentDelayProvider.calculate({
      ...accompaniment,
      purchaseOrder
    })

    return new Accompaniment(
      {
        ...accompaniment,
        delay: count,
        criticalLevel,
        purchaseOrder,
        annotations,
        invoice,
        transactionNumber,
        isOutstanding: !!accompaniment.renewedFrom
      },
      accompaniment.id
    )
  }

  async findMany(): Promise<Accompaniment[]> {
    const result: Accompaniment[] = []

    const accompaniments = await this.prisma.accompaniments.findMany({
      where: { cancelation: null },
      include: { renewedFrom: true },
      orderBy: { number: 'asc' }
    })

    for (let i = 0; i < accompaniments.length; i++) {
      const accompaniment = accompaniments[i]

      const purchaseOrder = await this.purchaseOrderRepository.findByNumber(
        accompaniment.number
      )

      if (!purchaseOrder) {
        continue
      }

      const annotations = await this.annotationsRepository.findFromAccompaniment(
        accompaniment.id
      )

      let transactionNumber: number

      const { invoiceNumber, invoiceProvider } = accompaniment

      if (invoiceNumber && invoiceProvider) {
        const transaction = await this.invoicesWithoutAccompanimentsRepository.findByInvoice(
          invoiceNumber,
          invoiceProvider
        )

        if (transaction) {
          transactionNumber = transaction.transactionNumber
        }
      }

      const invoice = accompaniment.invoiceId
        ? await this.invoiceRepository.findById(accompaniment.invoiceId)
        : undefined

      const {
        count,
        criticalLevel
      } = this.accompanimentDelayProvider.calculate({
        ...accompaniment,
        purchaseOrder
      })

      result.push(
        new Accompaniment(
          {
            ...accompaniment,
            delay: count,
            criticalLevel,
            purchaseOrder,
            annotations,
            invoice,
            transactionNumber,
            isOutstanding: !!accompaniment.renewedFrom
          },
          accompaniment.id
        )
      )
    }

    return result
  }

  async update(accompaniment: Accompaniment): Promise<Accompaniment> {
    const updatedData = await this.prisma.accompaniments.update({
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

    const purchaseOrder = await this.purchaseOrderRepository.findByNumber(
      updatedData.number
    )

    const annotations = await this.annotationsRepository.findFromAccompaniment(
      accompaniment.id
    )

    let transactionNumber: number

    const { invoiceNumber, invoiceProvider } = accompaniment

    if (invoiceNumber && invoiceProvider) {
      const transaction = await this.invoicesWithoutAccompanimentsRepository.findByInvoice(
        invoiceNumber,
        invoiceProvider
      )

      if (transaction) {
        transactionNumber = transaction.transactionNumber
      }
    }

    const invoice = updatedData.invoiceId
      ? await this.invoiceRepository.findById(updatedData.invoiceId)
      : undefined

    const { count, criticalLevel } = this.accompanimentDelayProvider.calculate({
      ...updatedData,
      purchaseOrder
    })

    return new Accompaniment(
      {
        ...updatedData,
        delay: count || 0,
        criticalLevel,
        purchaseOrder,
        annotations,
        invoice,
        transactionNumber,
        isOutstanding: !!updatedData.renewedFrom
      },
      accompaniment.id
    )
  }
}
