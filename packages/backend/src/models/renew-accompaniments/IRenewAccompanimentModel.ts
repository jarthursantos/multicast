import { IAccompaniment } from '~/domain/IAccompaniment'
import { IRenewAccompanimentResult } from '~/domain/IRenewAccompanimentResult'

export interface IRenewAccompanimentModel {
  renew(accompaniment: IAccompaniment): Promise<IRenewAccompanimentResult>
}
