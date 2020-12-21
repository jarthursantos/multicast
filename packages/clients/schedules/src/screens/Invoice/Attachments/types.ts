import { IInvoice } from '~/store/modules/schedules/types'

export interface IInvoiceAttachmentsProps {
  invoice: IInvoice
}

export enum Tabs {
  PRODUCTS = 'PRODUCTS',
  INVOICE = 'INVOICE',
  CTE = 'CTE'
}
