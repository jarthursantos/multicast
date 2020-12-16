import { IAccompaniment } from '~/domain/IAccompaniment'
import { IProduct } from '~/domain/IProduct'
import { winthor } from '~/libraries/WinThor'

import {
  IAccompanimentProductsModel,
  IOptions
} from './IAccompanimentProductsModel'

type IRawProduct = Omit<IProduct, 'provider'> & {
  providerCode: number
  providerName: string
  providerCNPJ: string
  providerFantasy: string
  providerPrincipalCode: number
}

export function createWinThorAccompanimentProductsModel(): IAccompanimentProductsModel {
  return {
    async findFromInvoice(accompaniment: IAccompaniment): Promise<IProduct[]> {
      console.log({ accompaniment })

      // TODO: list from pre entry
      // TODO: list from normal entry

      return []
    },

    async find(
      accompaniment: IAccompaniment,
      options?: IOptions
    ): Promise<IProduct[]> {
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
              'PCITEM.VLIPI as ipi',
              'PCITEM.BASEICMS as icmsBase',
              'PCITEM.VLICMS as icmsValue',
              'PCPRODUT.VOLUME as volume',
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
        .select<IRawProduct[]>('products.*', 'quantity.requestsCount')
        .from('products')
        .leftJoin('quantity', 'products.code', 'quantity.CODPROD')
        .orderBy('products.description', 'asc')

      const result: IProduct[] = []

      products.forEach(product => {
        result.push({
          code: product.code,
          description: product.description,
          factoryCode: product.factoryCode,
          packing: product.packing,
          unity: product.unity,
          price: product.price,
          deliveredQuantity: product.deliveredQuantity,
          requestedQuantity: product.requestedQuantity,
          requestsCount: product.requestsCount,
          icmsBase: product.icmsBase,
          icmsValue: product.icmsValue,
          volume: product.volume,
          ipi: product.ipi,

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
}
