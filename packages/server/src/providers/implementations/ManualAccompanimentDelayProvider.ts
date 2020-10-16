import { differenceInBusinessDays } from 'date-fns'
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
        isCritical: count > 2
      }
    }

    if (reviewedAt && !releasedAt) {
      const count = differenceInBusinessDays(new Date(), reviewedAt)

      return {
        count,
        isCritical: count > 3
      }
    }

    if (releasedAt && !expectedBillingAt) {
      const count = differenceInBusinessDays(new Date(), releasedAt)

      return {
        count,
        isCritical: count > 3
      }
    }

    if (expectedBillingAt && !billingAt) {
      const count = differenceInBusinessDays(new Date(), expectedBillingAt)

      return {
        count,
        isCritical: count > 3
      }
    }

    if (billingAt && purchaseOrder.freight === 'CIF' && !schedulingAt) {
      const count = differenceInBusinessDays(new Date(), billingAt)

      return {
        count,
        isCritical: count > 1
      }
    }

    if (purchaseOrder.freight === 'FOB') {
      if (billingAt && !freeOnBoardAt) {
        const count = differenceInBusinessDays(new Date(), billingAt)

        return {
          count,
          isCritical: count > 3
        }
      }
    } else {
      if (billingAt && !schedulingAt) {
        const count = differenceInBusinessDays(new Date(), billingAt)

        return {
          count,
          isCritical: count > 3
        }
      }
    }

    const count = differenceInBusinessDays(new Date(), emittedAt)

    return {
      count,
      isCritical: count > 2
    }
  }
}
