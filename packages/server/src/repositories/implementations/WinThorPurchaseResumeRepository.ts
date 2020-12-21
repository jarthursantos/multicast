import { getDay } from 'date-fns'
import {
  BuyerPurchaseResume,
  ProviderPurchaseResume,
  EvolutionPurchaseResume,
  UFPurchaseResume,
  PurchaseResumeInvoice
} from 'entities/PurchaseResume'
import { winthor } from 'libs/knex-winthor'
import {
  IPurchaseResumeRepository,
  Options
} from 'repositories/IPurchaseResumeRepository'
import {
  formatDate,
  generateDateIntervals,
  normalizeDate
} from 'utils/date-intervals'

interface RawBuyerPurchaseResume
  extends Omit<BuyerPurchaseResume, 'buyer' | 'representativity' | 'period'> {
  code: number
  name: string
}

interface RawProviderPurchaseResume
  extends Omit<
    ProviderPurchaseResume,
    'provider' | 'representativity' | 'period'
  > {
  code: number
  name: string
  fantasy: string
  cnpj: string
}

type RawEvolutionPurchaseResume = Omit<
  EvolutionPurchaseResume,
  'representativity' | 'period' | 'weekDay'
>

type RawUFPurchaseResume = Omit<UFPurchaseResume, 'representativity' | 'period'>

interface RawPurchaseResumeInvoice
  extends Omit<PurchaseResumeInvoice, 'provider'> {
  providerCode: number
  providerName: string
  providerFantasy: string
  providerCNPJ: string
  providerPrincipalCode: number
}

const days = [
  'DOMINGO',
  'SEGUNDA',
  'TERÇA',
  'QUARTA',
  'QUINTA',
  'SEXTA',
  'SÁBADO'
]

export class WinThorPurchaseResumeRepository
  implements IPurchaseResumeRepository {
  async findPerBuyer(options: Options): Promise<BuyerPurchaseResume[]> {
    const result: BuyerPurchaseResume[] = []

    const { buyers = [], providers = [], periodFrom, periodTo } = options

    let baseParams = ''
    let codeMove: string

    const intervals = generateDateIntervals(
      normalizeDate(periodFrom),
      normalizeDate(periodTo)
    )

    if (buyers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(buyers, 'PCFORNEC.CODCOMPRADOR')}`
    }

    if (providers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(providers, 'PCFORNEC.CODFORNEC')}`
    }

    switch (options.situation) {
      case 'all':
        baseParams += " AND PCNFENT.TIPODESCARGA IN ('1', '5', 'I')"
        codeMove = "NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
      case 'normal':
        baseParams += " AND PCNFENT.TIPODESCARGA IN ('1')"
        codeMove = "NVL(PCMOV.CODOPER, 'X') in ('E')"
        break
      case 'bonification':
        baseParams += " AND PCNFENT.TIPODESCARGA IN ('5')"
        codeMove = "NVL(PCMOV.CODOPER, 'X') in ('EB')"
        break
      case 'importation':
        baseParams += " AND PCNFENT.TIPODESCARGA IN ('I')"
        codeMove = "NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
    }

    for (let i = 0; i < intervals.length; i++) {
      const { fromFormated, toFormated, name } = intervals[i]

      const params = `${baseParams}
        AND PCNFENT.DTENT BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY')
        AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
      `

      const response = await winthor.raw<RawBuyerPurchaseResume[]>(`
        SELECT PCEMPR.MATRICULA AS "code",
          PCEMPR.NOME AS "name",
          SUM(NVL(PCMOV.QT, 0) * NVL(PCMOV.PUNIT, 0)) AS "entryValue",
          SUM(NVL(PCMOV.QT, 0) * NVL(PCPRODUT.PESOBRUTO, 0)) AS "amountWeight",
          MAX(DECODE(NVL(TABELAPCLANC.PCLANCVALOR, 0), 0, 0, NVL(GREATEST(TABELAPCLANC.PCLANCVALORPRAZO, 0), 0) / GREATEST(TABELAPCLANC.PCLANCVALOR, 0))) AS "averageTime"
        FROM PCMOV,
          PCNFENT,
          PCPRODUT,
          PCDEPTO,
          PCEMPR,
          PCFORNEC,
          (SELECT PCFORNEC.CODCOMPRADOR,
          SUM((PCLANC.DTVENC - PCLANC.DTEMISSAO) * NVL(GREATEST(PCLANC.VALOR, 0), 0)) PCLANCVALORPRAZO,
            SUM(NVL(GREATEST(PCLANC.VALOR, 0), 0)) PCLANCVALOR
          FROM PCNFENT,
            PCEMPR,
            PCFORNEC,
            PCLANC
          WHERE PCLANC.NUMTRANSENT = PCNFENT.NUMTRANSENT
            AND PCFORNEC.CODFORNEC = PCNFENT.CODFORNEC
            AND PCFORNEC.CODCOMPRADOR = PCEMPR.MATRICULA (+)
            ${params}
            AND PCNFENT.CODCONT = (SELECT CODCONTFOR FROM PCCONSUM)
            AND PCNFENT.CODFILIAL = 1
            AND PCLANC.TIPOPARCEIRO = 'F'
            AND PCLANC.CODFILIAL = 1
          GROUP BY PCFORNEC.CODCOMPRADOR) TABELAPCLANC
        WHERE PCMOV.NUMTRANSENT = PCNFENT.NUMTRANSENT
          AND PCFORNEC.CODFORNEC = PCNFENT.CODFORNEC
          AND PCFORNEC.CODCOMPRADOR = PCEMPR.MATRICULA (+)
          AND PCFORNEC.CODCOMPRADOR = TABELAPCLANC.CODCOMPRADOR (+)
          ${params}
          AND ${codeMove}
          AND (PCMOV.CODPROD = PCPRODUT.CODPROD)
          AND (PCPRODUT.CODEPTO = PCDEPTO.CODEPTO)
          AND PCMOV.DTCANCEL IS NULL
          AND PCNFENT.CODCONT = (SELECT CODCONTFOR FROM PCCONSUM)
          AND PCNFENT.CODFILIAL = 1
          AND PCDEPTO.TIPOMERC NOT IN ('CI', 'IM')
        GROUP BY PCEMPR.MATRICULA, PCEMPR.NOME
        ORDER BY PCEMPR.NOME
      `)

      response.forEach(rawBuyer =>
        result.push({
          buyer: {
            code: rawBuyer.code,
            name: rawBuyer.name
          },
          amountWeight: rawBuyer.amountWeight,
          averageTime: rawBuyer.averageTime,
          entryValue: rawBuyer.entryValue,
          period: name,
          representativity: 0
        })
      )
    }

    return result
  }

  async findPerBuyerInvoices(
    buyer: number,
    options: Options
  ): Promise<PurchaseResumeInvoice[]> {
    const { buyers = [], providers = [], periodFrom, periodTo } = options

    let baseParams = `
    AND PCNFENT.DTENT BETWEEN TO_DATE('${formatDate(
      normalizeDate(periodFrom)
    )}', 'DD/MM/YYYY') AND TO_DATE('${formatDate(
      normalizeDate(periodTo)
    )}', 'DD/MM/YYYY')
    `

    if (buyers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(buyers, 'PCFORNEC.CODCOMPRADOR')}`
    }

    if (providers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(providers, 'PCFORNEC.CODFORNEC')}`
    }

    switch (options.situation) {
      case 'all':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('1', '5', 'I') AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
      case 'normal':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('1') AND NVL(PCMOV.CODOPER, 'X') in ('E')"
        break
      case 'bonification':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('5') AND NVL(PCMOV.CODOPER, 'X') in ('EB')"
        break
      case 'importation':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('I') AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
    }

    const response = await winthor.raw<RawPurchaseResumeInvoice[]>(`
      SELECT PCNFENT.NUMNOTA AS "number",
        PCNFENT.CODFORNEC AS "providerCode",
        PCFORNEC.FORNECEDOR AS "providerName",
        PCFORNEC.FANTASIA AS "providerFantasy",
        PCFORNEC.CGC AS "providerCNPJ",
        PCFORNEC.CODFORNECPRINC AS "providerPrincipalCode",
        NVL((SELECT SUM((PCLANC.DTVENC - PCLANC.DTEMISSAO) * GREATEST(PCLANC.VALOR, 0)) / DECODE(SUM(NVL(GREATEST(PCLANC.VALOR, 0), 0)), 0, 1, SUM(NVL(GREATEST(PCLANC.VALOR, 0), 0)))
              FROM PCLANC
            WHERE PCLANC.NUMTRANSENT = PCNFENT.NUMTRANSENT), 0) AS "averageTime",
        SUM(NVL(PCMOV.QT, 0) * NVL(PCMOV.PUNIT, 0)) AS "entryValue",
        SUM(NVL(PCMOV.QT, 0) * NVL(PCPRODUT.PESOBRUTO, 0)) AS "amountWeight"
      FROM PCMOV,
        PCNFENT,
        PCPRODUT,
        PCDEPTO,
        PCEMPR,
        PCFORNEC
      WHERE PCMOV.NUMTRANSENT = PCNFENT.NUMTRANSENT
        AND PCFORNEC.CODFORNEC = PCNFENT.CODFORNEC
        AND PCFORNEC.CODCOMPRADOR = PCEMPR.MATRICULA (+)
        ${baseParams}
        AND (PCMOV.CODPROD = PCPRODUT.CODPROD)
        AND (PCPRODUT.CODEPTO = PCDEPTO.CODEPTO)
        AND PCMOV.DTCANCEL IS NULL
        AND PCNFENT.CODCONT = (SELECT CODCONTFOR FROM PCCONSUM)
        AND PCNFENT.CODFILIAL = 1
        AND PCDEPTO.TIPOMERC NOT IN ('CI', 'IM')
        AND PCFORNEC.CODCOMPRADOR = ${buyer}
      GROUP BY PCNFENT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCNFENT.NUMNOTA, PCNFENT.NUMTRANSENT, PCNFENT.DTSAIDA, PCNFENT.DTEMISSAO
      ORDER BY "entryValue" DESC
      `)

    return response.map(invoice => ({
      number: invoice.number,
      provider: {
        code: invoice.providerCode,
        name: invoice.providerName,
        fantasy: invoice.providerFantasy,
        principalCode: invoice.providerPrincipalCode,
        cnpj: invoice.providerCNPJ
      },
      amountWeight: invoice.amountWeight,
      averageTime: invoice.averageTime,
      entryValue: invoice.entryValue
    }))
  }

  async findPerProvider(options: Options): Promise<ProviderPurchaseResume[]> {
    const result: ProviderPurchaseResume[] = []

    const { buyers = [], providers = [], periodFrom, periodTo } = options

    let baseParams = ''
    let nfeType: string
    let codeMove: string

    const intervals = generateDateIntervals(
      normalizeDate(periodFrom),
      normalizeDate(periodTo)
    )

    if (buyers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(buyers, 'MATRICULA')}`
    }

    if (providers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(providers, 'B.CODFORNEC')}`
    }

    switch (options.situation) {
      case 'all':
        nfeType = " PCNFENT.TIPODESCARGA IN ('1', '5', 'I')"
        codeMove = "NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
      case 'normal':
        nfeType = " PCNFENT.TIPODESCARGA IN ('1')"
        codeMove = "NVL(PCMOV.CODOPER, 'X') in ('E')"
        break
      case 'bonification':
        nfeType = " PCNFENT.TIPODESCARGA IN ('5')"
        codeMove = "NVL(PCMOV.CODOPER, 'X') in ('EB')"
        break
      case 'importation':
        nfeType = " PCNFENT.TIPODESCARGA IN ('I')"
        codeMove = "NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
    }

    for (let i = 0; i < intervals.length; i++) {
      const { fromFormated, toFormated, name } = intervals[i]

      const response = await winthor.raw<RawProviderPurchaseResume[]>(`
        SELECT CODFORNECPRINC AS "code",
          FORNECEDOR AS "name",
          FANTASIA AS "fantasy",
          CGC AS "cnpj",
          SUM(CONTADOR) AS "invoiceCount",
          SUM(VLENTRADA) AS "entryValue",
          SUM(TOTPESO) AS "amountWeight",
          NVL(SUM(B1.DIF) / SUM(B1.TOT), 0) AS "averageTime"
        FROM (SELECT B.CODFORNECPRINC,
                B.FORNECEDOR,
                B.FANTASIA,
                B.CGC,
                COUNT(DISTINCT (PCNFENT.NUMTRANSENT))              CONTADOR,
                SUM(NVL(PCMOV.QT, 0) * NVL(PCMOV.PUNIT, 0))        VLENTRADA,
                SUM(NVL(PCMOV.QT, 0) * NVL(PCPRODUT.PESOBRUTO, 0)) TOTPESO,
                PCNFENT.NUMTRANSENT
              FROM PCMOV,
                PCNFENT,
                PCPRODUT,
                PCDEPTO,
                PCEMPR,
                PCFORNEC B
              WHERE PCMOV.NUMTRANSENT = PCNFENT.NUMTRANSENT
              AND B.CODFORNEC = PCNFENT.CODFORNEC
              AND B.CODCOMPRADOR = PCEMPR.MATRICULA (+)
              AND PCNFENT.DTENT BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
              AND (PCMOV.CODPROD = PCPRODUT.CODPROD)
              AND (PCPRODUT.CODEPTO = PCDEPTO.CODEPTO)
              AND PCMOV.DTCANCEL IS NULL
              AND PCNFENT.CODCONT = (SELECT CODCONTFOR FROM PCCONSUM)
              ${baseParams}
              AND ${nfeType}
              AND ${codeMove}
              AND PCNFENT.CODFILIAL = 1
              AND PCDEPTO.TIPOMERC NOT IN ('CI', 'IM')
            GROUP BY B.CODFORNECPRINC, B.FORNECEDOR, B.FANTASIA, B.CGC, PCNFENT.NUMTRANSENT) A,
            (SELECT SUM((DTVENC - PCLANC.DTEMISSAO) * GREATEST(VALOR, 0)) DIF,
              DECODE(SUM(NVL(GREATEST(VALOR, 0), 0)), 0, 1, SUM(NVL(GREATEST(VALOR, 0), 0))) TOT,
              PCNFENT.NUMTRANSENT
            FROM PCLANC,
              PCNFENT
            WHERE PCLANC.NUMTRANSENT = PCNFENT.NUMTRANSENT
              AND PCNFENT.CODCONT = (SELECT CODCONTFOR FROM PCCONSUM)
              AND ${nfeType}
              AND PCNFENT.DTENT BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY')
              AND TO_DATE('${toFormated}'
              , 'DD/MM/YYYY')
              AND PCNFENT.CODFILIAL = 1
            GROUP BY PCNFENT.NUMTRANSENT) B1
        WHERE A.NUMTRANSENT = B1.NUMTRANSENT (+)
        GROUP BY CODFORNECPRINC, FORNECEDOR, FANTASIA, CGC
        ORDER BY "entryValue" DESC
      `)

      response.forEach(rawProvider =>
        result.push({
          provider: {
            code: rawProvider.code,
            name: rawProvider.name,
            cnpj: rawProvider.cnpj,
            fantasy: rawProvider.fantasy,
            principalCode: rawProvider.code
          },
          invoiceCount: rawProvider.invoiceCount,
          amountWeight: rawProvider.amountWeight,
          averageTime: rawProvider.averageTime,
          entryValue: rawProvider.entryValue,
          period: name,
          representativity: 0
        })
      )
    }

    return result
  }

  async findPerProviderInvoices(
    provider: number,
    options: Options
  ): Promise<PurchaseResumeInvoice[]> {
    const { buyers = [], providers = [], periodFrom, periodTo } = options

    let baseParams = `
    AND PCNFENT.DTENT BETWEEN TO_DATE('${formatDate(
      normalizeDate(periodFrom)
    )}', 'DD/MM/YYYY') AND TO_DATE('${formatDate(
      normalizeDate(periodTo)
    )}', 'DD/MM/YYYY')
    `

    if (buyers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(buyers, 'PCFORNEC.CODCOMPRADOR')}`
    }

    if (providers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(providers, 'PCFORNEC.CODFORNEC')}`
    }

    switch (options.situation) {
      case 'all':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('1', '5', 'I') AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
      case 'normal':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('1') AND NVL(PCMOV.CODOPER, 'X') in ('E')"
        break
      case 'bonification':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('5') AND NVL(PCMOV.CODOPER, 'X') in ('EB')"
        break
      case 'importation':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('I') AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
    }

    const response = await winthor.raw<RawPurchaseResumeInvoice[]>(`
      SELECT PCNFENT.NUMNOTA AS "number",
        PCNFENT.CODFORNEC AS "providerCode",
        PCFORNEC.FORNECEDOR AS "providerName",
        PCFORNEC.FANTASIA AS "providerFantasy",
        PCFORNEC.CODFORNECPRINC AS "providerPrincipalCode",
        PCFORNEC.CGC AS "providerCNPJ",
        NVL((SELECT SUM((PCLANC.DTVENC - PCLANC.DTEMISSAO) * GREATEST(PCLANC.VALOR, 0)) / DECODE(SUM(NVL(GREATEST(PCLANC.VALOR, 0), 0)), 0, 1, SUM(NVL(GREATEST(PCLANC.VALOR, 0), 0)))
            FROM PCLANC
            WHERE PCLANC.NUMTRANSENT = PCNFENT.NUMTRANSENT), 0) AS "averageTime",
        SUM(NVL(PCMOV.QT, 0) * NVL(PCMOV.PUNIT, 0)) AS "entryValue",
            SUM(NVL(PCMOV.QT, 0) * NVL(PCPRODUT.PESOBRUTO, 0)) AS "amountWeight"
      FROM PCMOV,
        PCNFENT,
        PCPRODUT,
        PCDEPTO,
        PCEMPR,
        PCFORNEC
      WHERE PCMOV.NUMTRANSENT = PCNFENT.NUMTRANSENT
        AND PCFORNEC.CODFORNEC = PCNFENT.CODFORNEC
        AND PCFORNEC.CODCOMPRADOR = PCEMPR.MATRICULA (+)
        ${baseParams}
        AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')
        AND (PCMOV.CODPROD = PCPRODUT.CODPROD)
        AND (PCPRODUT.CODEPTO = PCDEPTO.CODEPTO)
        AND PCMOV.DTCANCEL IS NULL
        AND PCNFENT.CODCONT = (SELECT CODCONTFOR FROM PCCONSUM)
        AND PCNFENT.CODFILIAL = 1
        AND PCDEPTO.TIPOMERC NOT IN ('CI', 'IM')
        AND PCFORNEC.CODFORNECPRINC = ${provider}
      GROUP BY PCNFENT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CODFORNECPRINC, PCFORNEC.CGC, PCNFENT.NUMNOTA, PCNFENT.NUMTRANSENT, PCNFENT.DTEMISSAO
      ORDER BY "entryValue" DESC
      `)

    return response.map(invoice => ({
      number: invoice.number,
      provider: {
        code: invoice.providerCode,
        name: invoice.providerName,
        fantasy: invoice.providerFantasy,
        principalCode: invoice.providerPrincipalCode,
        cnpj: invoice.providerCNPJ
      },
      amountWeight: invoice.amountWeight,
      averageTime: invoice.averageTime,
      entryValue: invoice.entryValue
    }))
  }

  async findPerEvolution(options: Options): Promise<EvolutionPurchaseResume[]> {
    const result: EvolutionPurchaseResume[] = []

    const { buyers = [], providers = [], periodFrom, periodTo } = options

    let baseParams = ''

    const intervals = generateDateIntervals(
      normalizeDate(periodFrom),
      normalizeDate(periodTo)
    )

    if (buyers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(buyers, 'PCFORNEC.CODCOMPRADOR')}`
    }

    if (providers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(providers, 'PCFORNEC.CODFORNEC')}`
    }

    switch (options.situation) {
      case 'all':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('1', '5', 'I') AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
      case 'normal':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('1') AND NVL(PCMOV.CODOPER, 'X') in ('E')"
        break
      case 'bonification':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('5') AND NVL(PCMOV.CODOPER, 'X') in ('EB')"
        break
      case 'importation':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('I') AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
    }

    for (let i = 0; i < intervals.length; i++) {
      const { fromFormated, toFormated, name } = intervals[i]

      const params = `${baseParams}
        AND PCNFENT.DTENT BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY')
        AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
      `

      const response = await winthor.raw<RawEvolutionPurchaseResume[]>(`
        SELECT PCNFENT.DTENT AS "emittedAt",
          COUNT(DISTINCT (PCNFENT.NUMTRANSENT)) AS "invoiceCount",
          SUM(NVL(PCMOV.QT, 0) * NVL(PCMOV.PUNIT, 0)) AS "entryValue",
          SUM(NVL(PCMOV.QT, 0) * NVL(PCPRODUT.PESOBRUTO, 0)) AS "amountWeight"
        FROM PCMOV,
          PCNFENT,
          PCPRODUT,
          PCDEPTO,
          PCEMPR,
          PCFORNEC
        WHERE PCMOV.NUMTRANSENT = PCNFENT.NUMTRANSENT
          AND PCFORNEC.CODFORNEC = PCNFENT.CODFORNEC
          AND PCFORNEC.CODCOMPRADOR = PCEMPR.MATRICULA (+)
          ${params}
          AND (PCMOV.CODPROD = PCPRODUT.CODPROD)
          AND (PCPRODUT.CODEPTO = PCDEPTO.CODEPTO)
          AND PCNFENT.CODCONT = (SELECT CODCONTFOR FROM PCCONSUM)
          AND PCNFENT.CODFILIAL = 1
          AND PCDEPTO.TIPOMERC NOT IN ('CI', 'IM')
        GROUP BY PCNFENT.DTENT
        ORDER BY PCNFENT.DTENT
      `)

      response.forEach(rawEvolution =>
        result.push({
          emittedAt: rawEvolution.emittedAt,
          invoiceCount: rawEvolution.invoiceCount,
          weekDay: days[getDay(rawEvolution.emittedAt)],
          amountWeight: rawEvolution.amountWeight,
          entryValue: rawEvolution.entryValue,
          period: name,
          representativity: 0
        })
      )
    }

    return result
  }

  async findPerEvolutionInvoices(
    date: Date,
    options: Options
  ): Promise<PurchaseResumeInvoice[]> {
    const { buyers = [], providers = [], periodFrom, periodTo } = options

    let baseParams = `
    AND PCNFENT.DTENT BETWEEN TO_DATE('${formatDate(
      normalizeDate(periodFrom)
    )}', 'DD/MM/YYYY') AND TO_DATE('${formatDate(
      normalizeDate(periodTo)
    )}', 'DD/MM/YYYY')
    `

    if (buyers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(buyers, 'PCFORNEC.CODCOMPRADOR')}`
    }

    if (providers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(providers, 'PCFORNEC.CODFORNEC')}`
    }

    switch (options.situation) {
      case 'all':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('1', '5', 'I') AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
      case 'normal':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('1') AND NVL(PCMOV.CODOPER, 'X') in ('E')"
        break
      case 'bonification':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('5') AND NVL(PCMOV.CODOPER, 'X') in ('EB')"
        break
      case 'importation':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('I') AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
    }

    const response = await winthor.raw<RawPurchaseResumeInvoice[]>(`
      SELECT PCNFENT.NUMNOTA AS "number",
        PCNFENT.CODFORNEC AS "providerCode",
        PCFORNEC.FORNECEDOR AS "providerName",
        PCFORNEC.FANTASIA AS "providerFantasy",
        PCFORNEC.CODFORNECPRINC AS "providerPrincipalCode",
        PCFORNEC.CGC AS "providerCNPJ",
        NVL((SELECT SUM((PCLANC.DTVENC - PCLANC.DTEMISSAO) * GREATEST(PCLANC.VALOR, 0)) / DECODE(SUM(NVL(GREATEST(PCLANC.VALOR, 0), 0)), 0, 1, SUM(NVL(GREATEST(PCLANC.VALOR, 0), 0)))
            FROM PCLANC
            WHERE PCLANC.NUMTRANSENT = PCNFENT.NUMTRANSENT), 0) AS "averageTime",
        SUM(NVL(PCMOV.QT, 0) * NVL(PCMOV.PUNIT, 0)) AS "entryValue",
            SUM(NVL(PCMOV.QT, 0) * NVL(PCPRODUT.PESOBRUTO, 0)) AS "amountWeight"
      FROM PCMOV,
        PCNFENT,
        PCPRODUT,
        PCDEPTO,
        PCEMPR,
        PCFORNEC
      WHERE PCMOV.NUMTRANSENT = PCNFENT.NUMTRANSENT
        AND PCFORNEC.CODFORNEC = PCNFENT.CODFORNEC
        AND PCFORNEC.CODCOMPRADOR = PCEMPR.MATRICULA (+)
        ${baseParams}
        AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')
        AND (PCMOV.CODPROD = PCPRODUT.CODPROD)
        AND (PCPRODUT.CODEPTO = PCDEPTO.CODEPTO)
        AND PCMOV.DTCANCEL IS NULL
        AND PCNFENT.CODCONT = (SELECT CODCONTFOR FROM PCCONSUM)
        AND PCNFENT.CODFILIAL = 1
        AND PCDEPTO.TIPOMERC NOT IN ('CI', 'IM')
        AND PCNFENT.DTENT = TO_DATE('${formatDate(
          normalizeDate(date)
        )}', 'dd/MM/yyyy')
      GROUP BY PCNFENT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CODFORNECPRINC, PCFORNEC.CGC, PCNFENT.NUMNOTA, PCNFENT.NUMTRANSENT, PCNFENT.DTEMISSAO
      ORDER BY "entryValue" DESC
      `)

    return response.map(invoice => ({
      number: invoice.number,
      provider: {
        code: invoice.providerCode,
        name: invoice.providerName,
        fantasy: invoice.providerFantasy,
        principalCode: invoice.providerPrincipalCode,
        cnpj: invoice.providerCNPJ
      },
      amountWeight: invoice.amountWeight,
      averageTime: invoice.averageTime,
      entryValue: invoice.entryValue
    }))
  }

  async findPerUF(options: Options): Promise<UFPurchaseResume[]> {
    const result: UFPurchaseResume[] = []

    const { buyers = [], providers = [], periodFrom, periodTo } = options

    let baseParams = ''

    const intervals = generateDateIntervals(
      normalizeDate(periodFrom),
      normalizeDate(periodTo)
    )

    if (buyers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(buyers, 'PCFORNEC.CODCOMPRADOR')}`
    }

    if (providers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(providers, 'PCFORNEC.CODFORNEC')}`
    }

    switch (options.situation) {
      case 'all':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('1', '5', 'I') AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
      case 'normal':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('1') AND NVL(PCMOV.CODOPER, 'X') in ('E')"
        break
      case 'bonification':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('5') AND NVL(PCMOV.CODOPER, 'X') in ('EB')"
        break
      case 'importation':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('I') AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
    }

    for (let i = 0; i < intervals.length; i++) {
      const { fromFormated, toFormated, name } = intervals[i]

      const params = `${baseParams}
        AND PCNFENT.DTENT BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY')
        AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
      `

      const response = await winthor.raw<RawUFPurchaseResume[]>(`
        SELECT PCFORNEC.ESTADO AS "uf",
          COUNT(DISTINCT (PCNFENT.NUMTRANSENT)) AS "invoiceCount",
          SUM(NVL(PCMOV.QT, 0) * NVL(PCMOV.PUNIT, 0)) AS "entryValue",
          SUM(NVL(PCMOV.QT, 0) * NVL(PCPRODUT.PESOBRUTO, 0)) AS "amountWeight"
        FROM PCMOV,
          PCNFENT,
          PCPRODUT,
          PCDEPTO,
          PCEMPR,
          PCFORNEC
        WHERE PCMOV.NUMTRANSENT = PCNFENT.NUMTRANSENT
          AND PCFORNEC.CODFORNEC = PCNFENT.CODFORNEC
          AND PCFORNEC.CODCOMPRADOR = PCEMPR.MATRICULA (+)
          ${params}
          AND (PCMOV.CODPROD = PCPRODUT.CODPROD)
          AND (PCPRODUT.CODEPTO = PCDEPTO.CODEPTO)
          AND PCMOV.DTCANCEL IS NULL
          AND PCNFENT.CODCONT = (SELECT CODCONTFOR FROM PCCONSUM)
          AND PCNFENT.CODFILIAL = 1
          AND PCDEPTO.TIPOMERC NOT IN ('CI', 'IM')
        GROUP BY PCFORNEC.ESTADO
        ORDER BY "entryValue" DESC
      `)

      response.forEach(rawUF =>
        result.push({
          uf: rawUF.uf,
          invoiceCount: rawUF.invoiceCount,
          amountWeight: rawUF.amountWeight,
          entryValue: rawUF.entryValue,
          period: name,
          representativity: 0
        })
      )
    }

    return result
  }

  async findPerUFInvoices(
    uf: string,
    options: Options
  ): Promise<PurchaseResumeInvoice[]> {
    const { buyers = [], providers = [], periodFrom, periodTo } = options

    let baseParams = `
    AND PCNFENT.DTENT BETWEEN TO_DATE('${formatDate(
      normalizeDate(periodFrom)
    )}', 'DD/MM/YYYY') AND TO_DATE('${formatDate(
      normalizeDate(periodTo)
    )}', 'DD/MM/YYYY')
    `

    if (buyers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(buyers, 'PCFORNEC.CODCOMPRADOR')}`
    }

    if (providers.length !== 0) {
      baseParams += ` AND ${this.formatCodes(providers, 'PCFORNEC.CODFORNEC')}`
    }

    switch (options.situation) {
      case 'all':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('1', '5', 'I') AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
      case 'normal':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('1') AND NVL(PCMOV.CODOPER, 'X') in ('E')"
        break
      case 'bonification':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('5') AND NVL(PCMOV.CODOPER, 'X') in ('EB')"
        break
      case 'importation':
        baseParams +=
          " AND PCNFENT.TIPODESCARGA IN ('I') AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')"
        break
    }

    const response = await winthor.raw<RawPurchaseResumeInvoice[]>(`
      SELECT PCNFENT.NUMNOTA AS "number",
        PCNFENT.CODFORNEC AS "providerCode",
        PCFORNEC.FORNECEDOR AS "providerName",
        PCFORNEC.FANTASIA AS "providerFantasy",
        PCFORNEC.CODFORNECPRINC AS "providerPrincipalCode",
        PCFORNEC.CGC AS "providerCNPJ",
        NVL((SELECT SUM((PCLANC.DTVENC - PCLANC.DTEMISSAO) * GREATEST(PCLANC.VALOR, 0)) / DECODE(SUM(NVL(GREATEST(PCLANC.VALOR, 0), 0)), 0, 1, SUM(NVL(GREATEST(PCLANC.VALOR, 0), 0)))
            FROM PCLANC
            WHERE PCLANC.NUMTRANSENT = PCNFENT.NUMTRANSENT), 0) AS "averageTime",
        SUM(NVL(PCMOV.QT, 0) * NVL(PCMOV.PUNIT, 0)) AS "entryValue",
            SUM(NVL(PCMOV.QT, 0) * NVL(PCPRODUT.PESOBRUTO, 0)) AS "amountWeight"
      FROM PCMOV,
        PCNFENT,
        PCPRODUT,
        PCDEPTO,
        PCEMPR,
        PCFORNEC
      WHERE PCMOV.NUMTRANSENT = PCNFENT.NUMTRANSENT
        AND PCFORNEC.CODFORNEC = PCNFENT.CODFORNEC
        AND PCFORNEC.CODCOMPRADOR = PCEMPR.MATRICULA (+)
        ${baseParams}
        AND NVL(PCMOV.CODOPER, 'X') in ('E', 'EB')
        AND (PCMOV.CODPROD = PCPRODUT.CODPROD)
        AND (PCPRODUT.CODEPTO = PCDEPTO.CODEPTO)
        AND PCMOV.DTCANCEL IS NULL
        AND PCNFENT.CODCONT = (SELECT CODCONTFOR FROM PCCONSUM)
        AND PCNFENT.CODFILIAL = 1
        AND PCDEPTO.TIPOMERC NOT IN ('CI', 'IM')
        AND PCFORNEC.ESTADO = '${uf}'
      GROUP BY PCNFENT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CODFORNECPRINC, PCFORNEC.CGC, PCNFENT.NUMNOTA, PCNFENT.NUMTRANSENT, PCNFENT.DTEMISSAO
      ORDER BY "entryValue" DESC
      `)

    return response.map(invoice => ({
      number: invoice.number,
      provider: {
        code: invoice.providerCode,
        name: invoice.providerName,
        fantasy: invoice.providerFantasy,
        principalCode: invoice.providerPrincipalCode,
        cnpj: invoice.providerCNPJ
      },
      amountWeight: invoice.amountWeight,
      averageTime: invoice.averageTime,
      entryValue: invoice.entryValue
    }))
  }

  private formatCodes(codes: number[], field: string): string {
    return `(${codes.map(code => `${code} = ${field}`).join(' OR ')})`
  }
}
