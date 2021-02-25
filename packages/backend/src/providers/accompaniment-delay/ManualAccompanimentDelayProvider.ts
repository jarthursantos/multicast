import { differenceInBusinessDays, isAfter } from 'date-fns'

import { CriticalLevel } from '~/domain/CriticalLevel'
// import { IAnnotation } from '~/domain/IAnnotation'

import {
  IAccompanimentDelay,
  IAccompanimentCalcData,
  IAccompanimentDelayProvider
} from './IAccompanimentDelayProvider'

export function createManualAccompanimentDelayProvider(): IAccompanimentDelayProvider {
  // function findMonstRecentlyAnnotation(
  //   annotations: IAnnotation[] = []
  // ): Date | undefined {
  //   if (annotations.length !== 0) {
  //     const firstDate = annotations[0].createdAt

  //     if (annotations.length === 1) {
  //       return firstDate
  //     }

  //     return annotations.reduce((current, { createdAt }) => {
  //       if (createdAt === undefined) {
  //         return current
  //       }

  //       if (current === undefined) {
  //         return createdAt
  //       }

  //       if (isAfter(createdAt, current)) {
  //         return createdAt
  //       }

  //       return current
  //     }, firstDate)
  //   }

  //   return undefined
  // }

  function getMostBiggerDate(date: Date, dateToCompare: Date): Date {
    if (isAfter(date, dateToCompare)) {
      return date
    }

    return dateToCompare
  }

  function resolveCriticalLevel(count: number, limiar: number) {
    return count > limiar
      ? CriticalLevel.DANGER
      : count === limiar
      ? CriticalLevel.ALERT
      : CriticalLevel.NORMAL
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
        schedulingAt
        // annotations
      } = accompaniment

      const { emittedAt } = purchaseOrder

      // const mostRecentlyAnnotation = findMonstRecentlyAnnotation(annotations)
      const mostRecentlyAnnotation = undefined

      if (sendedAt && !reviewedAt) {
        const count = differenceInBusinessDays(
          new Date(),
          getMostBiggerDate(sendedAt, mostRecentlyAnnotation || sendedAt)
        )

        return {
          count,
          criticalLevel: resolveCriticalLevel(count, 2)
        }
      }

      if (reviewedAt && !releasedAt) {
        const count = differenceInBusinessDays(
          new Date(),
          getMostBiggerDate(reviewedAt, mostRecentlyAnnotation || reviewedAt)
        )

        return {
          count,
          criticalLevel: resolveCriticalLevel(count, 3)
        }
      }

      if (releasedAt && !expectedBillingAt) {
        const count = differenceInBusinessDays(
          new Date(),
          getMostBiggerDate(releasedAt, mostRecentlyAnnotation || releasedAt)
        )

        return {
          count,
          criticalLevel: resolveCriticalLevel(count, 3)
        }
      }

      if (expectedBillingAt && !billingAt) {
        const count = differenceInBusinessDays(
          new Date(),
          getMostBiggerDate(
            expectedBillingAt,
            mostRecentlyAnnotation || expectedBillingAt
          )
        )

        return {
          count,
          criticalLevel: resolveCriticalLevel(count, 3)
        }
      }

      if (billingAt && purchaseOrder.freight === 'CIF' && !schedulingAt) {
        const count = differenceInBusinessDays(
          new Date(),
          getMostBiggerDate(billingAt, mostRecentlyAnnotation || billingAt)
        )

        return {
          count,
          criticalLevel: resolveCriticalLevel(count, 1)
        }
      }

      if (purchaseOrder.freight === 'FOB') {
        if (billingAt && !freeOnBoardAt) {
          const count = differenceInBusinessDays(
            new Date(),
            getMostBiggerDate(billingAt, mostRecentlyAnnotation || billingAt)
          )

          return {
            count,
            criticalLevel: resolveCriticalLevel(count, 3)
          }
        }
      } else {
        if (billingAt && !schedulingAt) {
          const count = differenceInBusinessDays(
            new Date(),
            getMostBiggerDate(billingAt, mostRecentlyAnnotation || billingAt)
          )

          return {
            count,
            criticalLevel: resolveCriticalLevel(count, 3)
          }
        }
      }

      const count = differenceInBusinessDays(
        new Date(),
        getMostBiggerDate(emittedAt, mostRecentlyAnnotation || emittedAt)
      )

      return {
        count,
        criticalLevel: resolveCriticalLevel(count, 2)
      }
    }
  }
}
