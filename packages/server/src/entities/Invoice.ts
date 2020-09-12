import { Divergence, InvoiceOrigin } from '@prisma/client'
import { pick } from 'lodash'
import { v4 as uuid } from 'uuid'

import { File } from './File'
import { InvoiceSituations } from './InvoiceSituations'
import { Provider } from './Provider'

export class Invoice {
  public readonly id: string

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

  public divergence?: Divergence

  public scheduleId?: string
  public invoiceFileId?: string
  public cteFileId?: string

  public createdAt?: Date
  public updatedAt?: Date
  public canceledAt?: Date

  public provider: Provider
  public invoiceFile?: File
  public cteFile?: File

  public situation: InvoiceSituations

  constructor(data: Omit<Invoice, 'id'>, id?: string) {
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
        'divergence',
        'scheduleId',
        'invoiceFileId',
        'cteFileId',
        'createdAt',
        'updatedAt',
        'canceledAt',
        'provider',
        'invoiceFile',
        'cteFile',
        'situation'
      )
    )

    this.id = id || uuid()

    this.createdAt = this.createdAt || new Date()
    this.updatedAt = this.updatedAt || new Date()
  }
}
