import { isSameDay } from 'date-fns'

import { IBasicProduct, IPriceHistory } from '~/domain/IProduct'
import { winthor } from '~/libraries/WinThor'

import { IProductPriceHistoryModel } from './IProductPriceHistoryModel'

export function createWinThorProductPriceHistoryModel(): IProductPriceHistoryModel {
  return {
    async find(product: IBasicProduct): Promise<IPriceHistory[]> {
      const result: IPriceHistory[] = []

      const data: IPriceHistory[] = await winthor
        .distinct('DTMOV AS entryAt')
        .column(winthor.raw('(PCMOV.PTABELA - PCMOV.VLDESCONTO) as "price"'))
        .from('PCMOV')
        .whereRaw(`CODOPER = 'E' AND CODPROD = ${product.code}`)
        .groupBy('DTMOV', winthor.raw('PCMOV.PTABELA - PCMOV.VLDESCONTO'))
        .orderBy('DTMOV')

      if (data.length !== 0) {
        let history: IPriceHistory = data[0]

        for (let i = 1; i < data.length; i++) {
          const currentItem = data[i]

          if (history.price !== currentItem.price) {
            result.push(history)
          }

          history = currentItem
        }

        result.push(history)
      }

      console.log({ result })

      return result
    }
  }
}
