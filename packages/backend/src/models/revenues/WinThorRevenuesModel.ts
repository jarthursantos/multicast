import {
  IAnaliticRevenues,
  ISupervisorRevenues,
  IActuationAreaRevenues,
  IChargeRevenues,
  ICheckOutRevenues,
  IClassRevenues,
  IDeadlineRevenues,
  IEmitterRevenues,
  IEvolutionRevenues,
  IMonthRevenues,
  IProviderRevenues,
  IRegionRevenues,
  ISalesOriginRevenues
} from '~/domain/IRevenues'
import { winthor } from '~/libraries/WinThor'
import {
  formatDate,
  generateMonthlyDateIntervals,
  IDateInterval
} from '~/utilities/date'
import { normalizeDate } from '~/utilities/normalizations'

import { IRevenuesModel, IOptions } from './IRevenuesModel'

interface IRawAnaliticRevenues
  extends Omit<
    IAnaliticRevenues,
    | 'client'
    | 'rca'
    | 'charge'
    | 'region'
    | 'emitter'
    | 'supervisor'
    | 'paymentPlan'
  > {
  clientCode: number
  clientName: string
  chargeCode: string
  chargeName: string
  rcaCode: number
  rcaName: string
  regionCode: number
  regionName: string
  emitterCode: number
  emitterName: string
  supervisorCode: number
  supervisorName: string
  paymentPlanCode: number
  paymentPlanName: string
}

export function createWinThorRevenuesModel(): IRevenuesModel {
  function parseOptions({
    clients,
    situation
  }: Pick<IOptions, 'situation' | 'clients'>) {
    let params = ''

    switch (clients) {
      case 'all':
        params += ''
        break
      case 'pf':
        params += " AND PCCLIENT.TIPOFJ = 'F' "
        break
      case 'pj':
        params += " AND PCCLIENT.TIPOFJ = 'J' "
        break
    }

    switch (situation) {
      case 'all':
        params += ''
        break
      case 'billed':
        params += " AND PCPEDC.POSICAO = 'F' "
        break
      case 'nonBilled':
        params += " AND PCPEDC.POSICAO NOT IN ('F','C') "
        break
    }

    return params
  }

  async function findMonthRevenues(
    interval: IDateInterval,
    options: IOptions
  ): Promise<IMonthRevenues[]> {
    const { fromFormated, toFormated } = interval

    const params = parseOptions(options)

    const response = await winthor.raw<IMonthRevenues[]>(`
      SELECT
        COUNT(PCPEDC.NUMPED) AS "requestsCount",
        NVL(SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)),0) AS "salesValue",
        NVL(SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTOTAL), 0)), 0.0) AS "amountValue",
        NVL(SUM(NVL(PCPEDC.PRAZOMEDIO, 0) * (NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0))), 0.0) VLPM,
        NVL(SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)) - SUM(((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND I.DATA BETWEEN TRUNC(TO_DATE('${fromFormated}', 'DD/MM/YYYY')) AND TRUNC(TO_DATE('${toFormated}', 'DD/MM/YYYY'))))), 0.0) AS "profitValue",
        NVL(SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLBONIFIC, 0))), 0.0) AS "tableValue",
        NVL(SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND I.DATA BETWEEN TRUNC(TO_DATE('${fromFormated}', 'DD/MM/YYYY')) AND TRUNC(TO_DATE('${toFormated}', 'DD/MM/YYYY')))), 0.0) AS "financialCostValue",
        NVL(SUM(DECODE(PCPEDC.CONDVENDA, 5, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 6, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 11, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 1, PCPEDC.VLBONIFIC, 12, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 0)), 0) AS "bonificationValue",
        NVL(SUM(NVL(PCPEDC.VLFRETE, 0)), 0.0) AS "freightValue",
        CASE WHEN SUM(NVL(PCPEDC.VLOUTRASDESP, 0)) > 0 THEN SUM(NVL(PCPEDC.VLOUTRASDESP, 0)) ELSE 0 END AS "anotherCostValue",
        NVL(SUM(PCPEDC.TOTPESO), 0.0) AS "amountWeight",
        COUNT(DISTINCT PCPEDC.CODCLI) AS "clientMIXCount",
        NVL(MAX((SELECT COUNT(*) FROM PCCLIENT WHERE DTEXCLUSAO IS NULL)), 0.0) AS "clientsCount",
        NVL(SUM(NVL(PCPEDC.NUMITENS, 0)), 0.0) AS "itemsCount",
        NVL(SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 1)), 0.0) AS "salesCount",
        NVL(max(meta.VLVENDAPREV), 0.0) AS "projectionValue",
        NVL(SUM(NVL(PCPEDC.VLOUTRASDESP, 0)), 0.0) AS "anotherCostValue"
      FROM PCPEDC,
        PCPLPAG,
        PCUSUARI,
        (SELECT sum(NVL(PCMETASUP.VLVENDAPREV, 0)) AS VLVENDAPREV FROM PCMETASUP WHERE PCMETASUP.DATA BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY') AND PCMETASUP.CODFILIAL IN ('1', '10', '2', '3', '5', '9')) meta,
        PCCLIENT
      WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
        AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
        AND PCPEDC.DTCANCEL IS NULL
        AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
        AND PCPEDC.DATA BETWEEN TRUNC(TO_DATE('${fromFormated}', 'DD/MM/YYYY')) AND TRUNC(TO_DATE('${toFormated}', 'DD/MM/YYYY'))
        AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
        ${params}
        AND PCCLIENT.CODCLI = PCPEDC.CODCLI
    `)

    return response
  }

  return {
    async findBySupervisor(options: IOptions): Promise<ISupervisorRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<ISupervisorRevenues[]>(`
        SELECT NVL(PCPEDC.CODSUPERVISOR, 0) AS "code",
          NVL(PCSUPERV.NOME, 'N/A') AS "name",
          NVL(COUNT(PCPEDC.NUMPED), 0) AS "requestsCount",
          NVL(COUNT(DISTINCT (PCPEDC.CODUSUR)), 0) AS "rcaCount",
          NVL(MIX_VENDIDO.QTDE, 0.0) AS "salesMIX",
          NVL(AVG(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, PCPEDC.NUMITENS), 0)), 0) AS "itemsCountAverage",
          NVL(SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND)), 0.0) AS "salesValue",
          NVL(SUM((NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND), 0))) - SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)), 0.0) AS "profitValue",
          NVL(SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLBONIFIC, 0))), 0.0) AS "tableValue",
          NVL(SUM(DECODE(PCPEDC.CONDVENDA, 5, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 6, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 11, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 1, NVL(PCPEDC.VLBONIFIC, 0), 12, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 0)), 0.0) AS "bonificationValue",
          NVL(SUM((SELECT SUM(NVL(I.VLCUSTOREAL, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)), 0.0) AS "realCostValue",
          NVL(SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)), 0.0) AS "financialCostValue",
          NVL(SUM((NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND), 0)) * PCPEDC.PRAZOMEDIO) / DECODE(SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND), 0), 0)), 0, 1, SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND), 0), 0))), 0.0) AS "averageTime",
          NVL(COUNT(DISTINCT PCPEDC.CODCLI), 0.0) AS "clientMIXCount",
          NVL(SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 1, (SELECT COUNT(*) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND NVL(I.BONIFIC, 'N') = 'N'), PCPEDC.NUMITENS), 0)), 0.0) AS "itemsCount",
          NVL(MAX(NVL((SELECT SUM(NVL(PCMETASUP.VLVENDAPREV, 0)) FROM PCMETASUP WHERE 0 = 0 AND PCMETASUP.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY') AND PCMETASUP.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND PCMETASUP.CODSUPERVISOR = PCPEDC.CODSUPERVISOR), 0)), 0.0) AS "projectionValue",
          NVL(SUM(NVL(PCPEDC.TOTPESO, 0)), 0.0) AS "amountWeight"
        FROM PCSUPERV,
          PCUSUARI,
          PCPLPAG,
          PCPEDC,
          PCCLIENT,
          (SELECT PCUSUARI.CODSUPERVISOR, count(DISTINCT (PCPEDI.CODPROD)) QTDE
          FROM PCPEDI,
                PCUSUARI
          WHERE NVL(PCPEDI.BONIFIC, 'N') = 'N'
            AND PCPEDI.CODUSUR = PCUSUARI.CODUSUR
            AND EXISTS(SELECT NUMPED FROM PCPEDC WHERE PCPEDC.NUMPED = PCPEDI.NUMPED AND PCPEDC.POSICAO = 'F')
            AND PCPEDI.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          GROUP BY PCUSUARI.CODSUPERVISOR) MIX_VENDIDO
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR (+)
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.CODSUPERVISOR = MIX_VENDIDO.CODSUPERVISOR (+)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          ${params}
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
        GROUP BY PCPEDC.CODSUPERVISOR, PCSUPERV.NOME, MIX_VENDIDO.QTDE
        ORDER BY "salesValue" DESC
      `)

      return response
    },

    async findByMonth(options: IOptions): Promise<IMonthRevenues[]> {
      let result: IMonthRevenues[] = []

      const { periodFrom, periodTo } = options

      const intervals = generateMonthlyDateIntervals(
        normalizeDate(periodFrom),
        normalizeDate(periodTo)
      )

      for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i]

        const revenues = await findMonthRevenues(interval, options)

        result = result.concat(revenues)
      }

      return result
    },

    async findByDeadline(options: IOptions): Promise<IDeadlineRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<IDeadlineRevenues[]>(`
        SELECT PCPEDC.CODPLPAG AS "code",
          PCPLPAG.DESCRICAO AS "description",
          PCPLPAG.NUMPR AS "deadlineCount",
          PCPEDC.PRAZOMEDIO AS "deadline",
          COUNT(PCPEDC.NUMPED) AS "requestsCount",
          SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND), 0)) AS "salesValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLBONIFIC, 0))) AS "tableValue",
          SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND), 0), 0)) - SUM(((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED))) AS "profitValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "financialCostValue",
          SUM(NVL(PCPEDC.TOTPESO, 0)) AS "amountWeight"
        FROM PCPEDC,
          PCPLPAG,
          PCUSUARI,
          PCCLIENT
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          ${params}
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
        GROUP BY PCPEDC.CODPLPAG, PCPLPAG.DESCRICAO, PCPLPAG.NUMPR, PCPEDC.PRAZOMEDIO
        ORDER BY "salesValue" DESC
      `)

      return response
    },

    async findByEvolution(options: IOptions): Promise<IEvolutionRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const situationParams = parseOptions({
        clients: 'all',
        situation: options.situation
      })
      const clientsParams = parseOptions({
        clients: options.clients,
        situation: 'all'
      })

      const response = await winthor.raw<IEvolutionRevenues[]>(`
        SELECT PCPEDC.DATA AS "date",
          COUNT(PCPEDC.NUMPED) AS "requestsCount",
          MAX((SELECT COUNT(DISTINCT (I.CODPROD)) FROM PCPEDI I, PCPEDC C WHERE I.NUMPED = C.NUMPED AND C.NUMPED = PCPEDC.NUMPED AND C.CODFILIAL = PCPEDC.CODFILIAL AND I.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY') AND NVL(I.BONIFIC, 'N') = 'N' AND I.DATA = PCPEDC.DATA AND EXISTS(SELECT * FROM PCPEDC WHERE PCPEDC.NUMPED = I.NUMPED AND 1 = 1 ${situationParams}))) AS "salesMIXCount",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, NVL(PCPEDC.VLATEND, 0))) AS "salesValue",
          SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND), 0), 0)) - SUM(((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED))) AS "profitValue",
          SUM(PCPEDC.TOTPESO) AS "amountWeight",
          COUNT(DISTINCT (PCPEDC.CODCLI)) AS "positivedClientsCount",
          NVL(MAX((SELECT SUM(VLVENDAPREV) FROM PCMETASUP WHERE DATA = PCPEDC.DATA AND CODFILIAL IN ('1', '10', '2', '3', '5', '9'))), 0) AS "projectionValue"
        FROM PCPEDC,
          PCPLPAG,
          PCUSUARI,
          PCCLIENT
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          ${clientsParams}
          ${situationParams}
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
        GROUP BY PCPEDC.DATA, PCPEDC.CODFILIAL
        ORDER BY PCPEDC.DATA
      `)

      return response
    },

    async findByClass(options: IOptions): Promise<IClassRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<IClassRevenues[]>(`
        SELECT PCCLIENT.VIP AS "vip",
          COUNT(PCPEDC.NUMPED) AS "requestsCount",
          SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)) AS "salesValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLBONIFIC, 0))) AS "tableValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND I.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY'))) AS "financialCostValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 6, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 11, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 1, NVL(PCPEDC.VLBONIFIC, 0), 12, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 0)) AS "bonificationValue",
          SUM(NVL(PCPEDC.TOTPESO, 0)) AS "amountWeight",
          SUM(NVL(PCPEDC.VLOUTRASDESP, 0)) AS "anotherCostValue",
          SUM(NVL(PCPEDC.VLFRETE, 0)) AS "freightValue"
        FROM PCCLIENT,
          PCPLPAG,
          PCPEDC,
          PCUSUARI
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODCLI = PCCLIENT.CODCLI
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          ${params}
        GROUP BY PCCLIENT.VIP
      `)

      return response
    },

    async findByClassOrigin(options: IOptions): Promise<IClassRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<IClassRevenues[]>(`
        SELECT PCPEDC.ORIGEMPED AS "origin",
          COUNT(PCPEDC.NUMPED) AS "requestsCount",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLOUTRASDESP, 0))) AS "salesValue",
          SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLOUTRASDESP, 0)), 0), 0)) - SUM(((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND I.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')))) AS "profitValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLBONIFIC, 0))) AS "tableValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND I.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY'))) AS "financialCostValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 6, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 11, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 1, NVL(PCPEDC.VLBONIFIC, 0), 12, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 0)) AS "bonificationValue",
          SUM(PCPEDC.TOTPESO) AS "amountWeight"
        FROM PCPEDC,
          PCPLPAG,
          PCUSUARI,
          PCCLIENT
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          ${params}
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
        GROUP BY PCPEDC.ORIGEMPED
        ORDER BY PCPEDC.ORIGEMPED, "salesValue" DESC
      `)

      return response
    },

    async findByClassPosition(options: IOptions): Promise<IClassRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<IClassRevenues[]>(`
        SELECT PCPEDC.POSICAO AS "position",
          COUNT(PCPEDC.NUMPED) AS "requestsCount",
          SUM(PCPEDC.TOTPESO) AS "amountWeight",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, NVL(PCPEDC.VLATEND - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLOUTRASDESP, 0), 0))) AS "salesValue",
          SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLOUTRASDESP, 0)), 0), 0)) - SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "profitValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLBONIFIC, 0))) AS "tableValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 6, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 11, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 1, NVL(PCPEDC.VLBONIFIC, 0), 12, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 0)) AS "bonificationValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "financialCostValue"
        FROM PCPEDC,
          PCPLPAG,
          PCUSUARI,
          PCCLIENT
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
          ${params}
        GROUP BY PCPEDC.POSICAO
        ORDER BY PCPEDC.POSICAO, "salesValue" DESC
      `)

      return response
    },

    async findByClassSellType(options: IOptions): Promise<IClassRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<IClassRevenues[]>(`
        SELECT PCPEDC.CONDVENDA AS "code",
          COUNT(PCPEDC.NUMPED) AS "requestsCount",
          SUM(PCPEDC.TOTPESO) AS "amountWeight",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, NVL(PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0), 0))) AS "salesValue",
          SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0), 0)) - SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "profitValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLBONIFIC, 0))) AS "tableValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 6, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 11, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 1, NVL(PCPEDC.VLBONIFIC, 0), 12, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 0)) AS "bonificationValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "financialCostValue"
        FROM PCPEDC,
          PCPLPAG,
          PCUSUARI,
          PCCLIENT
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
          ${params}
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
        GROUP BY PCPEDC.CONDVENDA
        ORDER BY PCPEDC.CONDVENDA, "salesValue" DESC
      `)

      return response
    },

    async findByRegion(options: IOptions): Promise<IRegionRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<IRegionRevenues[]>(`
        SELECT PCPEDC.NUMREGIAO AS "code",
          PCREGIAO.REGIAO AS "name",
          COUNT(PCPEDC.NUMPED) AS "itemsCount",
          SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)) AS "salesValue",
          SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, (PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0))), 0), 0)) - SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "profitValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLBONIFIC, 0))) AS "tableValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) "financialCostValue",
          SUM(NVL(PCPEDC.TOTPESO, 0)) AS "amountWeight",
          SUM(NVL(PCPEDC.VLOUTRASDESP, 0)) "anotherCostValue",
          SUM(NVL(PCPEDC.VLFRETE, 0)) "freightValue"
        FROM PCREGIAO,
          PCPLPAG,
          PCPEDC,
          PCUSUARI,
          PCCLIENT
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.NUMREGIAO = PCREGIAO.NUMREGIAO
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          ${params}
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
        GROUP BY PCPEDC.NUMREGIAO, PCREGIAO.REGIAO
        ORDER BY "salesValue" DESC
      `)

      return response
    },

    async findByEmitter(options: IOptions): Promise<IEmitterRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<IEmitterRevenues[]>(`
        SELECT PCPEDC.ORIGEMPED AS "origin",
          PCPEDC.CODEMITENTE AS "code",
          PCEMPR.NOME AS "name",
          COUNT(PCPEDC.NUMPED) AS "requestsCount",
          SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)) AS "salesValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLBONIFIC, 0))) AS "tableValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND I.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY'))) AS "financialCostValue",
          SUM(NVL(PCPEDC.TOTPESO, 0)) AS "amountWeight",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 6, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 11, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 1, NVL(PCPEDC.VLBONIFIC, 0), 12, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 0)) AS "bonificationValue"
        FROM PCPEDC,
          PCEMPR,
          PCPLPAG,
          PCUSUARI,
          PCCLIENT
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODEMITENTE = PCEMPR.MATRICULA
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          ${params}
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
        GROUP BY PCPEDC.CODEMITENTE, PCEMPR.NOME, PCPEDC.ORIGEMPED
        ORDER BY "salesValue" DESC
      `)

      return response
    },

    async findByAnalitic(options: IOptions): Promise<IAnaliticRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<IRawAnaliticRevenues[]>(`
        SELECT PCPEDC.NUMPED AS "number",
          PCPEDC.CODCLI AS "clientCode",
          PCCLIENT.CLIENTE AS "clientName",
          PCPEDC.PRAZOMEDIO AS "averageTime",
          PCPEDC.CODUSUR AS "rcaCode",
          PCUSUARI.NOME AS "rcaName",
          PCPEDC.DATA AS "emittedAt",
          (NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)) AS "salesValue",
          (NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)) - ((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND I.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY'))) AS "profitValue",
          DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLBONIFIC, 0)) AS "tableValue",
          (DECODE(PCPEDC.CONDVENDA, 5, NVL(NVL(PCPEDC.VLBONIFIC, 0), PCPEDC.VLTABELA), 6, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 11, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 1, NVL(PCPEDC.VLBONIFIC, 0), 12, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 0)) AS "bonificationValue",
          ((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND I.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY'))) AS "financialCostValue",
          PCPEDC.CODSUPERVISOR AS "supervisorCode",
          NVL(PCSUPERV.NOME, '* NAO VINCULADO *') AS "supervisorName",
          PCPEDC.CODEMITENTE AS "emitterCode",
          (SELECT PCEMPR.NOME FROM PCEMPR WHERE PCEMPR.MATRICULA = PCPEDC.CODEMITENTE) AS "emitterName",
          PCPEDC.CODCOB AS "chargeCode",
          (SELECT PCCOB.COBRANCA FROM PCCOB WHERE PCCOB.CODCOB = PCPEDC.CODCOB) AS "chargeName",
          NVL(PCPEDC.NUMREGIAO, 0) AS "regionCode",
          NVL((SELECT PCREGIAO.REGIAO FROM PCREGIAO WHERE PCREGIAO.NUMREGIAO = PCPEDC.NUMREGIAO), 'N/A') AS "regionName",
          NVL(PCPEDC.NUMCAIXA, 0) AS "boxNumber",
          PCPEDC.CODPLPAG AS "paymentPlanCode",
          PCPLPAG.DESCRICAO AS "paymentPlanName",
          (NVL(PCPEDC.VLOUTRASDESP, 0)) AS "anotherCostValue",
          (NVL(PCPEDC.VLFRETE, 0)) AS "freightValue"
        FROM PCCLIENT,
          PCUSUARI,
          PCSUPERV,
          PCPLPAG,
          PCPEDC,
          PCPRACA
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODPRACA = PCPRACA.CODPRACA (+)
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.CODCLI = PCCLIENT.CODCLI
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR (+)
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          ${params}
        ORDER BY PCSUPERV.CODSUPERVISOR, PCPEDC.CODUSUR, PCPEDC.VLATEND DESC
      `)

      return response.map(row => ({
        rca: {
          code: row.rcaCode,
          name: row.rcaName
        },
        charge: {
          code: row.chargeCode,
          name: row.chargeName
        },
        client: {
          code: row.clientCode,
          name: row.clientName
        },
        region: {
          code: row.regionCode,
          name: row.regionName
        },
        emitter: {
          code: row.emitterCode,
          name: row.emitterName
        },
        supervisor: {
          code: row.supervisorCode,
          name: row.supervisorName
        },
        paymentPlan: {
          code: row.paymentPlanCode,
          name: row.paymentPlanName
        },
        number: row.number,
        anotherCostValue: row.anotherCostValue,
        averageTime: row.averageTime,
        bonificationValue: row.bonificationValue,
        boxNumber: row.boxNumber,
        emittedAt: row.emittedAt,
        financialCostValue: row.financialCostValue,
        freightValue: row.freightValue,
        profitValue: row.profitValue,
        salesValue: row.salesValue,
        tableValue: row.tableValue
      }))
    },

    async findByCharge(options: IOptions): Promise<IChargeRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<IChargeRevenues[]>(`
        SELECT PCPEDC.CODCOB AS "code",
          PCCOB.COBRANCA AS "name",
          COUNT(PCPEDC.NUMPED) AS "requestsCount",
          SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)) AS "salesValue",
          SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0), 0)) - SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "profitValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLBONIFIC, 0))) AS "tableValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "financialCostValue",
          SUM(NVL(PCPEDC.VLOUTRASDESP, 0)) AS "anotherCostValue",
          SUM(NVL(PCPEDC.VLFRETE, 0)) AS "freightValue"
        FROM PCPEDC,
          PCCOB,
          PCPLPAG,
          PCUSUARI,
          PCCLIENT
        WHERE PCPEDC.CODCOB = PCCOB.CODCOB
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          ${params}
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
        GROUP BY PCPEDC.CODCOB, PCCOB.COBRANCA
        ORDER BY "salesValue" DESC
      `)

      return response
    },

    async findByCheckOut(options: IOptions): Promise<ICheckOutRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<ICheckOutRevenues[]>(`
        SELECT NVL(PCPEDC.NUMCAIXA, 0) AS "code",
          COUNT(PCPEDC.NUMPED) AS "requestsCount",
          COUNT(DISTINCT (PCPEDC.CODUSUR)) AS "rcaCount",
          AVG(NVL(PCPEDC.NUMITENS, 0)) AS "averageItemsCount",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, NVL(PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0), 0))) AS "salesValue",
          SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0), 0)) - SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "profitValue",
          SUM((NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)) * PCPEDC.PRAZOMEDIO) / DECODE(SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)), 0, 1, SUM(NVL(PCPEDC.VLATEND, 0) - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0))) AS "clDaysCount",
          SUM((NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)) * PCPEDC.PRAZOMEDIO) / DECODE(SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)), 0, 1, SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLFRETE, 0)), 0))) AS "daysCount",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLBONIFIC, 0) - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0))) AS "tableValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOREAL, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "realCostValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "financialCostValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 6, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 11, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 1, NVL(PCPEDC.VLBONIFIC, 0), 12, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 0)) AS "bonificationValue",
          SUM(NVL(PCPEDC.VLOUTRASDESP, 0)) AS "anotherCostValue",
          SUM(NVL(PCPEDC.VLFRETE, 0)) AS "freightValue"
        FROM PCUSUARI,
          PCPLPAG,
          PCPEDC,
          PCCLIENT
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          ${params}
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
        GROUP BY PCPEDC.NUMCAIXA
        ORDER BY "salesValue" DESC
      `)

      return response
    },

    async findBySalesOrigin(
      options: IOptions
    ): Promise<ISalesOriginRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<ISalesOriginRevenues[]>(`
        SELECT PCPEDC.ORIGEMPED AS "origin",
          COUNT(PCPEDC.NUMPED) AS "requestsCount",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLOUTRASDESP, 0))) AS "salesValue",
          SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLOUTRASDESP, 0)), 0), 0)) - SUM(((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND I.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')))) AS "profitValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLBONIFIC, 0))) AS "tableValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND I.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY'))) AS "financialCostValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 6, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 11, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 1, NVL(PCPEDC.VLBONIFIC, 0), 12, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 0)) AS "bonificationValue",
          SUM(PCPEDC.TOTPESO) AS "amountWeight"
        FROM PCPEDC,
          PCPLPAG,
          PCUSUARI,
          PCCLIENT
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          ${params}
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
        GROUP BY PCPEDC.ORIGEMPED
        ORDER BY PCPEDC.ORIGEMPED, "salesValue" DESC
      `)

      return response
    },

    async findBySalesOriginEmitter(
      origin: string,
      options: IOptions
    ): Promise<ISalesOriginRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<ISalesOriginRevenues[]>(`
        SELECT PCPEDC.CODEMITENTE AS "code",
          PCEMPR.NOME AS "name",
          COUNT(PCPEDC.NUMPED) AS "requestsCount",
          SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)) AS "salesValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLBONIFIC, 0))) AS "tableValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND I.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY'))) AS "financialCostValue",
          SUM(NVL(PCPEDC.TOTPESO, 0)) AS "amountWeight",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 6, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 11, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 1, NVL(PCPEDC.VLBONIFIC, 0), 12, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 0)) AS "bonificationValue"
        FROM PCPEDC,
          PCEMPR,
          PCPLPAG,
          PCUSUARI,
          PCCLIENT
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODEMITENTE = PCEMPR.MATRICULA
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
          AND ORIGEMPED = '${origin}'
          ${params}
        GROUP BY PCPEDC.CODEMITENTE, PCEMPR.NOME
        ORDER BY "salesValue" DESC
      `)

      return response
    },

    async findBySalesOriginSupervisor(
      origin: string,
      options: IOptions
    ): Promise<ISalesOriginRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<ISalesOriginRevenues[]>(`
        SELECT PCPEDC.CODSUPERVISOR AS "code",
          NVL(PCSUPERV.NOME, '* NAO VINCULADO *') AS "name",
          COUNT(PCPEDC.NUMPED) AS "requestsCount",
          COUNT(DISTINCT (PCPEDC.CODUSUR)) AS "rcaCount",
          AVG(NVL(PCPEDC.NUMITENS, 0)) AS "averageItemsCount",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0))) AS "salesValue",
          SUM((NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0))) - SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "profitValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLBONIFIC, 0))) AS "tableValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 6, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 11, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 1, NVL(PCPEDC.VLBONIFIC, 0), 12, NVL(PCPEDC.VLBONIFIC, PCPEDC.VLTABELA), 0)) AS "bonificationValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOREAL, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "realCostValue",
          SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED)) AS "financialCostValue",
          SUM((NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)) * PCPEDC.PRAZOMEDIO) / DECODE(SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0), 0)), 0, 1, SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0), 0))) AS "clDaysCount",
          COUNT(DISTINCT PCPEDC.CODCLI) AS "clientMIXCount",
          SUM(NVL((PCPEDC.NUMITENS), 0)) AS "itemsCount",
          MAX(NVL((SELECT SUM(NVL(PCMETASUP.VLVENDAPREV, 0)) FROM PCMETASUP WHERE PCMETASUP.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY') AND PCMETASUP.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND PCMETASUP.CODSUPERVISOR (+) = PCPEDC.CODSUPERVISOR), 0)) AS "projectionValue",
          SUM(NVL(PCPEDC.TOTPESO, 0)) AS "amountWeight",
          SUM(NVL(PCPEDC.VLOUTRASDESP, 0)) AS "anotherCostValue",
          SUM(NVL(PCPEDC.VLFRETE, 0)) AS "freightValue"
        FROM PCSUPERV,
          PCUSUARI,
          PCPLPAG,
          PCPEDC,
          PCCLIENT
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDC.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR (+)
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
          AND ORIGEMPED = '${origin}'
          ${params}
        GROUP BY PCPEDC.CODSUPERVISOR, NVL(PCSUPERV.NOME, '* NAO VINCULADO *')
        ORDER BY "salesValue" DESC
      `)

      return response
    },

    async findByActuationArea(
      options: IOptions
    ): Promise<IActuationAreaRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<IActuationAreaRevenues[]>(`
        SELECT NVL(PCUSUARI.AREAATUACAO, 'N/A') AS "code",
          NVL(PCAREAATUACAO.DESCRICAO, 'N/A') AS "description",
          NVL(COUNT(PCPEDC.NUMPED), 0) AS "requestsCount",
          NVL(SUM(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0)), 0)), 0.0) AS "salesValue",
          NVL(SUM(NVL(NVL(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, (PCPEDC.VLATEND - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0))), 0), 0)) - SUM(((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND I.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')))), 0.0) AS "profitValue",
          NVL(SUM(DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, PCPEDC.VLTABELA - NVL(PCPEDC.VLOUTRASDESP, 0) - NVL(PCPEDC.VLFRETE, 0) - NVL(PCPEDC.VLBONIFIC, 0))), 0.0) AS "tableValue",
          NVL(SUM((SELECT SUM(NVL(I.VLCUSTOFIN, 0) * NVL(I.QT, 0)) FROM PCPEDI I WHERE I.NUMPED = PCPEDC.NUMPED AND I.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY'))), 0.0) AS "financialCostValue",
          NVL(SUM(NVL(PCPEDC.TOTPESO, 0)), 0.0) AS "amountWeight",
          NVL(SUM(NVL(PCPEDC.VLOUTRASDESP, 0)), 0.0) AS "anotherCostValue",
          NVL(SUM(NVL(PCPEDC.VLFRETE, 0)), 0.0) AS "freightValue"
        FROM PCPLPAG,
          PCPEDC,
          PCUSUARI,
          PCAREAATUACAO,
          PCCLIENT
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCUSUARI.AREAATUACAO = PCAREAATUACAO.CODIGO (+)
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          ${params}
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
        GROUP BY PCUSUARI.AREAATUACAO, PCAREAATUACAO.DESCRICAO
        ORDER BY "salesValue" DESC
      `)

      return response
    },

    async findByProvider(options: IOptions): Promise<IProviderRevenues[]> {
      const from = formatDate(normalizeDate(options.periodFrom))
      const to = formatDate(normalizeDate(options.periodTo))
      const params = parseOptions(options)

      const response = await winthor.raw<IProviderRevenues[]>(`
        SELECT PCPRODUT.CODFORNEC AS "code",
          PCFORNEC.FORNECEDOR AS "name",
          COUNT(DISTINCT PCPEDI.NUMPED) AS "requestsCount",
          COUNT(DISTINCT (PCPEDI.CODUSUR)) AS "rcaCount",
          COUNT(PCPEDI.CODPROD) / COUNT(DISTINCT PCPEDC.NUMPED) AS "averageItemsCount",
          COUNT(PCPEDI.CODPROD) AS "itemsCount",
          SUM(PCPEDI.QT * DECODE(NVL(paramfilial.OBTERCOMOVARCHAR2('CON_UTILIZAVENDAPOREMBALAGEM'), 'N'), 'S', DECODE(NVL((SELECT NVL(PCEMBALAGEM.PESOBRUTO, 0) FROM PCEMBALAGEM WHERE PCEMBALAGEM.CODFILIAL = 1 AND PCEMBALAGEM.CODPROD = PCPEDI.CODPROD AND PCEMBALAGEM.CODAUXILIAR = PCPEDI.CODAUXILIAR), 0), 0, PCPRODUT.PESOBRUTO, (SELECT NVL(PCEMBALAGEM.PESOBRUTO, 0) / DECODE(NVL(PCEMBALAGEM.QTUNIT, 0), 0, 1, PCEMBALAGEM.QTUNIT) FROM PCEMBALAGEM WHERE PCEMBALAGEM.CODFILIAL = 1 AND PCEMBALAGEM.CODPROD = PCPEDI.CODPROD AND PCEMBALAGEM.CODAUXILIAR = PCPEDI.CODAUXILIAR)), PCPRODUT.PESOBRUTO)) AS "amountWeight",
          COUNT(DISTINCT PCPEDC.CODCLI) AS "clientMIXCount",
          SUM(CASE WHEN NVL(PCPEDI.BONIFIC, 'N') = 'N' THEN DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, NVL(PCPEDI.VLSUBTOTITEM, (DECODE(NVL(PCPEDI.TRUNCARITEM, 'N'), 'N', ROUND((NVL(PCPEDI.QT, 0)) * NVL(PCPEDI.PVENDA, 0), 2), TRUNC((NVL(PCPEDI.QT, 0)) * NVL(PCPEDI.PVENDA, 0), 2))))) ELSE 0 END) - SUM(CASE WHEN NVL(PCPEDI.BONIFIC, 'N') = 'N' THEN DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, NVL(PCPEDI.qt, 0) * (0 + 0)) ELSE 0 END) AS "salesValue",
          SUM(CASE WHEN NVL(PCPEDI.BONIFIC, 'N') = 'N' THEN DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, NVL(PCPEDI.VLSUBTOTITEM, NVL(PCPEDI.qt, 0) * NVL(PCPEDI.PTABELA, 0))) ELSE 0 END) - SUM(CASE WHEN NVL(PCPEDI.BONIFIC, 'N') = 'N' THEN DECODE(PCPEDC.CONDVENDA, 5, 0, 6, 0, 11, 0, 12, 0, NVL(PCPEDI.qt, 0) * (0 + 0)) ELSE 0 END) AS "tableValue",
          SUM(NVL(PCPEDI.qt, 0) * NVL(PCPEDI.VLCUSTOFIN, 0)) - SUM(0 + 0) AS "financialCostValue",
          SUM(NVL(PCPEDI.QT, 0) * NVL(PCPEDI.VLCUSTOREAL, 0)) - SUM(0 + 0) AS "realCostValue",
          SUM(DECODE(PCPEDC.CONDVENDA, 5, NVL(PCPEDI.QT, 0) * DECODE(NVL(PCPEDI.PBONIFIC, 0), 0, PCPEDI.PTABELA - 0 - 0, PCPEDI.PBONIFIC - 0 - 0), 6, NVL(PCPEDI.QT, 0) * DECODE(NVL(PCPEDI.PBONIFIC, 0), 0, PCPEDI.PTABELA - 0 - 0, PCPEDI.PBONIFIC - 0 - 0), 1, CASE WHEN NVL(PCPEDI.BONIFIC, 'N') <> 'N' THEN NVL(PCPEDI.QT, 0) * DECODE(NVL(PCPEDI.PBONIFIC, 0), 0, PCPEDI.PTABELA - 0 - 0, PCPEDI.PBONIFIC - 0 - 0) ELSE 0 END, 11, NVL(PCPEDI.QT, 0) * DECODE(NVL(PCPEDI.PBONIFIC, 0), 0, PCPEDI.PTABELA - 0 - 0, PCPEDI.PBONIFIC - 0 - 0), 12, NVL(PCPEDI.QT, 0) * DECODE(NVL(PBONIFIC, 0), 0, PCPEDI.PTABELA - 0 - 0, PCPEDI.PBONIFIC - 0 - 0), 0)) AS "bonificationValue",
          MAX(NVL((SELECT SUM(NVL(PCMETAFORNEC.VLVENDAPREV, 0)) FROM PCMETAFORNEC WHERE 0 = 0 AND PCMETAFORNEC.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY') AND PCMETAFORNEC.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND PCMETAFORNEC.CODFORNEC = PCPRODUT.CODFORNEC), 0)) "projectionValue"
        FROM PCFORNEC,
          PCPRODUT,
          PCPEDI,
          PCUSUARI,
          PCPLPAG,
          PCPEDC,
          PCCLIENT
        WHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG
          AND PCPEDC.CODUSUR = PCUSUARI.CODUSUR
          AND PCPEDI.NUMPED = PCPEDC.NUMPED
          AND PCPEDI.CODPROD = PCPRODUT.CODPROD
          AND PCPEDI.DATA = PCPEDC.DATA
          AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC (+)
          AND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)
          AND PCPEDC.DTCANCEL IS NULL
          AND PCPEDI.DATA BETWEEN TO_DATE('${from}', 'DD/MM/YYYY') AND TO_DATE('${to}', 'DD/MM/YYYY')
          AND PCPEDC.CODFILIAL IN ('1', '10', '2', '3', '5', '9')
          ${params}
          AND PCCLIENT.CODCLI = PCPEDC.CODCLI
        GROUP BY PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR
        ORDER BY "salesValue" DESC
      `)

      return response
    }
  }
}
