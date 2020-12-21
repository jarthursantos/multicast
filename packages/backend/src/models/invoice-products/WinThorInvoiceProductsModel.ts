import { IInvoiceProduct } from '~/domain/IInvoiceProduct'
import { winthor } from '~/libraries/WinThor'

import { IProvidersModel } from '../providers/IProvidersModel'
import { IInvoiceProductsModel } from './IInvoiceProductsModel'

export function createWinThorInvoiceProductsModel(
  providersModel: IProvidersModel
): IInvoiceProductsModel {
  return {
    async findLaunched(
      providerCode: number,
      invoiceNumber: number
    ): Promise<IInvoiceProduct[]> {
      const provider = await providersModel.findById(providerCode)

      const transaction = await winthor.raw<any[]>(`
        SELECT PCNFENT.NUMTRANSENT
        FROM PCNFENT
        WHERE PCNFENT.NUMTRANSENT = (CASE WHEN PCNFENT.TIPODESCARGA IN ('6', '7', '8', 'T', 'C') THEN (SELECT PCMOV.NUMTRANSENT FROM PCMOV WHERE PCMOV.NUMTRANSENT = PCNFENT.NUMTRANSENT AND PCMOV.DTCANCEL IS NULL AND ROWNUM = 1 AND PCMOV.CODOPER = 'ED') ELSE PCNFENT.NUMTRANSENT END)
          AND EXISTS(SELECT 1 FROM PCMOV WHERE PCMOV.NUMTRANSENT = PCNFENT.NUMTRANSENT)
          AND NVL(PCNFENT.VLTOTAL, 0) > 0
          AND PCNFENT.TIPODESCARGA IN ('1', '2', '3', '4', 'R', 'S', '5', '9', '6', '7', '8', 'A', 'E', 'B', 'C', 'D', 'F', 'I', 'N', 'T', 'M', 'J', 'H')
          AND PCNFENT.NUMNOTA = ${invoiceNumber}
          AND PCNFENT.CODFORNEC = ${providerCode}
          AND PCNFENT.CODFILIAL <> '99'
      `)

      if (transaction.length === 0) {
        return []
      }

      const { NUMTRANSENT } = transaction[0]

      const result: IInvoiceProduct[] = []

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
          'PCMOV.NUMTRANSENT': NUMTRANSENT
        })

      products.forEach(product => result.push({ ...product, provider }))

      return result
    },

    async findPreLaunched(
      providerCode: number,
      invoiceNumber: number
    ): Promise<IInvoiceProduct[]> {
      const provider = await providersModel.findById(providerCode)

      const result: IInvoiceProduct[] = []

      const products = await winthor
        .select(
          'PCMOVPREENT.CODPROD as code',
          'PCPRODUT.DESCRICAO as description',
          'PCPRODUT.EMBALAGEM as package',
          'PCPRODUT.UNIDADE as unity',
          'PCPRODUT.CODFAB as factoryCode'
        )
        .column(
          winthor.raw(
            '(PCMOVPREENT.PTABELA - PCMOVPREENT.VLDESCONTO) as "price"'
          )
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

      products.forEach(product => result.push({ ...product, provider }))

      return result
    }
  }
}
