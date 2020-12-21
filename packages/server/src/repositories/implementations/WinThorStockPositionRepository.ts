import { subDays } from 'date-fns'
import {
  GeneralStockPosition,
  SyntheticMovePosition,
  MasterPosition,
  ComparativePosition
} from 'entities/StockPosition'
import { winthor } from 'libs/knex-winthor'
import {
  ComparativeOptions,
  IStockPositionRepository,
  Options,
  SyntheticOptions
} from 'repositories/IStockPositionRepository'
import { formatDate, normalizeDate } from 'utils/date-intervals'

export class WinThorStockPositionRepository
  implements IStockPositionRepository {
  async findGeneralStock(options: Options): Promise<GeneralStockPosition[]> {
    const { regions, observation } = options

    let params = this.formatOptions(options)

    if (options.branch) {
      params += ` AND ESTOQUE.CODFILIAL = '${options.branch}'`
    }

    if (options.salesClass) {
      params += ` AND PCPRODUT.CLASSEVENDA = '${options.salesClass}'`
    }

    if (options.class) {
      params += ` AND PCPRODUT.CLASSE = '${options.class}'`
    }

    if (options.stock === 'ofDay') {
      params += ` AND PCHISTEST.DATA = TO_DATE('${formatDate(
        normalizeDate(options.stockDay)
      )}', 'DD/MM/YYYY')'`
    }

    if (observation !== 'all') {
      params +=
        observation === 'active'
          ? " AND 'FL' NOT IN NVL((SELECT MAX(DECODE(X.FORALINHA,'S','FL','')) FROM PCPRODFILIAL X WHERE X.CODPROD = PCEST.CODPROD AND X.CODFILIAL = PCEST.CODFILIAL ), NVL(PCPRODUT.OBS2,' ' ))"
          : " AND 'FL' IN NVL((SELECT MAX(DECODE(X.FORALINHA,'S','FL','')) FROM PCPRODFILIAL X WHERE X.CODPROD = PCEST.CODPROD AND X.CODFILIAL = PCEST.CODFILIAL), NVL(PCPRODUT.OBS2,' ' ))"
    }

    const regionsFormated = regions.join(', ')

    const response = await winthor.raw<GeneralStockPosition[]>(`
      SELECT PCPRODUT.CODPROD,
        NVL(PCPRODUT.DESCRICAO, '-')                                                     DESCRICAO,
        NVL(PCPRODUT.QTUNITCX, 0)                                                        QTUNITCX,
        NVL(PCMARCA.MARCA, '-')                                                          MARCA,
        NVL(PCLINHAPROD.DESCRICAO, '-')                                                  LINHAPROD,
        PCPRODUT.CODMARCA,
        NVL(PCPRODUT.CODLINHAPROD, 0)                                                    CODLINHA,
        NVL(PCPRODUT.EMBALAGEM, '-')                                                     EMBALAGEM,
        NVL(PCPRODUT.CLASSE, '-')                                                        CLASSE,
        MAX(PCEST.DTULTFAT)                                                              DTULTFAT,
        NVL(PCPRODUT.CLASSEVENDA, '-')                                                   CLASSEVENDA,
        PCPRODUT.NUMORIGINAL,
        NVL(PC.VALOR, 0)                                                                 PRECOPOREMBALAGEM,
        NVL(SUM(PCEST.QTULTENT), 0)                                                              QTULTENT,
        SUM(PCEST.CUSTOULTENT * PCEST.QTESTGER)                                          CUSTOULTENT2,
        SUM(PCEST.QTESTGER / DECODE(NVL(PCPRODUT.QTUNITCX, 0), 0, 1, PCPRODUT.QTUNITCX)) QTESTOQUECX,
        SUM(PCEST.QTESTGER)                                                              QTESTOQUE,
        SUM(((PCEST.QTESTGER) * (PCPRODUT.PESOLIQ)))                                     PESOLIQ,
        SUM(NVL(PCEST.QTESTGER, 0) * NVL(PCEST.CUSTOREP, 0))                             VLCUSTOREP,
        SUM(NVL(PCEST.QTESTGER, 0) * NVL(PCPRODUT.CUSTOPROXIMACOMPRA, 0))                VLCUSTOPROX,
        SUM(NVL(PCEST.QTESTGER, 0) * NVL(PCEST.CUSTOFIN, 0))                             VLCUSTOFIN,
        SUM(NVL(PCEST.QTESTGER, 0) * NVL(PCEST.CUSTOULTENT, 0))                          CUSTOULTENT,
        SUM(NVL(PCEST.QTESTGER, 0) * NVL(PCEST.VALORULTENT, 0))                          VALORULTENT,
        SUM(NVL(PCEST.QTESTGER, 0) * NVL(PCEST.CUSTOREAL, 0))                            VLCUSTOREAL,
        SUM(NVL(PCEST.QTESTGER, 0) * NVL(PCEST.CUSTOULTPEDCOMPRA, 0))                    CUSTOULTPEDCOMPRA,
        SUM(NVL(PCEST.QTESTGER, 0) * NVL(PCEST.CUSTOULTENTFIN, 0))                       CUSTOULTENTFIN,
        SUM(NVL(PCEST.QTESTGER, 0) * NVL(PCEST.CUSTOPROXIMACOMPRA, 0))                   CUSTOPROXIMACOMPRA,
        SUM(NVL(PCEST.QTESTGER, 0) * NVL(PCPRODUT.CUSTOFORNEC, 0))                       CUSTOFORNEC,
        CASE WHEN PC.VALOR = 'S' THEN (SUM(NVL(PCEST.QTESTGER, 0) * (SELECT NVL(PCEMBALAGEM.PVENDA, 0) FROM PCEMBALAGEM WHERE PCEMBALAGEM.CODFILIAL = PCEST.CODFILIAL AND (PCEMBALAGEM.CODPROD = PCEST.CODPROD) AND PCEMBALAGEM.QTUNIT = 1 AND ROWNUM = 1))) ELSE (SUM(NVL(PCEST.QTESTGER, 0) * (SELECT NVL(PCTABPR.PVENDA, 0) FROM PCTABPR WHERE PCTABPR.CODPROD = PCEST.CODPROD AND (PCTABPR.NUMREGIAO IN (${regionsFormated}))))) END VLPVENDA,
        CASE WHEN PC.VALOR = 'S' THEN (SUM(NVL(PCEST.QTESTGER, 0) * (SELECT NVL(PCEMBALAGEM.PTABELA, 0) FROM PCEMBALAGEM WHERE PCEMBALAGEM.CODFILIAL = PCEST.CODFILIAL AND (PCEMBALAGEM.CODPROD = PCEST.CODPROD) AND PCEMBALAGEM.QTUNIT = 1 AND ROWNUM = 1))) ELSE (SUM(NVL(PCEST.QTESTGER, 0) * (SELECT NVL(PCTABPR.PTABELA, 0) FROM PCTABPR WHERE PCTABPR.CODPROD = PCEST.CODPROD AND (PCTABPR.NUMREGIAO IN (${regionsFormated}))))) END PTABELA,
        NVL(MAX(PCEST.DTULTENT), TO_DATE('01/01/2000', 'DD/MM/YYYY'))                                                              DTULTENT,
        MAX(PCEST.DTULTSAIDA)                                                            DTULTSAIDA,
        MAX(NVL(PCEST.CUSTOFIN, 0))              AS                                      CUSTOFIN_2,
        MAX(NVL(PCEST.CUSTOREP, 0))              AS                                      CUSTOREP_2,
        MAX(NVL(PCEST.CUSTOREAL, 0))             AS                                      CUSTOREAL_2,
        MAX(NVL(PCEST.CUSTOULTENT, 0))           AS                                      CUSTOULTENT_2,
        MAX(NVL(PCPRODUT.CUSTOPROXIMACOMPRA, 0)) AS                                      CUSTOPROX_2,
        MAX(NVL(PCEST.VALORULTENT, 0))           AS                                      VALORULTENT_2,
        MAX(NVL(PCEST.CUSTOULTPEDCOMPRA, 0))                                             CUSTOULTPEDCOMPRA_2,
        MAX(NVL(PCEST.CUSTOULTENTFIN, 0))                                                CUSTOULTENTFIN_2,
        MAX(NVL(PCEST.CUSTOPROXIMACOMPRA, 0))                                            CUSTOPROXIMACOMPRA_2,
        MAX(NVL(PCPRODUT.CUSTOFORNEC, 0))                                                CUSTOFORNEC_2,
        CASE WHEN PC.VALOR = 'S' THEN MAX((SELECT NVL(PCEMBALAGEM.PVENDA, 0) FROM PCEMBALAGEM WHERE PCEMBALAGEM.CODFILIAL = PCEST.CODFILIAL AND PCEMBALAGEM.CODPROD = PCEST.CODPROD AND PCEMBALAGEM.QTUNIT = 1 AND ROWNUM = 1)) ELSE MAX((SELECT NVL(PCTABPR.PVENDA, 0) FROM PCTABPR WHERE PCTABPR.CODPROD = PCEST.CODPROD AND PCTABPR.NUMREGIAO IN (${regionsFormated}))) END AS PVENDA_2,
        PCPRODUT.CODEPTO,
        PCDEPTO.DESCRICAO                                                                DEPARTAMENTO,
        PCPRODUT.CODSEC,
        PCPRODUT.OBS2,
        PCSECAO.DESCRICAO                                                                SECAO,
        PCPRODUT.CODFORNEC,
        PCFORNEC.CODFORNECPRINC,
        NVL(PCFORNEC.FANTASIA, '-') FANTASIA,
        PCFORNEC.FORNECEDOR,
        NVL(PCPRODUT.CODFAB, '-') CODFAB,
        NVL(PCPRODUT.NBM, '-') NBM,
        NVL(PCPRODUT.MULTIPLO, 0.0) MULTIPLO,
        NVL(PCPRODUT.MULTIPLOCOMPRAS, 0.0) MULTIPLOCOMPRAS
      FROM PCPRODUT, PCEST, PCFORNEC, PCMARCA, PCLINHAPROD, PCDEPTO, PCSECAO, (SELECT CODFILIAL, VALOR FROM PCPARAMFILIAL WHERE NOME = 'FIL_PRECOPOREMBALAGEM') PC
      WHERE PCPRODUT.CODPROD = PCEST.CODPROD AND PCPRODUT.CODMARCA = PCMARCA.CODMARCA (+) AND PCPRODUT.CODLINHAPROD = PCLINHAPROD.CODLINHA (+) AND PCEST.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND PCPRODUT.DTEXCLUSAO IS NULL AND PCEST.CODFILIAL = PC.CODFILIAL AND PCPRODUT.CODEPTO = PCDEPTO.CODEPTO AND PCPRODUT.CODSEC = PCSECAO.CODSEC (+) AND NVL(PCDEPTO.TIPOMERC, 'XX') NOT IN ('IM', 'CI') AND PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC ${params}
      GROUP BY PCPRODUT.CODPROD, NVL(PCPRODUT.DESCRICAO, '-'), PCPRODUT.NUMORIGINAL, NVL(PCPRODUT.EMBALAGEM, '-'), PCPRODUT.CODEPTO, PCDEPTO.DESCRICAO, PCPRODUT.CODSEC, PCPRODUT.OBS2, PCSECAO.DESCRICAO, PCPRODUT.CODFORNEC, PCFORNEC.FORNECEDOR, NVL(PCFORNEC.FANTASIA, '-'), PCFORNEC.CODFORNECPRINC, NVL(PCPRODUT.CODFAB, '-'), PCPRODUT.QTUNITCX, NVL(PCMARCA.MARCA, '-'), PCLINHAPROD.DESCRICAO, PCPRODUT.CODMARCA, PCPRODUT.CODLINHAPROD, PCPRODUT.CLASSE, PCPRODUT.CLASSEVENDA, PC.VALOR, NVL(PCPRODUT.NBM, '-'), NVL(PCPRODUT.MULTIPLO, 0.0), NVL(PCPRODUT.MULTIPLOCOMPRAS, 0.0)
    `)

    return response
  }

  async findSyntheticMove(
    options: SyntheticOptions
  ): Promise<SyntheticMovePosition[]> {
    const { regions, observation, filter } = options

    let params = this.formatOptions(options)

    params += this.generateCodeFilter(regions || [], 'PCTABPR.NUMREGIAO')

    if (options.branch) {
      params += ` AND PCMOV.CODFILIAL = '${options.branch}'`
    }

    if (options.salesClass) {
      params += ` AND PCPRODUT.CLASSEVENDA = '${options.salesClass}'`
    }

    if (options.class) {
      params += ` AND PCPRODUT.CLASSE = '${options.class}'`
    }

    if (options.stock === 'ofDay') {
      params += ` AND PCHISTEST.DATA = TO_DATE('${formatDate(
        normalizeDate(options.stockDay)
      )}', 'DD/MM/YYYY')'`
    }

    if (observation === 'outOfLine') {
      params += " AND TRIM(NVL(PCPRODUT.OBS2, '')) = 'FL'"
    }

    const fromFormated = formatDate(normalizeDate(options.periodFrom))
    const toFormated = formatDate(normalizeDate(options.periodTo))
    const oneDayBeforeFormated = formatDate(
      subDays(normalizeDate(options.periodFrom), 1)
    )

    let filterBy: string

    if (filter !== 'all') {
      filterBy = `(clQTCOM + clQTBONIF + clQTVEN + clQTTRA + clQTOUTENT + clQTOUTVEN) ${filter} 0`
    }

    const response = await winthor.raw<SyntheticMovePosition[]>(`
      SELECT D.*,
        CLCUSTOFIN * CLQTCOM CLVLCOMPEST,
        CLCUSTOFIN * CLQTBONIF CLVLBONIFEST,
        CLCUSTOFIN * CLQTOUTENT CLVLOUTENTEST,
        CLCUSTOFIN * CLQTVEN CLVLVENEST,
        CLCUSTOFIN * CLQTTRA CLVLTRAEST,
        CLCUSTOFIN * CLQTOUTVEN CLVLOUTVENEST,
        (CLQTESTINICIO + CLQTCOM + CLQTBONIF + CLQTOUTENT - CLQTVEN - CLQTTRA - CLQTOUTVEN) CLQTCAL,
        (CLVLESTINICIO + (CLCUSTOFIN * CLQTCOM) + (CLCUSTOFIN * CLQTBONIF) + (CLCUSTOFIN * CLQTOUTENT) -(CLCUSTOFIN * CLQTVEN) - (CLCUSTOFIN * CLQTTRA) - (CLCUSTOFIN * CLQTOUTVEN)) CLVLCAL,
        (CLQTESTINICIO + CLQTCOM + CLQTBONIF + CLQTOUTENT - CLQTVEN - CLQTTRA - CLQTOUTVEN) - CLQTSIS CLQTDIV,
        (CLVLESTINICIO + (CLCUSTOFIN * CLQTCOM) + (CLCUSTOFIN * CLQTBONIF) + (CLCUSTOFIN * CLQTOUTENT) - (CLCUSTOFIN * CLQTVEN) - (CLCUSTOFIN * CLQTTRA) - (CLCUSTOFIN * CLQTOUTVEN)) - CLVLSIS CLVLDIV
      FROM (SELECT
              PCPRODUT.CODPROD,
              PCPRODUT.QTUNITCX,
              PCPRODUT.DESCRICAO,
              PCPRODUT.CODFAB,
              PCPRODUT.EMBALAGEM,
              NVL(PCMARCA.MARCA, '') MARCA,
              NVL(PCLINHAPROD.DESCRICAO, '') LINHAPROD,
              PCPRODUT.CODMARCA,
              PCPRODUT.CODLINHAPROD CODLINHA,
              PCPRODUT.UNIDADE,
              PCPRODUT.NUMORIGINAL,
              PCPRODUT.CODEPTO,
              PCPRODUT.NBM,
              (SELECT DESCRICAO FROM PCDEPTO WHERE PCPRODUT.CODEPTO = PCDEPTO.CODEPTO) AS DEPARTAMENTO,
              PCPRODUT.CODSEC,
              (SELECT DESCRICAO FROM PCSECAO WHERE PCPRODUT.CODSEC = PCSECAO.CODSEC) AS SECAO,
              PCPRODUT.CODFORNEC,
              (SELECT FORNECEDOR FROM PCFORNEC WHERE PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC) AS FORNECEDOR,
              (SELECT FANTASIA FROM PCFORNEC WHERE PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC) AS FANTASIA,
              NVL((SELECT SUM(NVL(H.QTESTGER, 0)) FROM PCHISTEST H WHERE CODPROD = PCPRODUT.CODPROD AND H.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND H.DATA = TO_DATE('${fromFormated}', 'DD/MM/YYYY')), 0) CLQTEST,
              NVL((SELECT SUM(NVL(H.QTESTGER, 0)) FROM PCHISTEST H WHERE CODPROD = PCPRODUT.CODPROD AND H.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND H.DATA = TO_DATE('${oneDayBeforeFormated}', 'DD/MM/YYYY')), 0) CLQTESTINICIO,
              NVL((SELECT SUM(NVL(H.QTESTGER, 0) * NVL(H.CUSTOFIN, 0)) FROM PCHISTEST H WHERE CODPROD = PCPRODUT.CODPROD AND H.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND H.DATA = TO_DATE('${oneDayBeforeFormated}', 'DD/MM/YYYY')), 0) CLVLESTINICIO,
              NVL((SELECT SUM(NVL(H.QTESTGER, 0) * NVL(H.CUSTOFIN, 0)) FROM PCHISTEST H WHERE CODPROD = PCPRODUT.CODPROD AND H.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND H.DATA = TO_DATE('${fromFormated}', 'DD/MM/YYYY')), 0) CLVLEST,
              NVL((SELECT SUM(NVL(H.CUSTOFIN, 0)) FROM PCHISTEST H WHERE CODPROD = PCPRODUT.CODPROD AND H.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND H.DATA = TO_DATE('${toFormated}', 'DD/MM/YYYY')), 0) CLCUSTOFIN,
              NVL((SELECT SUM(NVL(H.QTESTGER, E.QTESTGER)) FROM PCHISTEST H, PCEST E WHERE H.CODPROD = PCPRODUT.CODPROD AND H.CODPROD = E.CODPROD AND H.CODFILIAL = E.CODFILIAL AND H.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND H.DATA = TO_DATE('${toFormated}', 'DD/MM/YYYY')), 0) CLQTSIS,
              NVL((SELECT SUM(NVL(H.QTESTGER, E.QTESTGER) * NVL(H.CUSTOFIN, 0)) FROM PCHISTEST H, PCEST E WHERE H.CODPROD = PCPRODUT.CODPROD AND H.CODPROD = E.CODPROD AND H.CODFILIAL = E.CODFILIAL AND H.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND H.DATA = TO_DATE('${toFormated}', 'DD/MM/YYYY')), 0) CLVLSIS,
              NVL((SELECT SUM(NVL(PCMOV.QT, 0)) FROM PCMOV, PCNFENT WHERE PCMOV.CODPROD = PCPRODUT.CODPROD AND PCNFENT.NUMTRANSENT = PCMOV.NUMTRANSENT AND PCMOV.STATUS IN ('B', 'AB') AND NVL(PCMOV.CODOPER, 'X') = 'E' and NVL(PCNFENT.especie, 'X') NOT IN ('CT', 'OE', 'CO') AND PCNFENT.TIPODESCARGA IN ('1', '2', '3', '4', '5', '9', 'R', 'S', 'A', 'E', 'N', 'I', 'F', 'D', 'B', 'M', 'G', 'H', 'J') AND PCMOV.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND PCMOV.DTMOV BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')), 0) CLQTCOM,
              NVL((SELECT SUM(NVL(PCMOV.QT, 0)) FROM PCMOV WHERE PCMOV.CODPROD = PCPRODUT.CODPROD AND PCMOV.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND NVL(PCMOV.CODOPER, 'X') = 'EB' AND PCMOV.STATUS IN ('B', 'AB') AND PCMOV.DTMOV BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')), 0) CLQTBONIF,
              NVL((SELECT SUM(NVL(PCMOV.QT, 0)) FROM PCMOV WHERE PCMOV.CODPROD = PCPRODUT.CODPROD AND PCMOV.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND NVL(PCMOV.CODOPER, 'X') <> 'E' AND NVL(PCMOV.CODOPER, 'X') <> 'EB' AND PCMOV.STATUS IN ('B', 'AB') AND SUBSTR(NVL(PCMOV.CODOPER, 'XX'), 1, 1) = 'E' AND PCMOV.DTMOV BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')), 0) CLQTOUTENT,
              NVL((SELECT SUM(NVL(PCMOV.QT, 0)) FROM PCMOV WHERE PCMOV.CODPROD = PCPRODUT.CODPROD AND PCMOV.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND NVL(PCMOV.CODOPER, 'X') = 'S' AND PCMOV.STATUS IN ('B', 'AB') AND PCMOV.DTMOV BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')), 0) CLQTVEN,
              NVL((SELECT SUM(NVL(PCMOV.QT, 0)) FROM PCMOV WHERE PCMOV.CODPROD = PCPRODUT.CODPROD AND PCMOV.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND NVL(PCMOV.CODOPER, 'X') = 'ST' AND PCMOV.STATUS IN ('B', 'AB') AND PCMOV.DTMOV BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')), 0) CLQTTRA,
              NVL((SELECT SUM(NVL(PCMOV.QT, 0)) FROM PCMOV WHERE PCMOV.CODPROD = PCPRODUT.CODPROD AND PCMOV.CODFILIAL IN ('1', '10', '2', '3', '5', '9') AND NVL(PCMOV.CODOPER, 'X') <> 'S' AND NVL(PCMOV.CODOPER, 'X') <> 'ST' AND PCMOV.STATUS IN ('B', 'AB') AND ((SUBSTR(NVL(PCMOV.CODOPER, 'XX'), 1, 1) = 'S') OR (SUBSTR(NVL(PCMOV.CODOPER, 'XX'), 1, 1) = 'R')) AND PCMOV.DTMOV BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY')), 0) CLQTOUTVEN
            FROM PCPRODUT, PCMOV, PCNFENT, PCMARCA, PCLINHAPROD, PCFORNEC
            WHERE PCPRODUT.CODPROD > 0 AND PCPRODUT.CODMARCA = PCMARCA.CODMARCA (+) AND PCMOV.NUMTRANSENT = PCNFENT.NUMTRANSENT (+) AND PCPRODUT.CODLINHAPROD = PCLINHAPROD.CODLINHA (+) AND PCMOV.CODPROD = PCPRODUT.CODPROD AND PCFORNEC.CODFORNEC = PCPRODUT.CODFORNEC AND PCMOV.STATUS IN ('B', 'AB') AND PCMOV.DTMOV BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') AND TO_DATE('${toFormated}', 'DD/MM/YYYY') ${params}
            GROUP BY PCPRODUT.CODPROD, PCPRODUT.DESCRICAO, PCPRODUT.CODFAB, PCPRODUT.EMBALAGEM, PCPRODUT.UNIDADE, PCPRODUT.NUMORIGINAL, PCPRODUT.QTUNITCX, PCPRODUT.CODEPTO, PCPRODUT.CODFORNEC, PCMARCA.MARCA, PCLINHAPROD.DESCRICAO, PCPRODUT.CODMARCA, PCPRODUT.CODLINHAPROD, PCPRODUT.CODSEC, PCPRODUT.NBM
      ) D ${filterBy ? `WHERE ${filterBy}` : ''}
    `)

    return response
  }

  async findMaster(options: Options): Promise<MasterPosition[]> {
    const { regions, observation } = options

    let params = this.formatOptions(options)

    params += this.generateCodeFilter(regions || [], 'PCTABPR.NUMREGIAO')

    if (options.branch) {
      params += ` AND ESTOQUE.CODFILIAL = '${options.branch}'`
    }

    if (options.salesClass) {
      params += ` AND PCPRODUT.CLASSEVENDA = '${options.salesClass}'`
    }

    if (options.class) {
      params += ` AND PCPRODUT.CLASSE = '${options.class}'`
    }

    if (options.stock === 'ofDay') {
      params += ` AND PCHISTEST.DATA = TO_DATE('${formatDate(
        normalizeDate(options.stockDay)
      )}', 'DD/MM/YYYY')'`
    }

    if (observation !== 'all') {
      params +=
        observation === 'active'
          ? " AND 'FL' NOT IN NVL((SELECT MAX(DECODE(X.FORALINHA,'S','FL','')) FROM PCPRODFILIAL X WHERE X.CODPROD = PCEST.CODPROD AND X.CODFILIAL = PCEST.CODFILIAL ), NVL(PCPRODUT.OBS2,' ' ))"
          : " AND 'FL' IN NVL((SELECT MAX(DECODE(X.FORALINHA,'S','FL','')) FROM PCPRODFILIAL X WHERE X.CODPROD = PCEST.CODPROD AND X.CODFILIAL = PCEST.CODFILIAL), NVL(PCPRODUT.OBS2,' ' ))"
    }

    const response = await winthor.raw<MasterPosition[]>(`
      SELECT
        PCPRODUTMASTER.CODPROD,
        PCPRODUTMASTER.DESCRICAO,
        PCPRODUTMASTER.NUMORIGINAL,
        PCFORNEC.CODFORNEC,
        PCFORNEC.FANTASIA,
        PCFORNEC.CODFORNECPRINC,
        PCPRODUTMASTER.EMBALAGEM,
        PCPRODUTMASTER.UNIDADE,
        PCPRODUT.CODFAB, PCPRODUT.NBM,
        PCPRODUT.QTUNITCX,
        NVL(PCMARCA.MARCA,'') MARCA,
        NVL(PCLINHAPROD.DESCRICAO,'') LINHAPROD,
        PCPRODUT.CODMARCA,
        PCPRODUT.CODLINHAPROD CODLINHA,
        PCPRODUTMASTER.CODEPTO, PCDEPTO.DESCRICAO DEPARTAMENTO, PCPRODUTMASTER.CODSEC, PCSECAO.DESCRICAO SECAO,
        SUM ((NVL(ESTOQUE.QTESTGER,0)  / DECODE(NVL(PCPRODUT.QTUNITCX,0),0,1,PCPRODUT.QTUNITCX))) AS QTESTMASTER,
        SUM ((NVL(ESTOQUE.QTESTGER,0) * NVL(ESTOQUE.CUSTOFIN,0))) AS VLCUSTOFIN
      FROM PCPRODUT, PCPRODUT PCPRODUTMASTER, PCFORNEC, PCDEPTO, PCSECAO, PCMARCA, PCLINHAPROD, PCEST ESTOQUE
      WHERE NVL(PCPRODUT.CODPRODMASTER, PCPRODUT.CODPROD) = PCPRODUTMASTER.CODPROD AND PCPRODUT.CODPROD = ESTOQUE.CODPROD AND PCPRODUT.CODMARCA = PCMARCA.CODMARCA(+) AND PCPRODUT.CODLINHAPROD = PCLINHAPROD.CODLINHA(+) AND PCPRODUTMASTER.CODEPTO = PCDEPTO.CODEPTO AND PCPRODUTMASTER.CODSEC = PCSECAO.CODSEC(+) AND PCPRODUTMASTER.CODFORNEC = PCFORNEC.CODFORNEC AND PCPRODUTMASTER.CODPROD = ESTOQUE.CODPROD AND NVL(PCDEPTO.TIPOMERC, 'XX') NOT IN ('IM','CI') ${params}
      GROUP BY PCPRODUTMASTER.CODPROD, PCPRODUTMASTER.DESCRICAO, PCFORNEC.CODFORNEC, PCFORNEC.FANTASIA, PCPRODUTMASTER.EMBALAGEM, PCPRODUTMASTER.NUMORIGINAL, PCPRODUTMASTER.UNIDADE,PCFORNEC.CODFORNECPRINC, PCPRODUTMASTER.CODEPTO, PCDEPTO.DESCRICAO, PCPRODUTMASTER.CODSEC, PCSECAO.DESCRICAO, PCPRODUT.CODFAB,PCPRODUT.QTUNITCX, PCMARCA.MARCA, PCLINHAPROD.DESCRICAO, PCPRODUT.CODMARCA, PCPRODUT.CODLINHAPROD, PCPRODUT.NBM
    `)

    return response
  }

  async findComparative(
    options: ComparativeOptions
  ): Promise<ComparativePosition[]> {
    const { regions, observation } = options

    let params = this.formatOptions(options)

    params += this.generateCodeFilter(regions || [], 'PCTABPR.NUMREGIAO')

    if (options.branch) {
      params += ` AND PCEST.CODFILIAL = '${options.branch}'`
    }

    if (options.salesClass) {
      params += ` AND PCPRODUT.CLASSEVENDA = '${options.salesClass}'`
    }

    if (options.class) {
      params += ` AND PCPRODUT.CLASSE = '${options.class}'`
    }

    if (options.stock === 'ofDay') {
      params += ` AND PCHISTEST.DATA = TO_DATE('${formatDate(
        normalizeDate(options.stockDay)
      )}', 'DD/MM/YYYY')'`
    }

    if (observation !== 'all') {
      params +=
        observation === 'active'
          ? " AND 'FL' NOT IN NVL((SELECT MAX(DECODE(X.FORALINHA,'S','FL','')) FROM PCPRODFILIAL X WHERE X.CODPROD = PCEST.CODPROD AND X.CODFILIAL = PCEST.CODFILIAL ), NVL(PCPRODUT.OBS2,' ' ))"
          : " AND 'FL' IN NVL((SELECT MAX(DECODE(X.FORALINHA,'S','FL','')) FROM PCPRODFILIAL X WHERE X.CODPROD = PCEST.CODPROD AND X.CODFILIAL = PCEST.CODFILIAL), NVL(PCPRODUT.OBS2,' ' ))"
    }

    const fromFormated = formatDate(normalizeDate(options.periodFrom))
    const oneDayBeforeFormated = formatDate(
      subDays(normalizeDate(options.periodFrom), 1)
    )

    const response = await winthor.raw<ComparativePosition[]>(`
      SELECT PCPRODUT.CODPROD,
        PCPRODUT.DESCRICAO,
        PCPRODUT.EMBALAGEM,
        NVL(PCMARCA.MARCA, '')                   MARCA,
        NVL(PCLINHAPROD.DESCRICAO, '')           LINHAPROD,
        PCPRODUT.CODMARCA,
        PCPRODUT.CODLINHAPROD                    CODLINHA,
        PCPRODUT.QTUNITCX,
        PCPRODUT.UNIDADE                         UM,
        PCPRODUT.CODFAB,
        PCPRODUT.NUMORIGINAL,
        PCPRODUT.NBM,
        NVL((SELECT SUM(NVL(PCHISTEST.qtestger, 0)) FROM PCHISTEST WHERE PCPRODUT.CODPROD = PCHISTEST.CODPROD
           AND PCHISTEST.data = TO_DATE('${oneDayBeforeFormated}', 'DD/MM/YYYY')
           AND PCHISTEST.CODFILIAL IN ('1')), 0) QTESTGERINICIAL,
    NVL((SELECT SUM(DECODE(SUBSTR(CODOPER, 1, 1), 'E', PCMOV.QT, 0))
     FROM PCMOV
     WHERE TRUNC(PCMOV.CODPROD) = PCPRODUT.CODPROD
           AND PCMOV.CODFILIAL IN ('1')
           AND PCMOV.DTMOV BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') and trunc(sysdate)
           AND PCMOV.STATUS IN ('AB', 'B')), 0)  QTENTRADA,
    NVL((SELECT SUM(DECODE(SUBSTR(CODOPER, 1, 1), 'S', PCMOV.QT, 0))
     FROM PCMOV
     WHERE TRUNC(PCMOV.CODPROD) = PCPRODUT.CODPROD
           AND PCMOV.CODFILIAL IN ('1')
           AND PCMOV.DTMOV BETWEEN TO_DATE('${fromFormated}', 'DD/MM/YYYY') and trunc(sysdate)
           AND PCMOV.STATUS IN ('AB', 'B')), 0)  QTSAIDA,
    ${
      options.consider === 'all'
        ? 'PCEST.QTESTGER'
        : '(((NVL(PCEST.QTESTGER,0) - NVL(PCEST.QTRESERV,0) - NVL(PCEST.QTBLOQUEADA,0)))) QTESTGER'
    },
    PCEST.CUSTOREAL,
    PCPRODUT.CODEPTO,
    PCDEPTO.DESCRICAO                        DEPARTAMENTO,
    PCPRODUT.CODSEC,
    PCSECAO.DESCRICAO                        SECAO,
    PCPRODUT.CODFORNEC,
    PCFORNEC.FANTASIA,
    PCFORNEC.FORNECEDOR,
    PCFORNEC.CODFORNECPRINC
  FROM PCEST, PCPRODUT, PCDEPTO, PCFORNEC, PCTABPR, PCSECAO, PCMARCA, PCLINHAPROD
  WHERE PCEST.CODPROD = PCPRODUT.CODPROD
        AND (PCPRODUT.CODEPTO = PCDEPTO.CODEPTO)
        AND (PCPRODUT.CODSEC = PCSECAO.CODSEC)
        AND (PCPRODUT.CODFORNEC = PCFORNEC.CODFORNEC)
        AND PCPRODUT.CODMARCA = PCMARCA.CODMARCA (+)
        AND PCPRODUT.CODLINHAPROD = PCLINHAPROD.CODLINHA (+)
        AND (PCPRODUT.CODPROD = PCTABPR.CODPROD (+))
        ${params}
    `)

    return response
  }

  private formatOptions(options: Omit<Options, 'regions'>) {
    let params = ''

    params += this.generateCodeFilter(
      options.providers || [],
      'PCFORNEC.CODFORNEC'
    )

    params += this.generateCodeFilter(
      options.buyers || [],
      'PCFORNEC.CODCOMPRADOR'
    )

    params += this.generateCodeFilter(
      options.principalProviders || [],
      'PCFORNEC.CODFORNECPRINC'
    )

    params += this.generateCodeFilter(
      options.products || [],
      'PCPRODUT.CODPROD'
    )

    params += this.generateCodeFilter(
      options.departments || [],
      'PCPRODUT.CODEPTO'
    )

    params += this.generateCodeFilter(options.brands || [], 'PCPRODUT.CODMARCA')

    params += this.generateCodeFilter(
      options.productWebs || [],
      'PCPRODUT.CODLINHAPROD'
    )

    params += this.generateCodeFilter(options.sections || [], 'PCPRODUT.CODSEC')

    params += this.generateCodeFilter(
      options.categories || [],
      'PCPRODUT.CODCATEGORIA'
    )

    params += this.generateCodeFilter(
      options.subcategories || [],
      'PCPRODUT.CODSUBCATEGORIA'
    )

    params += this.generateCodeFilter(
      options.tributations || [],
      'PCPRODUT.CODTRIBPISCOFINS'
    )

    if (options.productGroup !== 'all') {
      let productGroup = ''

      switch (productGroup) {
        case '>':
          productGroup = ''
          break
        case '=':
          productGroup = ''
          break
        case '<':
          productGroup = ''
          break
        case '<>':
          productGroup = ''
          break
      }

      params +=
        options.consider === 'all'
          ? ` HAVING SUM((NVL(PCEST.QTESTGER, 0) - NVL(PCEST.QTRESERV, 0) - NVL(PCEST.QTBLOQUEADA, 0))) ${productGroup} 0`
          : ` HAVING SUM(NVL(PCEST.QTESTGER, 0)) ${productGroup} 0`
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
