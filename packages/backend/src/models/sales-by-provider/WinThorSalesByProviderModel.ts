import { getYear } from 'date-fns'

import {
  IClientSales,
  IActivityBranchSales,
  ICategoryProductSales,
  ICategorySales,
  IClientLitigationSales,
  IClientSalesValueSales,
  IProductProviderSales,
  IProductSalesCountSales,
  IProductSalesValueSales,
  IProviderGoalSales,
  IProviderLitigationSales,
  IRCASales,
  IRCASalesValueSales,
  IRegionSales,
  IRouteSales,
  ISquareClientProductSales,
  ISquareSales,
  ISupervisorRCASales,
  ISupervisorSales
} from '~/domain/ISalesByProvider'
import { winthor } from '~/libraries/WinThor'
import { generateDateIntervals } from '~/utilities/date'
import { normalizeDate } from '~/utilities/normalizations'

import { ISalesByProviderModel, IOptions } from './ISalesByProviderModel'

interface IProviderData {
  providerCode: number
  providerName: string
  providerFantasy: string
  providerCNPJ: string
  providerPrincipalCode: number
}

type IRawClientSales = Omit<IClientSales, 'client' | 'provider'> &
  IProviderData & {
    clientCode: number
    clientName: string
  }

type IRawActivityBranchSales = Omit<
  IActivityBranchSales,
  'branch' | 'provider'
> &
  IProviderData & {
    branchCode: number
    branchName: string
  }

type IRawRegionSales = Omit<IRegionSales, 'region' | 'provider'> &
  IProviderData & {
    regionCode: number
    regionName: string
  }

type IRawSquareSales = Omit<ISquareSales, 'square' | 'provider'> &
  IProviderData & {
    squareCode: number
    squareName: string
  }

type IRawRouteSales = Omit<IRouteSales, 'route' | 'provider'> &
  IProviderData & {
    routeCode: number
    routeName: string
  }

type IRawSupervisorSales = Omit<ISupervisorSales, 'supervisor' | 'provider'> &
  IProviderData & {
    supervisorCode: number
    supervisorName: string
  }

type IRawSupervisorRCASales = Omit<
  ISupervisorRCASales,
  'supervisor' | 'rca' | 'provider'
> &
  IProviderData & {
    supervisorCode: number
    supervisorName: string
    rcaCode: number
    rcaName: string
  }

type IRawRCASales = Omit<IRCASales, 'rca' | 'provider'> &
  IProviderData & {
    rcaCode: number
    rcaName: string
  }

type IRawProductProviderSales = Omit<
  IProductProviderSales,
  'product' | 'provider'
> &
  IProviderData & {
    productCode: number
    productDescription: string
    productPacking: string
    productUnity: string
    productFactoryCode: string
  }

type IRawCategorySales = Omit<ICategorySales, 'category' | 'provider'> &
  IProviderData & {
    categoryCode: number
    categoryName: string
  }

type IRawCategoryProductSales = Omit<
  ICategoryProductSales,
  'category' | 'product' | 'provider'
> &
  IProviderData & {
    categoryCode: number
    categoryName: string
    productCode: number
    productDescription: string
  }

type IRawClientSalesValueSales = Omit<
  IClientSalesValueSales,
  'client' | 'provider'
> &
  IProviderData & {
    clientCode: number
    clientName: string
  }

type IRawProductSalesCountSales = Omit<
  IProductSalesCountSales,
  'product' | 'provider'
> &
  IProviderData & {
    productCode: number
    productDescription: string
  }

type IRawProductSalesValueSales = Omit<
  IProductSalesValueSales,
  'product' | 'provider'
> &
  IProviderData & {
    productCode: number
    productDescription: string
  }

type IRawSquareClientProductSales = Omit<
  ISquareClientProductSales,
  'product' | 'square' | 'client' | 'provider'
> &
  IProviderData & {
    clientCode: number
    clientName: string
    squareCode: number
    squareName: string
    productCode: number
    productDescription: string
  }

type IRawClientLitigationSales = Omit<
  IClientLitigationSales,
  'client' | 'provider'
> &
  IProviderData & {
    clientCode: number
    clientName: string
  }

type IRawProviderGoalSales = Omit<IProviderGoalSales, 'buyer' | 'provider'> &
  IProviderData & {
    buyerCode: number
    buyerName: string
  }

type IRawProviderLitigationSales = IProviderLitigationSales & IProviderData

type IRawRCASalesValueSales = Omit<IRCASalesValueSales, 'rca' | 'provider'> &
  IProviderData & {
    rcaCode: number
    rcaName: string
  }

export function createSalesByProviderModel(): ISalesByProviderModel {
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
    const {
      buyers = [],
      providers = [],
      departments = [],
      regions = [],
      clients = [],
      principalClients = [],
      supervisors = [],
      rcas = [],
      distribuitions = [],
      sections = [],
      squares = [],
      activityBranchs = [],
      clientWebs = []
    } = options

    let params = ''

    if (buyers.length > 0) {
      params += generateCodeFilter(buyers, 'CODCOMPRADOR')
    }

    if (providers.length > 0) {
      params += generateCodeFilter(providers, 'PCPRODUT.CODFORNEC')
    }

    if (departments.length > 0) {
      params += generateCodeFilter(departments, 'CODDEPTO')
    }

    if (regions.length > 0) {
      params += generateCodeFilter(regions, 'PCPRACA.NUMREGIAO')
    }

    if (clients.length > 0) {
      params += generateCodeFilter(clients, 'PCCLIENT.CODCLI')
    }

    if (principalClients.length > 0) {
      params += generateCodeFilter(principalClients, 'PCCLIENT.CODCLI')
    }

    if (supervisors.length > 0) {
      params += generateCodeFilter(supervisors, 'PCPEDC.CODSUPERVISOR')
    }

    if (rcas.length > 0) {
      params += generateCodeFilter(rcas, 'PCUSUARI.CODUSUR')
    }

    if (distribuitions.length > 0) {
      params += generateCodeFilter(distribuitions, 'PCPRODUT.CODDISTRIB')
    }

    if (sections.length > 0) {
      params += generateCodeFilter(sections, 'CODSEC')
    }

    if (squares.length > 0) {
      params += generateCodeFilter(squares, 'PCPRACA.CODPRACA')
    }

    if (activityBranchs.length > 0) {
      params += generateCodeFilter(activityBranchs, 'CODATV1')
    }

    if (clientWebs.length > 0) {
      params += generateCodeFilter(clientWebs, 'CODREDE')
    }

    return params
  }

  return {
    async findPerClient(options: IOptions): Promise<IClientSales[]> {
      let result: IClientSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawClientSales[]>(`
          SELECT SUM(QT)   AS "count",
            SUM(PVENDA)    AS "salesValue",
            SUM(PTABELA)   AS "tableValue",
            SUM(TOTPESO)   AS "amountWeight",
            SUM(QTMIX)     AS "mixCount",
            CODCLI         AS "clientCode",
            CLIENTE        AS "clientName",
            CODFORNEC      AS "providerCode",
            FORNECEDOR     AS "providerName",
            FANTASIA       AS "providerFantasy",
            CGC            AS "providerCNPJ",
            CODFORNECPRINC AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
                  PCFORNEC.FORNECEDOR,
                  PCFORNEC.FANTASIA,
                  PCFORNEC.CGC,
                  PCFORNEC.CODFORNECPRINC,
                  PCPEDI.CODCLI,
                  PCCLIENT.CLIENTE,
                  SUM(NVL(PCPEDI.QT, 0)) QT,
                  SUM(ROUND(NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0)), 2)) PVENDA,
                  SUM(NVL(PCPEDI.QT, 0) * NVL(PCPEDI.PTABELA, 0)) PTABELA,
                  SUM(NVL(PCPRODUT.PESOBRUTO, 0) * NVL(PCPEDI.QT, 0)) TOTPESO,
                  COUNT(DISTINCT (PCPEDI.CODPROD)) QTMIX
                FROM PCPEDC, PCPEDI, PCCLIENT, PCPRODUT, PCUSUARI, PCFORNEC, PCSUPERV, PCPRACA, PCDEPTO
                WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
                  AND PCPEDC.NUMPED = PCPEDI.NUMPED
                  AND PCPEDC.CODCLI = PCCLIENT.CODCLI
                  AND PCPRACA.CODPRACA = PCCLIENT.CODPRACA
                  AND PCPEDI.CODPROD = PCPRODUT.CODPROD
                  AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
                  AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
                  AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
                  AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
                  AND PCPEDC.DTCANCEL IS NULL
                  AND (PCPEDC.CODFILIAL IS NOT NULL)
                  AND (PCPEDC.CODFILIAL IN ('1'))
                  AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
                  ${params}
                GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCPEDI.CODCLI, PCCLIENT.CLIENTE, PCPEDC.DATA
                ORDER BY PCCLIENT.CLIENTE, PCFORNEC.FORNECEDOR)
          GROUP BY CODCLI, CLIENTE, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY CLIENTE, FORNECEDOR
        `)

        result = result.concat(
          response.map<IClientSales>(curr => ({
            client: {
              code: curr.clientCode,
              name: curr.clientName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            amountWeight: curr.amountWeight,
            count: curr.count,
            mixCount: curr.mixCount,
            salesValue: curr.salesValue,
            tableValue: curr.tableValue
          }))
        )
      }

      return result
    },

    async findPerActivityBranch(
      options: IOptions
    ): Promise<IActivityBranchSales[]> {
      let result: IActivityBranchSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawActivityBranchSales[]>(`
          SELECT SUM(QT)   AS "count",
            SUM(PVENDA)    AS "salesValue",
            SUM(TOTPESO)   AS "amountWeight",
            SUM(QTMIX)     AS "mixCount",
            SUM(QTCLIPOS)  AS "positivedClientCount",
            CODATV1        AS "branchCode",
            RAMO           AS "branchName",
            CODFORNEC      AS "providerCode",
            FORNECEDOR     AS "providerName",
            FANTASIA       AS "providerFantasy",
            CGC            AS "providerCNPJ",
            CODFORNECPRINC AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
                  PCFORNEC.FORNECEDOR,
                  PCFORNEC.FANTASIA,
                  PCFORNEC.CGC,
                  PCFORNEC.CODFORNECPRINC,
                  PCCLIENT.CODATV1,
                  PCATIVI.RAMO,
                  SUM(NVL(PCPEDI.QT, 0)) QT,
                  SUM(ROUND(NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0)), 2)) PVENDA,
                  SUM(NVL(PCPRODUT.PESOBRUTO, 0) * NVL(PCPEDI.QT, 0)) TOTPESO,
                  COUNT(DISTINCT (PCPEDI.CODPROD)) QTMIX,
                  COUNT(DISTINCT (PCPEDC.CODCLI)) QTCLIPOS
                FROM PCPEDC, PCPEDI, PCCLIENT, PCATIVI, PCPRODUT, PCUSUARI, PCFORNEC, PCSUPERV, PCPRACA, PCDEPTO
                WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
                  AND PCPEDC.NUMPED = PCPEDI.NUMPED
                  AND PCPEDC.CODCLI = PCCLIENT.CODCLI
                  AND PCPEDI.CODPROD = PCPRODUT.CODPROD
                  AND PCCLIENT.CODATV1 = PCATIVI.CODATIV
                  AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
                  AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
                  AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
                  AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
                  AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
                  AND PCPEDC.DTCANCEL IS NULL
                  AND (PCPEDC.CODFILIAL IS NOT NULL)
                  AND (PCPEDC.CODFILIAL IN ('1'))
                  AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
                  ${params}
                GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCCLIENT.CODATV1, PCATIVI.RAMO, PCPEDC.DATA
                ORDER BY PCFORNEC.FORNECEDOR, RAMO)
          GROUP BY CODATV1, RAMO, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY RAMO, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            branch: {
              code: curr.branchCode,
              name: curr.branchName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            amountWeight: curr.amountWeight,
            count: curr.count,
            mixCount: curr.mixCount,
            positivedClientCount: curr.positivedClientCount,
            salesValue: curr.salesValue
          }))
        )
      }

      return result
    },

    async findPerRegion(options: IOptions): Promise<IRegionSales[]> {
      let result: IRegionSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawRegionSales[]>(`
          SELECT SUM(QT)   AS "count",
            SUM(PVENDA)    AS "salesValue",
            SUM(TOTPESO)   AS "amountWeight",
            SUM(QTMIX)     AS "mixCount",
            SUM(QTCLIPOS)  AS "positivedClientCount",
            NUMREGIAO      AS "regionCode",
            REGIAO         AS "regionName",
            CODFORNEC      AS "providerCode",
            FORNECEDOR     AS "providerName",
            FANTASIA       AS "providerFantasy",
            CGC            AS "providerCNPJ",
            CODFORNECPRINC AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
                  PCFORNEC.FORNECEDOR,
                  PCFORNEC.FANTASIA,
                  PCFORNEC.CGC,
                  PCFORNEC.CODFORNECPRINC,
                  PCREGIAO.NUMREGIAO,
                  PCREGIAO.REGIAO,
                  SUM(NVL(PCPEDI.QT, 0)) QT,
                  SUM(ROUND(NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0)), 2)) PVENDA,
                  SUM(NVL(PCPRODUT.PESOBRUTO, 0) * NVL(PCPEDI.QT, 0)) TOTPESO,
                  COUNT(DISTINCT (PCPEDI.CODPROD)) QTMIX,
                  COUNT(DISTINCT (PCPEDC.CODCLI)) QTCLIPOS
                FROM PCPEDC, PCPEDI, PCCLIENT, PCPRACA, PCPRODUT, PCDEPTO, PCREGIAO, PCUSUARI, PCFORNEC, PCSUPERV
                WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
                  AND PCPEDC.NUMPED = PCPEDI.NUMPED
                  AND PCPEDC.CODCLI = PCCLIENT.CODCLI
                  AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
                  AND PCPEDI.CODPROD = PCPRODUT.CODPROD
                  AND PCPRACA.NUMREGIAO = PCREGIAO.NUMREGIAO
                  AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
                  AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
                  AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
                  AND PCPEDC.DTCANCEL IS NULL
                  AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
                  AND (PCPEDC.CODFILIAL IS NOT NULL)
                  AND (PCPEDC.CODFILIAL IN ('1'))
                  AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
                  ${params}
                GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCREGIAO.NUMREGIAO, PCREGIAO.REGIAO, PCPEDC.DATA
                ORDER BY PCFORNEC.FORNECEDOR, REGIAO)
          GROUP BY NUMREGIAO, REGIAO, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY REGIAO, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            region: {
              code: curr.regionCode,
              name: curr.regionName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            amountWeight: curr.amountWeight,
            count: curr.count,
            mixCount: curr.mixCount,
            positivedClientCount: curr.positivedClientCount,
            salesValue: curr.salesValue
          }))
        )
      }

      return result
    },

    async findPerSquare(options: IOptions): Promise<ISquareSales[]> {
      let result: ISquareSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawSquareSales[]>(`
          SELECT SUM(QT)   AS "count",
            SUM(PVENDA)    AS "salesValue",
            SUM(TOTPESO)   AS "amountWeight",
            SUM(QTMIX)     AS "mixCount",
            SUM(QTCLIPOS)  AS "positivedClientCount",
            CODPRACA       AS "squareCode",
            PRACA          AS "squareName",
            CODFORNEC      AS "providerCode",
            FORNECEDOR     AS "providerName",
            FANTASIA       AS "providerFantasy",
            CGC            AS "providerCNPJ",
            CODFORNECPRINC AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
                  PCFORNEC.FORNECEDOR,
                  PCFORNEC.FANTASIA,
                  PCFORNEC.CGC,
                  PCFORNEC.CODFORNECPRINC,
                  PCPRACA.CODPRACA,
                  PCPRACA.PRACA,
                  SUM(NVL(PCPEDI.QT, 0))                              QT,
                  SUM(ROUND(NVL(PCPEDI.QT, 0) *
                            (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0)),
                            2))                                       PVENDA,
                  SUM(NVL(PCPRODUT.PESOBRUTO, 0) * NVL(PCPEDI.QT, 0)) TOTPESO,
                  COUNT(DISTINCT (PCPEDI.CODPROD))                    QTMIX,
                  COUNT(DISTINCT (PCPEDC.CODCLI))                     QTCLIPOS
                FROM PCPEDC,
                      PCPEDI,
                      PCCLIENT,
                      PCPRACA,
                      PCPRODUT,
                      PCUSUARI,
                      PCFORNEC,
                      PCSUPERV,
                      PCDEPTO
                WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
                  AND PCPEDC.NUMPED = PCPEDI.NUMPED
                  AND PCPEDC.CODCLI = PCCLIENT.CODCLI
                  AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
                  AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
                  AND PCPEDI.CODPROD = PCPRODUT.CODPROD
                  AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
                  AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
                  AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
                  AND PCPEDC.DTCANCEL IS NULL
                  AND (PCPEDC.CODFILIAL IS NOT NULL)
                  AND (PCPEDC.CODFILIAL IN ('1'))
                  AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
                  ${params}
                GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCPRACA.CODPRACA, PCPRACA.PRACA, PCPEDC.DATA ORDER BY PCFORNEC.FORNECEDOR, PRACA)
          GROUP BY CODPRACA, PRACA, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY PRACA, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            square: {
              code: curr.squareCode,
              name: curr.squareName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            amountWeight: curr.amountWeight,
            count: curr.count,
            mixCount: curr.mixCount,
            positivedClientCount: curr.positivedClientCount,
            salesValue: curr.salesValue
          }))
        )
      }

      return result
    },

    async findPerRoute(options: IOptions): Promise<IRouteSales[]> {
      let result: IRouteSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawRouteSales[]>(`
          SELECT SUM(QT)   AS "count",
            SUM(PVENDA)    AS "salesValue",
            SUM(TOTPESO)   AS "amountWeight",
            SUM(QTMIX)     AS "mixCount",
            SUM(QTCLIPOS)  AS "positivedClientCount",
            CODROTA        AS "routeCode",
            ROTA           AS "routeName",
            CODFORNEC      AS "providerCode",
            FORNECEDOR     AS "providerName",
            FANTASIA       AS "providerFantasy",
            CGC            AS "providerCNPJ",
            CODFORNECPRINC AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
                  PCFORNEC.FORNECEDOR,
                  PCFORNEC.FANTASIA,
                  PCFORNEC.CGC,
                  PCFORNEC.CODFORNECPRINC,
                  PCROTAEXP.CODROTA,
                  PCROTAEXP.DESCRICAO AS ROTA,
                  SUM(NVL(PCPEDI.QT, 0)) QT,
                  SUM(ROUND(NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0)), 2)) PVENDA,
                  SUM(NVL(PCPRODUT.PESOBRUTO, 0) * NVL(PCPEDI.QT, 0)) TOTPESO,
                  COUNT(DISTINCT (PCPEDI.CODPROD)) QTMIX,
                  COUNT(DISTINCT (PCPEDC.CODCLI)) QTCLIPOS
                FROM PCPEDC, PCPEDI, PCCLIENT, PCPRACA, PCPRODUT, PCUSUARI, PCFORNEC, PCSUPERV, PCROTAEXP, PCDEPTO
                WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
                  AND PCPEDC.NUMPED = PCPEDI.NUMPED
                  AND PCPEDC.CODCLI = PCCLIENT.CODCLI
                  AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
                  AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
                  AND PCPRACA.ROTA = PCROTAEXP.CODROTA
                  AND PCPEDI.CODPROD = PCPRODUT.CODPROD
                  AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
                  AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
                  AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
                  AND PCPEDC.DTCANCEL IS NULL
                  AND (PCPEDC.CODFILIAL IS NOT NULL)
                  AND (PCPEDC.CODFILIAL IN ('1'))
                  AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
                  ${params}
                GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCROTAEXP.CODROTA, PCROTAEXP.DESCRICAO, PCPEDC.DATA
                ORDER BY PCFORNEC.FORNECEDOR, PCROTAEXP.DESCRICAO)
          GROUP BY CODROTA, ROTA, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY ROTA, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            route: {
              code: curr.routeCode,
              name: curr.routeName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            amountWeight: curr.amountWeight,
            count: curr.count,
            mixCount: curr.mixCount,
            positivedClientCount: curr.positivedClientCount,
            salesValue: curr.salesValue
          }))
        )
      }

      return result
    },

    async findPerSupervisor(options: IOptions): Promise<ISupervisorSales[]> {
      let result: ISupervisorSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawSupervisorSales[]>(`
          SELECT SUM(QT)   AS "count",
            SUM(PVENDA)    AS "salesValue",
            SUM(PTABELA)   AS "tableValue",
            SUM(TOTPESO)   AS "amountWeight",
            SUM(QTMIX)     AS "mixCount",
            SUM(QTCLIPOS)  AS "positivedClientCount",
            CODSUPERVISOR  AS "supervisorCode",
            NOME           AS "supervisorName",
            CODFORNEC      AS "providerCode",
            FORNECEDOR     AS "providerName",
            FANTASIA       AS "providerFantasy",
            CGC            AS "providerCNPJ",
            CODFORNECPRINC AS "providerPrincipalCode"
          FROM (SELECT DISTINCT PCPRODUT.CODFORNEC,
                  PCFORNEC.FORNECEDOR,
                  PCFORNEC.FANTASIA,
                  PCFORNEC.CGC,
                  PCFORNEC.CODFORNECPRINC,
                  PCSUPERV.CODSUPERVISOR,
                  PCSUPERV.NOME,
                  SUM(NVL(PCPEDI.QT, 0)) QT,
                  SUM(ROUND(NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0)), 2)) PVENDA,
                  SUM(NVL(PCPEDI.QT, 0) * NVL(PCPEDI.PTABELA, 0)) PTABELA,
                  SUM(NVL(PCPRODUT.PESOBRUTO, 0) * NVL(PCPEDI.QT, 0)) TOTPESO,
                  COUNT(DISTINCT (PCPEDI.CODPROD)) QTMIX,
                  COUNT(DISTINCT (PCPEDC.CODCLI)) QTCLIPOS,
                  PCPEDC.DATA
                FROM PCPEDI, PCPEDC, PCPRODUT, PCFORNEC, PCDEPTO, PCCLIENT, PCUSUARI, PCSUPERV, PCATIVI, PCPRACA, PCCIDADE
                WHERE PCPEDI.NUMPED = PCPEDC.NUMPED
                  AND PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
                  AND PCCLIENT.CODCIDADE = PCCIDADE.CODCIDADE (+)
                  AND PCPEDC.CODCLI = PCCLIENT.CODCLI
                  AND PCCLIENT.CODATV1 = PCATIVI.CODATIV (+)
                  AND PCPEDC.DTCANCEL IS NULL
                  AND PCPEDI.CODPROD = PCPRODUT.CODPROD
                  AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
                  AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
                  AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
                  AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
                  AND PCPEDC.CODPRACA = PCPRACA.CODPRACA
                  AND (PCPEDC.CODFILIAL IS NOT NULL)
                  AND (PCPEDC.CODFILIAL IN ('1'))
                  AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
                  ${params}
                GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCSUPERV.CODSUPERVISOR, PCSUPERV.NOME, PCPEDC.DATA
                ORDER BY PCFORNEC.FORNECEDOR, PCSUPERV.NOME)
          GROUP BY CODSUPERVISOR, NOME, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY NOME, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            supervisor: {
              code: curr.supervisorCode,
              name: curr.supervisorName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            amountWeight: curr.amountWeight,
            tableValue: curr.tableValue,
            count: curr.count,
            mixCount: curr.mixCount,
            positivedClientCount: curr.positivedClientCount,
            salesValue: curr.salesValue
          }))
        )
      }

      return result
    },

    async findPerSupervisorRCA(
      options: IOptions
    ): Promise<ISupervisorRCASales[]> {
      let result: ISupervisorRCASales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawSupervisorRCASales[]>(`
          SELECT SUM(QT)   AS "count",
            SUM(PVENDA)    AS "salesValue",
            SUM(PTABELA)   AS "tableValue",
            SUM(TOTPESO)   AS "amountWeight",
            SUM(QTMIX)     AS "mixCount",
            SUM(QTCLIPOS)  AS "positivedClientCount",
            CODSUPERVISOR  AS "supervisorCode",
            NOME           AS "supervisorName",
            CODUSUR        AS "rcaCode",
            RCA            AS "rcaName",
            CODFORNEC      AS "providerCode",
            FORNECEDOR     AS "providerName",
            FANTASIA       AS "providerFantasy",
            CGC            AS "providerCNPJ",
            CODFORNECPRINC AS "providerPrincipalCode"
          FROM (SELECT DISTINCT PCPRODUT.CODFORNEC,
                  PCFORNEC.FORNECEDOR,
                  PCFORNEC.FANTASIA,
                  PCFORNEC.CGC,
                  PCFORNEC.CODFORNECPRINC,
                  PCSUPERV.CODSUPERVISOR,
                  PCSUPERV.NOME,
                  PCUSUARI.CODUSUR,
                  PCUSUARI.NOME AS RCA,
                  SUM(NVL(PCPEDI.QT, 0)) QT,
                  SUM(ROUND(NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0)), 2)) PVENDA,
                  SUM(NVL(PCPEDI.QT, 0) * NVL(PCPEDI.PTABELA, 0)) PTABELA,
                  SUM(NVL(PCPRODUT.PESOBRUTO, 0) * NVL(PCPEDI.QT, 0)) TOTPESO,
                  COUNT(DISTINCT (PCPEDI.CODPROD)) QTMIX,
                  COUNT(DISTINCT (PCPEDC.CODCLI)) QTCLIPOS,
                  PCPEDC.DATA
                FROM PCPEDC, PCPEDI, PCUSUARI, PCSUPERV, PCPRODUT, PCFORNEC, PCCLIENT, PCPRACA, PCDEPTO
                WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
                  AND PCPEDC.NUMPED = PCPEDI.NUMPED
                  AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
                  AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
                  AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
                  AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
                  AND PCPEDI.CODPROD = PCPRODUT.CODPROD
                  AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
                  AND PCPEDC.CODCLI = PCCLIENT.CODCLI
                  AND PCPEDC.DTCANCEL IS NULL
                  AND (PCPEDC.CODFILIAL IS NOT NULL)
                  AND (PCPEDC.CODFILIAL IN ('1'))
                  AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
                  ${params}
                GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCSUPERV.CODSUPERVISOR, PCSUPERV.NOME, PCUSUARI.CODUSUR, PCUSUARI.NOME, PCPEDC.DATA)
          GROUP BY CODSUPERVISOR, NOME, CODUSUR, RCA, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY NOME, RCA, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            supervisor: {
              code: curr.supervisorCode,
              name: curr.supervisorName
            },
            rca: {
              code: curr.rcaCode,
              name: curr.rcaName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            amountWeight: curr.amountWeight,
            tableValue: curr.tableValue,
            count: curr.count,
            mixCount: curr.mixCount,
            positivedClientCount: curr.positivedClientCount,
            salesValue: curr.salesValue
          }))
        )
      }

      return result
    },

    async findPerRCA(options: IOptions): Promise<IRCASales[]> {
      let result: IRCASales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawRCASales[]>(`
          SELECT SUM(QT)   AS "count",
            SUM(PVENDA)    AS "salesValue",
            SUM(PTABELA)   AS "tableValue",
            SUM(TOTPESO)   AS "amountWeight",
            SUM(QTMIX)     AS "mixCount",
            SUM(QTCLIPOS)  AS "positivedClientCount",
            CODUSUR        AS "rcaCode",
            NOME           AS "rcaName",
            CODFORNEC      AS "providerCode",
            FORNECEDOR     AS "providerName",
            FANTASIA       AS "providerFantasy",
            CGC            AS "providerCNPJ",
            CODFORNECPRINC AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
                  PCFORNEC.FORNECEDOR,
                  PCFORNEC.FANTASIA,
                  PCFORNEC.CGC,
                  PCFORNEC.CODFORNECPRINC,
                  PCPEDC.CODUSUR,
                  PCUSUARI.NOME,
                  SUM(PCPEDI.QT) AS QT,
                  SUM(ROUND(NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0)), 2)) PVENDA,
                  SUM(NVL(PCPEDI.QT, 0) * NVL(PCPEDI.PTABELA, 0)) PTABELA,
                  SUM(PCPRODUT.PESOBRUTO * PCPEDI.QT) TOTPESO,
                  COUNT(DISTINCT (PCPEDI.CODPROD)) QTMIX,
                  COUNT(DISTINCT (PCPEDC.CODCLI)) QTCLIPOS
            FROM PCPEDC, PCPEDI, PCPRODUT, PCFORNEC, PCUSUARI, PCSUPERV, PCCLIENT, PCPRACA, PCDEPTO
            WHERE PCPEDC.NUMPED = PCPEDI.NUMPED
              AND PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
              AND PCPEDI.CODPROD = PCPRODUT.CODPROD
              AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
              AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
              AND PCPEDC.CODCLI = PCCLIENT.CODCLI
              AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
              AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
              AND PCPEDC.DTCANCEL IS NULL
              AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
              AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
              AND (PCPEDC.CODFILIAL IS NOT NULL)
              AND (PCPEDC.CODFILIAL IN ('1'))
              ${params}
            GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCPEDC.CODUSUR, PCUSUARI.NOME, PCPEDC.DATA
            ORDER BY PCFORNEC.FORNECEDOR, PCUSUARI.NOME)
          GROUP BY CODUSUR, NOME, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY NOME, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            rca: {
              code: curr.rcaCode,
              name: curr.rcaName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            amountWeight: curr.amountWeight,
            tableValue: curr.tableValue,
            count: curr.count,
            mixCount: curr.mixCount,
            positivedClientCount: curr.positivedClientCount,
            salesValue: curr.salesValue
          }))
        )
      }

      return result
    },

    async findPerProductProvider(
      options: IOptions
    ): Promise<IProductProviderSales[]> {
      let result: IProductProviderSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawProductProviderSales[]>(`
          SELECT SUM(QT)   AS "count",
            SUM(PVENDA)    AS "salesValue",
            SUM(PTABELA)   AS "tableValue",
            SUM(TOTPESO)   AS "amountWeight",
            SUM(QTMIX)     AS "mixCount",
            SUM(QTCLIPOS)  AS "positivedClientCount",
            CODPROD        AS "productCode",
            DESCRICAO      AS "productDescription",
            EMBALAGEM      AS "productPacking",
            UNIDADE        AS "productUnity",
            CODFAB         AS "productFactoryCode",
            CODFORNEC      AS "providerCode",
            FORNECEDOR     AS "providerName",
            FANTASIA       AS "providerFantasy",
            CGC            AS "providerCNPJ",
            CODFORNECPRINC AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
                    PCFORNEC.FORNECEDOR,
                    PCFORNEC.FANTASIA,
                    PCFORNEC.CGC,
                    PCFORNEC.CODFORNECPRINC,
                    PCPEDI.CODPROD,
                    PCPRODUT.DESCRICAO,
                    PCPRODUT.EMBALAGEM,
                    PCPRODUT.UNIDADE,
                    PCPRODUT.CODFAB,
                    SUM(PCPEDI.QT) AS  QT,
                    SUM(ROUND(NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0)), 2)) PVENDA,
                    SUM(PCPEDI.QT * PCPEDI.PTABELA) PTABELA,
                    SUM(PCPRODUT.PESOBRUTO * PCPEDI.QT) TOTPESO,
                    COUNT(DISTINCT (PCPEDI.CODPROD)) QTMIX,
                    COUNT(DISTINCT (PCPEDC.CODCLI)) QTCLIPOS
            FROM PCPEDC, PCPEDI, PCPRODUT, PCUSUARI, PCFORNEC, PCSUPERV, PCCLIENT, PCPRACA,PCDEPTO
            WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
              AND PCPEDC.NUMPED = PCPEDI.NUMPED
              AND PCPEDI.CODPROD = PCPRODUT.CODPROD
              AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
              AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
              AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
              ${params}
              AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
              AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
              AND PCPEDC.CODCLI = PCCLIENT.CODCLI
              AND PCPEDC.DTCANCEL IS NULL
              AND (PCPEDC.CODFILIAL IS NOT NULL)
              AND (PCPEDC.CODFILIAL IN ('1'))
              AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
            GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCPEDI.CODPROD, PCPRODUT.DESCRICAO, PCPRODUT.EMBALAGEM, PCPRODUT.UNIDADE, PCPRODUT.CODFAB, PCPEDC.DATA
            ORDER BY PCFORNEC.FORNECEDOR, PCPRODUT.DESCRICAO)
        GROUP BY CODPROD, DESCRICAO, EMBALAGEM, UNIDADE, CODFAB, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
      `)

        result = result.concat(
          response.map(curr => ({
            product: {
              code: curr.productCode,
              description: curr.productDescription,
              factoryCode: curr.productFactoryCode,
              packing: curr.productPacking,
              unity: curr.productUnity
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            amountWeight: curr.amountWeight,
            tableValue: curr.tableValue,
            count: curr.count,
            mixCount: curr.mixCount,
            positivedClientCount: curr.positivedClientCount,
            salesValue: curr.salesValue
          }))
        )
      }

      return result
    },

    async findPerCategory(options: IOptions): Promise<ICategorySales[]> {
      let result: ICategorySales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawCategorySales[]>(`
          SELECT SUM(QT)   AS "count",
            SUM(PVENDA)    AS "salesValue",
            SUM(TOTPESO)   AS "amountWeight",
            SUM(QTMIX)     AS "mixCount",
            CODCATEGORIA   AS "categoryCode",
            CATEGORIA      AS "categoryName",
            CODFORNEC      AS "providerCode",
            FORNECEDOR     AS "providerName",
            FANTASIA       AS "providerFantasy",
            CGC            AS "providerCNPJ",
            CODFORNECPRINC AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
                  PCFORNEC.FORNECEDOR,
                  PCFORNEC.FANTASIA,
                  PCFORNEC.CGC,
                  PCFORNEC.CODFORNECPRINC,
                  PCPRODUT.CODCATEGORIA,
                  PCCATEGORIA.CATEGORIA,
                  SUM(ROUND(NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0)), 2)) PVENDA,
                  SUM(NVL(PCPEDI.QT, 0)) QT,
                  SUM(PCPRODUT.PESOBRUTO * PCPEDI.QT) TOTPESO,
                  COUNT(DISTINCT (PCPEDI.CODPROD)) QTMIX
                FROM PCPEDI, PCPEDC, PCPRODUT, PCCATEGORIA, PCFORNEC, PCUSUARI, PCSUPERV, PCCLIENT, PCPRACA, PCDEPTO
                WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
                  AND PCCATEGORIA.CATEGORIA IS NOT NULL
                  AND PCPEDI.NUMPED = PCPEDC.NUMPED
                  AND PCPEDI.CODPROD = PCPRODUT.CODPROD
                  AND PCPRODUT.CODSEC = PCCATEGORIA.CODSEC (+)
                  AND PCPRODUT.CODCATEGORIA = PCCATEGORIA.CODCATEGORIA (+)
                  AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
                  AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
                  AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
                  AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
                  AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
                  AND PCPEDC.CODCLI = PCCLIENT.CODCLI
                  AND PCPEDC.DTCANCEL IS NULL
                  AND (PCPEDC.CODFILIAL IS NOT NULL)
                  AND (PCPEDC.CODFILIAL IN ('1'))
                  AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
                  ${params}
                GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC,PCPRODUT.CODCATEGORIA, PCCATEGORIA.CATEGORIA, PCPEDC.DATA)
          GROUP BY CODCATEGORIA, CATEGORIA, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY CATEGORIA, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            category: {
              code: curr.categoryCode,
              name: curr.categoryName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            amountWeight: curr.amountWeight,
            count: curr.count,
            mixCount: curr.mixCount,
            positivedClientCount: curr.positivedClientCount,
            salesValue: curr.salesValue
          }))
        )
      }

      return result
    },

    async findPerCategoryProduct(
      options: IOptions
    ): Promise<ICategoryProductSales[]> {
      let result: ICategoryProductSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawCategoryProductSales[]>(`
          SELECT SUM(QT)   AS "count",
            SUM(PVENDA)    AS "salesValue",
            SUM(TOTPESO)   AS "amountWeight",
            SUM(QTMIX)     AS "mixCount",
            CODCATEGORIA   AS "categoryCode",
            CATEGORIA      AS "categoryName",
            CODPROD        AS "productCode",
            DESCRICAO      AS "productDescription",
            CODFORNEC      AS "providerCode",
            FORNECEDOR     AS "providerName",
            FANTASIA       AS "providerFantasy",
            CGC            AS "providerCNPJ",
            CODFORNECPRINC AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
                      PCFORNEC.FORNECEDOR,
                      PCFORNEC.FANTASIA,
                      PCFORNEC.CGC,
                      PCFORNEC.CODFORNECPRINC,
                      PCPRODUT.CODCATEGORIA,
                      PCPEDI.CODPROD,
                      PCPRODUT.DESCRICAO,
                      PCCATEGORIA.CATEGORIA,
                      SUM(PCPEDI.QT) AS QT,
                      SUM(ROUND(NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0)), 2)) PVENDA,
                      SUM(PCPRODUT.PESOBRUTO * PCPEDI.QT) TOTPESO,
                      COUNT(DISTINCT (PCPEDI.CODPROD)) QTMIX
              FROM PCPEDI, PCPEDC, PCPRODUT, PCCATEGORIA, PCFORNEC, PCUSUARI, PCSUPERV, PCCLIENT, PCPRACA, PCDEPTO
              WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
                AND PCPEDI.NUMPED = PCPEDC.NUMPED
                AND PCPEDI.CODPROD = PCPRODUT.CODPROD
                AND PCPRODUT.CODSEC = PCCATEGORIA.CODSEC (+)
                AND PCPRODUT.CODCATEGORIA = PCCATEGORIA.CODCATEGORIA (+)
                AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
                AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
                AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
                AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
                AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
                AND PCPEDC.CODCLI = PCCLIENT.CODCLI
                AND PCPEDC.DTCANCEL IS NULL
                AND (PCPEDC.CODFILIAL IS NOT NULL)
                AND (PCPEDC.CODFILIAL IN ('1'))
                AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
                ${params}
              GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCPRODUT.CODCATEGORIA, PCCATEGORIA.CATEGORIA, PCPEDI.CODPROD, PCPRODUT.DESCRICAO, PCPRODUT.EMBALAGEM, PCPRODUT.UNIDADE, PCPEDC.DATA)
          GROUP BY CODCATEGORIA, CATEGORIA, CODPROD, DESCRICAO, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY CATEGORIA, DESCRICAO, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            category: {
              code: curr.categoryCode,
              name: curr.categoryName
            },
            product: {
              code: curr.productCode,
              description: curr.productDescription
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            amountWeight: curr.amountWeight,
            count: curr.count,
            mixCount: curr.mixCount,
            positivedClientCount: curr.positivedClientCount,
            salesValue: curr.salesValue
          }))
        )
      }

      return result
    },

    async findPerClientSalesValue(
      options: IOptions
    ): Promise<IClientSalesValueSales[]> {
      let result: IClientSalesValueSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawClientSalesValueSales[]>(`
          SELECT SUM(VLVENDA01) AS "januaryValue",
            SUM(VLVENDA02)      AS "februaryValue",
            SUM(VLVENDA03)      AS "marchValue",
            SUM(VLVENDA04)      AS "aprilValue",
            SUM(VLVENDA05)      AS "mayValue",
            SUM(VLVENDA06)      AS "juneValue",
            SUM(VLVENDA07)      AS "julyValue",
            SUM(VLVENDA08)      AS "augustValue",
            SUM(VLVENDA09)      AS "septemberValue",
            SUM(VLVENDA10)      AS "octoberValue",
            SUM(VLVENDA11)      AS "novemberValue",
            SUM(VLVENDA12)      AS "decemberValue",
            CODCLI              AS "clientCode",
            CLIENTE             AS "clientName",
            CODFORNEC           AS "providerCode",
            FORNECEDOR          AS "providerName",
            FANTASIA            AS "providerFantasy",
            CGC                 AS "providerCNPJ",
            CODFORNECPRINC      AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
                  PCFORNEC.FORNECEDOR,
                  PCFORNEC.FANTASIA,
                  PCFORNEC.CGC,
                  PCFORNEC.CODFORNECPRINC,
                  PCPEDI.CODCLI,
                  PCCLIENT.CLIENTE,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '01', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDA01,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '02', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDA02,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '03', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDA03,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '04', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDA04,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '05', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDA05,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '06', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDA06,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '07', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDA07,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '08', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDA08,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '09', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDA09,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '10', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDA10,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '11', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDA11,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '12', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDA12
                FROM PCPEDC, PCPEDI, PCCLIENT, PCPRODUT, PCUSUARI, PCFORNEC, PCSUPERV, PCPRACA, PCDEPTO
                WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
                  AND PCPEDC.NUMPED = PCPEDI.NUMPED
                  AND PCPEDC.CODCLI = PCCLIENT.CODCLI
                  AND PCPEDI.CODPROD = PCPRODUT.CODPROD
                  AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
                  AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
                  AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
                  AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
                  AND PCPEDC.DTCANCEL IS NULL
                  AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
                  AND (PCPEDC.CODFILIAL IS NOT NULL)
                  AND (PCPEDC.CODFILIAL IN ('1'))
                  AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
                  ${params}
                GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCPEDI.CODCLI, PCCLIENT.CLIENTE, PCPEDC.DATA)
          GROUP BY CODCLI, CLIENTE, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY CLIENTE, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            client: {
              code: curr.clientCode,
              name: curr.clientName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            januaryValue: curr.januaryValue,
            februaryValue: curr.februaryValue,
            marchValue: curr.marchValue,
            aprilValue: curr.aprilValue,
            mayValue: curr.mayValue,
            juneValue: curr.juneValue,
            julyValue: curr.julyValue,
            augustValue: curr.augustValue,
            septemberValue: curr.septemberValue,
            octoberValue: curr.octoberValue,
            novemberValue: curr.novemberValue,
            decemberValue: curr.decemberValue
          }))
        )
      }

      return result
    },

    async findPerProductSalesCount(
      options: IOptions
    ): Promise<IProductSalesCountSales[]> {
      let result: IProductSalesCountSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawProductSalesCountSales[]>(`
          SELECT SUM(QTVENDAMES01) AS "januaryValue",
            SUM(QTVENDAMES02)      AS "februaryValue",
            SUM(QTVENDAMES03)      AS "marchValue",
            SUM(QTVENDAMES04)      AS "aprilValue",
            SUM(QTVENDAMES05)      AS "mayValue",
            SUM(QTVENDAMES06)      AS "juneValue",
            SUM(QTVENDAMES07)      AS "julyValue",
            SUM(QTVENDAMES08)      AS "augustValue",
            SUM(QTVENDAMES09)      AS "septemberValue",
            SUM(QTVENDAMES10)      AS "octoberValue",
            SUM(QTVENDAMES11)      AS "novemberValue",
            SUM(QTVENDAMES12)      AS "decemberValue",
            CODPROD                AS "productCode",
            DESCRICAO              AS "productDescription",
            CODFORNEC              AS "providerCode",
            FORNECEDOR             AS "providerName",
            FANTASIA               AS "providerFantasy",
            CGC                    AS "providerCNPJ",
            CODFORNECPRINC         AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
                  PCFORNEC.FORNECEDOR,
                  PCFORNEC.FANTASIA,
                  PCFORNEC.CGC,
                  PCFORNEC.CODFORNECPRINC,
                  PCPEDI.CODPROD,
                  PCPRODUT.DESCRICAO,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '01', NVL(PCPEDI.QT, 0), 0)) AS QTVENDAMES01,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '02', NVL(PCPEDI.QT, 0), 0)) AS QTVENDAMES02,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '03', NVL(PCPEDI.QT, 0), 0)) AS QTVENDAMES03,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '04', NVL(PCPEDI.QT, 0), 0)) AS QTVENDAMES04,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '05', NVL(PCPEDI.QT, 0), 0)) AS QTVENDAMES05,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '06', NVL(PCPEDI.QT, 0), 0)) AS QTVENDAMES06,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '07', NVL(PCPEDI.QT, 0), 0)) AS QTVENDAMES07,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '08', NVL(PCPEDI.QT, 0), 0)) AS QTVENDAMES08,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '09', NVL(PCPEDI.QT, 0), 0)) AS QTVENDAMES09,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '10', NVL(PCPEDI.QT, 0), 0)) AS QTVENDAMES10,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '11', NVL(PCPEDI.QT, 0), 0)) AS QTVENDAMES11,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '12', NVL(PCPEDI.QT, 0), 0)) AS QTVENDAMES12
                FROM PCPEDC, PCPEDI, PCPRODUT, PCUSUARI, PCFORNEC, PCSUPERV, PCCLIENT, PCPRACA, PCDEPTO
                WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
                  AND PCPEDC.NUMPED = PCPEDI.NUMPED
                  AND PCPEDI.CODPROD = PCPRODUT.CODPROD
                  AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
                  AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
                  AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
                  AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
                  AND PCPEDC.CODCLI = PCCLIENT.CODCLI
                  AND PCPEDC.DTCANCEL IS NULL
                  AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
                  AND (PCPEDC.CODFILIAL IS NOT NULL)
                  AND (PCPEDC.CODFILIAL IN ('1'))
                  AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
                  ${params}
                GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCPEDI.CODPROD, PCPRODUT.DESCRICAO, PCPRODUT.EMBALAGEM, PCPEDC.DATA)
          GROUP BY CODPROD, DESCRICAO, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY DESCRICAO, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            product: {
              code: curr.productCode,
              description: curr.productDescription
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            januaryValue: curr.januaryValue,
            februaryValue: curr.februaryValue,
            marchValue: curr.marchValue,
            aprilValue: curr.aprilValue,
            mayValue: curr.mayValue,
            juneValue: curr.juneValue,
            julyValue: curr.julyValue,
            augustValue: curr.augustValue,
            septemberValue: curr.septemberValue,
            octoberValue: curr.octoberValue,
            novemberValue: curr.novemberValue,
            decemberValue: curr.decemberValue
          }))
        )
      }

      return result
    },

    async findPerProductSalesValue(
      options: IOptions
    ): Promise<IProductSalesValueSales[]> {
      let result: IProductSalesValueSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawProductSalesValueSales[]>(`
          SELECT SUM(VLVENDAMES01) AS "januaryValue",
            SUM(VLVENDAMES02) AS "februaryValue",
            SUM(VLVENDAMES03) AS "marchValue",
            SUM(VLVENDAMES04) AS "aprilValue",
            SUM(VLVENDAMES05) AS "mayValue",
            SUM(VLVENDAMES06) AS "juneValue",
            SUM(VLVENDAMES07) AS "julyValue",
            SUM(VLVENDAMES08) AS "augustValue",
            SUM(VLVENDAMES09) AS "septemberValue",
            SUM(VLVENDAMES10) AS "octoberValue",
            SUM(VLVENDAMES11) AS "novemberValue",
            SUM(VLVENDAMES12) AS "decemberValue",
            CODPROD           AS "productCode",
            DESCRICAO         AS "productDescription",
            CODFORNEC         AS "providerCode",
            FORNECEDOR        AS "providerName",
            FANTASIA          AS "providerFantasy",
            CGC               AS "providerCNPJ",
            CODFORNECPRINC    AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
              PCFORNEC.FORNECEDOR,
              PCFORNEC.FANTASIA,
              PCFORNEC.CGC,
              PCFORNEC.CODFORNECPRINC,
              PCPEDI.CODPROD,
              PCPRODUT.DESCRICAO,
              PCPRODUT.EMBALAGEM,
              SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '01', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDAMES01,
              SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '02', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDAMES02,
              SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '03', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDAMES03,
              SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '04', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDAMES04,
              SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '05', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDAMES05,
              SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '06', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDAMES06,
              SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '07', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDAMES07,
              SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '08', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDAMES08,
              SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '09', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDAMES09,
              SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '10', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDAMES10,
              SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '11', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDAMES11,
              SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '12', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS VLVENDAMES12
            FROM PCPEDC, PCPEDI, PCPRODUT, PCUSUARI, PCFORNEC, PCSUPERV, PCCLIENT, PCPRACA, PCDEPTO
            WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
              AND PCPEDC.NUMPED = PCPEDI.NUMPED
              AND PCPEDI.CODPROD = PCPRODUT.CODPROD
              AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
              AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
              AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
              AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
              AND PCPEDC.CODCLI = PCCLIENT.CODCLI
              AND PCPEDC.DTCANCEL IS NULL
              AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
              AND (PCPEDC.CODFILIAL IS NOT NULL)
              AND (PCPEDC.CODFILIAL IN ('1'))
              AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
              ${params}
            GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCPEDI.CODPROD, PCPRODUT.DESCRICAO, PCPRODUT.EMBALAGEM, PCPEDC.DATA)
          GROUP BY CODPROD, DESCRICAO, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY DESCRICAO, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            product: {
              code: curr.productCode,
              description: curr.productDescription
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            januaryValue: curr.januaryValue,
            februaryValue: curr.februaryValue,
            marchValue: curr.marchValue,
            aprilValue: curr.aprilValue,
            mayValue: curr.mayValue,
            juneValue: curr.juneValue,
            julyValue: curr.julyValue,
            augustValue: curr.augustValue,
            septemberValue: curr.septemberValue,
            octoberValue: curr.octoberValue,
            novemberValue: curr.novemberValue,
            decemberValue: curr.decemberValue
          }))
        )
      }

      return result
    },

    async findPerSquareClientProduct(
      options: IOptions
    ): Promise<ISquareClientProductSales[]> {
      let result: ISquareClientProductSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawSquareClientProductSales[]>(`
          SELECT PCPRODUT.CODFORNEC      AS "providerCode",
            PCFORNEC.FORNECEDOR     AS "providerName",
            PCFORNEC.FANTASIA       AS "providerFantasy",
            PCFORNEC.CGC            AS "providerCNPJ",
            PCFORNEC.CODFORNECPRINC AS "providerPrincipalCode",
            PCPRACA.CODPRACA        AS "squareCode",
            PCPRACA.PRACA           AS "squareName",
            PCCLIENT.CODCLI         AS "clientCode",
            PCCLIENT.CLIENTE        AS "clientName",
            PCPEDI.CODPROD          AS "productCode",
            PCPRODUT.DESCRICAO      AS "productDescription",
            PCPRODUT.EMBALAGEM      AS "productPacking",
            SUM(PCPEDI.QT)          AS "count",
            SUM(ROUND(NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0)), 2)) AS "salesValue"
          FROM PCPEDI, PCPEDC, PCPRODUT, PCFORNEC, PCUSUARI, PCSUPERV, PCPRACA, PCCLIENT, PCDEPTO
          WHERE (PCPEDC.DATA >= TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND PCPEDC.DATA <= TO_DATE('${toFormated}', 'DD/MM/YYYY'))
            AND PCPEDI.NUMPED = PCPEDC.NUMPED
            AND PCPEDI.CODPROD = PCPRODUT.CODPROD
            AND PCPEDC.CODCLI = PCCLIENT.CODCLI
            AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA(+)
            AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
            AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
            AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
            AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
            AND PCPEDC.DTCANCEL IS NULL
            AND (PCPEDC.CODFILIAL IS NOT NULL)
            AND (PCPEDC.CODFILIAL IN ('1'))
            AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
            ${params}
          GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCPRACA.CODPRACA, PCPRACA.PRACA, PCCLIENT.CODCLI, PCCLIENT.CLIENTE, PCPEDI.CODPROD, PCPRODUT.DESCRICAO, PCPRODUT.EMBALAGEM
          ORDER BY PCPRODUT.CODFORNEC, PCPRACA.CODPRACA, PCCLIENT.CODCLI, "salesValue" DESC
        `)

        result = result.concat(
          response.map(curr => ({
            client: {
              code: curr.clientCode,
              name: curr.clientName
            },
            product: {
              code: curr.productCode,
              description: curr.productDescription
            },
            square: {
              code: curr.squareCode,
              name: curr.squareName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            count: curr.count,
            salesValue: curr.salesValue
          }))
        )
      }

      return result
    },

    async findPerClientLitigation(
      options: IOptions
    ): Promise<IClientLitigationSales[]> {
      let result: IClientLitigationSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawClientLitigationSales[]>(`
          SELECT SUM(VLVENDA01) AS "januaryValue",
            SUM(VLVENDA02) AS "februaryValue",
            SUM(VLVENDA03) AS "marchValue",
            SUM(VLVENDA04) AS "aprilValue",
            SUM(VLVENDA05) AS "mayValue",
            SUM(VLVENDA06) AS "juneValue",
            SUM(VLVENDA07) AS "julyValue",
            SUM(VLVENDA08) AS "augustValue",
            SUM(VLVENDA09) AS "septemberValue",
            SUM(VLVENDA10) AS "octoberValue",
            SUM(VLVENDA11) AS "novemberValue",
            SUM(VLVENDA12) AS "decemberValue",
            CODCLI         AS "clientCode",
            CLIENTE        AS "clientName",
            CODFORNEC      AS "providerCode",
            FORNECEDOR     AS "providerName",
            FANTASIA       AS "providerFantasy",
            CGC            AS "providerCNPJ",
            CODFORNECPRINC AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
                  PCFORNEC.FORNECEDOR,
                  PCFORNEC.FANTASIA,
                  PCFORNEC.CGC,
                  PCFORNEC.CODFORNECPRINC,
                  PCPEDI.CODCLI,
                  PCCLIENT.CLIENTE,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '01', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA01,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '02', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA02,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '03', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA03,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '04', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA04,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '05', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA05,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '06', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA06,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '07', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA07,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '08', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA08,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '09', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA09,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '10', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA10,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '11', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA11,
                  SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '12', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA12
                FROM PCPEDC, PCPEDI, PCCLIENT, PCPRODUT, PCUSUARI, PCFORNEC, PCSUPERV, PCPRACA, PCDEPTO
                WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
                  AND PCPEDC.NUMPED = PCPEDI.NUMPED
                  AND PCPEDC.CODCLI = PCCLIENT.CODCLI
                  AND PCPEDI.CODPROD = PCPRODUT.CODPROD
                  AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
                  AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
                  AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
                  AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
                  AND PCPEDC.DTCANCEL IS NULL
                  AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
                  AND (PCPEDC.CODFILIAL IS NOT NULL)
                  AND (PCPEDC.CODFILIAL IN ('1'))
                  AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
                  ${params}
                GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCPEDI.CODCLI, PCCLIENT.CLIENTE, PCPEDC.DATA)
          GROUP BY CODCLI, CLIENTE, CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY CLIENTE, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            client: {
              code: curr.clientCode,
              name: curr.clientName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            januaryValue: curr.januaryValue,
            februaryValue: curr.februaryValue,
            marchValue: curr.marchValue,
            aprilValue: curr.aprilValue,
            mayValue: curr.mayValue,
            juneValue: curr.juneValue,
            julyValue: curr.julyValue,
            augustValue: curr.augustValue,
            septemberValue: curr.septemberValue,
            octoberValue: curr.octoberValue,
            novemberValue: curr.novemberValue,
            decemberValue: curr.decemberValue
          }))
        )
      }

      return result
    },

    async findPerProviderGoal(
      options: IOptions
    ): Promise<IProviderGoalSales[]> {
      let result: IProviderGoalSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { from, fromFormated, toFormated } = intervals[i]
        const year = getYear(from)

        const response = await winthor.raw<IRawProviderGoalSales[]>(`
          SELECT PCFORNEC.CODFORNEC                                                             AS "providerCode",
            PCFORNEC.FORNECEDOR                                                                 AS "providerName",
            PCFORNEC.FANTASIA                                                                   AS "providerFantasy",
            PCFORNEC.CGC                                                                        AS "providerCNPJ",
            PCFORNEC.CODFORNECPRINC                                                             AS "providerPrincipalCode",
            PCEMPR.MATRICULA                                                                    AS "buyerCode",
            PCEMPR.NOME                                                                         AS "buyerName",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '01', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "januaryValue",
            NVL((SELECT SUM(PCAUXFOR.VLMETAMES01) FROM PCAUXFOR A WHERE PCAUXFOR.CODFORNEC = A.CODFORNEC AND A.ANO BETWEEN ${year} AND ${year}), 0) AS "januaryGoal",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '02', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "februaryValue",
            NVL((SELECT SUM(PCAUXFOR.VLMETAMES02) FROM PCAUXFOR A WHERE PCAUXFOR.CODFORNEC = A.CODFORNEC AND A.ANO BETWEEN ${year} AND ${year}), 0) AS "februaryGoal",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '03', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "marchValue",
            NVL((SELECT SUM(PCAUXFOR.VLMETAMES03) FROM PCAUXFOR A WHERE PCAUXFOR.CODFORNEC = A.CODFORNEC AND A.ANO BETWEEN ${year} AND ${year}), 0) AS "marchGoal",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '04', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "aprilValue",
            NVL((SELECT SUM(PCAUXFOR.VLMETAMES04) FROM PCAUXFOR A WHERE PCAUXFOR.CODFORNEC = A.CODFORNEC AND A.ANO BETWEEN ${year} AND ${year}), 0) AS "aprilGoal",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '05', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "mayValue",
            NVL((SELECT SUM(PCAUXFOR.VLMETAMES05) FROM PCAUXFOR A WHERE PCAUXFOR.CODFORNEC = A.CODFORNEC AND A.ANO BETWEEN ${year} AND ${year}), 0) AS "mayGoal",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '06', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "juneValue",
            NVL((SELECT SUM(PCAUXFOR.VLMETAMES06) FROM PCAUXFOR A WHERE PCAUXFOR.CODFORNEC = A.CODFORNEC AND A.ANO BETWEEN ${year} AND ${year}), 0) AS "juneGoal",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '07', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "julyValue",
            NVL((SELECT SUM(PCAUXFOR.VLMETAMES07) FROM PCAUXFOR A WHERE PCAUXFOR.CODFORNEC = A.CODFORNEC AND A.ANO BETWEEN ${year} AND ${year}), 0) AS "julyGoal",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '08', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "augustValue",
            NVL((SELECT SUM(PCAUXFOR.VLMETAMES08) FROM PCAUXFOR A WHERE PCAUXFOR.CODFORNEC = A.CODFORNEC AND A.ANO BETWEEN ${year} AND ${year}), 0) AS "augustGoal",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '09', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "septemberValue",
            NVL((SELECT SUM(PCAUXFOR.VLMETAMES09) FROM PCAUXFOR A WHERE PCAUXFOR.CODFORNEC = A.CODFORNEC AND A.ANO BETWEEN ${year} AND ${year}), 0) AS "septemberGoal",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '10', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "octoberValue",
            NVL((SELECT SUM(PCAUXFOR.VLMETAMES10) FROM PCAUXFOR A WHERE PCAUXFOR.CODFORNEC = A.CODFORNEC AND A.ANO BETWEEN ${year} AND ${year}), 0) AS "octoberGoal",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '11', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "novemberValue",
            NVL((SELECT SUM(PCAUXFOR.VLMETAMES11) FROM PCAUXFOR A WHERE PCAUXFOR.CODFORNEC = A.CODFORNEC AND A.ANO BETWEEN ${year} AND ${year}), 0) AS "novemberGoal",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '12', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "decemberValue",
            NVL((SELECT SUM(PCAUXFOR.VLMETAMES12) FROM PCAUXFOR A WHERE PCAUXFOR.CODFORNEC = A.CODFORNEC AND A.ANO BETWEEN ${year} AND ${year}), 0) AS "decemberGoal",
            SUM(NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))) AS "amountValue",
            NVL((SELECT SUM(NVL(A.VLMETAMES01, 0) + NVL(A.VLMETAMES02, 0) + NVL(A.VLMETAMES03, 0) + NVL(A.VLMETAMES04, 0) + NVL(A.VLMETAMES05, 0) + NVL(A.VLMETAMES06, 0) + NVL(A.VLMETAMES07, 0) + NVL(A.VLMETAMES08, 0) + NVL(A.VLMETAMES09, 0) + NVL(A.VLMETAMES10, 0) + NVL(A.VLMETAMES11, 0) + NVL(A.VLMETAMES12, 0)) FROM PCAUXFOR A WHERE PCAUXFOR.CODFORNEC = A.CODFORNEC AND A.ANO BETWEEN ${year} AND ${year}), 0) AS "amountGoal"
          FROM PCEMPR, PCPEDC, PCPEDI, PCCLIENT, PCPRODUT, PCUSUARI, PCSUPERV, PCPRACA, PCFORNEC, PCAUXFOR, PCDEPTO
          WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
            AND PCPEDC.NUMPED = PCPEDI.NUMPED
            AND PCFORNEC.CODFORNEC = PCAUXFOR.CODFORNEC(+)
            AND PCAUXFOR.ANO(+) BETWEEN ${year} AND ${year}
            AND PCPEDC.CODCLI = PCCLIENT.CODCLI
            AND PCPEDI.CODPROD = PCPRODUT.CODPROD
            AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
            AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
            AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
            AND PCPEDC.DTCANCEL IS NULL
            AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
            AND PCEMPR.MATRICULA = PCFORNEC.CODCOMPRADOR
            AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
            ${params}
            AND (PCPEDC.CODFILIAL IS NOT NULL)
            AND (PCPEDC.CODFILIAL IN ('1'))
            AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
          GROUP BY PCFORNEC.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, PCEMPR.MATRICULA, PCEMPR.NOME, PCAUXFOR.VLMETAMES01, PCAUXFOR.CODFORNEC, PCAUXFOR.VLMETAMES02, PCAUXFOR.VLMETAMES03, PCAUXFOR.VLMETAMES04, PCAUXFOR.VLMETAMES05, PCAUXFOR.VLMETAMES06, PCAUXFOR.VLMETAMES07, PCAUXFOR.VLMETAMES08, PCAUXFOR.VLMETAMES09, PCAUXFOR.VLMETAMES10, PCAUXFOR.VLMETAMES11, PCAUXFOR.VLMETAMES12
          ORDER BY PCFORNEC.FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            buyer: {
              code: curr.buyerCode,
              name: curr.buyerName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            januaryValue: curr.januaryValue,
            februaryValue: curr.februaryValue,
            marchValue: curr.marchValue,
            aprilValue: curr.aprilValue,
            mayValue: curr.mayValue,
            juneValue: curr.juneValue,
            julyValue: curr.julyValue,
            augustValue: curr.augustValue,
            septemberValue: curr.septemberValue,
            octoberValue: curr.octoberValue,
            novemberValue: curr.novemberValue,
            decemberValue: curr.decemberValue,
            amountValue: curr.amountValue,
            januaryGoal: curr.januaryGoal,
            februaryGoal: curr.februaryGoal,
            marchGoal: curr.marchGoal,
            aprilGoal: curr.aprilGoal,
            mayGoal: curr.mayGoal,
            juneGoal: curr.juneGoal,
            julyGoal: curr.julyGoal,
            augustGoal: curr.augustGoal,
            septemberGoal: curr.septemberGoal,
            octoberGoal: curr.octoberGoal,
            novemberGoal: curr.novemberGoal,
            decemberGoal: curr.decemberGoal,
            amountGoal: curr.amountGoal
          }))
        )
      }

      return result
    },

    async findPerProviderLitigation(
      options: IOptions
    ): Promise<IProviderLitigationSales[]> {
      let result: IProviderLitigationSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawProviderLitigationSales[]>(`
          SELECT SUM(VLVENDA01) AS "januaryValue",
            SUM(VLVENDA02) AS "februaryValue",
            SUM(VLVENDA03) AS "marchValue",
            SUM(VLVENDA04) AS "aprilValue",
            SUM(VLVENDA05) AS "mayValue",
            SUM(VLVENDA06) AS "juneValue",
            SUM(VLVENDA07) AS "julyValue",
            SUM(VLVENDA08) AS "augustValue",
            SUM(VLVENDA09) AS "septemberValue",
            SUM(VLVENDA10) AS "octoberValue",
            SUM(VLVENDA11) AS "novemberValue",
            SUM(VLVENDA12) AS "decemberValue",
            CODFORNEC      AS "providerCode",
            FORNECEDOR     AS "providerName",
            FANTASIA       AS "providerFantasy",
            CGC            AS "providerCNPJ",
            CODFORNECPRINC AS "providerPrincipalCode"
          FROM (SELECT PCPRODUT.CODFORNEC,
                PCFORNEC.FORNECEDOR,
                PCFORNEC.FANTASIA,
                PCFORNEC.CGC,
                PCFORNEC.CODFORNECPRINC,
                SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '01', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA01,
                SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '02', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA02,
                SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '03', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA03,
                SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '04', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA04,
                SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '05', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA05,
                SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '06', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA06,
                SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '07', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA07,
                SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '08', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA08,
                SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '09', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA09,
                SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '10', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA10,
                SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '11', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA11,
                SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '12', (NVL(PCPEDI.QT, 0) * NVL(PCPRODUT.LITRAGEM, 0)), 0)) AS VLVENDA12
              FROM PCPEDC, PCPEDI, PCCLIENT, PCPRODUT, PCUSUARI, PCFORNEC, PCSUPERV, PCPRACA, PCDEPTO
              WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
                AND PCPEDC.NUMPED = PCPEDI.NUMPED
                AND PCPEDC.CODCLI = PCCLIENT.CODCLI
                AND PCPEDI.CODPROD = PCPRODUT.CODPROD
                AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
                AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
                AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
                AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
                AND PCPEDC.DTCANCEL IS NULL
                AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
                AND (PCPEDC.CODFILIAL IS NOT NULL)
                AND (PCPEDC.CODFILIAL IN ('1'))
                AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
                ${params}
              GROUP BY PCPEDC.DATA, PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC
              ORDER BY PCFORNEC.FORNECEDOR)
          GROUP BY CODFORNEC, FORNECEDOR, FANTASIA, CGC, CODFORNECPRINC
          ORDER BY FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            januaryValue: curr.januaryValue,
            februaryValue: curr.februaryValue,
            marchValue: curr.marchValue,
            aprilValue: curr.aprilValue,
            mayValue: curr.mayValue,
            juneValue: curr.juneValue,
            julyValue: curr.julyValue,
            augustValue: curr.augustValue,
            septemberValue: curr.septemberValue,
            octoberValue: curr.octoberValue,
            novemberValue: curr.novemberValue,
            decemberValue: curr.decemberValue
          }))
        )
      }

      return result
    },

    async findPerRCASalesValue(
      options: IOptions
    ): Promise<IRCASalesValueSales[]> {
      let result: IRCASalesValueSales[] = []

      const { periodFrom, periodTo } = options
      const params = parseOptions(options)

      const intervals = generateDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const { fromFormated, toFormated } = intervals[i]

        const response = await winthor.raw<IRawRCASalesValueSales[]>(`
          SELECT SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '01',
            (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "januaryValue",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '02', (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "februaryValue",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '03',
            (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "marchValue",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '04',
            (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "aprilValue",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '05',
            (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "mayValue",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '06',
            (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))),0)) AS "juneValue",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '07',
            (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "julyValue",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '08',
            (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "augustValue",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '09',
            (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "septemberValue",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '10',
            (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "octoberValue",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '11',
            (NVL(PCPEDI.QT, 0) * (NVL(PCPEDI.PVENDA, 0) + NVL(PCPEDI.VLOUTRASDESP, 0) + NVL(PCPEDI.VLFRETE, 0))), 0)) AS "novemberValue",
            SUM(DECODE(TO_CHAR(PCPEDI.DATA, 'MM'), '12', (NVL(PCPEDI.QT, 0) * NVL(PCPEDI.PVENDA, 0)), 0)) AS "decemberValue",
            PCPEDC.CODUSUR AS "rcaCode",
            PCUSUARI.NOME  AS "rcaName",
            PCFORNEC.CODFORNEC AS "providerCode",
            PCFORNEC.FORNECEDOR AS "providerName",
            PCFORNEC.FANTASIA AS "providerFantasy",
            PCFORNEC.CGC AS "providerCNPJ",
            PCFORNEC.CODFORNECPRINC AS "providerPrincipalCode"
          FROM PCPEDC, PCPEDI, PCCLIENT, PCPRODUT, PCUSUARI, PCFORNEC, PCSUPERV, PCPRACA, PCDEPTO
          WHERE PCPEDC.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')
            AND PCPEDC.NUMPED = PCPEDI.NUMPED
            AND PCPEDC.CODCLI = PCCLIENT.CODCLI
            AND PCPEDI.CODPROD = PCPRODUT.CODPROD
            AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
            AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO
            AND PCUSUARI.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR
            AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
            AND PCPEDC.DTCANCEL IS NULL
            AND PCCLIENT.CODPRACA = PCPRACA.CODPRACA
            AND (PCPEDC.CODFILIAL IS NOT NULL)
            AND (PCPEDC.CODFILIAL IN ('1'))
            AND PCPEDC.CONDVENDA IN (1, 2, 3, 7, 9, 14, 15, 17, 18, 19, 98)
            ${params}
          GROUP BY PCPEDC.CODUSUR, PCUSUARI.NOME, PCFORNEC.CODFORNEC, PCFORNEC.FANTASIA, PCFORNEC.CGC, PCFORNEC.CODFORNECPRINC, FORNECEDOR
          ORDER BY PCUSUARI.NOME, FORNECEDOR
        `)

        result = result.concat(
          response.map(curr => ({
            rca: {
              code: curr.rcaCode,
              name: curr.rcaName
            },
            provider: {
              code: curr.providerCode,
              name: curr.providerName,
              fantasy: curr.providerFantasy,
              cnpj: curr.providerCNPJ,
              principalCode: curr.providerPrincipalCode
            },
            januaryValue: curr.januaryValue,
            februaryValue: curr.februaryValue,
            marchValue: curr.marchValue,
            aprilValue: curr.aprilValue,
            mayValue: curr.mayValue,
            juneValue: curr.juneValue,
            julyValue: curr.julyValue,
            augustValue: curr.augustValue,
            septemberValue: curr.septemberValue,
            octoberValue: curr.octoberValue,
            novemberValue: curr.novemberValue,
            decemberValue: curr.decemberValue
          }))
        )
      }

      return result
    }
  }
}
