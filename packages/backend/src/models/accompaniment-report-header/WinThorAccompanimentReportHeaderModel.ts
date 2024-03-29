import { IAccompaniment } from '~/domain/IAccompaniment'
import { IAccompanimentReportHeader } from '~/domain/IAccompanimentReportHeader'
import { winthor } from '~/libraries/WinThor'

import { IAccompanimentReportHeaderModel } from './IAccompanimentReportHeaderModel'

export function createWinThorAccompanimentReportHeaderModel(): IAccompanimentReportHeaderModel {
  return {
    async find(
      accompaniment: IAccompaniment
    ): Promise<IAccompanimentReportHeader> {
      const data = await winthor
        .select<IAccompanimentReportHeader[]>(
          'PCPEDIDO.NUMPED      AS number',
          'PCPEDIDO.DTEMISSAO   AS emittedAt',
          'PCPEDIDO.DTFATUR     AS billingAt',
          'PCPEDIDO.DTEMBARQUE  AS boardingAt',
          'PCPEDIDO.DTPREVENT   AS expectedDeliveryAt',
          'PCPEDIDO.FRETE       AS freight',
          'PCPEDIDO.OBS         AS observationNumber1',
          'PCPEDIDO.OBS2        AS observationNumber2',
          'PCPEDIDO.OBS3        AS observationNumber3',
          'PCPEDIDO.OBS4        AS observationNumber4',
          'PCPEDIDO.OBS5        AS observationNumber5',
          'PCPEDIDO.OBS6        AS observationNumber6',
          'PCPEDIDO.OBS7        AS observationNumber7',
          'PCFORNEC.CODFORNEC   AS providerCode',
          'PCFORNEC.FORNECEDOR  AS providerName',
          'PCFORNEC.CGC         AS providerCNPJ',
          'PCFORNEC.TELFAB      AS providerPhone',
          'PCFORNEC.ENDER       AS providerAddress',
          'PCFORNEC.CIDADE      AS providerCity',
          'PCFORNEC.CEP         AS providerCEP',
          'PCFORNEC.BAIRRO      AS providerNeighborhood',
          'PCFORNEC.ESTADO      AS providerState',
          'PCFILIAL.RAZAOSOCIAL AS buyerName',
          'PCFILIAL.CGC         AS buyerCNPJ',
          'PCFILIAL.ENDERECO    AS buyerAddress',
          'PCFILIAL.NUMERO2     AS buyerNumber',
          'PCFILIAL.CIDADE      AS buyerCity',
          'PCFILIAL.UF          AS buyerUF',
          'PCFILIAL.IE          AS buyerIE',
          'PCFILIAL.CEP         AS buyerCEP'
        )
        .from('PCPEDIDO')
        .leftJoin('PCFORNEC', 'PCFORNEC.CODFORNEC', 'PCPEDIDO.CODFORNEC')
        .leftJoin('PCFILIAL', 'PCFILIAL.CODIGO', 'PCPEDIDO.CODFILIAL')
        .whereRaw(`NUMPED = ${accompaniment.purchaseOrder.number}`)

      return data[0]
    }
  }
}
