import { Accompaniment } from 'entities/Accompaniment'
import { MailData } from 'entities/MailData'

export interface IAccompanimentMailMessageProvider {
  generate(accompaniment: Accompaniment): Promise<MailData>
}
