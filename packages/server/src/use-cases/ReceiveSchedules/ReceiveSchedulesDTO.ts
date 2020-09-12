import { Charge, Size, Receipt } from '@prisma/client'
import { Invoice } from 'entities/Invoice'

export type Assistant = 'YES' | 'NO'
export type Palletized = 'YES' | 'NO'

export interface ReceiveSchedulesRequestDTO {
  lecturer: string
  driver: string
  vehicleSize: Size
  chargeType: Charge
  assistant: Assistant
  palletized: Palletized
  pipeSize: Size
  paymentMethod: Receipt
  receiptValue: number
  receiptPerInvoice: boolean
  invoices: ReceiveInvoiceDTO[]
}

export interface ReceiveInvoiceDTO {
  id: string
  receiptValue: number
}

export interface InvoiceReceipt {
  invoice: Invoice
  receiptValue: number
  dischargeValue: number
}
