import { IDetailedProvider } from '~/domain/IProvider'
import { winthor } from '~/libraries/WinThor'

import { IProvidersModel } from './IProvidersModel'

interface IRawProvider {
  code: number
  name: string
  fantasy: string
  cnpj: string
  principalCode: number
  representativeName: string
  representativePhone: string
  representativeMail: string
  city: string
  state: string
  buyerCode: number
  buyerName: string
  deliveryTime: number
}

export function createWinThorProvidersModel(): IProvidersModel {
  function parseRawProvider(raw: IRawProvider): IDetailedProvider {
    const {
      code,
      name,
      fantasy,
      principalCode,
      cnpj,
      representativeName,
      representativePhone,
      representativeMail,
      deliveryTime,
      buyerCode,
      buyerName,
      city,
      state
    } = raw

    return {
      code,
      fantasy,
      name,
      cnpj,
      city,
      state,
      deliveryTime,
      principalCode,
      buyer: {
        code: buyerCode,
        name: buyerName
      },
      representative: {
        name: representativeName,
        phone: representativePhone,
        email: representativeMail
      }
    }
  }

  function formatQuery(query?: string) {
    if (!query) return ''

    return `
      AND (
        TO_CHAR(PCFORNEC.CODFORNEC) LIKE '${query.toUpperCase()}' OR
        PCFORNEC.CGC LIKE '%${query.toUpperCase()}%' OR
        PCFORNEC.FORNECEDOR LIKE '%${query.toUpperCase()}%' OR
        PCFORNEC.FANTASIA LIKE '%${query.toUpperCase()}%'
      )`
  }

  return {
    async findById(id: number): Promise<IDetailedProvider | undefined> {
      const result = await winthor
        .select<IRawProvider[]>(
          'PCFORNEC.CODFORNEC AS code',
          'FORNECEDOR as name',
          'FANTASIA as fantasy',
          'CODFORNECPRINC as principalCode',
          'CGC as cnpj',
          'IE as ie',
          'TELFAB as phone',
          'PCFORNEC.EMAIL as mail',
          'PRAZOENTREGA as deliveryTime',
          'PCFORNEC.CIDADE as city',
          'PCFORNEC.ESTADO as state',
          'REPRES as representativeName',
          'TELREP as representativePhone',
          'REP_EMAIL as representativeMail',
          'CODCOMPRADOR as buyerCode',
          'NOME as buyerName'
        )
        .from('PCFORNEC')
        .leftJoin('PCEMPR', 'CODCOMPRADOR', 'MATRICULA')
        .where({ 'PCFORNEC.CODFORNEC': id })
        .orderBy('PCFORNEC.CODFORNEC')

      if (!result.length) {
        return undefined
      }

      return parseRawProvider(result[0])
    },

    async findMany(query?: string): Promise<IDetailedProvider[]> {
      const result = await winthor.raw<IRawProvider[]>(`
        SELECT PCFORNEC.CODFORNEC AS "code",
          FORNECEDOR as "name",
          FANTASIA as "fantasy",
          CODFORNECPRINC as "principalCode",
          CGC as "cnpj",
          IE as "ie",
          TELFAB as "phone",
          PCFORNEC.EMAIL as "mail",
          PRAZOENTREGA as "deliveryTime",
          PCFORNEC.CIDADE as "city",
          PCFORNEC.ESTADO as "state",
          REPRES as "representativeName",
          TELREP as "representativePhone",
          REP_EMAIL as "representativeMail",
          CODCOMPRADOR as "buyerCode",
          NOME as "buyerName"
        FROM PCFORNEC LEFT JOIN PCEMPR ON CODCOMPRADOR = MATRICULA
        WHERE ${formatQuery(query)}
        ORDER BY FORNECEDOR
      `)

      const providers: IDetailedProvider[] = []

      result.forEach(provider => providers.push(parseRawProvider(provider)))

      result.sort((p, o) => p.code - o.code)

      return providers
    }
  }
}
