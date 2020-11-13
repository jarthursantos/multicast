import { Accompaniment } from 'entities/Accompaniment'

export interface IAccompanimentReportDeadlineRepository {
  generate(accompaniment: Accompaniment): Promise<string>
}
