import { DetailedRepresentative } from 'entities/Representative'
import { winthor } from 'libs/knex-winthor'
import { IRepresentativeRepository } from 'repositories/IRepresentativeRepository'

interface RawRepresentative {
  code: number
  name: string
  fantasy: string
  cnpj: string
  city: string
  state: string
  deliveryTime: number
  principalCode: number
  representativeName: string
  representativePhone: string
  representativeMail: string
  buyerCode: number
  buyerName: string
}

export class WinThorRepresentativeRepository
  implements IRepresentativeRepository {
  async findMany(): Promise<DetailedRepresentative[]> {
    const result = await winthor
      .select<RawRepresentative[]>(
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
      .whereRaw('REPRES IS NOT NULL')
      .orderBy('REPRES', 'asc')
      .orderBy('FORNECEDOR', 'asc')

    const representatives: DetailedRepresentative[] = []

    result.forEach(representative =>
      representatives.push(this.parseRawRepresentative(representative))
    )

    return representatives
  }

  private parseRawRepresentative(
    raw: RawRepresentative
  ): DetailedRepresentative {
    const {
      code,
      name,
      fantasy,
      principalCode,
      cnpj,
      representativeName,
      representativePhone,
      representativeMail,
      buyerCode,
      buyerName,
      city,
      state,
      deliveryTime
    } = raw

    return {
      name: representativeName,
      phone: representativePhone,
      email: representativeMail,
      provider: {
        code,
        name,
        fantasy,
        cnpj,
        city,
        state,
        deliveryTime,
        principalCode,
        buyer: {
          code: buyerCode,
          name: buyerName
        }
      }
    }
  }
}
