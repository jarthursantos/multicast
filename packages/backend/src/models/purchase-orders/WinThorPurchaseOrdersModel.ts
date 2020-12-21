import { IPurchaseOrder } from '~/domain/IPurchaseOrder'
import { winthor } from '~/libraries/WinThor'
import { ILastPurchaseOrderProvider } from '~/providers/last-purchase-order/ILastPurchaseOrderProvider'

import { IPurchaseOrderModel } from './IPurchaseOrderModel'

interface IRawPurchaseOrder {
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

export function createWinThorPurchaseOrdersModel(
  lastPurchaseOrderProvider: ILastPurchaseOrderProvider
): IPurchaseOrderModel {
  function parseRawPurchase(rawData: IRawPurchaseOrder): IPurchaseOrder {
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

  function parseRawPurchases(rawData: IRawPurchaseOrder[]): IPurchaseOrder[] {
    return rawData.map(raw => parseRawPurchase(raw))
  }

  return {
    async findByNumber(number: number): Promise<IPurchaseOrder | undefined> {
      const rawPurchase = await winthor
        .select<IRawPurchaseOrder[]>(
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

      return rawPurchase[0] ? parseRawPurchase(rawPurchase[0]) : undefined
    },

    async findAllUnregistered(): Promise<IPurchaseOrder[]> {
      const lastRegisteredNumber = await lastPurchaseOrderProvider.find()

      const rawPurchases = await winthor
        .select<IRawPurchaseOrder[]>(
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

      return parseRawPurchases(rawPurchases)
    }
  }
}
