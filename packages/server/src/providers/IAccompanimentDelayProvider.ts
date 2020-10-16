import { Accompaniment } from 'entities/Accompaniment'

export interface AccompanimentDelay {
  count: number
  isCritical: boolean
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
