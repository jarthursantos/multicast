import { PurchaseOrder } from 'entities/PurchaseOrder'
import { winthor } from 'libs/knex-winthor'
import { ILastPurchaseOrderProvider } from 'providers/ILastPurchaseOrderProvider'
import { IPurchaseOrderRepository } from 'repositories/IPurchaseOrderRepository'

interface RawPurchaseOrder {
  purchaseNumber: number
  bonification: 'S' | 'N'
  fantasy: string
  representativeMail: string
  principalCode: number
  providerCode: number
  providerName: string
  cnpj: string
  representativeName: string
  representativePhone: string
  emittedAt: Date
  deliveredValue: number
  amountValue: number
  shippingName: string
  freight: string
  buyerCode: number
  buyerName: string
}

export class WinThorPurchaseOrderRepository
  implements IPurchaseOrderRepository {
  constructor(private lastPurchaseOrderProvider: ILastPurchaseOrderProvider) {}

  async findByNumber(number: number): Promise<PurchaseOrder> {
    // TODO: search in postgres

    const rawPurchase = await winthor
      .select<RawPurchaseOrder>(
        'PCPEDIDO.NUMPED         AS purchaseNumber',
        'PCPEDIDO.TIPOBONIFIC    AS bonification',
        'PCFORNEC.FANTASIA       AS fantasy',
        'PCFORNEC.REP_EMAIL      AS representativeMail',
        'PCFORNEC.CODFORNECPRINC AS principalCode',
        'PCFORNEC.CGC            AS cnpj',
        'PCPEDIDO.CODFORNEC      AS providerCode',
        'PCFORNEC.FORNECEDOR     AS providerName',
        'REPRES                  AS representativeName',
        'TELREP                  AS representativePhone',
        'PCPEDIDO.DTEMISSAO      AS emittedAt',
        'PCPEDIDO.VLENTREGUE     AS deliveredValue',
        'PCPEDIDO.VLTOTAL        AS amountValue',
        'TRANSPORTE              AS shippingName',
        'FRETE                   AS freight',
        'PCPEDIDO.CODCOMPRADOR   AS buyerCode',
        'PCEMPR.NOME             AS buyerName'
      )
      .from('PCPEDIDO')
      .leftJoin('PCFORNEC', 'PCPEDIDO.CODFORNEC', 'PCFORNEC.CODFORNEC')
      .leftJoin('PCEMPR', 'PCPEDIDO.CODCOMPRADOR', 'PCEMPR.MATRICULA')
      .whereRaw(`PCPEDIDO.NUMPED = ${number}`)
      .orderBy('PCPEDIDO.NUMPED')

    return this.parseRawPurchase(rawPurchase[0])
  }

  async findAllUnregistered(): Promise<PurchaseOrder[]> {
    const lastRegisteredNumber = await this.lastPurchaseOrderProvider.find()

    const rawPurchases = await winthor
      .select<RawPurchaseOrder[]>(
        'PCPEDIDO.NUMPED         AS purchaseNumber',
        'PCPEDIDO.TIPOBONIFIC    AS bonification',
        'PCFORNEC.FANTASIA       AS fantasy',
        'PCFORNEC.REP_EMAIL      AS representativeMail',
        'PCFORNEC.CODFORNECPRINC AS principalCode',
        'PCFORNEC.CGC            AS cnpj',
        'PCPEDIDO.CODFORNEC      AS providerCode',
        'PCFORNEC.FORNECEDOR     AS providerName',
        'REPRES                  AS representativeName',
        'TELREP                  AS representativePhone',
        'PCPEDIDO.DTEMISSAO      AS emittedAt',
        'PCPEDIDO.VLENTREGUE     AS deliveredValue',
        'PCPEDIDO.VLTOTAL        AS amountValue',
        'TRANSPORTE              AS shippingName',
        'FRETE                   AS freight',
        'PCPEDIDO.CODCOMPRADOR   AS buyerCode',
        'PCEMPR.NOME             AS buyerName'
      )
      .from('PCPEDIDO')
      .leftJoin('PCFORNEC', 'PCPEDIDO.CODFORNEC', 'PCFORNEC.CODFORNEC')
      .leftJoin('PCEMPR', 'PCPEDIDO.CODCOMPRADOR', 'PCEMPR.MATRICULA')
      .whereRaw(`PCPEDIDO.NUMPED > ${lastRegisteredNumber}`)
      .orderBy('PCPEDIDO.NUMPED')

    return this.parseRawPurchases(rawPurchases)
  }

  private parseRawPurchases(rawData: RawPurchaseOrder[]): PurchaseOrder[] {
    return rawData.map(raw => this.parseRawPurchase(raw))
  }

  private parseRawPurchase(rawData: RawPurchaseOrder): PurchaseOrder {
    if (!rawData) {
      return
    }

    const {
      amountValue,
      deliveredValue,
      emittedAt,
      freight,
      purchaseNumber,
      providerCode,
      bonification,
      providerName,
      fantasy,
      buyerCode,
      cnpj,
      principalCode,
      buyerName,
      representativeName,
      representativeMail,
      representativePhone
    } = rawData

    return {
      number: purchaseNumber,
      amountValue,
      deliveredValue,
      emittedAt,
      freight: freight === 'C' ? 'CIF' : 'FOB',
      isBonification: bonification !== 'N',
      buyer: { code: buyerCode, name: buyerName },
      provider: {
        code: providerCode,
        name: providerName,
        cnpj,
        principalCode,
        fantasy,
        city: '',
        state: '',
        deliveryTime: 0,
        buyer: { code: buyerCode, name: buyerName },
        representative: {
          name: representativeName,
          phone: representativePhone,
          email: representativeMail
        }
      }
    }
  }
}
