import { IInvoiceProduct } from '~/domain/IInvoiceProduct'
import { InvoiceSituations } from '~/domain/InvoiceSituations'
import { IInvoiceProductsModel } from '~/models/invoice-products/IInvoiceProductsModel'
import { IInvoicesModel } from '~/models/invoices/IInvoicesModel'

export function createFindInvoiceProductsModule(
  invoicesModel: IInvoicesModel,
  invoiceProductsModel: IInvoiceProductsModel
) {
  return {
    async execute(id: string) {
      const invoice = await invoicesModel.findById(id)

      if (!invoice) {
        throw new Error('Nota Fiscal não existe')
      }

      if (invoice.situation === InvoiceSituations.INVOICE_NON_LAUNCHED) {
        return []
      }

      let products: IInvoiceProduct[]

      if (invoice.situation === InvoiceSituations.INVOICE_PRE_LAUNCHED) {
        products = await invoiceProductsModel.findPreLaunched(
          invoice.providerCode,
          invoice.number
        )
      } else {
        products = await invoiceProductsModel.findLaunched(
          invoice.providerCode,
          invoice.number
        )
      }

      return products
    }
  }
}
