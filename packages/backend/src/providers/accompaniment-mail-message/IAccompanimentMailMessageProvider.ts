import { IAccompaniment } from '~/domain/IAccompaniment'
import { IAccompanimentMailData } from '~/domain/IMailData'

export interface IAccompanimentMailMessageProvider {
  generate(accompaniment: IAccompaniment): Promise<IAccompanimentMailData>
}
