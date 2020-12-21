import { PrismaClient } from '@prisma/client'
import { endOfDay, startOfDay } from 'date-fns'

import {
  IStockProduct,
  ITerminationStockProduct,
  IArrivalStockProduct,
  IReleaseStockProduct
} from '~/domain/IProduct'
import { winthor } from '~/libraries/WinThor'
import { formatDate } from '~/utilities/date'
import { normalizeDate } from '~/utilities/normalizations'

import {
  IStockNotificationsModel,
  IStockNotificationsResult,
  IOptions
} from './IStockNotificationsModel'

interface IInvoiceData {
  number: number
  providerCode: number
}

interface IInvoiceDataColumns {
  number: string
  providerCode: string
}

interface IRawStockProduct extends Omit<IStockProduct, 'provider'> {
  providerCode: number
  providerName: string
  providerFantasy: string
  providerPrincipalCode: number
  providerCNPJ: string
}

interface IRawTerminationStockProduct
  extends Omit<ITerminationStockProduct, 'provider'> {
  providerCode: number
  providerName: string
  providerFantasy: string
  providerPrincipalCode: number
  providerCNPJ: string
}

export function createWinThorStockNotificationsModel(): IStockNotificationsModel {
  const prisma = new PrismaClient()

  function generateInvoiceDataFilter(
    data: IInvoiceData[],
    columns: IInvoiceDataColumns
  ) {
    if (data.length === 0) return '1 = 0'

    return data
      .map(
        ({ number, providerCode }) =>
          `(${columns.number} = ${number} AND ${columns.providerCode} = ${providerCode})`
      )
      .join(' OR ')
  }

  function generateCodeFilter(codes: number[], field: string): string {
    if (codes.length === 0) {
      return ''
    }

    return `AND (${codes.map(code => `${field} = ${code}`).join(' OR ')})`
  }

  async function findProducts(
    invoices: IInvoiceData[],
    buyers: number[],
    providers: number[]
  ): Promise<IStockProduct[]> {
    const response = await winthor.raw<IRawStockProduct[]>(`
      SELECT PCMOV.CODPROD as "code",
        PCMOV.NUMNOTA as "invoiceNumber",
        PCPRODUT.DESCRICAO as "description",
        PCPRODUT.CODFAB as "factoryCode",
        PCPRODUT.EMBALAGEM as "packing",
        PCPRODUT.UNIDADE as "unity",
        PCFORNEC.CODFORNEC as "providerCode",
        PCFORNEC.FORNECEDOR as "providerName",
        PCFORNEC.FANTASIA as "providerFantasy",
        PCFORNEC.CODFORNECPRINC as "providerPrincipalCode",
        PCFORNEC.CGC as "providerCNPJ",
        DECODE(NVL(PCMOV.QT, 0), 0, NVL(PCMOV.QTCONT, 0), PCMOV.QT) as "lastEntryQuantity",
        NVL(NVL(NVL(PCMOV.PUNIT, 0), NVL(PCMOV.PUNITCONT, 0)), PCMOV.PUNIT) as "lastBuyPrice",
        PCPEDIDO.DTEMISSAO as "lastPurchaseOrderAt"
      FROM PCMOV,
        PCPRODUT,
        PCPEDIDO,
        PCFORNEC
      WHERE PCMOV.CODPROD = PCPRODUT.CODPROD
        AND PCMOV.NUMPED = PCPEDIDO.NUMPED (+)
        AND PCFORNEC.CODFORNEC = PCPRODUT.CODFORNEC
        AND PCPEDIDO.NUMPED IS NOT NULL
        AND DTCANCEL IS NULL
        AND (${generateInvoiceDataFilter(invoices, {
          number: 'NUMNOTA',
          providerCode: 'PCMOV.CODFORNEC'
        })})
        ${generateCodeFilter(buyers, 'PCFORNEC.CODCOMPRADOR')}
        ${generateCodeFilter(providers, 'PCMOV.CODFORNEC')}
    `)

    return response.map(product => ({
      invoiceNumber: product.invoiceNumber,
      code: product.code,
      description: product.description,
      factoryCode: product.factoryCode,
      lastBuyPrice: product.lastBuyPrice,
      lastEntryQuantity: product.lastEntryQuantity,
      lastPurchaseOrderAt: product.lastPurchaseOrderAt,
      packing: product.packing,
      unity: product.unity,
      provider: {
        code: product.providerCode,
        name: product.providerName,
        fantasy: product.providerFantasy,
        principalCode: product.providerPrincipalCode,
        cnpj: product.providerCNPJ
      }
    }))
  }

  async function findArrived(
    options: IOptions
  ): Promise<IArrivalStockProduct[]> {
    const { buyers = [], providers = [] } = options

    const trackedInvoices = await prisma.invoices.findMany({
      where: {
        canceledAt: null,
        schedule: {
          receivedAt: {
            gte: startOfDay(normalizeDate(options.periodFrom)),
            lte: endOfDay(normalizeDate(options.periodTo))
          },
          NOT: {
            receivedAt: null
          }
        }
      },
      select: {
        number: true,
        providerCode: true,
        schedule: {
          select: {
            receivedAt: true
          }
        }
      }
    })

    return (await findProducts(trackedInvoices, buyers, providers)).map(
      product => ({
        ...product,
        arrivedAt:
          trackedInvoices?.find(
            ({ number }) => product.invoiceNumber === number
          )?.schedule?.receivedAt || undefined
      })
    )
  }

  async function findReleased(
    options: IOptions
  ): Promise<IReleaseStockProduct[]> {
    const { buyers = [], providers = [] } = options

    const normalizedFrom = normalizeDate(options.periodFrom)
    const periodFrom = formatDate(startOfDay(normalizedFrom))

    const normalizedTo = normalizeDate(options.periodTo)
    const periodTo = formatDate(endOfDay(normalizedTo))

    const trackedInvoices = await winthor.raw<
      Array<IInvoiceData & { releasedAt: Date }>
    >(`
      SELECT DISTINCT
        PCNFENT.NUMNOTA AS "number",
        PCNFENT.CODFORNEC as "providerCode",
        PCMOVENDPEND.DTFIMOS as "releasedAt"
      FROM PCNFENT,
        PCWMS,
        PCMOVENDPEND,
        PCCONSUM
      WHERE PCNFENT.NUMTRANSENT = PCWMS.NUMTRANSENT (+)
        AND PCWMS.NUMTRANSWMS = PCMOVENDPEND.NUMTRANSWMS (+)
        AND PCNFENT.CODCONT IN (PCCONSUM.CODCONTFOR, PCCONSUM.CODCONTCLI, PCCONSUM.CODCONTDEVCLI, PCCONSUM.CODCONTAJUSTEEST)
        AND (PCNFENT.VLTOTAL > 0 OR NVL(PCNFENT.OBS, 'X') <> 'NF CANCELADA')
        AND PCNFENT.TIPODESCARGA NOT IN ('2', '8')
        AND PCWMS.DTCANCEL IS NULL
        AND PCMOVENDPEND.DATA > (SELECT DTVIRADAWMS FROM PCCONSUM)
        AND PCNFENT.CODFILIAL = 1
        AND PCMOVENDPEND.DTFIMOS BETWEEN TO_DATE('${periodFrom}', 'DD/MM/YYYY') AND TO_DATE('${periodTo}', 'DD/MM/YYYY')
        AND TIPOOS = 52
        AND PCMOVENDPEND.POSICAO = 'C'
    `)

    return (await findProducts(trackedInvoices, buyers, providers)).map(
      product => ({
        ...product,
        releasedAt:
          trackedInvoices?.find(
            ({ number }) => product.invoiceNumber === number
          )?.releasedAt || undefined
      })
    )
  }

  async function findTerminated(
    options: IOptions
  ): Promise<ITerminationStockProduct[]> {
    const { buyers = [], providers = [] } = options

    const normalizedFrom = normalizeDate(options.periodFrom)
    const periodFrom = formatDate(startOfDay(normalizedFrom))

    const normalizedTo = normalizeDate(options.periodTo)
    const periodTo = formatDate(endOfDay(normalizedTo))

    const response = await winthor.raw<IRawTerminationStockProduct[]>(`
      SELECT PCEST.CODPROD as "code",
        PCPRODUT.DESCRICAO as "description",
        PCPRODUT.CODFAB as "factoryCode",
        PCPRODUT.EMBALAGEM as "packing",
        PCPRODUT.UNIDADE as "unity",
        PCPRODUT.CODFORNEC as "providerCode",
        PCFORNEC.FORNECEDOR as "providerName",
        PCFORNEC.FANTASIA as "providerFantasy",
        PCFORNEC.CODFORNECPRINC as "providerPrincipalCode",
        PCFORNEC.CGC as "providerCNPJ",
        PCEST.DTULTSAIDA as "terminationAt",
        (NVL(PCEST.QTESTGER, 0) - NVL(PCEST.QTRESERV, 0) - NVL(PCEST.QTBLOQUEADA, 0)) as "availableQuantity",
        NVL(PCEST.QTRESERV, 0) as "reservedQuantity",
        NVL(PCEST.QTBLOQUEADA, 0) as "bloquedQuantity",
        NVL(QTESTGER, 0) as "stockQuantity",
        NVL(PCEST.QTPEDIDA, 0) as "lastEntryQuantity",
        NVL(PCEST.VALORULTENT, 0) as "lastBuyPrice",
        NVL(QTGIRODIA, 0) as "cuteDay",
        PCEST.QTINDENIZ as "indemnifiedQuantity",
        PCPRODUT.TEMREPOS as "spareTime",
        PCFORNEC.PRAZOENTREGA as "deliveryTime",
        DECODE(NVL(PCEST.QTGIRODIA, 0), 0, 99999, (((NVL(PCEST.QTESTGER, 0) - NVL(PCEST.QTRESERV, 0) - NVL(PCEST.QTBLOQUEADA, 0)) / DECODE(NVL(PCEST.QTGIRODIA, 0), 0, 1, PCEST.QTGIRODIA)))) as "stockDays",
        (SELECT MAX(DTEMISSAO) FROM PCPEDIDO, PCITEM WHERE PCPEDIDO.NUMPED = PCITEM.NUMPED AND PCPEDIDO.CODFILIAL = PCEST.CODFILIAL AND NVL(PCITEM.QTPEDIDA, 0) > NVL(PCITEM.QTENTREGUE, 0) AND PCITEM.CODPROD = PCEST.CODPROD) as "lastPurchaseOrderAt"
      FROM PCEST,
        PCPRODUT,
        PCTABPR,
        PCFORNEC,
        PCPRODFILIAL
      WHERE PCEST.CODPROD = PCPRODUT.CODPROD
        AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC
        AND PCPRODUT.CODPROD = PCTABPR.CODPROD
        AND PCEST.CODPROD = PCPRODFILIAL.CODPROD
        AND PCEST.CODFILIAL = PCPRODFILIAL.CODFILIAL
        AND PCTABPR.NUMREGIAO = 1
        AND PCEST.CODFILIAL = 1
        AND (PCPRODUT.TEMREPOS + PCFORNEC.PRAZOENTREGA) > DECODE(NVL(PCEST.QTGIRODIA, 0), 0, 99999, (((NVL(PCEST.QTESTGER, 0) - NVL(PCEST.QTRESERV, 0) - NVL(PCEST.QTBLOQUEADA, 0)) / DECODE(NVL(PCEST.QTGIRODIA, 0), 0, 1, PCEST.QTGIRODIA))))
        AND (((PCPRODUT.OBS2 NOT IN ('FL')) OR (PCPRODUT.OBS2 IS NULL)) AND
            ((PCPRODFILIAL.FORALINHA = 'N') OR (PCPRODFILIAL.FORALINHA IS NULL)))
        AND (((PCPRODUT.OBS NOT IN ('PV')) OR (PCPRODUT.OBS IS NULL)) AND
            ((PCPRODFILIAL.PROIBIDAVENDA = 'N') OR
            (PCPRODFILIAL.PROIBIDAVENDA IS NULL)))
        AND (PCEST.DTULTSAIDA BETWEEN TO_DATE('${periodFrom}', 'DD/MM/YYYY') AND TO_DATE('${periodTo}', 'DD/MM/YYYY'))
        ${generateCodeFilter(buyers, 'PCFORNEC.CODCOMPRADOR')}
        ${generateCodeFilter(providers, 'PCPRODUT.CODFORNEC')}
      ORDER BY PCPRODUT.DESCRICAO
    `)

    return response.map(product => ({
      code: product.code,
      description: product.description,
      factoryCode: product.factoryCode,
      lastBuyPrice: product.lastBuyPrice,
      lastEntryQuantity: product.lastEntryQuantity,
      lastPurchaseOrderAt: product.lastPurchaseOrderAt,
      packing: product.packing,
      unity: product.unity,
      provider: {
        code: product.providerCode,
        name: product.providerName,
        fantasy: product.providerFantasy,
        principalCode: product.providerPrincipalCode,
        cnpj: product.providerCNPJ
      },
      terminationAt: product.terminationAt
    }))
  }

  return {
    async find(options: IOptions): Promise<IStockNotificationsResult> {
      const arrived = await findArrived(options)
      const released = await findReleased(options)
      const terminated = await findTerminated(options)

      return {
        arrived,
        released,
        terminated
      }
    }
  }
}
