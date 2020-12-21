import { Charge, Size, Receipt } from '@prisma/client'

import { IInvoice } from '~/domain/IInvoice'

export interface IReceiveSchedulesDTO {
  lecturer: string
  driver: string
  vehicleSize: Size
  chargeType: Charge
  assistant: boolean
  palletized: boolean
  pipeSize: Size
  paymentMethod: Receipt
  receiptValue: number
  receiptPerInvoice: boolean
  invoices: IReceiveInvoiceDTO[]
}

export interface IReceiveInvoiceDTO {
  id: string
  receiptValue: number
}

export interface IInvoiceReceipt {
  invoice: IInvoice
  receiptValue: number
  dischargeValue: number
}
