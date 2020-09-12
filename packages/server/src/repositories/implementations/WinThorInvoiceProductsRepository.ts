import { InvoiceProduct } from 'entities/InvoiceProduct'
import { winthor } from 'libs/knex-winthor'
import { IInvoiceProductsRepository } from 'repositories/IInvoiceProductsRepository'
import { IProviderRepository } from 'repositories/IProviderRepository'

export class WinThorInvoiceProductsRepository
  implements IInvoiceProductsRepository {
  constructor(private providerRepository: IProviderRepository) {}

  async findLaunched(
    providerCode: number,
    invoiceNumber: number
  ): Promise<InvoiceProduct[]> {
    const provider = await this.providerRepository.findById(providerCode)

    const result: InvoiceProduct[] = []

    const products = await winthor
      .select(
        'PCMOV.CODPROD as code',
        'PCPRODUT.DESCRICAO as description',
        'PCPRODUT.EMBALAGEM as package',
        'PCPRODUT.UNIDADE as unity',
        'PCPRODUT.CODFAB as factoryCode'
      )
      .column(winthor.raw('(PCMOV.PTABELA - PCMOV.VLDESCONTO) as "price"'))
      .column(
        winthor.raw(
          'DECODE(NVL(PCMOV.QT, 0), 0, NVL(PCMOV.QTCONT, 0), PCMOV.QT) as "quantity"'
        )
      )
      .from('PCMOV')
      .leftJoin('PCPRODUT', 'PCMOV.CODPROD', 'PCPRODUT.CODPROD')
      .leftJoin('PCPEDIDO', 'PCMOV.NUMPED', 'PCPEDIDO.NUMPED')
      .where({
        'PCMOV.NUMNOTA': invoiceNumber,
        'PCMOV.CODFORNEC': providerCode
      })

    products.forEach(product =>
      result.push(new InvoiceProduct({ ...product, provider }))
    )

    return result
  }

  async findPreLaunched(
    providerCode: number,
    invoiceNumber: number
  ): Promise<InvoiceProduct[]> {
    const provider = await this.providerRepository.findById(providerCode)

    const result: InvoiceProduct[] = []

    const products = await winthor
      .select(
        'PCMOVPREENT.CODPROD as code',
        'PCPRODUT.DESCRICAO as description',
        'PCPRODUT.EMBALAGEM as package',
        'PCPRODUT.UNIDADE as unity',
        'PCPRODUT.CODFAB as factoryCode'
      )
      .column(
        winthor.raw('(PCMOVPREENT.PTABELA - PCMOVPREENT.VLDESCONTO) as "price"')
      )
      .column(
        winthor.raw(
          'DECODE(NVL(PCMOVPREENT.QT, 0), 0, NVL(PCMOVPREENT.QTCONT, 0), PCMOVPREENT.QT) as "quantity"'
        )
      )
      .from('PCMOVPREENT')
      .leftJoin('PCPRODUT', 'PCMOVPREENT.CODPROD', 'PCPRODUT.CODPROD')
      .leftJoin('PCPEDIDO', 'PCMOVPREENT.NUMPED', 'PCPEDIDO.NUMPED')
      .where({
        'PCMOVPREENT.NUMNOTA': invoiceNumber,
        'PCMOVPREENT.CODFORNEC': providerCode
      })

    products.forEach(product =>
      result.push(new InvoiceProduct({ ...product, provider }))
    )

    return result
  }
}
