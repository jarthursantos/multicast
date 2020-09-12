import { Divergence, InvoiceOrigin } from '@prisma/client'

export interface CreateInvoicesRequestDTO {
  number: number
  providerCode: number
  divergence?: Divergence
  emittedAt: Date
  origin: InvoiceOrigin
  key: string
  weight: number
  volume: number
  value: number
  cteNumber: number
  cteKey: string

  invoiceFileId: string
  cteFileId: string
}
