import { Accompaniment } from 'entities/Accompaniment'
import { CriticalLevel } from 'entities/CriticalLevel'

export interface AccompanimentDelay {
  count: number
  criticalLevel: CriticalLevel
}

export type AccompanimentCalcData = Pick<
  Accompaniment,
  | 'purchaseOrder'
  | 'sendedAt'
  | 'reviewedAt'
  | 'releasedAt'
  | 'expectedBillingAt'
  | 'billingAt'
  | 'freeOnBoardAt'
  | 'schedulingAt'
>

export interface IAccompanimentDelayProvider {
  calculate(accompaniment: AccompanimentCalcData): AccompanimentDelay
}
