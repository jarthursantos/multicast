import { PrismaClient } from '@prisma/client'
import { Accompaniment } from 'entities/Accompaniment'
import { PurchaseOrder } from 'entities/PurchaseOrder'
import { omit } from 'lodash'
import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'
import { IAnnotationsRepository } from 'repositories/IAnnotationsRepository'
import { IInvoicesRepository } from 'repositories/IInvoicesRepository'
import { IPurchaseOrderRepository } from 'repositories/IPurchaseOrderRepository'

export class PrismaAccompanimentsRepository
  implements IAccompanimentsRepository {
  private prisma = new PrismaClient()

  constructor(
    private purchaseOrderRepository: IPurchaseOrderRepository,
    private annotationsRepository: IAnnotationsRepository,
    private invoiceRepository: IInvoicesRepository
  ) {}

  async registerPurchaseOrders(purchases: PurchaseOrder[]): Promise<void> {
    for (let i = 0; i < purchases.length; i++) {
      const purchaseOrder = purchases[i]

      const accompaniment = new Accompaniment({
        ...purchaseOrder,
        purchaseOrder,
        annotations: []
      })

      await this.prisma.accompaniments.create({
        data: {
          ...omit(
            accompaniment,
            'invoiceId',
            'invoice',
            'purchaseOrder',
            'annotations',
            'number',
            'value',
            'emittedAt'
          ),
          number: purchaseOrder.number
        }
      })
    }
  }

  async findById(id: string): Promise<Accompaniment> {
    const accompaniment = await this.prisma.accompaniments.findOne({
      where: { id }
    })

    if (accompaniment) {
      const purchaseOrder = await this.purchaseOrderRepository.findByNumber(
        accompaniment.number
      )

      const annotations = await this.annotationsRepository.findFromAccompaniment(
        id
      )

      const invoice = accompaniment.invoiceId
        ? await this.invoiceRepository.findById(accompaniment.invoiceId)
        : undefined

      return new Accompaniment(
        { ...accompaniment, purchaseOrder, annotations, invoice },
        accompaniment.id
      )
    }

    return undefined
  }

  async findMany(): Promise<Accompaniment[]> {
    const result: Accompaniment[] = []

    const accompaniments = await this.prisma.accompaniments.findMany({
      where: { cancelation: undefined },
      orderBy: { number: 'asc' }
    })

    for (let i = 0; i < accompaniments.length; i++) {
      const accompaniment = accompaniments[i]

      const purchaseOrder = await this.purchaseOrderRepository.findByNumber(
        accompaniment.number
      )

      const annotations = await this.annotationsRepository.findFromAccompaniment(
        accompaniment.id
      )

      const invoice = accompaniment.invoiceId
        ? await this.invoiceRepository.findById(accompaniment.invoiceId)
        : undefined

      result.push(
        new Accompaniment(
          { ...accompaniment, purchaseOrder, annotations, invoice },
          accompaniment.id
        )
      )
    }

    return result
  }

  async update(accompaniment: Accompaniment): Promise<Accompaniment> {
    const updatedData = await this.prisma.accompaniments.update({
      where: { id: accompaniment.id },
      data: {
        ...omit(
          accompaniment,
          'invoiceId',
          'invoice',
          'purchaseOrder',
          'annotations',
          'number',
          'value',
          'emittedAt'
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

    const invoice = updatedData.invoiceId
      ? await this.invoiceRepository.findById(updatedData.invoiceId)
      : undefined

    return new Accompaniment(
      { ...updatedData, purchaseOrder, annotations, invoice },
      accompaniment.id
    )
  }
}
