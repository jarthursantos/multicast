import { Accompaniment } from 'entities/Accompaniment'
import { winthor } from 'libs/knex-winthor'
import { IAccompanimentReportDeadlineRepository } from 'repositories/IAccompanimentReportDeadlineRepository'

export class WinThorAccompanimentReportDeadlineRepository
  implements IAccompanimentReportDeadlineRepository {
  async generate(accompaniment: Accompaniment): Promise<string> {
    const data = await winthor
      .select<{ deadline: string }[]>('PRAZO as deadline')
      .from('PCLANC3')
      .whereRaw(`NUMPED = ${accompaniment.purchaseOrder.number}`)
      .orderBy('PRAZO', 'asc')

    return data.map(({ deadline }) => deadline).join(', ')
  }
}
