import { Accompaniment } from 'entities/Accompaniment'
import { Product } from 'entities/Product'
import { winthor } from 'libs/knex-winthor'
import {
  IAccompanimentProductsRepository,
  Options
} from 'repositories/IAccompanimentProductsRepository'

type RawProduct = Omit<Product, 'provider'> & {
  providerCode: number
  providerName: string
  providerCNPJ: string
  providerFantasy: string
  providerPrincipalCode: number
}

export class WinThorAccompanimentProductsRepository
  implements IAccompanimentProductsRepository {
  async findFromInvoice(accompaniment: Accompaniment): Promise<Product[]> {
    console.log({ accompaniment })

    // TODO: list from pre entry
    // TODO: list from normal entry

    return []
  }

  async find(
    accompaniment: Accompaniment,
    options?: Options
  ): Promise<Product[]> {
    const { purchaseOrder } = accompaniment

    const products = await winthor()
      .with('products', builder => {
        builder
          .select(
            'PCITEM.CODPROD as code',
            'PCPRODUT.DESCRICAO as description',
            'PCITEM.PCOMPRA as price',
            'PCITEM.QTENTREGUE as deliveredQuantity',
            'PCPRODUT.EMBALAGEM as packing',
            'PCPRODUT.UNIDADE as unity',
            'PCPRODUT.CODFAB as factoryCode',
            // 'DIRFOTOPROD as imagePath',
            'PCITEM.QTPEDIDA as requestedQuantity',
            'PCFORNEC.CODFORNEC as providerCode',
            'PCFORNEC.FORNECEDOR as providerName',
            'PCFORNEC.CGC as providerCNPJ',
            'PCFORNEC.FANTASIA as providerFantasy',
            'PCFORNEC.CODFORNECPRINC as providerPrincipalCode'
          )
          .from('PCPRODUT')
          .leftJoin('PCITEM', 'PCITEM.CODPROD', 'PCPRODUT.CODPROD')
          .leftJoin('PCPRODFILIAL', 'PCPRODFILIAL.CODPROD', 'PCITEM.CODPROD')
          .leftJoin('PCFORNEC', 'PCFORNEC.CODFORNEC', 'PCPRODUT.CODFORNEC')
          .whereRaw(
            `PCPRODFILIAL.CODFILIAL = 1 AND PCITEM.NUMPED = ${purchaseOrder.number}`
          )

        if (options) {
          if (options.only === 'pending') {
            builder.andWhereRaw('PCITEM.QTENTREGUE - PCITEM.QTPEDIDA != 0')
          } else if (options.only === 'delivered') {
            builder.andWhereRaw('PCITEM.QTENTREGUE - PCITEM.QTPEDIDA = 0')
          }
        }
      })
      .with('quantity', builder => {
        builder
          .count('PCPEDIDO.NUMPED as requestsCount')
          .select('PCITEM.CODPROD')
          .from('PCITEM')
          .leftJoin('PCPEDIDO', 'PCPEDIDO.NUMPED', 'PCITEM.NUMPED')
          .leftJoin('PCPRODFILIAL', 'PCPRODFILIAL.CODPROD', 'PCITEM.CODPROD')
          .whereRaw(
            'PCITEM.NUMPED = PCPEDIDO.NUMPED AND PCPRODFILIAL.CODFILIAL = 1'
          )
          .groupBy('PCITEM.CODPROD')
      })
      .select<RawProduct[]>('products.*', 'quantity.requestsCount')
      .from('products')
      .leftJoin('quantity', 'products.code', 'quantity.CODPROD')

    const result: Product[] = []

    products.forEach(product => {
      result.push({
        ...product,

        provider: {
          code: product.providerCode,
          name: product.providerName,
          cnpj: product.providerCNPJ,
          fantasy: product.providerFantasy,
          principalCode: product.providerPrincipalCode
        }
      })
    })

    return result
  }
}