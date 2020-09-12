import { InvoiceOrigin } from '@prisma/client'
import { pick } from 'lodash'

import { Invoice } from './Invoice'

export class InvoiceHistory {
  public invoice: Invoice

  public origin: InvoiceOrigin

  public providerCode: number
  public number: number
  public value?: number

  public emittedAt?: Date

  public key?: string
  public weight?: number
  public volume?: number

  public cteNumber?: number
  public cteKey?: string

  public dischargeValue?: number
  public receiptValue?: number

  public scheduleId?: string
  public invoiceFileId?: string
  public cteFileId?: string

  public canceledAt?: Date

  constructor(invoice: Invoice, data: Omit<InvoiceHistory, 'invoice'>) {
    Object.assign(
      this,
      pick(
        data,
        'origin',
        'providerCode',
        'number',
        'value',
        'emittedAt',
        'key',
        'weight',
        'volume',
        'cteNumber',
        'cteKey',
        'dischargeValue',
        'receiptValue',
        'scheduleId',
        'invoiceFileId',
        'cteFileId',
        'canceledAt'
      )
    )

    this.invoice = invoice
  }
}
