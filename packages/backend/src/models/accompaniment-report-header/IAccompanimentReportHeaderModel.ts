import { IAccompaniment } from '~/domain/IAccompaniment'
import { IAccompanimentReportHeader } from '~/domain/IAccompanimentReportHeader'

export interface IAccompanimentReportHeaderModel {
  find(accompaniment: IAccompaniment): Promise<IAccompanimentReportHeader>
}
