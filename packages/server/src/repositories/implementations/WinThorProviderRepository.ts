import { Provider } from 'entities/Provider'
import { winthor } from 'libs/knex-winthor'
import { IProviderRepository } from 'repositories/IProviderRepository'

interface RawProvider {
  code: number
  name: string
  fantasy: string
  cnpj: string
  principalCode: number
  representativeName: string
  representativePhone: string
  representativeMail: string
}

export class WinThorProviderRepository implements IProviderRepository {
  async findById(id: number): Promise<Provider> {
    const result = await winthor
      .select<RawProvider[]>(
        'PCFORNEC.CODFORNEC AS code',
        'FORNECEDOR as name',
        'FANTASIA as fantasy',
        'CODFORNECPRINC as principalCode',
        'CGC as cnpj',
        'IE as ie',
        'TELFAB as phone',
        'PCFORNEC.EMAIL as mail',
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

    return this.parseRawProvider(result[0])
  }

  async findMany(): Promise<Provider[]> {
    const result = await winthor
      .select<RawProvider[]>(
        'PCFORNEC.CODFORNEC AS code',
        'FORNECEDOR as name',
        'FANTASIA as fantasy',
        'CODFORNECPRINC as principalCode',
        'CGC as cnpj',
        'IE as ie',
        'TELFAB as phone',
        'PCFORNEC.EMAIL as mail',
        'REPRES as representativeName',
        'TELREP as representativePhone',
        'REP_EMAIL as representativeMail',
        'CODCOMPRADOR as buyerCode',
        'NOME as buyerName'
      )
      .from('PCFORNEC')
      .leftJoin('PCEMPR', 'CODCOMPRADOR', 'MATRICULA')

    const providers: Provider[] = []

    result.forEach(provider => providers.push(this.parseRawProvider(provider)))

    result.sort((p, o) => p.code - o.code)

    return providers
  }

  private parseRawProvider(raw: RawProvider): Provider {
    const {
      code,
      name,
      fantasy,
      principalCode,
      cnpj,
      representativeName,
      representativePhone,
      representativeMail
    } = raw

    return new Provider({
      code,
      fantasy,
      name,
      cnpj,
      principalCode,
      representative: {
        name: representativeName,
        phone: representativePhone,
        email: representativeMail
      }
    })
  }
}
