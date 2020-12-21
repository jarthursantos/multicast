import { endOfMonth, startOfMonth } from 'date-fns'
import { BillToPay } from 'entities/BillToPay'
import { winthor } from 'libs/knex-winthor'
import {
  IBillsToPayRepository,
  Options
} from 'repositories/IBillsToPayRepository'
import { formatDate } from 'utils/date-intervals'

interface RawBillToPay extends Omit<BillToPay, 'buyer' | 'provider'> {
  buyerCode: number
  buyerName: string
  providerCode: number
  providerName: string
  providerFantasy: string
  providerCNPJ: string
  providerPrincipalCode: number
}

export class WinThorBillsToPayRepository implements IBillsToPayRepository {
  async find(
    options: Options,
    month: number,
    year: number
  ): Promise<BillToPay[]> {
    const startDate = startOfMonth(new Date(year, month - 1, 1))
    const endDate = endOfMonth(new Date(year, month - 1, 1))

    const response = await winthor.raw<RawBillToPay[]>(`
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
      WHERE DTVENC BETWEEN TO_DATE('${formatDate(startDate)}', 'DD/MM/YYYY')
        AND TO_DATE('${formatDate(endDate)}', 'DD/MM/YYYY')
        ${this.parseOptions(options)}
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

  private parseOptions(options: Options) {
    const { buyers = [], providers = [] } = options

    let params = ''

    if (buyers.length > 0) {
      params += this.generateCodeFilter(buyers, 'CODCOMPRADOR')
    }

    if (providers.length > 0) {
      params += this.generateCodeFilter(providers, 'PCFORNEC.CODFORNEC')
    }

    return params
  }

  private generateCodeFilter(
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
}
