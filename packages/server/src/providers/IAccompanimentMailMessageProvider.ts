import { Accompaniment } from 'entities/Accompaniment'
import { AccompanimentMailData } from 'entities/MailData'

export interface IAccompanimentMailMessageProvider {
  generate(accompaniment: Accompaniment): Promise<AccompanimentMailData>
}
