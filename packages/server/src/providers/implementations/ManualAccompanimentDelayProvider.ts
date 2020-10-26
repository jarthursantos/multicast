import { differenceInBusinessDays } from 'date-fns'
import { CriticalLevel } from 'entities/CriticalLevel'
import {
  AccompanimentDelay,
  AccompanimentCalcData,
  IAccompanimentDelayProvider
} from 'providers/IAccompanimentDelayProvider'

export class ManualAccompanimentDelayProvider
  implements IAccompanimentDelayProvider {
  calculate(accompaniment: AccompanimentCalcData): AccompanimentDelay {
    const {
      purchaseOrder,
      sendedAt,
      reviewedAt,
      releasedAt,
      expectedBillingAt,
      billingAt,
      freeOnBoardAt,
      schedulingAt
    } = accompaniment
    const { emittedAt } = purchaseOrder

    if (sendedAt && !reviewedAt) {
      const count = differenceInBusinessDays(new Date(), sendedAt)

      return {
        count,
        criticalLevel:
          count > 2
            ? CriticalLevel.DANGER
            : count === 2
            ? CriticalLevel.ALERT
            : CriticalLevel.NORMAL
      }
    }

    if (reviewedAt && !releasedAt) {
      const count = differenceInBusinessDays(new Date(), reviewedAt)

      return {
        count,
        criticalLevel:
          count > 3
            ? CriticalLevel.DANGER
            : count === 3
            ? CriticalLevel.ALERT
            : CriticalLevel.NORMAL
      }
    }

    if (releasedAt && !expectedBillingAt) {
      const count = differenceInBusinessDays(new Date(), releasedAt)

      return {
        count,
        criticalLevel:
          count > 3
            ? CriticalLevel.DANGER
            : count === 3
            ? CriticalLevel.ALERT
            : CriticalLevel.NORMAL
      }
    }

    if (expectedBillingAt && !billingAt) {
      const count = differenceInBusinessDays(new Date(), expectedBillingAt)

      return {
        count,
        criticalLevel:
          count > 3
            ? CriticalLevel.DANGER
            : count === 3
            ? CriticalLevel.ALERT
            : CriticalLevel.NORMAL
      }
    }

    if (billingAt && purchaseOrder.freight === 'CIF' && !schedulingAt) {
      const count = differenceInBusinessDays(new Date(), billingAt)

      return {
        count,
        criticalLevel:
          count > 1
            ? CriticalLevel.DANGER
            : count === 1
            ? CriticalLevel.ALERT
            : CriticalLevel.NORMAL
      }
    }

    if (purchaseOrder.freight === 'FOB') {
      if (billingAt && !freeOnBoardAt) {
        const count = differenceInBusinessDays(new Date(), billingAt)

        return {
          count,
          criticalLevel:
            count > 3
              ? CriticalLevel.DANGER
              : count === 3
              ? CriticalLevel.ALERT
              : CriticalLevel.NORMAL
        }
      }
    } else {
      if (billingAt && !schedulingAt) {
        const count = differenceInBusinessDays(new Date(), billingAt)

        return {
          count,
          criticalLevel:
            count > 3
              ? CriticalLevel.DANGER
              : count === 3
              ? CriticalLevel.ALERT
              : CriticalLevel.NORMAL
        }
      }
    }

    const count = differenceInBusinessDays(new Date(), emittedAt)

    return {
      count,
      criticalLevel:
        count > 2
          ? CriticalLevel.DANGER
          : count === 2
          ? CriticalLevel.ALERT
          : CriticalLevel.NORMAL
    }
  }
}
