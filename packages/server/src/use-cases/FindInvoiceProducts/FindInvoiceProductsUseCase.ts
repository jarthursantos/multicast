import { InvoiceProduct } from 'entities/InvoiceProduct'
import { InvoiceSituations } from 'entities/InvoiceSituations'
import { IInvoiceProductsRepository } from 'repositories/IInvoiceProductsRepository'
import { IInvoicesRepository } from 'repositories/IInvoicesRepository'

export class FindInvoiceProductsUseCase {
  constructor(
    private invoicesRepository: IInvoicesRepository,
    private invoiceProductsRepository: IInvoiceProductsRepository
  ) {}

  async execute(id: string) {
    const invoice = await this.invoicesRepository.findById(id)

    if (!invoice) {
      throw new Error('Nota Fiscal não existe')
    }

    if (invoice.situation === InvoiceSituations.INVOICE_NON_LAUNCHED) {
      return []
    }

    let products: InvoiceProduct[]

    if (invoice.situation === InvoiceSituations.INVOICE_PRE_LAUNCHED) {
      products = await this.invoiceProductsRepository.findPreLaunched(
        invoice.providerCode,
        invoice.number
      )
    } else {
      products = await this.invoiceProductsRepository.findLaunched(
        invoice.providerCode,
        invoice.number
      )
    }

    return products
  }
}
