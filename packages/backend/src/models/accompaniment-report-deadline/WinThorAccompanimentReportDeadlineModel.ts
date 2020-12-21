import { IAccompaniment } from '~/domain/IAccompaniment'
import { winthor } from '~/libraries/WinThor'

import { IAccompanimentReportDeadlineModel } from './IAccompanimentReportDeadlineModel'

export function createWinThorAccompanimentReportDeadlineModel(): IAccompanimentReportDeadlineModel {
  return {
    async generate(accompaniment: IAccompaniment): Promise<string> {
      const data = await winthor
        .select<{ deadline: string }[]>('PRAZO as deadline')
        .from('PCLANC3')
        .whereRaw(`NUMPED = ${accompaniment.purchaseOrder.number}`)
        .orderBy('PRAZO', 'asc')

      return data.map(({ deadline }) => deadline).join(', ')
    }
  }
}
