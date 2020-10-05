import { pick } from 'lodash'
import { v4 as uuid } from 'uuid'

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

  public valueDelivered?: number
  public invoice?: Invoice

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
        'valueDelivered',
        'invoiceId',
        'createdAt',
        'updatedAt'
      )
    )

    this.id = id || uuid()

    this.createdAt = this.createdAt || new Date()
    this.updatedAt = this.updatedAt || new Date()
  }
}
