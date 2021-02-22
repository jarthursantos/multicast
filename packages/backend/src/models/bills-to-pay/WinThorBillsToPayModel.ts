import { IBillToPay } from '~/domain/IBillToPay'
import { winthor } from '~/libraries/WinThor'

import { IBillsToPayModel, IOptions } from './IBillsToPayModel'

interface IRawBillToPay extends Omit<IBillToPay, 'buyer' | 'provider'> {
  buyerCode: number
  buyerName: string
  providerCode: number
  providerName: string
  providerFantasy: string
  providerCNPJ: string
  providerPrincipalCode: number
}

export function createWinThorBillsToPayModel(): IBillsToPayModel {
  function generateCodeFilter(
    codes: Array<string | number>,
    field: string
  ): string {
    if (codes.length === 0) {
      return ''
    }

    return ` AND ${field} IN (${codes
      .map(code => (typeof code === 'string' ? `'${code}'` : code))
      .join(',')})`
  }

  function parseOptions(options: IOptions) {
    const { buyers = [], providers = [] } = options

    let params = ''

    if (buyers.length > 0) {
      params += generateCodeFilter(buyers, 'CODCOMPRADOR')
    }

    if (providers.length > 0) {
      params += generateCodeFilter(providers, 'PCFORNEC.CODFORNEC')
    }

    return `WHERE 1 = 1 ${params}`
  }

  return {
    async find(options: IOptions): Promise<IBillToPay[]> {
      const response = await winthor.raw<IRawBillToPay[]>(`
        SELECT PCLANC3.NUMPED AS "number",
          PCFORNEC.CODFORNEC AS "providerCode",
          PCFORNEC.FORNECEDOR AS "providerName",
          PCFORNEC.FANTASIA AS "providerFantasy",
          PCFORNEC.CGC AS "providerCNPJ",
          PCFORNEC.CODFORNECPRINC AS "providerPrincipalCode",
          PCLANC3.PREST AS "installment",
          PCLANC3.DTVENC AS "dueDate",
          PCLANC3.PRAZO AS "deadline",
          DECODE((SELECT NVL(PCINDICE.DOLARCOM, 0) FROM PCINDICE WHERE PCINDICE.DATA = (SELECT PCPEDIDO.DTEMISSAO FROM PCPEDIDO WHERE PCPEDIDO.NUMPED = PCLANC3.NUMPED)), 0, 0, (VALOR / GREATEST(DECODE(PCLANC3.MOEDA, 'D', (SELECT NVL(PCINDICE.DOLARCOM, 0) FROM PCINDICE WHERE PCINDICE.DATA = (SELECT PCPEDIDO.DTEMISSAO FROM PCPEDIDO WHERE PCPEDIDO.NUMPED = PCLANC3.NUMPED)), 1), 1))) AS "value",
          MATRICULA AS "buyerCode",
          NOME AS "buyerName"
        FROM PCLANC3 LEFT JOIN PCFORNEC ON (PCFORNEC.CODFORNEC = PCLANC3.CODFORNEC) LEFT JOIN PCEMPR ON (CODCOMPRADOR = MATRICULA)
        ${parseOptions(options)}
        ORDER BY PCLANC3.DTVENC
      `)

      return response.map(row => ({
        buyer: {
          code: row.buyerCode,
          name: row.buyerName
        },
        provider: {
          code: row.providerCode,
          name: row.providerName,
          cnpj: row.providerCNPJ,
          fantasy: row.providerFantasy,
          principalCode: row.providerPrincipalCode
        },
        deadline: row.deadline,
        dueDate: row.dueDate,
        installment: row.installment,
        value: row.value
      }))
    }
  }
}
