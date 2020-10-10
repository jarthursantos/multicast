import { pick } from 'lodash'
import { v4 as uuid } from 'uuid'

import { Annotation } from './Annotation'
import { Invoice } from './Invoice'
import { PurchaseOrder } from './PurchaseOrder'

export class Accompaniment {
  public readonly id: string

  public purchaseOrder: PurchaseOrder

  public sendedAt?: Date
  public reviewedAt?: Date
  public releasedAt?: Date
  public expectedBillingAt?: Date
  public billingAt?: Date
  public freeOnBoardAt?: Date
  public schedulingAt?: Date

  public transactionNumber?: number
  public invoiceNumber?: number
  public invoiceProvider?: number

  public renewedAt?: Date

  public invoice?: Invoice

  public annotations: Annotation[]

  public createdAt?: Date
  public updatedAt?: Date

  constructor(data: Omit<Accompaniment, 'id'>, id?: string) {
    Object.assign(
      this,
      pick(
        data,
        'sendedAt',
        'reviewedAt',
        'purchaseOrder',
        'releasedAt',
        'expectedBillingAt',
        'billingAt',
        'freeOnBoardAt',
        'schedulingAt',
        'transactionNumber',
        'invoiceNumber',
        'invoiceProvider',
        'renewedAt',
        'invoiceId',
        'invoice',
        'createdAt',
        'updatedAt',
        'annotations'
      )
    )

    this.id = id || uuid()

    this.createdAt = this.createdAt || new Date()
    this.updatedAt = this.updatedAt || new Date()
  }
}
