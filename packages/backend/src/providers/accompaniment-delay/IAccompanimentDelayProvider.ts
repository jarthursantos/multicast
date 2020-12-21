import { CriticalLevel } from '~/domain/CriticalLevel'
import { IAccompaniment } from '~/domain/IAccompaniment'

export interface IAccompanimentDelay {
  count: number
  criticalLevel: CriticalLevel
}

export type IAccompanimentCalcData = Pick<
  IAccompaniment,
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
  calculate(accompaniment: IAccompanimentCalcData): IAccompanimentDelay
}
