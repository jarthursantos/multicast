import { v4 as uuid } from 'uuid'

import { CriticalLevel } from './CriticalLevel'
import { IAccompanimentSchedule } from './IAccompanimentSchedule'
import { IAnnotation } from './IAnnotation'
import { IPurchaseOrder } from './IPurchaseOrder'

export interface IAccompaniment {
  readonly id: string

  purchaseOrder: IPurchaseOrder

  sendedAt?: Date
  reviewedAt?: Date
  releasedAt?: Date
  expectedBillingAt?: Date
  billingAt?: Date
  freeOnBoardAt?: Date
  schedulingAt?: Date
  finishedAt?: Date

  transactionNumber?: number
  invoiceNumber?: number
  invoiceProvider?: number

  renewedAt?: Date

  annotations: IAnnotation[]

  delay: number
  criticalLevel: CriticalLevel

  createdAt?: Date
  updatedAt?: Date

  isOutstanding: boolean

  schedule?: IAccompanimentSchedule
}

export function createAccompaniment(
  props: Omit<IAccompaniment, 'id'>,
  id?: string
): IAccompaniment {
  return {
    sendedAt: props.sendedAt,
    reviewedAt: props.reviewedAt,
    purchaseOrder: props.purchaseOrder,
    releasedAt: props.releasedAt,
    expectedBillingAt: props.expectedBillingAt,
    billingAt: props.billingAt,
    freeOnBoardAt: props.freeOnBoardAt,
    schedulingAt: props.schedulingAt,
    transactionNumber: props.transactionNumber,
    invoiceNumber: props.invoiceNumber,
    invoiceProvider: props.invoiceProvider,
    renewedAt: props.renewedAt,
    annotations: props.annotations,
    isOutstanding: props.isOutstanding,
    delay: props.delay,
    criticalLevel: props.criticalLevel,

    schedule: props.schedule,

    id: id || uuid(),

    createdAt: props.createdAt || new Date(),
    updatedAt: props.updatedAt || new Date()
  }
}
