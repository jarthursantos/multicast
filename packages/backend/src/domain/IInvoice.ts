import { Divergence, InvoiceOrigin } from '@prisma/client'
import { v4 as uuid } from 'uuid'

import { IFile } from './IFile'
import { InvoiceSituations } from './InvoiceSituations'
import { IProvider } from './IProvider'

export interface IInvoice {
  readonly id: string

  origin: InvoiceOrigin

  providerCode: number
  number: number
  value?: number

  importation: boolean

  emittedAt?: Date

  key?: string
  weight?: number
  volume?: number

  cteNumber?: number
  cteKey?: string

  dischargeValue?: number
  receiptValue?: number

  divergence?: Divergence

  scheduleId?: string
  invoiceFileId?: string
  cteFileId?: string

  createdAt?: Date
  updatedAt?: Date
  canceledAt?: Date

  provider: IProvider
  invoiceFile?: IFile
  cteFile?: IFile

  situation: InvoiceSituations
}

export interface IInvoiceBase {
  number: number
  providerCode: number
  transactionNumber: number
  amountValue: number
  emittedAt: Date
}

export function createInvoice(
  props: Omit<IInvoice, 'id'>,
  id?: string
): IInvoice {
  return {
    origin: props.origin,
    providerCode: props.providerCode,
    number: props.number,
    importation: props.importation,
    value: props.value,
    emittedAt: props.emittedAt,
    key: props.key,
    weight: props.weight,
    volume: props.volume,
    cteNumber: props.cteNumber,
    cteKey: props.cteKey,
    dischargeValue: props.dischargeValue,
    receiptValue: props.receiptValue,
    divergence: props.divergence,
    scheduleId: props.scheduleId,
    invoiceFileId: props.invoiceFileId,
    cteFileId: props.cteFileId,
    canceledAt: props.canceledAt,
    provider: props.provider,
    invoiceFile: props.invoiceFile,
    cteFile: props.cteFile,
    situation: props.situation,

    id: id || uuid(),

    createdAt: props.createdAt || new Date(),
    updatedAt: props.updatedAt || new Date()
  }
}
