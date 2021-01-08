import { differenceInBusinessDays, isAfter } from 'date-fns'

import { CriticalLevel } from '~/domain/CriticalLevel'
import { IAnnotation } from '~/domain/IAnnotation'

import {
  IAccompanimentDelay,
  IAccompanimentCalcData,
  IAccompanimentDelayProvider
} from './IAccompanimentDelayProvider'

export function createManualAccompanimentDelayProvider(): IAccompanimentDelayProvider {
  function findMonstRecentlyAnnotation(
    annotations: IAnnotation[] = []
  ): Date | undefined {
    if (annotations.length !== 0) {
      const firstDate = annotations[0].createdAt

      if (annotations.length === 1) {
        return firstDate
      }

      return annotations.reduce((current, { createdAt }) => {
        if (createdAt === undefined) {
          return current
        }

        if (current === undefined) {
          return createdAt
        }

        if (isAfter(createdAt, current)) {
          return createdAt
        }

        return current
      }, firstDate)
    }

    return undefined
  }

  function getMostBiggerDate(date: Date, dateToCompare: Date): Date {
    if (isAfter(date, dateToCompare)) {
      return date
    }

    return dateToCompare
  }

  return {
    calculate(accompaniment: IAccompanimentCalcData): IAccompanimentDelay {
      const {
        purchaseOrder,
        sendedAt,
        reviewedAt,
        releasedAt,
        expectedBillingAt,
        billingAt,
        freeOnBoardAt,
        schedulingAt,
        annotations
      } = accompaniment

      const { emittedAt } = purchaseOrder

      const mostRecentlyAnnotation = findMonstRecentlyAnnotation(annotations)

      if (sendedAt && !reviewedAt) {
        const count = differenceInBusinessDays(
          new Date(),
          mostRecentlyAnnotation
            ? getMostBiggerDate(sendedAt, mostRecentlyAnnotation)
            : sendedAt
        )

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
        const count = differenceInBusinessDays(
          new Date(),
          mostRecentlyAnnotation
            ? getMostBiggerDate(reviewedAt, mostRecentlyAnnotation)
            : reviewedAt
        )

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
        const count = differenceInBusinessDays(
          new Date(),
          mostRecentlyAnnotation
            ? getMostBiggerDate(releasedAt, mostRecentlyAnnotation)
            : releasedAt
        )

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
        const count = differenceInBusinessDays(
          new Date(),
          mostRecentlyAnnotation
            ? getMostBiggerDate(expectedBillingAt, mostRecentlyAnnotation)
            : expectedBillingAt
        )

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
        const count = differenceInBusinessDays(
          new Date(),
          mostRecentlyAnnotation
            ? getMostBiggerDate(billingAt, mostRecentlyAnnotation)
            : billingAt
        )

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
          const count = differenceInBusinessDays(
            new Date(),
            mostRecentlyAnnotation
              ? getMostBiggerDate(billingAt, mostRecentlyAnnotation)
              : billingAt
          )

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
          const count = differenceInBusinessDays(
            new Date(),
            mostRecentlyAnnotation
              ? getMostBiggerDate(billingAt, mostRecentlyAnnotation)
              : billingAt
          )

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

      const count = differenceInBusinessDays(
        new Date(),
        mostRecentlyAnnotation
          ? getMostBiggerDate(emittedAt, mostRecentlyAnnotation)
          : emittedAt
      )

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
}
