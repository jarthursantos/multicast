import { IAccompaniment } from '~/domain/IAccompaniment'

export interface IAccompanimentReportDeadlineModel {
  generate(accompaniment: IAccompaniment): Promise<string>
}
