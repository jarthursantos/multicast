import { Accompaniment } from 'entities/Accompaniment'
import { RenewAccompanimentResult } from 'entities/RenewAccompanimentResult'

export interface IRenewAccompanimentRepository {
  renew(accompaniment: Accompaniment): Promise<RenewAccompanimentResult>
}
