import { Accompaniment } from 'entities/Accompaniment'
import { AccompanimentReportHeader } from 'entities/AccompanimentReportHeader'

export interface IAccompanimentReportHeaderRepository {
  find(accompaniment: Accompaniment): Promise<AccompanimentReportHeader>
}
