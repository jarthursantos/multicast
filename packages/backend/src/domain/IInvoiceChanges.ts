import { InvoiceOrigin } from '@prisma/client'

import { IInvoice } from './IInvoice'

export interface IInvoiceChanges {
  invoice: IInvoice

  origin: InvoiceOrigin

  providerCode: number
  number: number
  value?: number

  emittedAt?: Date

  key?: string
  weight?: number
  volume?: number

  cteNumber?: number
  cteKey?: string

  dischargeValue?: number
  receiptValue?: number

  scheduleId?: string
  invoiceFileId?: string
  cteFileId?: string

  canceledAt?: Date
}

export function createInvoiceChanges(
  invoice: IInvoice,
  props: Omit<IInvoiceChanges, 'invoice'>
): IInvoiceChanges {
  return {
    invoice,
    origin: props.origin,
    providerCode: props.providerCode,
    number: props.number,
    value: props.value,
    emittedAt: props.emittedAt,
    key: props.key,
    weight: props.weight,
    volume: props.volume,
    cteNumber: props.cteNumber,
    cteKey: props.cteKey,
    dischargeValue: props.dischargeValue,
    receiptValue: props.receiptValue,
    scheduleId: props.scheduleId,
    invoiceFileId: props.invoiceFileId,
    cteFileId: props.cteFileId,
    canceledAt: props.canceledAt
  }
}
